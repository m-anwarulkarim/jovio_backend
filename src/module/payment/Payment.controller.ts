import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentWebhookService } from "./Payment.webhook.service";

const handleStripeWebhook = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentWebhookService.handleStripeWebhook(req as any);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Webhook received",
    data: result,
  });
});

export const PaymentWebhookController = {
  handleStripeWebhook,
};
