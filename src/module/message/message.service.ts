import {
  MessageConversationType,
  MessageSenderType,
  MessageType,
  NotificationType,
  UserRole,
} from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";
import type {
  TConversationType,
  TCreateMessagePayload,
} from "./message.interface";
import { io } from "../../server";

type TAuthUser = {
  id: string;
  role?: string | null;
};

const getConversationTypeEnum = (conversationType: TConversationType) => {
  if (conversationType === "ADMIN_CLIENT") {
    return MessageConversationType.ADMIN_CLIENT;
  }

  return MessageConversationType.ADMIN_EMPLOYEE;
};

const validateConversationAccess = async (
  user: TAuthUser,
  projectId: string,
  conversationType: TConversationType,
) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      projectId: true,
      title: true,
      clientId: true,
      assignedEmployeeId: true,
      assignedByAdminId: true,
    },
  });

  if (!project) {
    throw new AppError(404, "Project not found", "PROJECT_NOT_FOUND");
  }

  if (conversationType === "ADMIN_CLIENT") {
    if (user.role === UserRole.CLIENT && project.clientId !== user.id) {
      throw new AppError(403, "Forbidden", "FORBIDDEN");
    }

    if (user.role === UserRole.EMPLOYEE) {
      throw new AppError(
        403,
        "Employee cannot access admin-client conversation",
        "FORBIDDEN",
      );
    }

    if (user.role === UserRole.ADMIN) {
      return project;
    }

    if (user.role === UserRole.CLIENT) {
      return project;
    }
  }

  if (conversationType === "ADMIN_EMPLOYEE") {
    if (user.role === UserRole.CLIENT) {
      throw new AppError(
        403,
        "Client cannot access admin-employee conversation",
        "FORBIDDEN",
      );
    }

    if (
      user.role === UserRole.EMPLOYEE &&
      project.assignedEmployeeId !== user.id
    ) {
      throw new AppError(
        403,
        "You are not assigned to this project",
        "FORBIDDEN",
      );
    }

    if (user.role === UserRole.ADMIN || user.role === UserRole.EMPLOYEE) {
      return project;
    }
  }

  throw new AppError(403, "Forbidden", "FORBIDDEN");
};

const createNotificationForUsers = async ({
  receiverIds,
  projectId,
  projectCode,
  conversationType,
  senderRole,
}: {
  receiverIds: string[];
  projectId: string;
  projectCode: string;
  conversationType: TConversationType;
  senderRole?: string | null;
}) => {
  const uniqueReceiverIds = [...new Set(receiverIds.filter(Boolean))];

  if (!uniqueReceiverIds.length) {
    return;
  }

  const conversationLabel =
    conversationType === "ADMIN_CLIENT"
      ? "admin-client conversation"
      : "admin-employee conversation";

  const senderLabel =
    senderRole === UserRole.ADMIN
      ? "Admin"
      : senderRole === UserRole.EMPLOYEE
        ? "Employee"
        : "Client";

  await prisma.notification.createMany({
    data: uniqueReceiverIds.map((userId) => ({
      userId,
      projectId,
      type: NotificationType.NEW_MESSAGE,
      title: "New message received",
      body: `${senderLabel} sent a new message in ${conversationLabel} for project ${projectCode}`,
    })),
  });
};

