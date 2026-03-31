import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { upload } from "../../middlewares/upload";
import { TaskAttachmentController } from "./taskAttachment.controller";

const router = Router();

router.post(
  "/tasks/:taskId/attachments",
  requireAuth,
  upload.single("file"),
  TaskAttachmentController.uploadAttachment,
);

router.get(
  "/tasks/:taskId/attachments",
  requireAuth,
  TaskAttachmentController.getAttachments,
);

router.delete(
  "/attachments/:attachmentId",
  requireAuth,
  TaskAttachmentController.deleteAttachment,
);

export const TaskAttachmentRoutes = router;
