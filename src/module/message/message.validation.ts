import { z } from "zod";

export const createMessageValidationSchema = z.object({
  projectId: z.string().optional(),
  text: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(5000, "Message is too long"),
  type: z.enum(["TEXT", "ISSUE", "UPDATE", "FEEDBACK", "SYSTEM"]).optional(),
});
