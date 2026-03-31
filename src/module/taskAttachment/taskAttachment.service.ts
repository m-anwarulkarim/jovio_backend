import type { Request } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { UserRole } from "../../../generated/prisma/client";

import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import cloudinary from "../../lib/cloudinary";
import AppError from "../../utils/AppError";

const getAuthUser = async (req: Request) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session?.user?.id) {
    throw new AppError(401, "Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      role: true,
      companyId: true,
    },
  });

  if (!user) throw new AppError(404, "User not found");

  return user;
};

const checkTaskAccess = async (user: any, taskId: string) => {
  const task = await prisma.task.findFirst({
    where: { id: taskId },
    select: {
      id: true,
      companyId: true,
      assignedToId: true,
    },
  });

  if (!task) throw new AppError(404, "Task not found");

  if (user.role === UserRole.COMPANY_OWNER) {
    if (task.companyId !== user.companyId) {
      throw new AppError(403, "Not your company task");
    }
  }

  if (user.role === UserRole.EMPLOYEE) {
    if (task.assignedToId !== user.id) {
      throw new AppError(403, "Not your task");
    }
  }

  return task;
};

const uploadAttachment = async (req: Request, taskId: string) => {
  const user = await getAuthUser(req);

  await checkTaskAccess(user, taskId);

  if (!req.file) {
    throw new AppError(400, "No file uploaded");
  }

  const file = req.file as any;

  const attachment = await prisma.taskAttachment.create({
    data: {
      fileName: file.originalname,
      fileUrl: file.path,
      fileType: file.mimetype,
      publicId: file.filename,
      taskId,
      uploadedById: user.id,
    },
    select: {
      id: true,
      fileName: true,
      fileUrl: true,
      fileType: true,
      createdAt: true,
      uploadedBy: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
    },
  });

  return attachment;
};

const getAttachments = async (req: Request, taskId: string) => {
  const user = await getAuthUser(req);

  await checkTaskAccess(user, taskId);

  const attachments = await prisma.taskAttachment.findMany({
    where: { taskId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      fileName: true,
      fileUrl: true,
      fileType: true,
      createdAt: true,
      uploadedBy: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return attachments;
};

const deleteAttachment = async (req: Request, attachmentId: string) => {
  const user = await getAuthUser(req);

  const attachment = await prisma.taskAttachment.findUnique({
    where: { id: attachmentId },
    select: {
      id: true,
      publicId: true,
      uploadedById: true,
      task: {
        select: {
          companyId: true,
        },
      },
    },
  });

  if (!attachment) throw new AppError(404, "Attachment not found");

  if (
    user.role !== UserRole.COMPANY_OWNER &&
    attachment.uploadedById !== user.id
  ) {
    throw new AppError(403, "Not allowed");
  }

  if (
    user.role === UserRole.COMPANY_OWNER &&
    user.companyId !== attachment.task.companyId
  ) {
    throw new AppError(403, "Not your company file");
  }

  await cloudinary.uploader.destroy(attachment.publicId as string);

  await prisma.taskAttachment.delete({
    where: { id: attachment.id },
  });

  return null;
};

export const TaskAttachmentService = {
  uploadAttachment,
  getAttachments,
  deleteAttachment,
};
