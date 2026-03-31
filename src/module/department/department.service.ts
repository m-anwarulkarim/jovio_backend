import type { Request } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { Prisma, UserRole } from "../../../generated/prisma/client";

import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";

import type {
  TCreateDepartmentPayload,
  TGetDepartmentsQuery,
  TUpdateDepartmentPayload,
} from "./department.types";

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
          name: true,
        },
      },
    },
  });

  if (!dbUser) {
    throw new AppError(404, "User not found");
  }

  return dbUser;
};

const getOwnerCompany = async (ownerId: string) => {
  const company = await prisma.company.findUnique({
    where: {
      ownerId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!company) {
    throw new AppError(404, "Company not found");
  }

  return company;
};

const createDepartment = async (
  req: Request,
  payload: TCreateDepartmentPayload,
) => {
  const authUser = await getAuthUser(req);

  if (authUser.role !== UserRole.COMPANY_OWNER) {
    throw new AppError(403, "Only company owners can create departments");
  }

  const company = await getOwnerCompany(authUser.id);

  const existingDepartment = await prisma.department.findFirst({
    where: {
      companyId: company.id,
      name: payload.name,
    },
    select: {
      id: true,
    },
  });

  if (existingDepartment) {
    throw new AppError(409, "Department already exists in your company");
  }

  const department = await prisma.department.create({
    data: {
      name: payload.name,
      companyId: company.id,
    },
    select: {
      id: true,
      name: true,
      companyId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return department;
};

const getAllDepartments = async (req: Request, query: TGetDepartmentsQuery) => {
  const authUser = await getAuthUser(req);

  if (authUser.role !== UserRole.COMPANY_OWNER) {
    throw new AppError(403, "Only company owners can view departments");
  }

  const company = await getOwnerCompany(authUser.id);

  const page = Number(query.page) || 1;
  const limit = Math.min(Number(query.limit) || 10, 100);
  const skip = (page - 1) * limit;
  const searchTerm = query.searchTerm?.trim();

  const andConditions: Prisma.DepartmentWhereInput[] = [
    {
      companyId: company.id,
    },
  ];

  if (searchTerm) {
    andConditions.push({
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    });
  }

  const whereConditions: Prisma.DepartmentWhereInput = {
    AND: andConditions,
  };

  const departments = await prisma.department.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      companyId: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          users: true,
          tasks: true,
        },
      },
    },
  });

  const total = await prisma.department.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: departments,
  };
};

const getSingleDepartment = async (req: Request, departmentId: string) => {
  const authUser = await getAuthUser(req);

  if (authUser.role !== UserRole.COMPANY_OWNER) {
    throw new AppError(403, "Only company owners can view department details");
  }

  const company = await getOwnerCompany(authUser.id);

  const department = await prisma.department.findFirst({
    where: {
      id: departmentId,
      companyId: company.id,
    },
    select: {
      id: true,
      name: true,
      companyId: true,
      createdAt: true,
      updatedAt: true,
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      tasks: {
        select: {
          id: true,
          title: true,
          status: true,
          priority: true,
          deadline: true,
          assignedTo: {
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
      _count: {
        select: {
          users: true,
          tasks: true,
        },
      },
    },
  });

  if (!department) {
    throw new AppError(404, "Department not found");
  }

  return department;
};

const updateDepartment = async (
  req: Request,
  departmentId: string,
  payload: TUpdateDepartmentPayload,
) => {
  const authUser = await getAuthUser(req);

  if (authUser.role !== UserRole.COMPANY_OWNER) {
    throw new AppError(403, "Only company owners can update departments");
  }

  const company = await getOwnerCompany(authUser.id);

  const department = await prisma.department.findFirst({
    where: {
      id: departmentId,
      companyId: company.id,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!department) {
    throw new AppError(404, "Department not found");
  }

  if (payload.name && payload.name !== department.name) {
    const existingDepartment = await prisma.department.findFirst({
      where: {
        companyId: company.id,
        name: payload.name,
        NOT: {
          id: department.id,
        },
      },
      select: {
        id: true,
      },
    });

    if (existingDepartment) {
      throw new AppError(409, "Department name already exists in your company");
    }
  }

  const updatedDepartment = await prisma.department.update({
    where: {
      id: department.id,
    },
    data: {
      name: payload.name,
    },
    select: {
      id: true,
      name: true,
      companyId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedDepartment;
};

const deleteDepartment = async (req: Request, departmentId: string) => {
  const authUser = await getAuthUser(req);

  if (authUser.role !== UserRole.COMPANY_OWNER) {
    throw new AppError(403, "Only company owners can delete departments");
  }

  const company = await getOwnerCompany(authUser.id);

  const department = await prisma.department.findFirst({
    where: {
      id: departmentId,
      companyId: company.id,
    },
    select: {
      id: true,
      _count: {
        select: {
          users: true,
          tasks: true,
        },
      },
    },
  });

  if (!department) {
    throw new AppError(404, "Department not found");
  }

  if (department._count.users > 0) {
    throw new AppError(
      409,
      "Cannot delete department because employees are assigned to it",
    );
  }

  if (department._count.tasks > 0) {
    throw new AppError(
      409,
      "Cannot delete department because tasks are assigned to it",
    );
  }

  await prisma.department.delete({
    where: {
      id: department.id,
    },
  });

  return null;
};

export const DepartmentService = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
