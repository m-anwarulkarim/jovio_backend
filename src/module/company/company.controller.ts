import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CompanyService } from "./company.service";

const createCompany = catchAsync(async (req: Request, res: Response) => {
  const result = await CompanyService.createCompany(req, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Company created successfully",
    data: result,
  });
});

const getMyCompany = catchAsync(async (req: Request, res: Response) => {
  const result = await CompanyService.getMyCompany(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "My company retrieved successfully",
    data: result,
  });
});

const getAllCompanies = catchAsync(async (req: Request, res: Response) => {
  const result = await CompanyService.getAllCompanies(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Companies retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCompany = catchAsync(async (req: Request, res: Response) => {
  const result = await CompanyService.getSingleCompany(
    req.params.slugOrId as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Company retrieved successfully",
    data: result,
  });
});

const updateMyCompany = catchAsync(async (req: Request, res: Response) => {
  const result = await CompanyService.updateMyCompany(req, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Company updated successfully",
    data: result,
  });
});

const updateCompanyVerification = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CompanyService.updateCompanyVerification(
      req.params.companyId as string,
      req.body.isVerified,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Company verification updated successfully",
      data: result,
    });
  },
);

const updateCompanyStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await CompanyService.updateCompanyStatus(
    req.params.companyId as string,
    req.body.isActive,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Company status updated successfully",
    data: result,
  });
});

export const CompanyController = {
  createCompany,
  getMyCompany,
  getAllCompanies,
  getSingleCompany,
  updateMyCompany,
  updateCompanyVerification,
  updateCompanyStatus,
};
