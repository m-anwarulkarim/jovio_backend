import type { Request } from "express";
import { Prisma, UserRole } from "../../../generated/prisma/client";
import { fromNodeHeaders } from "better-auth/node";

import { prisma } from "../../lib/prisma";
import { auth } from "../../lib/auth";
import AppError from "../../utils/AppError";

import type {
  TCreateCompanyPayload,
  TGetCompaniesQuery,
  TUpdateCompanyPayload,
} from "./company.types";

const getAuthUser = async (req: Request) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session?.user?.id) {
    throw new AppError(401, "Unauthorized");
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      role: true,
      companyId: true,
      ownedCompany: {
        select: {
          id: true,
          slug: true,
        },
      },
    },
  });

  if (!dbUser) {
    throw new AppError(404, "User not found");
  }

  return dbUser;
};

const createCompany = async (req: Request, payload: TCreateCompanyPayload) => {
  const authUser = await getAuthUser(req);

  if (authUser.role === UserRole.EMPLOYEE) {
    throw new AppError(403, "Employees cannot create a company");
  }

  if (authUser.ownedCompany) {
    throw new AppError(409, "You already own a company");
  }

  const existingCompanyByName = await prisma.company.findUnique({
    where: {
      name: payload.name,
    },
    select: {
      id: true,
    },
  });

  if (existingCompanyByName) {
    throw new AppError(409, "Company name already exists");
  }

  const existingCompanyBySlug = await prisma.company.findUnique({
    where: {
      slug: payload.slug,
    },
    select: {
      id: true,
    },
  });

  if (existingCompanyBySlug) {
    throw new AppError(409, "Company slug already exists");
  }

  const result = await prisma.$transaction(async (tx) => {
    const company = await tx.company.create({
      data: {
        name: payload.name,
        slug: payload.slug,
        description: payload.description,
        logo: payload.logo,
        website: payload.website,
        ownerId: authUser.id,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        logo: true,
        website: true,
        isActive: true,
        isVerified: true,
        ownerId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    await tx.user.update({
      where: {
        id: authUser.id,
      },
      data: {
        role: UserRole.COMPANY_OWNER,
        companyId: company.id,
      },
    });

    return company;
  });

  return result;
};

const getMyCompany = async (req: Request) => {
  const authUser = await getAuthUser(req);

  const company = await prisma.company.findFirst({
    where: {
      OR: [
        { ownerId: authUser.id },
        authUser.companyId ? { id: authUser.companyId } : undefined,
      ].filter(Boolean) as Prisma.CompanyWhereInput[],
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      logo: true,
      website: true,
      isActive: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      _count: {
        select: {
          members: true,
          departments: true,
          tasks: true,
          proposals: true,
          orders: true,
        },
      },
    },
  });

  if (!company) {
    throw new AppError(404, "Company not found");
  }

  return company;
};

const getAllCompanies = async (query: TGetCompaniesQuery) => {
  const page = Number(query.page) || 1;
  const limit = Math.min(Number(query.limit) || 10, 100);
  const skip = (page - 1) * limit;

  const searchTerm = query.searchTerm?.trim();
  const isVerified =
    query.isVerified === "true"
      ? true
      : query.isVerified === "false"
        ? false
        : undefined;

  const isActive =
    query.isActive === "true"
      ? true
      : query.isActive === "false"
        ? false
        : undefined;

  const andConditions: Prisma.CompanyWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          slug: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (typeof isVerified === "boolean") {
    andConditions.push({ isVerified });
  }

  if (typeof isActive === "boolean") {
    andConditions.push({ isActive });
  }

  const whereConditions: Prisma.CompanyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const companies = await prisma.company.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      logo: true,
      website: true,
      isActive: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      _count: {
        select: {
          members: true,
          orders: true,
          proposals: true,
        },
      },
    },
  });

  const total = await prisma.company.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: companies,
  };
};

const getSingleCompany = async (slugOrId: string) => {
  const company = await prisma.company.findFirst({
    where: {
      OR: [{ id: slugOrId }, { slug: slugOrId }],
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      logo: true,
      website: true,
      isActive: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
      owner: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          members: true,
          orders: true,
          proposals: true,
          reviewsReceived: true,
        },
      },
      reviewsReceived: {
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      },
    },
  });

  if (!company) {
    throw new AppError(404, "Company not found");
  }

  return company;
};

const updateMyCompany = async (
  req: Request,
  payload: TUpdateCompanyPayload,
) => {
  const authUser = await getAuthUser(req);

  const company = await prisma.company.findUnique({
    where: {
      ownerId: authUser.id,
    },
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });

  if (!company) {
    throw new AppError(404, "You do not own any company");
  }

  if (payload.name && payload.name !== company.name) {
    const existingCompanyByName = await prisma.company.findUnique({
      where: {
        name: payload.name,
      },
      select: {
        id: true,
      },
    });

    if (existingCompanyByName) {
      throw new AppError(409, "Company name already exists");
    }
  }

  if (payload.slug && payload.slug !== company.slug) {
    const existingCompanyBySlug = await prisma.company.findUnique({
      where: {
        slug: payload.slug,
      },
      select: {
        id: true,
      },
    });

    if (existingCompanyBySlug) {
      throw new AppError(409, "Company slug already exists");
    }
  }

  const updatedCompany = await prisma.company.update({
    where: {
      id: company.id,
    },
    data: {
      name: payload.name,
      slug: payload.slug,
      description: payload.description,
      logo: payload.logo,
      website: payload.website,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      logo: true,
      website: true,
      isActive: true,
      isVerified: true,
      ownerId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedCompany;
};

const updateCompanyVerification = async (
  companyId: string,
  isVerified: boolean,
) => {
  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
    select: {
      id: true,
    },
  });

  if (!company) {
    throw new AppError(404, "Company not found");
  }

  return prisma.company.update({
    where: {
      id: companyId,
    },
    data: {
      isVerified,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      isVerified: true,
      updatedAt: true,
    },
  });
};

const updateCompanyStatus = async (companyId: string, isActive: boolean) => {
  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
    select: {
      id: true,
    },
  });

  if (!company) {
    throw new AppError(404, "Company not found");
  }

  return prisma.company.update({
    where: {
      id: companyId,
    },
    data: {
      isActive,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      isActive: true,
      updatedAt: true,
    },
  });
};

export const CompanyService = {
  createCompany,
  getMyCompany,
  getAllCompanies,
  getSingleCompany,
  updateMyCompany,
  updateCompanyVerification,
  updateCompanyStatus,
};
