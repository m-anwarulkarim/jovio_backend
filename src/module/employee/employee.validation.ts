import { z } from "zod";

export const createEmployeeValidationSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Employee name is required"
          : "Name must be a string",
    })
    .trim()
    .min(2, { error: "Name must be at least 2 characters" })
    .max(100, { error: "Name cannot exceed 100 characters" }),

  email: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Email is required"
          : "Email must be a string",
    })
    .trim()
    .email({ error: "Invalid email address" }),

  password: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Password is required"
          : "Password must be a string",
    })
    .min(8, { error: "Password must be at least 8 characters" })
    .max(100, { error: "Password cannot exceed 100 characters" }),

  phone: z
    .string()
    .trim()
    .min(6, { error: "Phone must be at least 6 characters" })
    .max(30, { error: "Phone cannot exceed 30 characters" })
    .optional(),

  bio: z
    .string()
    .trim()
    .max(500, { error: "Bio cannot exceed 500 characters" })
    .optional(),

  image: z
    .string()
    .trim()
    .url({ error: "Image must be a valid URL" })
    .optional(),

  departmentId: z.string().trim().optional(),
});

export const updateEmployeeValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Name must be at least 2 characters" })
    .max(100, { error: "Name cannot exceed 100 characters" })
    .optional(),

  phone: z
    .string()
    .trim()
    .min(6, { error: "Phone must be at least 6 characters" })
    .max(30, { error: "Phone cannot exceed 30 characters" })
    .optional(),

  bio: z
    .string()
    .trim()
    .max(500, { error: "Bio cannot exceed 500 characters" })
    .optional(),

  image: z
    .string()
    .trim()
    .url({ error: "Image must be a valid URL" })
    .optional(),

  departmentId: z.string().trim().nullable().optional(),

  isActive: z.boolean().optional(),
});

export const getEmployeesQueryValidationSchema = z.object({
  searchTerm: z.string().trim().optional(),
  page: z.string().trim().optional(),
  limit: z.string().trim().optional(),
  departmentId: z.string().trim().optional(),
  isActive: z.enum(["true", "false"]).optional(),
});

export const convertExistingUserToEmployeeValidationSchema = z.object({
  email: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Email is required"
          : "Email must be a string",
    })
    .trim()
    .min(1, { error: "Email is required" })
    .email({ error: "Invalid email address" }),

  departmentId: z.string().trim().optional(),
});
