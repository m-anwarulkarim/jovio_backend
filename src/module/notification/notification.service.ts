import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";
import type { TGetNotificationsQuery } from "./notification.interface";

type TAuthUser = {
  id: string;
  role?: string | null;
};

const getNotificationsFromDB = async (
  user: TAuthUser,
  query: TGetNotificationsQuery,
) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  const andConditions: Array<Record<string, unknown>> = [{ userId: user.id }];

  if (query.isRead === "true") {
    andConditions.push({ isRead: true });
  }

  if (query.isRead === "false") {
    andConditions.push({ isRead: false });
  }

  if (query.type) {
    andConditions.push({ type: query.type });
  }

  const notifications = await prisma.notification.findMany({
    where: {
      AND: andConditions,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      project: {
        select: {
          id: true,
          projectId: true,
          title: true,
          status: true,
        },
      },
      offer: {
        select: {
          id: true,
          offerId: true,
          title: true,
          status: true,
          price: true,
        },
      },
    },
  });

  return notifications;
};

const getUnreadNotificationCountFromDB = async (user: TAuthUser) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  const total = await prisma.notification.count({
    where: {
      userId: user.id,
      isRead: false,
    },
  });

  return { unreadCount: total };
};

const getSingleNotificationFromDB = async (
  user: TAuthUser,
  notificationId: string,
) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  const notification = await prisma.notification.findFirst({
    where: {
      id: notificationId,
      userId: user.id,
    },
    include: {
      project: {
        select: {
          id: true,
          projectId: true,
          title: true,
          status: true,
        },
      },
      offer: {
        select: {
          id: true,
          offerId: true,
          title: true,
          status: true,
          price: true,
        },
      },
    },
  });

  if (!notification) {
    throw new AppError(404, "Notification not found", "NOTIFICATION_NOT_FOUND");
  }

  return notification;
};

const markNotificationAsReadIntoDB = async (
  user: TAuthUser,
  notificationId: string,
) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  const notification = await prisma.notification.findFirst({
    where: {
      id: notificationId,
      userId: user.id,
    },
  });

  if (!notification) {
    throw new AppError(404, "Notification not found", "NOTIFICATION_NOT_FOUND");
  }

  const updatedNotification = await prisma.notification.update({
    where: { id: notificationId },
    data: {
      isRead: true,
    },
  });

  return updatedNotification;
};

const markAllNotificationsAsReadIntoDB = async (user: TAuthUser) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  await prisma.notification.updateMany({
    where: {
      userId: user.id,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });

  return null;
};

const deleteNotificationFromDB = async (
  user: TAuthUser,
  notificationId: string,
) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  const notification = await prisma.notification.findFirst({
    where: {
      id: notificationId,
      userId: user.id,
    },
  });

  if (!notification) {
    throw new AppError(404, "Notification not found", "NOTIFICATION_NOT_FOUND");
  }

  const deletedNotification = await prisma.notification.delete({
    where: { id: notificationId },
  });

  return deletedNotification;
};

export const NotificationService = {
  getNotificationsFromDB,
  getUnreadNotificationCountFromDB,
  getSingleNotificationFromDB,
  markNotificationAsReadIntoDB,
  markAllNotificationsAsReadIntoDB,
  deleteNotificationFromDB,
};
