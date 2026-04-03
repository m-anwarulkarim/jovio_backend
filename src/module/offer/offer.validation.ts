import { z } from "zod";

export const createOfferValidationSchema = z.object({
  clientId: z.string().min(1, "Client ID is required"),
  title: z.string().trim().min(1, "Title is required").max(200),
  description: z.string().trim().min(1, "Description is required").max(5000),
  price: z.number().positive("Price must be greater than 0"),
  deliveryDays: z
    .number()
    .int()
    .positive("Delivery days must be greater than 0"),
  revisions: z.number().int().min(0).optional(),
  note: z.string().trim().max(2000).optional(),
  expiresAt: z.string().optional(),
});

export const offerDecisionValidationSchema = z.object({
  action: z.enum(["ACCEPTED", "REJECTED"]),
});
