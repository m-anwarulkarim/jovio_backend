import { z } from "zod";

// ---- Featured Item Image ----
const featuredItemImageSchema = z.object({
  url: z.string().trim().min(1, "Image URL is required"),
  sortOrder: z.number().int().optional().default(0),
});

// ---- Featured Item Feature ----
const featuredItemFeatureSchema = z.object({
  text: z.string().trim().min(1, "Feature text is required"),
  sortOrder: z.number().int().optional().default(0),
});

// ---- Featured Item Tech ----
const featuredItemTechSchema = z.object({
  name: z.string().trim().min(1, "Technology name is required"),
});

// ---- Package Feature ----
const packageFeatureSchema = z.object({
  text: z.string().trim().min(1, "Feature text is required"),
  sortOrder: z.number().int().optional().default(0),
});

// ---- Featured Item Package ----
const featuredItemPackageSchema = z.object({
  name: z.string().trim().min(1, "Package name is required"),
  price: z.number().positive("Price must be positive"),
  description: z.string().trim().min(1, "Description is required"),
  deliveryDays: z.number().int().positive("Delivery days must be positive"),
  revisions: z.number().int().min(0, "Revisions must be 0 or more"),
  sortOrder: z.number().int().optional().default(0),
  features: z.array(packageFeatureSchema).optional().default([]),
});

// ---- Create Featured Item ----
export const createFeaturedItemSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(150, "Slug is too long")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  serviceId: z.string().trim().optional(),
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(300, "Title is too long"),
  shortDescription: z.string().trim().min(1, "Short description is required"),
  description: z.string().trim().min(1, "Description is required"),
  longDescription: z.string().trim().optional(),
  category: z.string().trim().min(1, "Category is required"),
  image: z.string().trim().min(1, "Image URL is required"),
  overview: z.string().trim().min(1, "Overview is required"),
  challenge: z.string().trim().min(1, "Challenge is required"),
  solution: z.string().trim().min(1, "Solution is required"),
  result: z.string().trim().min(1, "Result is required"),
  rating: z.number().min(0).max(5).optional(),
  reviews: z.number().int().min(0).optional(),
  isActive: z.boolean().optional().default(true),
  sortOrder: z.number().int().optional().default(0),
  features: z.array(featuredItemFeatureSchema).optional().default([]),
  technologies: z.array(featuredItemTechSchema).optional().default([]),
  packages: z.array(featuredItemPackageSchema).optional().default([]),
  images: z.array(featuredItemImageSchema).optional().default([]),
});

// ---- Update Featured Item ----
export const updateFeaturedItemSchema = createFeaturedItemSchema.partial();

// ---- Types ----
export type TCreateFeaturedItemPayload = z.infer<
  typeof createFeaturedItemSchema
>;
export type TUpdateFeaturedItemPayload = z.infer<
  typeof updateFeaturedItemSchema
>;
