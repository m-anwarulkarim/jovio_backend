import { z } from "zod";

export const assignEmployeeValidationSchema = z.object({
  assignedEmployeeId: z.string().min(1, "Employee ID is required"),
});

export const changeProjectStatusValidationSchema = z.object({
  status: z.enum([
    "NEW",
    "UNDER_REVIEW",
    "ASSIGNED",
    "IN_PROGRESS",
    "WAITING_FOR_CLIENT",
    "REVIEW",
    "COMPLETED",
    "ON_HOLD",
    "CANCELLED",
  ]),
});
