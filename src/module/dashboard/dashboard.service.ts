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
          slug: true,
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

const getTodayRange = () => {
  const now = new Date();

  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  return { now, startOfDay, endOfDay };
};

const getAdminDashboardStats = async () => {
  const { now, startOfDay, endOfDay } = getTodayRange();

  const [
    totalUsers,
    totalCompanies,
    activeCompanies,
    verifiedCompanies,
    totalEmployees,
    totalCompanyOwners,
    totalTasks,
    pendingTasks,
    inProgressTasks,
    reviewTasks,
    completedTasks,
    cancelledTasks,
    overdueTasks,
    dueTodayTasks,
    urgentTasks,
    highPriorityTasks,
    recentCompanies,
    recentTasks,
  ] = await prisma.$transaction([
    prisma.user.count(),
    prisma.company.count(),
    prisma.company.count({
      where: { isActive: true },
    }),
    prisma.company.count({
      where: { isVerified: true },
    }),
    prisma.user.count({
      where: { role: UserRole.EMPLOYEE },
    }),
    prisma.user.count({
      where: { role: UserRole.COMPANY_OWNER },
    }),
    prisma.task.count(),
    prisma.task.count({
      where: { status: TaskStatus.PENDING },
    }),
    prisma.task.count({
      where: { status: TaskStatus.IN_PROGRESS },
    }),
    prisma.task.count({
      where: { status: TaskStatus.REVIEW },
    }),
    prisma.task.count({
      where: { status: TaskStatus.COMPLETED },
    }),
    prisma.task.count({
      where: { status: TaskStatus.CANCELLED },
    }),
    prisma.task.count({
      where: {
        deadline: { lt: now },
        status: {
          notIn: [TaskStatus.COMPLETED, TaskStatus.CANCELLED],
        },
      },
    }),
    prisma.task.count({
      where: {
        deadline: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {
          notIn: [TaskStatus.COMPLETED, TaskStatus.CANCELLED],
        },
      },
    }),
    prisma.task.count({
      where: { priority: TaskPriority.URGENT },
    }),
    prisma.task.count({
      where: { priority: TaskPriority.HIGH },
    }),
    prisma.company.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        slug: true,
        isActive: true,
        isVerified: true,
        createdAt: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    }),
    prisma.task.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        deadline: true,
        createdAt: true,
        company: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    }),
  ]);

  return {
    scope: "ADMIN",
    overview: {
      totalUsers,
      totalCompanies,
      activeCompanies,
      verifiedCompanies,
      totalEmployees,
      totalCompanyOwners,
      totalTasks,
    },
    tasks: {
      pending: pendingTasks,
      inProgress: inProgressTasks,
      review: reviewTasks,
      completed: completedTasks,
      cancelled: cancelledTasks,
      overdue: overdueTasks,
      dueToday: dueTodayTasks,
      urgent: urgentTasks,
      highPriority: highPriorityTasks,
    },
    recentCompanies,
    recentTasks,
  };
};

