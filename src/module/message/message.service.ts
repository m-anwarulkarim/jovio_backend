import {
  MessageSenderType,
  MessageType,
  UserRole,
} from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";
import type { TCreateMessagePayload } from "./message.interface";
import { io } from "../../server";

type TAuthUser = {
  id: string;
  role?: string | null;
};

const createMessageIntoDB = async (
  user: TAuthUser,
  payload: TCreateMessagePayload,
) => {
  const { projectId, text, type } = payload;

  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  if (!text || !text.trim()) {
    throw new AppError(
      400,
      "Message text is required",
      "MESSAGE_TEXT_REQUIRED",
    );
  }

  let project: {
    id: string;
    projectId: string;
    title: string;
    clientId: string;
    assignedEmployeeId: string | null;
    assignedByAdminId: string | null;
  } | null = null;

  if (projectId) {
    project = await prisma.project.findUnique({
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

    if (user.role === UserRole.CLIENT && project.clientId !== user.id) {
      throw new AppError(
        403,
        "You cannot message on this project",
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
  }

  const senderTypeMap: Record<string, MessageSenderType> = {
    ADMIN: MessageSenderType.ADMIN,
    EMPLOYEE: MessageSenderType.EMPLOYEE,
    CLIENT: MessageSenderType.CLIENT,
  };

  const message = await prisma.message.create({
    data: {
      projectId: projectId || null,
      senderId: user.id,
      senderType:
        senderTypeMap[user.role || "CLIENT"] || MessageSenderType.CLIENT,
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

  if (projectId) {
    await prisma.project.update({
      where: { id: projectId },
      data: {
        updatedAt: new Date(),
      },
    });
  }

  // ===== Real-time emit start =====
  if (projectId) {
    io.to(`project:${projectId}`).emit("message:new", message);
  }

  io.to(`user:${message.senderId}`).emit("message:new", message);

  if (
    message.project?.clientId &&
    message.project.clientId !== message.senderId
  ) {
    io.to(`user:${message.project.clientId}`).emit("message:new", message);
  }

  if (
    message.project?.assignedEmployeeId &&
    message.project.assignedEmployeeId !== message.senderId
  ) {
    io.to(`user:${message.project.assignedEmployeeId}`).emit(
      "message:new",
      message,
    );
  }

  if (
    message.project?.assignedByAdminId &&
    message.project.assignedByAdminId !== message.senderId
  ) {
    io.to(`user:${message.project.assignedByAdminId}`).emit(
      "message:new",
      message,
    );
  }
  // ===== Real-time emit end =====

  return message;
};

const getMessagesFromDB = async (user: TAuthUser, projectId?: string) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  const whereClause: {
    projectId?: string;
    senderId?: string;
  } = {};

  if (projectId) {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: {
        id: true,
        clientId: true,
        assignedEmployeeId: true,
      },
    });

    if (!project) {
      throw new AppError(404, "Project not found", "PROJECT_NOT_FOUND");
    }

    if (user.role === UserRole.CLIENT && project.clientId !== user.id) {
      throw new AppError(403, "Forbidden", "FORBIDDEN");
    }

    if (
      user.role === UserRole.EMPLOYEE &&
      project.assignedEmployeeId !== user.id
    ) {
      throw new AppError(403, "Forbidden", "FORBIDDEN");
    }

    whereClause.projectId = projectId;
  } else if (user.role === UserRole.CLIENT) {
    whereClause.senderId = user.id;
  }

  const messages = await prisma.message.findMany({
    where: whereClause,
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

  if (message.project) {
    if (user.role === UserRole.CLIENT && message.project.clientId !== user.id) {
      throw new AppError(403, "Forbidden", "FORBIDDEN");
    }

    if (
      user.role === UserRole.EMPLOYEE &&
      message.project.assignedEmployeeId !== user.id
    ) {
      throw new AppError(403, "Forbidden", "FORBIDDEN");
    }
  }

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

  // ===== Real-time read emit =====
  if (updatedMessage.projectId) {
    io.to(`project:${updatedMessage.projectId}`).emit("message:read", {
      messageId: updatedMessage.id,
      isRead: updatedMessage.isRead,
      projectId: updatedMessage.projectId,
      readByUserId: user.id,
    });
  }

  io.to(`user:${updatedMessage.senderId}`).emit("message:read", {
    messageId: updatedMessage.id,
    isRead: updatedMessage.isRead,
    projectId: updatedMessage.projectId,
    readByUserId: user.id,
  });
  // ===== Real-time read emit end =====

  return updatedMessage;
};

export const MessageService = {
  createMessageIntoDB,
  getMessagesFromDB,
  markMessageAsReadIntoDB,
};
