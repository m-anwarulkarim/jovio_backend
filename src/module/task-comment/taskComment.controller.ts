import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TaskCommentService } from "./taskComment.service";

const createComment = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskCommentService.createComment(
    req,
    req.params.taskId as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Comment added successfully",
    data: result,
  });
});

const getTaskComments = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskCommentService.getTaskComments(
    req,
    req.params.taskId as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Comments retrieved successfully",
    data: result,
  });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  await TaskCommentService.deleteComment(req, req.params.commentId as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Comment deleted successfully",
    data: null,
  });
});

export const TaskCommentController = {
  createComment,
  getTaskComments,
  deleteComment,
};
