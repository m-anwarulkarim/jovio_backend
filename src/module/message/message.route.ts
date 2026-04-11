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

// Client/Employee sends direct message to admin
router.post(
  "/direct",
  authGuard("CLIENT", "ADMIN"),
  MessageController.createDirectMessage,
);

// Admin replies to direct message
router.post(
  "/direct/reply",
  authGuard("ADMIN"),
  MessageController.createAdminDirectReply,
);

// Get direct messages (client/employee auto, admin needs ?userId=xxx)
router.get(
  "/direct",
  authGuard("ADMIN", "CLIENT", "EMPLOYEE"),
  MessageController.getDirectMessages,
);

// Admin gets all direct conversation inbox
router.get(
  "/direct/inbox",
  authGuard("ADMIN"),
  MessageController.getDirectInbox,
);

// Mark direct conversation as read
router.patch(
  "/direct/:userId/read",
  authGuard("ADMIN", "CLIENT", "EMPLOYEE"),
  MessageController.markDirectConversationAsRead,
);

export const MessageRoutes = router;
