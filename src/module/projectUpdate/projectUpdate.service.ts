import {
  ProjectStatus,
  UserRole,
  NotificationType,
} from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";
import type {
  TCreateProjectUpdatePayload,
  TGetProjectUpdatesQuery,
} from "./projectUpdate.interface";

type TAuthUser = {
  id: string;
  role?: string | null;
};

const createProjectUpdateIntoDB = async (
  user: TAuthUser,
  payload: TCreateProjectUpdatePayload,
) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  // ✅ FIXED (no includes)
  if (user.role !== UserRole.ADMIN && user.role !== UserRole.EMPLOYEE) {
    throw new AppError(
      403,
      "Only admin or employee can create project update",
      "FORBIDDEN",
    );
  }

  const project = await prisma.project.findUnique({
    where: { id: payload.projectId },
    select: {
      id: true,
      projectId: true,
      title: true,
      clientId: true,
      assignedEmployeeId: true,
      assignedByAdminId: true,
      status: true,
    },
  });

  if (!project) {
    throw new AppError(404, "Project not found", "PROJECT_NOT_FOUND");
  }

  // employee access check
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

  const update = await prisma.projectUpdate.create({
    data: {
      projectId: payload.projectId,
      userId: user.id,
      progress: payload.progress ?? null,
      note: payload.note,
      issue: payload.issue ?? null,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          role: true,
          email: true,
          image: true,
        },
      },
      project: {
        select: {
          id: true,
          projectId: true,
          title: true,
          status: true,
          clientId: true,
          assignedEmployeeId: true,
        },
      },
      attachments: true,
    },
  });

  // ✅ smart status update
  const nextProjectStatus =
    project.status === ProjectStatus.NEW ||
    project.status === ProjectStatus.ASSIGNED
      ? ProjectStatus.IN_PROGRESS
      : project.status;

  if (nextProjectStatus !== project.status) {
    await prisma.project.update({
      where: { id: payload.projectId },
      data: {
        status: nextProjectStatus,
        updatedAt: new Date(),
      },
    });
  }

  // ✅ notification (clean + enum)
  await prisma.notification.create({
    data: {
      userId: project.clientId,
      projectId: project.id,
      type: NotificationType.PROJECT_UPDATE,
      title: "Project updated",
      body: `New update on project ${project.projectId}`,
    },
  });

  if (project.assignedByAdminId && project.assignedByAdminId !== user.id) {
    await prisma.notification.create({
      data: {
        userId: project.assignedByAdminId,
        projectId: project.id,
        type: NotificationType.PROJECT_UPDATE,
        title: "Project update received",
        body: `A new update was added to project ${project.projectId}`,
      },
    });
  }

  return update;
};

const getProjectUpdatesFromDB = async (
  user: TAuthUser,
  query: TGetProjectUpdatesQuery,
) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  const whereClause: Record<string, unknown> = {};

  if (query.projectId) {
    const project = await prisma.project.findUnique({
      where: { id: query.projectId },
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

    whereClause.projectId = query.projectId;
  } else {
    if (user.role === UserRole.EMPLOYEE) {
      whereClause.userId = user.id;
    }
  }

  const updates = await prisma.projectUpdate.findMany({
    where: whereClause,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          role: true,
          image: true,
        },
      },
      project: {
        select: {
          id: true,
          projectId: true,
          title: true,
          status: true,
        },
      },
      attachments: true,
    },
  });

  return updates;
};

const getSingleProjectUpdateFromDB = async (
  user: TAuthUser,
  updateId: string,
) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  const update = await prisma.projectUpdate.findUnique({
    where: { id: updateId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          role: true,
          image: true,
          email: true,
        },
      },
      project: {
        select: {
          id: true,
          projectId: true,
          title: true,
          clientId: true,
          assignedEmployeeId: true,
          status: true,
        },
      },
      attachments: true,
    },
  });

  if (!update) {
    throw new AppError(
      404,
      "Project update not found",
      "PROJECT_UPDATE_NOT_FOUND",
    );
  }

  if (user.role === UserRole.CLIENT && update.project.clientId !== user.id) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }

  if (
    user.role === UserRole.EMPLOYEE &&
    update.project.assignedEmployeeId !== user.id
  ) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }

  return update;
};

export const ProjectUpdateService = {
  createProjectUpdateIntoDB,
  getProjectUpdatesFromDB,
  getSingleProjectUpdateFromDB,
};
