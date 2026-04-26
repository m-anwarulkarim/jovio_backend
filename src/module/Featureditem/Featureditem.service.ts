import { UserRole } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";
import type {
  TCreateFeaturedItemPayload,
  TUpdateFeaturedItemPayload,
} from "./Featureditem.interface";

type TAuthUser = {
  id: string;
  role?: string | null;
};

// ---- helpers ----
const featuredItemInclude = {
  service: {
    select: {
      id: true,
      slug: true,
      title: true,
    },
  },
  features: {
    orderBy: { sortOrder: "asc" as const },
  },
  technologies: true,
  packages: {
    orderBy: { sortOrder: "asc" as const },
    include: {
      features: {
        orderBy: { sortOrder: "asc" as const },
      },
    },
  },
  images: {
    orderBy: { sortOrder: "asc" as const },
  },
};

// ---- Get all featured items (public) ----
const getAllFeaturedItemsFromDB = async (
  serviceId?: string,
  includeInactive = false,
) => {
  return prisma.featuredItem.findMany({
    where: {
      ...(includeInactive ? {} : { isActive: true }),
      ...(serviceId ? { serviceId } : {}),
    },
    orderBy: { sortOrder: "asc" },
    include: featuredItemInclude,
  });
};

// ---- Get single featured item by slug (public) ----
const getFeaturedItemBySlugFromDB = async (slug: string) => {
  const item = await prisma.featuredItem.findUnique({
    where: { slug },
    include: featuredItemInclude,
  });

  if (!item) {
    throw new AppError(
      404,
      "Featured item not found",
      "FEATURED_ITEM_NOT_FOUND",
    );
  }

  return item;
};

