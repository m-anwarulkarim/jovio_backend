import { UserRole } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";
import AppError from "./AppError";
import type { TAuthUser } from "./getAuthUser";

export const ensureRole = (
  user: TAuthUser,
  allowedRoles: UserRole[],
  message = "You are not allowed to perform this action",
) => {
  if (!allowedRoles.includes(user.role)) {
    throw new AppError(403, message);
  }
};

export const ensureCompanyOwner = (user: TAuthUser) => {
  if (user.role !== UserRole.COMPANY_OWNER) {
    throw new AppError(403, "Only company owners can perform this action");
  }
};

export const ensureAdmin = (user: TAuthUser) => {
  if (user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Only admins can perform this action");
  }
};

export const getOwnerCompany = async (ownerId: string) => {
  const company = await prisma.company.findUnique({
    where: {
      ownerId,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      isActive: true,
      isVerified: true,
    },
  });

  if (!company) {
    throw new AppError(404, "Company not found");
  }

  return company;
};

export const ensureSameCompany = (
  userCompanyId: string | null,
  resourceCompanyId: string,
  message = "Not allowed to access this company resource",
) => {
  if (!userCompanyId || userCompanyId !== resourceCompanyId) {
    throw new AppError(403, message);
  }
};

export const ensureDepartmentBelongsToCompany = async (
  departmentId: string,
  companyId: string,
) => {
  const department = await prisma.department.findFirst({
    where: {
      id: departmentId,
      companyId,
    },
    select: {
      id: true,
      name: true,
      companyId: true,
    },
  });

  if (!department) {
    throw new AppError(404, "Department not found in your company");
  }

  return department;
};

export const ensureEmployeeBelongsToCompany = async (
  employeeId: string,
  companyId: string,
) => {
  const employee = await prisma.user.findFirst({
    where: {
      id: employeeId,
      companyId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      companyId: true,
      isActive: true,
      departmentId: true,
    },
  });

  if (!employee) {
    throw new AppError(404, "Employee not found in your company");
  }

  return employee;
};

export const ensureTaskAccess = async (user: TAuthUser, taskId: string) => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
    },
    select: {
      id: true,
      title: true,
      companyId: true,
      assignedToId: true,
      assignedById: true,
      departmentId: true,
      status: true,
      priority: true,
      deadline: true,
    },
  });

  if (!task) {
    throw new AppError(404, "Task not found");
  }

  if (user.role === UserRole.ADMIN) {
    return task;
  }

  if (user.role === UserRole.COMPANY_OWNER) {
    ensureSameCompany(user.companyId, task.companyId, "Not your company task");
    return task;
  }

  if (user.role === UserRole.EMPLOYEE) {
    if (task.assignedToId !== user.id) {
      throw new AppError(403, "Not your task");
    }

    return task;
  }

  throw new AppError(403, "You are not allowed to access this task");
};

export const ensureCommentDeleteAccess = async (
  user: TAuthUser,
  commentId: string,
) => {
  const comment = await prisma.taskComment.findUnique({
    where: {
      id: commentId,
    },
    select: {
      id: true,
      userId: true,
      task: {
        select: {
          companyId: true,
        },
      },
    },
  });

  if (!comment) {
    throw new AppError(404, "Comment not found");
  }

  if (user.role === UserRole.ADMIN) {
    return comment;
  }

  if (user.role === UserRole.COMPANY_OWNER) {
    ensureSameCompany(
      user.companyId,
      comment.task.companyId,
      "Not your company comment",
    );
    return comment;
  }

  if (comment.userId !== user.id) {
    throw new AppError(403, "Not allowed to delete this comment");
  }

  return comment;
};

export const ensureAttachmentDeleteAccess = async (
  user: TAuthUser,
  attachmentId: string,
) => {
  const attachment = await prisma.taskAttachment.findUnique({
    where: {
      id: attachmentId,
    },
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

  if (!attachment) {
    throw new AppError(404, "Attachment not found");
  }

  if (user.role === UserRole.ADMIN) {
    return attachment;
  }

  if (user.role === UserRole.COMPANY_OWNER) {
    ensureSameCompany(
      user.companyId,
      attachment.task.companyId,
      "Not your company file",
    );
    return attachment;
  }

  if (attachment.uploadedById !== user.id) {
    throw new AppError(403, "Not allowed to delete this attachment");
  }

  return attachment;
};
