import type { Request } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { UserRole } from "../../generated/prisma/client";

import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";
import AppError from "./AppError";

export type TAuthUser = {
  id: string;
  role: UserRole;
  companyId: string | null;
  departmentId: string | null;
  ownedCompany: {
    id: string;
    name: string;
    slug: string;
  } | null;
};

const getAuthUser = async (req: Request): Promise<TAuthUser> => {
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
      departmentId: true,
      ownedCompany: {
        select: {
          id: true,
          name: true,
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

export default getAuthUser;
