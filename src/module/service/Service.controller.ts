import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../utils/AppError";
import { createServiceSchema, updateServiceSchema } from "./Service.interface";
import { ServiceService } from "./Service.service";

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const includeInactive = req.query.includeInactive === "true";

  const result = await ServiceService.getAllServicesFromDB(includeInactive);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Services retrieved successfully",
    data: result,
  });
});

const getServiceBySlug = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.getServiceBySlugFromDB(
    req.params.slug as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Service retrieved successfully",
    data: result,
  });
});

const createService = catchAsync(async (req: Request, res: Response) => {
  const parsed = createServiceSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new AppError(
      400,
      parsed.error.issues.map((e) => e.message).join(", "),
      "VALIDATION_ERROR",
    );
  }

  const result = await ServiceService.createServiceIntoDB(
    req.user!,
    parsed.data,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Service created successfully",
    data: result,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const parsed = updateServiceSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new AppError(
      400,
      parsed.error.issues.map((e) => e.message).join(", "),
      "VALIDATION_ERROR",
    );
  }

  const result = await ServiceService.updateServiceIntoDB(
    req.user!,
    req.params.id as string,
    parsed.data,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Service updated successfully",
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.deleteServiceFromDB(
    req.user!,
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Service deleted successfully",
    data: result,
  });
});

export const ServiceController = {
  getAllServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
};
