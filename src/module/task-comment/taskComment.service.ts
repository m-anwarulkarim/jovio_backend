import type { Request } from "express";
import { prisma } from "../../lib/prisma";
import getAuthUser from "../../utils/getAuthUser";
import {
  ensureTaskAccess,
  ensureCommentDeleteAccess,
} from "../../utils/accessControl";

const createComment = async (
  req: Request,
  taskId: string,
  payload: { message: string },
) => {
  const user = await getAuthUser(req);

  await ensureTaskAccess(user, taskId);

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

  await ensureTaskAccess(user, taskId);

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

  await ensureCommentDeleteAccess(user, commentId);

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