// ---- Create featured item (admin) ----
const createFeaturedItemIntoDB = async (
  user: TAuthUser,
  payload: TCreateFeaturedItemPayload,
) => {
  if (!user?.id || user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Only admin can create featured item", "FORBIDDEN");
  }

  // check slug
  const existing = await prisma.featuredItem.findUnique({
    where: { slug: payload.slug },
  });

  if (existing) {
    throw new AppError(
      400,
      "Featured item with this slug already exists",
      "SLUG_EXISTS",
    );
  }

  // check service exists if provided
  if (payload.serviceId) {
    const service = await prisma.service.findUnique({
      where: { id: payload.serviceId },
    });

    if (!service) {
      throw new AppError(404, "Service not found", "SERVICE_NOT_FOUND");
    }
  }

  return prisma.featuredItem.create({
    data: {
      slug: payload.slug,
      serviceId: payload.serviceId || null,
      title: payload.title,
      shortDescription: payload.shortDescription,
      description: payload.description,
      longDescription: payload.longDescription || null,
      category: payload.category,
      image: payload.image,
      overview: payload.overview,
      challenge: payload.challenge,
      solution: payload.solution,
      result: payload.result,
      rating: payload.rating ?? null,
      reviews: payload.reviews ?? null,
      isActive: payload.isActive ?? true,
      sortOrder: payload.sortOrder ?? 0,

      features: {
        create: payload.features.map((f, i) => ({
          text: f.text,
          sortOrder: f.sortOrder ?? i,
        })),
      },

      technologies: {
        create: payload.technologies.map((t) => ({
          name: t.name,
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

      images: {
        create: payload.images.map((img, i) => ({
          url: img.url,
          sortOrder: img.sortOrder ?? i,
        })),
      },
    },
    include: featuredItemInclude,
  });
};

// ---- Update featured item (admin) ----
const updateFeaturedItemIntoDB = async (
  user: TAuthUser,
  itemId: string,
  payload: TUpdateFeaturedItemPayload,
) => {
  if (!user?.id || user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Only admin can update featured item", "FORBIDDEN");
  }

  const item = await prisma.featuredItem.findUnique({
    where: { id: itemId },
  });

  if (!item) {
    throw new AppError(
      404,
      "Featured item not found",
      "FEATURED_ITEM_NOT_FOUND",
    );
  }

  // check slug uniqueness if changed
  if (payload.slug && payload.slug !== item.slug) {
    const slugExists = await prisma.featuredItem.findUnique({
      where: { slug: payload.slug },
    });

    if (slugExists) {
      throw new AppError(
        400,
        "Featured item with this slug already exists",
        "SLUG_EXISTS",
      );
    }
  }

  // check service if changed
  if (payload.serviceId) {
    const service = await prisma.service.findUnique({
      where: { id: payload.serviceId },
    });

    if (!service) {
      throw new AppError(404, "Service not found", "SERVICE_NOT_FOUND");
    }
  }

  return prisma.$transaction(async (tx) => {
    // update basic fields
    await tx.featuredItem.update({
      where: { id: itemId },
      data: {
        ...(payload.slug !== undefined && { slug: payload.slug }),
        ...(payload.serviceId !== undefined && {
          serviceId: payload.serviceId || null,
        }),
        ...(payload.title !== undefined && { title: payload.title }),
        ...(payload.shortDescription !== undefined && {
          shortDescription: payload.shortDescription,
        }),
        ...(payload.description !== undefined && {
          description: payload.description,
        }),
        ...(payload.longDescription !== undefined && {
          longDescription: payload.longDescription,
        }),
        ...(payload.category !== undefined && { category: payload.category }),
        ...(payload.image !== undefined && { image: payload.image }),
        ...(payload.overview !== undefined && { overview: payload.overview }),
        ...(payload.challenge !== undefined && {
          challenge: payload.challenge,
        }),
        ...(payload.solution !== undefined && { solution: payload.solution }),
        ...(payload.result !== undefined && { result: payload.result }),
        ...(payload.rating !== undefined && { rating: payload.rating }),
        ...(payload.reviews !== undefined && { reviews: payload.reviews }),
        ...(payload.isActive !== undefined && { isActive: payload.isActive }),
        ...(payload.sortOrder !== undefined && {
          sortOrder: payload.sortOrder,
        }),
      },
    });

    // replace features if provided
    if (payload.features) {
      await tx.featuredItemFeature.deleteMany({
        where: { featuredItemId: itemId },
      });

      await tx.featuredItemFeature.createMany({
        data: payload.features.map((f, i) => ({
          featuredItemId: itemId,
          text: f.text,
          sortOrder: f.sortOrder ?? i,
        })),
      });
    }

    // replace technologies if provided
    if (payload.technologies) {
      await tx.featuredItemTech.deleteMany({
        where: { featuredItemId: itemId },
      });

      await tx.featuredItemTech.createMany({
        data: payload.technologies.map((t) => ({
          featuredItemId: itemId,
          name: t.name,
        })),
      });
    }

    // replace packages if provided
    if (payload.packages) {
      const oldPackages = await tx.featuredItemPackage.findMany({
        where: { featuredItemId: itemId },
        select: { id: true },
      });

      for (const pkg of oldPackages) {
        await tx.featuredItemPackageFeature.deleteMany({
          where: { packageId: pkg.id },
        });
      }

      await tx.featuredItemPackage.deleteMany({
        where: { featuredItemId: itemId },
      });

      for (let i = 0; i < payload.packages.length; i++) {
        const pkg = payload.packages[i]!;
        await tx.featuredItemPackage.create({
          data: {
            featuredItemId: itemId,
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

    // replace images if provided
    if (payload.images) {
      await tx.featuredItemImage.deleteMany({
        where: { featuredItemId: itemId },
      });

      await tx.featuredItemImage.createMany({
        data: payload.images.map((img, i) => ({
          featuredItemId: itemId,
          url: img.url,
          sortOrder: img.sortOrder ?? i,
        })),
      });
    }

    return tx.featuredItem.findUnique({
      where: { id: itemId },
      include: featuredItemInclude,
    });
  });
};

// ---- Delete featured item (admin) ----
const deleteFeaturedItemFromDB = async (user: TAuthUser, itemId: string) => {
  if (!user?.id || user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Only admin can delete featured item", "FORBIDDEN");
  }

  const item = await prisma.featuredItem.findUnique({
    where: { id: itemId },
  });

  if (!item) {
    throw new AppError(
      404,
      "Featured item not found",
      "FEATURED_ITEM_NOT_FOUND",
    );
  }

  return prisma.featuredItem.delete({
    where: { id: itemId },
  });
};

export const FeaturedItemService = {
  getAllFeaturedItemsFromDB,
  getFeaturedItemBySlugFromDB,
  createFeaturedItemIntoDB,
  updateFeaturedItemIntoDB,
  deleteFeaturedItemFromDB,
};
