import { Router } from "express";
import { PublicMessageController } from "./publicMessage.controller";
import authGuard from "../../middlewares/auth.guard";
import publicMessageRateLimit from "../../middlewares/publicMessageRateLimit";

const router = Router();

// Public visitor sends message
router.post(
  "/",
  publicMessageRateLimit,
  PublicMessageController.createVisitorMessage,
);

// Public visitor gets own chat from secure cookie session
router.get(
  "/visitor/me",
  publicMessageRateLimit,
  PublicMessageController.getVisitorMessages,
);

// Admin gets grouped inbox
router.get(
  "/admin/all",
  authGuard("ADMIN"),
  PublicMessageController.getAllPublicMessages,
);

// Admin gets single visitor conversation
router.get(
  "/admin/:visitorId",
  authGuard("ADMIN"),
  PublicMessageController.getSingleVisitorConversation,
);

// Admin reply to a visitor
router.post(
  "/admin/reply",
  authGuard("ADMIN"),
  PublicMessageController.createAdminReply,
);

// Admin marks single message as read
router.patch(
  "/:id/read",
  authGuard("ADMIN"),
  PublicMessageController.markPublicMessageAsRead,
);

// Admin marks whole conversation as read
router.patch(
  "/admin/:visitorId/read-all",
  authGuard("ADMIN"),
  PublicMessageController.markVisitorConversationAsRead,
);

export const PublicMessageRoutes = router;