const createMessageIntoDB = async (
  user: TAuthUser,
  payload: TCreateMessagePayload,
) => {
  const { projectId, text, type, conversationType } = payload;

  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  if (!projectId) {
    throw new AppError(400, "Project id is required", "PROJECT_ID_REQUIRED");
  }

  if (!conversationType) {
    throw new AppError(
      400,
      "Conversation type is required",
      "CONVERSATION_TYPE_REQUIRED",
    );
  }

  if (!text || !text.trim()) {
    throw new AppError(
      400,
      "Message text is required",
      "MESSAGE_TEXT_REQUIRED",
    );
  }

  const project = await validateConversationAccess(
    user,
    projectId,
    conversationType,
  );

  const senderTypeMap: Record<string, MessageSenderType> = {
    ADMIN: MessageSenderType.ADMIN,
    EMPLOYEE: MessageSenderType.EMPLOYEE,
    CLIENT: MessageSenderType.CLIENT,
  };

  const message = await prisma.message.create({
    data: {
      projectId,
      senderId: user.id,
      senderType:
        senderTypeMap[user.role || "CLIENT"] || MessageSenderType.CLIENT,
      conversationType: getConversationTypeEnum(conversationType),
      type: (type as MessageType) || MessageType.TEXT,
      text: text.trim(),
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          image: true,
        },
      },
      project: {
        select: {
          id: true,
          projectId: true,
          title: true,
          clientId: true,
          assignedEmployeeId: true,
          assignedByAdminId: true,
        },
      },
      attachments: true,
    },
  });

  await prisma.project.update({
    where: { id: projectId },
    data: {
      updatedAt: new Date(),
    },
  });

  const notificationReceiverIds: string[] = [];

  if (conversationType === "ADMIN_CLIENT") {
    if (project.clientId && project.clientId !== user.id) {
      notificationReceiverIds.push(project.clientId);
    }

    if (project.assignedByAdminId && project.assignedByAdminId !== user.id) {
      notificationReceiverIds.push(project.assignedByAdminId);
    }
  }

  if (conversationType === "ADMIN_EMPLOYEE") {
    if (project.assignedEmployeeId && project.assignedEmployeeId !== user.id) {
      notificationReceiverIds.push(project.assignedEmployeeId);
    }

    if (project.assignedByAdminId && project.assignedByAdminId !== user.id) {
      notificationReceiverIds.push(project.assignedByAdminId);
    }
  }

  await createNotificationForUsers({
    receiverIds: notificationReceiverIds,
    projectId: project.id,
    projectCode: project.projectId,
    conversationType,
    senderRole: user.role,
  });

  const roomKey = `project:${projectId}:${conversationType}`;

  io.to(roomKey).emit("message:new", message);

  io.to(`user:${message.senderId}`).emit("message:new", message);

  if (
    conversationType === "ADMIN_CLIENT" &&
    message.project?.clientId &&
    message.project.clientId !== message.senderId
  ) {
    io.to(`user:${message.project.clientId}`).emit("message:new", message);
  }

  if (
    conversationType === "ADMIN_CLIENT" &&
    message.project?.assignedByAdminId &&
    message.project.assignedByAdminId !== message.senderId
  ) {
    io.to(`user:${message.project.assignedByAdminId}`).emit(
      "message:new",
      message,
    );
  }

  if (
    conversationType === "ADMIN_EMPLOYEE" &&
    message.project?.assignedEmployeeId &&
    message.project.assignedEmployeeId !== message.senderId
  ) {
    io.to(`user:${message.project.assignedEmployeeId}`).emit(
      "message:new",
      message,
    );
  }

  if (
    conversationType === "ADMIN_EMPLOYEE" &&
    message.project?.assignedByAdminId &&
    message.project.assignedByAdminId !== message.senderId
  ) {
    io.to(`user:${message.project.assignedByAdminId}`).emit(
      "message:new",
      message,
    );
  }

  return message;
};

const getMessagesFromDB = async (
  user: TAuthUser,
  projectId: string,
  conversationType: TConversationType,
) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  if (!projectId) {
    throw new AppError(400, "Project id is required", "PROJECT_ID_REQUIRED");
  }

  if (!conversationType) {
    throw new AppError(
      400,
      "Conversation type is required",
      "CONVERSATION_TYPE_REQUIRED",
    );
  }

  await validateConversationAccess(user, projectId, conversationType);

  const messages = await prisma.message.findMany({
    where: {
      projectId,
      conversationType: getConversationTypeEnum(conversationType),
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          role: true,
          image: true,
        },
      },
      attachments: true,
      project: {
        select: {
          id: true,
          projectId: true,
          title: true,
          clientId: true,
          assignedEmployeeId: true,
          assignedByAdminId: true,
        },
      },
    },
  });

  return messages;
};

const markMessageAsReadIntoDB = async (user: TAuthUser, messageId: string) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  const message = await prisma.message.findUnique({
    where: { id: messageId },
    include: {
      project: {
        select: {
          id: true,
          clientId: true,
          assignedEmployeeId: true,
          assignedByAdminId: true,
        },
      },
      sender: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
    },
  });

  if (!message) {
    throw new AppError(404, "Message not found", "MESSAGE_NOT_FOUND");
  }

  await validateConversationAccess(
    user,
    message.projectId,
    message.conversationType as TConversationType,
  );

  const updatedMessage = await prisma.message.update({
    where: { id: messageId },
    data: {
      isRead: true,
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          role: true,
          image: true,
        },
      },
      attachments: true,
      project: {
        select: {
          id: true,
          projectId: true,
          title: true,
          clientId: true,
          assignedEmployeeId: true,
          assignedByAdminId: true,
        },
      },
    },
  });

  const roomKey = `project:${updatedMessage.projectId}:${updatedMessage.conversationType}`;

  io.to(roomKey).emit("message:read", {
    messageId: updatedMessage.id,
    isRead: updatedMessage.isRead,
    projectId: updatedMessage.projectId,
    conversationType: updatedMessage.conversationType,
    readByUserId: user.id,
  });

  io.to(`user:${updatedMessage.senderId}`).emit("message:read", {
    messageId: updatedMessage.id,
    isRead: updatedMessage.isRead,
    projectId: updatedMessage.projectId,
    conversationType: updatedMessage.conversationType,
    readByUserId: user.id,
  });

  return updatedMessage;
};

export const MessageService = {
  createMessageIntoDB,
  getMessagesFromDB,
  markMessageAsReadIntoDB,
};
