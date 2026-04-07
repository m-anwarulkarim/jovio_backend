import { Router } from "express";
import { AttachmentController } from "./attachment.controller";
import authGuard from "../../middlewares/auth.guard";
import { uploadAttachment } from "../../middlewares/upload/attachment.upload";

const router = Router();

router.post(
  "/upload",
  authGuard("ADMIN", "EMPLOYEE", "CLIENT"),
  uploadAttachment.single("file"),
  AttachmentController.uploadAttachment,
);

router.post(
  "/",
  authGuard("ADMIN", "EMPLOYEE", "CLIENT"),
  AttachmentController.createAttachment,
);

router.get(
  "/",
  authGuard("ADMIN", "EMPLOYEE", "CLIENT"),
  AttachmentController.getAttachments,
);

router.get(
  "/:id",
  authGuard("ADMIN", "EMPLOYEE", "CLIENT"),
  AttachmentController.getSingleAttachment,
);

router.delete(
  "/:id",
  authGuard("ADMIN", "EMPLOYEE", "CLIENT"),
  AttachmentController.deleteAttachment,
);

export const AttachmentRoutes = router;
