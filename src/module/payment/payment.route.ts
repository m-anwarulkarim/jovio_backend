import { Router } from "express";
import express from "express";
import { PaymentWebhookController } from "./Payment.controller";

const router = Router();

// IMPORTANT: Stripe webhook এ raw body লাগে, JSON parse করা যাবে না
router.post(
  "/stripe-webhook",
  express.raw({ type: "application/json" }),
  PaymentWebhookController.handleStripeWebhook,
);

export const PaymentWebhookRoutes = router;
