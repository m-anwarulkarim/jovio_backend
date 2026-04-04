import {
  NotificationType,
  ProjectStatus,
  UserRole,
} from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";
import type {
  TAssignEmployeePayload,
  TChangeProjectStatusPayload,
  TGetProjectsQuery,
} from "./project.interface";

type TAuthUser = {
  id: string;
  role?: string | null;
};

const VALID_STATUS_TRANSITIONS: Record<ProjectStatus, ProjectStatus[]> = {
  NEW: [
    ProjectStatus.UNDER_REVIEW,
    ProjectStatus.ASSIGNED,
    ProjectStatus.CANCELLED,
  ],
  UNDER_REVIEW: [
    ProjectStatus.ASSIGNED,
    ProjectStatus.ON_HOLD,
    ProjectStatus.CANCELLED,
  ],
  ASSIGNED: [
    ProjectStatus.IN_PROGRESS,
    ProjectStatus.ON_HOLD,
    ProjectStatus.CANCELLED,
  ],
  IN_PROGRESS: [
    ProjectStatus.WAITING_FOR_CLIENT,
    ProjectStatus.REVIEW,
    ProjectStatus.ON_HOLD,
    ProjectStatus.CANCELLED,
    ProjectStatus.COMPLETED,
  ],
  WAITING_FOR_CLIENT: [
    ProjectStatus.IN_PROGRESS,
    ProjectStatus.REVIEW,
    ProjectStatus.ON_HOLD,
    ProjectStatus.CANCELLED,
  ],
  REVIEW: [
    ProjectStatus.IN_PROGRESS,
    ProjectStatus.COMPLETED,
    ProjectStatus.ON_HOLD,
    ProjectStatus.CANCELLED,
  ],
  COMPLETED: [],
  ON_HOLD: [
    ProjectStatus.UNDER_REVIEW,
    ProjectStatus.ASSIGNED,
    ProjectStatus.IN_PROGRESS,
    ProjectStatus.WAITING_FOR_CLIENT,
    ProjectStatus.REVIEW,
    ProjectStatus.CANCELLED,
  ],
  CANCELLED: [],
};

const ensureAuthorizedUser = (user: TAuthUser) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
};

const ensureValidStatusTransition = (
  currentStatus: ProjectStatus,
  nextStatus: ProjectStatus,
) => {
  if (currentStatus === nextStatus) {
    throw new AppError(
      400,
      `Project is already in ${nextStatus} status`,
      "STATUS_ALREADY_SET",
    );
  }

  const allowedNextStatuses = VALID_STATUS_TRANSITIONS[currentStatus] || [];

  if (!allowedNextStatuses.includes(nextStatus)) {
    throw new AppError(
      400,
      `Invalid status transition from ${currentStatus} to ${nextStatus}`,
      "INVALID_STATUS_TRANSITION",
    );
  }
};

const getProjectsFromDB = async (user: TAuthUser, query: TGetProjectsQuery) => {
  ensureAuthorizedUser(user);

  const andConditions: Array<Record<string, unknown>> = [];

  if (query.searchTerm) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          projectId: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          serviceCategory: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (query.status) {
    andConditions.push({
      status: query.status,
    });
  }

  if (user.role === UserRole.CLIENT) {
    andConditions.push({
      clientId: user.id,
    });
  }

  if (user.role === UserRole.EMPLOYEE) {
    andConditions.push({
      assignedEmployeeId: user.id,
    });
  }

  const whereClause = andConditions.length ? { AND: andConditions } : {};

  const projects = await prisma.project.findMany({
    where: whereClause,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      assignedEmployee: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
        },
      },
      assignedByAdmin: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      offer: {
        select: {
          id: true,
          offerId: true,
          title: true,
          price: true,
          deliveryDays: true,
          status: true,
        },
      },
      _count: {
        select: {
          messages: true,
          updates: true,
          attachments: true,
          notifications: true,
        },
      },
    },
  });

  return projects;
};

