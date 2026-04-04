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

type TRequestMeta = {
  headers: Record<string, unknown>;
  ip?: string;
  socket?: {
    remoteAddress?: string;
  };
};

const getClientIp = (req: TRequestMeta) => {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (typeof forwardedFor === "string") {
    const ip = forwardedFor.split(",")[0];
    return ip ? ip.trim() : "UNKNOWN_IP";
  }

  if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
    return String(forwardedFor[0]).trim();
  }

  return req.ip ?? req.socket?.remoteAddress ?? "UNKNOWN_IP";
};

const createVisitorMessageIntoDB = async (
  payload: TCreateVisitorMessagePayload,
  req: TRequestMeta,
) => {
  const { visitorId, text } = payload;

  if (!visitorId || !visitorId.trim()) {
    throw new AppError(400, "Visitor id is required", "VISITOR_ID_REQUIRED");
  }

  if (!text || !text.trim()) {
    throw new AppError(
      400,
      "Message text is required",
      "MESSAGE_TEXT_REQUIRED",
    );
  }

  const admin = await prisma.user.findFirst({
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

  if (!admin) {
    throw new AppError(404, "Admin not found", "ADMIN_NOT_FOUND");
  }

  const ipAddress = getClientIp(req);

  const message = await prisma.publicMessage.create({
    data: {
      visitorId: visitorId.trim(),
      text: text.trim(),
      senderType: PublicSenderType.VISITOR,
      ipAddress,
      adminId: admin.id,
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

  io.to(`user:${admin.id}`).emit("public-message:new", message);
  io.to(`visitor:${message.visitorId}`).emit("public-message:new", message);

  return message;
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

  if (!text || !text.trim()) {
    throw new AppError(
      400,
      "Message text is required",
      "MESSAGE_TEXT_REQUIRED",
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

const getVisitorMessagesFromDB = async (visitorId: string) => {
  if (!visitorId || !visitorId.trim()) {
    throw new AppError(400, "Visitor id is required", "VISITOR_ID_REQUIRED");
  }

  const messages = await prisma.publicMessage.findMany({
    where: {
      visitorId: visitorId.trim(),
    },
    orderBy: {
      createdAt: "asc",
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

  return messages;
};

const getAllPublicMessagesFromDB = async (user: TAuthUser) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  if (user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }

  const messages = await prisma.publicMessage.findMany({
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
  });

  return messages;
};

const getSingleVisitorConversationFromDB = async (
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

  const messages = await prisma.publicMessage.findMany({
    where: {
      visitorId: visitorId.trim(),
    },
    orderBy: {
      createdAt: "asc",
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

  return messages;
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

export const PublicMessageService = {
  createVisitorMessageIntoDB,
  createAdminReplyIntoDB,
  getVisitorMessagesFromDB,
  getAllPublicMessagesFromDB,
  getSingleVisitorConversationFromDB,
  markPublicMessageAsReadIntoDB,
};
