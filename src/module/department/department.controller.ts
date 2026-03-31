import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { DepartmentService } from "./department.service";

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await DepartmentService.createDepartment(req, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Department created successfully",
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const result = await DepartmentService.getAllDepartments(req, req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Departments retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await DepartmentService.getSingleDepartment(
    req,
    req.params.departmentId as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Department retrieved successfully",
    data: result,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await DepartmentService.updateDepartment(
    req,
    req.params.departmentId as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Department updated successfully",
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  await DepartmentService.deleteDepartment(
    req,
    req.params.departmentId as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Department deleted successfully",
    data: null,
  });
});

export const DepartmentController = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