const getSingleProjectFromDB = async (user: TAuthUser, projectId: string) => {
  ensureAuthorizedUser(user);

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      assignedEmployee: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          image: true,
        },
      },
      assignedByAdmin: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      offer: {
        select: {
          id: true,
          offerId: true,
          title: true,
          description: true,
          price: true,
          deliveryDays: true,
          revisions: true,
          note: true,
          status: true,
          expiresAt: true,
          createdAt: true,
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
      _count: {
        select: {
          messages: true,
          updates: true,
          attachments: true,
          notifications: true,
        },
      },
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

  return project;
};

const assignEmployeeIntoDB = async (
  user: TAuthUser,
  projectId: string,
  payload: TAssignEmployeePayload,
) => {
  ensureAuthorizedUser(user);

  if (user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Only admin can assign project", "FORBIDDEN");
  }

  if (!payload?.assignedEmployeeId) {
    throw new AppError(
      400,
      "assignedEmployeeId is required",
      "ASSIGNED_EMPLOYEE_ID_REQUIRED",
    );
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      projectId: true,
      clientId: true,
      status: true,
      assignedEmployeeId: true,
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
      `Cannot assign employee to a ${project.status.toLowerCase()} project`,
      "PROJECT_NOT_ASSIGNABLE",
    );
  }

  if (project.assignedEmployeeId === payload.assignedEmployeeId) {
    throw new AppError(
      400,
      "This employee is already assigned to the project",
      "EMPLOYEE_ALREADY_ASSIGNED",
    );
  }

  const employee = await prisma.user.findUnique({
    where: { id: payload.assignedEmployeeId },
    select: {
      id: true,
      role: true,
      isActive: true,
      name: true,
      email: true,
    },
  });

  if (!employee) {
    throw new AppError(404, "Employee not found", "EMPLOYEE_NOT_FOUND");
  }

  if (employee.role !== UserRole.EMPLOYEE) {
    throw new AppError(
      400,
      "Selected user is not an employee",
      "INVALID_EMPLOYEE",
    );
  }

  if (!employee.isActive) {
    throw new AppError(
      400,
      "Employee account is inactive",
      "EMPLOYEE_INACTIVE",
    );
  }

  const result = await prisma.$transaction(async (tx) => {
    const updatedProject = await tx.project.update({
      where: { id: projectId },
      data: {
        assignedEmployeeId: payload.assignedEmployeeId,
        assignedByAdminId: user.id,
        status:
          project.status === ProjectStatus.NEW ||
          project.status === ProjectStatus.UNDER_REVIEW ||
          project.status === ProjectStatus.ON_HOLD
            ? ProjectStatus.ASSIGNED
            : project.status,
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
        assignedEmployee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        assignedByAdmin: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    await tx.notification.create({
      data: {
        userId: payload.assignedEmployeeId,
        projectId: updatedProject.id,
        type: NotificationType.PROJECT_ASSIGNED,
        title: "New project assigned",
        body: `You have been assigned to project ${updatedProject.projectId}`,
      },
    });

    await tx.notification.create({
      data: {
        userId: updatedProject.clientId,
        projectId: updatedProject.id,
        type: NotificationType.PROJECT_STATUS_CHANGED,
        title: "Project assigned",
        body: `Your project ${updatedProject.projectId} has been assigned to our team`,
      },
    });

    return updatedProject;
  });

  return result;
};

const changeProjectStatusIntoDB = async (
  user: TAuthUser,
  projectId: string,
  payload: TChangeProjectStatusPayload,
) => {
  ensureAuthorizedUser(user);

  if (user.role !== UserRole.ADMIN) {
    throw new AppError(
      403,
      "Only admin can change project status",
      "FORBIDDEN",
    );
  }

  if (!payload?.status) {
    throw new AppError(400, "status is required", "STATUS_REQUIRED");
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      projectId: true,
      clientId: true,
      assignedEmployeeId: true,
      status: true,
    },
  });

  if (!project) {
    throw new AppError(404, "Project not found", "PROJECT_NOT_FOUND");
  }

  ensureValidStatusTransition(project.status, payload.status);

  if (
    payload.status === ProjectStatus.IN_PROGRESS &&
    !project.assignedEmployeeId
  ) {
    throw new AppError(
      400,
      "Cannot move project to IN_PROGRESS without assigning an employee",
      "EMPLOYEE_ASSIGNMENT_REQUIRED",
    );
  }

  const result = await prisma.$transaction(async (tx) => {
    const updatedProject = await tx.project.update({
      where: { id: projectId },
      data: {
        status: payload.status,
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
        assignedEmployee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        assignedByAdmin: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    await tx.notification.create({
      data: {
        userId: updatedProject.clientId,
        projectId: updatedProject.id,
        type: NotificationType.PROJECT_STATUS_CHANGED,
        title: "Project status updated",
        body: `Your project ${updatedProject.projectId} is now ${payload.status}`,
      },
    });

    if (updatedProject.assignedEmployeeId) {
      await tx.notification.create({
        data: {
          userId: updatedProject.assignedEmployeeId,
          projectId: updatedProject.id,
          type: NotificationType.PROJECT_STATUS_CHANGED,
          title: "Project status changed",
          body: `Project ${updatedProject.projectId} is now ${payload.status}`,
        },
      });
    }

    return updatedProject;
  });

  return result;
};

export const ProjectService = {
  getProjectsFromDB,
  getSingleProjectFromDB,
  assignEmployeeIntoDB,
  changeProjectStatusIntoDB,
};
