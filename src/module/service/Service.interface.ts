import { z } from "zod";

// ---- Package Feature ----
const packageFeatureSchema = z.object({
  text: z.string().trim().min(1, "Feature text is required"),
  sortOrder: z.number().int().optional().default(0),
});

// ---- Service Package ----
const servicePackageSchema = z.object({
  name: z.string().trim().min(1, "Package name is required"),
  price: z.number().positive("Price must be positive"),
  description: z.string().trim().min(1, "Description is required"),
  deliveryDays: z.number().int().positive("Delivery days must be positive"),
  revisions: z.number().int().min(0, "Revisions must be 0 or more"),
  sortOrder: z.number().int().optional().default(0),
  features: z.array(packageFeatureSchema).optional().default([]),
});

// ---- Service Feature ----
const serviceFeatureSchema = z.object({
  text: z.string().trim().min(1, "Feature text is required"),
  sortOrder: z.number().int().optional().default(0),
});

// ---- Related Post ----
const relatedPostSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  category: z.string().trim().min(1, "Category is required"),
  image: z.string().trim().min(1, "Image URL is required"),
  href: z.string().trim().min(1, "Link is required"),
  sortOrder: z.number().int().optional().default(0),
});

// ---- Create Service ----
export const createServiceSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(100, "Slug is too long")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title is too long"),
  description: z.string().trim().min(1, "Description is required"),
  longDescription: z.string().trim().optional(),
  icon: z.string().trim().optional(),
  image: z.string().trim().optional(),
  tag: z.string().trim().optional(),
  projects: z.string().trim().optional(),
  isActive: z.boolean().optional().default(true),
  sortOrder: z.number().int().optional().default(0),
  features: z.array(serviceFeatureSchema).optional().default([]),
  packages: z.array(servicePackageSchema).optional().default([]),
  relatedPosts: z.array(relatedPostSchema).optional().default([]),
});

// ---- Update Service ----
export const updateServiceSchema = createServiceSchema.partial();

// ---- Types ----
export type TCreateServicePayload = z.infer<typeof createServiceSchema>;
export type TUpdateServicePayload = z.infer<typeof updateServiceSchema>;
