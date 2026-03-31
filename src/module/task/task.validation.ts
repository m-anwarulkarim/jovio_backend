import { z } from "zod";

const taskStatusEnum = z.enum([
  "PENDING",
  "IN_PROGRESS",
  "ON_HOLD",
  "REVIEW",
  "COMPLETED",
  "CANCELLED",
]);

const taskPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);

export const createTaskValidationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { error: "Task title is required" })
    .min(2, { error: "Task title must be at least 2 characters" })
    .max(200, { error: "Task title cannot exceed 200 characters" }),

  description: z
    .string()
    .trim()
    .max(2000, { error: "Description cannot exceed 2000 characters" })
    .optional(),

  priority: taskPriorityEnum.optional(),

  deadline: z
    .string()
    .datetime({ error: "Deadline must be a valid ISO datetime" })
    .optional(),

  assignedToId: z.string().trim().min(1, { error: "assignedToId is required" }),

  departmentId: z.string().trim().optional(),
});

export const updateTaskValidationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { error: "Task title must be at least 2 characters" })
    .max(200, { error: "Task title cannot exceed 200 characters" })
    .optional(),

  description: z
    .string()
    .trim()
    .max(2000, { error: "Description cannot exceed 2000 characters" })
    .optional(),

  priority: taskPriorityEnum.optional(),

  status: taskStatusEnum.optional(),

  deadline: z
    .string()
    .datetime({ error: "Deadline must be a valid ISO datetime" })
    .nullable()
    .optional(),

  assignedToId: z.string().trim().optional(),

  departmentId: z.string().trim().nullable().optional(),
});

export const updateMyTaskStatusValidationSchema = z.object({
  status: taskStatusEnum,
});

export const getTasksQueryValidationSchema = z.object({
  searchTerm: z.string().trim().optional(),

  page: z.string().trim().optional(),

  limit: z.string().trim().optional(),

  status: taskStatusEnum.optional(),

  priority: taskPriorityEnum.optional(),

  departmentId: z.string().trim().optional(),

  assignedToId: z.string().trim().optional(),
});
