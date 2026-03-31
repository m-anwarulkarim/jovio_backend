import type { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { prisma } from "../lib/prisma";

type Role = "ADMIN" | "EMPLOYEE" | "COMPANY_OWNER" | "CLIENT" | "FREELANCER";

export const requireRole = (...roles: Role[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) {
        return next(new AppError(401, "Unauthorized"));
      }

      const dbUser = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
        select: {
          id: true,
          role: true,
        },
      });

      if (!dbUser) {
        return next(new AppError(404, "User not found"));
      }

      if (!roles.includes(dbUser.role as Role)) {
        return next(new AppError(403, "Forbidden"));
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