const getCompanyOwnerDashboardStats = async (ownerId: string) => {
  const company = await getOwnerCompany(ownerId);
  const { now, startOfDay, endOfDay } = getTodayRange();

  const taskBaseWhere: Prisma.TaskWhereInput = {
    companyId: company.id,
  };

  const employeeBaseWhere: Prisma.UserWhereInput = {
    companyId: company.id,
    role: UserRole.EMPLOYEE,
  };

  const [
    totalEmployees,
    activeEmployees,
    inactiveEmployees,
    totalDepartments,
    totalTasks,
    pendingTasks,
    inProgressTasks,
    onHoldTasks,
    reviewTasks,
    completedTasks,
    cancelledTasks,
    overdueTasks,
    dueTodayTasks,
    urgentTasks,
    highPriorityTasks,
    recentEmployees,
    recentTasks,
  ] = await prisma.$transaction([
    prisma.user.count({
      where: employeeBaseWhere,
    }),
    prisma.user.count({
      where: {
        ...employeeBaseWhere,
        isActive: true,
      },
    }),
    prisma.user.count({
      where: {
        ...employeeBaseWhere,
        isActive: false,
      },
    }),
    prisma.department.count({
      where: {
        companyId: company.id,
      },
    }),
    prisma.task.count({
      where: taskBaseWhere,
    }),
    prisma.task.count({
      where: {
        ...taskBaseWhere,
        status: TaskStatus.PENDING,
      },
    }),
    prisma.task.count({
      where: {
        ...taskBaseWhere,
        status: TaskStatus.IN_PROGRESS,
      },
    }),
    prisma.task.count({
      where: {
        ...taskBaseWhere,
        status: TaskStatus.ON_HOLD,
      },
    }),
    prisma.task.count({
      where: {
        ...taskBaseWhere,
        status: TaskStatus.REVIEW,
      },
    }),
    prisma.task.count({
      where: {
        ...taskBaseWhere,
        status: TaskStatus.COMPLETED,
      },
    }),
    prisma.task.count({
      where: {
        ...taskBaseWhere,
        status: TaskStatus.CANCELLED,
      },
    }),
    prisma.task.count({
      where: {
        ...taskBaseWhere,
        deadline: { lt: now },
        status: {
          notIn: [TaskStatus.COMPLETED, TaskStatus.CANCELLED],
        },
      },
    }),
    prisma.task.count({
      where: {
        ...taskBaseWhere,
        deadline: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {
          notIn: [TaskStatus.COMPLETED, TaskStatus.CANCELLED],
        },
      },
    }),
    prisma.task.count({
      where: {
        ...taskBaseWhere,
        priority: TaskPriority.URGENT,
      },
    }),
    prisma.task.count({
      where: {
        ...taskBaseWhere,
        priority: TaskPriority.HIGH,
      },
    }),
    prisma.user.findMany({
      where: employeeBaseWhere,
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        isActive: true,
        createdAt: true,
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
    prisma.task.findMany({
      where: taskBaseWhere,
      take: 8,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        deadline: true,
        createdAt: true,
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        assignedBy: {
          select: {
            id: true,
            name: true,
          },
        },
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
  ]);

  return {
    scope: "COMPANY_OWNER",
    company,
    overview: {
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      totalDepartments,
      totalTasks,
    },
    tasks: {
      pending: pendingTasks,
      inProgress: inProgressTasks,
      onHold: onHoldTasks,
      review: reviewTasks,
      completed: completedTasks,
      cancelled: cancelledTasks,
      overdue: overdueTasks,
      dueToday: dueTodayTasks,
      urgent: urgentTasks,
      highPriority: highPriorityTasks,
    },
    recentEmployees,
    recentTasks,
  };
};

const getEmployeeDashboardStats = async (userId: string) => {
  const { now, startOfDay, endOfDay } = getTodayRange();

  const myTaskWhere: Prisma.TaskWhereInput = {
    assignedToId: userId,
  };

  const [
    totalTasks,
    pendingTasks,
    inProgressTasks,
    onHoldTasks,
    reviewTasks,
    completedTasks,
    cancelledTasks,
    overdueTasks,
    dueTodayTasks,
    urgentTasks,
    highPriorityTasks,
    recentTasks,
  ] = await prisma.$transaction([
    prisma.task.count({
      where: myTaskWhere,
    }),
    prisma.task.count({
      where: {
        ...myTaskWhere,
        status: TaskStatus.PENDING,
      },
    }),
    prisma.task.count({
      where: {
        ...myTaskWhere,
        status: TaskStatus.IN_PROGRESS,
      },
    }),
    prisma.task.count({
      where: {
        ...myTaskWhere,
        status: TaskStatus.ON_HOLD,
      },
    }),
    prisma.task.count({
      where: {
        ...myTaskWhere,
        status: TaskStatus.REVIEW,
      },
    }),
    prisma.task.count({
      where: {
        ...myTaskWhere,
        status: TaskStatus.COMPLETED,
      },
    }),
    prisma.task.count({
      where: {
        ...myTaskWhere,
        status: TaskStatus.CANCELLED,
      },
    }),
    prisma.task.count({
      where: {
        ...myTaskWhere,
        deadline: { lt: now },
        status: {
          notIn: [TaskStatus.COMPLETED, TaskStatus.CANCELLED],
        },
      },
    }),
    prisma.task.count({
      where: {
        ...myTaskWhere,
        deadline: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {
          notIn: [TaskStatus.COMPLETED, TaskStatus.CANCELLED],
        },
      },
    }),
    prisma.task.count({
      where: {
        ...myTaskWhere,
        priority: TaskPriority.URGENT,
      },
    }),
    prisma.task.count({
      where: {
        ...myTaskWhere,
        priority: TaskPriority.HIGH,
      },
    }),
    prisma.task.findMany({
      where: myTaskWhere,
      take: 8,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        deadline: true,
        startedAt: true,
        completedAt: true,
        createdAt: true,
        assignedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
  ]);

  return {
    scope: "EMPLOYEE",
    overview: {
      totalTasks,
      pendingTasks,
      inProgressTasks,
      onHoldTasks,
      reviewTasks,
      completedTasks,
      cancelledTasks,
      overdueTasks,
      dueTodayTasks,
      urgentTasks,
      highPriorityTasks,
    },
    recentTasks,
  };
};

const getDashboardStats = async (req: Request) => {
  const authUser = await getAuthUser(req);

  if (authUser.role === UserRole.ADMIN) {
    return getAdminDashboardStats();
  }

  if (authUser.role === UserRole.COMPANY_OWNER) {
    return getCompanyOwnerDashboardStats(authUser.id);
  }

  if (authUser.role === UserRole.EMPLOYEE) {
    return getEmployeeDashboardStats(authUser.id);
  }

  throw new AppError(403, "You are not allowed to view dashboard stats");
};

export const DashboardService = {
  getDashboardStats,
};
