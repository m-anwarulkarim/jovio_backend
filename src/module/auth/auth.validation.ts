import { z } from "zod";

export const registerValidationSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginValidationSchema = z.object({
  email: z.email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
});
