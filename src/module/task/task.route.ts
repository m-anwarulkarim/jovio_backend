import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import validateQuery from "../../middlewares/validateQuery";
import { requireAuth } from "../../middlewares/auth.middleware";
import { TaskController } from "./task.controller";
import {
  createTaskValidationSchema,
  getTasksQueryValidationSchema,
  updateMyTaskStatusValidationSchema,
  updateTaskValidationSchema,
} from "./task.validation";

const router = Router();

router.post(
  "/",
  requireAuth,
  validateRequest(createTaskValidationSchema),
  TaskController.createTask,
);

router.get(
  "/",
  requireAuth,
  validateQuery(getTasksQueryValidationSchema),
  TaskController.getAllTasks,
);

router.get("/:taskId", requireAuth, TaskController.getSingleTask);

router.patch(
  "/:taskId",
  requireAuth,
  validateRequest(updateTaskValidationSchema),
  TaskController.updateTask,
);

router.patch(
  "/:taskId/my-status",
  requireAuth,
  validateRequest(updateMyTaskStatusValidationSchema),
  TaskController.updateMyTaskStatus,
);

router.delete("/:taskId", requireAuth, TaskController.deleteTask);

export const TaskRoutes = router;
