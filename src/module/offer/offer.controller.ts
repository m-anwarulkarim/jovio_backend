import type { Request, Response } from "express";
import { OfferService } from "./offer.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createOffer = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferService.createOfferIntoDB(req.user!, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Offer created successfully",
    data: result,
  });
});

const getOffers = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferService.getOffersFromDB(req.user!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Offers retrieved successfully",
    data: result,
  });
});

const getSingleOffer = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferService.getSingleOfferFromDB(
    req.user!,
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Offer retrieved successfully",
    data: result,
  });
});

const decideOffer = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferService.decideOfferIntoDB(
    req.user!,
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message:
      req.body.action === "ACCEPTED"
        ? "Offer accepted successfully"
        : "Offer rejected successfully",
    data: result,
  });
});

const createCheckoutSession = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OfferService.createCheckoutSessionForOffer(
      req.user!,
      req.params.id as string,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Checkout session created successfully",
      data: result,
    });
  },
);

export const OfferController = {
  createOffer,
  getOffers,
  getSingleOffer,
  decideOffer,
  createCheckoutSession,
};
