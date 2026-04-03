import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/AppError";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const getMe = catchAsync(async (req: Request, res: Response) => {
  if (!req.user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  const user = await AuthService.getMeFromDB(req.user.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile retrieved successfully",
    data: user,
  });
});

const getMySession = catchAsync(async (req: Request, res: Response) => {
  if (!req.user?.id || !req.session) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  const user = await AuthService.getMySessionFromRequest(req.user.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Session retrieved successfully",
    data: {
      user,
      session: req.session,
    },
  });
});

export const AuthController = {
  getMe,
  getMySession,
};
