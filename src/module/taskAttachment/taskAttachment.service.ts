import type { Request } from "express";
import cloudinary from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";
import getAuthUser from "../../utils/getAuthUser";
import {
  ensureTaskAccess,
  ensureAttachmentDeleteAccess,
} from "../../utils/accessControl";

const uploadAttachment = async (req: Request, taskId: string) => {
  const user = await getAuthUser(req);

  await ensureTaskAccess(user, taskId);

  if (!req.file) {
    throw new AppError(400, "No file uploaded");
  }

  const file = req.file as Express.Multer.File & {
    path: string;
    filename: string;
  };

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

  await ensureTaskAccess(user, taskId);

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

  const attachment = await ensureAttachmentDeleteAccess(user, attachmentId);

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
