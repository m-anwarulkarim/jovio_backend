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
  const { projectId, conversationType } = req.query;

  const result = await MessageService.getMessagesFromDB(
    req.user!,
    projectId as string,
    conversationType as "ADMIN_CLIENT" | "ADMIN_EMPLOYEE",
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

const createDirectMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageService.createDirectMessageIntoDB(
    req.user!,
    req.body,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Direct message sent successfully",
    data: result,
  });
});

const createAdminDirectReply = catchAsync(
  async (req: Request, res: Response) => {
    const result = await MessageService.createAdminDirectReplyIntoDB(
      req.user!,
      req.body,
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Reply sent successfully",
      data: result,
    });
  },
);

const getDirectMessages = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageService.getDirectMessagesFromDB(
    req.user!,
    req.query.userId as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Direct messages retrieved successfully",
    data: result,
  });
});

const getDirectInbox = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageService.getDirectInboxFromDB(req.user!, {
    page: Number(req.query.page),
    limit: Number(req.query.limit),
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Direct inbox retrieved successfully",
    data: result,
  });
});

const markDirectConversationAsRead = catchAsync(
  async (req: Request, res: Response) => {
    const result = await MessageService.markDirectConversationAsReadIntoDB(
      req.user!,
      req.params.userId as string,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Conversation marked as read",
      data: result,
    });
  },
);

export const MessageController = {
  createMessage,
  getMessages,
  markMessageAsRead,
  createDirectMessage,
  createAdminDirectReply,
  getDirectMessages,
  getDirectInbox,
  markDirectConversationAsRead,
};
