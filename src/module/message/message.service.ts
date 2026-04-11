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
  TCreateDirectMessagePayload,
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
  if (conversationType === "DIRECT") {
    return MessageConversationType.DIRECT;
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
    message.projectId!,
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

// ============================================================
// নতুন FUNCTIONS — existing code এর পরে যোগ করো
// ============================================================

const findAvailableAdmin = async () => {
  const admin = await prisma.user.findFirst({
    where: {
      role: UserRole.ADMIN,
      isActive: true,
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
    },
  });

  if (!admin) {
    throw new AppError(404, "No admin available", "ADMIN_NOT_FOUND");
  }

  return admin;
};

const findExistingDirectConversationAdmin = async (userId: string) => {
  const lastDirectMessage = await prisma.message.findFirst({
    where: {
      conversationType: MessageConversationType.DIRECT,
      OR: [{ senderId: userId }, { receiverId: userId }],
      sender: { role: UserRole.ADMIN },
    },
    orderBy: { createdAt: "desc" },
    select: { senderId: true },
  });

  if (lastDirectMessage) {
    const admin = await prisma.user.findFirst({
      where: {
        id: lastDirectMessage.senderId,
        role: UserRole.ADMIN,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });

    if (admin) return admin;
  }

  const lastReceivedMessage = await prisma.message.findFirst({
    where: {
      conversationType: MessageConversationType.DIRECT,
      senderId: userId,
      receiverId: { not: null },
    },
    orderBy: { createdAt: "desc" },
    select: { receiverId: true },
  });

  if (lastReceivedMessage?.receiverId) {
    const admin = await prisma.user.findFirst({
      where: {
        id: lastReceivedMessage.receiverId,
        role: UserRole.ADMIN,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });

    if (admin) return admin;
  }

  return null;
};

// ---------- Client/Employee sends direct message to Admin ----------
const createDirectMessageIntoDB = async (
  user: TAuthUser,
  payload: TCreateDirectMessagePayload,
) => {
  const { text } = payload;

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

  if (text.trim().length > 2000) {
    throw new AppError(
      400,
      "Message text cannot exceed 2000 characters",
      "MESSAGE_TEXT_TOO_LONG",
    );
  }

  // find existing admin from previous conversation or assign new one
  let admin = await findExistingDirectConversationAdmin(user.id);

  if (!admin) {
    admin = await findAvailableAdmin();
  }

  const senderTypeMap: Record<string, MessageSenderType> = {
    ADMIN: MessageSenderType.ADMIN,
    EMPLOYEE: MessageSenderType.EMPLOYEE,
    CLIENT: MessageSenderType.CLIENT,
  };

  const message = await prisma.message.create({
    data: {
      senderId: user.id,
      receiverId: admin.id,
      senderType:
        senderTypeMap[user.role || "CLIENT"] || MessageSenderType.CLIENT,
      conversationType: MessageConversationType.DIRECT,
      type: MessageType.TEXT,
      text: text.trim(),
      projectId: null,
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
      receiver: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          image: true,
        },
      },
      attachments: true,
    },
  });

  // create notification for admin
  await prisma.notification.create({
    data: {
      userId: admin.id,
      type: NotificationType.NEW_MESSAGE,
      title: "New direct message",
      body: `${message.sender.name || "A user"} sent you a direct message`,
    },
  });

  // emit socket events
  io.to(`user:${user.id}`).emit("direct-message:new", message);
  io.to(`user:${admin.id}`).emit("direct-message:new", message);

  return message;
};

// ---------- Admin replies to direct message ----------
const createAdminDirectReplyIntoDB = async (
  user: TAuthUser,
  payload: { receiverId: string; text: string },
) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  if (user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }

  const { receiverId, text } = payload;

  if (!receiverId || !receiverId.trim()) {
    throw new AppError(400, "Receiver id is required", "RECEIVER_ID_REQUIRED");
  }

  if (!text || !text.trim()) {
    throw new AppError(
      400,
      "Message text is required",
      "MESSAGE_TEXT_REQUIRED",
    );
  }

  if (text.trim().length > 2000) {
    throw new AppError(
      400,
      "Message text cannot exceed 2000 characters",
      "MESSAGE_TEXT_TOO_LONG",
    );
  }

  // verify receiver exists
  const receiver = await prisma.user.findUnique({
    where: { id: receiverId.trim() },
    select: { id: true, name: true, role: true },
  });

  if (!receiver) {
    throw new AppError(404, "User not found", "USER_NOT_FOUND");
  }

  // verify conversation exists
  const conversationExists = await prisma.message.findFirst({
    where: {
      conversationType: MessageConversationType.DIRECT,
      OR: [{ senderId: receiverId.trim() }, { receiverId: receiverId.trim() }],
    },
    select: { id: true },
  });

  if (!conversationExists) {
    throw new AppError(
      404,
      "No conversation found with this user",
      "CONVERSATION_NOT_FOUND",
    );
  }

  const message = await prisma.message.create({
    data: {
      senderId: user.id,
      receiverId: receiverId.trim(),
      senderType: MessageSenderType.ADMIN,
      conversationType: MessageConversationType.DIRECT,
      type: MessageType.TEXT,
      text: text.trim(),
      projectId: null,
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
      receiver: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          image: true,
        },
      },
      attachments: true,
    },
  });

  // notification for receiver
  await prisma.notification.create({
    data: {
      userId: receiverId.trim(),
      type: NotificationType.NEW_MESSAGE,
      title: "New message from Admin",
      body: `Admin replied to your message`,
    },
  });

  io.to(`user:${user.id}`).emit("direct-message:new", message);
  io.to(`user:${receiverId.trim()}`).emit("direct-message:new", message);

  return message;
};

