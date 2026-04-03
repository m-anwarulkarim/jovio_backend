import { Router } from "express";
import { MessageController } from "./message.controller";
import authGuard from "../../middlewares/auth.guard";

const router = Router();

router.post(
  "/",
  authGuard("ADMIN", "EMPLOYEE", "CLIENT"),
  MessageController.createMessage,
);

router.get(
  "/",
  authGuard("ADMIN", "EMPLOYEE", "CLIENT"),
  MessageController.getMessages,
);

router.patch(
  "/:id/read",
  authGuard("ADMIN", "EMPLOYEE", "CLIENT"),
  MessageController.markMessageAsRead,
);

export const MessageRoutes = router;
