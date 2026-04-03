import { ProjectStatus, UserRole } from "../../../generated/prisma/client";
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

const getProjectsFromDB = async (user: TAuthUser, query: TGetProjectsQuery) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

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

  const whereClause = andConditions.length > 0 ? { AND: andConditions } : {};

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
        },
      },
    },
  });

  return projects;
};

const getSingleProjectFromDB = async (user: TAuthUser, projectId: string) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

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
        },
      },
      assignedByAdmin: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      offer: true,
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              role: true,
              image: true,
            },
          },
          attachments: true,
        },
      },
      updates: {
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
          attachments: true,
        },
      },
      attachments: true,
      notifications: {
        orderBy: {
          createdAt: "desc",
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
  if (!user?.id || user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Only admin can assign project", "FORBIDDEN");
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    throw new AppError(404, "Project not found", "PROJECT_NOT_FOUND");
  }

  const employee = await prisma.user.findUnique({
    where: { id: payload.assignedEmployeeId },
    select: {
      id: true,
      role: true,
      isActive: true,
      name: true,
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

  const updatedProject = await prisma.project.update({
    where: { id: projectId },
    data: {
      assignedEmployeeId: payload.assignedEmployeeId,
      assignedByAdminId: user.id,
      status: ProjectStatus.ASSIGNED,
      updatedAt: new Date(),
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
    },
  });

  await prisma.notification.create({
    data: {
      userId: payload.assignedEmployeeId,
      projectId: updatedProject.id,
      type: "PROJECT_ASSIGNED",
      title: "New project assigned",
      body: `You have been assigned to project ${updatedProject.projectId}`,
    },
  });

  await prisma.notification.create({
    data: {
      userId: updatedProject.clientId,
      projectId: updatedProject.id,
      type: "PROJECT_STATUS_CHANGED",
      title: "Project assigned",
      body: `Your project ${updatedProject.projectId} has been assigned to our team`,
    },
  });

  return updatedProject;
};

const changeProjectStatusIntoDB = async (
  user: TAuthUser,
  projectId: string,
  payload: TChangeProjectStatusPayload,
) => {
  if (!user?.id || user.role !== UserRole.ADMIN) {
    throw new AppError(
      403,
      "Only admin can change project status",
      "FORBIDDEN",
    );
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    throw new AppError(404, "Project not found", "PROJECT_NOT_FOUND");
  }

  const updatedProject = await prisma.project.update({
    where: { id: projectId },
    data: {
      status: payload.status,
      updatedAt: new Date(),
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
        },
      },
    },
  });

  await prisma.notification.create({
    data: {
      userId: updatedProject.clientId,
      projectId: updatedProject.id,
      type: "PROJECT_STATUS_CHANGED",
      title: "Project status updated",
      body: `Your project ${updatedProject.projectId} is now ${payload.status}`,
    },
  });

  if (updatedProject.assignedEmployeeId) {
    await prisma.notification.create({
      data: {
        userId: updatedProject.assignedEmployeeId,
        projectId: updatedProject.id,
        type: "PROJECT_STATUS_CHANGED",
        title: "Project status changed",
        body: `Project ${updatedProject.projectId} is now ${payload.status}`,
      },
    });
  }

  return updatedProject;
};

export const ProjectService = {
  getProjectsFromDB,
  getSingleProjectFromDB,
  assignEmployeeIntoDB,
  changeProjectStatusIntoDB,
};
