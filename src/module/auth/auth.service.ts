import type { Request } from "express";
import { fromNodeHeaders } from "better-auth/node";

import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";

import type {
  TLoginPayload,
  TRegisterPayload,
  TChangePasswordPayload,
  TGetAllUsersQuery,
} from "./auth.types";
import { UserRole, type Prisma } from "../../../generated/prisma/client";

type TAuthServiceResponse<T> = {
  data: T;
  headers?: Headers;
};

const register = async (
  req: Request,
  payload: TRegisterPayload,
): Promise<TAuthServiceResponse<unknown>> => {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: payload.email }],
    },
  });

  if (existingUser) {
    throw new AppError(409, "User already exists with this email");
  }

  const { response, headers } = await auth.api.signUpEmail({
    body: {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      image: payload.image,
    },
    headers: fromNodeHeaders(req.headers),
    returnHeaders: true,
  });

  return {
    data: response,
    headers,
  };
};

const login = async (
  req: Request,
  payload: TLoginPayload,
): Promise<TAuthServiceResponse<unknown>> => {
  const { response, headers } = await auth.api.signInEmail({
    body: {
      email: payload.email,
      password: payload.password,
      rememberMe: payload.rememberMe ?? true,
    },
    headers: fromNodeHeaders(req.headers),
    returnHeaders: true,
  });

  return {
    data: response,
    headers,
  };
};

const getMe = async (req: Request) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    throw new AppError(401, "Unauthorized");
  }

  return session;
};

const logout = async (req: Request): Promise<TAuthServiceResponse<unknown>> => {
  const { response, headers } = await auth.api.signOut({
    headers: fromNodeHeaders(req.headers),
    returnHeaders: true,
  });

  return {
    data: response,
    headers,
  };
};

const changePassword = async (
  req: Request,
  payload: TChangePasswordPayload,
): Promise<TAuthServiceResponse<unknown>> => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    throw new AppError(401, "Unauthorized");
  }

  const { response, headers } = await auth.api.changePassword({
    body: {
      currentPassword: payload.currentPassword,
      newPassword: payload.newPassword,
      revokeOtherSessions: true,
    },
    headers: fromNodeHeaders(req.headers),
    returnHeaders: true,
  });

  return {
    data: response,
    headers,
  };
};

const getAllUsers = async (query: TGetAllUsersQuery) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const searchTerm = query.searchTerm?.trim();
  const role = query.role?.trim() as UserRole | undefined;

  const andConditions: Prisma.UserWhereInput[] = [];

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

  if (role && Object.values(UserRole).includes(role)) {
    andConditions.push({
      role,
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const users = await prisma.user.findMany({
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
      avatar: true,
      bio: true,
      isActive: true,
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
    data: users,
  };
};

export const AuthService = {
  register,
  login,
  getMe,
  logout,
  changePassword,
  getAllUsers,
};
