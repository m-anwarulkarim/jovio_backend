import type { Request, Response } from "express";
import { ProjectService } from "./project.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const getProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getProjectsFromDB(req.user!, req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Projects retrieved successfully",
    data: result,
  });
});

const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getSingleProjectFromDB(
    req.user!,
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project retrieved successfully",
    data: result,
  });
});

const assignEmployee = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.assignEmployeeIntoDB(
    req.user!,
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Employee assigned successfully",
    data: result,
  });
});

const changeProjectStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.changeProjectStatusIntoDB(
    req.user!,
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project status updated successfully",
    data: result,
  });
});

export const ProjectController = {
  getProjects,
  getSingleProject,
  assignEmployee,
  changeProjectStatus,
};
