import { Router } from "express";
import authGuard from "../../middlewares/auth.guard";
import { OfferController } from "./offer.controller";

const router = Router();

router.post("/", authGuard("ADMIN"), OfferController.createOffer);

router.get("/", authGuard("ADMIN", "CLIENT"), OfferController.getOffers);

router.get(
  "/:id",
  authGuard("ADMIN", "CLIENT"),
  OfferController.getSingleOffer,
);

router.patch("/:id/decision", authGuard("CLIENT"), OfferController.decideOffer);

router.post(
  "/:id/checkout",
  authGuard("CLIENT"),
  OfferController.createCheckoutSession,
);

export const OfferRoutes = router;
