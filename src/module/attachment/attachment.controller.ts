import type { Request, Response } from "express";
import { AttachmentService } from "./attachment.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createAttachment = catchAsync(async (req: Request, res: Response) => {
  const result = await AttachmentService.createAttachmentIntoDB(
    req.user!,
    req.body,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Attachment created successfully",
    data: result,
  });
});

const getAttachments = catchAsync(async (req: Request, res: Response) => {
  const result = await AttachmentService.getAttachmentsFromDB(
    req.user!,
    req.query,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Attachments retrieved successfully",
    data: result,
  });
});

const getSingleAttachment = catchAsync(async (req: Request, res: Response) => {
  const result = await AttachmentService.getSingleAttachmentFromDB(
    req.user!,
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Attachment retrieved successfully",
    data: result,
  });
});

const deleteAttachment = catchAsync(async (req: Request, res: Response) => {
  const result = await AttachmentService.deleteAttachmentFromDB(
    req.user!,
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Attachment deleted successfully",
    data: result,
  });
});

export const AttachmentController = {
  createAttachment,
  getAttachments,
  getSingleAttachment,
  deleteAttachment,
};
