import type { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";

type TRole = "ADMIN" | "EMPLOYEE" | "CLIENT";

const authGuard = (...roles: TRole[]) =>
  catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
    const session = await auth.api.getSession({
      headers: req.headers as never,
    });

    if (!session) {
      throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
    }

    req.user = session.user;
    req.session = session.session;

    if (
      roles.length > 0 &&
      req.user?.role &&
      !roles.includes(req.user.role as TRole)
    ) {
      throw new AppError(403, "Forbidden", "FORBIDDEN");
    }

    next();
  });

export default authGuard;
