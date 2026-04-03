import type { Request, Response } from "express";
import { NotificationService } from "./notification.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const getNotifications = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.getNotificationsFromDB(
    req.user!,
    req.query,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Notifications retrieved successfully",
    data: result,
  });
});

const getUnreadCount = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.getUnreadNotificationCountFromDB(
    req.user!,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Unread notification count retrieved successfully",
    data: result,
  });
});

const getSingleNotification = catchAsync(
  async (req: Request, res: Response) => {
    const result = await NotificationService.getSingleNotificationFromDB(
      req.user!,
      req.params.id as string,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Notification retrieved successfully",
      data: result,
    });
  },
);

const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.markNotificationAsReadIntoDB(
    req.user!,
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Notification marked as read successfully",
    data: result,
  });
});

const markAllAsRead = catchAsync(async (req: Request, res: Response) => {
  await NotificationService.markAllNotificationsAsReadIntoDB(req.user!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All notifications marked as read successfully",
    data: null,
  });
});

const deleteNotification = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.deleteNotificationFromDB(
    req.user!,
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Notification deleted successfully",
    data: result,
  });
});

export const NotificationController = {
  getNotifications,
  getUnreadCount,
  getSingleNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};
