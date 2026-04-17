// import type { Request } from "express";
// import { stripeClient } from "../../config/stripe";
// import { env } from "../../config";
// import { prisma } from "../../lib/prisma";
// import {
//   NotificationType,
//   OfferStatus,
// } from "../../../generated/prisma/client";
// import AppError from "../../utils/AppError";

import { NotificationType } from "../../../generated/prisma/client";
import { env } from "../../config";
import { stripeClient } from "../../config/Stripe.config";
import AppError from "../../utils/AppError";
import { prisma } from "../../lib/prisma";

const handleStripeWebhook = async (req: Request) => {
  const signature = req.headers.get
    ? req.headers.get("stripe-signature")
    : (req as any).headers["stripe-signature"];

  if (!signature) {
    throw new AppError(400, "Missing stripe signature", "MISSING_SIGNATURE");
  }

  let event;

  try {
    const payload =
      typeof req.body === "string"
        ? req.body
        : Buffer.isBuffer(req.body)
          ? req.body
          : JSON.stringify(req.body);

    event = stripeClient.webhooks.constructEvent(
      payload,
      signature!,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    throw new AppError(
      400,
      `Webhook signature verification failed: ${err instanceof Error ? err.message : "unknown"}`,
      "INVALID_SIGNATURE",
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      if (session.payment_status !== "paid") {
        break;
      }

      const offerId = session.metadata?.offerId;
      const clientId = session.metadata?.clientId;
      const projectId = session.metadata?.projectId;

      if (!offerId) {
        break;
      }

      // update payment record
      const payment = await prisma.payment.findFirst({
        where: {
          stripeSessionId: session.id,
        },
      });

      if (payment) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: "COMPLETED",
            stripePaymentId: (session.payment_intent as string) || null,
            paidAt: new Date(),
          },
        });
      } else {
        // fallback — create payment record if not found
        const offer = await prisma.offer.findUnique({
          where: { id: offerId },
          select: { price: true },
        });

        if (offer) {
          await prisma.payment.create({
            data: {
              offerId,
              projectId: projectId || null,
              clientId: clientId || "",
              amount: offer.price,
              currency: session.currency || "usd",
              status: "COMPLETED",
              stripeSessionId: session.id,
              stripePaymentId: (session.payment_intent as string) || null,
              paidAt: new Date(),
            },
          });
        }
      }

      // notify admin
      const offer = await prisma.offer.findUnique({
        where: { id: offerId },
        select: {
          adminId: true,
          title: true,
          id: true,
        },
      });

      if (offer) {
        await prisma.notification.create({
          data: {
            userId: offer.adminId,
            offerId: offer.id,
            projectId: projectId || null,
            type: NotificationType.PROJECT_UPDATE,
            title: "Payment received",
            body: `Client paid for offer: ${offer.title}`,
          },
        });
      }

      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object;

      // mark payment as failed
      await prisma.payment.updateMany({
        where: {
          stripeSessionId: session.id,
          status: "PENDING",
        },
        data: {
          status: "FAILED",
        },
      });

      break;
    }

    default:
      // unhandled event type
      break;
  }

  return { received: true };
};

export const PaymentWebhookService = {
  handleStripeWebhook,
};
