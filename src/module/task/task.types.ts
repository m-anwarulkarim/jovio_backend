import type { TaskPriority, TaskStatus } from "../../../generated/prisma/enums";

export type TCreateTaskPayload = {
  title: string;
  description?: string;
  priority?: TaskPriority;
  deadline?: string;
  assignedToId: string;
  departmentId?: string;
};

export type TUpdateTaskPayload = {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  deadline?: string | null;
  assignedToId?: string;
  departmentId?: string | null;
};

export type TUpdateMyTaskStatusPayload = {
  status: TaskStatus;
};

export type TGetTasksQuery = {
  searchTerm?: string;
  page?: string;
  limit?: string;
  status?: string;
  priority?: string;
  departmentId?: string;
  assignedToId?: string;
};
