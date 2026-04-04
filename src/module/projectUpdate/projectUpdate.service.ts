import {
  NotificationType,
  ProjectStatus,
  UserRole,
} from "../../../generated/prisma/client";
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

const ensureAuthorizedUser = (user: TAuthUser) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
};

const createProjectUpdateIntoDB = async (
  user: TAuthUser,
  payload: TCreateProjectUpdatePayload,
) => {
  ensureAuthorizedUser(user);

  if (user.role !== UserRole.ADMIN && user.role !== UserRole.EMPLOYEE) {
    throw new AppError(
      403,
      "Only admin or employee can create project update",
      "FORBIDDEN",
    );
  }

  if (!payload?.projectId) {
    throw new AppError(400, "projectId is required", "PROJECT_ID_REQUIRED");
  }

  if (!payload?.note?.trim()) {
    throw new AppError(400, "note is required", "NOTE_REQUIRED");
  }

  if (
    payload.progress !== undefined &&
    payload.progress !== null &&
    (payload.progress < 0 || payload.progress > 100)
  ) {
    throw new AppError(
      400,
      "progress must be between 0 and 100",
      "INVALID_PROGRESS",
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

  if (
    project.status === ProjectStatus.COMPLETED ||
    project.status === ProjectStatus.CANCELLED
  ) {
    throw new AppError(
      400,
      `Cannot add update to a ${project.status.toLowerCase()} project`,
      "PROJECT_UPDATE_NOT_ALLOWED",
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

  const result = await prisma.$transaction(async (tx) => {
    const update = await tx.projectUpdate.create({
      data: {
        projectId: payload.projectId,
        userId: user.id,
        progress: payload.progress ?? null,
        note: payload.note.trim(),
        issue: payload.issue?.trim() || null,
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

    const shouldMoveToInProgress =
      project.status === ProjectStatus.NEW ||
      project.status === ProjectStatus.ASSIGNED;

    if (shouldMoveToInProgress) {
      await tx.project.update({
        where: { id: payload.projectId },
        data: {
          status: ProjectStatus.IN_PROGRESS,
        },
      });
    }

    await tx.notification.create({
      data: {
        userId: project.clientId,
        projectId: project.id,
        type: NotificationType.PROJECT_UPDATE,
        title: "Project updated",
        body: `New update on project ${project.projectId}`,
      },
    });

    if (project.assignedByAdminId && project.assignedByAdminId !== user.id) {
      await tx.notification.create({
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
  });

  return result;
};

const getProjectUpdatesFromDB = async (
  user: TAuthUser,
  query: TGetProjectUpdatesQuery,
) => {
  ensureAuthorizedUser(user);

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
    if (user.role === UserRole.CLIENT) {
      whereClause.project = {
        clientId: user.id,
      };
    }

    if (user.role === UserRole.EMPLOYEE) {
      whereClause.project = {
        assignedEmployeeId: user.id,
      };
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
          email: true,
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
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return updates;
};

const getSingleProjectUpdateFromDB = async (
  user: TAuthUser,
  updateId: string,
) => {
  ensureAuthorizedUser(user);

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
      attachments: {
        orderBy: {
          createdAt: "desc",
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
