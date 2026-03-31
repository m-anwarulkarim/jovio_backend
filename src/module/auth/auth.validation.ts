import { z } from "zod";

export const registerValidationSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .trim()
    .min(1, { error: "Name is required" })
    .max(100, { error: "Name is too long" }),

  email: z
    .string({ error: "Email is required" })
    .trim()
    .email({ error: "Invalid email address" }),

  password: z
    .string({ error: "Password is required" })
    .min(4, { error: "Password must be at least 4 characters" })
    .max(128, { error: "Password is too long" }),

  image: z
    .string()
    .trim()
    .url({ error: "Image must be a valid URL" })
    .optional(),
});

export const loginValidationSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .trim()
    .email({ error: "Invalid email address" }),

  password: z
    .string({ error: "Password is required" })
    .min(1, { error: "Password is required" }),

  rememberMe: z.boolean().optional(),
});

export const changePasswordValidationSchema = z.object({
  currentPassword: z
    .string({ error: "Current password is required" })
    .min(1, { error: "Current password is required" }),

  newPassword: z
    .string({ error: "New password is required" })
    .min(4, { error: "New password must be at least 4 characters" })
    .max(128, { error: "New password is too long" }),
});

export type TRegisterPayload = z.infer<typeof registerValidationSchema>;
export type TLoginPayload = z.infer<typeof loginValidationSchema>;
export type TChangePasswordPayload = z.infer<
  typeof changePasswordValidationSchema
>;
