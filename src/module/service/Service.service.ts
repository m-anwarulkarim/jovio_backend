import { UserRole } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";
import type {
  TCreateServicePayload,
  TUpdateServicePayload,
} from "./Service.interface";

type TAuthUser = {
  id: string;
  role?: string | null;
};

// ---- helpers ----
const serviceInclude = {
  features: {
    orderBy: { sortOrder: "asc" as const },
  },
  packages: {
    orderBy: { sortOrder: "asc" as const },
    include: {
      features: {
        orderBy: { sortOrder: "asc" as const },
      },
    },
  },
  relatedPosts: {
    orderBy: { sortOrder: "asc" as const },
  },
  _count: {
    select: {
      featuredItems: true,
    },
  },
};

// ---- Get all services (public) ----
const getAllServicesFromDB = async (includeInactive = false) => {
  return prisma.service.findMany({
    where: includeInactive ? {} : { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: serviceInclude,
  });
};

// ---- Get single service by slug (public) ----
const getServiceBySlugFromDB = async (slug: string) => {
  const service = await prisma.service.findUnique({
    where: { slug },
    include: {
      ...serviceInclude,
      featuredItems: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        select: {
          id: true,
          slug: true,
          title: true,
          shortDescription: true,
          category: true,
          image: true,
          rating: true,
          reviews: true,
        },
      },
    },
  });

  if (!service) {
    throw new AppError(404, "Service not found", "SERVICE_NOT_FOUND");
  }

  return service;
};

// ---- Create service (admin) ----
const createServiceIntoDB = async (
  user: TAuthUser,
  payload: TCreateServicePayload,
) => {
  if (!user?.id || user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Only admin can create service", "FORBIDDEN");
  }

  const existing = await prisma.service.findUnique({
    where: { slug: payload.slug },
  });

  if (existing) {
    throw new AppError(
      400,
      "Service with this slug already exists",
      "SLUG_EXISTS",
    );
  }

  return prisma.service.create({
    data: {
      slug: payload.slug,
      title: payload.title,
      description: payload.description,
      longDescription: payload.longDescription || null,
      icon: payload.icon || null,
      image: payload.image || null,
      tag: payload.tag || null,
      projects: payload.projects || null,
      isActive: payload.isActive ?? true,
      sortOrder: payload.sortOrder ?? 0,

      features: {
        create: payload.features.map((f, i) => ({
          text: f.text,
          sortOrder: f.sortOrder ?? i,
        })),
      },

      packages: {
        create: payload.packages.map((pkg, i) => ({
          name: pkg.name,
          price: pkg.price,
          description: pkg.description,
          deliveryDays: pkg.deliveryDays,
          revisions: pkg.revisions,
          sortOrder: pkg.sortOrder ?? i,
          features: {
            create: pkg.features.map((f, j) => ({
              text: f.text,
              sortOrder: f.sortOrder ?? j,
            })),
          },
        })),
      },

      relatedPosts: {
        create: payload.relatedPosts.map((post, i) => ({
          title: post.title,
          description: post.description,
          category: post.category,
          image: post.image,
          href: post.href,
          sortOrder: post.sortOrder ?? i,
        })),
      },
    },
    include: serviceInclude,
  });
};

// ---- Update service (admin) ----
const updateServiceIntoDB = async (
  user: TAuthUser,
  serviceId: string,
  payload: TUpdateServicePayload,
) => {
  if (!user?.id || user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Only admin can update service", "FORBIDDEN");
  }

  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!service) {
    throw new AppError(404, "Service not found", "SERVICE_NOT_FOUND");
  }

  // check slug uniqueness if changed
  if (payload.slug && payload.slug !== service.slug) {
    const slugExists = await prisma.service.findUnique({
      where: { slug: payload.slug },
    });

    if (slugExists) {
      throw new AppError(
        400,
        "Service with this slug already exists",
        "SLUG_EXISTS",
      );
    }
  }

  return prisma.$transaction(async (tx) => {
    // update basic fields
    const updated = await tx.service.update({
      where: { id: serviceId },
      data: {
        ...(payload.slug !== undefined && { slug: payload.slug }),
        ...(payload.title !== undefined && { title: payload.title }),
        ...(payload.description !== undefined && {
          description: payload.description,
        }),
        ...(payload.longDescription !== undefined && {
          longDescription: payload.longDescription,
        }),
        ...(payload.icon !== undefined && { icon: payload.icon }),
        ...(payload.image !== undefined && { image: payload.image }),
        ...(payload.tag !== undefined && { tag: payload.tag }),
        ...(payload.projects !== undefined && { projects: payload.projects }),
        ...(payload.isActive !== undefined && { isActive: payload.isActive }),
        ...(payload.sortOrder !== undefined && {
          sortOrder: payload.sortOrder,
        }),
      },
    });

    // replace features if provided
    if (payload.features) {
      await tx.serviceFeature.deleteMany({
        where: { serviceId },
      });

      await tx.serviceFeature.createMany({
        data: payload.features.map((f, i) => ({
          serviceId,
          text: f.text,
          sortOrder: f.sortOrder ?? i,
        })),
      });
    }

    // replace packages if provided
    if (payload.packages) {
      // delete old package features first (cascade should handle, but being safe)
      const oldPackages = await tx.servicePackage.findMany({
        where: { serviceId },
        select: { id: true },
      });

      for (const pkg of oldPackages) {
        await tx.packageFeature.deleteMany({
          where: { packageId: pkg.id },
        });
      }

      await tx.servicePackage.deleteMany({
        where: { serviceId },
      });

      for (let i = 0; i < payload.packages.length; i++) {
        const pkg = payload.packages[i]!;
        await tx.servicePackage.create({
          data: {
            serviceId,
            name: pkg.name,
            price: pkg.price,
            description: pkg.description,
            deliveryDays: pkg.deliveryDays,
            revisions: pkg.revisions,
            sortOrder: pkg.sortOrder ?? i,
            features: {
              create: pkg.features.map((f, j) => ({
                text: f.text,
                sortOrder: f.sortOrder ?? j,
              })),
            },
          },
        });
      }
    }

    // replace related posts if provided
    if (payload.relatedPosts) {
      await tx.serviceRelatedPost.deleteMany({
        where: { serviceId },
      });

      await tx.serviceRelatedPost.createMany({
        data: payload.relatedPosts.map((post, i) => ({
          serviceId,
          title: post.title,
          description: post.description,
          category: post.category,
          image: post.image,
          href: post.href,
          sortOrder: post.sortOrder ?? i,
        })),
      });
    }

    // return updated service with all relations
    return tx.service.findUnique({
      where: { id: serviceId },
      include: serviceInclude,
    });
  });
};

// ---- Delete service (admin) ----
const deleteServiceFromDB = async (user: TAuthUser, serviceId: string) => {
  if (!user?.id || user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Only admin can delete service", "FORBIDDEN");
  }

  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!service) {
    throw new AppError(404, "Service not found", "SERVICE_NOT_FOUND");
  }

  // cascade delete handles features, packages, relatedPosts
  return prisma.service.delete({
    where: { id: serviceId },
  });
};

export const ServiceService = {
  getAllServicesFromDB,
  getServiceBySlugFromDB,
  createServiceIntoDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
};
