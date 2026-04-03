import { z } from "zod";

export const createProjectUpdateValidationSchema = z.object({
  projectId: z.string().min(1, "Project ID is required"),
  progress: z
    .number()
    .int("Progress must be an integer")
    .min(0, "Progress cannot be less than 0")
    .max(100, "Progress cannot be more than 100")
    .optional(),
  note: z
    .string()
    .trim()
    .min(1, "Note is required")
    .max(5000, "Note is too long"),
  issue: z.string().trim().max(3000, "Issue is too long").optional(),
});
