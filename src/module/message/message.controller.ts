import type { Request, Response } from "express";
import { MessageService } from "./message.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageService.createMessageIntoDB(req.user!, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Message sent successfully",
    data: result,
  });
});

const getMessages = catchAsync(async (req: Request, res: Response) => {
  const { projectId } = req.query;

  const result = await MessageService.getMessagesFromDB(
    req.user!,
    projectId as string | undefined,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Messages retrieved successfully",
    data: result,
  });
});

const markMessageAsRead = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageService.markMessageAsReadIntoDB(
    req.user!,
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Message marked as read",
    data: result,
  });
});

export const MessageController = {
  createMessage,
  getMessages,
  markMessageAsRead,
};
