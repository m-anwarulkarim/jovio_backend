import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TaskService } from "./task.service";

const createTask = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskService.createTask(req, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Task created successfully",
    data: result,
  });
});

const getAllTasks = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskService.getAllTasks(req, req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tasks retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleTask = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskService.getSingleTask(
    req,
    req.params.taskId as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task retrieved successfully",
    data: result,
  });
});

const updateTask = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskService.updateTask(
    req,
    req.params.taskId as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task updated successfully",
    data: result,
  });
});

const updateMyTaskStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskService.updateMyTaskStatus(
    req,
    req.params.taskId as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task status updated successfully",
    data: result,
  });
});

const deleteTask = catchAsync(async (req: Request, res: Response) => {
  await TaskService.deleteTask(req, req.params.taskId as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task deleted successfully",
    data: null,
  });
});

export const TaskController = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  updateMyTaskStatus,
  deleteTask,
};
