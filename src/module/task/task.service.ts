import type { Request } from "express";
import { fromNodeHeaders } from "better-auth/node";
import {
  Prisma,
  TaskPriority,
  TaskStatus,
  UserRole,
} from "../../../generated/prisma/client";

import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";

import type {
  TCreateTaskPayload,
  TGetTasksQuery,
  TUpdateMyTaskStatusPayload,
  TUpdateTaskPayload,
} from "./task.types";

const getAuthUser = async (req: Request) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session?.user?.id) {
    throw new AppError(401, "Unauthorized");
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      role: true,
      companyId: true,
      ownedCompany: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!dbUser) {
    throw new AppError(404, "User not found");
  }

  return dbUser;
};

const getOwnerCompany = async (ownerId: string) => {
  const company = await prisma.company.findUnique({
    where: {
      ownerId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!company) {
    throw new AppError(404, "Company not found");
  }

  return company;
};

const createTask = async (req: Request, payload: TCreateTaskPayload) => {
  const authUser = await getAuthUser(req);

  if (authUser.role !== UserRole.COMPANY_OWNER) {
    throw new AppError(403, "Only company owners can create tasks");
  }

  const company = await getOwnerCompany(authUser.id);

  const assignee = await prisma.user.findFirst({
    where: {
      id: payload.assignedToId,
      companyId: company.id,
      isActive: true,
      OR: [{ role: UserRole.EMPLOYEE }, { role: UserRole.COMPANY_OWNER }],
    },
    select: {
      id: true,
      role: true,
      companyId: true,
    },
  });

  if (!assignee) {
    throw new AppError(
      404,
      "Assigned user not found in your company or is inactive",
    );
  }

  if (payload.departmentId) {
    const department = await prisma.department.findFirst({
      where: {
        id: payload.departmentId,
        companyId: company.id,
      },
      select: {
        id: true,
      },
    });

    if (!department) {
      throw new AppError(404, "Department not found in your company");
    }
  }

  const task = await prisma.task.create({
    data: {
      title: payload.title,
      description: payload.description,
      priority: payload.priority
        ? (payload.priority as TaskPriority)
        : TaskPriority.MEDIUM,
      deadline: payload.deadline ? new Date(payload.deadline) : undefined,
      assignedById: authUser.id,
      assignedToId: payload.assignedToId,
      companyId: company.id,
      departmentId: payload.departmentId,
      startedAt: null,
      completedAt: null,
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      deadline: true,
      startedAt: true,
      completedAt: true,
      companyId: true,
      departmentId: true,
      createdAt: true,
      updatedAt: true,
      assignedBy: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
      assignedTo: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
      department: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return task;
};

const getAllTasks = async (req: Request, query: TGetTasksQuery) => {
  const authUser = await getAuthUser(req);

  const page = Number(query.page) || 1;
  const limit = Math.min(Number(query.limit) || 10, 100);
  const skip = (page - 1) * limit;

  const searchTerm = query.searchTerm?.trim();
  const departmentId = query.departmentId?.trim();
  const assignedToId = query.assignedToId?.trim();
  const status = query.status?.trim() as TaskStatus | undefined;
  const priority = query.priority?.trim() as TaskPriority | undefined;

  const andConditions: Prisma.TaskWhereInput[] = [];

  if (authUser.role === UserRole.COMPANY_OWNER) {
    const company = await getOwnerCompany(authUser.id);
    andConditions.push({
      companyId: company.id,
    });
  } else if (authUser.role === UserRole.EMPLOYEE) {
    andConditions.push({
      assignedToId: authUser.id,
    });
  } else {
    throw new AppError(403, "You are not allowed to view tasks");
  }

  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (departmentId) {
    andConditions.push({
      departmentId,
    });
  }

  if (assignedToId && authUser.role === UserRole.COMPANY_OWNER) {
    andConditions.push({
      assignedToId,
    });
  }

  if (status && Object.values(TaskStatus).includes(status)) {
    andConditions.push({
      status,
    });
  }

  if (priority && Object.values(TaskPriority).includes(priority)) {
    andConditions.push({
      priority,
    });
  }

  const whereConditions: Prisma.TaskWhereInput = {
    AND: andConditions,
  };

  const tasks = await prisma.task.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      deadline: true,
      startedAt: true,
      completedAt: true,
      companyId: true,
      departmentId: true,
      createdAt: true,
      updatedAt: true,
      assignedBy: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
      assignedTo: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
      department: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          comments: true,
          attachments: true,
        },
      },
    },
  });

  const total = await prisma.task.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: tasks,
  };
};

