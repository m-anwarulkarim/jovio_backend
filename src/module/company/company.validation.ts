import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createCompanyValidationSchema = z.object({
  name: z
    .string("Company name is required")
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name cannot exceed 100 characters"),

  slug: z
    .string("Company slug is required")
    .trim()
    .min(2, "Slug must be at least 2 characters")
    .max(100, "Slug cannot exceed 100 characters")
    .regex(
      slugRegex,
      "Slug must be lowercase and can contain letters, numbers, and hyphens only",
    ),

  description: z
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),

  logo: z.string().trim().url("Logo must be a valid URL").optional(),

  website: z.string().trim().url("Website must be a valid URL").optional(),
});

export const updateCompanyValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name cannot exceed 100 characters")
    .optional(),

  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters")
    .max(100, "Slug cannot exceed 100 characters")
    .regex(
      slugRegex,
      "Slug must be lowercase and can contain letters, numbers, and hyphens only",
    )
    .optional(),

  description: z
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),

  logo: z.string().trim().url("Logo must be a valid URL").optional(),

  website: z.string().trim().url("Website must be a valid URL").optional(),
});

export const getCompaniesQueryValidationSchema = z.object({
  searchTerm: z.string().trim().optional(),
  page: z.string().trim().optional(),
  limit: z.string().trim().optional(),
  isVerified: z.enum(["true", "false"]).optional(),
  isActive: z.enum(["true", "false"]).optional(),
});

export const updateCompanyVerificationValidationSchema = z.object({
  isVerified: z.boolean("isVerified is required"),
});

export const updateCompanyStatusValidationSchema = z.object({
  isActive: z.boolean("isActive is required"),
});
