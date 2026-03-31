import { z } from "zod";

export const createDepartmentValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "Department name is required" })
    .min(2, { error: "Department name must be at least 2 characters" })
    .max(100, { error: "Department name cannot exceed 100 characters" }),
});

export const updateDepartmentValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Department name must be at least 2 characters" })
    .max(100, { error: "Department name cannot exceed 100 characters" })
    .optional(),
});

export const getDepartmentsQueryValidationSchema = z.object({
  searchTerm: z.string().trim().optional(),

  page: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val ? Number(val) : 1)),

  limit: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val ? Number(val) : 10)),
});
