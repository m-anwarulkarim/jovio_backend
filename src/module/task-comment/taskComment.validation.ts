import { z } from "zod";

export const createCommentValidationSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, { error: "Comment message is required" })
    .max(1000, { error: "Comment too long" }),
});
