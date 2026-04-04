import { Router } from "express";
import { PublicMessageController } from "./publicMessage.controller";
import authGuard from "../../middlewares/auth.guard";

const router = Router();

// Public visitor sends message
router.post("/", PublicMessageController.createVisitorMessage);

// Public visitor gets own chat by visitorId
router.get("/visitor/:visitorId", PublicMessageController.getVisitorMessages);

// Admin gets all public messages
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

// Admin marks message as read
router.patch(
  "/:id/read",
  authGuard("ADMIN"),
  PublicMessageController.markPublicMessageAsRead,
);

export const PublicMessageRoutes = router;
