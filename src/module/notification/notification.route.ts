import { Router } from "express";
import { NotificationController } from "./notification.controller";
import authGuard from "../../middlewares/auth.guard";

const router = Router();

router.get(
  "/",
  authGuard("ADMIN", "EMPLOYEE", "CLIENT"),
  NotificationController.getNotifications,
);

router.get(
  "/unread-count",
  authGuard("ADMIN", "EMPLOYEE", "CLIENT"),
  NotificationController.getUnreadCount,
);

router.get(
  "/:id",
  authGuard("ADMIN", "EMPLOYEE", "CLIENT"),
  NotificationController.getSingleNotification,
);

router.patch(
  "/:id/read",
  authGuard("ADMIN", "EMPLOYEE", "CLIENT"),
  NotificationController.markAsRead,
);

router.patch(
  "/read-all",
  authGuard("ADMIN", "EMPLOYEE", "CLIENT"),
  NotificationController.markAllAsRead,
);

router.delete(
  "/:id",
  authGuard("ADMIN", "EMPLOYEE", "CLIENT"),
  NotificationController.deleteNotification,
);

export const NotificationRoutes = router;
