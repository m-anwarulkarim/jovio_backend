import { UserRole } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";
import type { TAuthUser, TGetAllUsersQuery } from "./auth.types";

type TRegisterPayload = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: "ADMIN" | "EMPLOYEE" | "CLIENT";
};

type TLoginPayload = {
  email: string;
  password: string;
};

const getMeFromDB = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      image: true,
      bio: true,
      isActive: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new AppError(404, "User not found", "USER_NOT_FOUND");
  }

  return user;
};

const getMySessionFromRequest = async (userId: string) => {
  const user = await getMeFromDB(userId);
  return user;
};

const registerIntoDB = async (payload: TRegisterPayload, headers: Headers) => {
  const { name, email, password, phone, role } = payload;

  if (!name?.trim()) {
    throw new AppError(400, "Name is required", "NAME_REQUIRED");
  }

  if (!email?.trim()) {
    throw new AppError(400, "Email is required", "EMAIL_REQUIRED");
  }

  if (!password?.trim()) {
    throw new AppError(400, "Password is required", "PASSWORD_REQUIRED");
  }

  if (password.length < 6) {
    throw new AppError(
      400,
      "Password must be at least 6 characters",
      "WEAK_PASSWORD",
    );
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPhone = phone?.trim();

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: normalizedEmail },
        ...(normalizedPhone ? [{ phone: normalizedPhone }] : []),
      ],
    },
    select: {
      id: true,
      email: true,
      phone: true,
    },
  });

  if (existingUser?.email === normalizedEmail) {
    throw new AppError(409, "Email already exists", "EMAIL_ALREADY_EXISTS");
  }

  if (normalizedPhone && existingUser?.phone === normalizedPhone) {
    throw new AppError(409, "Phone already exists", "PHONE_ALREADY_EXISTS");
  }

  const response = await auth.api.signUpEmail({
    headers,
    asResponse: true,
    body: {
      name: name.trim(),
      email: normalizedEmail,
      password,
      ...(normalizedPhone ? { phone: normalizedPhone } : {}),
      ...(role ? { role } : {}),
    },
  });

  return response;
};

const loginFromDB = async (payload: TLoginPayload, headers: Headers) => {
  const { email, password } = payload;

  if (!email?.trim()) {
    throw new AppError(400, "Email is required", "EMAIL_REQUIRED");
  }

  if (!password?.trim()) {
    throw new AppError(400, "Password is required", "PASSWORD_REQUIRED");
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
    select: {
      id: true,
      isActive: true,
    },
  });

  if (!existingUser) {
    throw new AppError(404, "User not found", "USER_NOT_FOUND");
  }

  if (!existingUser.isActive) {
    throw new AppError(403, "Account is inactive", "ACCOUNT_INACTIVE");
  }

  const response = await auth.api.signInEmail({
    headers,
    asResponse: true,
    body: {
      email: normalizedEmail,
      password,
    },
  });

  return response;
};

const logoutFromDB = async (headers: Headers) => {
  const response = await auth.api.signOut({
    headers,
    asResponse: true,
  });

  return response;
};

const getAllUsersFromDB = async (user: TAuthUser, query: TGetAllUsersQuery) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  if (user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Only admin can view all users", "FORBIDDEN");
  }

  const andConditions: Array<Record<string, unknown>> = [];

  if (query.searchTerm) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (
    query.role &&
    [UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.CLIENT].includes(
      query.role as UserRole,
    )
  ) {
    andConditions.push({
      role: query.role as UserRole,
    });
  }

  if (query.isActive === "true") {
    andConditions.push({
      isActive: true,
    });
  }

  if (query.isActive === "false") {
    andConditions.push({
      isActive: false,
    });
  }

  const whereClause = andConditions.length > 0 ? { AND: andConditions } : {};

  const users = await prisma.user.findMany({
    where: whereClause,
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
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          clientOffers: true,
          clientProjects: true,
          assignedProjects: true,
          notifications: true,
        },
      },
    },
  });

  return users;
};

export const AuthService = {
  registerIntoDB,
  loginFromDB,
  logoutFromDB,
  getMeFromDB,
  getMySessionFromRequest,
  getAllUsersFromDB,
};
