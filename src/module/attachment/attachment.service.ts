import { UserRole, AttachmentType } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";
import type {
  TCreateAttachmentPayload,
  TGetAttachmentsQuery,
} from "./attachment.interface";
import cloudinary from "../../config/cloudinary";

type TAuthUser = {
  id: string;
  role?: string | null;
};

const checkProjectAccess = (
  user: TAuthUser,
  project: {
    clientId?: string;
    assignedEmployeeId?: string | null;
  } | null,
) => {
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
};

const validateAttachmentOwnerAccess = async (
  user: TAuthUser,
  payload: {
    messageId?: string;
    projectId?: string;
    offerId?: string;
    projectUpdateId?: string;
  },
) => {
  if (payload.messageId) {
    const message = await prisma.message.findUnique({
      where: { id: payload.messageId },
      include: {
        project: {
          select: {
            clientId: true,
            assignedEmployeeId: true,
          },
        },
      },
    });

    if (!message) {
      throw new AppError(404, "Message not found", "MESSAGE_NOT_FOUND");
    }

    if (!message.project) {
      if (message.senderId !== user.id && user.role !== UserRole.ADMIN) {
        throw new AppError(403, "Forbidden", "FORBIDDEN");
      }
      return;
    }

    checkProjectAccess(user, message.project);
    return;
  }

  if (payload.projectId) {
    const project = await prisma.project.findUnique({
      where: { id: payload.projectId },
      select: {
        clientId: true,
        assignedEmployeeId: true,
      },
    });

    checkProjectAccess(user, project);
    return;
  }

  if (payload.offerId) {
    const offer = await prisma.offer.findUnique({
      where: { id: payload.offerId },
      select: {
        clientId: true,
        adminId: true,
      },
    });

    if (!offer) {
      throw new AppError(404, "Offer not found", "OFFER_NOT_FOUND");
    }

    if (user.role === UserRole.CLIENT && offer.clientId !== user.id) {
      throw new AppError(403, "Forbidden", "FORBIDDEN");
    }

    if (user.role === UserRole.ADMIN && offer.adminId !== user.id) {
      throw new AppError(403, "Forbidden", "FORBIDDEN");
    }

    if (user.role === UserRole.EMPLOYEE) {
      throw new AppError(
        403,
        "Employee cannot access offer attachments",
        "FORBIDDEN",
      );
    }

    return;
  }

  if (payload.projectUpdateId) {
    const update = await prisma.projectUpdate.findUnique({
      where: { id: payload.projectUpdateId },
      include: {
        project: {
          select: {
            clientId: true,
            assignedEmployeeId: true,
          },
        },
      },
    });

    if (!update) {
      throw new AppError(
        404,
        "Project update not found",
        "PROJECT_UPDATE_NOT_FOUND",
      );
    }

    checkProjectAccess(user, update.project);
  }
};

const getAttachmentTypeFromMime = (mimeType?: string) => {
  if (mimeType?.startsWith("image/")) {
    return AttachmentType.IMAGE;
  }

  return AttachmentType.FILE;
};

const createAttachmentIntoDB = async (
  user: TAuthUser,
  payload: TCreateAttachmentPayload,
) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  const relationCount = [
    payload.messageId,
    payload.projectId,
    payload.offerId,
    payload.projectUpdateId,
  ].filter(Boolean).length;

  if (relationCount === 0) {
    throw new AppError(400, "Relation id required", "RELATION_ID_REQUIRED");
  }

  if (relationCount > 1) {
    throw new AppError(
      400,
      "Only one relation id allowed",
      "MULTIPLE_RELATION_IDS_NOT_ALLOWED",
    );
  }

  if (!payload.url?.trim()) {
    throw new AppError(400, "Attachment url is required", "URL_REQUIRED");
  }

  await validateAttachmentOwnerAccess(user, payload);

  return prisma.attachment.create({
    data: {
      type:
        payload.type ||
        getAttachmentTypeFromMime(payload.mimeType) ||
        AttachmentType.FILE,
      url: payload.url.trim(),
      publicId: payload.publicId ?? null,
      originalName: payload.originalName ?? null,
      mimeType: payload.mimeType ?? null,
      size: payload.size ?? null,
      uploadedById: user.id,
      messageId: payload.messageId ?? null,
      projectId: payload.projectId ?? null,
      offerId: payload.offerId ?? null,
      projectUpdateId: payload.projectUpdateId ?? null,
    },
    include: {
      uploadedBy: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });
};

