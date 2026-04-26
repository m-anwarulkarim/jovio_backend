import type { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../utils/AppError";
import { FeaturedItemService } from "./Featureditem.service";
import {
  createFeaturedItemSchema,
  updateFeaturedItemSchema,
} from "./Featureditem.interface";

const getAllFeaturedItems = catchAsync(async (req: Request, res: Response) => {
  const serviceId = req.query.serviceId as string | undefined;
  const includeInactive = req.query.includeInactive === "true";

  const result = await FeaturedItemService.getAllFeaturedItemsFromDB(
    serviceId,
    includeInactive,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Featured items retrieved successfully",
    data: result,
  });
});

const getFeaturedItemBySlug = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FeaturedItemService.getFeaturedItemBySlugFromDB(
      req.params.slug as string,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Featured item retrieved successfully",
      data: result,
    });
  },
);

const createFeaturedItem = catchAsync(async (req: Request, res: Response) => {
  const parsed = createFeaturedItemSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new AppError(
      400,
      parsed.error.issues.map((e) => e.message).join(", "),
      "VALIDATION_ERROR",
    );
  }

  const result = await FeaturedItemService.createFeaturedItemIntoDB(
    req.user!,
    parsed.data,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Featured item created successfully",
    data: result,
  });
});

const updateFeaturedItem = catchAsync(async (req: Request, res: Response) => {
  const parsed = updateFeaturedItemSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new AppError(
      400,
      parsed.error.issues.map((e) => e.message).join(", "),
      "VALIDATION_ERROR",
    );
  }

  const result = await FeaturedItemService.updateFeaturedItemIntoDB(
    req.user!,
    req.params.id as string,
    parsed.data,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Featured item updated successfully",
    data: result,
  });
});

const deleteFeaturedItem = catchAsync(async (req: Request, res: Response) => {
  const result = await FeaturedItemService.deleteFeaturedItemFromDB(
    req.user!,
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Featured item deleted successfully",
    data: result,
  });
});

export const FeaturedItemController = {
  getAllFeaturedItems,
  getFeaturedItemBySlug,
  createFeaturedItem,
  updateFeaturedItem,
  deleteFeaturedItem,
};
