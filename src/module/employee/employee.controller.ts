import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { EmployeeService } from "./employee.service";

const createEmployee = catchAsync(async (req: Request, res: Response) => {
  const result = await EmployeeService.createEmployee(req, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Employee created successfully",
    data: result,
  });
});

const getCompanyEmployees = catchAsync(async (req: Request, res: Response) => {
  const result = await EmployeeService.getCompanyEmployees(req, req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Employees retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleEmployee = catchAsync(async (req: Request, res: Response) => {
  const result = await EmployeeService.getSingleEmployee(
    req,
    req.params.employeeId as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Employee retrieved successfully",
    data: result,
  });
});

const updateEmployee = catchAsync(async (req: Request, res: Response) => {
  const result = await EmployeeService.updateEmployee(
    req,
    req.params.employeeId as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Employee updated successfully",
    data: result,
  });
});

const deactivateEmployee = catchAsync(async (req: Request, res: Response) => {
  const result = await EmployeeService.deactivateEmployee(
    req,
    req.params.employeeId as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Employee deactivated successfully",
    data: result,
  });
});
const convertExistingUserToEmployee = catchAsync(
  async (req: Request, res: Response) => {
    const result = await EmployeeService.convertExistingUserToEmployee(
      req,
      req.body,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User converted to employee successfully",
      data: result,
    });
  },
);
export const EmployeeController = {
  createEmployee,
  getCompanyEmployees,
  getSingleEmployee,
  updateEmployee,
  deactivateEmployee,
  convertExistingUserToEmployee,
};
