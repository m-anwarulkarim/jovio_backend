import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TaskAttachmentService } from "./taskAttachment.service";

const uploadAttachment = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskAttachmentService.uploadAttachment(
    req,
    req.params.taskId as string,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "File uploaded successfully",
    data: result,
  });
});

const getAttachments = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskAttachmentService.getAttachments(
    req,
    req.params.taskId as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Attachments retrieved",
    data: result,
  });
});

const deleteAttachment = catchAsync(async (req: Request, res: Response) => {
  await TaskAttachmentService.deleteAttachment(
    req,
    req.params.attachmentId as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Attachment deleted",
    data: null,
  });
});

export const TaskAttachmentController = {
  uploadAttachment,
  getAttachments,
  deleteAttachment,
};
