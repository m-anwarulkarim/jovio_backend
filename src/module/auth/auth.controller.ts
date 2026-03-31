import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const applyAuthHeaders = (res: Response, headers?: Headers) => {
  if (!headers) return;

  const setCookieValues: string[] = [];

  headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      setCookieValues.push(value);
    }
  });

  if (setCookieValues.length > 0) {
    res.setHeader("Set-Cookie", setCookieValues);
  }
};

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req, req.body);

  applyAuthHeaders(res, result.headers);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result.data,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req, req.body);

  applyAuthHeaders(res, result.headers);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: result.data,
  });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.logout(req);

  applyAuthHeaders(res, result.headers);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged out successfully",
    data: result.data,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.getMe(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User session retrieved successfully",
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.changePassword(req, req.body);

  applyAuthHeaders(res, result.headers);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password changed successfully",
    data: result.data,
  });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.getAllUsers(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});
export const AuthController = {
  register,
  login,
  getMe,
  logout,
  changePassword,
  getAllUsers,
};
