import type { Request } from "express";
import { Prisma, UserRole } from "../../../generated/prisma/client";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";
import getAuthUser from "../../utils/getAuthUser";
import {
  ensureCompanyOwner,
  ensureDepartmentBelongsToCompany,
  getOwnerCompany,
} from "../../utils/accessControl";

import type {
  TConvertExistingUserToEmployeePayload,
  TCreateEmployeePayload,
  TGetEmployeesQuery,
  TUpdateEmployeePayload,
} from "./employee.types";

const createEmployee = async (
  req: Request,
  payload: TCreateEmployeePayload,
) => {
  const authUser = await getAuthUser(req);

  ensureCompanyOwner(authUser);

  const company = await getOwnerCompany(authUser.id);

  const existingUserByEmail = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
    },
  });

  if (existingUserByEmail) {
    throw new AppError(409, "User already exists with this email");
  }

  if (payload.phone) {
    const existingUserByPhone = await prisma.user.findFirst({
      where: {
        phone: payload.phone,
      },
      select: {
        id: true,
      },
    });

    if (existingUserByPhone) {
      throw new AppError(409, "User already exists with this phone");
    }
  }

  if (payload.departmentId) {
    await ensureDepartmentBelongsToCompany(payload.departmentId, company.id);
  }

  await auth.api.signUpEmail({
    body: {
      name: payload.name,
      email: payload.email,
      password: payload.password,
    },
  });

  const createdEmployee = await prisma.user.update({
    where: {
      email: payload.email,
    },
    data: {
      phone: payload.phone,
      bio: payload.bio,
      image: payload.image,
      role: UserRole.EMPLOYEE,
      companyId: company.id,
      departmentId: payload.departmentId,
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      image: true,
      bio: true,
      isActive: true,
      companyId: true,
      departmentId: true,
      createdAt: true,
      updatedAt: true,
      department: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return createdEmployee;
};

const getCompanyEmployees = async (req: Request, query: TGetEmployeesQuery) => {
  const authUser = await getAuthUser(req);

  ensureCompanyOwner(authUser);

  const company = await getOwnerCompany(authUser.id);

  const page = Number(query.page) || 1;
  const limit = Math.min(Number(query.limit) || 10, 100);
  const skip = (page - 1) * limit;

  const searchTerm = query.searchTerm?.trim();
  const departmentId = query.departmentId?.trim();
  const isActive =
    query.isActive === "true"
      ? true
      : query.isActive === "false"
        ? false
        : undefined;

  const andConditions: Prisma.UserWhereInput[] = [
    {
      companyId: company.id,
    },
    {
      role: UserRole.EMPLOYEE,
    },
  ];

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
          email: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (departmentId) {
    andConditions.push({
      departmentId,
    });
  }

  if (typeof isActive === "boolean") {
    andConditions.push({
      isActive,
    });
  }

  const whereConditions: Prisma.UserWhereInput = {
    AND: andConditions,
  };

  const employees = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      image: true,
      bio: true,
      isActive: true,
      companyId: true,
      departmentId: true,
      createdAt: true,
      updatedAt: true,
      department: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: employees,
  };
};

const getSingleEmployee = async (req: Request, employeeId: string) => {
  const authUser = await getAuthUser(req);

  ensureCompanyOwner(authUser);

  const company = await getOwnerCompany(authUser.id);

  const employee = await prisma.user.findFirst({
    where: {
      id: employeeId,
      companyId: company.id,
      role: UserRole.EMPLOYEE,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      image: true,
      bio: true,
      isActive: true,
      companyId: true,
      departmentId: true,
      createdAt: true,
      updatedAt: true,
      department: {
        select: {
          id: true,
          name: true,
        },
      },
      assignedTasks: {
        select: {
          id: true,
          title: true,
          status: true,
          priority: true,
          deadline: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      },
      _count: {
        select: {
          assignedTasks: true,
        },
      },
    },
  });

  if (!employee) {
    throw new AppError(404, "Employee not found");
  }

  return employee;
};

const updateEmployee = async (
  req: Request,
  employeeId: string,
  payload: TUpdateEmployeePayload,
) => {
  const authUser = await getAuthUser(req);

  ensureCompanyOwner(authUser);

  const company = await getOwnerCompany(authUser.id);

  const employee = await prisma.user.findFirst({
    where: {
      id: employeeId,
      companyId: company.id,
      role: UserRole.EMPLOYEE,
    },
    select: {
      id: true,
      phone: true,
      departmentId: true,
    },
  });

  if (!employee) {
    throw new AppError(404, "Employee not found");
  }

  if (payload.phone && payload.phone !== employee.phone) {
    const existingUserByPhone = await prisma.user.findFirst({
      where: {
        phone: payload.phone,
        NOT: {
          id: employee.id,
        },
      },
      select: {
        id: true,
      },
    });

    if (existingUserByPhone) {
      throw new AppError(409, "Phone number already in use");
    }
  }

  if (payload.departmentId) {
    await ensureDepartmentBelongsToCompany(payload.departmentId, company.id);
  }

  const updatedEmployee = await prisma.user.update({
    where: {
      id: employee.id,
    },
    data: {
      name: payload.name,
      phone: payload.phone,
      bio: payload.bio,
      image: payload.image,
      departmentId: payload.departmentId === null ? null : payload.departmentId,
      isActive: payload.isActive,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      image: true,
      bio: true,
      isActive: true,
      companyId: true,
      departmentId: true,
      createdAt: true,
      updatedAt: true,
      department: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return updatedEmployee;
};

const deactivateEmployee = async (req: Request, employeeId: string) => {
  const authUser = await getAuthUser(req);

  ensureCompanyOwner(authUser);

  const company = await getOwnerCompany(authUser.id);

  const employee = await prisma.user.findFirst({
    where: {
      id: employeeId,
      companyId: company.id,
      role: UserRole.EMPLOYEE,
    },
    select: {
      id: true,
    },
  });

  if (!employee) {
    throw new AppError(404, "Employee not found");
  }

  return prisma.user.update({
    where: {
      id: employee.id,
    },
    data: {
      isActive: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      updatedAt: true,
    },
  });
};

const convertExistingUserToEmployee = async (
  req: Request,
  payload: TConvertExistingUserToEmployeePayload,
) => {
  const authUser = await getAuthUser(req);

  ensureCompanyOwner(authUser);

  const company = await getOwnerCompany(authUser.id);

  const existingUser = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      companyId: true,
      departmentId: true,
      isActive: true,
    },
  });

  if (!existingUser) {
    throw new AppError(404, "User not found with this email");
  }

  if (existingUser.id === authUser.id) {
    throw new AppError(400, "You cannot convert yourself to employee");
  }

  if (existingUser.role === UserRole.ADMIN) {
    throw new AppError(403, "Admin cannot be converted to employee");
  }

  if (existingUser.role === UserRole.COMPANY_OWNER) {
    throw new AppError(403, "Company owner cannot be converted to employee");
  }

  if (existingUser.companyId && existingUser.companyId !== company.id) {
    throw new AppError(409, "User already belongs to another company");
  }

  if (payload.departmentId) {
    await ensureDepartmentBelongsToCompany(payload.departmentId, company.id);
  }

  const updatedEmployee = await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      role: UserRole.EMPLOYEE,
      companyId: company.id,
      departmentId: payload.departmentId,
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      image: true,
      bio: true,
      isActive: true,
      companyId: true,
      departmentId: true,
      createdAt: true,
      updatedAt: true,
      department: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return updatedEmployee;
};

export const EmployeeService = {
  createEmployee,
  getCompanyEmployees,
  getSingleEmployee,
  updateEmployee,
  deactivateEmployee,
  convertExistingUserToEmployee,
};
