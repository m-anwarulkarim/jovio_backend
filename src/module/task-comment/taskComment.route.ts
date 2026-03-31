import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { requireAuth } from "../../middlewares/auth.middleware";
import { TaskCommentController } from "./taskComment.controller";
import { createCommentValidationSchema } from "./taskComment.validation";

const router = Router();

router.post(
  "/:taskId",
  requireAuth,
  validateRequest(createCommentValidationSchema),
  TaskCommentController.createComment,
);

router.get("/:taskId", requireAuth, TaskCommentController.getTaskComments);

router.delete(
  "/comment/:commentId",
  requireAuth,
  TaskCommentController.deleteComment,
);

export const TaskCommentRoutes = router;