const uploadAttachmentIntoDB = async (
  user: TAuthUser,
  file: Express.Multer.File | undefined,
  payload: TCreateAttachmentPayload,
) => {
  if (!file) {
    throw new AppError(400, "File is required", "FILE_REQUIRED");
  }

  const uploadedFile = file as Express.Multer.File & {
    path?: string;
    filename?: string;
    mimetype: string;
    size: number;
    originalname: string;
  };

  return createAttachmentIntoDB(user, {
    ...payload,
    url: uploadedFile.path,
    publicId: uploadedFile.filename,
    originalName: uploadedFile.originalname,
    mimeType: uploadedFile.mimetype,
    size: uploadedFile.size,
    type: getAttachmentTypeFromMime(uploadedFile.mimetype),
  });
};

const getAttachmentsFromDB = async (
  user: TAuthUser,
  query: TGetAttachmentsQuery,
) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  const relationCount = [
    query.messageId,
    query.projectId,
    query.offerId,
    query.projectUpdateId,
  ].filter(Boolean).length;

  if (relationCount === 0) {
    throw new AppError(400, "Relation id required", "RELATION_ID_REQUIRED");
  }

  if (relationCount > 1) {
    throw new AppError(
      400,
      "Only one relation id allowed",
      "MULTIPLE_RELATION_IDS_NOT_ALLOWED",
    );
  }

  await validateAttachmentOwnerAccess(user, query);

  return prisma.attachment.findMany({
    where: {
      messageId: query.messageId,
      projectId: query.projectId,
      offerId: query.offerId,
      projectUpdateId: query.projectUpdateId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      uploadedBy: {
        select: {
          id: true,
          name: true,
          role: true,
          email: true,
        },
      },
    },
  });
};

const getSingleAttachmentFromDB = async (
  user: TAuthUser,
  attachmentId: string,
) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  const attachment = await prisma.attachment.findUnique({
    where: { id: attachmentId },
    include: {
      uploadedBy: true,
      message: { include: { project: true } },
      project: true,
      offer: true,
      projectUpdate: { include: { project: true } },
    },
  });

  if (!attachment) {
    throw new AppError(404, "Attachment not found", "ATTACHMENT_NOT_FOUND");
  }

  if (attachment.project) {
    checkProjectAccess(user, attachment.project);
  }

  if (attachment.message?.project) {
    checkProjectAccess(user, attachment.message.project);
  }

  if (attachment.projectUpdate?.project) {
    checkProjectAccess(user, attachment.projectUpdate.project);
  }

  if (attachment.offer) {
    if (
      user.role === UserRole.CLIENT &&
      attachment.offer.clientId !== user.id
    ) {
      throw new AppError(403, "Forbidden", "FORBIDDEN");
    }

    if (user.role === UserRole.ADMIN && attachment.offer.adminId !== user.id) {
      throw new AppError(403, "Forbidden", "FORBIDDEN");
    }

    if (user.role === UserRole.EMPLOYEE) {
      throw new AppError(403, "Forbidden", "FORBIDDEN");
    }
  }

  return attachment;
};

const deleteAttachmentFromDB = async (
  user: TAuthUser,
  attachmentId: string,
) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  const attachment = await prisma.attachment.findUnique({
    where: { id: attachmentId },
    select: {
      id: true,
      uploadedById: true,
      publicId: true,
    },
  });

  if (!attachment) {
    throw new AppError(404, "Attachment not found", "ATTACHMENT_NOT_FOUND");
  }

  if (user.role !== UserRole.ADMIN && attachment.uploadedById !== user.id) {
    throw new AppError(
      403,
      "Only admin or uploader can delete attachment",
      "FORBIDDEN",
    );
  }

  if (attachment.publicId) {
    await cloudinary.uploader.destroy(attachment.publicId, {
      resource_type: "auto",
    });
  }

  return prisma.attachment.delete({
    where: { id: attachmentId },
  });
};

export const AttachmentService = {
  createAttachmentIntoDB,
  uploadAttachmentIntoDB,
  getAttachmentsFromDB,
  getSingleAttachmentFromDB,
  deleteAttachmentFromDB,
};
