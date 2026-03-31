import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { upload } from "../../middlewares/upload";
import { TaskAttachmentController } from "./taskAttachment.controller";

const router = Router();

router.post(
  "/:taskId",
  requireAuth,
  upload.single("file"),
  TaskAttachmentController.uploadAttachment,
);

router.get("/:taskId", requireAuth, TaskAttachmentController.getAttachments);

router.delete(
  "/attachment/:attachmentId",
  requireAuth,
  TaskAttachmentController.deleteAttachment,
);

export const TaskAttachmentRoutes = router;
