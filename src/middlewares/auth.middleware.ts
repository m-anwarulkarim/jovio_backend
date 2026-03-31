import type { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";
import AppError from "../utils/AppError";
export const requireAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return next(new AppError(401, "Unauthorized"));
    }

    req.user = session.user;
    req.session = session.session;

    next();
  } catch (error) {
    next(error);
  }
};