// ---------- Get direct conversation between user and admin ----------
const getDirectMessagesFromDB = async (
  user: TAuthUser,
  otherUserId?: string,
) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  let targetUserId: string;

  if (user.role === UserRole.ADMIN) {
    // admin must provide the other user's id
    if (!otherUserId || !otherUserId.trim()) {
      throw new AppError(400, "User id is required", "USER_ID_REQUIRED");
    }
    targetUserId = otherUserId.trim();
  } else {
    // client/employee — find their admin conversation partner
    const admin = await findExistingDirectConversationAdmin(user.id);
    if (!admin) {
      return [];
    }
    targetUserId = admin.id;
  }

  const messages = await prisma.message.findMany({
    where: {
      conversationType: MessageConversationType.DIRECT,
      OR: [
        { senderId: user.id, receiverId: targetUserId },
        { senderId: targetUserId, receiverId: user.id },
      ],
    },
    orderBy: { createdAt: "asc" },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          role: true,
          image: true,
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
          role: true,
          image: true,
        },
      },
      attachments: true,
    },
  });

  return messages;
};

// ---------- Admin gets all direct conversation inbox ----------
const getDirectInboxFromDB = async (
  user: TAuthUser,
  pagination?: { page?: number; limit?: number },
) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  if (user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }

  const page =
    pagination?.page && pagination.page > 0 ? Math.floor(pagination.page) : 1;
  const limit =
    pagination?.limit && pagination.limit > 0
      ? Math.min(Math.floor(pagination.limit), 50)
      : 20;
  const skip = (page - 1) * limit;

  // find all unique users who have direct conversations
  const allDirectMessages = await prisma.message.findMany({
    where: {
      conversationType: MessageConversationType.DIRECT,
    },
    select: {
      senderId: true,
      receiverId: true,
    },
    distinct: ["senderId", "receiverId"],
  });

  // extract unique non-admin user ids
  const userIdSet = new Set<string>();

  for (const msg of allDirectMessages) {
    if (msg.senderId !== user.id) userIdSet.add(msg.senderId);
    if (msg.receiverId && msg.receiverId !== user.id)
      userIdSet.add(msg.receiverId);
  }

  const uniqueUserIds = Array.from(userIdSet);
  const total = uniqueUserIds.length;
  const paginatedUserIds = uniqueUserIds.slice(skip, skip + limit);

  const inboxItems = await Promise.all(
    paginatedUserIds.map(async (userId) => {
      const [latestMessage, unreadCount, totalMessages, userInfo] =
        await Promise.all([
          prisma.message.findFirst({
            where: {
              conversationType: MessageConversationType.DIRECT,
              OR: [
                { senderId: userId, receiverId: user.id },
                { senderId: user.id, receiverId: userId },
              ],
            },
            orderBy: { createdAt: "desc" },
            include: {
              sender: {
                select: {
                  id: true,
                  name: true,
                  role: true,
                  image: true,
                },
              },
            },
          }),
          prisma.message.count({
            where: {
              conversationType: MessageConversationType.DIRECT,
              senderId: userId,
              receiverId: user.id,
              isRead: false,
            },
          }),
          prisma.message.count({
            where: {
              conversationType: MessageConversationType.DIRECT,
              OR: [
                { senderId: userId, receiverId: user.id },
                { senderId: user.id, receiverId: userId },
              ],
            },
          }),
          prisma.user.findUnique({
            where: { id: userId },
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              image: true,
            },
          }),
        ]);

      return {
        user: userInfo,
        lastMessageAt: latestMessage?.createdAt ?? null,
        unreadCount,
        totalMessages,
        latestMessage,
      };
    }),
  );

  // sort by latest message
  inboxItems.sort((a, b) => {
    const dateA = a.lastMessageAt?.getTime() ?? 0;
    const dateB = b.lastMessageAt?.getTime() ?? 0;
    return dateB - dateA;
  });

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: inboxItems,
  };
};

// ---------- Mark direct conversation as read ----------
const markDirectConversationAsReadIntoDB = async (
  user: TAuthUser,
  otherUserId: string,
) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  if (!otherUserId || !otherUserId.trim()) {
    throw new AppError(400, "User id is required", "USER_ID_REQUIRED");
  }

  const result = await prisma.message.updateMany({
    where: {
      conversationType: MessageConversationType.DIRECT,
      senderId: otherUserId.trim(),
      receiverId: user.id,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });

  io.to(`user:${user.id}`).emit("direct-message:conversation-read", {
    otherUserId: otherUserId.trim(),
    updatedCount: result.count,
  });

  io.to(`user:${otherUserId.trim()}`).emit("direct-message:conversation-read", {
    otherUserId: user.id,
    updatedCount: result.count,
  });

  return {
    otherUserId: otherUserId.trim(),
    updatedCount: result.count,
  };
};

export const MessageService = {
  createMessageIntoDB,
  getMessagesFromDB,
  markMessageAsReadIntoDB,
  markDirectConversationAsReadIntoDB,
  getDirectInboxFromDB,
  getDirectMessagesFromDB,
  createDirectMessageIntoDB,
  createAdminDirectReplyIntoDB,
};
