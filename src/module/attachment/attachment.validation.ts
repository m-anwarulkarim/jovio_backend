import { z } from "zod";

export const createAttachmentValidationSchema = z.object({
  type: z.enum(["IMAGE", "FILE", "LINK"]),
  url: z.string().trim().min(1, "URL is required").max(5000),
  messageId: z.string().optional(),
  projectId: z.string().optional(),
  offerId: z.string().optional(),
  projectUpdateId: z.string().optional(),
});

export const getAttachmentsQueryValidationSchema = z.object({
  messageId: z.string().optional(),
  projectId: z.string().optional(),
  offerId: z.string().optional(),
  projectUpdateId: z.string().optional(),
});
