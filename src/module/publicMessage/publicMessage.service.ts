import { PublicSenderType, UserRole } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";
import { io } from "../../server";
import type {
  TCreateAdminReplyPayload,
  TCreateVisitorMessagePayload,
} from "./publicMessage.interface";

type TAuthUser = {
  id: string;
  role?: string | null;
};

type TPaginationParams = {
  page?: number;
  limit?: number;
};

const MAX_MESSAGE_LENGTH = 2000;

const normalizePagination = (pagination?: TPaginationParams) => {
  const page =
    pagination?.page && pagination.page > 0 ? Math.floor(pagination.page) : 1;

  const limit =
    pagination?.limit && pagination.limit > 0
      ? Math.min(Math.floor(pagination.limit), 50)
      : 20;

  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

const validateMessageText = (text: string) => {
  if (!text || !text.trim()) {
    throw new AppError(
      400,
      "Message text is required",
      "MESSAGE_TEXT_REQUIRED",
    );
  }

  if (text.trim().length > MAX_MESSAGE_LENGTH) {
    throw new AppError(
      400,
      `Message text cannot exceed ${MAX_MESSAGE_LENGTH} characters`,
      "MESSAGE_TEXT_TOO_LONG",
    );
  }
};

const findAssignedAdmin = async (visitorId: string) => {
  const latestConversationMessage = await prisma.publicMessage.findFirst({
    where: {
      visitorId,
      adminId: {
        not: null,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      adminId: true,
    },
  });

  if (latestConversationMessage?.adminId) {
    const existingAdmin = await prisma.user.findFirst({
      where: {
        id: latestConversationMessage.adminId,
        role: UserRole.ADMIN,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (existingAdmin) {
      return existingAdmin;
    }
  }

  const fallbackAdmin = await prisma.user.findFirst({
    where: {
      role: UserRole.ADMIN,
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (!fallbackAdmin) {
    throw new AppError(404, "Admin not found", "ADMIN_NOT_FOUND");
  }

  return fallbackAdmin;
};

const createVisitorMessageIntoDB = async (
  payload: TCreateVisitorMessagePayload,
  req: any,
) => {
  const { text } = payload;

  validateMessageText(text);

  let visitorId = req.cookies?.visitor_id;

  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 8)}`;

    req.res.cookie("visitor_id", visitorId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  }

  const assignedAdmin = await findAssignedAdmin(visitorId);

  const message = await prisma.publicMessage.create({
    data: {
      visitorId,
      senderType: PublicSenderType.VISITOR,
      text: text.trim(),
      ipAddress: req.ip,
      adminId: assignedAdmin?.id ?? null,
    },
    include: {
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  io.to(`visitor:${visitorId}`).emit("public-message:new", message);

  if (assignedAdmin?.id) {
    io.to(`user:${assignedAdmin.id}`).emit("public-message:new", message);
  }

  return {
    message,
    visitor: {
      visitorId,
    },
  };
};

const createAdminReplyIntoDB = async (
  user: TAuthUser,
  payload: TCreateAdminReplyPayload,
) => {
  const { visitorId, text } = payload;

  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  if (user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }

  if (!visitorId || !visitorId.trim()) {
    throw new AppError(400, "Visitor id is required", "VISITOR_ID_REQUIRED");
  }

  validateMessageText(text);

  const conversationExists = await prisma.publicMessage.findFirst({
    where: {
      visitorId: visitorId.trim(),
    },
    select: {
      id: true,
    },
  });

  if (!conversationExists) {
    throw new AppError(
      404,
      "Conversation not found for this visitor",
      "CONVERSATION_NOT_FOUND",
    );
  }

  const message = await prisma.publicMessage.create({
    data: {
      visitorId: visitorId.trim(),
      text: text.trim(),
      senderType: PublicSenderType.ADMIN,
      adminId: user.id,
      ipAddress: null,
    },
    include: {
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  io.to(`visitor:${message.visitorId}`).emit("public-message:new", message);
  io.to(`user:${user.id}`).emit("public-message:new", message);

  return message;
};

const getVisitorMessagesFromDB = async (
  visitorId: string,
  pagination?: TPaginationParams,
) => {
  if (!visitorId || !visitorId.trim()) {
    throw new AppError(400, "Visitor id is required", "VISITOR_ID_REQUIRED");
  }

  const { page, limit, skip } = normalizePagination(pagination);

  const [total, messages] = await Promise.all([
    prisma.publicMessage.count({
      where: {
        visitorId: visitorId.trim(),
      },
    }),
    prisma.publicMessage.findMany({
      where: {
        visitorId: visitorId.trim(),
      },
      orderBy: {
        createdAt: "asc",
      },
      skip,
      take: limit,
      include: {
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: messages,
  };
};

const getAllPublicMessagesFromDB = async (
  user: TAuthUser,
  pagination?: TPaginationParams,
) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  if (user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }

  const { page, limit, skip } = normalizePagination(pagination);

  const groupedVisitors = await prisma.publicMessage.groupBy({
    by: ["visitorId"],
    _max: {
      createdAt: true,
    },
    orderBy: {
      _max: {
        createdAt: "desc",
      },
    },
  });

  const total = groupedVisitors.length;
  const paginatedVisitors = groupedVisitors.slice(skip, skip + limit);

  const inboxItems = await Promise.all(
    paginatedVisitors.map(async (item) => {
      const [latestMessage, unreadCount, totalMessages] = await Promise.all([
        prisma.publicMessage.findFirst({
          where: {
            visitorId: item.visitorId,
          },
          orderBy: {
            createdAt: "desc",
          },
          include: {
            admin: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
          },
        }),
        prisma.publicMessage.count({
          where: {
            visitorId: item.visitorId,
            senderType: PublicSenderType.VISITOR,
            isRead: false,
          },
        }),
        prisma.publicMessage.count({
          where: {
            visitorId: item.visitorId,
          },
        }),
      ]);

      return {
        visitorId: item.visitorId,
        lastMessageAt: item._max.createdAt,
        unreadCount,
        totalMessages,
        latestMessage,
      };
    }),
  );

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

const getSingleVisitorConversationFromDB = async (
  user: TAuthUser,
  visitorId: string,
  pagination?: TPaginationParams,
) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  if (user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }

  if (!visitorId || !visitorId.trim()) {
    throw new AppError(400, "Visitor id is required", "VISITOR_ID_REQUIRED");
  }

  const { page, limit, skip } = normalizePagination(pagination);

  const [total, messages] = await Promise.all([
    prisma.publicMessage.count({
      where: {
        visitorId: visitorId.trim(),
      },
    }),
    prisma.publicMessage.findMany({
      where: {
        visitorId: visitorId.trim(),
      },
      orderBy: {
        createdAt: "asc",
      },
      skip,
      take: limit,
      include: {
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: messages,
  };
};

const markPublicMessageAsReadIntoDB = async (
  user: TAuthUser,
  messageId: string,
) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  if (user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }

  if (!messageId || !messageId.trim()) {
    throw new AppError(400, "Message id is required", "MESSAGE_ID_REQUIRED");
  }

  const existingMessage = await prisma.publicMessage.findUnique({
    where: {
      id: messageId,
    },
  });

  if (!existingMessage) {
    throw new AppError(404, "Message not found", "MESSAGE_NOT_FOUND");
  }

  const updatedMessage = await prisma.publicMessage.update({
    where: {
      id: messageId,
    },
    data: {
      isRead: true,
    },
    include: {
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  io.to(`user:${user.id}`).emit("public-message:read", {
    messageId: updatedMessage.id,
    visitorId: updatedMessage.visitorId,
    isRead: updatedMessage.isRead,
  });

  io.to(`visitor:${updatedMessage.visitorId}`).emit("public-message:read", {
    messageId: updatedMessage.id,
    visitorId: updatedMessage.visitorId,
    isRead: updatedMessage.isRead,
  });

  return updatedMessage;
};

const markVisitorConversationAsReadIntoDB = async (
  user: TAuthUser,
  visitorId: string,
) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  if (user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }

  if (!visitorId || !visitorId.trim()) {
    throw new AppError(400, "Visitor id is required", "VISITOR_ID_REQUIRED");
  }

  const unreadMessages = await prisma.publicMessage.findMany({
    where: {
      visitorId: visitorId.trim(),
      senderType: PublicSenderType.VISITOR,
      isRead: false,
    },
    select: {
      id: true,
    },
  });

  if (unreadMessages.length === 0) {
    return {
      visitorId: visitorId.trim(),
      updatedCount: 0,
    };
  }

  await prisma.publicMessage.updateMany({
    where: {
      visitorId: visitorId.trim(),
      senderType: PublicSenderType.VISITOR,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });

  io.to(`user:${user.id}`).emit("public-message:conversation-read", {
    visitorId: visitorId.trim(),
    updatedCount: unreadMessages.length,
  });

  io.to(`visitor:${visitorId.trim()}`).emit(
    "public-message:conversation-read",
    {
      visitorId: visitorId.trim(),
      updatedCount: unreadMessages.length,
    },
  );

  return {
    visitorId: visitorId.trim(),
    updatedCount: unreadMessages.length,
  };
};

export const PublicMessageService = {
  createVisitorMessageIntoDB,
  createAdminReplyIntoDB,
  getVisitorMessagesFromDB,
  getAllPublicMessagesFromDB,
  getSingleVisitorConversationFromDB,
  markPublicMessageAsReadIntoDB,
  markVisitorConversationAsReadIntoDB,
};
