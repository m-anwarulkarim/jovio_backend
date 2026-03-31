import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { requireAuth } from "../../middlewares/auth.middleware";
import { TaskCommentController } from "./taskComment.controller";
import { createCommentValidationSchema } from "./taskComment.validation";

const router = Router();

router.post(
  "/tasks/:taskId/comments",
  requireAuth,
  validateRequest(createCommentValidationSchema),
  TaskCommentController.createComment,
);

router.get(
  "/tasks/:taskId/comments",
  requireAuth,
  TaskCommentController.getTaskComments,
);

router.delete(
  "/comments/:commentId",
  requireAuth,
  TaskCommentController.deleteComment,
);

export const TaskCommentRoutes = router;
