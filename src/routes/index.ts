import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.route";
import { MessageRoutes } from "../module/message/message.route";
import { OfferRoutes } from "../module/offer/offer.route";
import { ProjectRoutes } from "../module/project/project.route";
import { ProjectUpdateRoutes } from "../module/projectUpdate/projectUpdate.route";
import { AttachmentRoutes } from "../module/attachment/attachment.route";
import { NotificationRoutes } from "../module/notification/notification.route";
import { PublicMessageRoutes } from "../module/publicMessage/publicMessage.route";
import { PaymentWebhookRoutes } from "../module/payment/payment.route";
const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/messages",
    route: MessageRoutes,
  },
  {
    path: "/offers",
    route: OfferRoutes,
  },
  {
    path: "/projects",
    route: ProjectRoutes,
  },
  {
    path: "/project-updates",
    route: ProjectUpdateRoutes,
  },
  {
    path: "/attachments",
    route: AttachmentRoutes,
  },
  {
    path: "/notifications",
    route: NotificationRoutes,
  },
  {
    path: "/public-messages",
    route: PublicMessageRoutes,
  },
  {
    path: "/payment",
    route: PaymentWebhookRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
