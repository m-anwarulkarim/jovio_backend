import type { Request } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { UserRole } from "../../../generated/prisma/client";

import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
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

const createComment = async (
  req: Request,
  taskId: string,
  payload: { message: string },
) => {
  const user = await getAuthUser(req);

  await checkTaskAccess(user, taskId);

  const comment = await prisma.taskComment.create({
    data: {
      message: payload.message,
      taskId,
      userId: user.id,
    },
    select: {
      id: true,
      message: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
    },
  });

  return comment;
};

const getTaskComments = async (req: Request, taskId: string) => {
  const user = await getAuthUser(req);

  await checkTaskAccess(user, taskId);

  const comments = await prisma.taskComment.findMany({
    where: { taskId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      message: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
    },
  });

  return comments;
};

const deleteComment = async (req: Request, commentId: string) => {
  const user = await getAuthUser(req);

  const comment = await prisma.taskComment.findUnique({
    where: { id: commentId },
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

  if (!comment) throw new AppError(404, "Comment not found");

  if (user.role !== UserRole.COMPANY_OWNER && comment.userId !== user.id) {
    throw new AppError(403, "Not allowed to delete this comment");
  }

  if (
    user.role === UserRole.COMPANY_OWNER &&
    user.companyId !== comment.task.companyId
  ) {
    throw new AppError(403, "Not your company comment");
  }

  await prisma.taskComment.delete({
    where: { id: commentId },
  });

  return null;
};

export const TaskCommentService = {
  createComment,
  getTaskComments,
  deleteComment,
};
