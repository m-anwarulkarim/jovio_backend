import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/AppError";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const buildHeaders = (req: Request) => {
  const headers = new Headers();

  Object.entries(req.headers).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => headers.append(key, v));
    } else if (value !== undefined) {
      headers.append(key, String(value));
    }
  });

  return headers;
};

const forwardBetterAuthResponse = async (
  authResponse: globalThis.Response,
  res: Response,
) => {
  const isProduction = process.env.NODE_ENV === "production";

  authResponse.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      let cookieValue = value;

      if (isProduction) {
        // ensure cross-origin cookie works
        cookieValue = cookieValue
          .replace(/SameSite=Lax/gi, "SameSite=None")
          .replace(/SameSite=Strict/gi, "SameSite=None");

        if (!/Secure/i.test(cookieValue)) {
          cookieValue += "; Secure";
        }

        if (!/SameSite/i.test(cookieValue)) {
          cookieValue += "; SameSite=None";
        }
      }

      res.append("set-cookie", cookieValue);
    } else {
      res.setHeader(key, value);
    }
  });

  const contentType = authResponse.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const data = await authResponse.json();
    return res.status(authResponse.status).json(data);
  }

  const text = await authResponse.text();
  return res.status(authResponse.status).send(text);
};

const register = catchAsync(async (req: Request, res: Response) => {
  const response = await AuthService.registerIntoDB(
    req.body,
    buildHeaders(req),
  );
  return forwardBetterAuthResponse(response, res);
});

const login = catchAsync(async (req: Request, res: Response) => {
  const response = await AuthService.loginFromDB(req.body, buildHeaders(req));
  return forwardBetterAuthResponse(response, res);
});

const logout = catchAsync(async (req: Request, res: Response) => {
  const response = await AuthService.logoutFromDB(buildHeaders(req));
  return forwardBetterAuthResponse(response, res);
});

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

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.getAllUsersFromDB(req.user!, req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

export const AuthController = {
  register,
  login,
  logout,
  getMe,
  getMySession,
  getAllUsers,
};
