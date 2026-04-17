import { nanoid } from "nanoid";
import {
  OfferStatus,
  ProjectStatus,
  UserRole,
  NotificationType,
} from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";
import type {
  TCreateOfferPayload,
  TOfferDecisionPayload,
} from "./offer.interface";
import { env } from "../../config";
import { stripeClient } from "../../config/Stripe.config";

type TAuthUser = {
  id: string;
  role?: string | null;
};

const generateOfferId = () => {
  return `OFF-${nanoid(8)}`;
};

const generateProjectId = () => {
  return `PRJ-${nanoid(8)}`;
};

const createOfferIntoDB = async (
  user: TAuthUser,
  payload: TCreateOfferPayload,
) => {
  if (!user?.id || user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Only admin can create offer", "FORBIDDEN");
  }

  const client = await prisma.user.findUnique({
    where: { id: payload.clientId },
    select: {
      id: true,
      role: true,
      isActive: true,
    },
  });

  if (!client) {
    throw new AppError(404, "Client not found", "CLIENT_NOT_FOUND");
  }

  if (client.role !== UserRole.CLIENT) {
    throw new AppError(
      400,
      "Offer can only be sent to a client",
      "INVALID_CLIENT",
    );
  }

  if (!client.isActive) {
    throw new AppError(400, "Client account is inactive", "CLIENT_INACTIVE");
  }

  const offer = await prisma.offer.create({
    data: {
      offerId: generateOfferId(),
      clientId: payload.clientId,
      adminId: user.id,
      title: payload.title.trim(),
      description: payload.description.trim(),
      price: payload.price,
      deliveryDays: payload.deliveryDays,
      revisions: payload.revisions ?? null,
      note: payload.note?.trim() || null,
      expiresAt: payload.expiresAt ? new Date(payload.expiresAt) : null,
      status: OfferStatus.PENDING,
    },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
        },
      },
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  await prisma.notification.create({
    data: {
      userId: payload.clientId,
      offerId: offer.id,
      type: NotificationType.NEW_OFFER,
      title: "New offer received",
      body: `You received a new offer: ${offer.title}`,
    },
  });

  return offer;
};

const getOffersFromDB = async (user: TAuthUser) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  let whereClause = {};

  if (user.role === UserRole.ADMIN) {
    whereClause = { adminId: user.id };
  } else if (user.role === UserRole.CLIENT) {
    whereClause = { clientId: user.id };
  } else {
    throw new AppError(
      403,
      "Only admin or client can view offers",
      "FORBIDDEN",
    );
  }

  const offers = await prisma.offer.findMany({
    where: whereClause,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      project: {
        select: {
          id: true,
          projectId: true,
          title: true,
          status: true,
        },
      },
    },
  });

  return offers;
};

const getSingleOfferFromDB = async (user: TAuthUser, offerId: string) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }

  const offer = await prisma.offer.findUnique({
    where: { id: offerId },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      project: true,
      attachments: true,
    },
  });

  if (!offer) {
    throw new AppError(404, "Offer not found", "OFFER_NOT_FOUND");
  }

  if (user.role === UserRole.CLIENT && offer.clientId !== user.id) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }

  if (user.role === UserRole.ADMIN && offer.adminId !== user.id) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }

  if (user.role !== UserRole.ADMIN && user.role !== UserRole.CLIENT) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }

  return offer;
};

const decideOfferIntoDB = async (
  user: TAuthUser,
  offerId: string,
  payload: TOfferDecisionPayload,
) => {
  if (!user?.id || user.role !== UserRole.CLIENT) {
    throw new AppError(403, "Only client can respond to offer", "FORBIDDEN");
  }

  if (!payload?.action || !["ACCEPTED", "REJECTED"].includes(payload.action)) {
    throw new AppError(
      400,
      "Action must be ACCEPTED or REJECTED",
      "INVALID_ACTION",
    );
  }

  const offer = await prisma.offer.findUnique({
    where: { id: offerId },
    include: {
      project: true,
    },
  });

  if (!offer) {
    throw new AppError(404, "Offer not found", "OFFER_NOT_FOUND");
  }

  if (offer.clientId !== user.id) {
    throw new AppError(403, "You cannot respond to this offer", "FORBIDDEN");
  }

  if (offer.status !== OfferStatus.PENDING) {
    throw new AppError(
      400,
      "This offer is no longer pending",
      "INVALID_OFFER_STATUS",
    );
  }

  if (offer.expiresAt && new Date(offer.expiresAt) < new Date()) {
    throw new AppError(400, "Offer has expired", "OFFER_EXPIRED");
  }

  if (payload.action === "REJECTED") {
    const rejectedOffer = await prisma.offer.update({
      where: { id: offerId },
      data: {
        status: OfferStatus.REJECTED,
        rejectedAt: new Date(),
      },
    });

    await prisma.notification.create({
      data: {
        userId: offer.adminId,
        offerId: offer.id,
        type: NotificationType.OFFER_REJECTED,
        title: "Offer rejected",
        body: `Client rejected offer: ${offer.title}`,
      },
    });

    return {
      offer: rejectedOffer,
      project: null,
    };
  }

  if (offer.project) {
    throw new AppError(
      400,
      "Project already exists for this offer",
      "PROJECT_ALREADY_EXISTS",
    );
  }

  const result = await prisma.$transaction(async (tx) => {
    const updatedOffer = await tx.offer.update({
      where: { id: offerId },
      data: {
        status: OfferStatus.ACCEPTED,
        acceptedAt: new Date(),
      },
    });

    const createdProject = await tx.project.create({
      data: {
        projectId: generateProjectId(),
        title: updatedOffer.title,
        description: updatedOffer.description,
        serviceCategory: updatedOffer.title,
        budget: updatedOffer.price,
        deadline: new Date(
          Date.now() + updatedOffer.deliveryDays * 24 * 60 * 60 * 1000,
        ),
        status: ProjectStatus.NEW,
        clientId: updatedOffer.clientId,
        offerId: updatedOffer.id,
      },
    });

    await tx.notification.create({
      data: {
        userId: updatedOffer.adminId,
        offerId: updatedOffer.id,
        projectId: createdProject.id,
        type: NotificationType.OFFER_ACCEPTED,
        title: "Offer accepted",
        body: `Client accepted offer: ${updatedOffer.title}`,
      },
    });

    return {
      offer: updatedOffer,
      project: createdProject,
    };
  });

  return result;
};

