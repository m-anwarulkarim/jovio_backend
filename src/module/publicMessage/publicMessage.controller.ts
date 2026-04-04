import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PublicMessageService } from "./publicMessage.service";

const createVisitorMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await PublicMessageService.createVisitorMessageIntoDB(
    req.body,
    req,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Message sent successfully",
    data: result,
  });
});

const createAdminReply = catchAsync(async (req: Request, res: Response) => {
  const result = await PublicMessageService.createAdminReplyIntoDB(
    req.user!,
    req.body,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Reply sent successfully",
    data: result,
  });
});

const getVisitorMessages = catchAsync(async (req: Request, res: Response) => {
  const { visitorId } = req.params;

  const result = await PublicMessageService.getVisitorMessagesFromDB(
    visitorId as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Messages retrieved successfully",
    data: result,
  });
});

const getAllPublicMessages = catchAsync(async (req: Request, res: Response) => {
  const result = await PublicMessageService.getAllPublicMessagesFromDB(
    req.user!,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Public messages retrieved successfully",
    data: result,
  });
});

const getSingleVisitorConversation = catchAsync(
  async (req: Request, res: Response) => {
    const { visitorId } = req.params;

    const result =
      await PublicMessageService.getSingleVisitorConversationFromDB(
        req.user!,
        visitorId as string,
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Conversation retrieved successfully",
      data: result,
    });
  },
);

const markPublicMessageAsRead = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PublicMessageService.markPublicMessageAsReadIntoDB(
      req.user!,
      req.params.id as string,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Message marked as read successfully",
      data: result,
    });
  },
);

export const PublicMessageController = {
  createVisitorMessage,
  createAdminReply,
  getVisitorMessages,
  getAllPublicMessages,
  getSingleVisitorConversation,
  markPublicMessageAsRead,
};
