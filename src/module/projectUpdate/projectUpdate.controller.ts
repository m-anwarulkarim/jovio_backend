import type { Request, Response } from "express";
import { ProjectUpdateService } from "./projectUpdate.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createProjectUpdate = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectUpdateService.createProjectUpdateIntoDB(
    req.user!,
    req.body,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Project update created successfully",
    data: result,
  });
});

const getProjectUpdates = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectUpdateService.getProjectUpdatesFromDB(
    req.user!,
    req.query,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project updates retrieved successfully",
    data: result,
  });
});

const getSingleProjectUpdate = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProjectUpdateService.getSingleProjectUpdateFromDB(
      req.user!,
      req.params.id as string,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Project update retrieved successfully",
      data: result,
    });
  },
);

export const ProjectUpdateController = {
  createProjectUpdate,
  getProjectUpdates,
  getSingleProjectUpdate,
};