const createCheckoutSessionForOffer = async (
  user: TAuthUser,
  offerId: string,
) => {
  if (!user?.id || user.role !== UserRole.CLIENT) {
    throw new AppError(403, "Only client can pay for offer", "FORBIDDEN");
  }

  const offer = await prisma.offer.findUnique({
    where: { id: offerId },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
          stripeCustomerId: true,
        },
      },
      project: {
        select: {
          id: true,
          projectId: true,
        },
      },
    },
  });

  if (!offer) {
    throw new AppError(404, "Offer not found", "OFFER_NOT_FOUND");
  }

  if (offer.clientId !== user.id) {
    throw new AppError(403, "You cannot pay for this offer", "FORBIDDEN");
  }

  if (offer.status !== OfferStatus.ACCEPTED) {
    throw new AppError(
      400,
      "Offer must be accepted before payment",
      "OFFER_NOT_ACCEPTED",
    );
  }

  // check if already paid
  const existingPayment = await prisma.payment.findFirst({
    where: {
      offerId: offer.id,
      status: "COMPLETED",
    },
  });

  if (existingPayment) {
    throw new AppError(400, "This offer is already paid", "ALREADY_PAID");
  }

  // check if there's a pending checkout session
  const pendingPayment = await prisma.payment.findFirst({
    where: {
      offerId: offer.id,
      status: "PENDING",
    },
  });

  if (pendingPayment?.stripeSessionId) {
    // retrieve existing session
    try {
      const existingSession = await stripeClient.checkout.sessions.retrieve(
        pendingPayment.stripeSessionId,
      );

      if (existingSession.status === "open" && existingSession.url) {
        return {
          checkoutUrl: existingSession.url,
          sessionId: existingSession.id,
          payment: pendingPayment,
        };
      }
    } catch {
      // session expired or invalid, create new one
    }
  }

  // create Stripe checkout session
  const session = await stripeClient.checkout.sessions.create({
    mode: "payment",
    customer: offer.client.stripeCustomerId || undefined,
    customer_email: !offer.client.stripeCustomerId
      ? offer.client.email || undefined
      : undefined,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: offer.title,
            description: offer.description.slice(0, 500),
          },
          unit_amount: Math.round(Number(offer.price) * 100), // cents
        },
        quantity: 1,
      },
    ],
    metadata: {
      offerId: offer.id,
      clientId: offer.clientId,
      projectId: offer.project?.id || "",
    },
    success_url: `${env.FRONTEND_URL}/client/offers/${offer.id}?payment=success`,
    cancel_url: `${env.FRONTEND_URL}/client/offers/${offer.id}?payment=cancelled`,
  });

  // create or update payment record
  if (pendingPayment) {
    await prisma.payment.update({
      where: { id: pendingPayment.id },
      data: {
        stripeSessionId: session.id,
      },
    });
  } else {
    await prisma.payment.create({
      data: {
        offerId: offer.id,
        projectId: offer.project?.id || null,
        clientId: offer.clientId,
        amount: offer.price,
        currency: "usd",
        status: "PENDING",
        stripeSessionId: session.id,
      },
    });
  }

  return {
    checkoutUrl: session.url,
    sessionId: session.id,
  };
};

export const OfferService = {
  createOfferIntoDB,
  getOffersFromDB,
  getSingleOfferFromDB,
  decideOfferIntoDB,
  createCheckoutSessionForOffer,
};