const getSingleTask = async (req: Request, taskId: string) => {
  const authUser = await getAuthUser(req);

  let taskWhere: Prisma.TaskWhereInput;

  if (authUser.role === UserRole.COMPANY_OWNER) {
    const company = await getOwnerCompany(authUser.id);
    taskWhere = {
      id: taskId,
      companyId: company.id,
    };
  } else if (authUser.role === UserRole.EMPLOYEE) {
    taskWhere = {
      id: taskId,
      assignedToId: authUser.id,
    };
  } else {
    throw new AppError(403, "You are not allowed to view task details");
  }

  const task = await prisma.task.findFirst({
    where: taskWhere,
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      deadline: true,
      startedAt: true,
      completedAt: true,
      companyId: true,
      departmentId: true,
      createdAt: true,
      updatedAt: true,
      assignedBy: {
        select: {
          id: true,
          name: true,
          role: true,
          email: true,
        },
      },
      assignedTo: {
        select: {
          id: true,
          name: true,
          role: true,
          email: true,
        },
      },
      department: {
        select: {
          id: true,
          name: true,
        },
      },
      comments: {
        select: {
          id: true,
          message: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              name: true,
              role: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      attachments: {
        select: {
          id: true,
          fileName: true,
          fileUrl: true,
          fileType: true,
          publicId: true,
          createdAt: true,
          uploadedBy: {
            select: {
              id: true,
              name: true,
              role: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!task) {
    throw new AppError(404, "Task not found");
  }

  return task;
};

const updateTask = async (
  req: Request,
  taskId: string,
  payload: TUpdateTaskPayload,
) => {
  const authUser = await getAuthUser(req);

  if (authUser.role !== UserRole.COMPANY_OWNER) {
    throw new AppError(403, "Only company owners can update tasks");
  }

  const company = await getOwnerCompany(authUser.id);

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      companyId: company.id,
    },
    select: {
      id: true,
      assignedToId: true,
      status: true,
    },
  });

  if (!task) {
    throw new AppError(404, "Task not found");
  }

  if (payload.assignedToId) {
    const assignee = await prisma.user.findFirst({
      where: {
        id: payload.assignedToId,
        companyId: company.id,
        isActive: true,
        OR: [{ role: UserRole.EMPLOYEE }, { role: UserRole.COMPANY_OWNER }],
      },
      select: {
        id: true,
      },
    });

    if (!assignee) {
      throw new AppError(
        404,
        "Assigned user not found in your company or is inactive",
      );
    }
  }

  if (payload.departmentId) {
    const department = await prisma.department.findFirst({
      where: {
        id: payload.departmentId,
        companyId: company.id,
      },
      select: {
        id: true,
      },
    });

    if (!department) {
      throw new AppError(404, "Department not found in your company");
    }
  }

  const nextStatus = payload.status
    ? (payload.status as TaskStatus)
    : undefined;

  const updatedTask = await prisma.task.update({
    where: {
      id: task.id,
    },
    data: {
      title: payload.title,
      description: payload.description,
      priority: payload.priority
        ? (payload.priority as TaskPriority)
        : undefined,
      status: nextStatus,
      deadline:
        payload.deadline === null
          ? null
          : payload.deadline
            ? new Date(payload.deadline)
            : undefined,
      assignedToId: payload.assignedToId,
      departmentId: payload.departmentId === null ? null : payload.departmentId,
      startedAt:
        nextStatus === TaskStatus.IN_PROGRESS
          ? task.status === TaskStatus.IN_PROGRESS
            ? undefined
            : new Date()
          : undefined,
      completedAt:
        nextStatus === TaskStatus.COMPLETED
          ? new Date()
          : nextStatus
            ? null
            : undefined,
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      deadline: true,
      startedAt: true,
      completedAt: true,
      companyId: true,
      departmentId: true,
      createdAt: true,
      updatedAt: true,
      assignedBy: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
      assignedTo: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
      department: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return updatedTask;
};

const updateMyTaskStatus = async (
  req: Request,
  taskId: string,
  payload: TUpdateMyTaskStatusPayload,
) => {
  const authUser = await getAuthUser(req);

  if (
    authUser.role !== UserRole.EMPLOYEE &&
    authUser.role !== UserRole.COMPANY_OWNER
  ) {
    throw new AppError(403, "You are not allowed to update task status");
  }

  let taskWhere: Prisma.TaskWhereInput;

  if (authUser.role === UserRole.COMPANY_OWNER) {
    const company = await getOwnerCompany(authUser.id);
    taskWhere = {
      id: taskId,
      companyId: company.id,
      assignedToId: authUser.id,
    };
  } else {
    taskWhere = {
      id: taskId,
      assignedToId: authUser.id,
    };
  }

  const task = await prisma.task.findFirst({
    where: taskWhere,
    select: {
      id: true,
      status: true,
    },
  });

  if (!task) {
    throw new AppError(404, "Task not found or not assigned to you");
  }

  const nextStatus = payload.status as TaskStatus;

  const updatedTask = await prisma.task.update({
    where: {
      id: task.id,
    },
    data: {
      status: nextStatus,
      startedAt:
        nextStatus === TaskStatus.IN_PROGRESS
          ? task.status === TaskStatus.IN_PROGRESS
            ? undefined
            : new Date()
          : undefined,
      completedAt: nextStatus === TaskStatus.COMPLETED ? new Date() : null,
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      deadline: true,
      startedAt: true,
      completedAt: true,
      companyId: true,
      departmentId: true,
      createdAt: true,
      updatedAt: true,
      assignedBy: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
      assignedTo: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
      department: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return updatedTask;
};

const deleteTask = async (req: Request, taskId: string) => {
  const authUser = await getAuthUser(req);

  if (authUser.role !== UserRole.COMPANY_OWNER) {
    throw new AppError(403, "Only company owners can delete tasks");
  }

  const company = await getOwnerCompany(authUser.id);

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      companyId: company.id,
    },
    select: {
      id: true,
    },
  });

  if (!task) {
    throw new AppError(404, "Task not found");
  }

  await prisma.task.delete({
    where: {
      id: task.id,
    },
  });

  return null;
};

export const TaskService = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  updateMyTaskStatus,
  deleteTask,
};
