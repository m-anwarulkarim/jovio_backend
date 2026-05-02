var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/server.ts
import http from "http";

// src/app.ts
import express2 from "express";
import cors from "cors";

// src/config/index.ts
import "dotenv/config";
function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`\u274C Missing environment variable: ${name}`);
  }
  return value;
}
var env = {
  PORT: Number(process.env.PORT) || 5e3,
  APP_URL: requireEnv("APP_URL"),
  DATABASE_URL: requireEnv("DATABASE_URL"),
  BETTER_AUTH_SECRET: requireEnv("BETTER_AUTH_SECRET"),
  BETTER_AUTH_URL: requireEnv("BETTER_AUTH_URL"),
  FRONTEND_URL: requireEnv("FRONTEND_URL"),
  CLOUDINARY_CLOUD_NAME: requireEnv("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY: requireEnv("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: requireEnv("CLOUDINARY_API_SECRET"),
  JWT_ACCESS_SECRET: requireEnv("JWT_ACCESS_SECRET"),
  JWT_ACCESS_EXPIRES_IN: requireEnv("JWT_ACCESS_EXPIRES_IN"),
  STRIPE_SECRET_KEY: requireEnv("STRIPE_SECRET_KEY"),
  STRIPE_WEBHOOK_SECRET: requireEnv("STRIPE_WEBHOOK_SECRET"),
  GOOGLE_CLIENT_ID: requireEnv("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: requireEnv("GOOGLE_CLIENT_SECRET")
};

// src/middlewares/globalErrorHandler.ts
var globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  const stackLines = err.stack ? err.stack.split("\n") : [];
  const originLine = stackLines.length > 1 ? stackLines[1].trim() : "Unknown position";
  res.status(statusCode).json({
    success: false,
    message,
    ...process.env.NODE_ENV === "development" && {
      errorSource: originLine,
      stack: err.stack
    }
  });
};
var globalErrorHandler_default = globalErrorHandler;

// src/middlewares/notFound.ts
var notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `\u274C Route not found: ${req.originalUrl}`
  });
};
var notFound_default = notFound;

// src/routes/index.ts
import { Router as Router12 } from "express";

// src/module/auth/auth.route.ts
import { Router } from "express";

// src/utils/catchAsync.ts
var catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
var catchAsync_default = catchAsync;

// src/utils/AppError.ts
var AppError = class extends Error {
  statusCode;
  code;
  details;
  constructor(statusCode, message, code = "APP_ERROR", details = null) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
};

// src/utils/sendResponse.ts
var sendResponse = (res, data) => {
  const responseData = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message || null,
    meta: data.meta || void 0,
    data: data.data || null
  };
  res.status(data.statusCode).json(responseData);
};
var sendResponse_default = sendResponse;

// generated/prisma/enums.ts
var UserRole = {
  ADMIN: "ADMIN",
  EMPLOYEE: "EMPLOYEE",
  CLIENT: "CLIENT"
};
var OfferStatus = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  EXPIRED: "EXPIRED",
  CANCELLED: "CANCELLED"
};
var ProjectStatus = {
  NEW: "NEW",
  UNDER_REVIEW: "UNDER_REVIEW",
  ASSIGNED: "ASSIGNED",
  IN_PROGRESS: "IN_PROGRESS",
  WAITING_FOR_CLIENT: "WAITING_FOR_CLIENT",
  REVIEW: "REVIEW",
  COMPLETED: "COMPLETED",
  ON_HOLD: "ON_HOLD",
  CANCELLED: "CANCELLED"
};
var MessageSenderType = {
  CLIENT: "CLIENT",
  ADMIN: "ADMIN",
  EMPLOYEE: "EMPLOYEE"
};
var MessageType = {
  TEXT: "TEXT",
  ISSUE: "ISSUE",
  UPDATE: "UPDATE",
  FEEDBACK: "FEEDBACK",
  SYSTEM: "SYSTEM"
};
var MessageConversationType = {
  ADMIN_CLIENT: "ADMIN_CLIENT",
  ADMIN_EMPLOYEE: "ADMIN_EMPLOYEE",
  DIRECT: "DIRECT"
};
var AttachmentType = {
  IMAGE: "IMAGE",
  FILE: "FILE",
  LINK: "LINK"
};
var PublicSenderType = {
  VISITOR: "VISITOR",
  ADMIN: "ADMIN"
};
var NotificationType = {
  NEW_MESSAGE: "NEW_MESSAGE",
  NEW_OFFER: "NEW_OFFER",
  OFFER_ACCEPTED: "OFFER_ACCEPTED",
  OFFER_REJECTED: "OFFER_REJECTED",
  PROJECT_ASSIGNED: "PROJECT_ASSIGNED",
  PROJECT_STATUS_CHANGED: "PROJECT_STATUS_CHANGED",
  PROJECT_UPDATE: "PROJECT_UPDATE"
};

// src/lib/auth.ts
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import "process";
import * as path from "path";
import { fileURLToPath } from "url";
import "@prisma/client/runtime/client";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.6.0",
  "engineVersion": "75cbdc1eb7150937890ad5465d861175c6624711",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum UserRole {\n  ADMIN\n  EMPLOYEE\n  CLIENT\n}\n\nenum OfferStatus {\n  PENDING\n  ACCEPTED\n  REJECTED\n  EXPIRED\n  CANCELLED\n}\n\nenum ProjectStatus {\n  NEW\n  UNDER_REVIEW\n  ASSIGNED\n  IN_PROGRESS\n  WAITING_FOR_CLIENT\n  REVIEW\n  COMPLETED\n  ON_HOLD\n  CANCELLED\n}\n\nenum MessageSenderType {\n  CLIENT\n  ADMIN\n  EMPLOYEE\n}\n\nenum MessageType {\n  TEXT\n  ISSUE\n  UPDATE\n  FEEDBACK\n  SYSTEM\n}\n\nenum MessageConversationType {\n  ADMIN_CLIENT\n  ADMIN_EMPLOYEE\n  DIRECT\n}\n\nenum AttachmentType {\n  IMAGE\n  FILE\n  LINK\n}\n\nenum PublicSenderType {\n  VISITOR\n  ADMIN\n}\n\nenum NotificationType {\n  NEW_MESSAGE\n  NEW_OFFER\n  OFFER_ACCEPTED\n  OFFER_REJECTED\n  PROJECT_ASSIGNED\n  PROJECT_STATUS_CHANGED\n  PROJECT_UPDATE\n}\n\nenum PaymentStatus {\n  PENDING\n  COMPLETED\n  FAILED\n  REFUNDED\n  CANCELLED\n}\n\nmodel User {\n  id       String   @id @default(cuid())\n  name     String\n  email    String?  @unique\n  phone    String?  @unique\n  password String?\n  role     UserRole @default(CLIENT)\n\n  bio           String?\n  isActive      Boolean @default(true)\n  emailVerified Boolean @default(false)\n  image         String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  clientOffers   Offer[]   @relation("ClientOffers")\n  clientProjects Project[] @relation("ClientProjects")\n\n  adminOffers        Offer[]   @relation("AdminOffers")\n  assignedByProjects Project[] @relation("AssignedByAdminProjects")\n\n  assignedProjects Project[]       @relation("AssignedEmployeeProjects")\n  projectUpdates   ProjectUpdate[]\n\n  sentMessages Message[] @relation("SentMessages")\n\n  receivedMessages Message[] @relation("ReceivedMessages")\n\n  uploadedAttachments Attachment[] @relation("UploadedByUser")\n\n  notifications Notification[]\n\n  publicMessages PublicMessage[] @relation("AdminPublicMessages")\n\n  clientPayments Payment[] @relation("ClientPayments")\n\n  sessions Session[]\n  accounts Account[]\n\n  stripeCustomerId String?\n\n  @@index([role])\n  @@map("users")\n}\n\nmodel Payment {\n  id              String        @id @default(cuid())\n  offerId         String\n  projectId       String?\n  clientId        String\n  amount          Decimal       @db.Decimal(10, 2)\n  currency        String        @default("usd")\n  status          PaymentStatus @default(PENDING)\n  stripeSessionId String?       @unique\n  stripePaymentId String?       @unique\n  paidAt          DateTime?\n  refundedAt      DateTime?\n  createdAt       DateTime      @default(now())\n  updatedAt       DateTime      @updatedAt\n\n  offer   Offer    @relation(fields: [offerId], references: [id])\n  project Project? @relation(fields: [projectId], references: [id])\n  client  User     @relation("ClientPayments", fields: [clientId], references: [id])\n\n  @@index([offerId])\n  @@index([projectId])\n  @@index([clientId])\n  @@index([status])\n  @@index([stripeSessionId])\n  @@map("payments")\n}\n\nmodel Offer {\n  id           String      @id @default(cuid())\n  offerId      String      @unique\n  title        String\n  description  String\n  price        Decimal     @db.Decimal(10, 2)\n  deliveryDays Int\n  revisions    Int?\n  note         String?\n  status       OfferStatus @default(PENDING)\n  expiresAt    DateTime?\n\n  clientId String\n  adminId  String\n\n  acceptedAt DateTime?\n  rejectedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  client        User           @relation("ClientOffers", fields: [clientId], references: [id])\n  admin         User           @relation("AdminOffers", fields: [adminId], references: [id])\n  project       Project?\n  attachments   Attachment[]\n  notifications Notification[]\n\n  payments Payment[]\n\n  @@index([clientId])\n  @@index([adminId])\n  @@index([status])\n  @@map("offers")\n}\n\nmodel Project {\n  id              String        @id @default(cuid())\n  projectId       String        @unique\n  title           String\n  description     String\n  serviceCategory String\n  budget          Decimal?      @db.Decimal(10, 2)\n  deadline        DateTime?\n  status          ProjectStatus @default(NEW)\n\n  clientId           String\n  assignedEmployeeId String?\n  assignedByAdminId  String?\n  offerId            String? @unique\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  client           User  @relation("ClientProjects", fields: [clientId], references: [id])\n  assignedEmployee User? @relation("AssignedEmployeeProjects", fields: [assignedEmployeeId], references: [id])\n  assignedByAdmin  User? @relation("AssignedByAdminProjects", fields: [assignedByAdminId], references: [id])\n\n  offer         Offer?          @relation(fields: [offerId], references: [id])\n  messages      Message[]\n  updates       ProjectUpdate[]\n  attachments   Attachment[]\n  notifications Notification[]\n  payments      Payment[]\n\n  @@index([clientId])\n  @@index([assignedEmployeeId])\n  @@index([assignedByAdminId])\n  @@index([offerId])\n  @@index([status])\n  @@map("projects")\n}\n\nmodel ProjectUpdate {\n  id        String   @id @default(cuid())\n  projectId String\n  userId    String\n  progress  Int?\n  note      String\n  issue     String?\n  createdAt DateTime @default(now())\n\n  project     Project      @relation(fields: [projectId], references: [id])\n  user        User         @relation(fields: [userId], references: [id])\n  attachments Attachment[]\n\n  @@index([projectId])\n  @@index([userId])\n  @@map("project_updates")\n}\n\nmodel Message {\n  id               String                  @id @default(cuid())\n  projectId        String? // optional \u0995\u09B0\u09CB\n  senderId         String\n  receiverId       String? // \u09A8\u09A4\u09C1\u09A8 field\n  senderType       MessageSenderType\n  conversationType MessageConversationType\n  type             MessageType             @default(TEXT)\n  text             String\n  isRead           Boolean                 @default(false)\n  createdAt        DateTime                @default(now())\n\n  project     Project?     @relation(fields: [projectId], references: [id]) // optional \u0995\u09B0\u09CB\n  sender      User         @relation("SentMessages", fields: [senderId], references: [id])\n  receiver    User?        @relation("ReceivedMessages", fields: [receiverId], references: [id])\n  attachments Attachment[]\n\n  // \u09A8\u09A4\u09C1\u09A8 index\n  @@index([projectId])\n  @@index([senderId])\n  @@index([receiverId])\n  @@index([isRead])\n  @@index([conversationType])\n  @@index([projectId, conversationType])\n  @@map("messages")\n}\n\nmodel PublicMessage {\n  id         String           @id @default(cuid())\n  visitorId  String\n  adminId    String?\n  senderType PublicSenderType\n  text       String\n  ipAddress  String?\n  isRead     Boolean          @default(false)\n  createdAt  DateTime         @default(now())\n  updatedAt  DateTime         @updatedAt\n\n  admin User? @relation("AdminPublicMessages", fields: [adminId], references: [id])\n\n  @@index([visitorId])\n  @@index([adminId])\n  @@index([isRead])\n  @@map("public_messages")\n}\n\nmodel Attachment {\n  id           String         @id @default(cuid())\n  type         AttachmentType\n  url          String\n  publicId     String?\n  originalName String?\n  mimeType     String?\n  size         Int?\n  uploadedById String?\n  createdAt    DateTime       @default(now())\n\n  messageId       String?\n  projectId       String?\n  offerId         String?\n  projectUpdateId String?\n\n  message       Message?       @relation(fields: [messageId], references: [id])\n  project       Project?       @relation(fields: [projectId], references: [id])\n  offer         Offer?         @relation(fields: [offerId], references: [id])\n  projectUpdate ProjectUpdate? @relation(fields: [projectUpdateId], references: [id])\n  uploadedBy    User?          @relation("UploadedByUser", fields: [uploadedById], references: [id])\n\n  @@index([messageId])\n  @@index([projectId])\n  @@index([offerId])\n  @@index([projectUpdateId])\n  @@index([uploadedById])\n  @@map("attachments")\n}\n\nmodel Notification {\n  id        String           @id @default(cuid())\n  userId    String\n  offerId   String?\n  projectId String?\n  type      NotificationType\n  title     String\n  body      String?\n  isRead    Boolean          @default(false)\n  createdAt DateTime         @default(now())\n\n  user    User     @relation(fields: [userId], references: [id])\n  offer   Offer?   @relation(fields: [offerId], references: [id])\n  project Project? @relation(fields: [projectId], references: [id])\n\n  @@index([userId])\n  @@index([offerId])\n  @@index([projectId])\n  @@index([isRead])\n  @@map("notifications")\n}\n\nmodel Service {\n  id              String   @id @default(cuid())\n  slug            String   @unique\n  title           String\n  description     String\n  longDescription String?\n  icon            String?\n  image           String?\n  tag             String?\n  projects        String?\n  isActive        Boolean  @default(true)\n  sortOrder       Int      @default(0)\n  createdAt       DateTime @default(now())\n  updatedAt       DateTime @updatedAt\n\n  features      ServiceFeature[]\n  relatedPosts  ServiceRelatedPost[]\n  packages      ServicePackage[]\n  featuredItems FeaturedItem[]\n\n  @@index([slug])\n  @@index([isActive])\n  @@map("services")\n}\n\nmodel ServiceFeature {\n  id        String @id @default(cuid())\n  serviceId String\n  text      String\n  sortOrder Int    @default(0)\n\n  service Service @relation(fields: [serviceId], references: [id], onDelete: Cascade)\n\n  @@index([serviceId])\n  @@map("service_features")\n}\n\nmodel ServicePackage {\n  id           String  @id @default(cuid())\n  serviceId    String\n  name         String\n  price        Decimal @db.Decimal(10, 2)\n  description  String\n  deliveryDays Int\n  revisions    Int\n  sortOrder    Int     @default(0)\n\n  service  Service          @relation(fields: [serviceId], references: [id], onDelete: Cascade)\n  features PackageFeature[]\n\n  @@index([serviceId])\n  @@map("service_packages")\n}\n\nmodel PackageFeature {\n  id        String @id @default(cuid())\n  packageId String\n  text      String\n  sortOrder Int    @default(0)\n\n  package ServicePackage @relation(fields: [packageId], references: [id], onDelete: Cascade)\n\n  @@index([packageId])\n  @@map("package_features")\n}\n\nmodel ServiceRelatedPost {\n  id          String @id @default(cuid())\n  serviceId   String\n  title       String\n  description String\n  category    String\n  image       String\n  href        String\n  sortOrder   Int    @default(0)\n\n  service Service @relation(fields: [serviceId], references: [id], onDelete: Cascade)\n\n  @@index([serviceId])\n  @@map("service_related_posts")\n}\n\nmodel FeaturedItem {\n  id               String   @id @default(cuid())\n  slug             String   @unique\n  serviceId        String?\n  title            String\n  shortDescription String\n  description      String\n  longDescription  String?  @db.Text\n  category         String\n  image            String\n  overview         String   @db.Text\n  challenge        String   @db.Text\n  solution         String   @db.Text\n  result           String   @db.Text\n  rating           Float?\n  reviews          Int?\n  isActive         Boolean  @default(true)\n  sortOrder        Int      @default(0)\n  createdAt        DateTime @default(now())\n  updatedAt        DateTime @updatedAt\n\n  service      Service?              @relation(fields: [serviceId], references: [id])\n  features     FeaturedItemFeature[]\n  technologies FeaturedItemTech[]\n  packages     FeaturedItemPackage[]\n  images       FeaturedItemImage[]\n\n  @@index([serviceId])\n  @@index([slug])\n  @@index([isActive])\n  @@map("featured_items")\n}\n\nmodel FeaturedItemFeature {\n  id             String @id @default(cuid())\n  featuredItemId String\n  text           String\n  sortOrder      Int    @default(0)\n\n  featuredItem FeaturedItem @relation(fields: [featuredItemId], references: [id], onDelete: Cascade)\n\n  @@index([featuredItemId])\n  @@map("featured_item_features")\n}\n\nmodel FeaturedItemTech {\n  id             String @id @default(cuid())\n  featuredItemId String\n  name           String\n\n  featuredItem FeaturedItem @relation(fields: [featuredItemId], references: [id], onDelete: Cascade)\n\n  @@index([featuredItemId])\n  @@map("featured_item_techs")\n}\n\nmodel FeaturedItemPackage {\n  id             String  @id @default(cuid())\n  featuredItemId String\n  name           String\n  price          Decimal @db.Decimal(10, 2)\n  description    String\n  deliveryDays   Int\n  revisions      Int\n  sortOrder      Int     @default(0)\n\n  featuredItem FeaturedItem                 @relation(fields: [featuredItemId], references: [id], onDelete: Cascade)\n  features     FeaturedItemPackageFeature[]\n\n  @@index([featuredItemId])\n  @@map("featured_item_packages")\n}\n\nmodel FeaturedItemPackageFeature {\n  id        String @id @default(cuid())\n  packageId String\n  text      String\n  sortOrder Int    @default(0)\n\n  package FeaturedItemPackage @relation(fields: [packageId], references: [id], onDelete: Cascade)\n\n  @@index([packageId])\n  @@map("featured_item_package_features")\n}\n\nmodel FeaturedItemImage {\n  id             String @id @default(cuid())\n  featuredItemId String\n  url            String\n  sortOrder      Int    @default(0)\n\n  featuredItem FeaturedItem @relation(fields: [featuredItemId], references: [id], onDelete: Cascade)\n\n  @@index([featuredItemId])\n  @@map("featured_item_images")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String   @unique\n  userId    String\n  user      User     @relation(fields: [userId], references: [id])\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id         String @id\n  accountId  String\n  providerId String\n  userId     String\n  user       User   @relation(fields: [userId], references: [id])\n\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"UserRole"},{"name":"bio","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"clientOffers","kind":"object","type":"Offer","relationName":"ClientOffers"},{"name":"clientProjects","kind":"object","type":"Project","relationName":"ClientProjects"},{"name":"adminOffers","kind":"object","type":"Offer","relationName":"AdminOffers"},{"name":"assignedByProjects","kind":"object","type":"Project","relationName":"AssignedByAdminProjects"},{"name":"assignedProjects","kind":"object","type":"Project","relationName":"AssignedEmployeeProjects"},{"name":"projectUpdates","kind":"object","type":"ProjectUpdate","relationName":"ProjectUpdateToUser"},{"name":"sentMessages","kind":"object","type":"Message","relationName":"SentMessages"},{"name":"receivedMessages","kind":"object","type":"Message","relationName":"ReceivedMessages"},{"name":"uploadedAttachments","kind":"object","type":"Attachment","relationName":"UploadedByUser"},{"name":"notifications","kind":"object","type":"Notification","relationName":"NotificationToUser"},{"name":"publicMessages","kind":"object","type":"PublicMessage","relationName":"AdminPublicMessages"},{"name":"clientPayments","kind":"object","type":"Payment","relationName":"ClientPayments"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"stripeCustomerId","kind":"scalar","type":"String"}],"dbName":"users"},"Payment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"offerId","kind":"scalar","type":"String"},{"name":"projectId","kind":"scalar","type":"String"},{"name":"clientId","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"currency","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"PaymentStatus"},{"name":"stripeSessionId","kind":"scalar","type":"String"},{"name":"stripePaymentId","kind":"scalar","type":"String"},{"name":"paidAt","kind":"scalar","type":"DateTime"},{"name":"refundedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"offer","kind":"object","type":"Offer","relationName":"OfferToPayment"},{"name":"project","kind":"object","type":"Project","relationName":"PaymentToProject"},{"name":"client","kind":"object","type":"User","relationName":"ClientPayments"}],"dbName":"payments"},"Offer":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"offerId","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"deliveryDays","kind":"scalar","type":"Int"},{"name":"revisions","kind":"scalar","type":"Int"},{"name":"note","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OfferStatus"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"clientId","kind":"scalar","type":"String"},{"name":"adminId","kind":"scalar","type":"String"},{"name":"acceptedAt","kind":"scalar","type":"DateTime"},{"name":"rejectedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"client","kind":"object","type":"User","relationName":"ClientOffers"},{"name":"admin","kind":"object","type":"User","relationName":"AdminOffers"},{"name":"project","kind":"object","type":"Project","relationName":"OfferToProject"},{"name":"attachments","kind":"object","type":"Attachment","relationName":"AttachmentToOffer"},{"name":"notifications","kind":"object","type":"Notification","relationName":"NotificationToOffer"},{"name":"payments","kind":"object","type":"Payment","relationName":"OfferToPayment"}],"dbName":"offers"},"Project":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"projectId","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"serviceCategory","kind":"scalar","type":"String"},{"name":"budget","kind":"scalar","type":"Decimal"},{"name":"deadline","kind":"scalar","type":"DateTime"},{"name":"status","kind":"enum","type":"ProjectStatus"},{"name":"clientId","kind":"scalar","type":"String"},{"name":"assignedEmployeeId","kind":"scalar","type":"String"},{"name":"assignedByAdminId","kind":"scalar","type":"String"},{"name":"offerId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"client","kind":"object","type":"User","relationName":"ClientProjects"},{"name":"assignedEmployee","kind":"object","type":"User","relationName":"AssignedEmployeeProjects"},{"name":"assignedByAdmin","kind":"object","type":"User","relationName":"AssignedByAdminProjects"},{"name":"offer","kind":"object","type":"Offer","relationName":"OfferToProject"},{"name":"messages","kind":"object","type":"Message","relationName":"MessageToProject"},{"name":"updates","kind":"object","type":"ProjectUpdate","relationName":"ProjectToProjectUpdate"},{"name":"attachments","kind":"object","type":"Attachment","relationName":"AttachmentToProject"},{"name":"notifications","kind":"object","type":"Notification","relationName":"NotificationToProject"},{"name":"payments","kind":"object","type":"Payment","relationName":"PaymentToProject"}],"dbName":"projects"},"ProjectUpdate":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"projectId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"progress","kind":"scalar","type":"Int"},{"name":"note","kind":"scalar","type":"String"},{"name":"issue","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"project","kind":"object","type":"Project","relationName":"ProjectToProjectUpdate"},{"name":"user","kind":"object","type":"User","relationName":"ProjectUpdateToUser"},{"name":"attachments","kind":"object","type":"Attachment","relationName":"AttachmentToProjectUpdate"}],"dbName":"project_updates"},"Message":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"projectId","kind":"scalar","type":"String"},{"name":"senderId","kind":"scalar","type":"String"},{"name":"receiverId","kind":"scalar","type":"String"},{"name":"senderType","kind":"enum","type":"MessageSenderType"},{"name":"conversationType","kind":"enum","type":"MessageConversationType"},{"name":"type","kind":"enum","type":"MessageType"},{"name":"text","kind":"scalar","type":"String"},{"name":"isRead","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"project","kind":"object","type":"Project","relationName":"MessageToProject"},{"name":"sender","kind":"object","type":"User","relationName":"SentMessages"},{"name":"receiver","kind":"object","type":"User","relationName":"ReceivedMessages"},{"name":"attachments","kind":"object","type":"Attachment","relationName":"AttachmentToMessage"}],"dbName":"messages"},"PublicMessage":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"visitorId","kind":"scalar","type":"String"},{"name":"adminId","kind":"scalar","type":"String"},{"name":"senderType","kind":"enum","type":"PublicSenderType"},{"name":"text","kind":"scalar","type":"String"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"isRead","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"admin","kind":"object","type":"User","relationName":"AdminPublicMessages"}],"dbName":"public_messages"},"Attachment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"type","kind":"enum","type":"AttachmentType"},{"name":"url","kind":"scalar","type":"String"},{"name":"publicId","kind":"scalar","type":"String"},{"name":"originalName","kind":"scalar","type":"String"},{"name":"mimeType","kind":"scalar","type":"String"},{"name":"size","kind":"scalar","type":"Int"},{"name":"uploadedById","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"messageId","kind":"scalar","type":"String"},{"name":"projectId","kind":"scalar","type":"String"},{"name":"offerId","kind":"scalar","type":"String"},{"name":"projectUpdateId","kind":"scalar","type":"String"},{"name":"message","kind":"object","type":"Message","relationName":"AttachmentToMessage"},{"name":"project","kind":"object","type":"Project","relationName":"AttachmentToProject"},{"name":"offer","kind":"object","type":"Offer","relationName":"AttachmentToOffer"},{"name":"projectUpdate","kind":"object","type":"ProjectUpdate","relationName":"AttachmentToProjectUpdate"},{"name":"uploadedBy","kind":"object","type":"User","relationName":"UploadedByUser"}],"dbName":"attachments"},"Notification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"offerId","kind":"scalar","type":"String"},{"name":"projectId","kind":"scalar","type":"String"},{"name":"type","kind":"enum","type":"NotificationType"},{"name":"title","kind":"scalar","type":"String"},{"name":"body","kind":"scalar","type":"String"},{"name":"isRead","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"NotificationToUser"},{"name":"offer","kind":"object","type":"Offer","relationName":"NotificationToOffer"},{"name":"project","kind":"object","type":"Project","relationName":"NotificationToProject"}],"dbName":"notifications"},"Service":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"longDescription","kind":"scalar","type":"String"},{"name":"icon","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"tag","kind":"scalar","type":"String"},{"name":"projects","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"sortOrder","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"features","kind":"object","type":"ServiceFeature","relationName":"ServiceToServiceFeature"},{"name":"relatedPosts","kind":"object","type":"ServiceRelatedPost","relationName":"ServiceToServiceRelatedPost"},{"name":"packages","kind":"object","type":"ServicePackage","relationName":"ServiceToServicePackage"},{"name":"featuredItems","kind":"object","type":"FeaturedItem","relationName":"FeaturedItemToService"}],"dbName":"services"},"ServiceFeature":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"serviceId","kind":"scalar","type":"String"},{"name":"text","kind":"scalar","type":"String"},{"name":"sortOrder","kind":"scalar","type":"Int"},{"name":"service","kind":"object","type":"Service","relationName":"ServiceToServiceFeature"}],"dbName":"service_features"},"ServicePackage":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"serviceId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"description","kind":"scalar","type":"String"},{"name":"deliveryDays","kind":"scalar","type":"Int"},{"name":"revisions","kind":"scalar","type":"Int"},{"name":"sortOrder","kind":"scalar","type":"Int"},{"name":"service","kind":"object","type":"Service","relationName":"ServiceToServicePackage"},{"name":"features","kind":"object","type":"PackageFeature","relationName":"PackageFeatureToServicePackage"}],"dbName":"service_packages"},"PackageFeature":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"packageId","kind":"scalar","type":"String"},{"name":"text","kind":"scalar","type":"String"},{"name":"sortOrder","kind":"scalar","type":"Int"},{"name":"package","kind":"object","type":"ServicePackage","relationName":"PackageFeatureToServicePackage"}],"dbName":"package_features"},"ServiceRelatedPost":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"serviceId","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"href","kind":"scalar","type":"String"},{"name":"sortOrder","kind":"scalar","type":"Int"},{"name":"service","kind":"object","type":"Service","relationName":"ServiceToServiceRelatedPost"}],"dbName":"service_related_posts"},"FeaturedItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"serviceId","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"shortDescription","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"longDescription","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"overview","kind":"scalar","type":"String"},{"name":"challenge","kind":"scalar","type":"String"},{"name":"solution","kind":"scalar","type":"String"},{"name":"result","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Float"},{"name":"reviews","kind":"scalar","type":"Int"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"sortOrder","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"service","kind":"object","type":"Service","relationName":"FeaturedItemToService"},{"name":"features","kind":"object","type":"FeaturedItemFeature","relationName":"FeaturedItemToFeaturedItemFeature"},{"name":"technologies","kind":"object","type":"FeaturedItemTech","relationName":"FeaturedItemToFeaturedItemTech"},{"name":"packages","kind":"object","type":"FeaturedItemPackage","relationName":"FeaturedItemToFeaturedItemPackage"},{"name":"images","kind":"object","type":"FeaturedItemImage","relationName":"FeaturedItemToFeaturedItemImage"}],"dbName":"featured_items"},"FeaturedItemFeature":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"featuredItemId","kind":"scalar","type":"String"},{"name":"text","kind":"scalar","type":"String"},{"name":"sortOrder","kind":"scalar","type":"Int"},{"name":"featuredItem","kind":"object","type":"FeaturedItem","relationName":"FeaturedItemToFeaturedItemFeature"}],"dbName":"featured_item_features"},"FeaturedItemTech":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"featuredItemId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"featuredItem","kind":"object","type":"FeaturedItem","relationName":"FeaturedItemToFeaturedItemTech"}],"dbName":"featured_item_techs"},"FeaturedItemPackage":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"featuredItemId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"description","kind":"scalar","type":"String"},{"name":"deliveryDays","kind":"scalar","type":"Int"},{"name":"revisions","kind":"scalar","type":"Int"},{"name":"sortOrder","kind":"scalar","type":"Int"},{"name":"featuredItem","kind":"object","type":"FeaturedItem","relationName":"FeaturedItemToFeaturedItemPackage"},{"name":"features","kind":"object","type":"FeaturedItemPackageFeature","relationName":"FeaturedItemPackageToFeaturedItemPackageFeature"}],"dbName":"featured_item_packages"},"FeaturedItemPackageFeature":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"packageId","kind":"scalar","type":"String"},{"name":"text","kind":"scalar","type":"String"},{"name":"sortOrder","kind":"scalar","type":"Int"},{"name":"package","kind":"object","type":"FeaturedItemPackage","relationName":"FeaturedItemPackageToFeaturedItemPackageFeature"}],"dbName":"featured_item_package_features"},"FeaturedItemImage":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"featuredItemId","kind":"scalar","type":"String"},{"name":"url","kind":"scalar","type":"String"},{"name":"sortOrder","kind":"scalar","type":"Int"},{"name":"featuredItem","kind":"object","type":"FeaturedItem","relationName":"FeaturedItemToFeaturedItemImage"}],"dbName":"featured_item_images"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","client","admin","assignedEmployee","assignedByAdmin","offer","project","sender","receiver","message","user","attachments","_count","projectUpdate","uploadedBy","messages","updates","notifications","payments","clientOffers","clientProjects","adminOffers","assignedByProjects","assignedProjects","projectUpdates","sentMessages","receivedMessages","uploadedAttachments","publicMessages","clientPayments","sessions","accounts","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","data","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","create","update","User.upsertOne","User.deleteOne","User.deleteMany","having","_min","_max","User.groupBy","User.aggregate","Payment.findUnique","Payment.findUniqueOrThrow","Payment.findFirst","Payment.findFirstOrThrow","Payment.findMany","Payment.createOne","Payment.createMany","Payment.createManyAndReturn","Payment.updateOne","Payment.updateMany","Payment.updateManyAndReturn","Payment.upsertOne","Payment.deleteOne","Payment.deleteMany","_avg","_sum","Payment.groupBy","Payment.aggregate","Offer.findUnique","Offer.findUniqueOrThrow","Offer.findFirst","Offer.findFirstOrThrow","Offer.findMany","Offer.createOne","Offer.createMany","Offer.createManyAndReturn","Offer.updateOne","Offer.updateMany","Offer.updateManyAndReturn","Offer.upsertOne","Offer.deleteOne","Offer.deleteMany","Offer.groupBy","Offer.aggregate","Project.findUnique","Project.findUniqueOrThrow","Project.findFirst","Project.findFirstOrThrow","Project.findMany","Project.createOne","Project.createMany","Project.createManyAndReturn","Project.updateOne","Project.updateMany","Project.updateManyAndReturn","Project.upsertOne","Project.deleteOne","Project.deleteMany","Project.groupBy","Project.aggregate","ProjectUpdate.findUnique","ProjectUpdate.findUniqueOrThrow","ProjectUpdate.findFirst","ProjectUpdate.findFirstOrThrow","ProjectUpdate.findMany","ProjectUpdate.createOne","ProjectUpdate.createMany","ProjectUpdate.createManyAndReturn","ProjectUpdate.updateOne","ProjectUpdate.updateMany","ProjectUpdate.updateManyAndReturn","ProjectUpdate.upsertOne","ProjectUpdate.deleteOne","ProjectUpdate.deleteMany","ProjectUpdate.groupBy","ProjectUpdate.aggregate","Message.findUnique","Message.findUniqueOrThrow","Message.findFirst","Message.findFirstOrThrow","Message.findMany","Message.createOne","Message.createMany","Message.createManyAndReturn","Message.updateOne","Message.updateMany","Message.updateManyAndReturn","Message.upsertOne","Message.deleteOne","Message.deleteMany","Message.groupBy","Message.aggregate","PublicMessage.findUnique","PublicMessage.findUniqueOrThrow","PublicMessage.findFirst","PublicMessage.findFirstOrThrow","PublicMessage.findMany","PublicMessage.createOne","PublicMessage.createMany","PublicMessage.createManyAndReturn","PublicMessage.updateOne","PublicMessage.updateMany","PublicMessage.updateManyAndReturn","PublicMessage.upsertOne","PublicMessage.deleteOne","PublicMessage.deleteMany","PublicMessage.groupBy","PublicMessage.aggregate","Attachment.findUnique","Attachment.findUniqueOrThrow","Attachment.findFirst","Attachment.findFirstOrThrow","Attachment.findMany","Attachment.createOne","Attachment.createMany","Attachment.createManyAndReturn","Attachment.updateOne","Attachment.updateMany","Attachment.updateManyAndReturn","Attachment.upsertOne","Attachment.deleteOne","Attachment.deleteMany","Attachment.groupBy","Attachment.aggregate","Notification.findUnique","Notification.findUniqueOrThrow","Notification.findFirst","Notification.findFirstOrThrow","Notification.findMany","Notification.createOne","Notification.createMany","Notification.createManyAndReturn","Notification.updateOne","Notification.updateMany","Notification.updateManyAndReturn","Notification.upsertOne","Notification.deleteOne","Notification.deleteMany","Notification.groupBy","Notification.aggregate","service","features","relatedPosts","package","packages","featuredItem","technologies","images","featuredItems","Service.findUnique","Service.findUniqueOrThrow","Service.findFirst","Service.findFirstOrThrow","Service.findMany","Service.createOne","Service.createMany","Service.createManyAndReturn","Service.updateOne","Service.updateMany","Service.updateManyAndReturn","Service.upsertOne","Service.deleteOne","Service.deleteMany","Service.groupBy","Service.aggregate","ServiceFeature.findUnique","ServiceFeature.findUniqueOrThrow","ServiceFeature.findFirst","ServiceFeature.findFirstOrThrow","ServiceFeature.findMany","ServiceFeature.createOne","ServiceFeature.createMany","ServiceFeature.createManyAndReturn","ServiceFeature.updateOne","ServiceFeature.updateMany","ServiceFeature.updateManyAndReturn","ServiceFeature.upsertOne","ServiceFeature.deleteOne","ServiceFeature.deleteMany","ServiceFeature.groupBy","ServiceFeature.aggregate","ServicePackage.findUnique","ServicePackage.findUniqueOrThrow","ServicePackage.findFirst","ServicePackage.findFirstOrThrow","ServicePackage.findMany","ServicePackage.createOne","ServicePackage.createMany","ServicePackage.createManyAndReturn","ServicePackage.updateOne","ServicePackage.updateMany","ServicePackage.updateManyAndReturn","ServicePackage.upsertOne","ServicePackage.deleteOne","ServicePackage.deleteMany","ServicePackage.groupBy","ServicePackage.aggregate","PackageFeature.findUnique","PackageFeature.findUniqueOrThrow","PackageFeature.findFirst","PackageFeature.findFirstOrThrow","PackageFeature.findMany","PackageFeature.createOne","PackageFeature.createMany","PackageFeature.createManyAndReturn","PackageFeature.updateOne","PackageFeature.updateMany","PackageFeature.updateManyAndReturn","PackageFeature.upsertOne","PackageFeature.deleteOne","PackageFeature.deleteMany","PackageFeature.groupBy","PackageFeature.aggregate","ServiceRelatedPost.findUnique","ServiceRelatedPost.findUniqueOrThrow","ServiceRelatedPost.findFirst","ServiceRelatedPost.findFirstOrThrow","ServiceRelatedPost.findMany","ServiceRelatedPost.createOne","ServiceRelatedPost.createMany","ServiceRelatedPost.createManyAndReturn","ServiceRelatedPost.updateOne","ServiceRelatedPost.updateMany","ServiceRelatedPost.updateManyAndReturn","ServiceRelatedPost.upsertOne","ServiceRelatedPost.deleteOne","ServiceRelatedPost.deleteMany","ServiceRelatedPost.groupBy","ServiceRelatedPost.aggregate","FeaturedItem.findUnique","FeaturedItem.findUniqueOrThrow","FeaturedItem.findFirst","FeaturedItem.findFirstOrThrow","FeaturedItem.findMany","FeaturedItem.createOne","FeaturedItem.createMany","FeaturedItem.createManyAndReturn","FeaturedItem.updateOne","FeaturedItem.updateMany","FeaturedItem.updateManyAndReturn","FeaturedItem.upsertOne","FeaturedItem.deleteOne","FeaturedItem.deleteMany","FeaturedItem.groupBy","FeaturedItem.aggregate","FeaturedItemFeature.findUnique","FeaturedItemFeature.findUniqueOrThrow","FeaturedItemFeature.findFirst","FeaturedItemFeature.findFirstOrThrow","FeaturedItemFeature.findMany","FeaturedItemFeature.createOne","FeaturedItemFeature.createMany","FeaturedItemFeature.createManyAndReturn","FeaturedItemFeature.updateOne","FeaturedItemFeature.updateMany","FeaturedItemFeature.updateManyAndReturn","FeaturedItemFeature.upsertOne","FeaturedItemFeature.deleteOne","FeaturedItemFeature.deleteMany","FeaturedItemFeature.groupBy","FeaturedItemFeature.aggregate","FeaturedItemTech.findUnique","FeaturedItemTech.findUniqueOrThrow","FeaturedItemTech.findFirst","FeaturedItemTech.findFirstOrThrow","FeaturedItemTech.findMany","FeaturedItemTech.createOne","FeaturedItemTech.createMany","FeaturedItemTech.createManyAndReturn","FeaturedItemTech.updateOne","FeaturedItemTech.updateMany","FeaturedItemTech.updateManyAndReturn","FeaturedItemTech.upsertOne","FeaturedItemTech.deleteOne","FeaturedItemTech.deleteMany","FeaturedItemTech.groupBy","FeaturedItemTech.aggregate","FeaturedItemPackage.findUnique","FeaturedItemPackage.findUniqueOrThrow","FeaturedItemPackage.findFirst","FeaturedItemPackage.findFirstOrThrow","FeaturedItemPackage.findMany","FeaturedItemPackage.createOne","FeaturedItemPackage.createMany","FeaturedItemPackage.createManyAndReturn","FeaturedItemPackage.updateOne","FeaturedItemPackage.updateMany","FeaturedItemPackage.updateManyAndReturn","FeaturedItemPackage.upsertOne","FeaturedItemPackage.deleteOne","FeaturedItemPackage.deleteMany","FeaturedItemPackage.groupBy","FeaturedItemPackage.aggregate","FeaturedItemPackageFeature.findUnique","FeaturedItemPackageFeature.findUniqueOrThrow","FeaturedItemPackageFeature.findFirst","FeaturedItemPackageFeature.findFirstOrThrow","FeaturedItemPackageFeature.findMany","FeaturedItemPackageFeature.createOne","FeaturedItemPackageFeature.createMany","FeaturedItemPackageFeature.createManyAndReturn","FeaturedItemPackageFeature.updateOne","FeaturedItemPackageFeature.updateMany","FeaturedItemPackageFeature.updateManyAndReturn","FeaturedItemPackageFeature.upsertOne","FeaturedItemPackageFeature.deleteOne","FeaturedItemPackageFeature.deleteMany","FeaturedItemPackageFeature.groupBy","FeaturedItemPackageFeature.aggregate","FeaturedItemImage.findUnique","FeaturedItemImage.findUniqueOrThrow","FeaturedItemImage.findFirst","FeaturedItemImage.findFirstOrThrow","FeaturedItemImage.findMany","FeaturedItemImage.createOne","FeaturedItemImage.createMany","FeaturedItemImage.createManyAndReturn","FeaturedItemImage.updateOne","FeaturedItemImage.updateMany","FeaturedItemImage.updateManyAndReturn","FeaturedItemImage.upsertOne","FeaturedItemImage.deleteOne","FeaturedItemImage.deleteMany","FeaturedItemImage.groupBy","FeaturedItemImage.aggregate","Session.findUnique","Session.findUniqueOrThrow","Session.findFirst","Session.findFirstOrThrow","Session.findMany","Session.createOne","Session.createMany","Session.createManyAndReturn","Session.updateOne","Session.updateMany","Session.updateManyAndReturn","Session.upsertOne","Session.deleteOne","Session.deleteMany","Session.groupBy","Session.aggregate","Account.findUnique","Account.findUniqueOrThrow","Account.findFirst","Account.findFirstOrThrow","Account.findMany","Account.createOne","Account.createMany","Account.createManyAndReturn","Account.updateOne","Account.updateMany","Account.updateManyAndReturn","Account.upsertOne","Account.deleteOne","Account.deleteMany","Account.groupBy","Account.aggregate","Verification.findUnique","Verification.findUniqueOrThrow","Verification.findFirst","Verification.findFirstOrThrow","Verification.findMany","Verification.createOne","Verification.createMany","Verification.createManyAndReturn","Verification.updateOne","Verification.updateMany","Verification.updateManyAndReturn","Verification.upsertOne","Verification.deleteOne","Verification.deleteMany","Verification.groupBy","Verification.aggregate","AND","OR","NOT","id","identifier","value","expiresAt","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","accountId","providerId","userId","accessToken","refreshToken","idToken","accessTokenExpiresAt","refreshTokenExpiresAt","scope","password","token","ipAddress","userAgent","featuredItemId","url","sortOrder","packageId","text","name","price","description","deliveryDays","revisions","slug","serviceId","title","shortDescription","longDescription","category","image","overview","challenge","solution","result","rating","reviews","isActive","href","icon","tag","projects","every","some","none","offerId","projectId","NotificationType","type","body","isRead","AttachmentType","publicId","originalName","mimeType","size","uploadedById","messageId","projectUpdateId","visitorId","adminId","PublicSenderType","senderType","senderId","receiverId","MessageSenderType","MessageConversationType","conversationType","MessageType","progress","note","issue","serviceCategory","budget","deadline","ProjectStatus","status","clientId","assignedEmployeeId","assignedByAdminId","OfferStatus","acceptedAt","rejectedAt","amount","currency","PaymentStatus","stripeSessionId","stripePaymentId","paidAt","refundedAt","email","phone","UserRole","role","bio","emailVerified","stripeCustomerId","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "tg3gAfACHhMAALcGACAVAADLBgAgFgAAzAYAIBcAAMsGACAYAADMBgAgGQAAzAYAIBoAALUGACAbAAC0BgAgHAAAtAYAIB0AALYGACAeAADNBgAgHwAAuAYAICAAAM4GACAhAADPBgAgowMAAMkGADCkAwAACQAQpQMAAMkGADCmAwEAAAABqgNAALwFACGrA0AAvAUAIcADAQDqBQAhyQMBALsFACHUAwEA6gUAIdsDIADrBQAhkAQBAAAAAZEEAQAAAAGTBAAAygaTBCKUBAEA6gUAIZUEIADrBQAhlgQBAOoFACEBAAAAAQAgGQMAAKsGACAEAACrBgAgCAAAvAYAIA0AALYGACATAAC3BgAgFAAAuAYAIKMDAADQBgAwpAMAAAMAEKUDAADQBgAwpgMBALsFACGpA0AAqgYAIaoDQAC8BQAhqwNAALwFACHKAxAA5QUAIcsDAQC7BQAhzAMCAOAFACHNAwIA8gUAIdADAQC7BQAh4wMBALsFACHyAwEAuwUAIfwDAQDqBQAhggQAANEGhwQigwQBALsFACGHBEAAqgYAIYgEQACqBgAhCwMAAOELACAEAADhCwAgCAAA4wsAIA0AANsLACATAADcCwAgFAAA3gsAIKkDAADXBgAgzQMAANcGACD8AwAA1wYAIIcEAADXBgAgiAQAANcGACAZAwAAqwYAIAQAAKsGACAIAAC8BgAgDQAAtgYAIBMAALcGACAUAAC4BgAgowMAANAGADCkAwAAAwAQpQMAANAGADCmAwEAAAABqQNAAKoGACGqA0AAvAUAIasDQAC8BQAhygMQAOUFACHLAwEAuwUAIcwDAgDgBQAhzQMCAPIFACHQAwEAuwUAIeMDAQAAAAHyAwEAuwUAIfwDAQDqBQAhggQAANEGhwQigwQBALsFACGHBEAAqgYAIYgEQACqBgAhAwAAAAMAIAEAAAQAMAIAAAUAIBoDAACrBgAgBQAArwYAIAYAAK8GACAHAACzBgAgDQAAtgYAIBEAALQGACASAAC1BgAgEwAAtwYAIBQAALgGACCjAwAAsAYAMKQDAAAHABClAwAAsAYAMKYDAQC7BQAhqgNAALwFACGrA0AAvAUAIcsDAQC7BQAh0AMBALsFACHjAwEA6gUAIeQDAQC7BQAh_gMBALsFACH_AxAAsQYAIYAEQACqBgAhggQAALIGggQigwQBALsFACGEBAEA6gUAIYUEAQDqBQAhAQAAAAcAIB4TAAC3BgAgFQAAywYAIBYAAMwGACAXAADLBgAgGAAAzAYAIBkAAMwGACAaAAC1BgAgGwAAtAYAIBwAALQGACAdAAC2BgAgHgAAzQYAIB8AALgGACAgAADOBgAgIQAAzwYAIKMDAADJBgAwpAMAAAkAEKUDAADJBgAwpgMBALsFACGqA0AAvAUAIasDQAC8BQAhwAMBAOoFACHJAwEAuwUAIdQDAQDqBQAh2wMgAOsFACGQBAEA6gUAIZEEAQDqBQAhkwQAAMoGkwQilAQBAOoFACGVBCAA6wUAIZYEAQDqBQAhAQAAAAkAIAEAAAAJACABAAAAAwAgEQgAALwGACAJAACrBgAgCgAArwYAIA0AALYGACCjAwAAxQYAMKQDAAANABClAwAAxQYAMKYDAQC7BQAhqgNAALwFACHIAwEAuwUAIeQDAQDqBQAh5gMAAMgG-wMi6AMgAOsFACH0AwAAxgb4AyL1AwEAuwUAIfYDAQDqBQAh-QMAAMcG-QMiBggAAOMLACAJAADhCwAgCgAA4QsAIA0AANsLACDkAwAA1wYAIPYDAADXBgAgEQgAALwGACAJAACrBgAgCgAArwYAIA0AALYGACCjAwAAxQYAMKQDAAANABClAwAAxQYAMKYDAQAAAAGqA0AAvAUAIcgDAQC7BQAh5AMBAOoFACHmAwAAyAb7AyLoAyAA6wUAIfQDAADGBvgDIvUDAQC7BQAh9gMBAOoFACH5AwAAxwb5AyIDAAAADQAgAQAADgAwAgAADwAgAQAAAAcAIAEAAAAJACAVBwAAswYAIAgAALwGACALAADDBgAgDwAAxAYAIBAAAK8GACCjAwAAwQYAMKQDAAATABClAwAAwQYAMKYDAQC7BQAhqgNAALwFACHFAwEAuwUAIeMDAQDqBQAh5AMBAOoFACHmAwAAwgbqAyLqAwEA6gUAIesDAQDqBQAh7AMBAOoFACHtAwIA8gUAIe4DAQDqBQAh7wMBAOoFACHwAwEA6gUAIQ4HAADiCwAgCAAA4wsAIAsAAOQLACAPAADlCwAgEAAA4QsAIOMDAADXBgAg5AMAANcGACDqAwAA1wYAIOsDAADXBgAg7AMAANcGACDtAwAA1wYAIO4DAADXBgAg7wMAANcGACDwAwAA1wYAIBUHAACzBgAgCAAAvAYAIAsAAMMGACAPAADEBgAgEAAArwYAIKMDAADBBgAwpAMAABMAEKUDAADBBgAwpgMBAAAAAaoDQAC8BQAhxQMBALsFACHjAwEA6gUAIeQDAQDqBQAh5gMAAMIG6gMi6gMBAOoFACHrAwEA6gUAIewDAQDqBQAh7QMCAPIFACHuAwEA6gUAIe8DAQDqBQAh8AMBAOoFACEDAAAAEwAgAQAAFAAwAgAAFQAgAQAAAA0AIAEAAAAHACABAAAAAwAgDQgAAMAGACAMAACrBgAgDQAAtgYAIKMDAAC_BgAwpAMAABoAEKUDAAC_BgAwpgMBALsFACGqA0AAvAUAIbkDAQC7BQAh5AMBALsFACH7AwIA8gUAIfwDAQC7BQAh_QMBAOoFACEBAAAAGgAgAwAAABMAIAEAABQAMAIAABUAIAEAAAATACABAAAACQAgAQAAABMAIAUIAADjCwAgDAAA4QsAIA0AANsLACD7AwAA1wYAIP0DAADXBgAgDQgAAMAGACAMAACrBgAgDQAAtgYAIKMDAAC_BgAwpAMAABoAEKUDAAC_BgAwpgMBAAAAAaoDQAC8BQAhuQMBALsFACHkAwEAuwUAIfsDAgDyBQAh_AMBALsFACH9AwEA6gUAIQMAAAAaACABAAAgADACAAAhACADAAAAEwAgAQAAFAAwAgAAFQAgDwcAALMGACAIAAC8BgAgDAAAqwYAIKMDAAC9BgAwpAMAACQAEKUDAAC9BgAwpgMBALsFACGqA0AAvAUAIbkDAQC7BQAh0AMBALsFACHjAwEA6gUAIeQDAQDqBQAh5gMAAL4G5gMi5wMBAOoFACHoAyAA6wUAIQYHAADiCwAgCAAA4wsAIAwAAOELACDjAwAA1wYAIOQDAADXBgAg5wMAANcGACAPBwAAswYAIAgAALwGACAMAACrBgAgowMAAL0GADCkAwAAJAAQpQMAAL0GADCmAwEAAAABqgNAALwFACG5AwEAuwUAIdADAQC7BQAh4wMBAOoFACHkAwEA6gUAIeYDAAC-BuYDIucDAQDqBQAh6AMgAOsFACEDAAAAJAAgAQAAJQAwAgAAJgAgAQAAAAMAIAEAAAAHACATAwAAqwYAIAcAALsGACAIAAC8BgAgowMAALkGADCkAwAAKgAQpQMAALkGADCmAwEAuwUAIaoDQAC8BQAhqwNAALwFACHjAwEAuwUAIeQDAQDqBQAhggQAALoGjAQigwQBALsFACGJBBAA5QUAIYoEAQC7BQAhjAQBAOoFACGNBAEA6gUAIY4EQACqBgAhjwRAAKoGACEIAwAA4QsAIAcAAOILACAIAADjCwAg5AMAANcGACCMBAAA1wYAII0EAADXBgAgjgQAANcGACCPBAAA1wYAIBMDAACrBgAgBwAAuwYAIAgAALwGACCjAwAAuQYAMKQDAAAqABClAwAAuQYAMKYDAQAAAAGqA0AAvAUAIasDQAC8BQAh4wMBALsFACHkAwEA6gUAIYIEAAC6BowEIoMEAQC7BQAhiQQQAOUFACGKBAEAuwUAIYwEAQAAAAGNBAEAAAABjgRAAKoGACGPBEAAqgYAIQMAAAAqACABAAArADACAAAsACABAAAABwAgAQAAAA0AIAEAAAAaACABAAAAEwAgAQAAACQAIAEAAAAqACADAAAAEwAgAQAAFAAwAgAAFQAgAwAAACQAIAEAACUAMAIAACYAIAMAAAAqACABAAArADACAAAsACABAAAAEwAgAQAAACQAIAEAAAAqACAOAwAA4QsAIAUAAOELACAGAADhCwAgBwAA4gsAIA0AANsLACARAADaCwAgEgAA2QsAIBMAANwLACAUAADeCwAg4wMAANcGACD_AwAA1wYAIIAEAADXBgAghAQAANcGACCFBAAA1wYAIBoDAACrBgAgBQAArwYAIAYAAK8GACAHAACzBgAgDQAAtgYAIBEAALQGACASAAC1BgAgEwAAtwYAIBQAALgGACCjAwAAsAYAMKQDAAAHABClAwAAsAYAMKYDAQAAAAGqA0AAvAUAIasDQAC8BQAhywMBALsFACHQAwEAuwUAIeMDAQAAAAHkAwEAAAAB_gMBALsFACH_AxAAsQYAIYAEQACqBgAhggQAALIGggQigwQBALsFACGEBAEA6gUAIYUEAQDqBQAhAwAAAAcAIAEAADoAMAIAADsAIAMAAAADACABAAAEADACAAAFACADAAAABwAgAQAAOgAwAgAAOwAgAwAAAAcAIAEAADoAMAIAADsAIAMAAAAaACABAAAgADACAAAhACADAAAADQAgAQAADgAwAgAADwAgAwAAAA0AIAEAAA4AMAIAAA8AIAMAAAATACABAAAUADACAAAVACADAAAAJAAgAQAAJQAwAgAAJgAgDQQAAK8GACCjAwAArQYAMKQDAABFABClAwAArQYAMKYDAQC7BQAhqgNAALwFACGrA0AAvAUAIcIDAQDqBQAhyAMBALsFACHoAyAA6wUAIfEDAQC7BQAh8gMBAOoFACH0AwAArgb0AyIDBAAA4QsAIMIDAADXBgAg8gMAANcGACANBAAArwYAIKMDAACtBgAwpAMAAEUAEKUDAACtBgAwpgMBAAAAAaoDQAC8BQAhqwNAALwFACHCAwEA6gUAIcgDAQC7BQAh6AMgAOsFACHxAwEAuwUAIfIDAQDqBQAh9AMAAK4G9AMiAwAAAEUAIAEAAEYAMAIAAEcAIAEAAAAJACADAAAAKgAgAQAAKwAwAgAALAAgDAwAAKsGACCjAwAArAYAMKQDAABLABClAwAArAYAMKYDAQC7BQAhqQNAALwFACGqA0AAvAUAIasDQAC8BQAhuQMBALsFACHBAwEAuwUAIcIDAQDqBQAhwwMBAOoFACEDDAAA4QsAIMIDAADXBgAgwwMAANcGACAMDAAAqwYAIKMDAACsBgAwpAMAAEsAEKUDAACsBgAwpgMBAAAAAakDQAC8BQAhqgNAALwFACGrA0AAvAUAIbkDAQC7BQAhwQMBAAAAAcIDAQDqBQAhwwMBAOoFACEDAAAASwAgAQAATAAwAgAATQAgEQwAAKsGACCjAwAAqQYAMKQDAABPABClAwAAqQYAMKYDAQC7BQAhqgNAALwFACGrA0AAvAUAIbcDAQC7BQAhuAMBALsFACG5AwEAuwUAIboDAQDqBQAhuwMBAOoFACG8AwEA6gUAIb0DQACqBgAhvgNAAKoGACG_AwEA6gUAIcADAQDqBQAhCAwAAOELACC6AwAA1wYAILsDAADXBgAgvAMAANcGACC9AwAA1wYAIL4DAADXBgAgvwMAANcGACDAAwAA1wYAIBEMAACrBgAgowMAAKkGADCkAwAATwAQpQMAAKkGADCmAwEAAAABqgNAALwFACGrA0AAvAUAIbcDAQC7BQAhuAMBALsFACG5AwEAuwUAIboDAQDqBQAhuwMBAOoFACG8AwEA6gUAIb0DQACqBgAhvgNAAKoGACG_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_AMBAAAAAYIEAAAAhwQCgwQBAAAAAYcEQAAAAAGIBEAAAAABAScAAJYBADABJwAAlgEAMBYDAAD3CQAgBAAA-AkAIAgAAPkJACANAAD6CQAgEwAA-wkAIBQAAPwJACCmAwEA1QYAIakDQADcBgAhqgNAANYGACGrA0AA1gYAIcoDEAD4BgAhywMBANUGACHMAwIA6QYAIc0DAgCbBwAh0AMBANUGACHjAwEA1QYAIfIDAQDVBgAh_AMBANsGACGCBAAA9gmHBCKDBAEA1QYAIYcEQADcBgAhiARAANwGACECAAAABQAgJwAAmQEAIBCmAwEA1QYAIakDQADcBgAhqgNAANYGACGrA0AA1gYAIcoDEAD4BgAhywMBANUGACHMAwIA6QYAIc0DAgCbBwAh0AMBANUGACHjAwEA1QYAIfIDAQDVBgAh_AMBANsGACGCBAAA9gmHBCKDBAEA1QYAIYcEQADcBgAhiARAANwGACECAAAAAwAgJwAAmwEAIAIAAAADACAnAACbAQAgAwAAAAUAIC4AAJQBACAvAACZAQAgAQAAAAUAIAEAAAADACAKDgAA8QkAIDQAAPQJACA1AADzCQAgRgAA8gkAIEcAAPUJACCpAwAA1wYAIM0DAADXBgAg_AMAANcGACCHBAAA1wYAIIgEAADXBgAgE6MDAACdBgAwpAMAAKIBABClAwAAnQYAMKYDAQCzBQAhqQNAAL8FACGqA0AAtAUAIasDQAC0BQAhygMQAMwFACHLAwEAswUAIcwDAgDHBQAhzQMCANMFACHQAwEAswUAIeMDAQCzBQAh8gMBALMFACH8AwEAvgUAIYIEAACeBocEIoMEAQCzBQAhhwRAAL8FACGIBEAAvwUAIQMAAAADACABAAChAQAwMwAAogEAIAMAAAADACABAAAEADACAAAFACABAAAAOwAgAQAAADsAIAMAAAAHACABAAA6ADACAAA7ACADAAAABwAgAQAAOgAwAgAAOwAgAwAAAAcAIAEAADoAMAIAADsAIBcDAADoCQAgBQAA6QkAIAYAAOoJACAHAADrCQAgDQAA7gkAIBEAAOwJACASAADtCQAgEwAA7wkAIBQAAPAJACCmAwEAAAABqgNAAAAAAasDQAAAAAHLAwEAAAAB0AMBAAAAAeMDAQAAAAHkAwEAAAAB_gMBAAAAAf8DEAAAAAGABEAAAAABggQAAACCBAKDBAEAAAABhAQBAAAAAYUEAQAAAAEBJwAAqgEAIA6mAwEAAAABqgNAAAAAAasDQAAAAAHLAwEAAAAB0AMBAAAAAeMDAQAAAAHkAwEAAAAB_gMBAAAAAf8DEAAAAAGABEAAAAABggQAAACCBAKDBAEAAAABhAQBAAAAAYUEAQAAAAEBJwAArAEAMAEnAACsAQAwAQAAAAkAIAEAAAAJACABAAAAAwAgFwMAAKEJACAFAACiCQAgBgAAowkAIAcAAKQJACANAACnCQAgEQAApQkAIBIAAKYJACATAACoCQAgFAAAqQkAIKYDAQDVBgAhqgNAANYGACGrA0AA1gYAIcsDAQDVBgAh0AMBANUGACHjAwEA2wYAIeQDAQDVBgAh_gMBANUGACH_AxAAnwkAIYAEQADcBgAhggQAAKAJggQigwQBANUGACGEBAEA2wYAIYUEAQDbBgAhAgAAADsAICcAALIBACAOpgMBANUGACGqA0AA1gYAIasDQADWBgAhywMBANUGACHQAwEA1QYAIeMDAQDbBgAh5AMBANUGACH-AwEA1QYAIf8DEACfCQAhgARAANwGACGCBAAAoAmCBCKDBAEA1QYAIYQEAQDbBgAhhQQBANsGACECAAAABwAgJwAAtAEAIAIAAAAHACAnAAC0AQAgAQAAAAkAIAEAAAAJACABAAAAAwAgAwAAADsAIC4AAKoBACAvAACyAQAgAQAAADsAIAEAAAAHACAKDgAAmgkAIDQAAJ0JACA1AACcCQAgRgAAmwkAIEcAAJ4JACDjAwAA1wYAIP8DAADXBgAggAQAANcGACCEBAAA1wYAIIUEAADXBgAgEaMDAACWBgAwpAMAAL4BABClAwAAlgYAMKYDAQCzBQAhqgNAALQFACGrA0AAtAUAIcsDAQCzBQAh0AMBALMFACHjAwEAvgUAIeQDAQCzBQAh_gMBALMFACH_AxAAlwYAIYAEQAC_BQAhggQAAJgGggQigwQBALMFACGEBAEAvgUAIYUEAQC-BQAhAwAAAAcAIAEAAL0BADAzAAC-AQAgAwAAAAcAIAEAADoAMAIAADsAIAEAAAAhACABAAAAIQAgAwAAABoAIAEAACAAMAIAACEAIAMAAAAaACABAAAgADACAAAhACADAAAAGgAgAQAAIAAwAgAAIQAgCggAAJcJACAMAACYCQAgDQAAmQkAIKYDAQAAAAGqA0AAAAABuQMBAAAAAeQDAQAAAAH7AwIAAAAB_AMBAAAAAf0DAQAAAAEBJwAAxgEAIAemAwEAAAABqgNAAAAAAbkDAQAAAAHkAwEAAAAB-wMCAAAAAfwDAQAAAAH9AwEAAAABAScAAMgBADABJwAAyAEAMAoIAACLCQAgDAAAjAkAIA0AAI0JACCmAwEA1QYAIaoDQADWBgAhuQMBANUGACHkAwEA1QYAIfsDAgCbBwAh_AMBANUGACH9AwEA2wYAIQIAAAAhACAnAADLAQAgB6YDAQDVBgAhqgNAANYGACG5AwEA1QYAIeQDAQDVBgAh-wMCAJsHACH8AwEA1QYAIf0DAQDbBgAhAgAAABoAICcAAM0BACACAAAAGgAgJwAAzQEAIAMAAAAhACAuAADGAQAgLwAAywEAIAEAAAAhACABAAAAGgAgBw4AAIYJACA0AACJCQAgNQAAiAkAIEYAAIcJACBHAACKCQAg-wMAANcGACD9AwAA1wYAIAqjAwAAlQYAMKQDAADUAQAQpQMAAJUGADCmAwEAswUAIaoDQAC0BQAhuQMBALMFACHkAwEAswUAIfsDAgDTBQAh_AMBALMFACH9AwEAvgUAIQMAAAAaACABAADTAQAwMwAA1AEAIAMAAAAaACABAAAgADACAAAhACABAAAADwAgAQAAAA8AIAMAAAANACABAAAOADACAAAPACADAAAADQAgAQAADgAwAgAADwAgAwAAAA0AIAEAAA4AMAIAAA8AIA4IAACCCQAgCQAAgwkAIAoAAIQJACANAACFCQAgpgMBAAAAAaoDQAAAAAHIAwEAAAAB5AMBAAAAAeYDAAAA-wMC6AMgAAAAAfQDAAAA-AMC9QMBAAAAAfYDAQAAAAH5AwAAAPkDAgEnAADcAQAgCqYDAQAAAAGqA0AAAAAByAMBAAAAAeQDAQAAAAHmAwAAAPsDAugDIAAAAAH0AwAAAPgDAvUDAQAAAAH2AwEAAAAB-QMAAAD5AwIBJwAA3gEAMAEnAADeAQAwAQAAAAcAIAEAAAAJACAOCAAA8ggAIAkAAPMIACAKAAD0CAAgDQAA9QgAIKYDAQDVBgAhqgNAANYGACHIAwEA1QYAIeQDAQDbBgAh5gMAAPEI-wMi6AMgAJwHACH0AwAA7wj4AyL1AwEA1QYAIfYDAQDbBgAh-QMAAPAI-QMiAgAAAA8AICcAAOMBACAKpgMBANUGACGqA0AA1gYAIcgDAQDVBgAh5AMBANsGACHmAwAA8Qj7AyLoAyAAnAcAIfQDAADvCPgDIvUDAQDVBgAh9gMBANsGACH5AwAA8Aj5AyICAAAADQAgJwAA5QEAIAIAAAANACAnAADlAQAgAQAAAAcAIAEAAAAJACADAAAADwAgLgAA3AEAIC8AAOMBACABAAAADwAgAQAAAA0AIAUOAADsCAAgNAAA7ggAIDUAAO0IACDkAwAA1wYAIPYDAADXBgAgDaMDAACLBgAwpAMAAO4BABClAwAAiwYAMKYDAQCzBQAhqgNAALQFACHIAwEAswUAIeQDAQC-BQAh5gMAAI4G-wMi6AMgANQFACH0AwAAjAb4AyL1AwEAswUAIfYDAQC-BQAh-QMAAI0G-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-BQAh7AMBAL4FACHtAwIA0wUAIe4DAQC-BQAh7wMBAL4FACHwAwEAvgUAIQMAAAATACABAAClAgAwMwAApgIAIAMAAAATACABAAAUADACAAAVACABAAAAJgAgAQAAACYAIAMAAAAkACABAAAlADACAAAmACADAAAAJAAgAQAAJQAwAgAAJgAgAwAAACQAIAEAACUAMAIAACYAIAwHAADUCAAgCAAA1QgAIAwAANMIACCmAwEAAAABqgNAAAAAAbkDAQAAAAHQAwEAAAAB4wMBAAAAAeQDAQAAAAHmAwAAAOYDAucDAQAAAAHoAyAAAAABAScAAK4CACAJpgMBAAAAAaoDQAAAAAG5AwEAAAAB0AMBAAAAAeMDAQAAAAHkAwEAAAAB5gMAAADmAwLnAwEAAAAB6AMgAAAAAQEnAACwAgAwAScAALACADABAAAAAwAgAQAAAAcAIAwHAADRCAAgCAAA0ggAIAwAANAIACCmAwEA1QYAIaoDQADWBgAhuQMBANUGACHQAwEA1QYAIeMDAQDbBgAh5AMBANsGACHmAwAAzwjmAyLnAwEA2wYAIegDIACcBwAhAgAAACYAICcAALUCACAJpgMBANUGACGqA0AA1gYAIbkDAQDVBgAh0AMBANUGACHjAwEA2wYAIeQDAQDbBgAh5gMAAM8I5gMi5wMBANsGACHoAyAAnAcAIQIAAAAkACAnAAC3AgAgAgAAACQAICcAALcCACABAAAAAwAgAQAAAAcAIAMAAAAmACAuAACuAgAgLwAAtQIAIAEAAAAmACABAAAAJAAgBg4AAMwIACA0AADOCAAgNQAAzQgAIOMDAADXBgAg5AMAANcGACDnAwAA1wYAIAyjAwAA_wUAMKQDAADAAgAQpQMAAP8FADCmAwEAswUAIaoDQAC0BQAhuQMBALMFACHQAwEAswUAIeMDAQC-BQAh5AMBAL4FACHmAwAAgAbmAyLnAwEAvgUAIegDIADUBQAhAwAAACQAIAEAAL8CADAzAADAAgAgAwAAACQAIAEAACUAMAIAACYAIBS7AQAA7AUAILwBAADtBQAgvgEAAO4FACDCAQAA7wUAIKMDAADpBQAwpAMAANoCABClAwAA6QUAMKYDAQAAAAGqA0AAvAUAIasDQAC8BQAhxgMCAOAFACHLAwEAuwUAIc4DAQAAAAHQAwEAuwUAIdIDAQDqBQAh1AMBAOoFACHbAyAA6wUAId0DAQDqBQAh3gMBAOoFACHfAwEA6gUAIQEAAADDAgAgCLoBAAD7BQAgowMAAP4FADCkAwAAxQIAEKUDAAD-BQAwpgMBALsFACHGAwIA4AUAIcgDAQC7BQAhzwMBALsFACEBugEAAMUIACAIugEAAPsFACCjAwAA_gUAMKQDAADFAgAQpQMAAP4FADCmAwEAAAABxgMCAOAFACHIAwEAuwUAIc8DAQC7BQAhAwAAAMUCACABAADGAgAwAgAAxwIAIAy6AQAA-wUAIKMDAAD9BQAwpAMAAMkCABClAwAA_QUAMKYDAQC7BQAhxgMCAOAFACHLAwEAuwUAIc8DAQC7BQAh0AMBALsFACHTAwEAuwUAIdQDAQC7BQAh3AMBALsFACEBugEAAMUIACAMugEAAPsFACCjAwAA_QUAMKQDAADJAgAQpQMAAP0FADCmAwEAAAABxgMCAOAFACHLAwEAuwUAIc8DAQC7BQAh0AMBALsFACHTAwEAuwUAIdQDAQC7BQAh3AMBALsFACEDAAAAyQIAIAEAAMoCADACAADLAgAgDboBAAD7BQAguwEAAPwFACCjAwAA-gUAMKQDAADNAgAQpQMAAPoFADCmAwEAuwUAIcYDAgDgBQAhyQMBALsFACHKAxAA5QUAIcsDAQC7BQAhzAMCAOAFACHNAwIA4AUAIc8DAQC7BQAhAroBAADFCAAguwEAAMsIACANugEAAPsFACC7AQAA_AUAIKMDAAD6BQAwpAMAAM0CABClAwAA-gUAMKYDAQAAAAHGAwIA4AUAIckDAQC7BQAhygMQAOUFACHLAwEAuwUAIcwDAgDgBQAhzQMCAOAFACHPAwEAuwUAIQMAAADNAgAgAQAAzgIAMAIAAM8CACAIvQEAAPkFACCjAwAA-AUAMKQDAADRAgAQpQMAAPgFADCmAwEAuwUAIcYDAgDgBQAhxwMBALsFACHIAwEAuwUAIQG9AQAAyggAIAi9AQAA-QUAIKMDAAD4BQAwpAMAANECABClAwAA-AUAMKYDAQAAAAHGAwIA4AUAIccDAQC7BQAhyAMBALsFACEDAAAA0QIAIAEAANICADACAADTAgAgAQAAANECACAbugEAAPMFACC7AQAA9AUAIL4BAAD2BQAgwAEAAPUFACDBAQAA9wUAIKMDAADwBQAwpAMAANYCABClAwAA8AUAMKYDAQC7BQAhqgNAALwFACGrA0AAvAUAIcYDAgDgBQAhywMBALsFACHOAwEAuwUAIc8DAQDqBQAh0AMBALsFACHRAwEAuwUAIdIDAQDqBQAh0wMBALsFACHUAwEAuwUAIdUDAQC7BQAh1gMBALsFACHXAwEAuwUAIdgDAQC7BQAh2QMIAPEFACHaAwIA8gUAIdsDIADrBQAhCboBAADFCAAguwEAAMYIACC-AQAAyAgAIMABAADHCAAgwQEAAMkIACDPAwAA1wYAINIDAADXBgAg2QMAANcGACDaAwAA1wYAIBu6AQAA8wUAILsBAAD0BQAgvgEAAPYFACDAAQAA9QUAIMEBAAD3BQAgowMAAPAFADCkAwAA1gIAEKUDAADwBQAwpgMBAAAAAaoDQAC8BQAhqwNAALwFACHGAwIA4AUAIcsDAQC7BQAhzgMBAAAAAc8DAQDqBQAh0AMBALsFACHRAwEAuwUAIdIDAQDqBQAh0wMBALsFACHUAwEAuwUAIdUDAQC7BQAh1gMBALsFACHXAwEAuwUAIdgDAQC7BQAh2QMIAPEFACHaAwIA8gUAIdsDIADrBQAhAwAAANYCACABAADXAgAwAgAA2AIAIBS7AQAA7AUAILwBAADtBQAgvgEAAO4FACDCAQAA7wUAIKMDAADpBQAwpAMAANoCABClAwAA6QUAMKYDAQC7BQAhqgNAALwFACGrA0AAvAUAIcYDAgDgBQAhywMBALsFACHOAwEAuwUAIdADAQC7BQAh0gMBAOoFACHUAwEA6gUAIdsDIADrBQAh3QMBAOoFACHeAwEA6gUAId8DAQDqBQAhAQAAANoCACAIvwEAAOEFACCjAwAA6AUAMKQDAADcAgAQpQMAAOgFADCmAwEAuwUAIcQDAQC7BQAhxgMCAOAFACHIAwEAuwUAIQG_AQAAwggAIAi_AQAA4QUAIKMDAADoBQAwpAMAANwCABClAwAA6AUAMKYDAQAAAAHEAwEAuwUAIcYDAgDgBQAhyAMBALsFACEDAAAA3AIAIAEAAN0CADACAADeAgAgB78BAADhBQAgowMAAOcFADCkAwAA4AIAEKUDAADnBQAwpgMBALsFACHEAwEAuwUAIckDAQC7BQAhAb8BAADCCAAgB78BAADhBQAgowMAAOcFADCkAwAA4AIAEKUDAADnBQAwpgMBAAAAAcQDAQC7BQAhyQMBALsFACEDAAAA4AIAIAEAAOECADACAADiAgAgDbsBAADmBQAgvwEAAOEFACCjAwAA5AUAMKQDAADkAgAQpQMAAOQFADCmAwEAuwUAIcQDAQC7BQAhxgMCAOAFACHJAwEAuwUAIcoDEADlBQAhywMBALsFACHMAwIA4AUAIc0DAgDgBQAhArsBAADECAAgvwEAAMIIACANuwEAAOYFACC_AQAA4QUAIKMDAADkBQAwpAMAAOQCABClAwAA5AUAMKYDAQAAAAHEAwEAuwUAIcYDAgDgBQAhyQMBALsFACHKAxAA5QUAIcsDAQC7BQAhzAMCAOAFACHNAwIA4AUAIQMAAADkAgAgAQAA5QIAMAIAAOYCACAIvQEAAOMFACCjAwAA4gUAMKQDAADoAgAQpQMAAOIFADCmAwEAuwUAIcYDAgDgBQAhxwMBALsFACHIAwEAuwUAIQG9AQAAwwgAIAi9AQAA4wUAIKMDAADiBQAwpAMAAOgCABClAwAA4gUAMKYDAQAAAAHGAwIA4AUAIccDAQC7BQAhyAMBALsFACEDAAAA6AIAIAEAAOkCADACAADqAgAgAQAAAOgCACAIvwEAAOEFACCjAwAA3wUAMKQDAADtAgAQpQMAAN8FADCmAwEAuwUAIcQDAQC7BQAhxQMBALsFACHGAwIA4AUAIQG_AQAAwggAIAi_AQAA4QUAIKMDAADfBQAwpAMAAO0CABClAwAA3wUAMKYDAQAAAAHEAwEAuwUAIcUDAQC7BQAhxgMCAOAFACEDAAAA7QIAIAEAAO4CADACAADvAgAgAQAAANwCACABAAAA4AIAIAEAAADkAgAgAQAAAO0CACABAAAAxQIAIAEAAADJAgAgAQAAAM0CACABAAAA1gIAIAEAAADDAgAgCbsBAAC-CAAgvAEAAL8IACC-AQAAwAgAIMIBAADBCAAg0gMAANcGACDUAwAA1wYAIN0DAADXBgAg3gMAANcGACDfAwAA1wYAIAMAAADaAgAgAQAA-gIAMAIAAMMCACADAAAA2gIAIAEAAPoCADACAADDAgAgAwAAANoCACABAAD6AgAwAgAAwwIAIBG7AQAAuggAILwBAAC7CAAgvgEAALwIACDCAQAAvQgAIKYDAQAAAAGqA0AAAAABqwNAAAAAAcYDAgAAAAHLAwEAAAABzgMBAAAAAdADAQAAAAHSAwEAAAAB1AMBAAAAAdsDIAAAAAHdAwEAAAAB3gMBAAAAAd8DAQAAAAEBJwAA_gIAIA2mAwEAAAABqgNAAAAAAasDQAAAAAHGAwIAAAABywMBAAAAAc4DAQAAAAHQAwEAAAAB0gMBAAAAAdQDAQAAAAHbAyAAAAAB3QMBAAAAAd4DAQAAAAHfAwEAAAABAScAAIADADABJwAAgAMAMBG7AQAAhggAILwBAACHCAAgvgEAAIgIACDCAQAAiQgAIKYDAQDVBgAhqgNAANYGACGrA0AA1gYAIcYDAgDpBgAhywMBANUGACHOAwEA1QYAIdADAQDVBgAh0gMBANsGACHUAwEA2wYAIdsDIACcBwAh3QMBANsGACHeAwEA2wYAId8DAQDbBgAhAgAAAMMCACAnAACDAwAgDaYDAQDVBgAhqgNAANYGACGrA0AA1gYAIcYDAgDpBgAhywMBANUGACHOAwEA1QYAIdADAQDVBgAh0gMBANsGACHUAwEA2wYAIdsDIACcBwAh3QMBANsGACHeAwEA2wYAId8DAQDbBgAhAgAAANoCACAnAACFAwAgAgAAANoCACAnAACFAwAgAwAAAMMCACAuAAD-AgAgLwAAgwMAIAEAAADDAgAgAQAAANoCACAKDgAAgQgAIDQAAIQIACA1AACDCAAgRgAAgggAIEcAAIUIACDSAwAA1wYAINQDAADXBgAg3QMAANcGACDeAwAA1wYAIN8DAADXBgAgEKMDAADeBQAwpAMAAIwDABClAwAA3gUAMKYDAQCzBQAhqgNAALQFACGrA0AAtAUAIcYDAgDHBQAhywMBALMFACHOAwEAswUAIdADAQCzBQAh0gMBAL4FACHUAwEAvgUAIdsDIADUBQAh3QMBAL4FACHeAwEAvgUAId8DAQC-BQAhAwAAANoCACABAACLAwAwMwAAjAMAIAMAAADaAgAgAQAA-gIAMAIAAMMCACABAAAAxwIAIAEAAADHAgAgAwAAAMUCACABAADGAgAwAgAAxwIAIAMAAADFAgAgAQAAxgIAMAIAAMcCACADAAAAxQIAIAEAAMYCADACAADHAgAgBboBAACACAAgpgMBAAAAAcYDAgAAAAHIAwEAAAABzwMBAAAAAQEnAACUAwAgBKYDAQAAAAHGAwIAAAAByAMBAAAAAc8DAQAAAAEBJwAAlgMAMAEnAACWAwAwBboBAAD_BwAgpgMBANUGACHGAwIA6QYAIcgDAQDVBgAhzwMBANUGACECAAAAxwIAICcAAJkDACAEpgMBANUGACHGAwIA6QYAIcgDAQDVBgAhzwMBANUGACECAAAAxQIAICcAAJsDACACAAAAxQIAICcAAJsDACADAAAAxwIAIC4AAJQDACAvAACZAwAgAQAAAMcCACABAAAAxQIAIAUOAAD6BwAgNAAA_QcAIDUAAPwHACBGAAD7BwAgRwAA_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_AMAEKUDAADRBQAwpgMBALMFACGqA0AAtAUAIasDQAC0BQAhxgMCAMcFACHLAwEAswUAIc4DAQCzBQAhzwMBAL4FACHQAwEAswUAIdEDAQCzBQAh0gMBAL4FACHTAwEAswUAIdQDAQCzBQAh1QMBALMFACHWAwEAswUAIdcDAQCzBQAh2AMBALMFACHZAwgA0gUAIdoDAgDTBQAh2wMgANQFACEDAAAA1gIAIAEAAPsDADAzAAD8AwAgAwAAANYCACABAADXAgAwAgAA2AIAIAEAAADeAgAgAQAAAN4CACADAAAA3AIAIAEAAN0CADACAADeAgAgAwAAANwCACABAADdAgAwAgAA3gIAIAMAAADcAgAgAQAA3QIAMAIAAN4CACAFvwEAAJQHACCmAwEAAAABxAMBAAAAAcYDAgAAAAHIAwEAAAABAScAAIQEACAEpgMBAAAAAcQDAQAAAAHGAwIAAAAByAMBAAAAAQEnAACGBAAwAScAAIYEADAFvwEAAJMHACCmAwEA1QYAIcQDAQDVBgAhxgMCAOkGACHIAwEA1QYAIQIAAADeAgAgJwAAiQQAIASmAwEA1QYAIcQDAQDVBgAhxgMCAOkGACHIAwEA1QYAIQIAAADcAgAgJwAAiwQAIAIAAADcAgAgJwAAiwQAIAMAAADeAgAgLgAAhAQAIC8AAIkEACABAAAA3gIAIAEAAADcAgAgBQ4AAI4HACA0AACRBwAgNQAAkAcAIEYAAI8HACBHAACSBwAgB6MDAADQBQAwpAMAAJIEABClAwAA0AUAMKYDAQCzBQAhxAMBALMFACHGAwIAxwUAIcgDAQCzBQAhAwAAANwCACABAACRBAAwMwAAkgQAIAMAAADcAgAgAQAA3QIAMAIAAN4CACABAAAA4gIAIAEAAADiAgAgAwAAAOACACABAADhAgAwAgAA4gIAIAMAAADgAgAgAQAA4QIAMAIAAOICACADAAAA4AIAIAEAAOECADACAADiAgAgBL8BAACNBwAgpgMBAAAAAcQDAQAAAAHJAwEAAAABAScAAJoEACADpgMBAAAAAcQDAQAAAAHJAwEAAAABAScAAJwEADABJwAAnAQAMAS_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_BAAwMwAAgAUAIAMAAABLACABAABMADACAABNACABAAAAUQAgAQAAAFEAIAMAAABPACABAABQADACAABRACADAAAATwAgAQAAUAAwAgAAUQAgAwAAAE8AIAEAAFAAMAIAAFEAIA4MAADeBgAgpgMBAAAAAaoDQAAAAAGrA0AAAAABtwMBAAAAAbgDAQAAAAG5AwEAAAABugMBAAAAAbsDAQAAAAG8AwEAAAABvQNAAAAAAb4DQAAAAAG_AwEAAAABwAMBAAAAAQEnAACIBQAgDaYDAQAAAAGqA0AAAAABqwNAAAAAAbcDAQAAAAG4AwEAAAABuQMBAAAAAboDAQAAAAG7AwEAAAABvAMBAAAAAb0DQAAAAAG-A0AAAAABvwMBAAAAAcADAQAAAAEBJwAAigUAMAEnAACKBQAwDgwAAN0GACCmAwEA1QYAIaoDQADWBgAhqwNAANYGACG3AwEA1QYAIbgDAQDVBgAhuQMBANUGACG6AwEA2wYAIbsDAQDbBgAhvAMBANsGACG9A0AA3AYAIb4DQADcBgAhvwMBANsGACHAAwEA2wYAIQIAAABRACAnAACNBQAgDaYDAQDVBgAhqgNAANYGACGrA0AA1gYAIbcDAQDVBgAhuAMBANUGACG5AwEA1QYAIboDAQDbBgAhuwMBANsGACG8AwEA2wYAIb0DQADcBgAhvgNAANwGACG_AwEA2wYAIcADAQDbBgAhAgAAAE8AICcAAI8FACACAAAATwAgJwAAjwUAIAMAAABRACAuAACIBQAgLwAAjQUAIAEAAABRACABAAAATwAgCg4AANgGACA0AADaBgAgNQAA2QYAILoDAADXBgAguwMAANcGACC8AwAA1wYAIL0DAADXBgAgvgMAANcGACC_AwAA1wYAIMADAADXBgAgEKMDAAC9BQAwpAMAAJYFABClAwAAvQUAMKYDAQCzBQAhqgNAALQFACGrA0AAtAUAIbcDAQCzBQAhuAMBALMFACG5AwEAswUAIboDAQC-BQAhuwMBAL4FACG8AwEAvgUAIb0DQAC_BQAhvgNAAL8FACG_AwEAvgUAIcADAQC-BQAhAwAAAE8AIAEAAJUFADAzAACWBQAgAwAAAE8AIAEAAFAAMAIAAFEAIAmjAwAAugUAMKQDAACcBQAQpQMAALoFADCmAwEAAAABpwMBALsFACGoAwEAuwUAIakDQAC8BQAhqgNAALwFACGrA0AAvAUAIQEAAACZBQAgAQAAAJkFACAJowMAALoFADCkAwAAnAUAEKUDAAC6BQAwpgMBALsFACGnAwEAuwUAIagDAQC7BQAhqQNAALwFACGqA0AAvAUAIasDQAC8BQAhAAMAAACcBQAgAQAAnQUAMAIAAJkFACADAAAAnAUAIAEAAJ0FADACAACZBQAgAwAAAJwFACABAACdBQAwAgAAmQUAIAamAwEAAAABpwMBAAAAAagDAQAAAAGpA0AAAAABqgNAAAAAAasDQAAAAAEBJwAAoQUAIAamAwEAAAABpwMBAAAAAagDAQAAAAGpA0AAAAABqgNAAAAAAasDQAAAAAEBJwAAowUAMAEnAACjBQAwBqYDAQDVBgAhpwMBANUGACGoAwEA1QYAIakDQADWBgAhqgNAANYGACGrA0AA1gYAIQIAAACZBQAgJwAApgUAIAamAwEA1QYAIacDAQDVBgAhqAMBANUGACGpA0AA1gYAIaoDQADWBgAhqwNAANYGACECAAAAnAUAICcAAKgFACACAAAAnAUAICcAAKgFACADAAAAmQUAIC4AAKEFACAvAACmBQAgAQAAAJkFACABAAAAnAUAIAMOAADSBgAgNAAA1AYAIDUAANMGACAJowMAALIFADCkAwAArwUAEKUDAACyBQAwpgMBALMFACGnAwEAswUAIagDAQCzBQAhqQNAALQFACGqA0AAtAUAIasDQAC0BQAhAwAAAJwFACABAACuBQAwMwAArwUAIAMAAACcBQAgAQAAnQUAMAIAAJkFACAJowMAALIFADCkAwAArwUAEKUDAACyBQAwpgMBALMFACGnAwEAswUAIagDAQCzBQAhqQNAALQFACGqA0AAtAUAIasDQAC0BQAhDg4AALYFACA0AAC5BQAgNQAAuQUAIKwDAQAAAAGtAwEAAAAErgMBAAAABK8DAQAAAAGwAwEAAAABsQMBAAAAAbIDAQAAAAGzAwEAuAUAIbQDAQAAAAG1AwEAAAABtgMBAAAAAQsOAAC2BQAgNAAAtwUAIDUAALcFACCsA0AAAAABrQNAAAAABK4DQAAAAASvA0AAAAABsANAAAAAAbEDQAAAAAGyA0AAAAABswNAALUFACELDgAAtgUAIDQAALcFACA1AAC3BQAgrANAAAAAAa0DQAAAAASuA0AAAAAErwNAAAAAAbADQAAAAAGxA0AAAAABsgNAAAAAAbMDQAC1BQAhCKwDAgAAAAGtAwIAAAAErgMCAAAABK8DAgAAAAGwAwIAAAABsQMCAAAAAbIDAgAAAAGzAwIAtgUAIQisA0AAAAABrQNAAAAABK4DQAAAAASvA0AAAAABsANAAAAAAbEDQAAAAAGyA0AAAAABswNAALcFACEODgAAtgUAIDQAALkFACA1AAC5BQAgrAMBAAAAAa0DAQAAAASuAwEAAAAErwMBAAAAAbADAQAAAAGxAwEAAAABsgMBAAAAAbMDAQC4BQAhtAMBAAAAAbUDAQAAAAG2AwEAAAABC6wDAQAAAAGtAwEAAAAErgMBAAAABK8DAQAAAAGwAwEAAAABsQMBAAAAAbIDAQAAAAGzAwEAuQUAIbQDAQAAAAG1AwEAAAABtgMBAAAAAQmjAwAAugUAMKQDAACcBQAQpQMAALoFADCmAwEAuwUAIacDAQC7BQAhqAMBALsFACGpA0AAvAUAIaoDQAC8BQAhqwNAALwFACELrAMBAAAAAa0DAQAAAASuAwEAAAAErwMBAAAAAbADAQAAAAGxAwEAAAABsgMBAAAAAbMDAQC5BQAhtAMBAAAAAbUDAQAAAAG2AwEAAAABCKwDQAAAAAGtA0AAAAAErgNAAAAABK8DQAAAAAGwA0AAAAABsQNAAAAAAbIDQAAAAAGzA0AAtwUAIRCjAwAAvQUAMKQDAACWBQAQpQMAAL0FADCmAwEAswUAIaoDQAC0BQAhqwNAALQFACG3AwEAswUAIbgDAQCzBQAhuQMBALMFACG6AwEAvgUAIbsDAQC-BQAhvAMBAL4FACG9A0AAvwUAIb4DQAC_BQAhvwMBAL4FACHAAwEAvgUAIQ4OAADBBQAgNAAAxAUAIDUAAMQFACCsAwEAAAABrQMBAAAABa4DAQAAAAWvAwEAAAABsAMBAAAAAbEDAQAAAAGyAwEAAAABswMBAMMFACG0AwEAAAABtQMBAAAAAbYDAQAAAAELDgAAwQUAIDQAAMIFACA1AADCBQAgrANAAAAAAa0DQAAAAAWuA0AAAAAFrwNAAAAAAbADQAAAAAGxA0AAAAABsgNAAAAAAbMDQADABQAhCw4AAMEFACA0AADCBQAgNQAAwgUAIKwDQAAAAAGtA0AAAAAFrgNAAAAABa8DQAAAAAGwA0AAAAABsQNAAAAAAbIDQAAAAAGzA0AAwAUAIQisAwIAAAABrQMCAAAABa4DAgAAAAWvAwIAAAABsAMCAAAAAbEDAgAAAAGyAwIAAAABswMCAMEFACEIrANAAAAAAa0DQAAAAAWuA0AAAAAFrwNAAAAAAbADQAAAAAGxA0AAAAABsgNAAAAAAbMDQADCBQAhDg4AAMEFACA0AADEBQAgNQAAxAUAIKwDAQAAAAGtAwEAAAAFrgMBAAAABa8DAQAAAAGwAwEAAAABsQMBAAAAAbIDAQAAAAGzAwEAwwUAIbQDAQAAAAG1AwEAAAABtgMBAAAAAQusAwEAAAABrQMBAAAABa4DAQAAAAWvAwEAAAABsAMBAAAAAbEDAQAAAAGyAwEAAAABswMBAMQFACG0AwEAAAABtQMBAAAAAbYDAQAAAAELowMAAMUFADCkAwAAgAUAEKUDAADFBQAwpgMBALMFACGpA0AAtAUAIaoDQAC0BQAhqwNAALQFACG5AwEAswUAIcEDAQCzBQAhwgMBAL4FACHDAwEAvgUAIQejAwAAxgUAMKQDAADqBAAQpQMAAMYFADCmAwEAswUAIcQDAQCzBQAhxQMBALMFACHGAwIAxwUAIQ0OAAC2BQAgNAAAtgUAIDUAALYFACBGAADJBQAgRwAAtgUAIKwDAgAAAAGtAwIAAAAErgMCAAAABK8DAgAAAAGwAwIAAAABsQMCAAAAAbIDAgAAAAGzAwIAyAUAIQ0OAAC2BQAgNAAAtgUAIDUAALYFACBGAADJBQAgRwAAtgUAIKwDAgAAAAGtAwIAAAAErgMCAAAABK8DAgAAAAGwAwIAAAABsQMCAAAAAbIDAgAAAAGzAwIAyAUAIQisAwgAAAABrQMIAAAABK4DCAAAAASvAwgAAAABsAMIAAAAAbEDCAAAAAGyAwgAAAABswMIAMkFACEHowMAAMoFADCkAwAA1AQAEKUDAADKBQAwpgMBALMFACHGAwIAxwUAIccDAQCzBQAhyAMBALMFACELowMAAMsFADCkAwAAvgQAEKUDAADLBQAwpgMBALMFACHEAwEAswUAIcYDAgDHBQAhyQMBALMFACHKAxAAzAUAIcsDAQCzBQAhzAMCAMcFACHNAwIAxwUAIQ0OAAC2BQAgNAAAzgUAIDUAAM4FACBGAADOBQAgRwAAzgUAIKwDEAAAAAGtAxAAAAAErgMQAAAABK8DEAAAAAGwAxAAAAABsQMQAAAAAbIDEAAAAAGzAxAAzQUAIQ0OAAC2BQAgNAAAzgUAIDUAAM4FACBGAADOBQAgRwAAzgUAIKwDEAAAAAGtAxAAAAAErgMQAAAABK8DEAAAAAGwAxAAAAABsQMQAAAAAbIDEAAAAAGzAxAAzQUAIQisAxAAAAABrQMQAAAABK4DEAAAAASvAxAAAAABsAMQAAAAAbEDEAAAAAGyAxAAAAABswMQAM4FACEGowMAAM8FADCkAwAAqAQAEKUDAADPBQAwpgMBALMFACHEAwEAswUAIckDAQCzBQAhB6MDAADQBQAwpAMAAJIEABClAwAA0AUAMKYDAQCzBQAhxAMBALMFACHGAwIAxwUAIcgDAQCzBQAhFqMDAADRBQAwpAMAAPwDABClAwAA0QUAMKYDAQCzBQAhqgNAALQFACGrA0AAtAUAIcYDAgDHBQAhywMBALMFACHOAwEAswUAIc8DAQC-BQAh0AMBALMFACHRAwEAswUAIdIDAQC-BQAh0wMBALMFACHUAwEAswUAIdUDAQCzBQAh1gMBALMFACHXAwEAswUAIdgDAQCzBQAh2QMIANIFACHaAwIA0wUAIdsDIADUBQAhDQ4AAMEFACA0AADYBQAgNQAA2AUAIEYAANgFACBHAADYBQAgrAMIAAAAAa0DCAAAAAWuAwgAAAAFrwMIAAAAAbADCAAAAAGxAwgAAAABsgMIAAAAAbMDCADZBQAhDQ4AAMEFACA0AADBBQAgNQAAwQUAIEYAANgFACBHAADBBQAgrAMCAAAAAa0DAgAAAAWuAwIAAAAFrwMCAAAAAbADAgAAAAGxAwIAAAABsgMCAAAAAbMDAgDXBQAhBQ4AALYFACA0AADWBQAgNQAA1gUAIKwDIAAAAAGzAyAA1QUAIQUOAAC2BQAgNAAA1gUAIDUAANYFACCsAyAAAAABswMgANUFACECrAMgAAAAAbMDIADWBQAhDQ4AAMEFACA0AADBBQAgNQAAwQUAIEYAANgFACBHAADBBQAgrAMCAAAAAa0DAgAAAAWuAwIAAAAFrwMCAAAAAbADAgAAAAGxAwIAAAABsgMCAAAAAbMDAgDXBQAhCKwDCAAAAAGtAwgAAAAFrgMIAAAABa8DCAAAAAGwAwgAAAABsQMIAAAAAbIDCAAAAAGzAwgA2AUAIQ0OAADBBQAgNAAA2AUAIDUAANgFACBGAADYBQAgRwAA2AUAIKwDCAAAAAGtAwgAAAAFrgMIAAAABa8DCAAAAAGwAwgAAAABsQMIAAAAAbIDCAAAAAGzAwgA2QUAIQujAwAA2gUAMKQDAADkAwAQpQMAANoFADCmAwEAswUAIcYDAgDHBQAhywMBALMFACHPAwEAswUAIdADAQCzBQAh0wMBALMFACHUAwEAswUAIdwDAQCzBQAhB6MDAADbBQAwpAMAAM4DABClAwAA2wUAMKYDAQCzBQAhxgMCAMcFACHHAwEAswUAIcgDAQCzBQAhC6MDAADcBQAwpAMAALgDABClAwAA3AUAMKYDAQCzBQAhxgMCAMcFACHJAwEAswUAIcoDEADMBQAhywMBALMFACHMAwIAxwUAIc0DAgDHBQAhzwMBALMFACEHowMAAN0FADCkAwAAogMAEKUDAADdBQAwpgMBALMFACHGAwIAxwUAIcgDAQCzBQAhzwMBALMFACEQowMAAN4FADCkAwAAjAMAEKUDAADeBQAwpgMBALMFACGqA0AAtAUAIasDQAC0BQAhxgMCAMcFACHLAwEAswUAIc4DAQCzBQAh0AMBALMFACHSAwEAvgUAIdQDAQC-BQAh2wMgANQFACHdAwEAvgUAId4DAQC-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-6AQAA-wUAILsBAAD8BQAgowMAAPoFADCkAwAAzQIAEKUDAAD6BQAwpgMBALsFACHGAwIA4AUAIckDAQC7BQAhygMQAOUFACHLAwEAuwUAIcwDAgDgBQAhzQMCAOAFACHPAwEAuwUAIZcEAADNAgAgmAQAAM0CACANugEAAPsFACC7AQAA_AUAIKMDAAD6BQAwpAMAAM0CABClAwAA-gUAMKYDAQC7BQAhxgMCAOAFACHJAwEAuwUAIcoDEADlBQAhywMBALsFACHMAwIA4AUAIc0DAgDgBQAhzwMBALsFACEWuwEAAOwFACC8AQAA7QUAIL4BAADuBQAgwgEAAO8FACCjAwAA6QUAMKQDAADaAgAQpQMAAOkFADCmAwEAuwUAIaoDQAC8BQAhqwNAALwFACHGAwIA4AUAIcsDAQC7BQAhzgMBALsFACHQAwEAuwUAIdIDAQDqBQAh1AMBAOoFACHbAyAA6wUAId0DAQDqBQAh3gMBAOoFACHfAwEA6gUAIZcEAADaAgAgmAQAANoCACAD4AMAANECACDhAwAA0QIAIOIDAADRAgAgDLoBAAD7BQAgowMAAP0FADCkAwAAyQIAEKUDAAD9BQAwpgMBALsFACHGAwIA4AUAIcsDAQC7BQAhzwMBALsFACHQAwEAuwUAIdMDAQC7BQAh1AMBALsFACHcAwEAuwUAIQi6AQAA-wUAIKMDAAD-BQAwpAMAAMUCABClAwAA_gUAMKYDAQC7BQAhxgMCAOAFACHIAwEAuwUAIc8DAQC7BQAhDKMDAAD_BQAwpAMAAMACABClAwAA_wUAMKYDAQCzBQAhqgNAALQFACG5AwEAswUAIdADAQCzBQAh4wMBAL4FACHkAwEAvgUAIeYDAACABuYDIucDAQC-BQAh6AMgANQFACEHDgAAtgUAIDQAAIIGACA1AACCBgAgrAMAAADmAwKtAwAAAOYDCK4DAAAA5gMIswMAAIEG5gMiBw4AALYFACA0AACCBgAgNQAAggYAIKwDAAAA5gMCrQMAAADmAwiuAwAAAOYDCLMDAACBBuYDIgSsAwAAAOYDAq0DAAAA5gMIrgMAAADmAwizAwAAggbmAyIQowMAAIMGADCkAwAApgIAEKUDAACDBgAwpgMBALMFACGqA0AAtAUAIcUDAQCzBQAh4wMBAL4FACHkAwEAvgUAIeYDAACEBuoDIuoDAQC-BQAh6wMBAL4FACHsAwEAvgUAIe0DAgDTBQAh7gMBAL4FACHvAwEAvgUAIfADAQC-BQAhBw4AALYFACA0AACGBgAgNQAAhgYAIKwDAAAA6gMCrQMAAADqAwiuAwAAAOoDCLMDAACFBuoDIgcOAAC2BQAgNAAAhgYAIDUAAIYGACCsAwAAAOoDAq0DAAAA6gMIrgMAAADqAwizAwAAhQbqAyIErAMAAADqAwKtAwAAAOoDCK4DAAAA6gMIswMAAIYG6gMiDKMDAACHBgAwpAMAAIYCABClAwAAhwYAMKYDAQCzBQAhqgNAALQFACGrA0AAtAUAIcIDAQC-BQAhyAMBALMFACHoAyAA1AUAIfEDAQCzBQAh8gMBAL4FACH0AwAAiAb0AyIHDgAAtgUAIDQAAIoGACA1AACKBgAgrAMAAAD0AwKtAwAAAPQDCK4DAAAA9AMIswMAAIkG9AMiBw4AALYFACA0AACKBgAgNQAAigYAIKwDAAAA9AMCrQMAAAD0AwiuAwAAAPQDCLMDAACJBvQDIgSsAwAAAPQDAq0DAAAA9AMIrgMAAAD0AwizAwAAigb0AyINowMAAIsGADCkAwAA7gEAEKUDAACLBgAwpgMBALMFACGqA0AAtAUAIcgDAQCzBQAh5AMBAL4FACHmAwAAjgb7AyLoAyAA1AUAIfQDAACMBvgDIvUDAQCzBQAh9gMBAL4FACH5AwAAjQb5AyIHDgAAtgUAIDQAAJQGACA1AACUBgAgrAMAAAD4AwKtAwAAAPgDCK4DAAAA-AMIswMAAJMG-AMiBw4AALYFACA0AACSBgAgNQAAkgYAIKwDAAAA-QMCrQMAAAD5AwiuAwAAAPkDCLMDAACRBvkDIgcOAAC2BQAgNAAAkAYAIDUAAJAGACCsAwAAAPsDAq0DAAAA-wMIrgMAAAD7AwizAwAAjwb7AyIHDgAAtgUAIDQAAJAGACA1AACQBgAgrAMAAAD7AwKtAwAAAPsDCK4DAAAA-wMIswMAAI8G-wMiBKwDAAAA-wMCrQMAAAD7AwiuAwAAAPsDCLMDAACQBvsDIgcOAAC2BQAgNAAAkgYAIDUAAJIGACCsAwAAAPkDAq0DAAAA-QMIrgMAAAD5AwizAwAAkQb5AyIErAMAAAD5AwKtAwAAAPkDCK4DAAAA-QMIswMAAJIG-QMiBw4AALYFACA0AACUBgAgNQAAlAYAIKwDAAAA-AMCrQMAAAD4AwiuAwAAAPgDCLMDAACTBvgDIgSsAwAAAPgDAq0DAAAA-AMIrgMAAAD4AwizAwAAlAb4AyIKowMAAJUGADCkAwAA1AEAEKUDAACVBgAwpgMBALMFACGqA0AAtAUAIbkDAQCzBQAh5AMBALMFACH7AwIA0wUAIfwDAQCzBQAh_QMBAL4FACERowMAAJYGADCkAwAAvgEAEKUDAACWBgAwpgMBALMFACGqA0AAtAUAIasDQAC0BQAhywMBALMFACHQAwEAswUAIeMDAQC-BQAh5AMBALMFACH-AwEAswUAIf8DEACXBgAhgARAAL8FACGCBAAAmAaCBCKDBAEAswUAIYQEAQC-BQAhhQQBAL4FACENDgAAwQUAIDQAAJwGACA1AACcBgAgRgAAnAYAIEcAAJwGACCsAxAAAAABrQMQAAAABa4DEAAAAAWvAxAAAAABsAMQAAAAAbEDEAAAAAGyAxAAAAABswMQAJsGACEHDgAAtgUAIDQAAJoGACA1AACaBgAgrAMAAACCBAKtAwAAAIIECK4DAAAAggQIswMAAJkGggQiBw4AALYFACA0AACaBgAgNQAAmgYAIKwDAAAAggQCrQMAAACCBAiuAwAAAIIECLMDAACZBoIEIgSsAwAAAIIEAq0DAAAAggQIrgMAAACCBAizAwAAmgaCBCINDgAAwQUAIDQAAJwGACA1AACcBgAgRgAAnAYAIEcAAJwGACCsAxAAAAABrQMQAAAABa4DEAAAAAWvAxAAAAABsAMQAAAAAbEDEAAAAAGyAxAAAAABswMQAJsGACEIrAMQAAAAAa0DEAAAAAWuAxAAAAAFrwMQAAAAAbADEAAAAAGxAxAAAAABsgMQAAAAAbMDEACcBgAhE6MDAACdBgAwpAMAAKIBABClAwAAnQYAMKYDAQCzBQAhqQNAAL8FACGqA0AAtAUAIasDQAC0BQAhygMQAMwFACHLAwEAswUAIcwDAgDHBQAhzQMCANMFACHQAwEAswUAIeMDAQCzBQAh8gMBALMFACH8AwEAvgUAIYIEAACeBocEIoMEAQCzBQAhhwRAAL8FACGIBEAAvwUAIQcOAAC2BQAgNAAAoAYAIDUAAKAGACCsAwAAAIcEAq0DAAAAhwQIrgMAAACHBAizAwAAnwaHBCIHDgAAtgUAIDQAAKAGACA1AACgBgAgrAMAAACHBAKtAwAAAIcECK4DAAAAhwQIswMAAJ8GhwQiBKwDAAAAhwQCrQMAAACHBAiuAwAAAIcECLMDAACgBocEIhCjAwAAoQYAMKQDAACMAQAQpQMAAKEGADCmAwEAswUAIaoDQAC0BQAhqwNAALQFACHjAwEAswUAIeQDAQC-BQAhggQAAKIGjAQigwQBALMFACGJBBAAzAUAIYoEAQCzBQAhjAQBAL4FACGNBAEAvgUAIY4EQAC_BQAhjwRAAL8FACEHDgAAtgUAIDQAAKQGACA1AACkBgAgrAMAAACMBAKtAwAAAIwECK4DAAAAjAQIswMAAKMGjAQiBw4AALYFACA0AACkBgAgNQAApAYAIKwDAAAAjAQCrQMAAACMBAiuAwAAAIwECLMDAACjBowEIgSsAwAAAIwEAq0DAAAAjAQIrgMAAACMBAizAwAApAaMBCIQowMAAKUGADCkAwAAdAAQpQMAAKUGADCmAwEAswUAIaoDQAC0BQAhqwNAALQFACHAAwEAvgUAIckDAQCzBQAh1AMBAL4FACHbAyAA1AUAIZAEAQC-BQAhkQQBAL4FACGTBAAApgaTBCKUBAEAvgUAIZUEIADUBQAhlgQBAL4FACEHDgAAtgUAIDQAAKgGACA1AACoBgAgrAMAAACTBAKtAwAAAJMECK4DAAAAkwQIswMAAKcGkwQiBw4AALYFACA0AACoBgAgNQAAqAYAIKwDAAAAkwQCrQMAAACTBAiuAwAAAJMECLMDAACnBpMEIgSsAwAAAJMEAq0DAAAAkwQIrgMAAACTBAizAwAAqAaTBCIRDAAAqwYAIKMDAACpBgAwpAMAAE8AEKUDAACpBgAwpgMBALsFACGqA0AAvAUAIasDQAC8BQAhtwMBALsFACG4AwEAuwUAIbkDAQC7BQAhugMBAOoFACG7AwEA6gUAIbwDAQDqBQAhvQNAAKoGACG-A0AAqgYAIb8DAQDqBQAhwAMBAOoFACEIrANAAAAAAa0DQAAAAAWuA0AAAAAFrwNAAAAAAbADQAAAAAGxA0AAAAABsgNAAAAAAbMDQADCBQAhIBMAALcGACAVAADLBgAgFgAAzAYAIBcAAMsGACAYAADMBgAgGQAAzAYAIBoAALUGACAbAAC0BgAgHAAAtAYAIB0AALYGACAeAADNBgAgHwAAuAYAICAAAM4GACAhAADPBgAgowMAAMkGADCkAwAACQAQpQMAAMkGADCmAwEAuwUAIaoDQAC8BQAhqwNAALwFACHAAwEA6gUAIckDAQC7BQAh1AMBAOoFACHbAyAA6wUAIZAEAQDqBQAhkQQBAOoFACGTBAAAygaTBCKUBAEA6gUAIZUEIADrBQAhlgQBAOoFACGXBAAACQAgmAQAAAkAIAwMAACrBgAgowMAAKwGADCkAwAASwAQpQMAAKwGADCmAwEAuwUAIakDQAC8BQAhqgNAALwFACGrA0AAvAUAIbkDAQC7BQAhwQMBALsFACHCAwEA6gUAIcMDAQDqBQAhDQQAAK8GACCjAwAArQYAMKQDAABFABClAwAArQYAMKYDAQC7BQAhqgNAALwFACGrA0AAvAUAIcIDAQDqBQAhyAMBALsFACHoAyAA6wUAIfEDAQC7BQAh8gMBAOoFACH0AwAArgb0AyIErAMAAAD0AwKtAwAAAPQDCK4DAAAA9AMIswMAAIoG9AMiIBMAALcGACAVAADLBgAgFgAAzAYAIBcAAMsGACAYAADMBgAgGQAAzAYAIBoAALUGACAbAAC0BgAgHAAAtAYAIB0AALYGACAeAADNBgAgHwAAuAYAICAAAM4GACAhAADPBgAgowMAAMkGADCkAwAACQAQpQMAAMkGADCmAwEAuwUAIaoDQAC8BQAhqwNAALwFACHAAwEA6gUAIckDAQC7BQAh1AMBAOoFACHbAyAA6wUAIZAEAQDqBQAhkQQBAOoFACGTBAAAygaTBCKUBAEA6gUAIZUEIADrBQAhlgQBAOoFACGXBAAACQAgmAQAAAkAIBoDAACrBgAgBQAArwYAIAYAAK8GACAHAACzBgAgDQAAtgYAIBEAALQGACASAAC1BgAgEwAAtwYAIBQAALgGACCjAwAAsAYAMKQDAAAHABClAwAAsAYAMKYDAQC7BQAhqgNAALwFACGrA0AAvAUAIcsDAQC7BQAh0AMBALsFACHjAwEA6gUAIeQDAQC7BQAh_gMBALsFACH_AxAAsQYAIYAEQACqBgAhggQAALIGggQigwQBALsFACGEBAEA6gUAIYUEAQDqBQAhCKwDEAAAAAGtAxAAAAAFrgMQAAAABa8DEAAAAAGwAxAAAAABsQMQAAAAAbIDEAAAAAGzAxAAnAYAIQSsAwAAAIIEAq0DAAAAggQIrgMAAACCBAizAwAAmgaCBCIbAwAAqwYAIAQAAKsGACAIAAC8BgAgDQAAtgYAIBMAALcGACAUAAC4BgAgowMAANAGADCkAwAAAwAQpQMAANAGADCmAwEAuwUAIakDQACqBgAhqgNAALwFACGrA0AAvAUAIcoDEADlBQAhywMBALsFACHMAwIA4AUAIc0DAgDyBQAh0AMBALsFACHjAwEAuwUAIfIDAQC7BQAh_AMBAOoFACGCBAAA0QaHBCKDBAEAuwUAIYcEQACqBgAhiARAAKoGACGXBAAAAwAgmAQAAAMAIAPgAwAADQAg4QMAAA0AIOIDAAANACAD4AMAABoAIOEDAAAaACDiAwAAGgAgA-ADAAATACDhAwAAEwAg4gMAABMAIAPgAwAAJAAg4QMAACQAIOIDAAAkACAD4AMAACoAIOEDAAAqACDiAwAAKgAgEwMAAKsGACAHAAC7BgAgCAAAvAYAIKMDAAC5BgAwpAMAACoAEKUDAAC5BgAwpgMBALsFACGqA0AAvAUAIasDQAC8BQAh4wMBALsFACHkAwEA6gUAIYIEAAC6BowEIoMEAQC7BQAhiQQQAOUFACGKBAEAuwUAIYwEAQDqBQAhjQQBAOoFACGOBEAAqgYAIY8EQACqBgAhBKwDAAAAjAQCrQMAAACMBAiuAwAAAIwECLMDAACkBowEIhsDAACrBgAgBAAAqwYAIAgAALwGACANAAC2BgAgEwAAtwYAIBQAALgGACCjAwAA0AYAMKQDAAADABClAwAA0AYAMKYDAQC7BQAhqQNAAKoGACGqA0AAvAUAIasDQAC8BQAhygMQAOUFACHLAwEAuwUAIcwDAgDgBQAhzQMCAPIFACHQAwEAuwUAIeMDAQC7BQAh8gMBALsFACH8AwEA6gUAIYIEAADRBocEIoMEAQC7BQAhhwRAAKoGACGIBEAAqgYAIZcEAAADACCYBAAAAwAgHAMAAKsGACAFAACvBgAgBgAArwYAIAcAALMGACANAAC2BgAgEQAAtAYAIBIAALUGACATAAC3BgAgFAAAuAYAIKMDAACwBgAwpAMAAAcAEKUDAACwBgAwpgMBALsFACGqA0AAvAUAIasDQAC8BQAhywMBALsFACHQAwEAuwUAIeMDAQDqBQAh5AMBALsFACH-AwEAuwUAIf8DEACxBgAhgARAAKoGACGCBAAAsgaCBCKDBAEAuwUAIYQEAQDqBQAhhQQBAOoFACGXBAAABwAgmAQAAAcAIA8HAACzBgAgCAAAvAYAIAwAAKsGACCjAwAAvQYAMKQDAAAkABClAwAAvQYAMKYDAQC7BQAhqgNAALwFACG5AwEAuwUAIdADAQC7BQAh4wMBAOoFACHkAwEA6gUAIeYDAAC-BuYDIucDAQDqBQAh6AMgAOsFACEErAMAAADmAwKtAwAAAOYDCK4DAAAA5gMIswMAAIIG5gMiDQgAAMAGACAMAACrBgAgDQAAtgYAIKMDAAC_BgAwpAMAABoAEKUDAAC_BgAwpgMBALsFACGqA0AAvAUAIbkDAQC7BQAh5AMBALsFACH7AwIA8gUAIfwDAQC7BQAh_QMBAOoFACEcAwAAqwYAIAUAAK8GACAGAACvBgAgBwAAswYAIA0AALYGACARAAC0BgAgEgAAtQYAIBMAALcGACAUAAC4BgAgowMAALAGADCkAwAABwAQpQMAALAGADCmAwEAuwUAIaoDQAC8BQAhqwNAALwFACHLAwEAuwUAIdADAQC7BQAh4wMBAOoFACHkAwEAuwUAIf4DAQC7BQAh_wMQALEGACGABEAAqgYAIYIEAACyBoIEIoMEAQC7BQAhhAQBAOoFACGFBAEA6gUAIZcEAAAHACCYBAAABwAgFQcAALMGACAIAAC8BgAgCwAAwwYAIA8AAMQGACAQAACvBgAgowMAAMEGADCkAwAAEwAQpQMAAMEGADCmAwEAuwUAIaoDQAC8BQAhxQMBALsFACHjAwEA6gUAIeQDAQDqBQAh5gMAAMIG6gMi6gMBAOoFACHrAwEA6gUAIewDAQDqBQAh7QMCAPIFACHuAwEA6gUAIe8DAQDqBQAh8AMBAOoFACEErAMAAADqAwKtAwAAAOoDCK4DAAAA6gMIswMAAIYG6gMiEwgAALwGACAJAACrBgAgCgAArwYAIA0AALYGACCjAwAAxQYAMKQDAAANABClAwAAxQYAMKYDAQC7BQAhqgNAALwFACHIAwEAuwUAIeQDAQDqBQAh5gMAAMgG-wMi6AMgAOsFACH0AwAAxgb4AyL1AwEAuwUAIfYDAQDqBQAh-QMAAMcG-QMilwQAAA0AIJgEAAANACAPCAAAwAYAIAwAAKsGACANAAC2BgAgowMAAL8GADCkAwAAGgAQpQMAAL8GADCmAwEAuwUAIaoDQAC8BQAhuQMBALsFACHkAwEAuwUAIfsDAgDyBQAh_AMBALsFACH9AwEA6gUAIZcEAAAaACCYBAAAGgAgEQgAALwGACAJAACrBgAgCgAArwYAIA0AALYGACCjAwAAxQYAMKQDAAANABClAwAAxQYAMKYDAQC7BQAhqgNAALwFACHIAwEAuwUAIeQDAQDqBQAh5gMAAMgG-wMi6AMgAOsFACH0AwAAxgb4AyL1AwEAuwUAIfYDAQDqBQAh-QMAAMcG-QMiBKwDAAAA-AMCrQMAAAD4AwiuAwAAAPgDCLMDAACUBvgDIgSsAwAAAPkDAq0DAAAA-QMIrgMAAAD5AwizAwAAkgb5AyIErAMAAAD7AwKtAwAAAPsDCK4DAAAA-wMIswMAAJAG-wMiHhMAALcGACAVAADLBgAgFgAAzAYAIBcAAMsGACAYAADMBgAgGQAAzAYAIBoAALUGACAbAAC0BgAgHAAAtAYAIB0AALYGACAeAADNBgAgHwAAuAYAICAAAM4GACAhAADPBgAgowMAAMkGADCkAwAACQAQpQMAAMkGADCmAwEAuwUAIaoDQAC8BQAhqwNAALwFACHAAwEA6gUAIckDAQC7BQAh1AMBAOoFACHbAyAA6wUAIZAEAQDqBQAhkQQBAOoFACGTBAAAygaTBCKUBAEA6gUAIZUEIADrBQAhlgQBAOoFACEErAMAAACTBAKtAwAAAJMECK4DAAAAkwQIswMAAKgGkwQiA-ADAAADACDhAwAAAwAg4gMAAAMAIAPgAwAABwAg4QMAAAcAIOIDAAAHACAD4AMAAEUAIOEDAABFACDiAwAARQAgA-ADAABLACDhAwAASwAg4gMAAEsAIAPgAwAATwAg4QMAAE8AIOIDAABPACAZAwAAqwYAIAQAAKsGACAIAAC8BgAgDQAAtgYAIBMAALcGACAUAAC4BgAgowMAANAGADCkAwAAAwAQpQMAANAGADCmAwEAuwUAIakDQACqBgAhqgNAALwFACGrA0AAvAUAIcoDEADlBQAhywMBALsFACHMAwIA4AUAIc0DAgDyBQAh0AMBALsFACHjAwEAuwUAIfIDAQC7BQAh_AMBAOoFACGCBAAA0QaHBCKDBAEAuwUAIYcEQACqBgAhiARAAKoGACEErAMAAACHBAKtAwAAAIcECK4DAAAAhwQIswMAAKAGhwQiAAAAAZwEAQAAAAEBnARAAAAAAQAAAAABnAQBAAAAAQGcBEAAAAABBS4AALINACAvAAC1DQAgmQQAALMNACCaBAAAtA0AIJ8EAAABACADLgAAsg0AIJkEAACzDQAgnwQAAAEAIAAAAAUuAACtDQAgLwAAsA0AIJkEAACuDQAgmgQAAK8NACCfBAAAAQAgAy4AAK0NACCZBAAArg0AIJ8EAAABACAAAAAAAAWcBAIAAAABogQCAAAAAaMEAgAAAAGkBAIAAAABpQQCAAAAAQUuAACoDQAgLwAAqw0AIJkEAACpDQAgmgQAAKoNACCfBAAA2AIAIAMuAACoDQAgmQQAAKkNACCfBAAA2AIAIAAAAAAABS4AAKMNACAvAACmDQAgmQQAAKQNACCaBAAApQ0AIJ8EAADmAgAgAy4AAKMNACCZBAAApA0AIJ8EAADmAgAgAAAAAAAFnAQQAAAAAaIEEAAAAAGjBBAAAAABpAQQAAAAAaUEEAAAAAEFLgAAnQ0AIC8AAKENACCZBAAAng0AIJoEAACgDQAgnwQAANgCACALLgAA-wYAMC8AAIAHADCZBAAA_AYAMJoEAAD9BgAwmwQAAP4GACCcBAAA_wYAMJ0EAAD_BgAwngQAAP8GADCfBAAA_wYAMKAEAACBBwAwoQQAAIIHADADpgMBAAAAAcYDAgAAAAHIAwEAAAABAgAAAOoCACAuAACGBwAgAwAAAOoCACAuAACGBwAgLwAAhQcAIAEnAACfDQAwCL0BAADjBQAgowMAAOIFADCkAwAA6AIAEKUDAADiBQAwpgMBAAAAAcYDAgDgBQAhxwMBALsFACHIAwEAuwUAIQIAAADqAgAgJwAAhQcAIAIAAACDBwAgJwAAhAcAIAejAwAAggcAMKQDAACDBwAQpQMAAIIHADCmAwEAuwUAIcYDAgDgBQAhxwMBALsFACHIAwEAuwUAIQejAwAAggcAMKQDAACDBwAQpQMAAIIHADCmAwEAuwUAIcYDAgDgBQAhxwMBALsFACHIAwEAuwUAIQOmAwEA1QYAIcYDAgDpBgAhyAMBANUGACEDpgMBANUGACHGAwIA6QYAIcgDAQDVBgAhA6YDAQAAAAHGAwIAAAAByAMBAAAAAQMuAACdDQAgmQQAAJ4NACCfBAAA2AIAIAQuAAD7BgAwmQQAAPwGADCbBAAA_gYAIJ8EAAD_BgAwAAAABS4AAJgNACAvAACbDQAgmQQAAJkNACCaBAAAmg0AIJ8EAADYAgAgAy4AAJgNACCZBAAAmQ0AIJ8EAADYAgAgAAAAAAAFLgAAkw0AIC8AAJYNACCZBAAAlA0AIJoEAACVDQAgnwQAANgCACADLgAAkw0AIJkEAACUDQAgnwQAANgCACAAAAAAAAWcBAgAAAABogQIAAAAAaMECAAAAAGkBAgAAAABpQQIAAAAAQWcBAIAAAABogQCAAAAAaMEAgAAAAGkBAIAAAABpQQCAAAAAQGcBCAAAAABBy4AAIoNACAvAACRDQAgmQQAAIsNACCaBAAAkA0AIJ0EAADaAgAgngQAANoCACCfBAAAwwIAIAsuAADGBwAwLwAAywcAMJkEAADHBwAwmgQAAMgHADCbBAAAyQcAIJwEAADKBwAwnQQAAMoHADCeBAAAygcAMJ8EAADKBwAwoAQAAMwHADChBAAAzQcAMAsuAAC6BwAwLwAAvwcAMJkEAAC7BwAwmgQAALwHADCbBAAAvQcAIJwEAAC-BwAwnQQAAL4HADCeBAAAvgcAMJ8EAAC-BwAwoAQAAMAHADChBAAAwQcAMAsuAACuBwAwLwAAswcAMJkEAACvBwAwmgQAALAHADCbBAAAsQcAIJwEAACyBwAwnQQAALIHADCeBAAAsgcAMJ8EAACyBwAwoAQAALQHADChBAAAtQcAMAsuAACiBwAwLwAApwcAMJkEAACjBwAwmgQAAKQHADCbBAAApQcAIJwEAACmBwAwnQQAAKYHADCeBAAApgcAMJ8EAACmBwAwoAQAAKgHADChBAAAqQcAMAOmAwEAAAABxQMBAAAAAcYDAgAAAAECAAAA7wIAIC4AAK0HACADAAAA7wIAIC4AAK0HACAvAACsBwAgAScAAI8NADAIvwEAAOEFACCjAwAA3wUAMKQDAADtAgAQpQMAAN8FADCmAwEAAAABxAMBALsFACHFAwEAuwUAIcYDAgDgBQAhAgAAAO8CACAnAACsBwAgAgAAAKoHACAnAACrBwAgB6MDAACpBwAwpAMAAKoHABClAwAAqQcAMKYDAQC7BQAhxAMBALsFACHFAwEAuwUAIcYDAgDgBQAhB6MDAACpBwAwpAMAAKoHABClAwAAqQcAMKYDAQC7BQAhxAMBALsFACHFAwEAuwUAIcYDAgDgBQAhA6YDAQDVBgAhxQMBANUGACHGAwIA6QYAIQOmAwEA1QYAIcUDAQDVBgAhxgMCAOkGACEDpgMBAAAAAcUDAQAAAAHGAwIAAAABCLsBAACIBwAgpgMBAAAAAcYDAgAAAAHJAwEAAAABygMQAAAAAcsDAQAAAAHMAwIAAAABzQMCAAAAAQIAAADmAgAgLgAAuQcAIAMAAADmAgAgLgAAuQcAIC8AALgHACABJwAAjg0AMA27AQAA5gUAIL8BAADhBQAgowMAAOQFADCkAwAA5AIAEKUDAADkBQAwpgMBAAAAAcQDAQC7BQAhxgMCAOAFACHJAwEAuwUAIcoDEADlBQAhywMBALsFACHMAwIA4AUAIc0DAgDgBQAhAgAAAOYCACAnAAC4BwAgAgAAALYHACAnAAC3BwAgC6MDAAC1BwAwpAMAALYHABClAwAAtQcAMKYDAQC7BQAhxAMBALsFACHGAwIA4AUAIckDAQC7BQAhygMQAOUFACHLAwEAuwUAIcwDAgDgBQAhzQMCAOAFACELowMAALUHADCkAwAAtgcAEKUDAAC1BwAwpgMBALsFACHEAwEAuwUAIcYDAgDgBQAhyQMBALsFACHKAxAA5QUAIcsDAQC7BQAhzAMCAOAFACHNAwIA4AUAIQemAwEA1QYAIcYDAgDpBgAhyQMBANUGACHKAxAA-AYAIcsDAQDVBgAhzAMCAOkGACHNAwIA6QYAIQi7AQAA-gYAIKYDAQDVBgAhxgMCAOkGACHJAwEA1QYAIcoDEAD4BgAhywMBANUGACHMAwIA6QYAIc0DAgDpBgAhCLsBAACIBwAgpgMBAAAAAcYDAgAAAAHJAwEAAAABygMQAAAAAcsDAQAAAAHMAwIAAAABzQMCAAAAAQKmAwEAAAAByQMBAAAAAQIAAADiAgAgLgAAxQcAIAMAAADiAgAgLgAAxQcAIC8AAMQHACABJwAAjQ0AMAe_AQAA4QUAIKMDAADnBQAwpAMAAOACABClAwAA5wUAMKYDAQAAAAHEAwEAuwUAIckDAQC7BQAhAgAAAOICACAnAADEBwAgAgAAAMIHACAnAADDBwAgBqMDAADBBwAwpAMAAMIHABClAwAAwQcAMKYDAQC7BQAhxAMBALsFACHJAwEAuwUAIQajAwAAwQcAMKQDAADCBwAQpQMAAMEHADCmAwEAuwUAIcQDAQC7BQAhyQMBALsFACECpgMBANUGACHJAwEA1QYAIQKmAwEA1QYAIckDAQDVBgAhAqYDAQAAAAHJAwEAAAABA6YDAQAAAAHGAwIAAAAByAMBAAAAAQIAAADeAgAgLgAA0QcAIAMAAADeAgAgLgAA0QcAIC8AANAHACABJwAAjA0AMAi_AQAA4QUAIKMDAADoBQAwpAMAANwCABClAwAA6AUAMKYDAQAAAAHEAwEAuwUAIcYDAgDgBQAhyAMBALsFACECAAAA3gIAICcAANAHACACAAAAzgcAICcAAM8HACAHowMAAM0HADCkAwAAzgcAEKUDAADNBwAwpgMBALsFACHEAwEAuwUAIcYDAgDgBQAhyAMBALsFACEHowMAAM0HADCkAwAAzgcAEKUDAADNBwAwpgMBALsFACHEAwEAuwUAIcYDAgDgBQAhyAMBALsFACEDpgMBANUGACHGAwIA6QYAIcgDAQDVBgAhA6YDAQDVBgAhxgMCAOkGACHIAwEA1QYAIQOmAwEAAAABxgMCAAAAAcgDAQAAAAEDLgAAig0AIJkEAACLDQAgnwQAAMMCACAELgAAxgcAMJkEAADHBwAwmwQAAMkHACCfBAAAygcAMAQuAAC6BwAwmQQAALsHADCbBAAAvQcAIJ8EAAC-BwAwBC4AAK4HADCZBAAArwcAMJsEAACxBwAgnwQAALIHADAELgAAogcAMJkEAACjBwAwmwQAAKUHACCfBAAApgcAMAAAAAAABS4AAIUNACAvAACIDQAgmQQAAIYNACCaBAAAhw0AIJ8EAADDAgAgAy4AAIUNACCZBAAAhg0AIJ8EAADDAgAgAAAAAAAFLgAAgA0AIC8AAIMNACCZBAAAgQ0AIJoEAACCDQAgnwQAAM8CACADLgAAgA0AIJkEAACBDQAgnwQAAM8CACAAAAAAAAUuAAD6DAAgLwAA_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-wUAIKMDAAD-BQAwpAMAAMUCABClAwAA_gUAMKYDAQAAAAHGAwIA4AUAIcgDAQC7BQAhzwMBALsFACECAAAAxwIAICcAALgIACACAAAAtggAICcAALcIACAHowMAALUIADCkAwAAtggAEKUDAAC1CAAwpgMBALsFACHGAwIA4AUAIcgDAQC7BQAhzwMBALsFACEHowMAALUIADCkAwAAtggAEKUDAAC1CAAwpgMBALsFACHGAwIA4AUAIcgDAQC7BQAhzwMBALsFACEDpgMBANUGACHGAwIA6QYAIcgDAQDVBgAhA6YDAQDVBgAhxgMCAOkGACHIAwEA1QYAIQOmAwEAAAABxgMCAAAAAcgDAQAAAAEELgAArggAMJkEAACvCAAwmwQAALEIACCfBAAAsggAMAQuAACiCAAwmQQAAKMIADCbBAAApQgAIJ8EAACmCAAwBC4AAJYIADCZBAAAlwgAMJsEAACZCAAgnwQAAJoIADAELgAAiggAMJkEAACLCAAwmwQAAI0IACCfBAAAjggAMAAAAAAJugEAAMUIACC7AQAAxggAIL4BAADICAAgwAEAAMcIACDBAQAAyQgAIM8DAADXBgAg0gMAANcGACDZAwAA1wYAINoDAADXBgAgArsBAADECAAgvwEAAMIIACAACbsBAAC-CAAgvAEAAL8IACC-AQAAwAgAIMIBAADBCAAg0gMAANcGACDUAwAA1wYAIN0DAADXBgAg3gMAANcGACDfAwAA1wYAIAAAAAACugEAAMUIACC7AQAAywgAIAAAAAABnAQAAADmAwIFLgAA5gwAIC8AAO8MACCZBAAA5wwAIJoEAADuDAAgnwQAAAEAIAcuAADkDAAgLwAA7AwAIJkEAADlDAAgmgQAAOsMACCdBAAAAwAgngQAAAMAIJ8EAAAFACAHLgAA4gwAIC8AAOkMACCZBAAA4wwAIJoEAADoDAAgnQQAAAcAIJ4EAAAHACCfBAAAOwAgAy4AAOYMACCZBAAA5wwAIJ8EAAABACADLgAA5AwAIJkEAADlDAAgnwQAAAUAIAMuAADiDAAgmQQAAOMMACCfBAAAOwAgAAAAAAABnAQAAADqAwIHLgAA0QwAIC8AAOAMACCZBAAA0gwAIJoEAADfDAAgnQQAAA0AIJ4EAAANACCfBAAADwAgBy4AAM8MACAvAADdDAAgmQQAANAMACCaBAAA3AwAIJ0EAAAHACCeBAAABwAgnwQAADsAIAcuAADNDAAgLwAA2gwAIJkEAADODAAgmgQAANkMACCdBAAAAwAgngQAAAMAIJ8EAAAFACAHLgAAywwAIC8AANcMACCZBAAAzAwAIJoEAADWDAAgnQQAABoAIJ4EAAAaACCfBAAAIQAgBy4AAMkMACAvAADUDAAgmQQAAMoMACCaBAAA0wwAIJ0EAAAJACCeBAAACQAgnwQAAAEAIAMuAADRDAAgmQQAANIMACCfBAAADwAgAy4AAM8MACCZBAAA0AwAIJ8EAAA7ACADLgAAzQwAIJkEAADODAAgnwQAAAUAIAMuAADLDAAgmQQAAMwMACCfBAAAIQAgAy4AAMkMACCZBAAAygwAIJ8EAAABACAAAAABnAQAAAD0AwIHLgAAxAwAIC8AAMcMACCZBAAAxQwAIJoEAADGDAAgnQQAAAkAIJ4EAAAJACCfBAAAAQAgAy4AAMQMACCZBAAAxQwAIJ8EAAABACAAAAABnAQAAAD4AwIBnAQAAAD5AwIBnAQAAAD7AwIHLgAAuAwAIC8AAMIMACCZBAAAuQwAIJoEAADBDAAgnQQAAAcAIJ4EAAAHACCfBAAAOwAgBS4AALYMACAvAAC_DAAgmQQAALcMACCaBAAAvgwAIJ8EAAABACAHLgAAtAwAIC8AALwMACCZBAAAtQwAIJoEAAC7DAAgnQQAAAkAIJ4EAAAJACCfBAAAAQAgCy4AAPYIADAvAAD7CAAwmQQAAPcIADCaBAAA-AgAMJsEAAD5CAAgnAQAAPoIADCdBAAA-ggAMJ4EAAD6CAAwnwQAAPoIADCgBAAA_AgAMKEEAAD9CAAwEAcAAOMIACAIAADiCAAgDwAA5AgAIBAAAOUIACCmAwEAAAABqgNAAAAAAcUDAQAAAAHjAwEAAAAB5AMBAAAAAeYDAAAA6gMC6gMBAAAAAesDAQAAAAHsAwEAAAAB7QMCAAAAAe4DAQAAAAHwAwEAAAABAgAAABUAIC4AAIEJACADAAAAFQAgLgAAgQkAIC8AAIAJACABJwAAugwAMBUHAACzBgAgCAAAvAYAIAsAAMMGACAPAADEBgAgEAAArwYAIKMDAADBBgAwpAMAABMAEKUDAADBBgAwpgMBAAAAAaoDQAC8BQAhxQMBALsFACHjAwEA6gUAIeQDAQDqBQAh5gMAAMIG6gMi6gMBAOoFACHrAwEA6gUAIewDAQDqBQAh7QMCAPIFACHuAwEA6gUAIe8DAQDqBQAh8AMBAOoFACECAAAAFQAgJwAAgAkAIAIAAAD-CAAgJwAA_wgAIBCjAwAA_QgAMKQDAAD-CAAQpQMAAP0IADCmAwEAuwUAIaoDQAC8BQAhxQMBALsFACHjAwEA6gUAIeQDAQDqBQAh5gMAAMIG6gMi6gMBAOoFACHrAwEA6gUAIewDAQDqBQAh7QMCAPIFACHuAwEA6gUAIe8DAQDqBQAh8AMBAOoFACEQowMAAP0IADCkAwAA_ggAEKUDAAD9CAAwpgMBALsFACGqA0AAvAUAIcUDAQC7BQAh4wMBAOoFACHkAwEA6gUAIeYDAADCBuoDIuoDAQDqBQAh6wMBAOoFACHsAwEA6gUAIe0DAgDyBQAh7gMBAOoFACHvAwEA6gUAIfADAQDqBQAhDKYDAQDVBgAhqgNAANYGACHFAwEA1QYAIeMDAQDbBgAh5AMBANsGACHmAwAA2wjqAyLqAwEA2wYAIesDAQDbBgAh7AMBANsGACHtAwIAmwcAIe4DAQDbBgAh8AMBANsGACEQBwAA3ggAIAgAAN0IACAPAADfCAAgEAAA4AgAIKYDAQDVBgAhqgNAANYGACHFAwEA1QYAIeMDAQDbBgAh5AMBANsGACHmAwAA2wjqAyLqAwEA2wYAIesDAQDbBgAh7AMBANsGACHtAwIAmwcAIe4DAQDbBgAh8AMBANsGACEQBwAA4wgAIAgAAOIIACAPAADkCAAgEAAA5QgAIKYDAQAAAAGqA0AAAAABxQMBAAAAAeMDAQAAAAHkAwEAAAAB5gMAAADqAwLqAwEAAAAB6wMBAAAAAewDAQAAAAHtAwIAAAAB7gMBAAAAAfADAQAAAAEDLgAAuAwAIJkEAAC5DAAgnwQAADsAIAMuAAC2DAAgmQQAALcMACCfBAAAAQAgAy4AALQMACCZBAAAtQwAIJ8EAAABACAELgAA9ggAMJkEAAD3CAAwmwQAAPkIACCfBAAA-ggAMAAAAAAABS4AAKsMACAvAACyDAAgmQQAAKwMACCaBAAAsQwAIJ8EAAA7ACAFLgAAqQwAIC8AAK8MACCZBAAAqgwAIJoEAACuDAAgnwQAAAEAIAsuAACOCQAwLwAAkgkAMJkEAACPCQAwmgQAAJAJADCbBAAAkQkAIJwEAAD6CAAwnQQAAPoIADCeBAAA-ggAMJ8EAAD6CAAwoAQAAJMJADChBAAA_QgAMBAHAADjCAAgCAAA4ggAIAsAAOEIACAQAADlCAAgpgMBAAAAAaoDQAAAAAHFAwEAAAAB4wMBAAAAAeQDAQAAAAHmAwAAAOoDAuoDAQAAAAHrAwEAAAAB7AMBAAAAAe0DAgAAAAHuAwEAAAAB7wMBAAAAAQIAAAAVACAuAACWCQAgAwAAABUAIC4AAJYJACAvAACVCQAgAScAAK0MADACAAAAFQAgJwAAlQkAIAIAAAD-CAAgJwAAlAkAIAymAwEA1QYAIaoDQADWBgAhxQMBANUGACHjAwEA2wYAIeQDAQDbBgAh5gMAANsI6gMi6gMBANsGACHrAwEA2wYAIewDAQDbBgAh7QMCAJsHACHuAwEA2wYAIe8DAQDbBgAhEAcAAN4IACAIAADdCAAgCwAA3AgAIBAAAOAIACCmAwEA1QYAIaoDQADWBgAhxQMBANUGACHjAwEA2wYAIeQDAQDbBgAh5gMAANsI6gMi6gMBANsGACHrAwEA2wYAIewDAQDbBgAh7QMCAJsHACHuAwEA2wYAIe8DAQDbBgAhEAcAAOMIACAIAADiCAAgCwAA4QgAIBAAAOUIACCmAwEAAAABqgNAAAAAAcUDAQAAAAHjAwEAAAAB5AMBAAAAAeYDAAAA6gMC6gMBAAAAAesDAQAAAAHsAwEAAAAB7QMCAAAAAe4DAQAAAAHvAwEAAAABAy4AAKsMACCZBAAArAwAIJ8EAAA7ACADLgAAqQwAIJkEAACqDAAgnwQAAAEAIAQuAACOCQAwmQQAAI8JADCbBAAAkQkAIJ8EAAD6CAAwAAAAAAAFnAQQAAAAAaIEEAAAAAGjBBAAAAABpAQQAAAAAaUEEAAAAAEBnAQAAACCBAIFLgAAjAwAIC8AAKcMACCZBAAAjQwAIJoEAACmDAAgnwQAAAEAIAcuAACKDAAgLwAApAwAIJkEAACLDAAgmgQAAKMMACCdBAAACQAgngQAAAkAIJ8EAAABACAHLgAAiAwAIC8AAKEMACCZBAAAiQwAIJoEAACgDAAgnQQAAAkAIJ4EAAAJACCfBAAAAQAgBy4AAIYMACAvAACeDAAgmQQAAIcMACCaBAAAnQwAIJ0EAAADACCeBAAAAwAgnwQAAAUAIAsuAADcCQAwLwAA4QkAMJkEAADdCQAwmgQAAN4JADCbBAAA3wkAIJwEAADgCQAwnQQAAOAJADCeBAAA4AkAMJ8EAADgCQAwoAQAAOIJADChBAAA4wkAMAsuAADQCQAwLwAA1QkAMJkEAADRCQAwmgQAANIJADCbBAAA0wkAIJwEAADUCQAwnQQAANQJADCeBAAA1AkAMJ8EAADUCQAwoAQAANYJADChBAAA1wkAMAsuAADHCQAwLwAAywkAMJkEAADICQAwmgQAAMkJADCbBAAAygkAIJwEAAD6CAAwnQQAAPoIADCeBAAA-ggAMJ8EAAD6CAAwoAQAAMwJADChBAAA_QgAMAsuAAC7CQAwLwAAwAkAMJkEAAC8CQAwmgQAAL0JADCbBAAAvgkAIJwEAAC_CQAwnQQAAL8JADCeBAAAvwkAMJ8EAAC_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_QMBAOoFACECAAAAIQAgJwAA2gkAIAIAAADYCQAgJwAA2QkAIAqjAwAA1wkAMKQDAADYCQAQpQMAANcJADCmAwEAuwUAIaoDQAC8BQAhuQMBALsFACHkAwEAuwUAIfsDAgDyBQAh_AMBALsFACH9AwEA6gUAIQqjAwAA1wkAMKQDAADYCQAQpQMAANcJADCmAwEAuwUAIaoDQAC8BQAhuQMBALsFACHkAwEAuwUAIfsDAgDyBQAh_AMBALsFACH9AwEA6gUAIQamAwEA1QYAIaoDQADWBgAhuQMBANUGACH7AwIAmwcAIfwDAQDVBgAh_QMBANsGACEIDAAAjAkAIA0AAI0JACCmAwEA1QYAIaoDQADWBgAhuQMBANUGACH7AwIAmwcAIfwDAQDVBgAh_QMBANsGACEIDAAAmAkAIA0AAJkJACCmAwEAAAABqgNAAAAAAbkDAQAAAAH7AwIAAAAB_AMBAAAAAf0DAQAAAAEMCQAAgwkAIAoAAIQJACANAACFCQAgpgMBAAAAAaoDQAAAAAHIAwEAAAAB5gMAAAD7AwLoAyAAAAAB9AMAAAD4AwL1AwEAAAAB9gMBAAAAAfkDAAAA-QMCAgAAAA8AIC4AAOcJACADAAAADwAgLgAA5wkAIC8AAOYJACABJwAAjgwAMBEIAAC8BgAgCQAAqwYAIAoAAK8GACANAAC2BgAgowMAAMUGADCkAwAADQAQpQMAAMUGADCmAwEAAAABqgNAALwFACHIAwEAuwUAIeQDAQDqBQAh5gMAAMgG-wMi6AMgAOsFACH0AwAAxgb4AyL1AwEAuwUAIfYDAQDqBQAh-QMAAMcG-QMiAgAAAA8AICcAAOYJACACAAAA5AkAICcAAOUJACANowMAAOMJADCkAwAA5AkAEKUDAADjCQAwpgMBALsFACGqA0AAvAUAIcgDAQC7BQAh5AMBAOoFACHmAwAAyAb7AyLoAyAA6wUAIfQDAADGBvgDIvUDAQC7BQAh9gMBAOoFACH5AwAAxwb5AyINowMAAOMJADCkAwAA5AkAEKUDAADjCQAwpgMBALsFACGqA0AAvAUAIcgDAQC7BQAh5AMBAOoFACHmAwAAyAb7AyLoAyAA6wUAIfQDAADGBvgDIvUDAQC7BQAh9gMBAOoFACH5AwAAxwb5AyIJpgMBANUGACGqA0AA1gYAIcgDAQDVBgAh5gMAAPEI-wMi6AMgAJwHACH0AwAA7wj4AyL1AwEA1QYAIfYDAQDbBgAh-QMAAPAI-QMiDAkAAPMIACAKAAD0CAAgDQAA9QgAIKYDAQDVBgAhqgNAANYGACHIAwEA1QYAIeYDAADxCPsDIugDIACcBwAh9AMAAO8I-AMi9QMBANUGACH2AwEA2wYAIfkDAADwCPkDIgwJAACDCQAgCgAAhAkAIA0AAIUJACCmAwEAAAABqgNAAAAAAcgDAQAAAAHmAwAAAPsDAugDIAAAAAH0AwAAAPgDAvUDAQAAAAH2AwEAAAAB-QMAAAD5AwIDLgAAjAwAIJkEAACNDAAgnwQAAAEAIAMuAACKDAAgmQQAAIsMACCfBAAAAQAgAy4AAIgMACCZBAAAiQwAIJ8EAAABACADLgAAhgwAIJkEAACHDAAgnwQAAAUAIAQuAADcCQAwmQQAAN0JADCbBAAA3wkAIJ8EAADgCQAwBC4AANAJADCZBAAA0QkAMJsEAADTCQAgnwQAANQJADAELgAAxwkAMJkEAADICQAwmwQAAMoJACCfBAAA-ggAMAQuAAC7CQAwmQQAALwJADCbBAAAvgkAIJ8EAAC_CQAwBC4AAKoJADCZBAAAqwkAMJsEAACtCQAgnwQAAK4JADAAAAAAAAGcBAAAAIcEAgUuAAD2CwAgLwAAhAwAIJkEAAD3CwAgmgQAAIMMACCfBAAAAQAgBS4AAPQLACAvAACBDAAgmQQAAPULACCaBAAAgAwAIJ8EAAABACAHLgAAmgoAIC8AAJ0KACCZBAAAmwoAIJoEAACcCgAgnQQAAAcAIJ4EAAAHACCfBAAAOwAgCy4AAJEKADAvAACVCgAwmQQAAJIKADCaBAAAkwoAMJsEAACUCgAgnAQAAPoIADCdBAAA-ggAMJ4EAAD6CAAwnwQAAPoIADCgBAAAlgoAMKEEAAD9CAAwCy4AAIgKADAvAACMCgAwmQQAAIkKADCaBAAAigoAMJsEAACLCgAgnAQAAL8JADCdBAAAvwkAMJ4EAAC_CQAwnwQAAL8JADCgBAAAjQoAMKEEAADCCQAwCy4AAP0JADAvAACBCgAwmQQAAP4JADCaBAAA_wkAMJsEAACACgAgnAQAAK4JADCdBAAArgkAMJ4EAACuCQAwnwQAAK4JADCgBAAAggoAMKEEAACxCQAwDgMAALoJACAIAACHCgAgpgMBAAAAAaoDQAAAAAGrA0AAAAAB5AMBAAAAAYIEAAAAjAQCgwQBAAAAAYkEEAAAAAGKBAEAAAABjAQBAAAAAY0EAQAAAAGOBEAAAAABjwRAAAAAAQIAAAAsACAuAACGCgAgAwAAACwAIC4AAIYKACAvAACECgAgAScAAP8LADACAAAALAAgJwAAhAoAIAIAAACyCQAgJwAAgwoAIAymAwEA1QYAIaoDQADWBgAhqwNAANYGACHkAwEA2wYAIYIEAAC0CYwEIoMEAQDVBgAhiQQQAPgGACGKBAEA1QYAIYwEAQDbBgAhjQQBANsGACGOBEAA3AYAIY8EQADcBgAhDgMAALcJACAIAACFCgAgpgMBANUGACGqA0AA1gYAIasDQADWBgAh5AMBANsGACGCBAAAtAmMBCKDBAEA1QYAIYkEEAD4BgAhigQBANUGACGMBAEA2wYAIY0EAQDbBgAhjgRAANwGACGPBEAA3AYAIQcuAAD6CwAgLwAA_QsAIJkEAAD7CwAgmgQAAPwLACCdBAAABwAgngQAAAcAIJ8EAAA7ACAOAwAAugkAIAgAAIcKACCmAwEAAAABqgNAAAAAAasDQAAAAAHkAwEAAAABggQAAACMBAKDBAEAAAABiQQQAAAAAYoEAQAAAAGMBAEAAAABjQQBAAAAAY4EQAAAAAGPBEAAAAABAy4AAPoLACCZBAAA-wsAIJ8EAAA7ACAKCAAA1QgAIAwAANMIACCmAwEAAAABqgNAAAAAAbkDAQAAAAHQAwEAAAAB5AMBAAAAAeYDAAAA5gMC5wMBAAAAAegDIAAAAAECAAAAJgAgLgAAkAoAIAMAAAAmACAuAACQCgAgLwAAjwoAIAEnAAD5CwAwAgAAACYAICcAAI8KACACAAAAwwkAICcAAI4KACAIpgMBANUGACGqA0AA1gYAIbkDAQDVBgAh0AMBANUGACHkAwEA2wYAIeYDAADPCOYDIucDAQDbBgAh6AMgAJwHACEKCAAA0ggAIAwAANAIACCmAwEA1QYAIaoDQADWBgAhuQMBANUGACHQAwEA1QYAIeQDAQDbBgAh5gMAAM8I5gMi5wMBANsGACHoAyAAnAcAIQoIAADVCAAgDAAA0wgAIKYDAQAAAAGqA0AAAAABuQMBAAAAAdADAQAAAAHkAwEAAAAB5gMAAADmAwLnAwEAAAAB6AMgAAAAARAIAADiCAAgCwAA4QgAIA8AAOQIACAQAADlCAAgpgMBAAAAAaoDQAAAAAHFAwEAAAAB5AMBAAAAAeYDAAAA6gMC6gMBAAAAAesDAQAAAAHsAwEAAAAB7QMCAAAAAe4DAQAAAAHvAwEAAAAB8AMBAAAAAQIAAAAVACAuAACZCgAgAwAAABUAIC4AAJkKACAvAACYCgAgAScAAPgLADACAAAAFQAgJwAAmAoAIAIAAAD-CAAgJwAAlwoAIAymAwEA1QYAIaoDQADWBgAhxQMBANUGACHkAwEA2wYAIeYDAADbCOoDIuoDAQDbBgAh6wMBANsGACHsAwEA2wYAIe0DAgCbBwAh7gMBANsGACHvAwEA2wYAIfADAQDbBgAhEAgAAN0IACALAADcCAAgDwAA3wgAIBAAAOAIACCmAwEA1QYAIaoDQADWBgAhxQMBANUGACHkAwEA2wYAIeYDAADbCOoDIuoDAQDbBgAh6wMBANsGACHsAwEA2wYAIe0DAgCbBwAh7gMBANsGACHvAwEA2wYAIfADAQDbBgAhEAgAAOIIACALAADhCAAgDwAA5AgAIBAAAOUIACCmAwEAAAABqgNAAAAAAcUDAQAAAAHkAwEAAAAB5gMAAADqAwLqAwEAAAAB6wMBAAAAAewDAQAAAAHtAwIAAAAB7gMBAAAAAe8DAQAAAAHwAwEAAAABFQMAAOgJACAFAADpCQAgBgAA6gkAIA0AAO4JACARAADsCQAgEgAA7QkAIBMAAO8JACAUAADwCQAgpgMBAAAAAaoDQAAAAAGrA0AAAAABywMBAAAAAdADAQAAAAHkAwEAAAAB_gMBAAAAAf8DEAAAAAGABEAAAAABggQAAACCBAKDBAEAAAABhAQBAAAAAYUEAQAAAAECAAAAOwAgLgAAmgoAIAMAAAAHACAuAACaCgAgLwAAngoAIBcAAAAHACADAAChCQAgBQAAogkAIAYAAKMJACANAACnCQAgEQAApQkAIBIAAKYJACATAACoCQAgFAAAqQkAICcAAJ4KACCmAwEA1QYAIaoDQADWBgAhqwNAANYGACHLAwEA1QYAIdADAQDVBgAh5AMBANUGACH-AwEA1QYAIf8DEACfCQAhgARAANwGACGCBAAAoAmCBCKDBAEA1QYAIYQEAQDbBgAhhQQBANsGACEVAwAAoQkAIAUAAKIJACAGAACjCQAgDQAApwkAIBEAAKUJACASAACmCQAgEwAAqAkAIBQAAKkJACCmAwEA1QYAIaoDQADWBgAhqwNAANYGACHLAwEA1QYAIdADAQDVBgAh5AMBANUGACH-AwEA1QYAIf8DEACfCQAhgARAANwGACGCBAAAoAmCBCKDBAEA1QYAIYQEAQDbBgAhhQQBANsGACEDLgAA9gsAIJkEAAD3CwAgnwQAAAEAIAMuAAD0CwAgmQQAAPULACCfBAAAAQAgAy4AAJoKACCZBAAAmwoAIJ8EAAA7ACAELgAAkQoAMJkEAACSCgAwmwQAAJQKACCfBAAA-ggAMAQuAACICgAwmQQAAIkKADCbBAAAiwoAIJ8EAAC_CQAwBC4AAP0JADCZBAAA_gkAMJsEAACACgAgnwQAAK4JADAAAAAAAAAAAAGcBAAAAJMEAgsuAADACwAwLwAAxAsAMJkEAADBCwAwmgQAAMILADCbBAAAwwsAIJwEAACvCwAwnQQAAK8LADCeBAAArwsAMJ8EAACvCwAwoAQAAMULADChBAAAsgsAMAsuAAC3CwAwLwAAuwsAMJkEAAC4CwAwmgQAALkLADCbBAAAugsAIJwEAACaCwAwnQQAAJoLADCeBAAAmgsAMJ8EAACaCwAwoAQAALwLADChBAAAnQsAMAsuAACrCwAwLwAAsAsAMJkEAACsCwAwmgQAAK0LADCbBAAArgsAIJwEAACvCwAwnQQAAK8LADCeBAAArwsAMJ8EAACvCwAwoAQAALELADChBAAAsgsAMAsuAACiCwAwLwAApgsAMJkEAACjCwAwmgQAAKQLADCbBAAApQsAIJwEAACaCwAwnQQAAJoLADCeBAAAmgsAMJ8EAACaCwAwoAQAAKcLADChBAAAnQsAMAsuAACWCwAwLwAAmwsAMJkEAACXCwAwmgQAAJgLADCbBAAAmQsAIJwEAACaCwAwnQQAAJoLADCeBAAAmgsAMJ8EAACaCwAwoAQAAJwLADChBAAAnQsAMAsuAACNCwAwLwAAkQsAMJkEAACOCwAwmgQAAI8LADCbBAAAkAsAIJwEAADUCQAwnQQAANQJADCeBAAA1AkAMJ8EAADUCQAwoAQAAJILADChBAAA1wkAMAsuAACECwAwLwAAiAsAMJkEAACFCwAwmgQAAIYLADCbBAAAhwsAIJwEAADgCQAwnQQAAOAJADCeBAAA4AkAMJ8EAADgCQAwoAQAAIkLADChBAAA4wkAMAsuAAD7CgAwLwAA_woAMJkEAAD8CgAwmgQAAP0KADCbBAAA_goAIJwEAADgCQAwnQQAAOAJADCeBAAA4AkAMJ8EAADgCQAwoAQAAIALADChBAAA4wkAMAsuAADyCgAwLwAA9goAMJkEAADzCgAwmgQAAPQKADCbBAAA9QoAIJwEAAD6CAAwnQQAAPoIADCeBAAA-ggAMJ8EAAD6CAAwoAQAAPcKADChBAAA_QgAMAsuAADpCgAwLwAA7QoAMJkEAADqCgAwmgQAAOsKADCbBAAA7AoAIJwEAAC_CQAwnQQAAL8JADCeBAAAvwkAMJ8EAAC_CQAwoAQAAO4KADChBAAAwgkAMAsuAADdCgAwLwAA4goAMJkEAADeCgAwmgQAAN8KADCbBAAA4AoAIJwEAADhCgAwnQQAAOEKADCeBAAA4QoAMJ8EAADhCgAwoAQAAOMKADChBAAA5AoAMAsuAADUCgAwLwAA2AoAMJkEAADVCgAwmgQAANYKADCbBAAA1woAIJwEAACuCQAwnQQAAK4JADCeBAAArgkAMJ8EAACuCQAwoAQAANkKADChBAAAsQkAMAsuAADICgAwLwAAzQoAMJkEAADJCgAwmgQAAMoKADCbBAAAywoAIJwEAADMCgAwnQQAAMwKADCeBAAAzAoAMJ8EAADMCgAwoAQAAM4KADChBAAAzwoAMAsuAAC8CgAwLwAAwQoAMJkEAAC9CgAwmgQAAL4KADCbBAAAvwoAIJwEAADACgAwnQQAAMAKADCeBAAAwAoAMJ8EAADACgAwoAQAAMIKADChBAAAwwoAMAymAwEAAAABqgNAAAAAAasDQAAAAAG3AwEAAAABuAMBAAAAAboDAQAAAAG7AwEAAAABvAMBAAAAAb0DQAAAAAG-A0AAAAABvwMBAAAAAcADAQAAAAECAAAAUQAgLgAAxwoAIAMAAABRACAuAADHCgAgLwAAxgoAIAEnAADzCwAwEQwAAKsGACCjAwAAqQYAMKQDAABPABClAwAAqQYAMKYDAQAAAAGqA0AAvAUAIasDQAC8BQAhtwMBALsFACG4AwEAuwUAIbkDAQC7BQAhugMBAOoFACG7AwEA6gUAIbwDAQDqBQAhvQNAAKoGACG-A0AAqgYAIb8DAQDqBQAhwAMBAOoFACECAAAAUQAgJwAAxgoAIAIAAADECgAgJwAAxQoAIBCjAwAAwwoAMKQDAADECgAQpQMAAMMKADCmAwEAuwUAIaoDQAC8BQAhqwNAALwFACG3AwEAuwUAIbgDAQC7BQAhuQMBALsFACG6AwEA6gUAIbsDAQDqBQAhvAMBAOoFACG9A0AAqgYAIb4DQACqBgAhvwMBAOoFACHAAwEA6gUAIRCjAwAAwwoAMKQDAADECgAQpQMAAMMKADCmAwEAuwUAIaoDQAC8BQAhqwNAALwFACG3AwEAuwUAIbgDAQC7BQAhuQMBALsFACG6AwEA6gUAIbsDAQDqBQAhvAMBAOoFACG9A0AAqgYAIb4DQACqBgAhvwMBAOoFACHAAwEA6gUAIQymAwEA1QYAIaoDQADWBgAhqwNAANYGACG3AwEA1QYAIbgDAQDVBgAhugMBANsGACG7AwEA2wYAIbwDAQDbBgAhvQNAANwGACG-A0AA3AYAIb8DAQDbBgAhwAMBANsGACEMpgMBANUGACGqA0AA1gYAIasDQADWBgAhtwMBANUGACG4AwEA1QYAIboDAQDbBgAhuwMBANsGACG8AwEA2wYAIb0DQADcBgAhvgNAANwGACG_AwEA2wYAIcADAQDbBgAhDKYDAQAAAAGqA0AAAAABqwNAAAAAAbcDAQAAAAG4AwEAAAABugMBAAAAAbsDAQAAAAG8AwEAAAABvQNAAAAAAb4DQAAAAAG_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-goAIAMAAAAVACAuAAD6CgAgLwAA-QoAIAEnAADuCwAwAgAAABUAICcAAPkKACACAAAA_ggAICcAAPgKACAMpgMBANUGACGqA0AA1gYAIcUDAQDVBgAh4wMBANsGACHkAwEA2wYAIeYDAADbCOoDIuoDAQDbBgAh6wMBANsGACHsAwEA2wYAIe0DAgCbBwAh7wMBANsGACHwAwEA2wYAIRAHAADeCAAgCAAA3QgAIAsAANwIACAPAADfCAAgpgMBANUGACGqA0AA1gYAIcUDAQDVBgAh4wMBANsGACHkAwEA2wYAIeYDAADbCOoDIuoDAQDbBgAh6wMBANsGACHsAwEA2wYAIe0DAgCbBwAh7wMBANsGACHwAwEA2wYAIRAHAADjCAAgCAAA4ggAIAsAAOEIACAPAADkCAAgpgMBAAAAAaoDQAAAAAHFAwEAAAAB4wMBAAAAAeQDAQAAAAHmAwAAAOoDAuoDAQAAAAHrAwEAAAAB7AMBAAAAAe0DAgAAAAHvAwEAAAAB8AMBAAAAAQwIAACCCQAgCQAAgwkAIA0AAIUJACCmAwEAAAABqgNAAAAAAcgDAQAAAAHkAwEAAAAB5gMAAAD7AwLoAyAAAAAB9AMAAAD4AwL1AwEAAAAB-QMAAAD5AwICAAAADwAgLgAAgwsAIAMAAAAPACAuAACDCwAgLwAAggsAIAEnAADtCwAwAgAAAA8AICcAAIILACACAAAA5AkAICcAAIELACAJpgMBANUGACGqA0AA1gYAIcgDAQDVBgAh5AMBANsGACHmAwAA8Qj7AyLoAyAAnAcAIfQDAADvCPgDIvUDAQDVBgAh-QMAAPAI-QMiDAgAAPIIACAJAADzCAAgDQAA9QgAIKYDAQDVBgAhqgNAANYGACHIAwEA1QYAIeQDAQDbBgAh5gMAAPEI-wMi6AMgAJwHACH0AwAA7wj4AyL1AwEA1QYAIfkDAADwCPkDIgwIAACCCQAgCQAAgwkAIA0AAIUJACCmAwEAAAABqgNAAAAAAcgDAQAAAAHkAwEAAAAB5gMAAAD7AwLoAyAAAAAB9AMAAAD4AwL1AwEAAAAB-QMAAAD5AwIMCAAAggkAIAoAAIQJACANAACFCQAgpgMBAAAAAaoDQAAAAAHIAwEAAAAB5AMBAAAAAeYDAAAA-wMC6AMgAAAAAfQDAAAA-AMC9gMBAAAAAfkDAAAA-QMCAgAAAA8AIC4AAIwLACADAAAADwAgLgAAjAsAIC8AAIsLACABJwAA7AsAMAIAAAAPACAnAACLCwAgAgAAAOQJACAnAACKCwAgCaYDAQDVBgAhqgNAANYGACHIAwEA1QYAIeQDAQDbBgAh5gMAAPEI-wMi6AMgAJwHACH0AwAA7wj4AyL2AwEA2wYAIfkDAADwCPkDIgwIAADyCAAgCgAA9AgAIA0AAPUIACCmAwEA1QYAIaoDQADWBgAhyAMBANUGACHkAwEA2wYAIeYDAADxCPsDIugDIACcBwAh9AMAAO8I-AMi9gMBANsGACH5AwAA8Aj5AyIMCAAAggkAIAoAAIQJACANAACFCQAgpgMBAAAAAaoDQAAAAAHIAwEAAAAB5AMBAAAAAeYDAAAA-wMC6AMgAAAAAfQDAAAA-AMC9gMBAAAAAfkDAAAA-QMCCAgAAJcJACANAACZCQAgpgMBAAAAAaoDQAAAAAHkAwEAAAAB-wMCAAAAAfwDAQAAAAH9AwEAAAABAgAAACEAIC4AAJULACADAAAAIQAgLgAAlQsAIC8AAJQLACABJwAA6wsAMAIAAAAhACAnAACUCwAgAgAAANgJACAnAACTCwAgBqYDAQDVBgAhqgNAANYGACHkAwEA1QYAIfsDAgCbBwAh_AMBANUGACH9AwEA2wYAIQgIAACLCQAgDQAAjQkAIKYDAQDVBgAhqgNAANYGACHkAwEA1QYAIfsDAgCbBwAh_AMBANUGACH9AwEA2wYAIQgIAACXCQAgDQAAmQkAIKYDAQAAAAGqA0AAAAAB5AMBAAAAAfsDAgAAAAH8AwEAAAAB_QMBAAAAARUDAADoCQAgBgAA6gkAIAcAAOsJACANAADuCQAgEQAA7AkAIBIAAO0JACATAADvCQAgFAAA8AkAIKYDAQAAAAGqA0AAAAABqwNAAAAAAcsDAQAAAAHQAwEAAAAB4wMBAAAAAeQDAQAAAAH-AwEAAAAB_wMQAAAAAYAEQAAAAAGCBAAAAIIEAoMEAQAAAAGFBAEAAAABAgAAADsAIC4AAKELACADAAAAOwAgLgAAoQsAIC8AAKALACABJwAA6gsAMBoDAACrBgAgBQAArwYAIAYAAK8GACAHAACzBgAgDQAAtgYAIBEAALQGACASAAC1BgAgEwAAtwYAIBQAALgGACCjAwAAsAYAMKQDAAAHABClAwAAsAYAMKYDAQAAAAGqA0AAvAUAIasDQAC8BQAhywMBALsFACHQAwEAuwUAIeMDAQAAAAHkAwEAAAAB_gMBALsFACH_AxAAsQYAIYAEQACqBgAhggQAALIGggQigwQBALsFACGEBAEA6gUAIYUEAQDqBQAhAgAAADsAICcAAKALACACAAAAngsAICcAAJ8LACARowMAAJ0LADCkAwAAngsAEKUDAACdCwAwpgMBALsFACGqA0AAvAUAIasDQAC8BQAhywMBALsFACHQAwEAuwUAIeMDAQDqBQAh5AMBALsFACH-AwEAuwUAIf8DEACxBgAhgARAAKoGACGCBAAAsgaCBCKDBAEAuwUAIYQEAQDqBQAhhQQBAOoFACERowMAAJ0LADCkAwAAngsAEKUDAACdCwAwpgMBALsFACGqA0AAvAUAIasDQAC8BQAhywMBALsFACHQAwEAuwUAIeMDAQDqBQAh5AMBALsFACH-AwEAuwUAIf8DEACxBgAhgARAAKoGACGCBAAAsgaCBCKDBAEAuwUAIYQEAQDqBQAhhQQBAOoFACENpgMBANUGACGqA0AA1gYAIasDQADWBgAhywMBANUGACHQAwEA1QYAIeMDAQDbBgAh5AMBANUGACH-AwEA1QYAIf8DEACfCQAhgARAANwGACGCBAAAoAmCBCKDBAEA1QYAIYUEAQDbBgAhFQMAAKEJACAGAACjCQAgBwAApAkAIA0AAKcJACARAAClCQAgEgAApgkAIBMAAKgJACAUAACpCQAgpgMBANUGACGqA0AA1gYAIasDQADWBgAhywMBANUGACHQAwEA1QYAIeMDAQDbBgAh5AMBANUGACH-AwEA1QYAIf8DEACfCQAhgARAANwGACGCBAAAoAmCBCKDBAEA1QYAIYUEAQDbBgAhFQMAAOgJACAGAADqCQAgBwAA6wkAIA0AAO4JACARAADsCQAgEgAA7QkAIBMAAO8JACAUAADwCQAgpgMBAAAAAaoDQAAAAAGrA0AAAAABywMBAAAAAdADAQAAAAHjAwEAAAAB5AMBAAAAAf4DAQAAAAH_AxAAAAABgARAAAAAAYIEAAAAggQCgwQBAAAAAYUEAQAAAAEVAwAA6AkAIAUAAOkJACAHAADrCQAgDQAA7gkAIBEAAOwJACASAADtCQAgEwAA7wkAIBQAAPAJACCmAwEAAAABqgNAAAAAAasDQAAAAAHLAwEAAAAB0AMBAAAAAeMDAQAAAAHkAwEAAAAB_gMBAAAAAf8DEAAAAAGABEAAAAABggQAAACCBAKDBAEAAAABhAQBAAAAAQIAAAA7ACAuAACqCwAgAwAAADsAIC4AAKoLACAvAACpCwAgAScAAOkLADACAAAAOwAgJwAAqQsAIAIAAACeCwAgJwAAqAsAIA2mAwEA1QYAIaoDQADWBgAhqwNAANYGACHLAwEA1QYAIdADAQDVBgAh4wMBANsGACHkAwEA1QYAIf4DAQDVBgAh_wMQAJ8JACGABEAA3AYAIYIEAACgCYIEIoMEAQDVBgAhhAQBANsGACEVAwAAoQkAIAUAAKIJACAHAACkCQAgDQAApwkAIBEAAKUJACASAACmCQAgEwAAqAkAIBQAAKkJACCmAwEA1QYAIaoDQADWBgAhqwNAANYGACHLAwEA1QYAIdADAQDVBgAh4wMBANsGACHkAwEA1QYAIf4DAQDVBgAh_wMQAJ8JACGABEAA3AYAIYIEAACgCYIEIoMEAQDVBgAhhAQBANsGACEVAwAA6AkAIAUAAOkJACAHAADrCQAgDQAA7gkAIBEAAOwJACASAADtCQAgEwAA7wkAIBQAAPAJACCmAwEAAAABqgNAAAAAAasDQAAAAAHLAwEAAAAB0AMBAAAAAeMDAQAAAAHkAwEAAAAB_gMBAAAAAf8DEAAAAAGABEAAAAABggQAAACCBAKDBAEAAAABhAQBAAAAARQDAACfCgAgCAAAoQoAIA0AAKIKACATAACjCgAgFAAApAoAIKYDAQAAAAGpA0AAAAABqgNAAAAAAasDQAAAAAHKAxAAAAABywMBAAAAAcwDAgAAAAHNAwIAAAAB0AMBAAAAAeMDAQAAAAH8AwEAAAABggQAAACHBAKDBAEAAAABhwRAAAAAAYgEQAAAAAECAAAABQAgLgAAtgsAIAMAAAAFACAuAAC2CwAgLwAAtQsAIAEnAADoCwAwGQMAAKsGACAEAACrBgAgCAAAvAYAIA0AALYGACATAAC3BgAgFAAAuAYAIKMDAADQBgAwpAMAAAMAEKUDAADQBgAwpgMBAAAAAakDQACqBgAhqgNAALwFACGrA0AAvAUAIcoDEADlBQAhywMBALsFACHMAwIA4AUAIc0DAgDyBQAh0AMBALsFACHjAwEAAAAB8gMBALsFACH8AwEA6gUAIYIEAADRBocEIoMEAQC7BQAhhwRAAKoGACGIBEAAqgYAIQIAAAAFACAnAAC1CwAgAgAAALMLACAnAAC0CwAgE6MDAACyCwAwpAMAALMLABClAwAAsgsAMKYDAQC7BQAhqQNAAKoGACGqA0AAvAUAIasDQAC8BQAhygMQAOUFACHLAwEAuwUAIcwDAgDgBQAhzQMCAPIFACHQAwEAuwUAIeMDAQC7BQAh8gMBALsFACH8AwEA6gUAIYIEAADRBocEIoMEAQC7BQAhhwRAAKoGACGIBEAAqgYAIROjAwAAsgsAMKQDAACzCwAQpQMAALILADCmAwEAuwUAIakDQACqBgAhqgNAALwFACGrA0AAvAUAIcoDEADlBQAhywMBALsFACHMAwIA4AUAIc0DAgDyBQAh0AMBALsFACHjAwEAuwUAIfIDAQC7BQAh_AMBAOoFACGCBAAA0QaHBCKDBAEAuwUAIYcEQACqBgAhiARAAKoGACEPpgMBANUGACGpA0AA3AYAIaoDQADWBgAhqwNAANYGACHKAxAA-AYAIcsDAQDVBgAhzAMCAOkGACHNAwIAmwcAIdADAQDVBgAh4wMBANUGACH8AwEA2wYAIYIEAAD2CYcEIoMEAQDVBgAhhwRAANwGACGIBEAA3AYAIRQDAAD3CQAgCAAA-QkAIA0AAPoJACATAAD7CQAgFAAA_AkAIKYDAQDVBgAhqQNAANwGACGqA0AA1gYAIasDQADWBgAhygMQAPgGACHLAwEA1QYAIcwDAgDpBgAhzQMCAJsHACHQAwEA1QYAIeMDAQDVBgAh_AMBANsGACGCBAAA9gmHBCKDBAEA1QYAIYcEQADcBgAhiARAANwGACEUAwAAnwoAIAgAAKEKACANAACiCgAgEwAAowoAIBQAAKQKACCmAwEAAAABqQNAAAAAAaoDQAAAAAGrA0AAAAABygMQAAAAAcsDAQAAAAHMAwIAAAABzQMCAAAAAdADAQAAAAHjAwEAAAAB_AMBAAAAAYIEAAAAhwQCgwQBAAAAAYcEQAAAAAGIBEAAAAABFQUAAOkJACAGAADqCQAgBwAA6wkAIA0AAO4JACARAADsCQAgEgAA7QkAIBMAAO8JACAUAADwCQAgpgMBAAAAAaoDQAAAAAGrA0AAAAABywMBAAAAAdADAQAAAAHjAwEAAAAB5AMBAAAAAf4DAQAAAAH_AxAAAAABgARAAAAAAYIEAAAAggQChAQBAAAAAYUEAQAAAAECAAAAOwAgLgAAvwsAIAMAAAA7ACAuAAC_CwAgLwAAvgsAIAEnAADnCwAwAgAAADsAICcAAL4LACACAAAAngsAICcAAL0LACANpgMBANUGACGqA0AA1gYAIasDQADWBgAhywMBANUGACHQAwEA1QYAIeMDAQDbBgAh5AMBANUGACH-AwEA1QYAIf8DEACfCQAhgARAANwGACGCBAAAoAmCBCKEBAEA2wYAIYUEAQDbBgAhFQUAAKIJACAGAACjCQAgBwAApAkAIA0AAKcJACARAAClCQAgEgAApgkAIBMAAKgJACAUAACpCQAgpgMBANUGACGqA0AA1gYAIasDQADWBgAhywMBANUGACHQAwEA1QYAIeMDAQDbBgAh5AMBANUGACH-AwEA1QYAIf8DEACfCQAhgARAANwGACGCBAAAoAmCBCKEBAEA2wYAIYUEAQDbBgAhFQUAAOkJACAGAADqCQAgBwAA6wkAIA0AAO4JACARAADsCQAgEgAA7QkAIBMAAO8JACAUAADwCQAgpgMBAAAAAaoDQAAAAAGrA0AAAAABywMBAAAAAdADAQAAAAHjAwEAAAAB5AMBAAAAAf4DAQAAAAH_AxAAAAABgARAAAAAAYIEAAAAggQChAQBAAAAAYUEAQAAAAEUBAAAoAoAIAgAAKEKACANAACiCgAgEwAAowoAIBQAAKQKACCmAwEAAAABqQNAAAAAAaoDQAAAAAGrA0AAAAABygMQAAAAAcsDAQAAAAHMAwIAAAABzQMCAAAAAdADAQAAAAHjAwEAAAAB8gMBAAAAAfwDAQAAAAGCBAAAAIcEAocEQAAAAAGIBEAAAAABAgAAAAUAIC4AAMgLACADAAAABQAgLgAAyAsAIC8AAMcLACABJwAA5gsAMAIAAAAFACAnAADHCwAgAgAAALMLACAnAADGCwAgD6YDAQDVBgAhqQNAANwGACGqA0AA1gYAIasDQADWBgAhygMQAPgGACHLAwEA1QYAIcwDAgDpBgAhzQMCAJsHACHQAwEA1QYAIeMDAQDVBgAh8gMBANUGACH8AwEA2wYAIYIEAAD2CYcEIocEQADcBgAhiARAANwGACEUBAAA-AkAIAgAAPkJACANAAD6CQAgEwAA-wkAIBQAAPwJACCmAwEA1QYAIakDQADcBgAhqgNAANYGACGrA0AA1gYAIcoDEAD4BgAhywMBANUGACHMAwIA6QYAIc0DAgCbBwAh0AMBANUGACHjAwEA1QYAIfIDAQDVBgAh_AMBANsGACGCBAAA9gmHBCKHBEAA3AYAIYgEQADcBgAhFAQAAKAKACAIAAChCgAgDQAAogoAIBMAAKMKACAUAACkCgAgpgMBAAAAAakDQAAAAAGqA0AAAAABqwNAAAAAAcoDEAAAAAHLAwEAAAABzAMCAAAAAc0DAgAAAAHQAwEAAAAB4wMBAAAAAfIDAQAAAAH8AwEAAAABggQAAACHBAKHBEAAAAABiARAAAAAAQQuAADACwAwmQQAAMELADCbBAAAwwsAIJ8EAACvCwAwBC4AALcLADCZBAAAuAsAMJsEAAC6CwAgnwQAAJoLADAELgAAqwsAMJkEAACsCwAwmwQAAK4LACCfBAAArwsAMAQuAACiCwAwmQQAAKMLADCbBAAApQsAIJ8EAACaCwAwBC4AAJYLADCZBAAAlwsAMJsEAACZCwAgnwQAAJoLADAELgAAjQsAMJkEAACOCwAwmwQAAJALACCfBAAA1AkAMAQuAACECwAwmQQAAIULADCbBAAAhwsAIJ8EAADgCQAwBC4AAPsKADCZBAAA_AoAMJsEAAD-CgAgnwQAAOAJADAELgAA8goAMJkEAADzCgAwmwQAAPUKACCfBAAA-ggAMAQuAADpCgAwmQQAAOoKADCbBAAA7AoAIJ8EAAC_CQAwBC4AAN0KADCZBAAA3goAMJsEAADgCgAgnwQAAOEKADAELgAA1AoAMJkEAADVCgAwmwQAANcKACCfBAAArgkAMAQuAADICgAwmQQAAMkKADCbBAAAywoAIJ8EAADMCgAwBC4AALwKADCZBAAAvQoAMJsEAAC_CgAgnwQAAMAKADAAAAAAAAAAAAAAFBMAANwLACAVAADXCwAgFgAA2AsAIBcAANcLACAYAADYCwAgGQAA2AsAIBoAANkLACAbAADaCwAgHAAA2gsAIB0AANsLACAeAADdCwAgHwAA3gsAICAAAN8LACAhAADgCwAgwAMAANcGACDUAwAA1wYAIJAEAADXBgAgkQQAANcGACCUBAAA1wYAIJYEAADXBgAgCwMAAOELACAEAADhCwAgCAAA4wsAIA0AANsLACATAADcCwAgFAAA3gsAIKkDAADXBgAgzQMAANcGACD8AwAA1wYAIIcEAADXBgAgiAQAANcGACAOAwAA4QsAIAUAAOELACAGAADhCwAgBwAA4gsAIA0AANsLACARAADaCwAgEgAA2QsAIBMAANwLACAUAADeCwAg4wMAANcGACD_AwAA1wYAIIAEAADXBgAghAQAANcGACCFBAAA1wYAIAYIAADjCwAgCQAA4QsAIAoAAOELACANAADbCwAg5AMAANcGACD2AwAA1wYAIAUIAADjCwAgDAAA4QsAIA0AANsLACD7AwAA1wYAIP0DAADXBgAgD6YDAQAAAAGpA0AAAAABqgNAAAAAAasDQAAAAAHKAxAAAAABywMBAAAAAcwDAgAAAAHNAwIAAAAB0AMBAAAAAeMDAQAAAAHyAwEAAAAB_AMBAAAAAYIEAAAAhwQChwRAAAAAAYgEQAAAAAENpgMBAAAAAaoDQAAAAAGrA0AAAAABywMBAAAAAdADAQAAAAHjAwEAAAAB5AMBAAAAAf4DAQAAAAH_AxAAAAABgARAAAAAAYIEAAAAggQChAQBAAAAAYUEAQAAAAEPpgMBAAAAAakDQAAAAAGqA0AAAAABqwNAAAAAAcoDEAAAAAHLAwEAAAABzAMCAAAAAc0DAgAAAAHQAwEAAAAB4wMBAAAAAfwDAQAAAAGCBAAAAIcEAoMEAQAAAAGHBEAAAAABiARAAAAAAQ2mAwEAAAABqgNAAAAAAasDQAAAAAHLAwEAAAAB0AMBAAAAAeMDAQAAAAHkAwEAAAAB_gMBAAAAAf8DEAAAAAGABEAAAAABggQAAACCBAKDBAEAAAABhAQBAAAAAQ2mAwEAAAABqgNAAAAAAasDQAAAAAHLAwEAAAAB0AMBAAAAAeMDAQAAAAHkAwEAAAAB_gMBAAAAAf8DEAAAAAGABEAAAAABggQAAACCBAKDBAEAAAABhQQBAAAAAQamAwEAAAABqgNAAAAAAeQDAQAAAAH7AwIAAAAB_AMBAAAAAf0DAQAAAAEJpgMBAAAAAaoDQAAAAAHIAwEAAAAB5AMBAAAAAeYDAAAA-wMC6AMgAAAAAfQDAAAA-AMC9gMBAAAAAfkDAAAA-QMCCaYDAQAAAAGqA0AAAAAByAMBAAAAAeQDAQAAAAHmAwAAAPsDAugDIAAAAAH0AwAAAPgDAvUDAQAAAAH5AwAAAPkDAgymAwEAAAABqgNAAAAAAcUDAQAAAAHjAwEAAAAB5AMBAAAAAeYDAAAA6gMC6gMBAAAAAesDAQAAAAHsAwEAAAAB7QMCAAAAAe8DAQAAAAHwAwEAAAABCKYDAQAAAAGqA0AAAAAB0AMBAAAAAeMDAQAAAAHkAwEAAAAB5gMAAADmAwLnAwEAAAAB6AMgAAAAAQimAwEAAAABqgNAAAAAAasDQAAAAAHCAwEAAAAByAMBAAAAAegDIAAAAAHxAwEAAAAB9AMAAAD0AwIMpgMBAAAAAaoDQAAAAAGrA0AAAAAB4wMBAAAAAeQDAQAAAAGCBAAAAIwEAokEEAAAAAGKBAEAAAABjAQBAAAAAY0EAQAAAAGOBEAAAAABjwRAAAAAAQemAwEAAAABqQNAAAAAAaoDQAAAAAGrA0AAAAABwQMBAAAAAcIDAQAAAAHDAwEAAAABDKYDAQAAAAGqA0AAAAABqwNAAAAAAbcDAQAAAAG4AwEAAAABugMBAAAAAbsDAQAAAAG8AwEAAAABvQNAAAAAAb4DQAAAAAG_AwEAAAABwAMBAAAAARoTAADSCwAgFQAAyQsAIBYAAMoLACAYAADMCwAgGQAAzQsAIBoAAM4LACAbAADPCwAgHAAA0AsAIB0AANELACAeAADTCwAgHwAA1AsAICAAANULACAhAADWCwAgpgMBAAAAAaoDQAAAAAGrA0AAAAABwAMBAAAAAckDAQAAAAHUAwEAAAAB2wMgAAAAAZAEAQAAAAGRBAEAAAABkwQAAACTBAKUBAEAAAABlQQgAAAAAZYEAQAAAAECAAAAAQAgLgAA9AsAIBoTAADSCwAgFgAAygsAIBcAAMsLACAYAADMCwAgGQAAzQsAIBoAAM4LACAbAADPCwAgHAAA0AsAIB0AANELACAeAADTCwAgHwAA1AsAICAAANULACAhAADWCwAgpgMBAAAAAaoDQAAAAAGrA0AAAAABwAMBAAAAAckDAQAAAAHUAwEAAAAB2wMgAAAAAZAEAQAAAAGRBAEAAAABkwQAAACTBAKUBAEAAAABlQQgAAAAAZYEAQAAAAECAAAAAQAgLgAA9gsAIAymAwEAAAABqgNAAAAAAcUDAQAAAAHkAwEAAAAB5gMAAADqAwLqAwEAAAAB6wMBAAAAAewDAQAAAAHtAwIAAAAB7gMBAAAAAe8DAQAAAAHwAwEAAAABCKYDAQAAAAGqA0AAAAABuQMBAAAAAdADAQAAAAHkAwEAAAAB5gMAAADmAwLnAwEAAAAB6AMgAAAAARYDAADoCQAgBQAA6QkAIAYAAOoJACAHAADrCQAgDQAA7gkAIBEAAOwJACASAADtCQAgEwAA7wkAIKYDAQAAAAGqA0AAAAABqwNAAAAAAcsDAQAAAAHQAwEAAAAB4wMBAAAAAeQDAQAAAAH-AwEAAAAB_wMQAAAAAYAEQAAAAAGCBAAAAIIEAoMEAQAAAAGEBAEAAAABhQQBAAAAAQIAAAA7ACAuAAD6CwAgAwAAAAcAIC4AAPoLACAvAAD-CwAgGAAAAAcAIAMAAKEJACAFAACiCQAgBgAAowkAIAcAAKQJACANAACnCQAgEQAApQkAIBIAAKYJACATAACoCQAgJwAA_gsAIKYDAQDVBgAhqgNAANYGACGrA0AA1gYAIcsDAQDVBgAh0AMBANUGACHjAwEA2wYAIeQDAQDVBgAh_gMBANUGACH_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-wMC6AMgAAAAAfQDAAAA-AMC9QMBAAAAAfYDAQAAAAH5AwAAAPkDAgamAwEAAAABqgNAAAAAAbkDAQAAAAH7AwIAAAAB_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_AxAAAAABgARAAAAAAYIEAAAAggQCgwQBAAAAAYQEAQAAAAGFBAEAAAABAgAAADsAIC4AAKsMACAMpgMBAAAAAaoDQAAAAAHFAwEAAAAB4wMBAAAAAeQDAQAAAAHmAwAAAOoDAuoDAQAAAAHrAwEAAAAB7AMBAAAAAe0DAgAAAAHuAwEAAAAB7wMBAAAAAQMAAAAJACAuAACpDAAgLwAAsAwAIBwAAAAJACATAAC3CgAgFQAArgoAIBYAAK8KACAXAACwCgAgGAAAsQoAIBkAALIKACAbAAC0CgAgHAAAtQoAIB0AALYKACAeAAC4CgAgHwAAuQoAICAAALoKACAhAAC7CgAgJwAAsAwAIKYDAQDVBgAhqgNAANYGACGrA0AA1gYAIcADAQDbBgAhyQMBANUGACHUAwEA2wYAIdsDIACcBwAhkAQBANsGACGRBAEA2wYAIZMEAACtCpMEIpQEAQDbBgAhlQQgAJwHACGWBAEA2wYAIRoTAAC3CgAgFQAArgoAIBYAAK8KACAXAACwCgAgGAAAsQoAIBkAALIKACAbAAC0CgAgHAAAtQoAIB0AALYKACAeAAC4CgAgHwAAuQoAICAAALoKACAhAAC7CgAgpgMBANUGACGqA0AA1gYAIasDQADWBgAhwAMBANsGACHJAwEA1QYAIdQDAQDbBgAh2wMgAJwHACGQBAEA2wYAIZEEAQDbBgAhkwQAAK0KkwQilAQBANsGACGVBCAAnAcAIZYEAQDbBgAhAwAAAAcAIC4AAKsMACAvAACzDAAgGAAAAAcAIAMAAKEJACAFAACiCQAgBgAAowkAIAcAAKQJACANAACnCQAgEQAApQkAIBMAAKgJACAUAACpCQAgJwAAswwAIKYDAQDVBgAhqgNAANYGACGrA0AA1gYAIcsDAQDVBgAh0AMBANUGACHjAwEA2wYAIeQDAQDVBgAh_gMBANUGACH_AxAAnwkAIYAEQADcBgAhggQAAKAJggQigwQBANUGACGEBAEA2wYAIYUEAQDbBgAhFgMAAKEJACAFAACiCQAgBgAAowkAIAcAAKQJACANAACnCQAgEQAApQkAIBMAAKgJACAUAACpCQAgpgMBANUGACGqA0AA1gYAIasDQADWBgAhywMBANUGACHQAwEA1QYAIeMDAQDbBgAh5AMBANUGACH-AwEA1QYAIf8DEACfCQAhgARAANwGACGCBAAAoAmCBCKDBAEA1QYAIYQEAQDbBgAhhQQBANsGACEaEwAA0gsAIBUAAMkLACAWAADKCwAgFwAAywsAIBgAAMwLACAZAADNCwAgGgAAzgsAIBsAAM8LACAdAADRCwAgHgAA0wsAIB8AANQLACAgAADVCwAgIQAA1gsAIKYDAQAAAAGqA0AAAAABqwNAAAAAAcADAQAAAAHJAwEAAAAB1AMBAAAAAdsDIAAAAAGQBAEAAAABkQQBAAAAAZMEAAAAkwQClAQBAAAAAZUEIAAAAAGWBAEAAAABAgAAAAEAIC4AALQMACAaEwAA0gsAIBUAAMkLACAWAADKCwAgFwAAywsAIBgAAMwLACAZAADNCwAgGgAAzgsAIBwAANALACAdAADRCwAgHgAA0wsAIB8AANQLACAgAADVCwAgIQAA1gsAIKYDAQAAAAGqA0AAAAABqwNAAAAAAcADAQAAAAHJAwEAAAAB1AMBAAAAAdsDIAAAAAGQBAEAAAABkQQBAAAAAZMEAAAAkwQClAQBAAAAAZUEIAAAAAGWBAEAAAABAgAAAAEAIC4AALYMACAWAwAA6AkAIAUAAOkJACAGAADqCQAgBwAA6wkAIA0AAO4JACASAADtCQAgEwAA7wkAIBQAAPAJACCmAwEAAAABqgNAAAAAAasDQAAAAAHLAwEAAAAB0AMBAAAAAeMDAQAAAAHkAwEAAAAB_gMBAAAAAf8DEAAAAAGABEAAAAABggQAAACCBAKDBAEAAAABhAQBAAAAAYUEAQAAAAECAAAAOwAgLgAAuAwAIAymAwEAAAABqgNAAAAAAcUDAQAAAAHjAwEAAAAB5AMBAAAAAeYDAAAA6gMC6gMBAAAAAesDAQAAAAHsAwEAAAAB7QMCAAAAAe4DAQAAAAHwAwEAAAABAwAAAAkAIC4AALQMACAvAAC9DAAgHAAAAAkAIBMAALcKACAVAACuCgAgFgAArwoAIBcAALAKACAYAACxCgAgGQAAsgoAIBoAALMKACAbAAC0CgAgHQAAtgoAIB4AALgKACAfAAC5CgAgIAAAugoAICEAALsKACAnAAC9DAAgpgMBANUGACGqA0AA1gYAIasDQADWBgAhwAMBANsGACHJAwEA1QYAIdQDAQDbBgAh2wMgAJwHACGQBAEA2wYAIZEEAQDbBgAhkwQAAK0KkwQilAQBANsGACGVBCAAnAcAIZYEAQDbBgAhGhMAALcKACAVAACuCgAgFgAArwoAIBcAALAKACAYAACxCgAgGQAAsgoAIBoAALMKACAbAAC0CgAgHQAAtgoAIB4AALgKACAfAAC5CgAgIAAAugoAICEAALsKACCmAwEA1QYAIaoDQADWBgAhqwNAANYGACHAAwEA2wYAIckDAQDVBgAh1AMBANsGACHbAyAAnAcAIZAEAQDbBgAhkQQBANsGACGTBAAArQqTBCKUBAEA2wYAIZUEIACcBwAhlgQBANsGACEDAAAACQAgLgAAtgwAIC8AAMAMACAcAAAACQAgEwAAtwoAIBUAAK4KACAWAACvCgAgFwAAsAoAIBgAALEKACAZAACyCgAgGgAAswoAIBwAALUKACAdAAC2CgAgHgAAuAoAIB8AALkKACAgAAC6CgAgIQAAuwoAICcAAMAMACCmAwEA1QYAIaoDQADWBgAhqwNAANYGACHAAwEA2wYAIckDAQDVBgAh1AMBANsGACHbAyAAnAcAIZAEAQDbBgAhkQQBANsGACGTBAAArQqTBCKUBAEA2wYAIZUEIACcBwAhlgQBANsGACEaEwAAtwoAIBUAAK4KACAWAACvCgAgFwAAsAoAIBgAALEKACAZAACyCgAgGgAAswoAIBwAALUKACAdAAC2CgAgHgAAuAoAIB8AALkKACAgAAC6CgAgIQAAuwoAIKYDAQDVBgAhqgNAANYGACGrA0AA1gYAIcADAQDbBgAhyQMBANUGACHUAwEA2wYAIdsDIACcBwAhkAQBANsGACGRBAEA2wYAIZMEAACtCpMEIpQEAQDbBgAhlQQgAJwHACGWBAEA2wYAIQMAAAAHACAuAAC4DAAgLwAAwwwAIBgAAAAHACADAAChCQAgBQAAogkAIAYAAKMJACAHAACkCQAgDQAApwkAIBIAAKYJACATAACoCQAgFAAAqQkAICcAAMMMACCmAwEA1QYAIaoDQADWBgAhqwNAANYGACHLAwEA1QYAIdADAQDVBgAh4wMBANsGACHkAwEA1QYAIf4DAQDVBgAh_wMQAJ8JACGABEAA3AYAIYIEAACgCYIEIoMEAQDVBgAhhAQBANsGACGFBAEA2wYAIRYDAAChCQAgBQAAogkAIAYAAKMJACAHAACkCQAgDQAApwkAIBIAAKYJACATAACoCQAgFAAAqQkAIKYDAQDVBgAhqgNAANYGACGrA0AA1gYAIcsDAQDVBgAh0AMBANUGACHjAwEA2wYAIeQDAQDVBgAh_gMBANUGACH_AxAAnwkAIYAEQADcBgAhggQAAKAJggQigwQBANUGACGEBAEA2wYAIYUEAQDbBgAhGhMAANILACAVAADJCwAgFgAAygsAIBcAAMsLACAYAADMCwAgGQAAzQsAIBoAAM4LACAbAADPCwAgHAAA0AsAIB0AANELACAfAADUCwAgIAAA1QsAICEAANYLACCmAwEAAAABqgNAAAAAAasDQAAAAAHAAwEAAAAByQMBAAAAAdQDAQAAAAHbAyAAAAABkAQBAAAAAZEEAQAAAAGTBAAAAJMEApQEAQAAAAGVBCAAAAABlgQBAAAAAQIAAAABACAuAADEDAAgAwAAAAkAIC4AAMQMACAvAADIDAAgHAAAAAkAIBMAALcKACAVAACuCgAgFgAArwoAIBcAALAKACAYAACxCgAgGQAAsgoAIBoAALMKACAbAAC0CgAgHAAAtQoAIB0AALYKACAfAAC5CgAgIAAAugoAICEAALsKACAnAADIDAAgpgMBANUGACGqA0AA1gYAIasDQADWBgAhwAMBANsGACHJAwEA1QYAIdQDAQDbBgAh2wMgAJwHACGQBAEA2wYAIZEEAQDbBgAhkwQAAK0KkwQilAQBANsGACGVBCAAnAcAIZYEAQDbBgAhGhMAALcKACAVAACuCgAgFgAArwoAIBcAALAKACAYAACxCgAgGQAAsgoAIBoAALMKACAbAAC0CgAgHAAAtQoAIB0AALYKACAfAAC5CgAgIAAAugoAICEAALsKACCmAwEA1QYAIaoDQADWBgAhqwNAANYGACHAAwEA2wYAIckDAQDVBgAh1AMBANsGACHbAyAAnAcAIZAEAQDbBgAhkQQBANsGACGTBAAArQqTBCKUBAEA2wYAIZUEIACcBwAhlgQBANsGACEaEwAA0gsAIBUAAMkLACAWAADKCwAgFwAAywsAIBgAAMwLACAZAADNCwAgGgAAzgsAIBsAAM8LACAcAADQCwAgHgAA0wsAIB8AANQLACAgAADVCwAgIQAA1gsAIKYDAQAAAAGqA0AAAAABqwNAAAAAAcADAQAAAAHJAwEAAAAB1AMBAAAAAdsDIAAAAAGQBAEAAAABkQQBAAAAAZMEAAAAkwQClAQBAAAAAZUEIAAAAAGWBAEAAAABAgAAAAEAIC4AAMkMACAJCAAAlwkAIAwAAJgJACCmAwEAAAABqgNAAAAAAbkDAQAAAAHkAwEAAAAB-wMCAAAAAfwDAQAAAAH9AwEAAAABAgAAACEAIC4AAMsMACAVAwAAnwoAIAQAAKAKACAIAAChCgAgEwAAowoAIBQAAKQKACCmAwEAAAABqQNAAAAAAaoDQAAAAAGrA0AAAAABygMQAAAAAcsDAQAAAAHMAwIAAAABzQMCAAAAAdADAQAAAAHjAwEAAAAB8gMBAAAAAfwDAQAAAAGCBAAAAIcEAoMEAQAAAAGHBEAAAAABiARAAAAAAQIAAAAFACAuAADNDAAgFgMAAOgJACAFAADpCQAgBgAA6gkAIAcAAOsJACARAADsCQAgEgAA7QkAIBMAAO8JACAUAADwCQAgpgMBAAAAAaoDQAAAAAGrA0AAAAABywMBAAAAAdADAQAAAAHjAwEAAAAB5AMBAAAAAf4DAQAAAAH_AxAAAAABgARAAAAAAYIEAAAAggQCgwQBAAAAAYQEAQAAAAGFBAEAAAABAgAAADsAIC4AAM8MACANCAAAggkAIAkAAIMJACAKAACECQAgpgMBAAAAAaoDQAAAAAHIAwEAAAAB5AMBAAAAAeYDAAAA-wMC6AMgAAAAAfQDAAAA-AMC9QMBAAAAAfYDAQAAAAH5AwAAAPkDAgIAAAAPACAuAADRDAAgAwAAAAkAIC4AAMkMACAvAADVDAAgHAAAAAkAIBMAALcKACAVAACuCgAgFgAArwoAIBcAALAKACAYAACxCgAgGQAAsgoAIBoAALMKACAbAAC0CgAgHAAAtQoAIB4AALgKACAfAAC5CgAgIAAAugoAICEAALsKACAnAADVDAAgpgMBANUGACGqA0AA1gYAIasDQADWBgAhwAMBANsGACHJAwEA1QYAIdQDAQDbBgAh2wMgAJwHACGQBAEA2wYAIZEEAQDbBgAhkwQAAK0KkwQilAQBANsGACGVBCAAnAcAIZYEAQDbBgAhGhMAALcKACAVAACuCgAgFgAArwoAIBcAALAKACAYAACxCgAgGQAAsgoAIBoAALMKACAbAAC0CgAgHAAAtQoAIB4AALgKACAfAAC5CgAgIAAAugoAICEAALsKACCmAwEA1QYAIaoDQADWBgAhqwNAANYGACHAAwEA2wYAIckDAQDVBgAh1AMBANsGACHbAyAAnAcAIZAEAQDbBgAhkQQBANsGACGTBAAArQqTBCKUBAEA2wYAIZUEIACcBwAhlgQBANsGACEDAAAAGgAgLgAAywwAIC8AANgMACALAAAAGgAgCAAAiwkAIAwAAIwJACAnAADYDAAgpgMBANUGACGqA0AA1gYAIbkDAQDVBgAh5AMBANUGACH7AwIAmwcAIfwDAQDVBgAh_QMBANsGACEJCAAAiwkAIAwAAIwJACCmAwEA1QYAIaoDQADWBgAhuQMBANUGACHkAwEA1QYAIfsDAgCbBwAh_AMBANUGACH9AwEA2wYAIQMAAAADACAuAADNDAAgLwAA2wwAIBcAAAADACADAAD3CQAgBAAA-AkAIAgAAPkJACATAAD7CQAgFAAA_AkAICcAANsMACCmAwEA1QYAIakDQADcBgAhqgNAANYGACGrA0AA1gYAIcoDEAD4BgAhywMBANUGACHMAwIA6QYAIc0DAgCbBwAh0AMBANUGACHjAwEA1QYAIfIDAQDVBgAh_AMBANsGACGCBAAA9gmHBCKDBAEA1QYAIYcEQADcBgAhiARAANwGACEVAwAA9wkAIAQAAPgJACAIAAD5CQAgEwAA-wkAIBQAAPwJACCmAwEA1QYAIakDQADcBgAhqgNAANYGACGrA0AA1gYAIcoDEAD4BgAhywMBANUGACHMAwIA6QYAIc0DAgCbBwAh0AMBANUGACHjAwEA1QYAIfIDAQDVBgAh_AMBANsGACGCBAAA9gmHBCKDBAEA1QYAIYcEQADcBgAhiARAANwGACEDAAAABwAgLgAAzwwAIC8AAN4MACAYAAAABwAgAwAAoQkAIAUAAKIJACAGAACjCQAgBwAApAkAIBEAAKUJACASAACmCQAgEwAAqAkAIBQAAKkJACAnAADeDAAgpgMBANUGACGqA0AA1gYAIasDQADWBgAhywMBANUGACHQAwEA1QYAIeMDAQDbBgAh5AMBANUGACH-AwEA1QYAIf8DEACfCQAhgARAANwGACGCBAAAoAmCBCKDBAEA1QYAIYQEAQDbBgAhhQQBANsGACEWAwAAoQkAIAUAAKIJACAGAACjCQAgBwAApAkAIBEAAKUJACASAACmCQAgEwAAqAkAIBQAAKkJACCmAwEA1QYAIaoDQADWBgAhqwNAANYGACHLAwEA1QYAIdADAQDVBgAh4wMBANsGACHkAwEA1QYAIf4DAQDVBgAh_wMQAJ8JACGABEAA3AYAIYIEAACgCYIEIoMEAQDVBgAhhAQBANsGACGFBAEA2wYAIQMAAAANACAuAADRDAAgLwAA4QwAIA8AAAANACAIAADyCAAgCQAA8wgAIAoAAPQIACAnAADhDAAgpgMBANUGACGqA0AA1gYAIcgDAQDVBgAh5AMBANsGACHmAwAA8Qj7AyLoAyAAnAcAIfQDAADvCPgDIvUDAQDVBgAh9gMBANsGACH5AwAA8Aj5AyINCAAA8ggAIAkAAPMIACAKAAD0CAAgpgMBANUGACGqA0AA1gYAIcgDAQDVBgAh5AMBANsGACHmAwAA8Qj7AyLoAyAAnAcAIfQDAADvCPgDIvUDAQDVBgAh9gMBANsGACH5AwAA8Aj5AyIWAwAA6AkAIAUAAOkJACAGAADqCQAgBwAA6wkAIA0AAO4JACARAADsCQAgEgAA7QkAIBQAAPAJACCmAwEAAAABqgNAAAAAAasDQAAAAAHLAwEAAAAB0AMBAAAAAeMDAQAAAAHkAwEAAAAB_gMBAAAAAf8DEAAAAAGABEAAAAABggQAAACCBAKDBAEAAAABhAQBAAAAAYUEAQAAAAECAAAAOwAgLgAA4gwAIBUDAACfCgAgBAAAoAoAIAgAAKEKACANAACiCgAgFAAApAoAIKYDAQAAAAGpA0AAAAABqgNAAAAAAasDQAAAAAHKAxAAAAABywMBAAAAAcwDAgAAAAHNAwIAAAAB0AMBAAAAAeMDAQAAAAHyAwEAAAAB_AMBAAAAAYIEAAAAhwQCgwQBAAAAAYcEQAAAAAGIBEAAAAABAgAAAAUAIC4AAOQMACAaFQAAyQsAIBYAAMoLACAXAADLCwAgGAAAzAsAIBkAAM0LACAaAADOCwAgGwAAzwsAIBwAANALACAdAADRCwAgHgAA0wsAIB8AANQLACAgAADVCwAgIQAA1gsAIKYDAQAAAAGqA0AAAAABqwNAAAAAAcADAQAAAAHJAwEAAAAB1AMBAAAAAdsDIAAAAAGQBAEAAAABkQQBAAAAAZMEAAAAkwQClAQBAAAAAZUEIAAAAAGWBAEAAAABAgAAAAEAIC4AAOYMACADAAAABwAgLgAA4gwAIC8AAOoMACAYAAAABwAgAwAAoQkAIAUAAKIJACAGAACjCQAgBwAApAkAIA0AAKcJACARAAClCQAgEgAApgkAIBQAAKkJACAnAADqDAAgpgMBANUGACGqA0AA1gYAIasDQADWBgAhywMBANUGACHQAwEA1QYAIeMDAQDbBgAh5AMBANUGACH-AwEA1QYAIf8DEACfCQAhgARAANwGACGCBAAAoAmCBCKDBAEA1QYAIYQEAQDbBgAhhQQBANsGACEWAwAAoQkAIAUAAKIJACAGAACjCQAgBwAApAkAIA0AAKcJACARAAClCQAgEgAApgkAIBQAAKkJACCmAwEA1QYAIaoDQADWBgAhqwNAANYGACHLAwEA1QYAIdADAQDVBgAh4wMBANsGACHkAwEA1QYAIf4DAQDVBgAh_wMQAJ8JACGABEAA3AYAIYIEAACgCYIEIoMEAQDVBgAhhAQBANsGACGFBAEA2wYAIQMAAAADACAuAADkDAAgLwAA7QwAIBcAAAADACADAAD3CQAgBAAA-AkAIAgAAPkJACANAAD6CQAgFAAA_AkAICcAAO0MACCmAwEA1QYAIakDQADcBgAhqgNAANYGACGrA0AA1gYAIcoDEAD4BgAhywMBANUGACHMAwIA6QYAIc0DAgCbBwAh0AMBANUGACHjAwEA1QYAIfIDAQDVBgAh_AMBANsGACGCBAAA9gmHBCKDBAEA1QYAIYcEQADcBgAhiARAANwGACEVAwAA9wkAIAQAAPgJACAIAAD5CQAgDQAA-gkAIBQAAPwJACCmAwEA1QYAIakDQADcBgAhqgNAANYGACGrA0AA1gYAIcoDEAD4BgAhywMBANUGACHMAwIA6QYAIc0DAgCbBwAh0AMBANUGACHjAwEA1QYAIfIDAQDVBgAh_AMBANsGACGCBAAA9gmHBCKDBAEA1QYAIYcEQADcBgAhiARAANwGACEDAAAACQAgLgAA5gwAIC8AAPAMACAcAAAACQAgFQAArgoAIBYAAK8KACAXAACwCgAgGAAAsQoAIBkAALIKACAaAACzCgAgGwAAtAoAIBwAALUKACAdAAC2CgAgHgAAuAoAIB8AALkKACAgAAC6CgAgIQAAuwoAICcAAPAMACCmAwEA1QYAIaoDQADWBgAhqwNAANYGACHAAwEA2wYAIckDAQDVBgAh1AMBANsGACHbAyAAnAcAIZAEAQDbBgAhkQQBANsGACGTBAAArQqTBCKUBAEA2wYAIZUEIACcBwAhlgQBANsGACEaFQAArgoAIBYAAK8KACAXAACwCgAgGAAAsQoAIBkAALIKACAaAACzCgAgGwAAtAoAIBwAALUKACAdAAC2CgAgHgAAuAoAIB8AALkKACAgAAC6CgAgIQAAuwoAIKYDAQDVBgAhqgNAANYGACGrA0AA1gYAIcADAQDbBgAhyQMBANUGACHUAwEA2wYAIdsDIACcBwAhkAQBANsGACGRBAEA2wYAIZMEAACtCpMEIpQEAQDbBgAhlQQgAJwHACGWBAEA2wYAIQOmAwEAAAABxgMCAAAAAcgDAQAAAAEHpgMBAAAAAcYDAgAAAAHLAwEAAAAB0AMBAAAAAdMDAQAAAAHUAwEAAAAB3AMBAAAAAQemAwEAAAABxgMCAAAAAckDAQAAAAHKAxAAAAABywMBAAAAAcwDAgAAAAHNAwIAAAABEqYDAQAAAAGqA0AAAAABqwNAAAAAAcYDAgAAAAHLAwEAAAABzgMBAAAAAdADAQAAAAHRAwEAAAAB0gMBAAAAAdMDAQAAAAHUAwEAAAAB1QMBAAAAAdYDAQAAAAHXAwEAAAAB2AMBAAAAAdkDCAAAAAHaAwIAAAAB2wMgAAAAARC8AQAAuwgAIL4BAAC8CAAgwgEAAL0IACCmAwEAAAABqgNAAAAAAasDQAAAAAHGAwIAAAABywMBAAAAAc4DAQAAAAHQAwEAAAAB0gMBAAAAAdQDAQAAAAHbAyAAAAAB3QMBAAAAAd4DAQAAAAHfAwEAAAABAgAAAMMCACAuAAD1DAAgAwAAANoCACAuAAD1DAAgLwAA-QwAIBIAAADaAgAgJwAA-QwAILwBAACHCAAgvgEAAIgIACDCAQAAiQgAIKYDAQDVBgAhqgNAANYGACGrA0AA1gYAIcYDAgDpBgAhywMBANUGACHOAwEA1QYAIdADAQDVBgAh0gMBANsGACHUAwEA2wYAIdsDIACcBwAh3QMBANsGACHeAwEA2wYAId8DAQDbBgAhELwBAACHCAAgvgEAAIgIACDCAQAAiQgAIKYDAQDVBgAhqgNAANYGACGrA0AA1gYAIcYDAgDpBgAhywMBANUGACHOAwEA1QYAIdADAQDVBgAh0gMBANsGACHUAwEA2wYAIdsDIACcBwAh3QMBANsGACHeAwEA2wYAId8DAQDbBgAhELsBAAC6CAAgvAEAALsIACDCAQAAvQgAIKYDAQAAAAGqA0AAAAABqwNAAAAAAcYDAgAAAAHLAwEAAAABzgMBAAAAAdADAQAAAAHSAwEAAAAB1AMBAAAAAdsDIAAAAAHdAwEAAAAB3gMBAAAAAd8DAQAAAAECAAAAwwIAIC4AAPoMACADpgMBAAAAAcYDAgAAAAHIAwEAAAABAwAAANoCACAuAAD6DAAgLwAA_wwAIBIAAADaAgAgJwAA_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_AQAAhwcAIKYDAQAAAAHEAwEAAAABxgMCAAAAAckDAQAAAAHKAxAAAAABywMBAAAAAcwDAgAAAAHNAwIAAAABAgAAAOYCACAuAACjDQAgAwAAAOQCACAuAACjDQAgLwAApw0AIAsAAADkAgAgJwAApw0AIL8BAAD5BgAgpgMBANUGACHEAwEA1QYAIcYDAgDpBgAhyQMBANUGACHKAxAA-AYAIcsDAQDVBgAhzAMCAOkGACHNAwIA6QYAIQm_AQAA-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-WAgYQlwIBBQefAgIIngIDC50CBA-gAgYQoQIBBQ4ATjQAUTUAUkYAT0cAUAAAAAAABQ4ATjQAUTUAUkYAT0cAUAMHswICCLQCAwwAAQMHugICCLsCAwwAAQMOAFc0AFg1AFkAAAADDgBXNABYNQBZBQ4AabsByAJcvAHMAl2-AdACXsIB2QJhAboBAFsBugEAWwMOAGC6AQBbuwHUAl8BvQEAXgG7AdUCAAYOAGi6AdsCW7sB3wJivgHnAmTAAeMCY8EB8AJnAb8BAGEBvwEAYQMOAGa7AesCZb8BAGEBvQEAZAG7AewCAAG_AQBhBLsB8QIAvgHzAgDAAfICAMEB9AIABLsB9QIAvAH2AgC-AfcCAMIB-AIAAAAFDgBtNABwNQBxRgBuRwBvAAAAAAAFDgBtNABwNQBxRgBuRwBvAboBAFsBugEAWwUOAHY0AHk1AHpGAHdHAHgAAAAAAAUOAHY0AHk1AHpGAHdHAHgBugEAWwG6AQBbBQ4AfzQAggE1AIMBRgCAAUcAgQEAAAAAAAUOAH80AIIBNQCDAUYAgAFHAIEBAb0BAF4BvQEAXgUOAIgBNACLATUAjAFGAIkBRwCKAQAAAAAABQ4AiAE0AIsBNQCMAUYAiQFHAIoBAboBAFsBugEAWwUOAJEBNACUATUAlQFGAJIBRwCTAQAAAAAABQ4AkQE0AJQBNQCVAUYAkgFHAJMBAboB8QNbAboB9wNbBQ4AmgE0AJ0BNQCeAUYAmwFHAJwBAAAAAAAFDgCaATQAnQE1AJ4BRgCbAUcAnAEBvwEAYQG_AQBhBQ4AowE0AKYBNQCnAUYApAFHAKUBAAAAAAAFDgCjATQApgE1AKcBRgCkAUcApQEBvwEAYQG_AQBhAw4ArAE0AK0BNQCuAQAAAAMOAKwBNACtATUArgEBvwEAYQG_AQBhBQ4AswE0ALYBNQC3AUYAtAFHALUBAAAAAAAFDgCzATQAtgE1ALcBRgC0AUcAtQEBvQEAZAG9AQBkBQ4AvAE0AL8BNQDAAUYAvQFHAL4BAAAAAAAFDgC8ATQAvwE1AMABRgC9AUcAvgEBvwEAYQG_AQBhBQ4AxQE0AMgBNQDJAUYAxgFHAMcBAAAAAAAFDgDFATQAyAE1AMkBRgDGAUcAxwEBDAABAQwAAQMOAM4BNADPATUA0AEAAAADDgDOATQAzwE1ANABAQwAAQEMAAEDDgDVATQA1gE1ANcBAAAAAw4A1QE0ANYBNQDXAQAAAAMOAN0BNADeATUA3wEAAAADDgDdATQA3gE1AN8BIgIBI2EBJGMBJWQBJmUBKGcBKWkRKmoSK2wBLG4RLW8TMHABMXEBMnIRNnUUN3YYOHcKOXgKOnkKO3oKPHsKPX0KPn8RP4ABGUCDAQpBhQERQoYBGkOIAQpEiQEKRYoBEUiNARtJjgEhSo8BAkuQAQJMkQECTZIBAk6TAQJPlQECUJcBEVGYASJSmgECU5wBEVSdASNVngECVp8BAlegARFYowEkWaQBKlqlAQNbpgEDXKcBA12oAQNeqQEDX6sBA2CtARFhrgErYrMBA2O1ARFktgEsZboBA2a7AQNnvAERaL8BLWnAATNqwQEGa8IBBmzDAQZtxAEGbsUBBm_HAQZwyQERccoBNHLMAQZzzgERdM8BNXXQAQZ20QEGd9IBEXjVATZ51gE8etcBBHvYAQR82QEEfdoBBH7bAQR_3QEEgAHfARGBAeABPYIB5AEEgwHmARGEAecBPoUB6gEEhgHrAQSHAewBEYgB7wE_iQHwAUOKAfEBDYsB8gENjAHzAQ2NAfQBDY4B9QENjwH3AQ2QAfkBEZEB-gFEkgH9AQ2TAf8BEZQBgAJFlQGCAg2WAYMCDZcBhAIRmAGHAkaZAYgCSpoBiQIFmwGKAgWcAYsCBZ0BjAIFngGNAgWfAY8CBaABkQIRoQGSAkuiAZkCBaMBmwIRpAGcAkylAaICBaYBowIFpwGkAhGoAacCTakBqAJTqgGpAgmrAaoCCawBqwIJrQGsAgmuAa0CCa8BrwIJsAGxAhGxAbICVLIBtgIJswG4AhG0AbkCVbUBvAIJtgG9Agm3Ab4CEbgBwQJWuQHCAlrDAcQCW8QB-QJbxQH7AlvGAfwCW8cB_QJbyAH_AlvJAYEDEcoBggNqywGEA1vMAYYDEc0BhwNrzgGIA1vPAYkDW9ABigMR0QGNA2zSAY4DctMBjwNc1AGQA1zVAZEDXNYBkgNc1wGTA1zYAZUDXNkBlwMR2gGYA3PbAZoDXNwBnAMR3QGdA3TeAZ4DXN8BnwNc4AGgAxHhAaMDdeIBpAN74wGlA17kAaYDXuUBpwNe5gGoA17nAakDXugBqwNe6QGtAxHqAa4DfOsBsANe7AGyAxHtAbMDfe4BtANe7wG1A17wAbYDEfEBuQN-8gG6A4QB8wG7A1_0AbwDX_UBvQNf9gG-A1_3Ab8DX_gBwQNf-QHDAxH6AcQDhQH7AcYDX_wByAMR_QHJA4YB_gHKA1__AcsDX4ACzAMRgQLPA4cBggLQA40BgwLRA12EAtIDXYUC0wNdhgLUA12HAtUDXYgC1wNdiQLZAxGKAtoDjgGLAtwDXYwC3gMRjQLfA48BjgLgA12PAuEDXZAC4gMRkQLlA5ABkgLmA5YBkwLnA2GUAugDYZUC6QNhlgLqA2GXAusDYZgC7QNhmQLvAxGaAvADlwGbAvMDYZwC9QMRnQL2A5gBngL4A2GfAvkDYaAC-gMRoQL9A5kBogL-A58BowL_A2KkAoAEYqUCgQRipgKCBGKnAoMEYqgChQRiqQKHBBGqAogEoAGrAooEYqwCjAQRrQKNBKEBrgKOBGKvAo8EYrACkAQRsQKTBKIBsgKUBKgBswKVBGO0ApYEY7UClwRjtgKYBGO3ApkEY7gCmwRjuQKdBBG6Ap4EqQG7AqAEY7wCogQRvQKjBKoBvgKkBGO_AqUEY8ACpgQRwQKpBKsBwgKqBK8BwwKrBGTEAqwEZMUCrQRkxgKuBGTHAq8EZMgCsQRkyQKzBBHKArQEsAHLArYEZMwCuAQRzQK5BLEBzgK6BGTPArsEZNACvAQR0QK_BLIB0gLABLgB0wLBBGXUAsIEZdUCwwRl1gLEBGXXAsUEZdgCxwRl2QLJBBHaAsoEuQHbAswEZdwCzgQR3QLPBLoB3gLQBGXfAtEEZeAC0gQR4QLVBLsB4gLWBMEB4wLXBGfkAtgEZ-UC2QRn5gLaBGfnAtsEZ-gC3QRn6QLfBBHqAuAEwgHrAuIEZ-wC5AQR7QLlBMMB7gLmBGfvAucEZ_AC6AQR8QLrBMQB8gLsBMoB8wLtBA70Au4EDvUC7wQO9gLwBA73AvEEDvgC8wQO-QL1BBH6AvYEywH7AvgEDvwC-gQR_QL7BMwB_gL8BA7_Av0EDoAD_gQRgQOBBc0BggOCBdEBgwODBQ-EA4QFD4UDhQUPhgOGBQ-HA4cFD4gDiQUPiQOLBRGKA4wF0gGLA44FD4wDkAURjQORBdMBjgOSBQ-PA5MFD5ADlAURkQOXBdQBkgOYBdgBkwOaBdkBlAObBdkBlQOeBdkBlgOfBdkBlwOgBdkBmAOiBdkBmQOkBRGaA6UF2gGbA6cF2QGcA6kFEZ0DqgXbAZ4DqwXZAZ8DrAXZAaADrQURoQOwBdwBogOxBeAB"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { stripe } from "@better-auth/stripe";
import Stripe from "stripe";
var stripeClient = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-03-25.dahlia"
});
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  emailAndPassword: {
    enabled: true
  },
  baseURL: env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    }
  },
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false
      },
      role: {
        type: "string",
        required: false,
        defaultValue: UserRole.CLIENT,
        input: false
      },
      bio: {
        type: "string",
        required: false
      }
    }
  },
  trustedOrigins: [env.FRONTEND_URL],
  plugins: [
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      createCustomerOnSignUp: true
    })
  ]
});

// src/module/auth/auth.service.ts
var getMeFromDB = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      image: true,
      bio: true,
      isActive: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true
    }
  });
  if (!user) {
    throw new AppError(404, "User not found", "USER_NOT_FOUND");
  }
  return user;
};
var getMySessionFromRequest = async (userId) => {
  const user = await getMeFromDB(userId);
  return user;
};
var registerIntoDB = async (payload, headers) => {
  const { name, email: email3, password, phone, role } = payload;
  if (!name?.trim()) {
    throw new AppError(400, "Name is required", "NAME_REQUIRED");
  }
  if (!email3?.trim()) {
    throw new AppError(400, "Email is required", "EMAIL_REQUIRED");
  }
  if (!password?.trim()) {
    throw new AppError(400, "Password is required", "PASSWORD_REQUIRED");
  }
  if (password.length < 6) {
    throw new AppError(
      400,
      "Password must be at least 6 characters",
      "WEAK_PASSWORD"
    );
  }
  const normalizedEmail = email3.trim().toLowerCase();
  const normalizedPhone = phone?.trim();
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: normalizedEmail },
        ...normalizedPhone ? [{ phone: normalizedPhone }] : []
      ]
    },
    select: {
      id: true,
      email: true,
      phone: true
    }
  });
  if (existingUser?.email === normalizedEmail) {
    throw new AppError(409, "Email already exists", "EMAIL_ALREADY_EXISTS");
  }
  if (normalizedPhone && existingUser?.phone === normalizedPhone) {
    throw new AppError(409, "Phone already exists", "PHONE_ALREADY_EXISTS");
  }
  const response = await auth.api.signUpEmail({
    headers,
    asResponse: true,
    body: {
      name: name.trim(),
      email: normalizedEmail,
      password,
      ...normalizedPhone ? { phone: normalizedPhone } : {},
      ...role ? { role } : {}
    }
  });
  return response;
};
var loginFromDB = async (payload, headers) => {
  const { email: email3, password } = payload;
  if (!email3?.trim()) {
    throw new AppError(400, "Email is required", "EMAIL_REQUIRED");
  }
  if (!password?.trim()) {
    throw new AppError(400, "Password is required", "PASSWORD_REQUIRED");
  }
  const normalizedEmail = email3.trim().toLowerCase();
  const existingUser = await prisma.user.findUnique({
    where: {
      email: normalizedEmail
    },
    select: {
      id: true,
      isActive: true
    }
  });
  if (!existingUser) {
    throw new AppError(404, "User not found", "USER_NOT_FOUND");
  }
  if (!existingUser.isActive) {
    throw new AppError(403, "Account is inactive", "ACCOUNT_INACTIVE");
  }
  const response = await auth.api.signInEmail({
    headers,
    asResponse: true,
    body: {
      email: normalizedEmail,
      password
    }
  });
  return response;
};
var logoutFromDB = async (headers) => {
  const response = await auth.api.signOut({
    headers,
    asResponse: true
  });
  return response;
};
var getAllUsersFromDB = async (user, query) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  if (user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Only admin can view all users", "FORBIDDEN");
  }
  const andConditions = [];
  if (query.searchTerm) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: query.searchTerm,
            mode: "insensitive"
          }
        },
        {
          email: {
            contains: query.searchTerm,
            mode: "insensitive"
          }
        },
        {
          phone: {
            contains: query.searchTerm,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.role && [UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.CLIENT].includes(
    query.role
  )) {
    andConditions.push({
      role: query.role
    });
  }
  if (query.isActive === "true") {
    andConditions.push({
      isActive: true
    });
  }
  if (query.isActive === "false") {
    andConditions.push({
      isActive: false
    });
  }
  const whereClause = andConditions.length > 0 ? { AND: andConditions } : {};
  const users = await prisma.user.findMany({
    where: whereClause,
    orderBy: {
      createdAt: "desc"
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      image: true,
      bio: true,
      isActive: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          clientOffers: true,
          clientProjects: true,
          assignedProjects: true,
          notifications: true
        }
      }
    }
  });
  return users;
};
var AuthService = {
  registerIntoDB,
  loginFromDB,
  logoutFromDB,
  getMeFromDB,
  getMySessionFromRequest,
  getAllUsersFromDB
};

// src/module/auth/auth.controller.ts
var buildHeaders = (req) => {
  const headers = new Headers();
  Object.entries(req.headers).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => headers.append(key, v));
    } else if (value !== void 0) {
      headers.append(key, String(value));
    }
  });
  return headers;
};
var forwardBetterAuthResponse = async (authResponse, res) => {
  authResponse.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      res.append("set-cookie", value);
    } else {
      res.setHeader(key, value);
    }
  });
  const contentType = authResponse.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const data = await authResponse.json();
    return res.status(authResponse.status).json(data);
  }
  const text = await authResponse.text();
  return res.status(authResponse.status).send(text);
};
var register = catchAsync_default(async (req, res) => {
  const response = await AuthService.registerIntoDB(
    req.body,
    buildHeaders(req)
  );
  return forwardBetterAuthResponse(response, res);
});
var login = catchAsync_default(async (req, res) => {
  const response = await AuthService.loginFromDB(req.body, buildHeaders(req));
  return forwardBetterAuthResponse(response, res);
});
var logout = catchAsync_default(async (req, res) => {
  const response = await AuthService.logoutFromDB(buildHeaders(req));
  return forwardBetterAuthResponse(response, res);
});
var getMe = catchAsync_default(async (req, res) => {
  if (!req.user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  const user = await AuthService.getMeFromDB(req.user.id);
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Profile retrieved successfully",
    data: user
  });
});
var getMySession = catchAsync_default(async (req, res) => {
  if (!req.user?.id || !req.session) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  const user = await AuthService.getMySessionFromRequest(req.user.id);
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Session retrieved successfully",
    data: {
      user,
      session: req.session
    }
  });
});
var getAllUsers = catchAsync_default(async (req, res) => {
  const result = await AuthService.getAllUsersFromDB(req.user, req.query);
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    data: result
  });
});
var AuthController = {
  register,
  login,
  logout,
  getMe,
  getMySession,
  getAllUsers
};

// src/middlewares/auth.guard.ts
var authGuard = (...roles) => catchAsync_default(async (req, _res, next) => {
  const session = await auth.api.getSession({
    headers: req.headers
  });
  if (!session) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  req.user = session.user;
  req.session = session.session;
  if (roles.length > 0 && req.user?.role && !roles.includes(req.user.role)) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }
  next();
});
var auth_guard_default = authGuard;

// src/module/auth/auth.route.ts
var router = Router();
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post(
  "/logout",
  auth_guard_default("ADMIN", "EMPLOYEE", "CLIENT"),
  AuthController.logout
);
router.get(
  "/me",
  auth_guard_default("ADMIN", "EMPLOYEE", "CLIENT"),
  AuthController.getMe
);
router.get(
  "/session",
  auth_guard_default("ADMIN", "EMPLOYEE", "CLIENT"),
  AuthController.getMySession
);
router.get("/users", auth_guard_default("ADMIN"), AuthController.getAllUsers);
var AuthRoutes = router;

// src/module/message/message.route.ts
import { Router as Router2 } from "express";

// src/module/message/message.service.ts
var getConversationTypeEnum = (conversationType) => {
  if (conversationType === "ADMIN_CLIENT") {
    return MessageConversationType.ADMIN_CLIENT;
  }
  if (conversationType === "DIRECT") {
    return MessageConversationType.DIRECT;
  }
  return MessageConversationType.ADMIN_EMPLOYEE;
};
var validateConversationAccess = async (user, projectId, conversationType) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      projectId: true,
      title: true,
      clientId: true,
      assignedEmployeeId: true,
      assignedByAdminId: true
    }
  });
  if (!project) {
    throw new AppError(404, "Project not found", "PROJECT_NOT_FOUND");
  }
  if (conversationType === "ADMIN_CLIENT") {
    if (user.role === UserRole.CLIENT && project.clientId !== user.id) {
      throw new AppError(403, "Forbidden", "FORBIDDEN");
    }
    if (user.role === UserRole.EMPLOYEE) {
      throw new AppError(
        403,
        "Employee cannot access admin-client conversation",
        "FORBIDDEN"
      );
    }
    if (user.role === UserRole.ADMIN) {
      return project;
    }
    if (user.role === UserRole.CLIENT) {
      return project;
    }
  }
  if (conversationType === "ADMIN_EMPLOYEE") {
    if (user.role === UserRole.CLIENT) {
      throw new AppError(
        403,
        "Client cannot access admin-employee conversation",
        "FORBIDDEN"
      );
    }
    if (user.role === UserRole.EMPLOYEE && project.assignedEmployeeId !== user.id) {
      throw new AppError(
        403,
        "You are not assigned to this project",
        "FORBIDDEN"
      );
    }
    if (user.role === UserRole.ADMIN || user.role === UserRole.EMPLOYEE) {
      return project;
    }
  }
  throw new AppError(403, "Forbidden", "FORBIDDEN");
};
var createNotificationForUsers = async ({
  receiverIds,
  projectId,
  projectCode,
  conversationType,
  senderRole
}) => {
  const uniqueReceiverIds = [...new Set(receiverIds.filter(Boolean))];
  if (!uniqueReceiverIds.length) {
    return;
  }
  const conversationLabel = conversationType === "ADMIN_CLIENT" ? "admin-client conversation" : "admin-employee conversation";
  const senderLabel = senderRole === UserRole.ADMIN ? "Admin" : senderRole === UserRole.EMPLOYEE ? "Employee" : "Client";
  await prisma.notification.createMany({
    data: uniqueReceiverIds.map((userId) => ({
      userId,
      projectId,
      type: NotificationType.NEW_MESSAGE,
      title: "New message received",
      body: `${senderLabel} sent a new message in ${conversationLabel} for project ${projectCode}`
    }))
  });
};
var createMessageIntoDB = async (user, payload) => {
  const { projectId, text, type, conversationType } = payload;
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  if (!projectId) {
    throw new AppError(400, "Project id is required", "PROJECT_ID_REQUIRED");
  }
  if (!conversationType) {
    throw new AppError(
      400,
      "Conversation type is required",
      "CONVERSATION_TYPE_REQUIRED"
    );
  }
  if (!text || !text.trim()) {
    throw new AppError(
      400,
      "Message text is required",
      "MESSAGE_TEXT_REQUIRED"
    );
  }
  const project = await validateConversationAccess(
    user,
    projectId,
    conversationType
  );
  const senderTypeMap = {
    ADMIN: MessageSenderType.ADMIN,
    EMPLOYEE: MessageSenderType.EMPLOYEE,
    CLIENT: MessageSenderType.CLIENT
  };
  const message = await prisma.message.create({
    data: {
      projectId,
      senderId: user.id,
      senderType: senderTypeMap[user.role || "CLIENT"] || MessageSenderType.CLIENT,
      conversationType: getConversationTypeEnum(conversationType),
      type: type || MessageType.TEXT,
      text: text.trim()
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          image: true
        }
      },
      project: {
        select: {
          id: true,
          projectId: true,
          title: true,
          clientId: true,
          assignedEmployeeId: true,
          assignedByAdminId: true
        }
      },
      attachments: true
    }
  });
  await prisma.project.update({
    where: { id: projectId },
    data: {
      updatedAt: /* @__PURE__ */ new Date()
    }
  });
  const notificationReceiverIds = [];
  if (conversationType === "ADMIN_CLIENT") {
    if (project.clientId && project.clientId !== user.id) {
      notificationReceiverIds.push(project.clientId);
    }
    if (project.assignedByAdminId && project.assignedByAdminId !== user.id) {
      notificationReceiverIds.push(project.assignedByAdminId);
    }
  }
  if (conversationType === "ADMIN_EMPLOYEE") {
    if (project.assignedEmployeeId && project.assignedEmployeeId !== user.id) {
      notificationReceiverIds.push(project.assignedEmployeeId);
    }
    if (project.assignedByAdminId && project.assignedByAdminId !== user.id) {
      notificationReceiverIds.push(project.assignedByAdminId);
    }
  }
  await createNotificationForUsers({
    receiverIds: notificationReceiverIds,
    projectId: project.id,
    projectCode: project.projectId,
    conversationType,
    senderRole: user.role
  });
  const roomKey = `project:${projectId}:${conversationType}`;
  io.to(roomKey).emit("message:new", message);
  io.to(`user:${message.senderId}`).emit("message:new", message);
  if (conversationType === "ADMIN_CLIENT" && message.project?.clientId && message.project.clientId !== message.senderId) {
    io.to(`user:${message.project.clientId}`).emit("message:new", message);
  }
  if (conversationType === "ADMIN_CLIENT" && message.project?.assignedByAdminId && message.project.assignedByAdminId !== message.senderId) {
    io.to(`user:${message.project.assignedByAdminId}`).emit(
      "message:new",
      message
    );
  }
  if (conversationType === "ADMIN_EMPLOYEE" && message.project?.assignedEmployeeId && message.project.assignedEmployeeId !== message.senderId) {
    io.to(`user:${message.project.assignedEmployeeId}`).emit(
      "message:new",
      message
    );
  }
  if (conversationType === "ADMIN_EMPLOYEE" && message.project?.assignedByAdminId && message.project.assignedByAdminId !== message.senderId) {
    io.to(`user:${message.project.assignedByAdminId}`).emit(
      "message:new",
      message
    );
  }
  return message;
};
var getMessagesFromDB = async (user, projectId, conversationType) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  if (!projectId) {
    throw new AppError(400, "Project id is required", "PROJECT_ID_REQUIRED");
  }
  if (!conversationType) {
    throw new AppError(
      400,
      "Conversation type is required",
      "CONVERSATION_TYPE_REQUIRED"
    );
  }
  await validateConversationAccess(user, projectId, conversationType);
  const messages = await prisma.message.findMany({
    where: {
      projectId,
      conversationType: getConversationTypeEnum(conversationType)
    },
    orderBy: {
      createdAt: "asc"
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          role: true,
          image: true
        }
      },
      attachments: true,
      project: {
        select: {
          id: true,
          projectId: true,
          title: true,
          clientId: true,
          assignedEmployeeId: true,
          assignedByAdminId: true
        }
      }
    }
  });
  return messages;
};
var markMessageAsReadIntoDB = async (user, messageId) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  const message = await prisma.message.findUnique({
    where: { id: messageId },
    include: {
      project: {
        select: {
          id: true,
          clientId: true,
          assignedEmployeeId: true,
          assignedByAdminId: true
        }
      },
      sender: {
        select: {
          id: true,
          name: true,
          role: true
        }
      }
    }
  });
  if (!message) {
    throw new AppError(404, "Message not found", "MESSAGE_NOT_FOUND");
  }
  await validateConversationAccess(
    user,
    message.projectId,
    message.conversationType
  );
  const updatedMessage = await prisma.message.update({
    where: { id: messageId },
    data: {
      isRead: true
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          role: true,
          image: true
        }
      },
      attachments: true,
      project: {
        select: {
          id: true,
          projectId: true,
          title: true,
          clientId: true,
          assignedEmployeeId: true,
          assignedByAdminId: true
        }
      }
    }
  });
  const roomKey = `project:${updatedMessage.projectId}:${updatedMessage.conversationType}`;
  io.to(roomKey).emit("message:read", {
    messageId: updatedMessage.id,
    isRead: updatedMessage.isRead,
    projectId: updatedMessage.projectId,
    conversationType: updatedMessage.conversationType,
    readByUserId: user.id
  });
  io.to(`user:${updatedMessage.senderId}`).emit("message:read", {
    messageId: updatedMessage.id,
    isRead: updatedMessage.isRead,
    projectId: updatedMessage.projectId,
    conversationType: updatedMessage.conversationType,
    readByUserId: user.id
  });
  return updatedMessage;
};
var findAvailableAdmin = async () => {
  const admin = await prisma.user.findFirst({
    where: {
      role: UserRole.ADMIN,
      isActive: true
    },
    orderBy: {
      createdAt: "asc"
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true
    }
  });
  if (!admin) {
    throw new AppError(404, "No admin available", "ADMIN_NOT_FOUND");
  }
  return admin;
};
var findExistingDirectConversationAdmin = async (userId) => {
  const lastDirectMessage = await prisma.message.findFirst({
    where: {
      conversationType: MessageConversationType.DIRECT,
      OR: [{ senderId: userId }, { receiverId: userId }],
      sender: { role: UserRole.ADMIN }
    },
    orderBy: { createdAt: "desc" },
    select: { senderId: true }
  });
  if (lastDirectMessage) {
    const admin = await prisma.user.findFirst({
      where: {
        id: lastDirectMessage.senderId,
        role: UserRole.ADMIN,
        isActive: true
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true
      }
    });
    if (admin) return admin;
  }
  const lastReceivedMessage = await prisma.message.findFirst({
    where: {
      conversationType: MessageConversationType.DIRECT,
      senderId: userId,
      receiverId: { not: null }
    },
    orderBy: { createdAt: "desc" },
    select: { receiverId: true }
  });
  if (lastReceivedMessage?.receiverId) {
    const admin = await prisma.user.findFirst({
      where: {
        id: lastReceivedMessage.receiverId,
        role: UserRole.ADMIN,
        isActive: true
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true
      }
    });
    if (admin) return admin;
  }
  return null;
};
var createDirectMessageIntoDB = async (user, payload) => {
  const { text } = payload;
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  if (!text || !text.trim()) {
    throw new AppError(
      400,
      "Message text is required",
      "MESSAGE_TEXT_REQUIRED"
    );
  }
  if (text.trim().length > 2e3) {
    throw new AppError(
      400,
      "Message text cannot exceed 2000 characters",
      "MESSAGE_TEXT_TOO_LONG"
    );
  }
  let admin = await findExistingDirectConversationAdmin(user.id);
  if (!admin) {
    admin = await findAvailableAdmin();
  }
  const senderTypeMap = {
    ADMIN: MessageSenderType.ADMIN,
    EMPLOYEE: MessageSenderType.EMPLOYEE,
    CLIENT: MessageSenderType.CLIENT
  };
  const message = await prisma.message.create({
    data: {
      senderId: user.id,
      receiverId: admin.id,
      senderType: senderTypeMap[user.role || "CLIENT"] || MessageSenderType.CLIENT,
      conversationType: MessageConversationType.DIRECT,
      type: MessageType.TEXT,
      text: text.trim(),
      projectId: null
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          image: true
        }
      },
      receiver: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          image: true
        }
      },
      attachments: true
    }
  });
  await prisma.notification.create({
    data: {
      userId: admin.id,
      type: NotificationType.NEW_MESSAGE,
      title: "New direct message",
      body: `${message.sender.name || "A user"} sent you a direct message`
    }
  });
  io.to(`user:${user.id}`).emit("direct-message:new", message);
  io.to(`user:${admin.id}`).emit("direct-message:new", message);
  return message;
};
var createAdminDirectReplyIntoDB = async (user, payload) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  if (user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }
  const { receiverId, text } = payload;
  if (!receiverId || !receiverId.trim()) {
    throw new AppError(400, "Receiver id is required", "RECEIVER_ID_REQUIRED");
  }
  if (!text || !text.trim()) {
    throw new AppError(
      400,
      "Message text is required",
      "MESSAGE_TEXT_REQUIRED"
    );
  }
  if (text.trim().length > 2e3) {
    throw new AppError(
      400,
      "Message text cannot exceed 2000 characters",
      "MESSAGE_TEXT_TOO_LONG"
    );
  }
  const receiver = await prisma.user.findUnique({
    where: { id: receiverId.trim() },
    select: { id: true, name: true, role: true }
  });
  if (!receiver) {
    throw new AppError(404, "User not found", "USER_NOT_FOUND");
  }
  const conversationExists = await prisma.message.findFirst({
    where: {
      conversationType: MessageConversationType.DIRECT,
      OR: [{ senderId: receiverId.trim() }, { receiverId: receiverId.trim() }]
    },
    select: { id: true }
  });
  if (!conversationExists) {
    throw new AppError(
      404,
      "No conversation found with this user",
      "CONVERSATION_NOT_FOUND"
    );
  }
  const message = await prisma.message.create({
    data: {
      senderId: user.id,
      receiverId: receiverId.trim(),
      senderType: MessageSenderType.ADMIN,
      conversationType: MessageConversationType.DIRECT,
      type: MessageType.TEXT,
      text: text.trim(),
      projectId: null
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          image: true
        }
      },
      receiver: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          image: true
        }
      },
      attachments: true
    }
  });
  await prisma.notification.create({
    data: {
      userId: receiverId.trim(),
      type: NotificationType.NEW_MESSAGE,
      title: "New message from Admin",
      body: `Admin replied to your message`
    }
  });
  io.to(`user:${user.id}`).emit("direct-message:new", message);
  io.to(`user:${receiverId.trim()}`).emit("direct-message:new", message);
  return message;
};
var getDirectMessagesFromDB = async (user, otherUserId) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  let targetUserId;
  if (user.role === UserRole.ADMIN) {
    if (!otherUserId || !otherUserId.trim()) {
      throw new AppError(400, "User id is required", "USER_ID_REQUIRED");
    }
    targetUserId = otherUserId.trim();
  } else {
    const admin = await findExistingDirectConversationAdmin(user.id);
    if (!admin) {
      return [];
    }
    targetUserId = admin.id;
  }
  const messages = await prisma.message.findMany({
    where: {
      conversationType: MessageConversationType.DIRECT,
      OR: [
        { senderId: user.id, receiverId: targetUserId },
        { senderId: targetUserId, receiverId: user.id }
      ]
    },
    orderBy: { createdAt: "asc" },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          role: true,
          image: true
        }
      },
      receiver: {
        select: {
          id: true,
          name: true,
          role: true,
          image: true
        }
      },
      attachments: true
    }
  });
  return messages;
};
var getDirectInboxFromDB = async (user, pagination) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  if (user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }
  const page = pagination?.page && pagination.page > 0 ? Math.floor(pagination.page) : 1;
  const limit = pagination?.limit && pagination.limit > 0 ? Math.min(Math.floor(pagination.limit), 50) : 20;
  const skip = (page - 1) * limit;
  const allDirectMessages = await prisma.message.findMany({
    where: {
      conversationType: MessageConversationType.DIRECT
    },
    select: {
      senderId: true,
      receiverId: true
    },
    distinct: ["senderId", "receiverId"]
  });
  const userIdSet = /* @__PURE__ */ new Set();
  for (const msg of allDirectMessages) {
    if (msg.senderId !== user.id) userIdSet.add(msg.senderId);
    if (msg.receiverId && msg.receiverId !== user.id)
      userIdSet.add(msg.receiverId);
  }
  const uniqueUserIds = Array.from(userIdSet);
  const total = uniqueUserIds.length;
  const paginatedUserIds = uniqueUserIds.slice(skip, skip + limit);
  const inboxItems = await Promise.all(
    paginatedUserIds.map(async (userId) => {
      const [latestMessage, unreadCount, totalMessages, userInfo] = await Promise.all([
        prisma.message.findFirst({
          where: {
            conversationType: MessageConversationType.DIRECT,
            OR: [
              { senderId: userId, receiverId: user.id },
              { senderId: user.id, receiverId: userId }
            ]
          },
          orderBy: { createdAt: "desc" },
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                role: true,
                image: true
              }
            }
          }
        }),
        prisma.message.count({
          where: {
            conversationType: MessageConversationType.DIRECT,
            senderId: userId,
            receiverId: user.id,
            isRead: false
          }
        }),
        prisma.message.count({
          where: {
            conversationType: MessageConversationType.DIRECT,
            OR: [
              { senderId: userId, receiverId: user.id },
              { senderId: user.id, receiverId: userId }
            ]
          }
        }),
        prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            image: true
          }
        })
      ]);
      return {
        user: userInfo,
        lastMessageAt: latestMessage?.createdAt ?? null,
        unreadCount,
        totalMessages,
        latestMessage
      };
    })
  );
  inboxItems.sort((a, b) => {
    const dateA = a.lastMessageAt?.getTime() ?? 0;
    const dateB = b.lastMessageAt?.getTime() ?? 0;
    return dateB - dateA;
  });
  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    },
    data: inboxItems
  };
};
var markDirectConversationAsReadIntoDB = async (user, otherUserId) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  if (!otherUserId || !otherUserId.trim()) {
    throw new AppError(400, "User id is required", "USER_ID_REQUIRED");
  }
  const result = await prisma.message.updateMany({
    where: {
      conversationType: MessageConversationType.DIRECT,
      senderId: otherUserId.trim(),
      receiverId: user.id,
      isRead: false
    },
    data: {
      isRead: true
    }
  });
  io.to(`user:${user.id}`).emit("direct-message:conversation-read", {
    otherUserId: otherUserId.trim(),
    updatedCount: result.count
  });
  io.to(`user:${otherUserId.trim()}`).emit("direct-message:conversation-read", {
    otherUserId: user.id,
    updatedCount: result.count
  });
  return {
    otherUserId: otherUserId.trim(),
    updatedCount: result.count
  };
};
var MessageService = {
  createMessageIntoDB,
  getMessagesFromDB,
  markMessageAsReadIntoDB,
  markDirectConversationAsReadIntoDB,
  getDirectInboxFromDB,
  getDirectMessagesFromDB,
  createDirectMessageIntoDB,
  createAdminDirectReplyIntoDB
};

// src/module/message/message.controller.ts
var createMessage = catchAsync_default(async (req, res) => {
  const result = await MessageService.createMessageIntoDB(req.user, req.body);
  sendResponse_default(res, {
    statusCode: 201,
    success: true,
    message: "Message sent successfully",
    data: result
  });
});
var getMessages = catchAsync_default(async (req, res) => {
  const { projectId, conversationType } = req.query;
  const result = await MessageService.getMessagesFromDB(
    req.user,
    projectId,
    conversationType
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Messages retrieved successfully",
    data: result
  });
});
var markMessageAsRead = catchAsync_default(async (req, res) => {
  const result = await MessageService.markMessageAsReadIntoDB(
    req.user,
    req.params.id
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Message marked as read",
    data: result
  });
});
var createDirectMessage = catchAsync_default(async (req, res) => {
  const result = await MessageService.createDirectMessageIntoDB(
    req.user,
    req.body
  );
  sendResponse_default(res, {
    statusCode: 201,
    success: true,
    message: "Direct message sent successfully",
    data: result
  });
});
var createAdminDirectReply = catchAsync_default(
  async (req, res) => {
    const result = await MessageService.createAdminDirectReplyIntoDB(
      req.user,
      req.body
    );
    sendResponse_default(res, {
      statusCode: 201,
      success: true,
      message: "Reply sent successfully",
      data: result
    });
  }
);
var getDirectMessages = catchAsync_default(async (req, res) => {
  const result = await MessageService.getDirectMessagesFromDB(
    req.user,
    req.query.userId
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Direct messages retrieved successfully",
    data: result
  });
});
var getDirectInbox = catchAsync_default(async (req, res) => {
  const result = await MessageService.getDirectInboxFromDB(req.user, {
    page: Number(req.query.page),
    limit: Number(req.query.limit)
  });
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Direct inbox retrieved successfully",
    data: result
  });
});
var markDirectConversationAsRead = catchAsync_default(
  async (req, res) => {
    const result = await MessageService.markDirectConversationAsReadIntoDB(
      req.user,
      req.params.userId
    );
    sendResponse_default(res, {
      statusCode: 200,
      success: true,
      message: "Conversation marked as read",
      data: result
    });
  }
);
var MessageController = {
  createMessage,
  getMessages,
  markMessageAsRead,
  createDirectMessage,
  createAdminDirectReply,
  getDirectMessages,
  getDirectInbox,
  markDirectConversationAsRead
};

// src/module/message/message.route.ts
var router2 = Router2();
router2.post(
  "/",
  auth_guard_default("ADMIN", "EMPLOYEE", "CLIENT"),
  MessageController.createMessage
);
router2.get(
  "/",
  auth_guard_default("ADMIN", "EMPLOYEE", "CLIENT"),
  MessageController.getMessages
);
router2.patch(
  "/:id/read",
  auth_guard_default("ADMIN", "EMPLOYEE", "CLIENT"),
  MessageController.markMessageAsRead
);
router2.post(
  "/direct",
  auth_guard_default("CLIENT", "ADMIN"),
  MessageController.createDirectMessage
);
router2.post(
  "/direct/reply",
  auth_guard_default("ADMIN"),
  MessageController.createAdminDirectReply
);
router2.get(
  "/direct",
  auth_guard_default("ADMIN", "CLIENT", "EMPLOYEE"),
  MessageController.getDirectMessages
);
router2.get(
  "/direct/inbox",
  auth_guard_default("ADMIN"),
  MessageController.getDirectInbox
);
router2.patch(
  "/direct/:userId/read",
  auth_guard_default("ADMIN", "CLIENT", "EMPLOYEE"),
  MessageController.markDirectConversationAsRead
);
var MessageRoutes = router2;

// src/module/offer/offer.route.ts
import { Router as Router3 } from "express";

// src/module/offer/offer.service.ts
import { nanoid } from "nanoid";

// src/config/Stripe.config.ts
import Stripe2 from "stripe";
var stripeClient2 = new Stripe2(env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-03-25.dahlia"
});

// src/module/offer/offer.service.ts
var generateOfferId = () => {
  return `OFF-${nanoid(8)}`;
};
var generateProjectId = () => {
  return `PRJ-${nanoid(8)}`;
};
var createOfferIntoDB = async (user, payload) => {
  if (!user?.id || user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Only admin can create offer", "FORBIDDEN");
  }
  const client = await prisma.user.findUnique({
    where: { id: payload.clientId },
    select: {
      id: true,
      role: true,
      isActive: true
    }
  });
  if (!client) {
    throw new AppError(404, "Client not found", "CLIENT_NOT_FOUND");
  }
  if (client.role !== UserRole.CLIENT) {
    throw new AppError(
      400,
      "Offer can only be sent to a client",
      "INVALID_CLIENT"
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
      status: OfferStatus.PENDING
    },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true
        }
      },
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      }
    }
  });
  await prisma.notification.create({
    data: {
      userId: payload.clientId,
      offerId: offer.id,
      type: NotificationType.NEW_OFFER,
      title: "New offer received",
      body: `You received a new offer: ${offer.title}`
    }
  });
  return offer;
};
var getOffersFromDB = async (user) => {
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
      "FORBIDDEN"
    );
  }
  const offers = await prisma.offer.findMany({
    where: whereClause,
    orderBy: {
      createdAt: "desc"
    },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true
        }
      },
      admin: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      project: {
        select: {
          id: true,
          projectId: true,
          title: true,
          status: true
        }
      }
    }
  });
  return offers;
};
var getSingleOfferFromDB = async (user, offerId) => {
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
          phone: true
        }
      },
      admin: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      project: true,
      attachments: true
    }
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
var decideOfferIntoDB = async (user, offerId, payload) => {
  if (!user?.id || user.role !== UserRole.CLIENT) {
    throw new AppError(403, "Only client can respond to offer", "FORBIDDEN");
  }
  if (!payload?.action || !["ACCEPTED", "REJECTED"].includes(payload.action)) {
    throw new AppError(
      400,
      "Action must be ACCEPTED or REJECTED",
      "INVALID_ACTION"
    );
  }
  const offer = await prisma.offer.findUnique({
    where: { id: offerId },
    include: {
      project: true
    }
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
      "INVALID_OFFER_STATUS"
    );
  }
  if (offer.expiresAt && new Date(offer.expiresAt) < /* @__PURE__ */ new Date()) {
    throw new AppError(400, "Offer has expired", "OFFER_EXPIRED");
  }
  if (payload.action === "REJECTED") {
    const rejectedOffer = await prisma.offer.update({
      where: { id: offerId },
      data: {
        status: OfferStatus.REJECTED,
        rejectedAt: /* @__PURE__ */ new Date()
      }
    });
    await prisma.notification.create({
      data: {
        userId: offer.adminId,
        offerId: offer.id,
        type: NotificationType.OFFER_REJECTED,
        title: "Offer rejected",
        body: `Client rejected offer: ${offer.title}`
      }
    });
    return {
      offer: rejectedOffer,
      project: null
    };
  }
  if (offer.project) {
    throw new AppError(
      400,
      "Project already exists for this offer",
      "PROJECT_ALREADY_EXISTS"
    );
  }
  const result = await prisma.$transaction(async (tx) => {
    const updatedOffer = await tx.offer.update({
      where: { id: offerId },
      data: {
        status: OfferStatus.ACCEPTED,
        acceptedAt: /* @__PURE__ */ new Date()
      }
    });
    const createdProject = await tx.project.create({
      data: {
        projectId: generateProjectId(),
        title: updatedOffer.title,
        description: updatedOffer.description,
        serviceCategory: updatedOffer.title,
        budget: updatedOffer.price,
        deadline: new Date(
          Date.now() + updatedOffer.deliveryDays * 24 * 60 * 60 * 1e3
        ),
        status: ProjectStatus.NEW,
        clientId: updatedOffer.clientId,
        offerId: updatedOffer.id
      }
    });
    await tx.notification.create({
      data: {
        userId: updatedOffer.adminId,
        offerId: updatedOffer.id,
        projectId: createdProject.id,
        type: NotificationType.OFFER_ACCEPTED,
        title: "Offer accepted",
        body: `Client accepted offer: ${updatedOffer.title}`
      }
    });
    return {
      offer: updatedOffer,
      project: createdProject
    };
  });
  return result;
};
var createCheckoutSessionForOffer = async (user, offerId) => {
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
          stripeCustomerId: true
        }
      },
      project: {
        select: {
          id: true,
          projectId: true
        }
      }
    }
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
      "OFFER_NOT_ACCEPTED"
    );
  }
  const existingPayment = await prisma.payment.findFirst({
    where: {
      offerId: offer.id,
      status: "COMPLETED"
    }
  });
  if (existingPayment) {
    throw new AppError(400, "This offer is already paid", "ALREADY_PAID");
  }
  const pendingPayment = await prisma.payment.findFirst({
    where: {
      offerId: offer.id,
      status: "PENDING"
    }
  });
  if (pendingPayment?.stripeSessionId) {
    try {
      const existingSession = await stripeClient2.checkout.sessions.retrieve(
        pendingPayment.stripeSessionId
      );
      if (existingSession.status === "open" && existingSession.url) {
        return {
          checkoutUrl: existingSession.url,
          sessionId: existingSession.id,
          payment: pendingPayment
        };
      }
    } catch {
    }
  }
  const session = await stripeClient2.checkout.sessions.create({
    mode: "payment",
    customer: offer.client.stripeCustomerId || void 0,
    customer_email: !offer.client.stripeCustomerId ? offer.client.email || void 0 : void 0,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: offer.title,
            description: offer.description.slice(0, 500)
          },
          unit_amount: Math.round(Number(offer.price) * 100)
          // cents
        },
        quantity: 1
      }
    ],
    metadata: {
      offerId: offer.id,
      clientId: offer.clientId,
      projectId: offer.project?.id || ""
    },
    success_url: `${env.FRONTEND_URL}/client/offers/${offer.id}?payment=success`,
    cancel_url: `${env.FRONTEND_URL}/client/offers/${offer.id}?payment=cancelled`
  });
  if (pendingPayment) {
    await prisma.payment.update({
      where: { id: pendingPayment.id },
      data: {
        stripeSessionId: session.id
      }
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
        stripeSessionId: session.id
      }
    });
  }
  return {
    checkoutUrl: session.url,
    sessionId: session.id
  };
};
var OfferService = {
  createOfferIntoDB,
  getOffersFromDB,
  getSingleOfferFromDB,
  decideOfferIntoDB,
  createCheckoutSessionForOffer
};

// src/module/offer/offer.controller.ts
var createOffer = catchAsync_default(async (req, res) => {
  const result = await OfferService.createOfferIntoDB(req.user, req.body);
  sendResponse_default(res, {
    statusCode: 201,
    success: true,
    message: "Offer created successfully",
    data: result
  });
});
var getOffers = catchAsync_default(async (req, res) => {
  const result = await OfferService.getOffersFromDB(req.user);
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Offers retrieved successfully",
    data: result
  });
});
var getSingleOffer = catchAsync_default(async (req, res) => {
  const result = await OfferService.getSingleOfferFromDB(
    req.user,
    req.params.id
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Offer retrieved successfully",
    data: result
  });
});
var decideOffer = catchAsync_default(async (req, res) => {
  const result = await OfferService.decideOfferIntoDB(
    req.user,
    req.params.id,
    req.body
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: req.body.action === "ACCEPTED" ? "Offer accepted successfully" : "Offer rejected successfully",
    data: result
  });
});
var createCheckoutSession = catchAsync_default(
  async (req, res) => {
    const result = await OfferService.createCheckoutSessionForOffer(
      req.user,
      req.params.id
    );
    sendResponse_default(res, {
      statusCode: 200,
      success: true,
      message: "Checkout session created successfully",
      data: result
    });
  }
);
var OfferController = {
  createOffer,
  getOffers,
  getSingleOffer,
  decideOffer,
  createCheckoutSession
};

// src/module/offer/offer.route.ts
var router3 = Router3();
router3.post("/", auth_guard_default("ADMIN"), OfferController.createOffer);
router3.get("/", auth_guard_default("ADMIN", "CLIENT"), OfferController.getOffers);
router3.get(
  "/:id",
  auth_guard_default("ADMIN", "CLIENT"),
  OfferController.getSingleOffer
);
router3.patch("/:id/decision", auth_guard_default("CLIENT"), OfferController.decideOffer);
router3.post(
  "/:id/checkout",
  auth_guard_default("CLIENT"),
  OfferController.createCheckoutSession
);
var OfferRoutes = router3;

// src/module/project/project.route.ts
import { Router as Router4 } from "express";

// src/module/project/project.service.ts
var VALID_STATUS_TRANSITIONS = {
  NEW: [
    ProjectStatus.UNDER_REVIEW,
    ProjectStatus.ASSIGNED,
    ProjectStatus.CANCELLED
  ],
  UNDER_REVIEW: [
    ProjectStatus.ASSIGNED,
    ProjectStatus.ON_HOLD,
    ProjectStatus.CANCELLED
  ],
  ASSIGNED: [
    ProjectStatus.IN_PROGRESS,
    ProjectStatus.ON_HOLD,
    ProjectStatus.CANCELLED
  ],
  IN_PROGRESS: [
    ProjectStatus.WAITING_FOR_CLIENT,
    ProjectStatus.REVIEW,
    ProjectStatus.ON_HOLD,
    ProjectStatus.CANCELLED,
    ProjectStatus.COMPLETED
  ],
  WAITING_FOR_CLIENT: [
    ProjectStatus.IN_PROGRESS,
    ProjectStatus.REVIEW,
    ProjectStatus.ON_HOLD,
    ProjectStatus.CANCELLED
  ],
  REVIEW: [
    ProjectStatus.IN_PROGRESS,
    ProjectStatus.COMPLETED,
    ProjectStatus.ON_HOLD,
    ProjectStatus.CANCELLED
  ],
  COMPLETED: [],
  ON_HOLD: [
    ProjectStatus.UNDER_REVIEW,
    ProjectStatus.ASSIGNED,
    ProjectStatus.IN_PROGRESS,
    ProjectStatus.WAITING_FOR_CLIENT,
    ProjectStatus.REVIEW,
    ProjectStatus.CANCELLED
  ],
  CANCELLED: []
};
var ensureAuthorizedUser = (user) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
};
var ensureValidStatusTransition = (currentStatus, nextStatus) => {
  if (currentStatus === nextStatus) {
    throw new AppError(
      400,
      `Project is already in ${nextStatus} status`,
      "STATUS_ALREADY_SET"
    );
  }
  const allowedNextStatuses = VALID_STATUS_TRANSITIONS[currentStatus] || [];
  if (!allowedNextStatuses.includes(nextStatus)) {
    throw new AppError(
      400,
      `Invalid status transition from ${currentStatus} to ${nextStatus}`,
      "INVALID_STATUS_TRANSITION"
    );
  }
};
var getProjectsFromDB = async (user, query) => {
  ensureAuthorizedUser(user);
  const andConditions = [];
  if (query.searchTerm) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.searchTerm,
            mode: "insensitive"
          }
        },
        {
          projectId: {
            contains: query.searchTerm,
            mode: "insensitive"
          }
        },
        {
          description: {
            contains: query.searchTerm,
            mode: "insensitive"
          }
        },
        {
          serviceCategory: {
            contains: query.searchTerm,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.status) {
    andConditions.push({
      status: query.status
    });
  }
  if (user.role === UserRole.CLIENT) {
    andConditions.push({
      clientId: user.id
    });
  }
  if (user.role === UserRole.EMPLOYEE) {
    andConditions.push({
      assignedEmployeeId: user.id
    });
  }
  const whereClause = andConditions.length ? { AND: andConditions } : {};
  const projects = await prisma.project.findMany({
    where: whereClause,
    orderBy: {
      createdAt: "desc"
    },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true
        }
      },
      assignedEmployee: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true
        }
      },
      assignedByAdmin: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      offer: {
        select: {
          id: true,
          offerId: true,
          title: true,
          price: true,
          deliveryDays: true,
          status: true
        }
      },
      _count: {
        select: {
          messages: true,
          updates: true,
          attachments: true,
          notifications: true
        }
      }
    }
  });
  return projects;
};
var getSingleProjectFromDB = async (user, projectId) => {
  ensureAuthorizedUser(user);
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true
        }
      },
      assignedEmployee: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          image: true
        }
      },
      assignedByAdmin: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      offer: {
        select: {
          id: true,
          offerId: true,
          title: true,
          description: true,
          price: true,
          deliveryDays: true,
          revisions: true,
          note: true,
          status: true,
          expiresAt: true,
          createdAt: true
        }
      },
      attachments: {
        orderBy: {
          createdAt: "desc"
        }
      },
      _count: {
        select: {
          messages: true,
          updates: true,
          attachments: true,
          notifications: true
        }
      }
    }
  });
  if (!project) {
    throw new AppError(404, "Project not found", "PROJECT_NOT_FOUND");
  }
  if (user.role === UserRole.CLIENT && project.clientId !== user.id) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }
  if (user.role === UserRole.EMPLOYEE && project.assignedEmployeeId !== user.id) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }
  return project;
};
var assignEmployeeIntoDB = async (user, projectId, payload) => {
  ensureAuthorizedUser(user);
  if (user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Only admin can assign project", "FORBIDDEN");
  }
  if (!payload?.assignedEmployeeId) {
    throw new AppError(
      400,
      "assignedEmployeeId is required",
      "ASSIGNED_EMPLOYEE_ID_REQUIRED"
    );
  }
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      projectId: true,
      clientId: true,
      status: true,
      assignedEmployeeId: true
    }
  });
  if (!project) {
    throw new AppError(404, "Project not found", "PROJECT_NOT_FOUND");
  }
  if (project.status === ProjectStatus.COMPLETED || project.status === ProjectStatus.CANCELLED) {
    throw new AppError(
      400,
      `Cannot assign employee to a ${project.status.toLowerCase()} project`,
      "PROJECT_NOT_ASSIGNABLE"
    );
  }
  if (project.assignedEmployeeId === payload.assignedEmployeeId) {
    throw new AppError(
      400,
      "This employee is already assigned to the project",
      "EMPLOYEE_ALREADY_ASSIGNED"
    );
  }
  const employee = await prisma.user.findUnique({
    where: { id: payload.assignedEmployeeId },
    select: {
      id: true,
      role: true,
      isActive: true,
      name: true,
      email: true
    }
  });
  if (!employee) {
    throw new AppError(404, "Employee not found", "EMPLOYEE_NOT_FOUND");
  }
  if (employee.role !== UserRole.EMPLOYEE) {
    throw new AppError(
      400,
      "Selected user is not an employee",
      "INVALID_EMPLOYEE"
    );
  }
  if (!employee.isActive) {
    throw new AppError(
      400,
      "Employee account is inactive",
      "EMPLOYEE_INACTIVE"
    );
  }
  const result = await prisma.$transaction(async (tx) => {
    const updatedProject = await tx.project.update({
      where: { id: projectId },
      data: {
        assignedEmployeeId: payload.assignedEmployeeId,
        assignedByAdminId: user.id,
        status: project.status === ProjectStatus.NEW || project.status === ProjectStatus.UNDER_REVIEW || project.status === ProjectStatus.ON_HOLD ? ProjectStatus.ASSIGNED : project.status
      },
      include: {
        client: {
          select: {
            id: true,
            name: true
          }
        },
        assignedEmployee: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        assignedByAdmin: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    await tx.notification.create({
      data: {
        userId: payload.assignedEmployeeId,
        projectId: updatedProject.id,
        type: NotificationType.PROJECT_ASSIGNED,
        title: "New project assigned",
        body: `You have been assigned to project ${updatedProject.projectId}`
      }
    });
    await tx.notification.create({
      data: {
        userId: updatedProject.clientId,
        projectId: updatedProject.id,
        type: NotificationType.PROJECT_STATUS_CHANGED,
        title: "Project assigned",
        body: `Your project ${updatedProject.projectId} has been assigned to our team`
      }
    });
    return updatedProject;
  });
  return result;
};
var changeProjectStatusIntoDB = async (user, projectId, payload) => {
  ensureAuthorizedUser(user);
  if (user.role !== UserRole.ADMIN) {
    throw new AppError(
      403,
      "Only admin can change project status",
      "FORBIDDEN"
    );
  }
  if (!payload?.status) {
    throw new AppError(400, "status is required", "STATUS_REQUIRED");
  }
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      projectId: true,
      clientId: true,
      assignedEmployeeId: true,
      status: true
    }
  });
  if (!project) {
    throw new AppError(404, "Project not found", "PROJECT_NOT_FOUND");
  }
  ensureValidStatusTransition(project.status, payload.status);
  if (payload.status === ProjectStatus.IN_PROGRESS && !project.assignedEmployeeId) {
    throw new AppError(
      400,
      "Cannot move project to IN_PROGRESS without assigning an employee",
      "EMPLOYEE_ASSIGNMENT_REQUIRED"
    );
  }
  const result = await prisma.$transaction(async (tx) => {
    const updatedProject = await tx.project.update({
      where: { id: projectId },
      data: {
        status: payload.status
      },
      include: {
        client: {
          select: {
            id: true,
            name: true
          }
        },
        assignedEmployee: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        assignedByAdmin: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    await tx.notification.create({
      data: {
        userId: updatedProject.clientId,
        projectId: updatedProject.id,
        type: NotificationType.PROJECT_STATUS_CHANGED,
        title: "Project status updated",
        body: `Your project ${updatedProject.projectId} is now ${payload.status}`
      }
    });
    if (updatedProject.assignedEmployeeId) {
      await tx.notification.create({
        data: {
          userId: updatedProject.assignedEmployeeId,
          projectId: updatedProject.id,
          type: NotificationType.PROJECT_STATUS_CHANGED,
          title: "Project status changed",
          body: `Project ${updatedProject.projectId} is now ${payload.status}`
        }
      });
    }
    return updatedProject;
  });
  return result;
};
var ProjectService = {
  getProjectsFromDB,
  getSingleProjectFromDB,
  assignEmployeeIntoDB,
  changeProjectStatusIntoDB
};

// src/module/project/project.controller.ts
var getProjects = catchAsync_default(async (req, res) => {
  const result = await ProjectService.getProjectsFromDB(req.user, req.query);
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Projects retrieved successfully",
    data: result
  });
});
var getSingleProject = catchAsync_default(async (req, res) => {
  const result = await ProjectService.getSingleProjectFromDB(
    req.user,
    req.params.id
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Project retrieved successfully",
    data: result
  });
});
var assignEmployee = catchAsync_default(async (req, res) => {
  const result = await ProjectService.assignEmployeeIntoDB(
    req.user,
    req.params.id,
    req.body
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Employee assigned successfully",
    data: result
  });
});
var changeProjectStatus = catchAsync_default(async (req, res) => {
  const result = await ProjectService.changeProjectStatusIntoDB(
    req.user,
    req.params.id,
    req.body
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Project status updated successfully",
    data: result
  });
});
var ProjectController = {
  getProjects,
  getSingleProject,
  assignEmployee,
  changeProjectStatus
};

// src/module/project/project.route.ts
var router4 = Router4();
router4.get(
  "/",
  auth_guard_default("ADMIN", "EMPLOYEE", "CLIENT"),
  ProjectController.getProjects
);
router4.get(
  "/:id",
  auth_guard_default("ADMIN", "EMPLOYEE", "CLIENT"),
  ProjectController.getSingleProject
);
router4.patch(
  "/:id/assign",
  auth_guard_default("ADMIN"),
  ProjectController.assignEmployee
);
router4.patch(
  "/:id/status",
  auth_guard_default("ADMIN"),
  ProjectController.changeProjectStatus
);
var ProjectRoutes = router4;

// src/module/projectUpdate/projectUpdate.route.ts
import { Router as Router5 } from "express";

// src/module/projectUpdate/projectUpdate.service.ts
var ensureAuthorizedUser2 = (user) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
};
var createProjectUpdateIntoDB = async (user, payload) => {
  ensureAuthorizedUser2(user);
  if (user.role !== UserRole.ADMIN && user.role !== UserRole.EMPLOYEE) {
    throw new AppError(
      403,
      "Only admin or employee can create project update",
      "FORBIDDEN"
    );
  }
  if (!payload?.projectId) {
    throw new AppError(400, "projectId is required", "PROJECT_ID_REQUIRED");
  }
  if (!payload?.note?.trim()) {
    throw new AppError(400, "note is required", "NOTE_REQUIRED");
  }
  if (payload.progress !== void 0 && payload.progress !== null && (payload.progress < 0 || payload.progress > 100)) {
    throw new AppError(
      400,
      "progress must be between 0 and 100",
      "INVALID_PROGRESS"
    );
  }
  const project = await prisma.project.findUnique({
    where: { id: payload.projectId },
    select: {
      id: true,
      projectId: true,
      title: true,
      clientId: true,
      assignedEmployeeId: true,
      assignedByAdminId: true,
      status: true
    }
  });
  if (!project) {
    throw new AppError(404, "Project not found", "PROJECT_NOT_FOUND");
  }
  if (project.status === ProjectStatus.COMPLETED || project.status === ProjectStatus.CANCELLED) {
    throw new AppError(
      400,
      `Cannot add update to a ${project.status.toLowerCase()} project`,
      "PROJECT_UPDATE_NOT_ALLOWED"
    );
  }
  if (user.role === UserRole.EMPLOYEE && project.assignedEmployeeId !== user.id) {
    throw new AppError(
      403,
      "You are not assigned to this project",
      "FORBIDDEN"
    );
  }
  const result = await prisma.$transaction(async (tx) => {
    const update = await tx.projectUpdate.create({
      data: {
        projectId: payload.projectId,
        userId: user.id,
        progress: payload.progress ?? null,
        note: payload.note.trim(),
        issue: payload.issue?.trim() || null
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            role: true,
            email: true,
            image: true
          }
        },
        project: {
          select: {
            id: true,
            projectId: true,
            title: true,
            status: true,
            clientId: true,
            assignedEmployeeId: true
          }
        },
        attachments: true
      }
    });
    const shouldMoveToInProgress = project.status === ProjectStatus.NEW || project.status === ProjectStatus.ASSIGNED;
    if (shouldMoveToInProgress) {
      await tx.project.update({
        where: { id: payload.projectId },
        data: {
          status: ProjectStatus.IN_PROGRESS
        }
      });
    }
    await tx.notification.create({
      data: {
        userId: project.clientId,
        projectId: project.id,
        type: NotificationType.PROJECT_UPDATE,
        title: "Project updated",
        body: `New update on project ${project.projectId}`
      }
    });
    if (project.assignedByAdminId && project.assignedByAdminId !== user.id) {
      await tx.notification.create({
        data: {
          userId: project.assignedByAdminId,
          projectId: project.id,
          type: NotificationType.PROJECT_UPDATE,
          title: "Project update received",
          body: `A new update was added to project ${project.projectId}`
        }
      });
    }
    return update;
  });
  return result;
};
var getProjectUpdatesFromDB = async (user, query) => {
  ensureAuthorizedUser2(user);
  const whereClause = {};
  if (query.projectId) {
    const project = await prisma.project.findUnique({
      where: { id: query.projectId },
      select: {
        id: true,
        clientId: true,
        assignedEmployeeId: true
      }
    });
    if (!project) {
      throw new AppError(404, "Project not found", "PROJECT_NOT_FOUND");
    }
    if (user.role === UserRole.CLIENT && project.clientId !== user.id) {
      throw new AppError(403, "Forbidden", "FORBIDDEN");
    }
    if (user.role === UserRole.EMPLOYEE && project.assignedEmployeeId !== user.id) {
      throw new AppError(403, "Forbidden", "FORBIDDEN");
    }
    whereClause.projectId = query.projectId;
  } else {
    if (user.role === UserRole.CLIENT) {
      whereClause.project = {
        clientId: user.id
      };
    }
    if (user.role === UserRole.EMPLOYEE) {
      whereClause.project = {
        assignedEmployeeId: user.id
      };
    }
  }
  const updates = await prisma.projectUpdate.findMany({
    where: whereClause,
    orderBy: {
      createdAt: "desc"
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          role: true,
          image: true,
          email: true
        }
      },
      project: {
        select: {
          id: true,
          projectId: true,
          title: true,
          status: true,
          clientId: true,
          assignedEmployeeId: true
        }
      },
      attachments: {
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  });
  return updates;
};
var getSingleProjectUpdateFromDB = async (user, updateId) => {
  ensureAuthorizedUser2(user);
  const update = await prisma.projectUpdate.findUnique({
    where: { id: updateId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          role: true,
          image: true,
          email: true
        }
      },
      project: {
        select: {
          id: true,
          projectId: true,
          title: true,
          clientId: true,
          assignedEmployeeId: true,
          status: true
        }
      },
      attachments: {
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  });
  if (!update) {
    throw new AppError(
      404,
      "Project update not found",
      "PROJECT_UPDATE_NOT_FOUND"
    );
  }
  if (user.role === UserRole.CLIENT && update.project.clientId !== user.id) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }
  if (user.role === UserRole.EMPLOYEE && update.project.assignedEmployeeId !== user.id) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }
  return update;
};
var ProjectUpdateService = {
  createProjectUpdateIntoDB,
  getProjectUpdatesFromDB,
  getSingleProjectUpdateFromDB
};

// src/module/projectUpdate/projectUpdate.controller.ts
var createProjectUpdate = catchAsync_default(async (req, res) => {
  const result = await ProjectUpdateService.createProjectUpdateIntoDB(
    req.user,
    req.body
  );
  sendResponse_default(res, {
    statusCode: 201,
    success: true,
    message: "Project update created successfully",
    data: result
  });
});
var getProjectUpdates = catchAsync_default(async (req, res) => {
  const result = await ProjectUpdateService.getProjectUpdatesFromDB(
    req.user,
    req.query
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Project updates retrieved successfully",
    data: result
  });
});
var getSingleProjectUpdate = catchAsync_default(
  async (req, res) => {
    const result = await ProjectUpdateService.getSingleProjectUpdateFromDB(
      req.user,
      req.params.id
    );
    sendResponse_default(res, {
      statusCode: 200,
      success: true,
      message: "Project update retrieved successfully",
      data: result
    });
  }
);
var ProjectUpdateController = {
  createProjectUpdate,
  getProjectUpdates,
  getSingleProjectUpdate
};

// src/module/projectUpdate/projectUpdate.route.ts
var router5 = Router5();
router5.post(
  "/",
  auth_guard_default("ADMIN", "EMPLOYEE"),
  ProjectUpdateController.createProjectUpdate
);
router5.get(
  "/",
  auth_guard_default("ADMIN", "EMPLOYEE", "CLIENT"),
  ProjectUpdateController.getProjectUpdates
);
router5.get(
  "/:id",
  auth_guard_default("ADMIN", "EMPLOYEE", "CLIENT"),
  ProjectUpdateController.getSingleProjectUpdate
);
var ProjectUpdateRoutes = router5;

// src/module/attachment/attachment.route.ts
import { Router as Router6 } from "express";

// src/config/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
var cloudinary_default = cloudinary;

// src/module/attachment/attachment.service.ts
var checkProjectAccess = (user, project) => {
  if (!project) {
    throw new AppError(404, "Project not found", "PROJECT_NOT_FOUND");
  }
  if (user.role === UserRole.CLIENT && project.clientId !== user.id) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }
  if (user.role === UserRole.EMPLOYEE && project.assignedEmployeeId !== user.id) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }
};
var validateAttachmentOwnerAccess = async (user, payload) => {
  if (payload.messageId) {
    const message = await prisma.message.findUnique({
      where: { id: payload.messageId },
      include: {
        project: {
          select: {
            clientId: true,
            assignedEmployeeId: true
          }
        }
      }
    });
    if (!message) {
      throw new AppError(404, "Message not found", "MESSAGE_NOT_FOUND");
    }
    if (!message.project) {
      if (message.senderId !== user.id && user.role !== UserRole.ADMIN) {
        throw new AppError(403, "Forbidden", "FORBIDDEN");
      }
      return;
    }
    checkProjectAccess(user, message.project);
    return;
  }
  if (payload.projectId) {
    const project = await prisma.project.findUnique({
      where: { id: payload.projectId },
      select: {
        clientId: true,
        assignedEmployeeId: true
      }
    });
    checkProjectAccess(user, project);
    return;
  }
  if (payload.offerId) {
    const offer = await prisma.offer.findUnique({
      where: { id: payload.offerId },
      select: {
        clientId: true,
        adminId: true
      }
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
    if (user.role === UserRole.EMPLOYEE) {
      throw new AppError(
        403,
        "Employee cannot access offer attachments",
        "FORBIDDEN"
      );
    }
    return;
  }
  if (payload.projectUpdateId) {
    const update = await prisma.projectUpdate.findUnique({
      where: { id: payload.projectUpdateId },
      include: {
        project: {
          select: {
            clientId: true,
            assignedEmployeeId: true
          }
        }
      }
    });
    if (!update) {
      throw new AppError(
        404,
        "Project update not found",
        "PROJECT_UPDATE_NOT_FOUND"
      );
    }
    checkProjectAccess(user, update.project);
  }
};
var getAttachmentTypeFromMime = (mimeType) => {
  if (mimeType?.startsWith("image/")) {
    return AttachmentType.IMAGE;
  }
  return AttachmentType.FILE;
};
var createAttachmentIntoDB = async (user, payload) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  const relationCount = [
    payload.messageId,
    payload.projectId,
    payload.offerId,
    payload.projectUpdateId
  ].filter(Boolean).length;
  if (relationCount === 0) {
    throw new AppError(400, "Relation id required", "RELATION_ID_REQUIRED");
  }
  if (relationCount > 1) {
    throw new AppError(
      400,
      "Only one relation id allowed",
      "MULTIPLE_RELATION_IDS_NOT_ALLOWED"
    );
  }
  if (!payload.url?.trim()) {
    throw new AppError(400, "Attachment url is required", "URL_REQUIRED");
  }
  await validateAttachmentOwnerAccess(user, payload);
  return prisma.attachment.create({
    data: {
      type: payload.type || getAttachmentTypeFromMime(payload.mimeType) || AttachmentType.FILE,
      url: payload.url.trim(),
      publicId: payload.publicId ?? null,
      originalName: payload.originalName ?? null,
      mimeType: payload.mimeType ?? null,
      size: payload.size ?? null,
      uploadedById: user.id,
      messageId: payload.messageId ?? null,
      projectId: payload.projectId ?? null,
      offerId: payload.offerId ?? null,
      projectUpdateId: payload.projectUpdateId ?? null
    },
    include: {
      uploadedBy: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      }
    }
  });
};
var uploadAttachmentIntoDB = async (user, file2, payload) => {
  if (!file2) {
    throw new AppError(400, "File is required", "FILE_REQUIRED");
  }
  const uploadedFile = file2;
  return createAttachmentIntoDB(user, {
    ...payload,
    url: uploadedFile.path,
    publicId: uploadedFile.filename,
    originalName: uploadedFile.originalname,
    mimeType: uploadedFile.mimetype,
    size: uploadedFile.size,
    type: getAttachmentTypeFromMime(uploadedFile.mimetype)
  });
};
var getAttachmentsFromDB = async (user, query) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  const relationCount = [
    query.messageId,
    query.projectId,
    query.offerId,
    query.projectUpdateId
  ].filter(Boolean).length;
  if (relationCount === 0) {
    throw new AppError(400, "Relation id required", "RELATION_ID_REQUIRED");
  }
  if (relationCount > 1) {
    throw new AppError(
      400,
      "Only one relation id allowed",
      "MULTIPLE_RELATION_IDS_NOT_ALLOWED"
    );
  }
  await validateAttachmentOwnerAccess(user, query);
  return prisma.attachment.findMany({
    where: {
      messageId: query.messageId,
      projectId: query.projectId,
      offerId: query.offerId,
      projectUpdateId: query.projectUpdateId
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      uploadedBy: {
        select: {
          id: true,
          name: true,
          role: true,
          email: true
        }
      }
    }
  });
};
var getSingleAttachmentFromDB = async (user, attachmentId) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  const attachment = await prisma.attachment.findUnique({
    where: { id: attachmentId },
    include: {
      uploadedBy: true,
      message: { include: { project: true } },
      project: true,
      offer: true,
      projectUpdate: { include: { project: true } }
    }
  });
  if (!attachment) {
    throw new AppError(404, "Attachment not found", "ATTACHMENT_NOT_FOUND");
  }
  if (attachment.project) {
    checkProjectAccess(user, attachment.project);
  }
  if (attachment.message?.project) {
    checkProjectAccess(user, attachment.message.project);
  }
  if (attachment.projectUpdate?.project) {
    checkProjectAccess(user, attachment.projectUpdate.project);
  }
  if (attachment.offer) {
    if (user.role === UserRole.CLIENT && attachment.offer.clientId !== user.id) {
      throw new AppError(403, "Forbidden", "FORBIDDEN");
    }
    if (user.role === UserRole.ADMIN && attachment.offer.adminId !== user.id) {
      throw new AppError(403, "Forbidden", "FORBIDDEN");
    }
    if (user.role === UserRole.EMPLOYEE) {
      throw new AppError(403, "Forbidden", "FORBIDDEN");
    }
  }
  return attachment;
};
var deleteAttachmentFromDB = async (user, attachmentId) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  const attachment = await prisma.attachment.findUnique({
    where: { id: attachmentId },
    select: {
      id: true,
      uploadedById: true,
      publicId: true
    }
  });
  if (!attachment) {
    throw new AppError(404, "Attachment not found", "ATTACHMENT_NOT_FOUND");
  }
  if (user.role !== UserRole.ADMIN && attachment.uploadedById !== user.id) {
    throw new AppError(
      403,
      "Only admin or uploader can delete attachment",
      "FORBIDDEN"
    );
  }
  if (attachment.publicId) {
    await cloudinary_default.uploader.destroy(attachment.publicId, {
      resource_type: "auto"
    });
  }
  return prisma.attachment.delete({
    where: { id: attachmentId }
  });
};
var AttachmentService = {
  createAttachmentIntoDB,
  uploadAttachmentIntoDB,
  getAttachmentsFromDB,
  getSingleAttachmentFromDB,
  deleteAttachmentFromDB
};

// src/module/attachment/attachment.controller.ts
var uploadAttachment = catchAsync_default(async (req, res) => {
  const result = await AttachmentService.uploadAttachmentIntoDB(
    req.user,
    req.file,
    req.body
  );
  sendResponse_default(res, {
    statusCode: 201,
    success: true,
    message: "Attachment uploaded successfully",
    data: result
  });
});
var createAttachment = catchAsync_default(async (req, res) => {
  const result = await AttachmentService.createAttachmentIntoDB(
    req.user,
    req.body
  );
  sendResponse_default(res, {
    statusCode: 201,
    success: true,
    message: "Attachment created successfully",
    data: result
  });
});
var getAttachments = catchAsync_default(async (req, res) => {
  const result = await AttachmentService.getAttachmentsFromDB(
    req.user,
    req.query
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Attachments retrieved successfully",
    data: result
  });
});
var getSingleAttachment = catchAsync_default(async (req, res) => {
  const result = await AttachmentService.getSingleAttachmentFromDB(
    req.user,
    req.params.id
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Attachment retrieved successfully",
    data: result
  });
});
var deleteAttachment = catchAsync_default(async (req, res) => {
  const result = await AttachmentService.deleteAttachmentFromDB(
    req.user,
    req.params.id
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Attachment deleted successfully",
    data: result
  });
});
var AttachmentController = {
  uploadAttachment,
  createAttachment,
  getAttachments,
  getSingleAttachment,
  deleteAttachment
};

// src/middlewares/upload/attachment.upload.ts
import path2 from "path";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
var storage = new CloudinaryStorage({
  cloudinary: cloudinary_default,
  params: async (_req, file2) => {
    const fileExtension = path2.extname(file2.originalname);
    const fileNameWithoutExt = path2.basename(file2.originalname, fileExtension);
    const cleanFileName = fileNameWithoutExt.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
    const rawFormat = file2.mimetype.split("/")[1];
    const finalFormat = rawFormat === "svg+xml" ? "svg" : rawFormat;
    const isImage = file2.mimetype.startsWith("image/");
    return {
      folder: "attachments",
      resource_type: "auto",
      public_id: `${Date.now()}-${cleanFileName}`,
      ...isImage ? {
        format: finalFormat,
        transformation: [{ quality: "auto", fetch_format: "auto" }]
      } : {}
    };
  }
});
var fileFilter = (_req, file2, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "application/pdf",
    "application/zip",
    "application/x-zip-compressed",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain"
  ];
  if (allowedMimeTypes.includes(file2.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file format. Only jpg, jpeg, png, webp, gif, pdf, zip, doc, docx, txt are allowed."
      ),
      false
    );
  }
};
var multerOptions = {
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 2
  }
};
var uploadAttachment2 = multer(multerOptions);

// src/module/attachment/attachment.route.ts
var router6 = Router6();
router6.post(
  "/upload",
  auth_guard_default("ADMIN", "EMPLOYEE", "CLIENT"),
  uploadAttachment2.single("file"),
  AttachmentController.uploadAttachment
);
router6.post(
  "/",
  auth_guard_default("ADMIN", "EMPLOYEE", "CLIENT"),
  AttachmentController.createAttachment
);
router6.get(
  "/",
  auth_guard_default("ADMIN", "EMPLOYEE", "CLIENT"),
  AttachmentController.getAttachments
);
router6.get(
  "/:id",
  auth_guard_default("ADMIN", "EMPLOYEE", "CLIENT"),
  AttachmentController.getSingleAttachment
);
router6.delete(
  "/:id",
  auth_guard_default("ADMIN", "EMPLOYEE", "CLIENT"),
  AttachmentController.deleteAttachment
);
var AttachmentRoutes = router6;

// src/module/notification/notification.route.ts
import { Router as Router7 } from "express";

// src/module/notification/notification.service.ts
var getNotificationsFromDB = async (user, query) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  const andConditions = [{ userId: user.id }];
  if (query.isRead === "true") {
    andConditions.push({ isRead: true });
  }
  if (query.isRead === "false") {
    andConditions.push({ isRead: false });
  }
  if (query.type) {
    andConditions.push({ type: query.type });
  }
  const notifications = await prisma.notification.findMany({
    where: {
      AND: andConditions
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      project: {
        select: {
          id: true,
          projectId: true,
          title: true,
          status: true
        }
      },
      offer: {
        select: {
          id: true,
          offerId: true,
          title: true,
          status: true,
          price: true
        }
      }
    }
  });
  return notifications;
};
var getUnreadNotificationCountFromDB = async (user) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  const total = await prisma.notification.count({
    where: {
      userId: user.id,
      isRead: false
    }
  });
  return { unreadCount: total };
};
var getSingleNotificationFromDB = async (user, notificationId) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  const notification = await prisma.notification.findFirst({
    where: {
      id: notificationId,
      userId: user.id
    },
    include: {
      project: {
        select: {
          id: true,
          projectId: true,
          title: true,
          status: true
        }
      },
      offer: {
        select: {
          id: true,
          offerId: true,
          title: true,
          status: true,
          price: true
        }
      }
    }
  });
  if (!notification) {
    throw new AppError(404, "Notification not found", "NOTIFICATION_NOT_FOUND");
  }
  return notification;
};
var markNotificationAsReadIntoDB = async (user, notificationId) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  const notification = await prisma.notification.findFirst({
    where: {
      id: notificationId,
      userId: user.id
    }
  });
  if (!notification) {
    throw new AppError(404, "Notification not found", "NOTIFICATION_NOT_FOUND");
  }
  const updatedNotification = await prisma.notification.update({
    where: { id: notificationId },
    data: {
      isRead: true
    }
  });
  return updatedNotification;
};
var markAllNotificationsAsReadIntoDB = async (user) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  await prisma.notification.updateMany({
    where: {
      userId: user.id,
      isRead: false
    },
    data: {
      isRead: true
    }
  });
  return null;
};
var deleteNotificationFromDB = async (user, notificationId) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  const notification = await prisma.notification.findFirst({
    where: {
      id: notificationId,
      userId: user.id
    }
  });
  if (!notification) {
    throw new AppError(404, "Notification not found", "NOTIFICATION_NOT_FOUND");
  }
  const deletedNotification = await prisma.notification.delete({
    where: { id: notificationId }
  });
  return deletedNotification;
};
var NotificationService = {
  getNotificationsFromDB,
  getUnreadNotificationCountFromDB,
  getSingleNotificationFromDB,
  markNotificationAsReadIntoDB,
  markAllNotificationsAsReadIntoDB,
  deleteNotificationFromDB
};

// src/module/notification/notification.controller.ts
var getNotifications = catchAsync_default(async (req, res) => {
  const result = await NotificationService.getNotificationsFromDB(
    req.user,
    req.query
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Notifications retrieved successfully",
    data: result
  });
});
var getUnreadCount = catchAsync_default(async (req, res) => {
  const result = await NotificationService.getUnreadNotificationCountFromDB(
    req.user
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Unread notification count retrieved successfully",
    data: result
  });
});
var getSingleNotification = catchAsync_default(
  async (req, res) => {
    const result = await NotificationService.getSingleNotificationFromDB(
      req.user,
      req.params.id
    );
    sendResponse_default(res, {
      statusCode: 200,
      success: true,
      message: "Notification retrieved successfully",
      data: result
    });
  }
);
var markAsRead = catchAsync_default(async (req, res) => {
  const result = await NotificationService.markNotificationAsReadIntoDB(
    req.user,
    req.params.id
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Notification marked as read successfully",
    data: result
  });
});
var markAllAsRead = catchAsync_default(async (req, res) => {
  await NotificationService.markAllNotificationsAsReadIntoDB(req.user);
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "All notifications marked as read successfully",
    data: null
  });
});
var deleteNotification = catchAsync_default(async (req, res) => {
  const result = await NotificationService.deleteNotificationFromDB(
    req.user,
    req.params.id
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Notification deleted successfully",
    data: result
  });
});
var NotificationController = {
  getNotifications,
  getUnreadCount,
  getSingleNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification
};

// src/module/notification/notification.route.ts
var router7 = Router7();
router7.get(
  "/",
  auth_guard_default("ADMIN", "EMPLOYEE", "CLIENT"),
  NotificationController.getNotifications
);
router7.get(
  "/unread-count",
  auth_guard_default("ADMIN", "EMPLOYEE", "CLIENT"),
  NotificationController.getUnreadCount
);
router7.get(
  "/:id",
  auth_guard_default("ADMIN", "EMPLOYEE", "CLIENT"),
  NotificationController.getSingleNotification
);
router7.patch(
  "/:id/read",
  auth_guard_default("ADMIN", "EMPLOYEE", "CLIENT"),
  NotificationController.markAsRead
);
router7.patch(
  "/read-all",
  auth_guard_default("ADMIN", "EMPLOYEE", "CLIENT"),
  NotificationController.markAllAsRead
);
router7.delete(
  "/:id",
  auth_guard_default("ADMIN", "EMPLOYEE", "CLIENT"),
  NotificationController.deleteNotification
);
var NotificationRoutes = router7;

// src/module/publicMessage/publicMessage.route.ts
import { Router as Router8 } from "express";

// src/utils/publicVisitorSession.ts
import crypto from "crypto";
var VISITOR_ID_COOKIE = "public_visitor_id";
var VISITOR_TOKEN_COOKIE = "public_visitor_token";
var VISITOR_COOKIE_MAX_AGE = 1e3 * 60 * 60 * 24 * 30;
var getSecret = () => {
  const secret = process.env.PUBLIC_CHAT_SECRET;
  if (!secret) {
    throw new Error("PUBLIC_CHAT_SECRET is not set");
  }
  return secret;
};
var signVisitorId = (visitorId) => {
  return crypto.createHmac("sha256", getSecret()).update(visitorId).digest("hex");
};
var safeEqual = (a, b) => {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.length !== bBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(aBuffer, bBuffer);
};
var generateVisitorId = () => {
  return `visitor_${crypto.randomBytes(16).toString("hex")}`;
};
var parseCookies = (cookieHeader) => {
  const cookies = {};
  if (!cookieHeader) {
    return cookies;
  }
  cookieHeader.split(";").forEach((part) => {
    const [rawKey, ...rawValue] = part.split("=");
    const key = rawKey?.trim();
    const value = rawValue.join("=").trim();
    if (!key) return;
    cookies[key] = decodeURIComponent(value);
  });
  return cookies;
};
var getVisitorSessionFromRequest = (req) => {
  const cookies = parseCookies(req.headers.cookie);
  const visitorId = cookies[VISITOR_ID_COOKIE];
  const token = cookies[VISITOR_TOKEN_COOKIE];
  if (!visitorId || !token) {
    return null;
  }
  const expectedToken = signVisitorId(visitorId);
  if (!safeEqual(token, expectedToken)) {
    return null;
  }
  return {
    visitorId,
    token
  };
};
var setVisitorSession = (res, visitorId) => {
  const token = signVisitorId(visitorId);
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie(VISITOR_ID_COOKIE, visitorId, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: VISITOR_COOKIE_MAX_AGE,
    path: "/"
  });
  res.cookie(VISITOR_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: VISITOR_COOKIE_MAX_AGE,
    path: "/"
  });
  return { visitorId, token };
};
var ensureVisitorSession = (req, res) => {
  const existingSession = getVisitorSessionFromRequest(req);
  if (existingSession) {
    return existingSession;
  }
  const visitorId = generateVisitorId();
  return setVisitorSession(res, visitorId);
};
var verifyVisitorToken = (visitorId, token) => {
  const expectedToken = signVisitorId(visitorId);
  return safeEqual(token, expectedToken);
};
var PublicVisitorSession = {
  VISITOR_ID_COOKIE,
  VISITOR_TOKEN_COOKIE,
  generateVisitorId,
  signVisitorId,
  parseCookies,
  getVisitorSessionFromRequest,
  setVisitorSession,
  ensureVisitorSession,
  verifyVisitorToken
};

// src/module/publicMessage/publicMessage.service.ts
var MAX_MESSAGE_LENGTH = 2e3;
var normalizePagination = (pagination) => {
  const page = pagination?.page && pagination.page > 0 ? Math.floor(pagination.page) : 1;
  const limit = pagination?.limit && pagination.limit > 0 ? Math.min(Math.floor(pagination.limit), 50) : 20;
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};
var validateMessageText = (text) => {
  if (!text || !text.trim()) {
    throw new AppError(
      400,
      "Message text is required",
      "MESSAGE_TEXT_REQUIRED"
    );
  }
  if (text.trim().length > MAX_MESSAGE_LENGTH) {
    throw new AppError(
      400,
      `Message text cannot exceed ${MAX_MESSAGE_LENGTH} characters`,
      "MESSAGE_TEXT_TOO_LONG"
    );
  }
};
var findAssignedAdmin = async (visitorId) => {
  const latestConversationMessage = await prisma.publicMessage.findFirst({
    where: {
      visitorId,
      adminId: {
        not: null
      }
    },
    orderBy: {
      createdAt: "desc"
    },
    select: {
      adminId: true
    }
  });
  if (latestConversationMessage?.adminId) {
    const existingAdmin = await prisma.user.findFirst({
      where: {
        id: latestConversationMessage.adminId,
        role: UserRole.ADMIN,
        isActive: true
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });
    if (existingAdmin) {
      return existingAdmin;
    }
  }
  const fallbackAdmin = await prisma.user.findFirst({
    where: {
      role: UserRole.ADMIN,
      isActive: true
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    },
    orderBy: {
      createdAt: "asc"
    }
  });
  if (!fallbackAdmin) {
    throw new AppError(404, "Admin not found", "ADMIN_NOT_FOUND");
  }
  return fallbackAdmin;
};
var createVisitorMessageIntoDB = async (payload, req) => {
  const { text } = payload;
  validateMessageText(text);
  let visitorId = req.cookies?.visitor_id;
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    req.res.cookie("visitor_id", visitorId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });
  }
  const assignedAdmin = await findAssignedAdmin(visitorId);
  const message = await prisma.publicMessage.create({
    data: {
      visitorId,
      senderType: PublicSenderType.VISITOR,
      text: text.trim(),
      ipAddress: req.ip,
      adminId: assignedAdmin?.id ?? null
    },
    include: {
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      }
    }
  });
  io.to(`visitor:${visitorId}`).emit("public-message:new", message);
  if (assignedAdmin?.id) {
    io.to(`user:${assignedAdmin.id}`).emit("public-message:new", message);
  }
  return {
    message,
    visitor: {
      visitorId
    }
  };
};
var createAdminReplyIntoDB = async (user, payload) => {
  const { visitorId, text } = payload;
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  if (user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }
  if (!visitorId || !visitorId.trim()) {
    throw new AppError(400, "Visitor id is required", "VISITOR_ID_REQUIRED");
  }
  validateMessageText(text);
  const conversationExists = await prisma.publicMessage.findFirst({
    where: {
      visitorId: visitorId.trim()
    },
    select: {
      id: true
    }
  });
  if (!conversationExists) {
    throw new AppError(
      404,
      "Conversation not found for this visitor",
      "CONVERSATION_NOT_FOUND"
    );
  }
  const message = await prisma.publicMessage.create({
    data: {
      visitorId: visitorId.trim(),
      text: text.trim(),
      senderType: PublicSenderType.ADMIN,
      adminId: user.id,
      ipAddress: null
    },
    include: {
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      }
    }
  });
  io.to(`visitor:${message.visitorId}`).emit("public-message:new", message);
  io.to(`user:${user.id}`).emit("public-message:new", message);
  return message;
};
var getVisitorMessagesFromDB = async (visitorId, pagination) => {
  if (!visitorId || !visitorId.trim()) {
    throw new AppError(400, "Visitor id is required", "VISITOR_ID_REQUIRED");
  }
  const { page, limit, skip } = normalizePagination(pagination);
  const [total, messages] = await Promise.all([
    prisma.publicMessage.count({
      where: {
        visitorId: visitorId.trim()
      }
    }),
    prisma.publicMessage.findMany({
      where: {
        visitorId: visitorId.trim()
      },
      orderBy: {
        createdAt: "asc"
      },
      skip,
      take: limit,
      include: {
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    })
  ]);
  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    },
    data: messages
  };
};
var getAllPublicMessagesFromDB = async (user, pagination) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  if (user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }
  const { page, limit, skip } = normalizePagination(pagination);
  const groupedVisitors = await prisma.publicMessage.groupBy({
    by: ["visitorId"],
    _max: {
      createdAt: true
    },
    orderBy: {
      _max: {
        createdAt: "desc"
      }
    }
  });
  const total = groupedVisitors.length;
  const paginatedVisitors = groupedVisitors.slice(skip, skip + limit);
  const inboxItems = await Promise.all(
    paginatedVisitors.map(async (item) => {
      const [latestMessage, unreadCount, totalMessages] = await Promise.all([
        prisma.publicMessage.findFirst({
          where: {
            visitorId: item.visitorId
          },
          orderBy: {
            createdAt: "desc"
          },
          include: {
            admin: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true
              }
            }
          }
        }),
        prisma.publicMessage.count({
          where: {
            visitorId: item.visitorId,
            senderType: PublicSenderType.VISITOR,
            isRead: false
          }
        }),
        prisma.publicMessage.count({
          where: {
            visitorId: item.visitorId
          }
        })
      ]);
      return {
        visitorId: item.visitorId,
        lastMessageAt: item._max.createdAt,
        unreadCount,
        totalMessages,
        latestMessage
      };
    })
  );
  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    },
    data: inboxItems
  };
};
var getSingleVisitorConversationFromDB = async (user, visitorId, pagination) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  if (user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }
  if (!visitorId || !visitorId.trim()) {
    throw new AppError(400, "Visitor id is required", "VISITOR_ID_REQUIRED");
  }
  const { page, limit, skip } = normalizePagination(pagination);
  const [total, messages] = await Promise.all([
    prisma.publicMessage.count({
      where: {
        visitorId: visitorId.trim()
      }
    }),
    prisma.publicMessage.findMany({
      where: {
        visitorId: visitorId.trim()
      },
      orderBy: {
        createdAt: "asc"
      },
      skip,
      take: limit,
      include: {
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    })
  ]);
  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    },
    data: messages
  };
};
var markPublicMessageAsReadIntoDB = async (user, messageId) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  if (user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }
  if (!messageId || !messageId.trim()) {
    throw new AppError(400, "Message id is required", "MESSAGE_ID_REQUIRED");
  }
  const existingMessage = await prisma.publicMessage.findUnique({
    where: {
      id: messageId
    }
  });
  if (!existingMessage) {
    throw new AppError(404, "Message not found", "MESSAGE_NOT_FOUND");
  }
  const updatedMessage = await prisma.publicMessage.update({
    where: {
      id: messageId
    },
    data: {
      isRead: true
    },
    include: {
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      }
    }
  });
  io.to(`user:${user.id}`).emit("public-message:read", {
    messageId: updatedMessage.id,
    visitorId: updatedMessage.visitorId,
    isRead: updatedMessage.isRead
  });
  io.to(`visitor:${updatedMessage.visitorId}`).emit("public-message:read", {
    messageId: updatedMessage.id,
    visitorId: updatedMessage.visitorId,
    isRead: updatedMessage.isRead
  });
  return updatedMessage;
};
var markVisitorConversationAsReadIntoDB = async (user, visitorId) => {
  if (!user?.id) {
    throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
  }
  if (user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Forbidden", "FORBIDDEN");
  }
  if (!visitorId || !visitorId.trim()) {
    throw new AppError(400, "Visitor id is required", "VISITOR_ID_REQUIRED");
  }
  const unreadMessages = await prisma.publicMessage.findMany({
    where: {
      visitorId: visitorId.trim(),
      senderType: PublicSenderType.VISITOR,
      isRead: false
    },
    select: {
      id: true
    }
  });
  if (unreadMessages.length === 0) {
    return {
      visitorId: visitorId.trim(),
      updatedCount: 0
    };
  }
  await prisma.publicMessage.updateMany({
    where: {
      visitorId: visitorId.trim(),
      senderType: PublicSenderType.VISITOR,
      isRead: false
    },
    data: {
      isRead: true
    }
  });
  io.to(`user:${user.id}`).emit("public-message:conversation-read", {
    visitorId: visitorId.trim(),
    updatedCount: unreadMessages.length
  });
  io.to(`visitor:${visitorId.trim()}`).emit(
    "public-message:conversation-read",
    {
      visitorId: visitorId.trim(),
      updatedCount: unreadMessages.length
    }
  );
  return {
    visitorId: visitorId.trim(),
    updatedCount: unreadMessages.length
  };
};
var PublicMessageService = {
  createVisitorMessageIntoDB,
  createAdminReplyIntoDB,
  getVisitorMessagesFromDB,
  getAllPublicMessagesFromDB,
  getSingleVisitorConversationFromDB,
  markPublicMessageAsReadIntoDB,
  markVisitorConversationAsReadIntoDB
};

// src/module/publicMessage/publicMessage.controller.ts
var createVisitorMessage = catchAsync_default(async (req, res) => {
  const result = await PublicMessageService.createVisitorMessageIntoDB(
    req.body,
    req
  );
  sendResponse_default(res, {
    statusCode: 201,
    success: true,
    message: "Message sent successfully",
    data: result
  });
});
var createAdminReply = catchAsync_default(async (req, res) => {
  const result = await PublicMessageService.createAdminReplyIntoDB(
    req.user,
    req.body
  );
  sendResponse_default(res, {
    statusCode: 201,
    success: true,
    message: "Reply sent successfully",
    data: result
  });
});
var getVisitorMessages = catchAsync_default(async (req, res) => {
  const session = PublicVisitorSession.getVisitorSessionFromRequest(req);
  const result = await PublicMessageService.getVisitorMessagesFromDB(
    session?.visitorId || "",
    {
      page: Number(req.query.page),
      limit: Number(req.query.limit)
    }
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Messages retrieved successfully",
    data: {
      visitor: session,
      ...result
    }
  });
});
var getAllPublicMessages = catchAsync_default(async (req, res) => {
  const result = await PublicMessageService.getAllPublicMessagesFromDB(
    req.user,
    {
      page: Number(req.query.page),
      limit: Number(req.query.limit)
    }
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Public messages retrieved successfully",
    data: result
  });
});
var getSingleVisitorConversation = catchAsync_default(
  async (req, res) => {
    const { visitorId } = req.params;
    const result = await PublicMessageService.getSingleVisitorConversationFromDB(
      req.user,
      visitorId,
      {
        page: Number(req.query.page),
        limit: Number(req.query.limit)
      }
    );
    sendResponse_default(res, {
      statusCode: 200,
      success: true,
      message: "Conversation retrieved successfully",
      data: result
    });
  }
);
var markPublicMessageAsRead = catchAsync_default(
  async (req, res) => {
    const result = await PublicMessageService.markPublicMessageAsReadIntoDB(
      req.user,
      req.params.id
    );
    sendResponse_default(res, {
      statusCode: 200,
      success: true,
      message: "Message marked as read successfully",
      data: result
    });
  }
);
var markVisitorConversationAsRead = catchAsync_default(
  async (req, res) => {
    const result = await PublicMessageService.markVisitorConversationAsReadIntoDB(
      req.user,
      req.params.visitorId
    );
    sendResponse_default(res, {
      statusCode: 200,
      success: true,
      message: "Conversation marked as read successfully",
      data: result
    });
  }
);
var PublicMessageController = {
  createVisitorMessage,
  createAdminReply,
  getVisitorMessages,
  getAllPublicMessages,
  getSingleVisitorConversation,
  markPublicMessageAsRead,
  markVisitorConversationAsRead
};

// src/middlewares/publicMessageRateLimit.ts
var WINDOW_MS = 60 * 1e3;
var MAX_REQUESTS = 20;
var memoryStore = /* @__PURE__ */ new Map();
var getClientKey = (req) => {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0]?.trim() || req.ip || "unknown";
  }
  if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
    return String(forwardedFor[0]).trim();
  }
  return req.ip || req.socket.remoteAddress || "unknown";
};
var publicMessageRateLimit = (req, res, next) => {
  const key = getClientKey(req);
  const now = Date.now();
  const existing = memoryStore.get(key);
  if (!existing) {
    memoryStore.set(key, {
      count: 1,
      startTime: now
    });
    return next();
  }
  if (now - existing.startTime > WINDOW_MS) {
    memoryStore.set(key, {
      count: 1,
      startTime: now
    });
    return next();
  }
  if (existing.count >= MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later.",
      errorCode: "TOO_MANY_REQUESTS"
    });
  }
  existing.count += 1;
  memoryStore.set(key, existing);
  return next();
};
var publicMessageRateLimit_default = publicMessageRateLimit;

// src/module/publicMessage/publicMessage.route.ts
var router8 = Router8();
router8.post(
  "/",
  publicMessageRateLimit_default,
  PublicMessageController.createVisitorMessage
);
router8.get(
  "/visitor/me",
  publicMessageRateLimit_default,
  PublicMessageController.getVisitorMessages
);
router8.get(
  "/admin/all",
  auth_guard_default("ADMIN"),
  PublicMessageController.getAllPublicMessages
);
router8.get(
  "/admin/:visitorId",
  auth_guard_default("ADMIN"),
  PublicMessageController.getSingleVisitorConversation
);
router8.post(
  "/admin/reply",
  auth_guard_default("ADMIN"),
  PublicMessageController.createAdminReply
);
router8.patch(
  "/:id/read",
  auth_guard_default("ADMIN"),
  PublicMessageController.markPublicMessageAsRead
);
router8.patch(
  "/admin/:visitorId/read-all",
  auth_guard_default("ADMIN"),
  PublicMessageController.markVisitorConversationAsRead
);
var PublicMessageRoutes = router8;

// src/module/payment/payment.route.ts
import { Router as Router9 } from "express";
import express from "express";

// src/module/payment/Payment.webhook.service.ts
var handleStripeWebhook = async (req) => {
  const signature = req.headers.get ? req.headers.get("stripe-signature") : req.headers["stripe-signature"];
  if (!signature) {
    throw new AppError(400, "Missing stripe signature", "MISSING_SIGNATURE");
  }
  let event;
  try {
    const payload = typeof req.body === "string" ? req.body : Buffer.isBuffer(req.body) ? req.body : JSON.stringify(req.body);
    event = stripeClient2.webhooks.constructEvent(
      payload,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    throw new AppError(
      400,
      `Webhook signature verification failed: ${err instanceof Error ? err.message : "unknown"}`,
      "INVALID_SIGNATURE"
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
      const payment = await prisma.payment.findFirst({
        where: {
          stripeSessionId: session.id
        }
      });
      if (payment) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: "COMPLETED",
            stripePaymentId: session.payment_intent || null,
            paidAt: /* @__PURE__ */ new Date()
          }
        });
      } else {
        const offer2 = await prisma.offer.findUnique({
          where: { id: offerId },
          select: { price: true }
        });
        if (offer2) {
          await prisma.payment.create({
            data: {
              offerId,
              projectId: projectId || null,
              clientId: clientId || "",
              amount: offer2.price,
              currency: session.currency || "usd",
              status: "COMPLETED",
              stripeSessionId: session.id,
              stripePaymentId: session.payment_intent || null,
              paidAt: /* @__PURE__ */ new Date()
            }
          });
        }
      }
      const offer = await prisma.offer.findUnique({
        where: { id: offerId },
        select: {
          adminId: true,
          title: true,
          id: true
        }
      });
      if (offer) {
        await prisma.notification.create({
          data: {
            userId: offer.adminId,
            offerId: offer.id,
            projectId: projectId || null,
            type: NotificationType.PROJECT_UPDATE,
            title: "Payment received",
            body: `Client paid for offer: ${offer.title}`
          }
        });
      }
      break;
    }
    case "checkout.session.expired": {
      const session = event.data.object;
      await prisma.payment.updateMany({
        where: {
          stripeSessionId: session.id,
          status: "PENDING"
        },
        data: {
          status: "FAILED"
        }
      });
      break;
    }
    default:
      break;
  }
  return { received: true };
};
var PaymentWebhookService = {
  handleStripeWebhook
};

// src/module/payment/Payment.controller.ts
var handleStripeWebhook2 = catchAsync_default(async (req, res) => {
  const result = await PaymentWebhookService.handleStripeWebhook(req);
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Webhook received",
    data: result
  });
});
var PaymentWebhookController = {
  handleStripeWebhook: handleStripeWebhook2
};

// src/module/payment/payment.route.ts
var router9 = Router9();
router9.post(
  "/stripe-webhook",
  express.raw({ type: "application/json" }),
  PaymentWebhookController.handleStripeWebhook
);
var PaymentWebhookRoutes = router9;

// src/module/service/Service.route.ts
import { Router as Router10 } from "express";

// node_modules/zod/v4/classic/external.js
var external_exports = {};
__export(external_exports, {
  $brand: () => $brand,
  $input: () => $input,
  $output: () => $output,
  NEVER: () => NEVER,
  TimePrecision: () => TimePrecision,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBase64: () => ZodBase64,
  ZodBase64URL: () => ZodBase64URL,
  ZodBigInt: () => ZodBigInt,
  ZodBigIntFormat: () => ZodBigIntFormat,
  ZodBoolean: () => ZodBoolean,
  ZodCIDRv4: () => ZodCIDRv4,
  ZodCIDRv6: () => ZodCIDRv6,
  ZodCUID: () => ZodCUID,
  ZodCUID2: () => ZodCUID2,
  ZodCatch: () => ZodCatch,
  ZodCodec: () => ZodCodec,
  ZodCustom: () => ZodCustom,
  ZodCustomStringFormat: () => ZodCustomStringFormat,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodE164: () => ZodE164,
  ZodEmail: () => ZodEmail,
  ZodEmoji: () => ZodEmoji,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodExactOptional: () => ZodExactOptional,
  ZodFile: () => ZodFile,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodGUID: () => ZodGUID,
  ZodIPv4: () => ZodIPv4,
  ZodIPv6: () => ZodIPv6,
  ZodISODate: () => ZodISODate,
  ZodISODateTime: () => ZodISODateTime,
  ZodISODuration: () => ZodISODuration,
  ZodISOTime: () => ZodISOTime,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodJWT: () => ZodJWT,
  ZodKSUID: () => ZodKSUID,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMAC: () => ZodMAC,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNanoID: () => ZodNanoID,
  ZodNever: () => ZodNever,
  ZodNonOptional: () => ZodNonOptional,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodNumberFormat: () => ZodNumberFormat,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodPipe: () => ZodPipe,
  ZodPrefault: () => ZodPrefault,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRealError: () => ZodRealError,
  ZodRecord: () => ZodRecord,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodStringFormat: () => ZodStringFormat,
  ZodSuccess: () => ZodSuccess,
  ZodSymbol: () => ZodSymbol,
  ZodTemplateLiteral: () => ZodTemplateLiteral,
  ZodTransform: () => ZodTransform,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodULID: () => ZodULID,
  ZodURL: () => ZodURL,
  ZodUUID: () => ZodUUID,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  ZodXID: () => ZodXID,
  ZodXor: () => ZodXor,
  _ZodString: () => _ZodString,
  _default: () => _default2,
  _function: () => _function,
  any: () => any,
  array: () => array,
  base64: () => base642,
  base64url: () => base64url2,
  bigint: () => bigint2,
  boolean: () => boolean2,
  catch: () => _catch2,
  check: () => check,
  cidrv4: () => cidrv42,
  cidrv6: () => cidrv62,
  clone: () => clone,
  codec: () => codec,
  coerce: () => coerce_exports,
  config: () => config2,
  core: () => core_exports2,
  cuid: () => cuid3,
  cuid2: () => cuid22,
  custom: () => custom,
  date: () => date3,
  decode: () => decode2,
  decodeAsync: () => decodeAsync2,
  describe: () => describe2,
  discriminatedUnion: () => discriminatedUnion,
  e164: () => e1642,
  email: () => email2,
  emoji: () => emoji2,
  encode: () => encode2,
  encodeAsync: () => encodeAsync2,
  endsWith: () => _endsWith,
  enum: () => _enum2,
  exactOptional: () => exactOptional,
  file: () => file,
  flattenError: () => flattenError,
  float32: () => float32,
  float64: () => float64,
  formatError: () => formatError,
  fromJSONSchema: () => fromJSONSchema,
  function: () => _function,
  getErrorMap: () => getErrorMap,
  globalRegistry: () => globalRegistry,
  gt: () => _gt,
  gte: () => _gte,
  guid: () => guid2,
  hash: () => hash,
  hex: () => hex2,
  hostname: () => hostname2,
  httpUrl: () => httpUrl,
  includes: () => _includes,
  instanceof: () => _instanceof,
  int: () => int,
  int32: () => int32,
  int64: () => int64,
  intersection: () => intersection,
  ipv4: () => ipv42,
  ipv6: () => ipv62,
  iso: () => iso_exports,
  json: () => json,
  jwt: () => jwt,
  keyof: () => keyof,
  ksuid: () => ksuid2,
  lazy: () => lazy,
  length: () => _length,
  literal: () => literal,
  locales: () => locales_exports,
  looseObject: () => looseObject,
  looseRecord: () => looseRecord,
  lowercase: () => _lowercase,
  lt: () => _lt,
  lte: () => _lte,
  mac: () => mac2,
  map: () => map,
  maxLength: () => _maxLength,
  maxSize: () => _maxSize,
  meta: () => meta2,
  mime: () => _mime,
  minLength: () => _minLength,
  minSize: () => _minSize,
  multipleOf: () => _multipleOf,
  nan: () => nan,
  nanoid: () => nanoid3,
  nativeEnum: () => nativeEnum,
  negative: () => _negative,
  never: () => never,
  nonnegative: () => _nonnegative,
  nonoptional: () => nonoptional,
  nonpositive: () => _nonpositive,
  normalize: () => _normalize,
  null: () => _null3,
  nullable: () => nullable,
  nullish: () => nullish2,
  number: () => number2,
  object: () => object,
  optional: () => optional,
  overwrite: () => _overwrite,
  parse: () => parse2,
  parseAsync: () => parseAsync2,
  partialRecord: () => partialRecord,
  pipe: () => pipe,
  positive: () => _positive,
  prefault: () => prefault,
  preprocess: () => preprocess,
  prettifyError: () => prettifyError,
  promise: () => promise,
  property: () => _property,
  readonly: () => readonly,
  record: () => record,
  refine: () => refine,
  regex: () => _regex,
  regexes: () => regexes_exports,
  registry: () => registry,
  safeDecode: () => safeDecode2,
  safeDecodeAsync: () => safeDecodeAsync2,
  safeEncode: () => safeEncode2,
  safeEncodeAsync: () => safeEncodeAsync2,
  safeParse: () => safeParse2,
  safeParseAsync: () => safeParseAsync2,
  set: () => set,
  setErrorMap: () => setErrorMap,
  size: () => _size,
  slugify: () => _slugify,
  startsWith: () => _startsWith,
  strictObject: () => strictObject,
  string: () => string2,
  stringFormat: () => stringFormat,
  stringbool: () => stringbool,
  success: () => success,
  superRefine: () => superRefine,
  symbol: () => symbol,
  templateLiteral: () => templateLiteral,
  toJSONSchema: () => toJSONSchema,
  toLowerCase: () => _toLowerCase,
  toUpperCase: () => _toUpperCase,
  transform: () => transform,
  treeifyError: () => treeifyError,
  trim: () => _trim,
  tuple: () => tuple,
  uint32: () => uint32,
  uint64: () => uint64,
  ulid: () => ulid2,
  undefined: () => _undefined3,
  union: () => union,
  unknown: () => unknown,
  uppercase: () => _uppercase,
  url: () => url,
  util: () => util_exports,
  uuid: () => uuid2,
  uuidv4: () => uuidv4,
  uuidv6: () => uuidv6,
  uuidv7: () => uuidv7,
  void: () => _void2,
  xid: () => xid2,
  xor: () => xor
});

// node_modules/zod/v4/core/index.js
var core_exports2 = {};
__export(core_exports2, {
  $ZodAny: () => $ZodAny,
  $ZodArray: () => $ZodArray,
  $ZodAsyncError: () => $ZodAsyncError,
  $ZodBase64: () => $ZodBase64,
  $ZodBase64URL: () => $ZodBase64URL,
  $ZodBigInt: () => $ZodBigInt,
  $ZodBigIntFormat: () => $ZodBigIntFormat,
  $ZodBoolean: () => $ZodBoolean,
  $ZodCIDRv4: () => $ZodCIDRv4,
  $ZodCIDRv6: () => $ZodCIDRv6,
  $ZodCUID: () => $ZodCUID,
  $ZodCUID2: () => $ZodCUID2,
  $ZodCatch: () => $ZodCatch,
  $ZodCheck: () => $ZodCheck,
  $ZodCheckBigIntFormat: () => $ZodCheckBigIntFormat,
  $ZodCheckEndsWith: () => $ZodCheckEndsWith,
  $ZodCheckGreaterThan: () => $ZodCheckGreaterThan,
  $ZodCheckIncludes: () => $ZodCheckIncludes,
  $ZodCheckLengthEquals: () => $ZodCheckLengthEquals,
  $ZodCheckLessThan: () => $ZodCheckLessThan,
  $ZodCheckLowerCase: () => $ZodCheckLowerCase,
  $ZodCheckMaxLength: () => $ZodCheckMaxLength,
  $ZodCheckMaxSize: () => $ZodCheckMaxSize,
  $ZodCheckMimeType: () => $ZodCheckMimeType,
  $ZodCheckMinLength: () => $ZodCheckMinLength,
  $ZodCheckMinSize: () => $ZodCheckMinSize,
  $ZodCheckMultipleOf: () => $ZodCheckMultipleOf,
  $ZodCheckNumberFormat: () => $ZodCheckNumberFormat,
  $ZodCheckOverwrite: () => $ZodCheckOverwrite,
  $ZodCheckProperty: () => $ZodCheckProperty,
  $ZodCheckRegex: () => $ZodCheckRegex,
  $ZodCheckSizeEquals: () => $ZodCheckSizeEquals,
  $ZodCheckStartsWith: () => $ZodCheckStartsWith,
  $ZodCheckStringFormat: () => $ZodCheckStringFormat,
  $ZodCheckUpperCase: () => $ZodCheckUpperCase,
  $ZodCodec: () => $ZodCodec,
  $ZodCustom: () => $ZodCustom,
  $ZodCustomStringFormat: () => $ZodCustomStringFormat,
  $ZodDate: () => $ZodDate,
  $ZodDefault: () => $ZodDefault,
  $ZodDiscriminatedUnion: () => $ZodDiscriminatedUnion,
  $ZodE164: () => $ZodE164,
  $ZodEmail: () => $ZodEmail,
  $ZodEmoji: () => $ZodEmoji,
  $ZodEncodeError: () => $ZodEncodeError,
  $ZodEnum: () => $ZodEnum,
  $ZodError: () => $ZodError,
  $ZodExactOptional: () => $ZodExactOptional,
  $ZodFile: () => $ZodFile,
  $ZodFunction: () => $ZodFunction,
  $ZodGUID: () => $ZodGUID,
  $ZodIPv4: () => $ZodIPv4,
  $ZodIPv6: () => $ZodIPv6,
  $ZodISODate: () => $ZodISODate,
  $ZodISODateTime: () => $ZodISODateTime,
  $ZodISODuration: () => $ZodISODuration,
  $ZodISOTime: () => $ZodISOTime,
  $ZodIntersection: () => $ZodIntersection,
  $ZodJWT: () => $ZodJWT,
  $ZodKSUID: () => $ZodKSUID,
  $ZodLazy: () => $ZodLazy,
  $ZodLiteral: () => $ZodLiteral,
  $ZodMAC: () => $ZodMAC,
  $ZodMap: () => $ZodMap,
  $ZodNaN: () => $ZodNaN,
  $ZodNanoID: () => $ZodNanoID,
  $ZodNever: () => $ZodNever,
  $ZodNonOptional: () => $ZodNonOptional,
  $ZodNull: () => $ZodNull,
  $ZodNullable: () => $ZodNullable,
  $ZodNumber: () => $ZodNumber,
  $ZodNumberFormat: () => $ZodNumberFormat,
  $ZodObject: () => $ZodObject,
  $ZodObjectJIT: () => $ZodObjectJIT,
  $ZodOptional: () => $ZodOptional,
  $ZodPipe: () => $ZodPipe,
  $ZodPrefault: () => $ZodPrefault,
  $ZodPromise: () => $ZodPromise,
  $ZodReadonly: () => $ZodReadonly,
  $ZodRealError: () => $ZodRealError,
  $ZodRecord: () => $ZodRecord,
  $ZodRegistry: () => $ZodRegistry,
  $ZodSet: () => $ZodSet,
  $ZodString: () => $ZodString,
  $ZodStringFormat: () => $ZodStringFormat,
  $ZodSuccess: () => $ZodSuccess,
  $ZodSymbol: () => $ZodSymbol,
  $ZodTemplateLiteral: () => $ZodTemplateLiteral,
  $ZodTransform: () => $ZodTransform,
  $ZodTuple: () => $ZodTuple,
  $ZodType: () => $ZodType,
  $ZodULID: () => $ZodULID,
  $ZodURL: () => $ZodURL,
  $ZodUUID: () => $ZodUUID,
  $ZodUndefined: () => $ZodUndefined,
  $ZodUnion: () => $ZodUnion,
  $ZodUnknown: () => $ZodUnknown,
  $ZodVoid: () => $ZodVoid,
  $ZodXID: () => $ZodXID,
  $ZodXor: () => $ZodXor,
  $brand: () => $brand,
  $constructor: () => $constructor,
  $input: () => $input,
  $output: () => $output,
  Doc: () => Doc,
  JSONSchema: () => json_schema_exports,
  JSONSchemaGenerator: () => JSONSchemaGenerator,
  NEVER: () => NEVER,
  TimePrecision: () => TimePrecision,
  _any: () => _any,
  _array: () => _array,
  _base64: () => _base64,
  _base64url: () => _base64url,
  _bigint: () => _bigint,
  _boolean: () => _boolean,
  _catch: () => _catch,
  _check: () => _check,
  _cidrv4: () => _cidrv4,
  _cidrv6: () => _cidrv6,
  _coercedBigint: () => _coercedBigint,
  _coercedBoolean: () => _coercedBoolean,
  _coercedDate: () => _coercedDate,
  _coercedNumber: () => _coercedNumber,
  _coercedString: () => _coercedString,
  _cuid: () => _cuid,
  _cuid2: () => _cuid2,
  _custom: () => _custom,
  _date: () => _date,
  _decode: () => _decode,
  _decodeAsync: () => _decodeAsync,
  _default: () => _default,
  _discriminatedUnion: () => _discriminatedUnion,
  _e164: () => _e164,
  _email: () => _email,
  _emoji: () => _emoji2,
  _encode: () => _encode,
  _encodeAsync: () => _encodeAsync,
  _endsWith: () => _endsWith,
  _enum: () => _enum,
  _file: () => _file,
  _float32: () => _float32,
  _float64: () => _float64,
  _gt: () => _gt,
  _gte: () => _gte,
  _guid: () => _guid,
  _includes: () => _includes,
  _int: () => _int,
  _int32: () => _int32,
  _int64: () => _int64,
  _intersection: () => _intersection,
  _ipv4: () => _ipv4,
  _ipv6: () => _ipv6,
  _isoDate: () => _isoDate,
  _isoDateTime: () => _isoDateTime,
  _isoDuration: () => _isoDuration,
  _isoTime: () => _isoTime,
  _jwt: () => _jwt,
  _ksuid: () => _ksuid,
  _lazy: () => _lazy,
  _length: () => _length,
  _literal: () => _literal,
  _lowercase: () => _lowercase,
  _lt: () => _lt,
  _lte: () => _lte,
  _mac: () => _mac,
  _map: () => _map,
  _max: () => _lte,
  _maxLength: () => _maxLength,
  _maxSize: () => _maxSize,
  _mime: () => _mime,
  _min: () => _gte,
  _minLength: () => _minLength,
  _minSize: () => _minSize,
  _multipleOf: () => _multipleOf,
  _nan: () => _nan,
  _nanoid: () => _nanoid,
  _nativeEnum: () => _nativeEnum,
  _negative: () => _negative,
  _never: () => _never,
  _nonnegative: () => _nonnegative,
  _nonoptional: () => _nonoptional,
  _nonpositive: () => _nonpositive,
  _normalize: () => _normalize,
  _null: () => _null2,
  _nullable: () => _nullable,
  _number: () => _number,
  _optional: () => _optional,
  _overwrite: () => _overwrite,
  _parse: () => _parse,
  _parseAsync: () => _parseAsync,
  _pipe: () => _pipe,
  _positive: () => _positive,
  _promise: () => _promise,
  _property: () => _property,
  _readonly: () => _readonly,
  _record: () => _record,
  _refine: () => _refine,
  _regex: () => _regex,
  _safeDecode: () => _safeDecode,
  _safeDecodeAsync: () => _safeDecodeAsync,
  _safeEncode: () => _safeEncode,
  _safeEncodeAsync: () => _safeEncodeAsync,
  _safeParse: () => _safeParse,
  _safeParseAsync: () => _safeParseAsync,
  _set: () => _set,
  _size: () => _size,
  _slugify: () => _slugify,
  _startsWith: () => _startsWith,
  _string: () => _string,
  _stringFormat: () => _stringFormat,
  _stringbool: () => _stringbool,
  _success: () => _success,
  _superRefine: () => _superRefine,
  _symbol: () => _symbol,
  _templateLiteral: () => _templateLiteral,
  _toLowerCase: () => _toLowerCase,
  _toUpperCase: () => _toUpperCase,
  _transform: () => _transform,
  _trim: () => _trim,
  _tuple: () => _tuple,
  _uint32: () => _uint32,
  _uint64: () => _uint64,
  _ulid: () => _ulid,
  _undefined: () => _undefined2,
  _union: () => _union,
  _unknown: () => _unknown,
  _uppercase: () => _uppercase,
  _url: () => _url,
  _uuid: () => _uuid,
  _uuidv4: () => _uuidv4,
  _uuidv6: () => _uuidv6,
  _uuidv7: () => _uuidv7,
  _void: () => _void,
  _xid: () => _xid,
  _xor: () => _xor,
  clone: () => clone,
  config: () => config2,
  createStandardJSONSchemaMethod: () => createStandardJSONSchemaMethod,
  createToJSONSchemaMethod: () => createToJSONSchemaMethod,
  decode: () => decode,
  decodeAsync: () => decodeAsync,
  describe: () => describe,
  encode: () => encode,
  encodeAsync: () => encodeAsync,
  extractDefs: () => extractDefs,
  finalize: () => finalize,
  flattenError: () => flattenError,
  formatError: () => formatError,
  globalConfig: () => globalConfig,
  globalRegistry: () => globalRegistry,
  initializeContext: () => initializeContext,
  isValidBase64: () => isValidBase64,
  isValidBase64URL: () => isValidBase64URL,
  isValidJWT: () => isValidJWT,
  locales: () => locales_exports,
  meta: () => meta,
  parse: () => parse,
  parseAsync: () => parseAsync,
  prettifyError: () => prettifyError,
  process: () => process3,
  regexes: () => regexes_exports,
  registry: () => registry,
  safeDecode: () => safeDecode,
  safeDecodeAsync: () => safeDecodeAsync,
  safeEncode: () => safeEncode,
  safeEncodeAsync: () => safeEncodeAsync,
  safeParse: () => safeParse,
  safeParseAsync: () => safeParseAsync,
  toDotPath: () => toDotPath,
  toJSONSchema: () => toJSONSchema,
  treeifyError: () => treeifyError,
  util: () => util_exports,
  version: () => version
});

// node_modules/zod/v4/core/core.js
var NEVER = Object.freeze({
  status: "aborted"
});
// @__NO_SIDE_EFFECTS__
function $constructor(name, initializer3, params) {
  function init(inst, def) {
    if (!inst._zod) {
      Object.defineProperty(inst, "_zod", {
        value: {
          def,
          constr: _,
          traits: /* @__PURE__ */ new Set()
        },
        enumerable: false
      });
    }
    if (inst._zod.traits.has(name)) {
      return;
    }
    inst._zod.traits.add(name);
    initializer3(inst, def);
    const proto = _.prototype;
    const keys = Object.keys(proto);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (!(k in inst)) {
        inst[k] = proto[k].bind(inst);
      }
    }
  }
  const Parent = params?.Parent ?? Object;
  class Definition extends Parent {
  }
  Object.defineProperty(Definition, "name", { value: name });
  function _(def) {
    var _a2;
    const inst = params?.Parent ? new Definition() : this;
    init(inst, def);
    (_a2 = inst._zod).deferred ?? (_a2.deferred = []);
    for (const fn of inst._zod.deferred) {
      fn();
    }
    return inst;
  }
  Object.defineProperty(_, "init", { value: init });
  Object.defineProperty(_, Symbol.hasInstance, {
    value: (inst) => {
      if (params?.Parent && inst instanceof params.Parent)
        return true;
      return inst?._zod?.traits?.has(name);
    }
  });
  Object.defineProperty(_, "name", { value: name });
  return _;
}
var $brand = /* @__PURE__ */ Symbol("zod_brand");
var $ZodAsyncError = class extends Error {
  constructor() {
    super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
  }
};
var $ZodEncodeError = class extends Error {
  constructor(name) {
    super(`Encountered unidirectional transform during encode: ${name}`);
    this.name = "ZodEncodeError";
  }
};
var globalConfig = {};
function config2(newConfig) {
  if (newConfig)
    Object.assign(globalConfig, newConfig);
  return globalConfig;
}

// node_modules/zod/v4/core/util.js
var util_exports = {};
__export(util_exports, {
  BIGINT_FORMAT_RANGES: () => BIGINT_FORMAT_RANGES,
  Class: () => Class,
  NUMBER_FORMAT_RANGES: () => NUMBER_FORMAT_RANGES,
  aborted: () => aborted,
  allowsEval: () => allowsEval,
  assert: () => assert,
  assertEqual: () => assertEqual,
  assertIs: () => assertIs,
  assertNever: () => assertNever,
  assertNotEqual: () => assertNotEqual,
  assignProp: () => assignProp,
  base64ToUint8Array: () => base64ToUint8Array,
  base64urlToUint8Array: () => base64urlToUint8Array,
  cached: () => cached,
  captureStackTrace: () => captureStackTrace,
  cleanEnum: () => cleanEnum,
  cleanRegex: () => cleanRegex,
  clone: () => clone,
  cloneDef: () => cloneDef,
  createTransparentProxy: () => createTransparentProxy,
  defineLazy: () => defineLazy,
  esc: () => esc,
  escapeRegex: () => escapeRegex,
  extend: () => extend,
  finalizeIssue: () => finalizeIssue,
  floatSafeRemainder: () => floatSafeRemainder,
  getElementAtPath: () => getElementAtPath,
  getEnumValues: () => getEnumValues,
  getLengthableOrigin: () => getLengthableOrigin,
  getParsedType: () => getParsedType,
  getSizableOrigin: () => getSizableOrigin,
  hexToUint8Array: () => hexToUint8Array,
  isObject: () => isObject,
  isPlainObject: () => isPlainObject,
  issue: () => issue,
  joinValues: () => joinValues,
  jsonStringifyReplacer: () => jsonStringifyReplacer,
  merge: () => merge,
  mergeDefs: () => mergeDefs,
  normalizeParams: () => normalizeParams,
  nullish: () => nullish,
  numKeys: () => numKeys,
  objectClone: () => objectClone,
  omit: () => omit,
  optionalKeys: () => optionalKeys,
  parsedType: () => parsedType,
  partial: () => partial,
  pick: () => pick,
  prefixIssues: () => prefixIssues,
  primitiveTypes: () => primitiveTypes,
  promiseAllObject: () => promiseAllObject,
  propertyKeyTypes: () => propertyKeyTypes,
  randomString: () => randomString,
  required: () => required,
  safeExtend: () => safeExtend,
  shallowClone: () => shallowClone,
  slugify: () => slugify,
  stringifyPrimitive: () => stringifyPrimitive,
  uint8ArrayToBase64: () => uint8ArrayToBase64,
  uint8ArrayToBase64url: () => uint8ArrayToBase64url,
  uint8ArrayToHex: () => uint8ArrayToHex,
  unwrapMessage: () => unwrapMessage
});
function assertEqual(val) {
  return val;
}
function assertNotEqual(val) {
  return val;
}
function assertIs(_arg) {
}
function assertNever(_x) {
  throw new Error("Unexpected value in exhaustive check");
}
function assert(_) {
}
function getEnumValues(entries) {
  const numericValues = Object.values(entries).filter((v) => typeof v === "number");
  const values = Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
  return values;
}
function joinValues(array2, separator = "|") {
  return array2.map((val) => stringifyPrimitive(val)).join(separator);
}
function jsonStringifyReplacer(_, value) {
  if (typeof value === "bigint")
    return value.toString();
  return value;
}
function cached(getter) {
  const set2 = false;
  return {
    get value() {
      if (!set2) {
        const value = getter();
        Object.defineProperty(this, "value", { value });
        return value;
      }
      throw new Error("cached value already set");
    }
  };
}
function nullish(input) {
  return input === null || input === void 0;
}
function cleanRegex(source) {
  const start = source.startsWith("^") ? 1 : 0;
  const end = source.endsWith("$") ? source.length - 1 : source.length;
  return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepString = step.toString();
  let stepDecCount = (stepString.split(".")[1] || "").length;
  if (stepDecCount === 0 && /\d?e-\d?/.test(stepString)) {
    const match = stepString.match(/\d?e-(\d?)/);
    if (match?.[1]) {
      stepDecCount = Number.parseInt(match[1]);
    }
  }
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var EVALUATING = /* @__PURE__ */ Symbol("evaluating");
function defineLazy(object2, key, getter) {
  let value = void 0;
  Object.defineProperty(object2, key, {
    get() {
      if (value === EVALUATING) {
        return void 0;
      }
      if (value === void 0) {
        value = EVALUATING;
        value = getter();
      }
      return value;
    },
    set(v) {
      Object.defineProperty(object2, key, {
        value: v
        // configurable: true,
      });
    },
    configurable: true
  });
}
function objectClone(obj) {
  return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
}
function assignProp(target, prop, value) {
  Object.defineProperty(target, prop, {
    value,
    writable: true,
    enumerable: true,
    configurable: true
  });
}
function mergeDefs(...defs) {
  const mergedDescriptors = {};
  for (const def of defs) {
    const descriptors = Object.getOwnPropertyDescriptors(def);
    Object.assign(mergedDescriptors, descriptors);
  }
  return Object.defineProperties({}, mergedDescriptors);
}
function cloneDef(schema) {
  return mergeDefs(schema._zod.def);
}
function getElementAtPath(obj, path3) {
  if (!path3)
    return obj;
  return path3.reduce((acc, key) => acc?.[key], obj);
}
function promiseAllObject(promisesObj) {
  const keys = Object.keys(promisesObj);
  const promises = keys.map((key) => promisesObj[key]);
  return Promise.all(promises).then((results) => {
    const resolvedObj = {};
    for (let i = 0; i < keys.length; i++) {
      resolvedObj[keys[i]] = results[i];
    }
    return resolvedObj;
  });
}
function randomString(length = 10) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}
function esc(str) {
  return JSON.stringify(str);
}
function slugify(input) {
  return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {
};
function isObject(data) {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}
var allowsEval = cached(() => {
  if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) {
    return false;
  }
  try {
    const F = Function;
    new F("");
    return true;
  } catch (_) {
    return false;
  }
});
function isPlainObject(o) {
  if (isObject(o) === false)
    return false;
  const ctor = o.constructor;
  if (ctor === void 0)
    return true;
  if (typeof ctor !== "function")
    return true;
  const prot = ctor.prototype;
  if (isObject(prot) === false)
    return false;
  if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
    return false;
  }
  return true;
}
function shallowClone(o) {
  if (isPlainObject(o))
    return { ...o };
  if (Array.isArray(o))
    return [...o];
  return o;
}
function numKeys(data) {
  let keyCount = 0;
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      keyCount++;
    }
  }
  return keyCount;
}
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return "undefined";
    case "string":
      return "string";
    case "number":
      return Number.isNaN(data) ? "nan" : "number";
    case "boolean":
      return "boolean";
    case "function":
      return "function";
    case "bigint":
      return "bigint";
    case "symbol":
      return "symbol";
    case "object":
      if (Array.isArray(data)) {
        return "array";
      }
      if (data === null) {
        return "null";
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return "promise";
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return "map";
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return "set";
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return "date";
      }
      if (typeof File !== "undefined" && data instanceof File) {
        return "file";
      }
      return "object";
    default:
      throw new Error(`Unknown data type: ${t}`);
  }
};
var propertyKeyTypes = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
var primitiveTypes = /* @__PURE__ */ new Set(["string", "number", "bigint", "boolean", "symbol", "undefined"]);
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
  const cl = new inst._zod.constr(def ?? inst._zod.def);
  if (!def || params?.parent)
    cl._zod.parent = inst;
  return cl;
}
function normalizeParams(_params) {
  const params = _params;
  if (!params)
    return {};
  if (typeof params === "string")
    return { error: () => params };
  if (params?.message !== void 0) {
    if (params?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    params.error = params.message;
  }
  delete params.message;
  if (typeof params.error === "string")
    return { ...params, error: () => params.error };
  return params;
}
function createTransparentProxy(getter) {
  let target;
  return new Proxy({}, {
    get(_, prop, receiver) {
      target ?? (target = getter());
      return Reflect.get(target, prop, receiver);
    },
    set(_, prop, value, receiver) {
      target ?? (target = getter());
      return Reflect.set(target, prop, value, receiver);
    },
    has(_, prop) {
      target ?? (target = getter());
      return Reflect.has(target, prop);
    },
    deleteProperty(_, prop) {
      target ?? (target = getter());
      return Reflect.deleteProperty(target, prop);
    },
    ownKeys(_) {
      target ?? (target = getter());
      return Reflect.ownKeys(target);
    },
    getOwnPropertyDescriptor(_, prop) {
      target ?? (target = getter());
      return Reflect.getOwnPropertyDescriptor(target, prop);
    },
    defineProperty(_, prop, descriptor) {
      target ?? (target = getter());
      return Reflect.defineProperty(target, prop, descriptor);
    }
  });
}
function stringifyPrimitive(value) {
  if (typeof value === "bigint")
    return value.toString() + "n";
  if (typeof value === "string")
    return `"${value}"`;
  return `${value}`;
}
function optionalKeys(shape) {
  return Object.keys(shape).filter((k) => {
    return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
  });
}
var NUMBER_FORMAT_RANGES = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
var BIGINT_FORMAT_RANGES = {
  int64: [/* @__PURE__ */ BigInt("-9223372036854775808"), /* @__PURE__ */ BigInt("9223372036854775807")],
  uint64: [/* @__PURE__ */ BigInt(0), /* @__PURE__ */ BigInt("18446744073709551615")]
};
function pick(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const newShape = {};
      for (const key in mask) {
        if (!(key in currDef.shape)) {
          throw new Error(`Unrecognized key: "${key}"`);
        }
        if (!mask[key])
          continue;
        newShape[key] = currDef.shape[key];
      }
      assignProp(this, "shape", newShape);
      return newShape;
    },
    checks: []
  });
  return clone(schema, def);
}
function omit(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const newShape = { ...schema._zod.def.shape };
      for (const key in mask) {
        if (!(key in currDef.shape)) {
          throw new Error(`Unrecognized key: "${key}"`);
        }
        if (!mask[key])
          continue;
        delete newShape[key];
      }
      assignProp(this, "shape", newShape);
      return newShape;
    },
    checks: []
  });
  return clone(schema, def);
}
function extend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to extend: expected a plain object");
  }
  const checks = schema._zod.def.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    const existingShape = schema._zod.def.shape;
    for (const key in shape) {
      if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) {
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
      }
    }
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const _shape = { ...schema._zod.def.shape, ...shape };
      assignProp(this, "shape", _shape);
      return _shape;
    }
  });
  return clone(schema, def);
}
function safeExtend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to safeExtend: expected a plain object");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const _shape = { ...schema._zod.def.shape, ...shape };
      assignProp(this, "shape", _shape);
      return _shape;
    }
  });
  return clone(schema, def);
}
function merge(a, b) {
  const def = mergeDefs(a._zod.def, {
    get shape() {
      const _shape = { ...a._zod.def.shape, ...b._zod.def.shape };
      assignProp(this, "shape", _shape);
      return _shape;
    },
    get catchall() {
      return b._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return clone(a, def);
}
function partial(Class2, schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const oldShape = schema._zod.def.shape;
      const shape = { ...oldShape };
      if (mask) {
        for (const key in mask) {
          if (!(key in oldShape)) {
            throw new Error(`Unrecognized key: "${key}"`);
          }
          if (!mask[key])
            continue;
          shape[key] = Class2 ? new Class2({
            type: "optional",
            innerType: oldShape[key]
          }) : oldShape[key];
        }
      } else {
        for (const key in oldShape) {
          shape[key] = Class2 ? new Class2({
            type: "optional",
            innerType: oldShape[key]
          }) : oldShape[key];
        }
      }
      assignProp(this, "shape", shape);
      return shape;
    },
    checks: []
  });
  return clone(schema, def);
}
function required(Class2, schema, mask) {
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const oldShape = schema._zod.def.shape;
      const shape = { ...oldShape };
      if (mask) {
        for (const key in mask) {
          if (!(key in shape)) {
            throw new Error(`Unrecognized key: "${key}"`);
          }
          if (!mask[key])
            continue;
          shape[key] = new Class2({
            type: "nonoptional",
            innerType: oldShape[key]
          });
        }
      } else {
        for (const key in oldShape) {
          shape[key] = new Class2({
            type: "nonoptional",
            innerType: oldShape[key]
          });
        }
      }
      assignProp(this, "shape", shape);
      return shape;
    }
  });
  return clone(schema, def);
}
function aborted(x, startIndex = 0) {
  if (x.aborted === true)
    return true;
  for (let i = startIndex; i < x.issues.length; i++) {
    if (x.issues[i]?.continue !== true) {
      return true;
    }
  }
  return false;
}
function prefixIssues(path3, issues) {
  return issues.map((iss) => {
    var _a2;
    (_a2 = iss).path ?? (_a2.path = []);
    iss.path.unshift(path3);
    return iss;
  });
}
function unwrapMessage(message) {
  return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config3) {
  const full = { ...iss, path: iss.path ?? [] };
  if (!iss.message) {
    const message = unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config3.customError?.(iss)) ?? unwrapMessage(config3.localeError?.(iss)) ?? "Invalid input";
    full.message = message;
  }
  delete full.inst;
  delete full.continue;
  if (!ctx?.reportInput) {
    delete full.input;
  }
  return full;
}
function getSizableOrigin(input) {
  if (input instanceof Set)
    return "set";
  if (input instanceof Map)
    return "map";
  if (input instanceof File)
    return "file";
  return "unknown";
}
function getLengthableOrigin(input) {
  if (Array.isArray(input))
    return "array";
  if (typeof input === "string")
    return "string";
  return "unknown";
}
function parsedType(data) {
  const t = typeof data;
  switch (t) {
    case "number": {
      return Number.isNaN(data) ? "nan" : "number";
    }
    case "object": {
      if (data === null) {
        return "null";
      }
      if (Array.isArray(data)) {
        return "array";
      }
      const obj = data;
      if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) {
        return obj.constructor.name;
      }
    }
  }
  return t;
}
function issue(...args) {
  const [iss, input, inst] = args;
  if (typeof iss === "string") {
    return {
      message: iss,
      code: "custom",
      input,
      inst
    };
  }
  return { ...iss };
}
function cleanEnum(obj) {
  return Object.entries(obj).filter(([k, _]) => {
    return Number.isNaN(Number.parseInt(k, 10));
  }).map((el) => el[1]);
}
function base64ToUint8Array(base643) {
  const binaryString = atob(base643);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
function uint8ArrayToBase64(bytes) {
  let binaryString = "";
  for (let i = 0; i < bytes.length; i++) {
    binaryString += String.fromCharCode(bytes[i]);
  }
  return btoa(binaryString);
}
function base64urlToUint8Array(base64url3) {
  const base643 = base64url3.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - base643.length % 4) % 4);
  return base64ToUint8Array(base643 + padding);
}
function uint8ArrayToBase64url(bytes) {
  return uint8ArrayToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function hexToUint8Array(hex3) {
  const cleanHex = hex3.replace(/^0x/, "");
  if (cleanHex.length % 2 !== 0) {
    throw new Error("Invalid hex string length");
  }
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
  }
  return bytes;
}
function uint8ArrayToHex(bytes) {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
var Class = class {
  constructor(..._args) {
  }
};

// node_modules/zod/v4/core/errors.js
var initializer = (inst, def) => {
  inst.name = "$ZodError";
  Object.defineProperty(inst, "_zod", {
    value: inst._zod,
    enumerable: false
  });
  Object.defineProperty(inst, "issues", {
    value: def,
    enumerable: false
  });
  inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
  Object.defineProperty(inst, "toString", {
    value: () => inst.message,
    enumerable: false
  });
};
var $ZodError = $constructor("$ZodError", initializer);
var $ZodRealError = $constructor("$ZodError", initializer, { Parent: Error });
function flattenError(error48, mapper = (issue2) => issue2.message) {
  const fieldErrors = {};
  const formErrors = [];
  for (const sub of error48.issues) {
    if (sub.path.length > 0) {
      fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
      fieldErrors[sub.path[0]].push(mapper(sub));
    } else {
      formErrors.push(mapper(sub));
    }
  }
  return { formErrors, fieldErrors };
}
function formatError(error48, mapper = (issue2) => issue2.message) {
  const fieldErrors = { _errors: [] };
  const processError = (error49) => {
    for (const issue2 of error49.issues) {
      if (issue2.code === "invalid_union" && issue2.errors.length) {
        issue2.errors.map((issues) => processError({ issues }));
      } else if (issue2.code === "invalid_key") {
        processError({ issues: issue2.issues });
      } else if (issue2.code === "invalid_element") {
        processError({ issues: issue2.issues });
      } else if (issue2.path.length === 0) {
        fieldErrors._errors.push(mapper(issue2));
      } else {
        let curr = fieldErrors;
        let i = 0;
        while (i < issue2.path.length) {
          const el = issue2.path[i];
          const terminal = i === issue2.path.length - 1;
          if (!terminal) {
            curr[el] = curr[el] || { _errors: [] };
          } else {
            curr[el] = curr[el] || { _errors: [] };
            curr[el]._errors.push(mapper(issue2));
          }
          curr = curr[el];
          i++;
        }
      }
    }
  };
  processError(error48);
  return fieldErrors;
}
function treeifyError(error48, mapper = (issue2) => issue2.message) {
  const result = { errors: [] };
  const processError = (error49, path3 = []) => {
    var _a2, _b;
    for (const issue2 of error49.issues) {
      if (issue2.code === "invalid_union" && issue2.errors.length) {
        issue2.errors.map((issues) => processError({ issues }, issue2.path));
      } else if (issue2.code === "invalid_key") {
        processError({ issues: issue2.issues }, issue2.path);
      } else if (issue2.code === "invalid_element") {
        processError({ issues: issue2.issues }, issue2.path);
      } else {
        const fullpath = [...path3, ...issue2.path];
        if (fullpath.length === 0) {
          result.errors.push(mapper(issue2));
          continue;
        }
        let curr = result;
        let i = 0;
        while (i < fullpath.length) {
          const el = fullpath[i];
          const terminal = i === fullpath.length - 1;
          if (typeof el === "string") {
            curr.properties ?? (curr.properties = {});
            (_a2 = curr.properties)[el] ?? (_a2[el] = { errors: [] });
            curr = curr.properties[el];
          } else {
            curr.items ?? (curr.items = []);
            (_b = curr.items)[el] ?? (_b[el] = { errors: [] });
            curr = curr.items[el];
          }
          if (terminal) {
            curr.errors.push(mapper(issue2));
          }
          i++;
        }
      }
    }
  };
  processError(error48);
  return result;
}
function toDotPath(_path) {
  const segs = [];
  const path3 = _path.map((seg) => typeof seg === "object" ? seg.key : seg);
  for (const seg of path3) {
    if (typeof seg === "number")
      segs.push(`[${seg}]`);
    else if (typeof seg === "symbol")
      segs.push(`[${JSON.stringify(String(seg))}]`);
    else if (/[^\w$]/.test(seg))
      segs.push(`[${JSON.stringify(seg)}]`);
    else {
      if (segs.length)
        segs.push(".");
      segs.push(seg);
    }
  }
  return segs.join("");
}
function prettifyError(error48) {
  const lines = [];
  const issues = [...error48.issues].sort((a, b) => (a.path ?? []).length - (b.path ?? []).length);
  for (const issue2 of issues) {
    lines.push(`\u2716 ${issue2.message}`);
    if (issue2.path?.length)
      lines.push(`  \u2192 at ${toDotPath(issue2.path)}`);
  }
  return lines.join("\n");
}

// node_modules/zod/v4/core/parse.js
var _parse = (_Err) => (schema, value, _ctx, _params) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: false }) : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError();
  }
  if (result.issues.length) {
    const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config2())));
    captureStackTrace(e, _params?.callee);
    throw e;
  }
  return result.value;
};
var parse = /* @__PURE__ */ _parse($ZodRealError);
var _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  if (result.issues.length) {
    const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config2())));
    captureStackTrace(e, params?.callee);
    throw e;
  }
  return result.value;
};
var parseAsync = /* @__PURE__ */ _parseAsync($ZodRealError);
var _safeParse = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError();
  }
  return result.issues.length ? {
    success: false,
    error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config2())))
  } : { success: true, data: result.value };
};
var safeParse = /* @__PURE__ */ _safeParse($ZodRealError);
var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  return result.issues.length ? {
    success: false,
    error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config2())))
  } : { success: true, data: result.value };
};
var safeParseAsync = /* @__PURE__ */ _safeParseAsync($ZodRealError);
var _encode = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _parse(_Err)(schema, value, ctx);
};
var encode = /* @__PURE__ */ _encode($ZodRealError);
var _decode = (_Err) => (schema, value, _ctx) => {
  return _parse(_Err)(schema, value, _ctx);
};
var decode = /* @__PURE__ */ _decode($ZodRealError);
var _encodeAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _parseAsync(_Err)(schema, value, ctx);
};
var encodeAsync = /* @__PURE__ */ _encodeAsync($ZodRealError);
var _decodeAsync = (_Err) => async (schema, value, _ctx) => {
  return _parseAsync(_Err)(schema, value, _ctx);
};
var decodeAsync = /* @__PURE__ */ _decodeAsync($ZodRealError);
var _safeEncode = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _safeParse(_Err)(schema, value, ctx);
};
var safeEncode = /* @__PURE__ */ _safeEncode($ZodRealError);
var _safeDecode = (_Err) => (schema, value, _ctx) => {
  return _safeParse(_Err)(schema, value, _ctx);
};
var safeDecode = /* @__PURE__ */ _safeDecode($ZodRealError);
var _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _safeParseAsync(_Err)(schema, value, ctx);
};
var safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync($ZodRealError);
var _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
  return _safeParseAsync(_Err)(schema, value, _ctx);
};
var safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync($ZodRealError);

// node_modules/zod/v4/core/regexes.js
var regexes_exports = {};
__export(regexes_exports, {
  base64: () => base64,
  base64url: () => base64url,
  bigint: () => bigint,
  boolean: () => boolean,
  browserEmail: () => browserEmail,
  cidrv4: () => cidrv4,
  cidrv6: () => cidrv6,
  cuid: () => cuid,
  cuid2: () => cuid2,
  date: () => date,
  datetime: () => datetime,
  domain: () => domain,
  duration: () => duration,
  e164: () => e164,
  email: () => email,
  emoji: () => emoji,
  extendedDuration: () => extendedDuration,
  guid: () => guid,
  hex: () => hex,
  hostname: () => hostname,
  html5Email: () => html5Email,
  idnEmail: () => idnEmail,
  integer: () => integer,
  ipv4: () => ipv4,
  ipv6: () => ipv6,
  ksuid: () => ksuid,
  lowercase: () => lowercase,
  mac: () => mac,
  md5_base64: () => md5_base64,
  md5_base64url: () => md5_base64url,
  md5_hex: () => md5_hex,
  nanoid: () => nanoid2,
  null: () => _null,
  number: () => number,
  rfc5322Email: () => rfc5322Email,
  sha1_base64: () => sha1_base64,
  sha1_base64url: () => sha1_base64url,
  sha1_hex: () => sha1_hex,
  sha256_base64: () => sha256_base64,
  sha256_base64url: () => sha256_base64url,
  sha256_hex: () => sha256_hex,
  sha384_base64: () => sha384_base64,
  sha384_base64url: () => sha384_base64url,
  sha384_hex: () => sha384_hex,
  sha512_base64: () => sha512_base64,
  sha512_base64url: () => sha512_base64url,
  sha512_hex: () => sha512_hex,
  string: () => string,
  time: () => time,
  ulid: () => ulid,
  undefined: () => _undefined,
  unicodeEmail: () => unicodeEmail,
  uppercase: () => uppercase,
  uuid: () => uuid,
  uuid4: () => uuid4,
  uuid6: () => uuid6,
  uuid7: () => uuid7,
  xid: () => xid
});
var cuid = /^[cC][^\s-]{8,}$/;
var cuid2 = /^[0-9a-z]+$/;
var ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
var xid = /^[0-9a-vA-V]{20}$/;
var ksuid = /^[A-Za-z0-9]{27}$/;
var nanoid2 = /^[a-zA-Z0-9_-]{21}$/;
var duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
var extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
var uuid = (version2) => {
  if (!version2)
    return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
  return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version2}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
var uuid4 = /* @__PURE__ */ uuid(4);
var uuid6 = /* @__PURE__ */ uuid(6);
var uuid7 = /* @__PURE__ */ uuid(7);
var email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
var idnEmail = unicodeEmail;
var browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var _emoji = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function emoji() {
  return new RegExp(_emoji, "u");
}
var ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
var mac = (delimiter) => {
  const escapedDelim = escapeRegex(delimiter ?? ":");
  return new RegExp(`^(?:[0-9A-F]{2}${escapedDelim}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${escapedDelim}){5}[0-9a-f]{2}$`);
};
var cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
var cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
var base64url = /^[A-Za-z0-9_-]*$/;
var hostname = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/;
var domain = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
var e164 = /^\+[1-9]\d{6,14}$/;
var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
var date = /* @__PURE__ */ new RegExp(`^${dateSource}$`);
function timeSource(args) {
  const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
  const regex = typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
  return regex;
}
function time(args) {
  return new RegExp(`^${timeSource(args)}$`);
}
function datetime(args) {
  const time3 = timeSource({ precision: args.precision });
  const opts = ["Z"];
  if (args.local)
    opts.push("");
  if (args.offset)
    opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
  const timeRegex = `${time3}(?:${opts.join("|")})`;
  return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
var string = (params) => {
  const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
  return new RegExp(`^${regex}$`);
};
var bigint = /^-?\d+n?$/;
var integer = /^-?\d+$/;
var number = /^-?\d+(?:\.\d+)?$/;
var boolean = /^(?:true|false)$/i;
var _null = /^null$/i;
var _undefined = /^undefined$/i;
var lowercase = /^[^A-Z]*$/;
var uppercase = /^[^a-z]*$/;
var hex = /^[0-9a-fA-F]*$/;
function fixedBase64(bodyLength, padding) {
  return new RegExp(`^[A-Za-z0-9+/]{${bodyLength}}${padding}$`);
}
function fixedBase64url(length) {
  return new RegExp(`^[A-Za-z0-9_-]{${length}}$`);
}
var md5_hex = /^[0-9a-fA-F]{32}$/;
var md5_base64 = /* @__PURE__ */ fixedBase64(22, "==");
var md5_base64url = /* @__PURE__ */ fixedBase64url(22);
var sha1_hex = /^[0-9a-fA-F]{40}$/;
var sha1_base64 = /* @__PURE__ */ fixedBase64(27, "=");
var sha1_base64url = /* @__PURE__ */ fixedBase64url(27);
var sha256_hex = /^[0-9a-fA-F]{64}$/;
var sha256_base64 = /* @__PURE__ */ fixedBase64(43, "=");
var sha256_base64url = /* @__PURE__ */ fixedBase64url(43);
var sha384_hex = /^[0-9a-fA-F]{96}$/;
var sha384_base64 = /* @__PURE__ */ fixedBase64(64, "");
var sha384_base64url = /* @__PURE__ */ fixedBase64url(64);
var sha512_hex = /^[0-9a-fA-F]{128}$/;
var sha512_base64 = /* @__PURE__ */ fixedBase64(86, "==");
var sha512_base64url = /* @__PURE__ */ fixedBase64url(86);

// node_modules/zod/v4/core/checks.js
var $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
  var _a2;
  inst._zod ?? (inst._zod = {});
  inst._zod.def = def;
  (_a2 = inst._zod).onattach ?? (_a2.onattach = []);
});
var numericOriginMap = {
  number: "number",
  bigint: "bigint",
  object: "date"
};
var $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    if (def.value < curr) {
      if (def.inclusive)
        bag.maximum = def.value;
      else
        bag.exclusiveMaximum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
      return;
    }
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    if (def.value > curr) {
      if (def.inclusive)
        bag.minimum = def.value;
      else
        bag.exclusiveMinimum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
      return;
    }
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    var _a2;
    (_a2 = inst2._zod.bag).multipleOf ?? (_a2.multipleOf = def.value);
  });
  inst._zod.check = (payload) => {
    if (typeof payload.value !== typeof def.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    const isMultiple = typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0;
    if (isMultiple)
      return;
    payload.issues.push({
      origin: typeof payload.value,
      code: "not_multiple_of",
      divisor: def.value,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  def.format = def.format || "float64";
  const isInt = def.format?.includes("int");
  const origin = isInt ? "int" : "number";
  const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    bag.minimum = minimum;
    bag.maximum = maximum;
    if (isInt)
      bag.pattern = integer;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (isInt) {
      if (!Number.isInteger(input)) {
        payload.issues.push({
          expected: origin,
          format: def.format,
          code: "invalid_type",
          continue: false,
          input,
          inst
        });
        return;
      }
      if (!Number.isSafeInteger(input)) {
        if (input > 0) {
          payload.issues.push({
            input,
            code: "too_big",
            maximum: Number.MAX_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            inclusive: true,
            continue: !def.abort
          });
        } else {
          payload.issues.push({
            input,
            code: "too_small",
            minimum: Number.MIN_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            inclusive: true,
            continue: !def.abort
          });
        }
        return;
      }
    }
    if (input < minimum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_small",
        minimum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
    if (input > maximum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_big",
        maximum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodCheckBigIntFormat = /* @__PURE__ */ $constructor("$ZodCheckBigIntFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  const [minimum, maximum] = BIGINT_FORMAT_RANGES[def.format];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    bag.minimum = minimum;
    bag.maximum = maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (input < minimum) {
      payload.issues.push({
        origin: "bigint",
        input,
        code: "too_small",
        minimum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
    if (input > maximum) {
      payload.issues.push({
        origin: "bigint",
        input,
        code: "too_big",
        maximum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodCheckMaxSize = /* @__PURE__ */ $constructor("$ZodCheckMaxSize", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.size !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    if (def.maximum < curr)
      inst2._zod.bag.maximum = def.maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size <= def.maximum)
      return;
    payload.issues.push({
      origin: getSizableOrigin(input),
      code: "too_big",
      maximum: def.maximum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMinSize = /* @__PURE__ */ $constructor("$ZodCheckMinSize", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.size !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    if (def.minimum > curr)
      inst2._zod.bag.minimum = def.minimum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size >= def.minimum)
      return;
    payload.issues.push({
      origin: getSizableOrigin(input),
      code: "too_small",
      minimum: def.minimum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckSizeEquals = /* @__PURE__ */ $constructor("$ZodCheckSizeEquals", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.size !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.minimum = def.size;
    bag.maximum = def.size;
    bag.size = def.size;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size === def.size)
      return;
    const tooBig = size > def.size;
    payload.issues.push({
      origin: getSizableOrigin(input),
      ...tooBig ? { code: "too_big", maximum: def.size } : { code: "too_small", minimum: def.size },
      inclusive: true,
      exact: true,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    if (def.maximum < curr)
      inst2._zod.bag.maximum = def.maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length <= def.maximum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: def.maximum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    if (def.minimum > curr)
      inst2._zod.bag.minimum = def.minimum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length >= def.minimum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: def.minimum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.minimum = def.length;
    bag.maximum = def.length;
    bag.length = def.length;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length === def.length)
      return;
    const origin = getLengthableOrigin(input);
    const tooBig = length > def.length;
    payload.issues.push({
      origin,
      ...tooBig ? { code: "too_big", maximum: def.length } : { code: "too_small", minimum: def.length },
      inclusive: true,
      exact: true,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
  var _a2, _b;
  $ZodCheck.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    if (def.pattern) {
      bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
      bag.patterns.add(def.pattern);
    }
  });
  if (def.pattern)
    (_a2 = inst._zod).check ?? (_a2.check = (payload) => {
      def.pattern.lastIndex = 0;
      if (def.pattern.test(payload.value))
        return;
      payload.issues.push({
        origin: "string",
        code: "invalid_format",
        format: def.format,
        input: payload.value,
        ...def.pattern ? { pattern: def.pattern.toString() } : {},
        inst,
        continue: !def.abort
      });
    });
  else
    (_b = inst._zod).check ?? (_b.check = () => {
    });
});
var $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    def.pattern.lastIndex = 0;
    if (def.pattern.test(payload.value))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: payload.value,
      pattern: def.pattern.toString(),
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
  def.pattern ?? (def.pattern = lowercase);
  $ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
  def.pattern ?? (def.pattern = uppercase);
  $ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
  $ZodCheck.init(inst, def);
  const escapedRegex = escapeRegex(def.includes);
  const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
  def.pattern = pattern;
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.includes(def.includes, def.position))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: def.includes,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.startsWith(def.prefix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: def.prefix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.endsWith(def.suffix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: def.suffix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
function handleCheckPropertyResult(result, payload, property) {
  if (result.issues.length) {
    payload.issues.push(...prefixIssues(property, result.issues));
  }
}
var $ZodCheckProperty = /* @__PURE__ */ $constructor("$ZodCheckProperty", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    const result = def.schema._zod.run({
      value: payload.value[def.property],
      issues: []
    }, {});
    if (result instanceof Promise) {
      return result.then((result2) => handleCheckPropertyResult(result2, payload, def.property));
    }
    handleCheckPropertyResult(result, payload, def.property);
    return;
  };
});
var $ZodCheckMimeType = /* @__PURE__ */ $constructor("$ZodCheckMimeType", (inst, def) => {
  $ZodCheck.init(inst, def);
  const mimeSet = new Set(def.mime);
  inst._zod.onattach.push((inst2) => {
    inst2._zod.bag.mime = def.mime;
  });
  inst._zod.check = (payload) => {
    if (mimeSet.has(payload.value.type))
      return;
    payload.issues.push({
      code: "invalid_value",
      values: def.mime,
      input: payload.value.type,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    payload.value = def.tx(payload.value);
  };
});

// node_modules/zod/v4/core/doc.js
var Doc = class {
  constructor(args = []) {
    this.content = [];
    this.indent = 0;
    if (this)
      this.args = args;
  }
  indented(fn) {
    this.indent += 1;
    fn(this);
    this.indent -= 1;
  }
  write(arg) {
    if (typeof arg === "function") {
      arg(this, { execution: "sync" });
      arg(this, { execution: "async" });
      return;
    }
    const content = arg;
    const lines = content.split("\n").filter((x) => x);
    const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
    const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
    for (const line of dedented) {
      this.content.push(line);
    }
  }
  compile() {
    const F = Function;
    const args = this?.args;
    const content = this?.content ?? [``];
    const lines = [...content.map((x) => `  ${x}`)];
    return new F(...args, lines.join("\n"));
  }
};

// node_modules/zod/v4/core/versions.js
var version = {
  major: 4,
  minor: 3,
  patch: 6
};

// node_modules/zod/v4/core/schemas.js
var $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
  var _a2;
  inst ?? (inst = {});
  inst._zod.def = def;
  inst._zod.bag = inst._zod.bag || {};
  inst._zod.version = version;
  const checks = [...inst._zod.def.checks ?? []];
  if (inst._zod.traits.has("$ZodCheck")) {
    checks.unshift(inst);
  }
  for (const ch of checks) {
    for (const fn of ch._zod.onattach) {
      fn(inst);
    }
  }
  if (checks.length === 0) {
    (_a2 = inst._zod).deferred ?? (_a2.deferred = []);
    inst._zod.deferred?.push(() => {
      inst._zod.run = inst._zod.parse;
    });
  } else {
    const runChecks = (payload, checks2, ctx) => {
      let isAborted = aborted(payload);
      let asyncResult;
      for (const ch of checks2) {
        if (ch._zod.def.when) {
          const shouldRun = ch._zod.def.when(payload);
          if (!shouldRun)
            continue;
        } else if (isAborted) {
          continue;
        }
        const currLen = payload.issues.length;
        const _ = ch._zod.check(payload);
        if (_ instanceof Promise && ctx?.async === false) {
          throw new $ZodAsyncError();
        }
        if (asyncResult || _ instanceof Promise) {
          asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
            await _;
            const nextLen = payload.issues.length;
            if (nextLen === currLen)
              return;
            if (!isAborted)
              isAborted = aborted(payload, currLen);
          });
        } else {
          const nextLen = payload.issues.length;
          if (nextLen === currLen)
            continue;
          if (!isAborted)
            isAborted = aborted(payload, currLen);
        }
      }
      if (asyncResult) {
        return asyncResult.then(() => {
          return payload;
        });
      }
      return payload;
    };
    const handleCanaryResult = (canary, payload, ctx) => {
      if (aborted(canary)) {
        canary.aborted = true;
        return canary;
      }
      const checkResult = runChecks(payload, checks, ctx);
      if (checkResult instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError();
        return checkResult.then((checkResult2) => inst._zod.parse(checkResult2, ctx));
      }
      return inst._zod.parse(checkResult, ctx);
    };
    inst._zod.run = (payload, ctx) => {
      if (ctx.skipChecks) {
        return inst._zod.parse(payload, ctx);
      }
      if (ctx.direction === "backward") {
        const canary = inst._zod.parse({ value: payload.value, issues: [] }, { ...ctx, skipChecks: true });
        if (canary instanceof Promise) {
          return canary.then((canary2) => {
            return handleCanaryResult(canary2, payload, ctx);
          });
        }
        return handleCanaryResult(canary, payload, ctx);
      }
      const result = inst._zod.parse(payload, ctx);
      if (result instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError();
        return result.then((result2) => runChecks(result2, checks, ctx));
      }
      return runChecks(result, checks, ctx);
    };
  }
  defineLazy(inst, "~standard", () => ({
    validate: (value) => {
      try {
        const r = safeParse(inst, value);
        return r.success ? { value: r.data } : { issues: r.error?.issues };
      } catch (_) {
        return safeParseAsync(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  }));
});
var $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string(inst._zod.bag);
  inst._zod.parse = (payload, _) => {
    if (def.coerce)
      try {
        payload.value = String(payload.value);
      } catch (_2) {
      }
    if (typeof payload.value === "string")
      return payload;
    payload.issues.push({
      expected: "string",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  $ZodString.init(inst, def);
});
var $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
  def.pattern ?? (def.pattern = guid);
  $ZodStringFormat.init(inst, def);
});
var $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
  if (def.version) {
    const versionMap = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    };
    const v = versionMap[def.version];
    if (v === void 0)
      throw new Error(`Invalid UUID version: "${def.version}"`);
    def.pattern ?? (def.pattern = uuid(v));
  } else
    def.pattern ?? (def.pattern = uuid());
  $ZodStringFormat.init(inst, def);
});
var $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
  def.pattern ?? (def.pattern = email);
  $ZodStringFormat.init(inst, def);
});
var $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    try {
      const trimmed = payload.value.trim();
      const url2 = new URL(trimmed);
      if (def.hostname) {
        def.hostname.lastIndex = 0;
        if (!def.hostname.test(url2.hostname)) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid hostname",
            pattern: def.hostname.source,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      }
      if (def.protocol) {
        def.protocol.lastIndex = 0;
        if (!def.protocol.test(url2.protocol.endsWith(":") ? url2.protocol.slice(0, -1) : url2.protocol)) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid protocol",
            pattern: def.protocol.source,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      }
      if (def.normalize) {
        payload.value = url2.href;
      } else {
        payload.value = trimmed;
      }
      return;
    } catch (_) {
      payload.issues.push({
        code: "invalid_format",
        format: "url",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
  def.pattern ?? (def.pattern = emoji());
  $ZodStringFormat.init(inst, def);
});
var $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
  def.pattern ?? (def.pattern = nanoid2);
  $ZodStringFormat.init(inst, def);
});
var $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
  def.pattern ?? (def.pattern = cuid);
  $ZodStringFormat.init(inst, def);
});
var $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
  def.pattern ?? (def.pattern = cuid2);
  $ZodStringFormat.init(inst, def);
});
var $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
  def.pattern ?? (def.pattern = ulid);
  $ZodStringFormat.init(inst, def);
});
var $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
  def.pattern ?? (def.pattern = xid);
  $ZodStringFormat.init(inst, def);
});
var $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
  def.pattern ?? (def.pattern = ksuid);
  $ZodStringFormat.init(inst, def);
});
var $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
  def.pattern ?? (def.pattern = datetime(def));
  $ZodStringFormat.init(inst, def);
});
var $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
  def.pattern ?? (def.pattern = date);
  $ZodStringFormat.init(inst, def);
});
var $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
  def.pattern ?? (def.pattern = time(def));
  $ZodStringFormat.init(inst, def);
});
var $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
  def.pattern ?? (def.pattern = duration);
  $ZodStringFormat.init(inst, def);
});
var $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
  def.pattern ?? (def.pattern = ipv4);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.format = `ipv4`;
});
var $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
  def.pattern ?? (def.pattern = ipv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.format = `ipv6`;
  inst._zod.check = (payload) => {
    try {
      new URL(`http://[${payload.value}]`);
    } catch {
      payload.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodMAC = /* @__PURE__ */ $constructor("$ZodMAC", (inst, def) => {
  def.pattern ?? (def.pattern = mac(def.delimiter));
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.format = `mac`;
});
var $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv4);
  $ZodStringFormat.init(inst, def);
});
var $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    const parts = payload.value.split("/");
    try {
      if (parts.length !== 2)
        throw new Error();
      const [address, prefix] = parts;
      if (!prefix)
        throw new Error();
      const prefixNum = Number(prefix);
      if (`${prefixNum}` !== prefix)
        throw new Error();
      if (prefixNum < 0 || prefixNum > 128)
        throw new Error();
      new URL(`http://[${address}]`);
    } catch {
      payload.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
function isValidBase64(data) {
  if (data === "")
    return true;
  if (data.length % 4 !== 0)
    return false;
  try {
    atob(data);
    return true;
  } catch {
    return false;
  }
}
var $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
  def.pattern ?? (def.pattern = base64);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.contentEncoding = "base64";
  inst._zod.check = (payload) => {
    if (isValidBase64(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
function isValidBase64URL(data) {
  if (!base64url.test(data))
    return false;
  const base643 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
  const padded = base643.padEnd(Math.ceil(base643.length / 4) * 4, "=");
  return isValidBase64(padded);
}
var $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
  def.pattern ?? (def.pattern = base64url);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.contentEncoding = "base64url";
  inst._zod.check = (payload) => {
    if (isValidBase64URL(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
  def.pattern ?? (def.pattern = e164);
  $ZodStringFormat.init(inst, def);
});
function isValidJWT(token, algorithm = null) {
  try {
    const tokensParts = token.split(".");
    if (tokensParts.length !== 3)
      return false;
    const [header] = tokensParts;
    if (!header)
      return false;
    const parsedHeader = JSON.parse(atob(header));
    if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT")
      return false;
    if (!parsedHeader.alg)
      return false;
    if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm))
      return false;
    return true;
  } catch {
    return false;
  }
}
var $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidJWT(payload.value, def.alg))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCustomStringFormat = /* @__PURE__ */ $constructor("$ZodCustomStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (def.fn(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: def.format,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = inst._zod.bag.pattern ?? number;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Number(payload.value);
      } catch (_) {
      }
    const input = payload.value;
    if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
      return payload;
    }
    const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
    payload.issues.push({
      expected: "number",
      code: "invalid_type",
      input,
      inst,
      ...received ? { received } : {}
    });
    return payload;
  };
});
var $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumberFormat", (inst, def) => {
  $ZodCheckNumberFormat.init(inst, def);
  $ZodNumber.init(inst, def);
});
var $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = boolean;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Boolean(payload.value);
      } catch (_) {
      }
    const input = payload.value;
    if (typeof input === "boolean")
      return payload;
    payload.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodBigInt = /* @__PURE__ */ $constructor("$ZodBigInt", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = bigint;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = BigInt(payload.value);
      } catch (_) {
      }
    if (typeof payload.value === "bigint")
      return payload;
    payload.issues.push({
      expected: "bigint",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodBigIntFormat = /* @__PURE__ */ $constructor("$ZodBigIntFormat", (inst, def) => {
  $ZodCheckBigIntFormat.init(inst, def);
  $ZodBigInt.init(inst, def);
});
var $ZodSymbol = /* @__PURE__ */ $constructor("$ZodSymbol", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "symbol")
      return payload;
    payload.issues.push({
      expected: "symbol",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodUndefined = /* @__PURE__ */ $constructor("$ZodUndefined", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = _undefined;
  inst._zod.values = /* @__PURE__ */ new Set([void 0]);
  inst._zod.optin = "optional";
  inst._zod.optout = "optional";
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "undefined")
      return payload;
    payload.issues.push({
      expected: "undefined",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodNull = /* @__PURE__ */ $constructor("$ZodNull", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = _null;
  inst._zod.values = /* @__PURE__ */ new Set([null]);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (input === null)
      return payload;
    payload.issues.push({
      expected: "null",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodAny = /* @__PURE__ */ $constructor("$ZodAny", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
var $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
var $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    payload.issues.push({
      expected: "never",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodVoid = /* @__PURE__ */ $constructor("$ZodVoid", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "undefined")
      return payload;
    payload.issues.push({
      expected: "void",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodDate = /* @__PURE__ */ $constructor("$ZodDate", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce) {
      try {
        payload.value = new Date(payload.value);
      } catch (_err) {
      }
    }
    const input = payload.value;
    const isDate = input instanceof Date;
    const isValidDate = isDate && !Number.isNaN(input.getTime());
    if (isValidDate)
      return payload;
    payload.issues.push({
      expected: "date",
      code: "invalid_type",
      input,
      ...isDate ? { received: "Invalid Date" } : {},
      inst
    });
    return payload;
  };
});
function handleArrayResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
var $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        expected: "array",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = Array(input.length);
    const proms = [];
    for (let i = 0; i < input.length; i++) {
      const item = input[i];
      const result = def.element._zod.run({
        value: item,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result2) => handleArrayResult(result2, payload, i)));
      } else {
        handleArrayResult(result, payload, i);
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
function handlePropertyResult(result, final, key, input, isOptionalOut) {
  if (result.issues.length) {
    if (isOptionalOut && !(key in input)) {
      return;
    }
    final.issues.push(...prefixIssues(key, result.issues));
  }
  if (result.value === void 0) {
    if (key in input) {
      final.value[key] = void 0;
    }
  } else {
    final.value[key] = result.value;
  }
}
function normalizeDef(def) {
  const keys = Object.keys(def.shape);
  for (const k of keys) {
    if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) {
      throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
    }
  }
  const okeys = optionalKeys(def.shape);
  return {
    ...def,
    keys,
    keySet: new Set(keys),
    numKeys: keys.length,
    optionalKeys: new Set(okeys)
  };
}
function handleCatchall(proms, input, payload, ctx, def, inst) {
  const unrecognized = [];
  const keySet = def.keySet;
  const _catchall = def.catchall._zod;
  const t = _catchall.def.type;
  const isOptionalOut = _catchall.optout === "optional";
  for (const key in input) {
    if (keySet.has(key))
      continue;
    if (t === "never") {
      unrecognized.push(key);
      continue;
    }
    const r = _catchall.run({ value: input[key], issues: [] }, ctx);
    if (r instanceof Promise) {
      proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, isOptionalOut)));
    } else {
      handlePropertyResult(r, payload, key, input, isOptionalOut);
    }
  }
  if (unrecognized.length) {
    payload.issues.push({
      code: "unrecognized_keys",
      keys: unrecognized,
      input,
      inst
    });
  }
  if (!proms.length)
    return payload;
  return Promise.all(proms).then(() => {
    return payload;
  });
}
var $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
  $ZodType.init(inst, def);
  const desc = Object.getOwnPropertyDescriptor(def, "shape");
  if (!desc?.get) {
    const sh = def.shape;
    Object.defineProperty(def, "shape", {
      get: () => {
        const newSh = { ...sh };
        Object.defineProperty(def, "shape", {
          value: newSh
        });
        return newSh;
      }
    });
  }
  const _normalized = cached(() => normalizeDef(def));
  defineLazy(inst._zod, "propValues", () => {
    const shape = def.shape;
    const propValues = {};
    for (const key in shape) {
      const field = shape[key]._zod;
      if (field.values) {
        propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
        for (const v of field.values)
          propValues[key].add(v);
      }
    }
    return propValues;
  });
  const isObject2 = isObject;
  const catchall = def.catchall;
  let value;
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject2(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = {};
    const proms = [];
    const shape = value.shape;
    for (const key of value.keys) {
      const el = shape[key];
      const isOptionalOut = el._zod.optout === "optional";
      const r = el._zod.run({ value: input[key], issues: [] }, ctx);
      if (r instanceof Promise) {
        proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, isOptionalOut)));
      } else {
        handlePropertyResult(r, payload, key, input, isOptionalOut);
      }
    }
    if (!catchall) {
      return proms.length ? Promise.all(proms).then(() => payload) : payload;
    }
    return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
  };
});
var $ZodObjectJIT = /* @__PURE__ */ $constructor("$ZodObjectJIT", (inst, def) => {
  $ZodObject.init(inst, def);
  const superParse = inst._zod.parse;
  const _normalized = cached(() => normalizeDef(def));
  const generateFastpass = (shape) => {
    const doc = new Doc(["shape", "payload", "ctx"]);
    const normalized = _normalized.value;
    const parseStr = (key) => {
      const k = esc(key);
      return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
    };
    doc.write(`const input = payload.value;`);
    const ids = /* @__PURE__ */ Object.create(null);
    let counter = 0;
    for (const key of normalized.keys) {
      ids[key] = `key_${counter++}`;
    }
    doc.write(`const newResult = {};`);
    for (const key of normalized.keys) {
      const id = ids[key];
      const k = esc(key);
      const schema = shape[key];
      const isOptionalOut = schema?._zod?.optout === "optional";
      doc.write(`const ${id} = ${parseStr(key)};`);
      if (isOptionalOut) {
        doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
      } else {
        doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
      }
    }
    doc.write(`payload.value = newResult;`);
    doc.write(`return payload;`);
    const fn = doc.compile();
    return (payload, ctx) => fn(shape, payload, ctx);
  };
  let fastpass;
  const isObject2 = isObject;
  const jit = !globalConfig.jitless;
  const allowsEval2 = allowsEval;
  const fastEnabled = jit && allowsEval2.value;
  const catchall = def.catchall;
  let value;
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject2(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
      if (!fastpass)
        fastpass = generateFastpass(def.shape);
      payload = fastpass(payload, ctx);
      if (!catchall)
        return payload;
      return handleCatchall([], input, payload, ctx, value, inst);
    }
    return superParse(payload, ctx);
  };
});
function handleUnionResults(results, final, inst, ctx) {
  for (const result of results) {
    if (result.issues.length === 0) {
      final.value = result.value;
      return final;
    }
  }
  const nonaborted = results.filter((r) => !aborted(r));
  if (nonaborted.length === 1) {
    final.value = nonaborted[0].value;
    return nonaborted[0];
  }
  final.issues.push({
    code: "invalid_union",
    input: final.value,
    inst,
    errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config2())))
  });
  return final;
}
var $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
  defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
  defineLazy(inst._zod, "values", () => {
    if (def.options.every((o) => o._zod.values)) {
      return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
    }
    return void 0;
  });
  defineLazy(inst._zod, "pattern", () => {
    if (def.options.every((o) => o._zod.pattern)) {
      const patterns = def.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
    }
    return void 0;
  });
  const single = def.options.length === 1;
  const first = def.options[0]._zod.run;
  inst._zod.parse = (payload, ctx) => {
    if (single) {
      return first(payload, ctx);
    }
    let async = false;
    const results = [];
    for (const option of def.options) {
      const result = option._zod.run({
        value: payload.value,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        results.push(result);
        async = true;
      } else {
        if (result.issues.length === 0)
          return result;
        results.push(result);
      }
    }
    if (!async)
      return handleUnionResults(results, payload, inst, ctx);
    return Promise.all(results).then((results2) => {
      return handleUnionResults(results2, payload, inst, ctx);
    });
  };
});
function handleExclusiveUnionResults(results, final, inst, ctx) {
  const successes = results.filter((r) => r.issues.length === 0);
  if (successes.length === 1) {
    final.value = successes[0].value;
    return final;
  }
  if (successes.length === 0) {
    final.issues.push({
      code: "invalid_union",
      input: final.value,
      inst,
      errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config2())))
    });
  } else {
    final.issues.push({
      code: "invalid_union",
      input: final.value,
      inst,
      errors: [],
      inclusive: false
    });
  }
  return final;
}
var $ZodXor = /* @__PURE__ */ $constructor("$ZodXor", (inst, def) => {
  $ZodUnion.init(inst, def);
  def.inclusive = false;
  const single = def.options.length === 1;
  const first = def.options[0]._zod.run;
  inst._zod.parse = (payload, ctx) => {
    if (single) {
      return first(payload, ctx);
    }
    let async = false;
    const results = [];
    for (const option of def.options) {
      const result = option._zod.run({
        value: payload.value,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        results.push(result);
        async = true;
      } else {
        results.push(result);
      }
    }
    if (!async)
      return handleExclusiveUnionResults(results, payload, inst, ctx);
    return Promise.all(results).then((results2) => {
      return handleExclusiveUnionResults(results2, payload, inst, ctx);
    });
  };
});
var $ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
  def.inclusive = false;
  $ZodUnion.init(inst, def);
  const _super = inst._zod.parse;
  defineLazy(inst._zod, "propValues", () => {
    const propValues = {};
    for (const option of def.options) {
      const pv = option._zod.propValues;
      if (!pv || Object.keys(pv).length === 0)
        throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
      for (const [k, v] of Object.entries(pv)) {
        if (!propValues[k])
          propValues[k] = /* @__PURE__ */ new Set();
        for (const val of v) {
          propValues[k].add(val);
        }
      }
    }
    return propValues;
  });
  const disc = cached(() => {
    const opts = def.options;
    const map2 = /* @__PURE__ */ new Map();
    for (const o of opts) {
      const values = o._zod.propValues?.[def.discriminator];
      if (!values || values.size === 0)
        throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
      for (const v of values) {
        if (map2.has(v)) {
          throw new Error(`Duplicate discriminator value "${String(v)}"`);
        }
        map2.set(v, o);
      }
    }
    return map2;
  });
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isObject(input)) {
      payload.issues.push({
        code: "invalid_type",
        expected: "object",
        input,
        inst
      });
      return payload;
    }
    const opt = disc.value.get(input?.[def.discriminator]);
    if (opt) {
      return opt._zod.run(payload, ctx);
    }
    if (def.unionFallback) {
      return _super(payload, ctx);
    }
    payload.issues.push({
      code: "invalid_union",
      errors: [],
      note: "No matching discriminator",
      discriminator: def.discriminator,
      input,
      path: [def.discriminator],
      inst
    });
    return payload;
  };
});
var $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    const left = def.left._zod.run({ value: input, issues: [] }, ctx);
    const right = def.right._zod.run({ value: input, issues: [] }, ctx);
    const async = left instanceof Promise || right instanceof Promise;
    if (async) {
      return Promise.all([left, right]).then(([left2, right2]) => {
        return handleIntersectionResults(payload, left2, right2);
      });
    }
    return handleIntersectionResults(payload, left, right);
  };
});
function mergeValues(a, b) {
  if (a === b) {
    return { valid: true, data: a };
  }
  if (a instanceof Date && b instanceof Date && +a === +b) {
    return { valid: true, data: a };
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const bKeys = Object.keys(b);
    const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
        };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return { valid: false, mergeErrorPath: [] };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
        };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  }
  return { valid: false, mergeErrorPath: [] };
}
function handleIntersectionResults(result, left, right) {
  const unrecKeys = /* @__PURE__ */ new Map();
  let unrecIssue;
  for (const iss of left.issues) {
    if (iss.code === "unrecognized_keys") {
      unrecIssue ?? (unrecIssue = iss);
      for (const k of iss.keys) {
        if (!unrecKeys.has(k))
          unrecKeys.set(k, {});
        unrecKeys.get(k).l = true;
      }
    } else {
      result.issues.push(iss);
    }
  }
  for (const iss of right.issues) {
    if (iss.code === "unrecognized_keys") {
      for (const k of iss.keys) {
        if (!unrecKeys.has(k))
          unrecKeys.set(k, {});
        unrecKeys.get(k).r = true;
      }
    } else {
      result.issues.push(iss);
    }
  }
  const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
  if (bothKeys.length && unrecIssue) {
    result.issues.push({ ...unrecIssue, keys: bothKeys });
  }
  if (aborted(result))
    return result;
  const merged = mergeValues(left.value, right.value);
  if (!merged.valid) {
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
  }
  result.value = merged.data;
  return result;
}
var $ZodTuple = /* @__PURE__ */ $constructor("$ZodTuple", (inst, def) => {
  $ZodType.init(inst, def);
  const items = def.items;
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        input,
        inst,
        expected: "tuple",
        code: "invalid_type"
      });
      return payload;
    }
    payload.value = [];
    const proms = [];
    const reversedIndex = [...items].reverse().findIndex((item) => item._zod.optin !== "optional");
    const optStart = reversedIndex === -1 ? 0 : items.length - reversedIndex;
    if (!def.rest) {
      const tooBig = input.length > items.length;
      const tooSmall = input.length < optStart - 1;
      if (tooBig || tooSmall) {
        payload.issues.push({
          ...tooBig ? { code: "too_big", maximum: items.length, inclusive: true } : { code: "too_small", minimum: items.length },
          input,
          inst,
          origin: "array"
        });
        return payload;
      }
    }
    let i = -1;
    for (const item of items) {
      i++;
      if (i >= input.length) {
        if (i >= optStart)
          continue;
      }
      const result = item._zod.run({
        value: input[i],
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result2) => handleTupleResult(result2, payload, i)));
      } else {
        handleTupleResult(result, payload, i);
      }
    }
    if (def.rest) {
      const rest = input.slice(items.length);
      for (const el of rest) {
        i++;
        const result = def.rest._zod.run({
          value: el,
          issues: []
        }, ctx);
        if (result instanceof Promise) {
          proms.push(result.then((result2) => handleTupleResult(result2, payload, i)));
        } else {
          handleTupleResult(result, payload, i);
        }
      }
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
});
function handleTupleResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
var $ZodRecord = /* @__PURE__ */ $constructor("$ZodRecord", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isPlainObject(input)) {
      payload.issues.push({
        expected: "record",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    const values = def.keyType._zod.values;
    if (values) {
      payload.value = {};
      const recordKeys = /* @__PURE__ */ new Set();
      for (const key of values) {
        if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
          recordKeys.add(typeof key === "number" ? key.toString() : key);
          const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
          if (result instanceof Promise) {
            proms.push(result.then((result2) => {
              if (result2.issues.length) {
                payload.issues.push(...prefixIssues(key, result2.issues));
              }
              payload.value[key] = result2.value;
            }));
          } else {
            if (result.issues.length) {
              payload.issues.push(...prefixIssues(key, result.issues));
            }
            payload.value[key] = result.value;
          }
        }
      }
      let unrecognized;
      for (const key in input) {
        if (!recordKeys.has(key)) {
          unrecognized = unrecognized ?? [];
          unrecognized.push(key);
        }
      }
      if (unrecognized && unrecognized.length > 0) {
        payload.issues.push({
          code: "unrecognized_keys",
          input,
          inst,
          keys: unrecognized
        });
      }
    } else {
      payload.value = {};
      for (const key of Reflect.ownKeys(input)) {
        if (key === "__proto__")
          continue;
        let keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
        if (keyResult instanceof Promise) {
          throw new Error("Async schemas not supported in object keys currently");
        }
        const checkNumericKey = typeof key === "string" && number.test(key) && keyResult.issues.length;
        if (checkNumericKey) {
          const retryResult = def.keyType._zod.run({ value: Number(key), issues: [] }, ctx);
          if (retryResult instanceof Promise) {
            throw new Error("Async schemas not supported in object keys currently");
          }
          if (retryResult.issues.length === 0) {
            keyResult = retryResult;
          }
        }
        if (keyResult.issues.length) {
          if (def.mode === "loose") {
            payload.value[key] = input[key];
          } else {
            payload.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config2())),
              input: key,
              path: [key],
              inst
            });
          }
          continue;
        }
        const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
        if (result instanceof Promise) {
          proms.push(result.then((result2) => {
            if (result2.issues.length) {
              payload.issues.push(...prefixIssues(key, result2.issues));
            }
            payload.value[keyResult.value] = result2.value;
          }));
        } else {
          if (result.issues.length) {
            payload.issues.push(...prefixIssues(key, result.issues));
          }
          payload.value[keyResult.value] = result.value;
        }
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
var $ZodMap = /* @__PURE__ */ $constructor("$ZodMap", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!(input instanceof Map)) {
      payload.issues.push({
        expected: "map",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    payload.value = /* @__PURE__ */ new Map();
    for (const [key, value] of input) {
      const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
      const valueResult = def.valueType._zod.run({ value, issues: [] }, ctx);
      if (keyResult instanceof Promise || valueResult instanceof Promise) {
        proms.push(Promise.all([keyResult, valueResult]).then(([keyResult2, valueResult2]) => {
          handleMapResult(keyResult2, valueResult2, payload, key, input, inst, ctx);
        }));
      } else {
        handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
      }
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
});
function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
  if (keyResult.issues.length) {
    if (propertyKeyTypes.has(typeof key)) {
      final.issues.push(...prefixIssues(key, keyResult.issues));
    } else {
      final.issues.push({
        code: "invalid_key",
        origin: "map",
        input,
        inst,
        issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config2()))
      });
    }
  }
  if (valueResult.issues.length) {
    if (propertyKeyTypes.has(typeof key)) {
      final.issues.push(...prefixIssues(key, valueResult.issues));
    } else {
      final.issues.push({
        origin: "map",
        code: "invalid_element",
        input,
        inst,
        key,
        issues: valueResult.issues.map((iss) => finalizeIssue(iss, ctx, config2()))
      });
    }
  }
  final.value.set(keyResult.value, valueResult.value);
}
var $ZodSet = /* @__PURE__ */ $constructor("$ZodSet", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!(input instanceof Set)) {
      payload.issues.push({
        input,
        inst,
        expected: "set",
        code: "invalid_type"
      });
      return payload;
    }
    const proms = [];
    payload.value = /* @__PURE__ */ new Set();
    for (const item of input) {
      const result = def.valueType._zod.run({ value: item, issues: [] }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result2) => handleSetResult(result2, payload)));
      } else
        handleSetResult(result, payload);
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
});
function handleSetResult(result, final) {
  if (result.issues.length) {
    final.issues.push(...result.issues);
  }
  final.value.add(result.value);
}
var $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
  $ZodType.init(inst, def);
  const values = getEnumValues(def.entries);
  const valuesSet = new Set(values);
  inst._zod.values = valuesSet;
  inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (valuesSet.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values,
      input,
      inst
    });
    return payload;
  };
});
var $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  if (def.values.length === 0) {
    throw new Error("Cannot create literal schema with no valid values");
  }
  const values = new Set(def.values);
  inst._zod.values = values;
  inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$`);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (values.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values: def.values,
      input,
      inst
    });
    return payload;
  };
});
var $ZodFile = /* @__PURE__ */ $constructor("$ZodFile", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (input instanceof File)
      return payload;
    payload.issues.push({
      expected: "file",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      throw new $ZodEncodeError(inst.constructor.name);
    }
    const _out = def.transform(payload.value, payload);
    if (ctx.async) {
      const output = _out instanceof Promise ? _out : Promise.resolve(_out);
      return output.then((output2) => {
        payload.value = output2;
        return payload;
      });
    }
    if (_out instanceof Promise) {
      throw new $ZodAsyncError();
    }
    payload.value = _out;
    return payload;
  };
});
function handleOptionalResult(result, input) {
  if (result.issues.length && input === void 0) {
    return { issues: [], value: void 0 };
  }
  return result;
}
var $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  inst._zod.optout = "optional";
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, void 0]) : void 0;
  });
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    if (def.innerType._zod.optin === "optional") {
      const result = def.innerType._zod.run(payload, ctx);
      if (result instanceof Promise)
        return result.then((r) => handleOptionalResult(r, payload.value));
      return handleOptionalResult(result, payload.value);
    }
    if (payload.value === void 0) {
      return payload;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodExactOptional = /* @__PURE__ */ $constructor("$ZodExactOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
  inst._zod.parse = (payload, ctx) => {
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
  });
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, null]) : void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === null)
      return payload;
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === void 0) {
      payload.value = def.defaultValue;
      return payload;
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => handleDefaultResult(result2, def));
    }
    return handleDefaultResult(result, def);
  };
});
function handleDefaultResult(payload, def) {
  if (payload.value === void 0) {
    payload.value = def.defaultValue;
  }
  return payload;
}
var $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === void 0) {
      payload.value = def.defaultValue;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => {
    const v = def.innerType._zod.values;
    return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => handleNonOptionalResult(result2, inst));
    }
    return handleNonOptionalResult(result, inst);
  };
});
function handleNonOptionalResult(payload, inst) {
  if (!payload.issues.length && payload.value === void 0) {
    payload.issues.push({
      code: "invalid_type",
      expected: "nonoptional",
      input: payload.value,
      inst
    });
  }
  return payload;
}
var $ZodSuccess = /* @__PURE__ */ $constructor("$ZodSuccess", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      throw new $ZodEncodeError("ZodSuccess");
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => {
        payload.value = result2.issues.length === 0;
        return payload;
      });
    }
    payload.value = result.issues.length === 0;
    return payload;
  };
});
var $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => {
        payload.value = result2.value;
        if (result2.issues.length) {
          payload.value = def.catchValue({
            ...payload,
            error: {
              issues: result2.issues.map((iss) => finalizeIssue(iss, ctx, config2()))
            },
            input: payload.value
          });
          payload.issues = [];
        }
        return payload;
      });
    }
    payload.value = result.value;
    if (result.issues.length) {
      payload.value = def.catchValue({
        ...payload,
        error: {
          issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config2()))
        },
        input: payload.value
      });
      payload.issues = [];
    }
    return payload;
  };
});
var $ZodNaN = /* @__PURE__ */ $constructor("$ZodNaN", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "number" || !Number.isNaN(payload.value)) {
      payload.issues.push({
        input: payload.value,
        inst,
        expected: "nan",
        code: "invalid_type"
      });
      return payload;
    }
    return payload;
  };
});
var $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => def.in._zod.values);
  defineLazy(inst._zod, "optin", () => def.in._zod.optin);
  defineLazy(inst._zod, "optout", () => def.out._zod.optout);
  defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      const right = def.out._zod.run(payload, ctx);
      if (right instanceof Promise) {
        return right.then((right2) => handlePipeResult(right2, def.in, ctx));
      }
      return handlePipeResult(right, def.in, ctx);
    }
    const left = def.in._zod.run(payload, ctx);
    if (left instanceof Promise) {
      return left.then((left2) => handlePipeResult(left2, def.out, ctx));
    }
    return handlePipeResult(left, def.out, ctx);
  };
});
function handlePipeResult(left, next, ctx) {
  if (left.issues.length) {
    left.aborted = true;
    return left;
  }
  return next._zod.run({ value: left.value, issues: left.issues }, ctx);
}
var $ZodCodec = /* @__PURE__ */ $constructor("$ZodCodec", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => def.in._zod.values);
  defineLazy(inst._zod, "optin", () => def.in._zod.optin);
  defineLazy(inst._zod, "optout", () => def.out._zod.optout);
  defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
  inst._zod.parse = (payload, ctx) => {
    const direction = ctx.direction || "forward";
    if (direction === "forward") {
      const left = def.in._zod.run(payload, ctx);
      if (left instanceof Promise) {
        return left.then((left2) => handleCodecAResult(left2, def, ctx));
      }
      return handleCodecAResult(left, def, ctx);
    } else {
      const right = def.out._zod.run(payload, ctx);
      if (right instanceof Promise) {
        return right.then((right2) => handleCodecAResult(right2, def, ctx));
      }
      return handleCodecAResult(right, def, ctx);
    }
  };
});
function handleCodecAResult(result, def, ctx) {
  if (result.issues.length) {
    result.aborted = true;
    return result;
  }
  const direction = ctx.direction || "forward";
  if (direction === "forward") {
    const transformed = def.transform(result.value, result);
    if (transformed instanceof Promise) {
      return transformed.then((value) => handleCodecTxResult(result, value, def.out, ctx));
    }
    return handleCodecTxResult(result, transformed, def.out, ctx);
  } else {
    const transformed = def.reverseTransform(result.value, result);
    if (transformed instanceof Promise) {
      return transformed.then((value) => handleCodecTxResult(result, value, def.in, ctx));
    }
    return handleCodecTxResult(result, transformed, def.in, ctx);
  }
}
function handleCodecTxResult(left, value, nextSchema, ctx) {
  if (left.issues.length) {
    left.aborted = true;
    return left;
  }
  return nextSchema._zod.run({ value, issues: left.issues }, ctx);
}
var $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
  defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then(handleReadonlyResult);
    }
    return handleReadonlyResult(result);
  };
});
function handleReadonlyResult(payload) {
  payload.value = Object.freeze(payload.value);
  return payload;
}
var $ZodTemplateLiteral = /* @__PURE__ */ $constructor("$ZodTemplateLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  const regexParts = [];
  for (const part of def.parts) {
    if (typeof part === "object" && part !== null) {
      if (!part._zod.pattern) {
        throw new Error(`Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`);
      }
      const source = part._zod.pattern instanceof RegExp ? part._zod.pattern.source : part._zod.pattern;
      if (!source)
        throw new Error(`Invalid template literal part: ${part._zod.traits}`);
      const start = source.startsWith("^") ? 1 : 0;
      const end = source.endsWith("$") ? source.length - 1 : source.length;
      regexParts.push(source.slice(start, end));
    } else if (part === null || primitiveTypes.has(typeof part)) {
      regexParts.push(escapeRegex(`${part}`));
    } else {
      throw new Error(`Invalid template literal part: ${part}`);
    }
  }
  inst._zod.pattern = new RegExp(`^${regexParts.join("")}$`);
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "string") {
      payload.issues.push({
        input: payload.value,
        inst,
        expected: "string",
        code: "invalid_type"
      });
      return payload;
    }
    inst._zod.pattern.lastIndex = 0;
    if (!inst._zod.pattern.test(payload.value)) {
      payload.issues.push({
        input: payload.value,
        inst,
        code: "invalid_format",
        format: def.format ?? "template_literal",
        pattern: inst._zod.pattern.source
      });
      return payload;
    }
    return payload;
  };
});
var $ZodFunction = /* @__PURE__ */ $constructor("$ZodFunction", (inst, def) => {
  $ZodType.init(inst, def);
  inst._def = def;
  inst._zod.def = def;
  inst.implement = (func) => {
    if (typeof func !== "function") {
      throw new Error("implement() must be called with a function");
    }
    return function(...args) {
      const parsedArgs = inst._def.input ? parse(inst._def.input, args) : args;
      const result = Reflect.apply(func, this, parsedArgs);
      if (inst._def.output) {
        return parse(inst._def.output, result);
      }
      return result;
    };
  };
  inst.implementAsync = (func) => {
    if (typeof func !== "function") {
      throw new Error("implementAsync() must be called with a function");
    }
    return async function(...args) {
      const parsedArgs = inst._def.input ? await parseAsync(inst._def.input, args) : args;
      const result = await Reflect.apply(func, this, parsedArgs);
      if (inst._def.output) {
        return await parseAsync(inst._def.output, result);
      }
      return result;
    };
  };
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "function") {
      payload.issues.push({
        code: "invalid_type",
        expected: "function",
        input: payload.value,
        inst
      });
      return payload;
    }
    const hasPromiseOutput = inst._def.output && inst._def.output._zod.def.type === "promise";
    if (hasPromiseOutput) {
      payload.value = inst.implementAsync(payload.value);
    } else {
      payload.value = inst.implement(payload.value);
    }
    return payload;
  };
  inst.input = (...args) => {
    const F = inst.constructor;
    if (Array.isArray(args[0])) {
      return new F({
        type: "function",
        input: new $ZodTuple({
          type: "tuple",
          items: args[0],
          rest: args[1]
        }),
        output: inst._def.output
      });
    }
    return new F({
      type: "function",
      input: args[0],
      output: inst._def.output
    });
  };
  inst.output = (output) => {
    const F = inst.constructor;
    return new F({
      type: "function",
      input: inst._def.input,
      output
    });
  };
  return inst;
});
var $ZodPromise = /* @__PURE__ */ $constructor("$ZodPromise", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    return Promise.resolve(payload.value).then((inner) => def.innerType._zod.run({ value: inner, issues: [] }, ctx));
  };
});
var $ZodLazy = /* @__PURE__ */ $constructor("$ZodLazy", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "innerType", () => def.getter());
  defineLazy(inst._zod, "pattern", () => inst._zod.innerType?._zod?.pattern);
  defineLazy(inst._zod, "propValues", () => inst._zod.innerType?._zod?.propValues);
  defineLazy(inst._zod, "optin", () => inst._zod.innerType?._zod?.optin ?? void 0);
  defineLazy(inst._zod, "optout", () => inst._zod.innerType?._zod?.optout ?? void 0);
  inst._zod.parse = (payload, ctx) => {
    const inner = inst._zod.innerType;
    return inner._zod.run(payload, ctx);
  };
});
var $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
  $ZodCheck.init(inst, def);
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _) => {
    return payload;
  };
  inst._zod.check = (payload) => {
    const input = payload.value;
    const r = def.fn(input);
    if (r instanceof Promise) {
      return r.then((r2) => handleRefineResult(r2, payload, input, inst));
    }
    handleRefineResult(r, payload, input, inst);
    return;
  };
});
function handleRefineResult(result, payload, input, inst) {
  if (!result) {
    const _iss = {
      code: "custom",
      input,
      inst,
      // incorporates params.error into issue reporting
      path: [...inst._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !inst._zod.def.abort
      // params: inst._zod.def.params,
    };
    if (inst._zod.def.params)
      _iss.params = inst._zod.def.params;
    payload.issues.push(issue(_iss));
  }
}

// node_modules/zod/v4/locales/index.js
var locales_exports = {};
__export(locales_exports, {
  ar: () => ar_default,
  az: () => az_default,
  be: () => be_default,
  bg: () => bg_default,
  ca: () => ca_default,
  cs: () => cs_default,
  da: () => da_default,
  de: () => de_default,
  en: () => en_default,
  eo: () => eo_default,
  es: () => es_default,
  fa: () => fa_default,
  fi: () => fi_default,
  fr: () => fr_default,
  frCA: () => fr_CA_default,
  he: () => he_default,
  hu: () => hu_default,
  hy: () => hy_default,
  id: () => id_default,
  is: () => is_default,
  it: () => it_default,
  ja: () => ja_default,
  ka: () => ka_default,
  kh: () => kh_default,
  km: () => km_default,
  ko: () => ko_default,
  lt: () => lt_default,
  mk: () => mk_default,
  ms: () => ms_default,
  nl: () => nl_default,
  no: () => no_default,
  ota: () => ota_default,
  pl: () => pl_default,
  ps: () => ps_default,
  pt: () => pt_default,
  ru: () => ru_default,
  sl: () => sl_default,
  sv: () => sv_default,
  ta: () => ta_default,
  th: () => th_default,
  tr: () => tr_default,
  ua: () => ua_default,
  uk: () => uk_default,
  ur: () => ur_default,
  uz: () => uz_default,
  vi: () => vi_default,
  yo: () => yo_default,
  zhCN: () => zh_CN_default,
  zhTW: () => zh_TW_default
});

// node_modules/zod/v4/locales/ar.js
var error = () => {
  const Sizable = {
    string: { unit: "\u062D\u0631\u0641", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" },
    file: { unit: "\u0628\u0627\u064A\u062A", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" },
    array: { unit: "\u0639\u0646\u0635\u0631", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" },
    set: { unit: "\u0639\u0646\u0635\u0631", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0645\u062F\u062E\u0644",
    email: "\u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",
    url: "\u0631\u0627\u0628\u0637",
    emoji: "\u0625\u064A\u0645\u0648\u062C\u064A",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
    date: "\u062A\u0627\u0631\u064A\u062E \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
    time: "\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
    duration: "\u0645\u062F\u0629 \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
    ipv4: "\u0639\u0646\u0648\u0627\u0646 IPv4",
    ipv6: "\u0639\u0646\u0648\u0627\u0646 IPv6",
    cidrv4: "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv4",
    cidrv6: "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv6",
    base64: "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64-encoded",
    base64url: "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64url-encoded",
    json_string: "\u0646\u064E\u0635 \u0639\u0644\u0649 \u0647\u064A\u0626\u0629 JSON",
    e164: "\u0631\u0642\u0645 \u0647\u0627\u062A\u0641 \u0628\u0645\u0639\u064A\u0627\u0631 E.164",
    jwt: "JWT",
    template_literal: "\u0645\u062F\u062E\u0644"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 instanceof ${issue2.expected}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${received}`;
        }
        return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${expected}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${stringifyPrimitive(issue2.values[0])}`;
        return `\u0627\u062E\u062A\u064A\u0627\u0631 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062A\u0648\u0642\u0639 \u0627\u0646\u062A\u0642\u0627\u0621 \u0623\u062D\u062F \u0647\u0630\u0647 \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return ` \u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${issue2.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0635\u0631"}`;
        return `\u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${issue2.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"} ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${issue2.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${issue2.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0628\u062F\u0623 \u0628\u0640 "${issue2.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0646\u062A\u0647\u064A \u0628\u0640 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u062A\u0636\u0645\u0651\u064E\u0646 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0637\u0627\u0628\u0642 \u0627\u0644\u0646\u0645\u0637 ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644`;
      }
      case "not_multiple_of":
        return `\u0631\u0642\u0645 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0645\u0646 \u0645\u0636\u0627\u0639\u0641\u0627\u062A ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u0645\u0639\u0631\u0641${issue2.keys.length > 1 ? "\u0627\u062A" : ""} \u063A\u0631\u064A\u0628${issue2.keys.length > 1 ? "\u0629" : ""}: ${joinValues(issue2.keys, "\u060C ")}`;
      case "invalid_key":
        return `\u0645\u0639\u0631\u0641 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${issue2.origin}`;
      case "invalid_union":
        return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
      case "invalid_element":
        return `\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${issue2.origin}`;
      default:
        return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
    }
  };
};
function ar_default() {
  return {
    localeError: error()
  };
}

// node_modules/zod/v4/locales/az.js
var error2 = () => {
  const Sizable = {
    string: { unit: "simvol", verb: "olmal\u0131d\u0131r" },
    file: { unit: "bayt", verb: "olmal\u0131d\u0131r" },
    array: { unit: "element", verb: "olmal\u0131d\u0131r" },
    set: { unit: "element", verb: "olmal\u0131d\u0131r" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n instanceof ${issue2.expected}, daxil olan ${received}`;
        }
        return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${expected}, daxil olan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${stringifyPrimitive(issue2.values[0])}`;
        return `Yanl\u0131\u015F se\xE7im: a\u015Fa\u011F\u0131dak\u0131lardan biri olmal\u0131d\u0131r: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${issue2.origin ?? "d\u0259y\u0259r"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
        return `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${issue2.origin ?? "d\u0259y\u0259r"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        return `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Yanl\u0131\u015F m\u0259tn: "${_issue.prefix}" il\u0259 ba\u015Flamal\u0131d\u0131r`;
        if (_issue.format === "ends_with")
          return `Yanl\u0131\u015F m\u0259tn: "${_issue.suffix}" il\u0259 bitm\u0259lidir`;
        if (_issue.format === "includes")
          return `Yanl\u0131\u015F m\u0259tn: "${_issue.includes}" daxil olmal\u0131d\u0131r`;
        if (_issue.format === "regex")
          return `Yanl\u0131\u015F m\u0259tn: ${_issue.pattern} \u015Fablonuna uy\u011Fun olmal\u0131d\u0131r`;
        return `Yanl\u0131\u015F ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Yanl\u0131\u015F \u0259d\u0259d: ${issue2.divisor} il\u0259 b\xF6l\xFCn\u0259 bil\u0259n olmal\u0131d\u0131r`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan a\xE7ar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} daxilind\u0259 yanl\u0131\u015F a\xE7ar`;
      case "invalid_union":
        return "Yanl\u0131\u015F d\u0259y\u0259r";
      case "invalid_element":
        return `${issue2.origin} daxilind\u0259 yanl\u0131\u015F d\u0259y\u0259r`;
      default:
        return `Yanl\u0131\u015F d\u0259y\u0259r`;
    }
  };
};
function az_default() {
  return {
    localeError: error2()
  };
}

// node_modules/zod/v4/locales/be.js
function getBelarusianPlural(count, one, few, many) {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many;
  }
  if (lastDigit === 1) {
    return one;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }
  return many;
}
var error3 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "\u0441\u0456\u043C\u0432\u0430\u043B",
        few: "\u0441\u0456\u043C\u0432\u0430\u043B\u044B",
        many: "\u0441\u0456\u043C\u0432\u0430\u043B\u0430\u045E"
      },
      verb: "\u043C\u0435\u0446\u044C"
    },
    array: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E"
      },
      verb: "\u043C\u0435\u0446\u044C"
    },
    set: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E"
      },
      verb: "\u043C\u0435\u0446\u044C"
    },
    file: {
      unit: {
        one: "\u0431\u0430\u0439\u0442",
        few: "\u0431\u0430\u0439\u0442\u044B",
        many: "\u0431\u0430\u0439\u0442\u0430\u045E"
      },
      verb: "\u043C\u0435\u0446\u044C"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0443\u0432\u043E\u0434",
    email: "email \u0430\u0434\u0440\u0430\u0441",
    url: "URL",
    emoji: "\u044D\u043C\u043E\u0434\u0437\u0456",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0434\u0430\u0442\u0430 \u0456 \u0447\u0430\u0441",
    date: "ISO \u0434\u0430\u0442\u0430",
    time: "ISO \u0447\u0430\u0441",
    duration: "ISO \u043F\u0440\u0430\u0446\u044F\u0433\u043B\u0430\u0441\u0446\u044C",
    ipv4: "IPv4 \u0430\u0434\u0440\u0430\u0441",
    ipv6: "IPv6 \u0430\u0434\u0440\u0430\u0441",
    cidrv4: "IPv4 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D",
    cidrv6: "IPv6 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D",
    base64: "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64",
    base64url: "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64url",
    json_string: "JSON \u0440\u0430\u0434\u043E\u043A",
    e164: "\u043D\u0443\u043C\u0430\u0440 E.164",
    jwt: "JWT",
    template_literal: "\u0443\u0432\u043E\u0434"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u043B\u0456\u043A",
    array: "\u043C\u0430\u0441\u0456\u045E"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F instanceof ${issue2.expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${received}`;
        }
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F ${expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F ${stringifyPrimitive(issue2.values[0])}`;
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0432\u0430\u0440\u044B\u044F\u043D\u0442: \u0447\u0430\u043A\u0430\u045E\u0441\u044F \u0430\u0434\u0437\u0456\u043D \u0437 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getBelarusianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${sizing.verb} ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getBelarusianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${sizing.verb} ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u043F\u0430\u0447\u044B\u043D\u0430\u0446\u0446\u0430 \u0437 "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u0430\u043A\u0430\u043D\u0447\u0432\u0430\u0446\u0446\u0430 \u043D\u0430 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u043C\u044F\u0448\u0447\u0430\u0446\u044C "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0430\u0434\u043F\u0430\u0432\u044F\u0434\u0430\u0446\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}`;
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043B\u0456\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0431\u044B\u0446\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0441\u043F\u0430\u0437\u043D\u0430\u043D\u044B ${issue2.keys.length > 1 ? "\u043A\u043B\u044E\u0447\u044B" : "\u043A\u043B\u044E\u0447"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043A\u043B\u044E\u0447 \u0443 ${issue2.origin}`;
      case "invalid_union":
        return "\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434";
      case "invalid_element":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u0430\u0435 \u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435 \u045E ${issue2.origin}`;
      default:
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434`;
    }
  };
};
function be_default() {
  return {
    localeError: error3()
  };
}

// node_modules/zod/v4/locales/bg.js
var error4 = () => {
  const Sizable = {
    string: { unit: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" },
    file: { unit: "\u0431\u0430\u0439\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" },
    array: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" },
    set: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0432\u0445\u043E\u0434",
    email: "\u0438\u043C\u0435\u0439\u043B \u0430\u0434\u0440\u0435\u0441",
    url: "URL",
    emoji: "\u0435\u043C\u043E\u0434\u0436\u0438",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0432\u0440\u0435\u043C\u0435",
    date: "ISO \u0434\u0430\u0442\u0430",
    time: "ISO \u0432\u0440\u0435\u043C\u0435",
    duration: "ISO \u043F\u0440\u043E\u0434\u044A\u043B\u0436\u0438\u0442\u0435\u043B\u043D\u043E\u0441\u0442",
    ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441",
    ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441",
    cidrv4: "IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
    cidrv6: "IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
    base64: "base64-\u043A\u043E\u0434\u0438\u0440\u0430\u043D \u043D\u0438\u0437",
    base64url: "base64url-\u043A\u043E\u0434\u0438\u0440\u0430\u043D \u043D\u0438\u0437",
    json_string: "JSON \u043D\u0438\u0437",
    e164: "E.164 \u043D\u043E\u043C\u0435\u0440",
    jwt: "JWT",
    template_literal: "\u0432\u0445\u043E\u0434"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0447\u0438\u0441\u043B\u043E",
    array: "\u043C\u0430\u0441\u0438\u0432"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D instanceof ${issue2.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D ${received}`;
        }
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D ${expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D ${stringifyPrimitive(issue2.values[0])}`;
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u043E\u043F\u0446\u0438\u044F: \u043E\u0447\u0430\u043A\u0432\u0430\u043D\u043E \u0435\u0434\u043D\u043E \u043E\u0442 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u0422\u0432\u044A\u0440\u0434\u0435 \u0433\u043E\u043B\u044F\u043C\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin ?? "\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"} \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430"}`;
        return `\u0422\u0432\u044A\u0440\u0434\u0435 \u0433\u043E\u043B\u044F\u043C\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin ?? "\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"} \u0434\u0430 \u0431\u044A\u0434\u0435 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0422\u0432\u044A\u0440\u0434\u0435 \u043C\u0430\u043B\u043A\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin} \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u0422\u0432\u044A\u0440\u0434\u0435 \u043C\u0430\u043B\u043A\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin} \u0434\u0430 \u0431\u044A\u0434\u0435 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u0432\u0430 \u0441 "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0437\u0430\u0432\u044A\u0440\u0448\u0432\u0430 \u0441 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0432\u043A\u043B\u044E\u0447\u0432\u0430 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0441\u044A\u0432\u043F\u0430\u0434\u0430 \u0441 ${_issue.pattern}`;
        let invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D";
        if (_issue.format === "emoji")
          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E";
        if (_issue.format === "datetime")
          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E";
        if (_issue.format === "date")
          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430";
        if (_issue.format === "time")
          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E";
        if (_issue.format === "duration")
          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430";
        return `${invalid_adj} ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E \u0447\u0438\u0441\u043B\u043E: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0431\u044A\u0434\u0435 \u043A\u0440\u0430\u0442\u043D\u043E \u043D\u0430 ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0437\u043F\u043E\u0437\u043D\u0430\u0442${issue2.keys.length > 1 ? "\u0438" : ""} \u043A\u043B\u044E\u0447${issue2.keys.length > 1 ? "\u043E\u0432\u0435" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043A\u043B\u044E\u0447 \u0432 ${issue2.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434";
      case "invalid_element":
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442 \u0432 ${issue2.origin}`;
      default:
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434`;
    }
  };
};
function bg_default() {
  return {
    localeError: error4()
  };
}

// node_modules/zod/v4/locales/ca.js
var error5 = () => {
  const Sizable = {
    string: { unit: "car\xE0cters", verb: "contenir" },
    file: { unit: "bytes", verb: "contenir" },
    array: { unit: "elements", verb: "contenir" },
    set: { unit: "elements", verb: "contenir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entrada",
    email: "adre\xE7a electr\xF2nica",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data i hora ISO",
    date: "data ISO",
    time: "hora ISO",
    duration: "durada ISO",
    ipv4: "adre\xE7a IPv4",
    ipv6: "adre\xE7a IPv6",
    cidrv4: "rang IPv4",
    cidrv6: "rang IPv6",
    base64: "cadena codificada en base64",
    base64url: "cadena codificada en base64url",
    json_string: "cadena JSON",
    e164: "n\xFAmero E.164",
    jwt: "JWT",
    template_literal: "entrada"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Tipus inv\xE0lid: s'esperava instanceof ${issue2.expected}, s'ha rebut ${received}`;
        }
        return `Tipus inv\xE0lid: s'esperava ${expected}, s'ha rebut ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Valor inv\xE0lid: s'esperava ${stringifyPrimitive(issue2.values[0])}`;
        return `Opci\xF3 inv\xE0lida: s'esperava una de ${joinValues(issue2.values, " o ")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "com a m\xE0xim" : "menys de";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} contingu\xE9s ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} fos ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "com a m\xEDnim" : "m\xE9s de";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Massa petit: s'esperava que ${issue2.origin} contingu\xE9s ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Massa petit: s'esperava que ${issue2.origin} fos ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Format inv\xE0lid: ha de comen\xE7ar amb "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Format inv\xE0lid: ha d'acabar amb "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Format inv\xE0lid: ha d'incloure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Format inv\xE0lid: ha de coincidir amb el patr\xF3 ${_issue.pattern}`;
        return `Format inv\xE0lid per a ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE0lid: ha de ser m\xFAltiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Clau${issue2.keys.length > 1 ? "s" : ""} no reconeguda${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Clau inv\xE0lida a ${issue2.origin}`;
      case "invalid_union":
        return "Entrada inv\xE0lida";
      // Could also be "Tipus d'unió invàlid" but "Entrada invàlida" is more general
      case "invalid_element":
        return `Element inv\xE0lid a ${issue2.origin}`;
      default:
        return `Entrada inv\xE0lida`;
    }
  };
};
function ca_default() {
  return {
    localeError: error5()
  };
}

// node_modules/zod/v4/locales/cs.js
var error6 = () => {
  const Sizable = {
    string: { unit: "znak\u016F", verb: "m\xEDt" },
    file: { unit: "bajt\u016F", verb: "m\xEDt" },
    array: { unit: "prvk\u016F", verb: "m\xEDt" },
    set: { unit: "prvk\u016F", verb: "m\xEDt" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "regul\xE1rn\xED v\xFDraz",
    email: "e-mailov\xE1 adresa",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "datum a \u010Das ve form\xE1tu ISO",
    date: "datum ve form\xE1tu ISO",
    time: "\u010Das ve form\xE1tu ISO",
    duration: "doba trv\xE1n\xED ISO",
    ipv4: "IPv4 adresa",
    ipv6: "IPv6 adresa",
    cidrv4: "rozsah IPv4",
    cidrv6: "rozsah IPv6",
    base64: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64",
    base64url: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64url",
    json_string: "\u0159et\u011Bzec ve form\xE1tu JSON",
    e164: "\u010D\xEDslo E.164",
    jwt: "JWT",
    template_literal: "vstup"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u010D\xEDslo",
    string: "\u0159et\u011Bzec",
    function: "funkce",
    array: "pole"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no instanceof ${issue2.expected}, obdr\u017Eeno ${received}`;
        }
        return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${expected}, obdr\u017Eeno ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${stringifyPrimitive(issue2.values[0])}`;
        return `Neplatn\xE1 mo\u017Enost: o\u010Dek\xE1v\xE1na jedna z hodnot ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${issue2.origin ?? "hodnota"} mus\xED m\xEDt ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "prvk\u016F"}`;
        }
        return `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${issue2.origin ?? "hodnota"} mus\xED b\xFDt ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${issue2.origin ?? "hodnota"} mus\xED m\xEDt ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "prvk\u016F"}`;
        }
        return `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${issue2.origin ?? "hodnota"} mus\xED b\xFDt ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Neplatn\xFD \u0159et\u011Bzec: mus\xED za\u010D\xEDnat na "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Neplatn\xFD \u0159et\u011Bzec: mus\xED kon\u010Dit na "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neplatn\xFD \u0159et\u011Bzec: mus\xED obsahovat "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neplatn\xFD \u0159et\u011Bzec: mus\xED odpov\xEDdat vzoru ${_issue.pattern}`;
        return `Neplatn\xFD form\xE1t ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Neplatn\xE9 \u010D\xEDslo: mus\xED b\xFDt n\xE1sobkem ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Nezn\xE1m\xE9 kl\xED\u010De: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Neplatn\xFD kl\xED\u010D v ${issue2.origin}`;
      case "invalid_union":
        return "Neplatn\xFD vstup";
      case "invalid_element":
        return `Neplatn\xE1 hodnota v ${issue2.origin}`;
      default:
        return `Neplatn\xFD vstup`;
    }
  };
};
function cs_default() {
  return {
    localeError: error6()
  };
}

// node_modules/zod/v4/locales/da.js
var error7 = () => {
  const Sizable = {
    string: { unit: "tegn", verb: "havde" },
    file: { unit: "bytes", verb: "havde" },
    array: { unit: "elementer", verb: "indeholdt" },
    set: { unit: "elementer", verb: "indeholdt" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "e-mailadresse",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dato- og klokkesl\xE6t",
    date: "ISO-dato",
    time: "ISO-klokkesl\xE6t",
    duration: "ISO-varighed",
    ipv4: "IPv4-omr\xE5de",
    ipv6: "IPv6-omr\xE5de",
    cidrv4: "IPv4-spektrum",
    cidrv6: "IPv6-spektrum",
    base64: "base64-kodet streng",
    base64url: "base64url-kodet streng",
    json_string: "JSON-streng",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "streng",
    number: "tal",
    boolean: "boolean",
    array: "liste",
    object: "objekt",
    set: "s\xE6t",
    file: "fil"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ugyldigt input: forventede instanceof ${issue2.expected}, fik ${received}`;
        }
        return `Ugyldigt input: forventede ${expected}, fik ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ugyldig v\xE6rdi: forventede ${stringifyPrimitive(issue2.values[0])}`;
        return `Ugyldigt valg: forventede en af f\xF8lgende ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing)
          return `For stor: forventede ${origin ?? "value"} ${sizing.verb} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}`;
        return `For stor: forventede ${origin ?? "value"} havde ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing) {
          return `For lille: forventede ${origin} ${sizing.verb} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `For lille: forventede ${origin} havde ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ugyldig streng: skal starte med "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ugyldig streng: skal ende med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ugyldig streng: skal indeholde "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ugyldig streng: skal matche m\xF8nsteret ${_issue.pattern}`;
        return `Ugyldig ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ugyldigt tal: skal v\xE6re deleligt med ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Ukendte n\xF8gler" : "Ukendt n\xF8gle"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig n\xF8gle i ${issue2.origin}`;
      case "invalid_union":
        return "Ugyldigt input: matcher ingen af de tilladte typer";
      case "invalid_element":
        return `Ugyldig v\xE6rdi i ${issue2.origin}`;
      default:
        return `Ugyldigt input`;
    }
  };
};
function da_default() {
  return {
    localeError: error7()
  };
}

// node_modules/zod/v4/locales/de.js
var error8 = () => {
  const Sizable = {
    string: { unit: "Zeichen", verb: "zu haben" },
    file: { unit: "Bytes", verb: "zu haben" },
    array: { unit: "Elemente", verb: "zu haben" },
    set: { unit: "Elemente", verb: "zu haben" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "Eingabe",
    email: "E-Mail-Adresse",
    url: "URL",
    emoji: "Emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-Datum und -Uhrzeit",
    date: "ISO-Datum",
    time: "ISO-Uhrzeit",
    duration: "ISO-Dauer",
    ipv4: "IPv4-Adresse",
    ipv6: "IPv6-Adresse",
    cidrv4: "IPv4-Bereich",
    cidrv6: "IPv6-Bereich",
    base64: "Base64-codierter String",
    base64url: "Base64-URL-codierter String",
    json_string: "JSON-String",
    e164: "E.164-Nummer",
    jwt: "JWT",
    template_literal: "Eingabe"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "Zahl",
    array: "Array"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ung\xFCltige Eingabe: erwartet instanceof ${issue2.expected}, erhalten ${received}`;
        }
        return `Ung\xFCltige Eingabe: erwartet ${expected}, erhalten ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ung\xFCltige Eingabe: erwartet ${stringifyPrimitive(issue2.values[0])}`;
        return `Ung\xFCltige Option: erwartet eine von ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Zu gro\xDF: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "Elemente"} hat`;
        return `Zu gro\xDF: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ist`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} hat`;
        }
        return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ist`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ung\xFCltiger String: muss mit "${_issue.prefix}" beginnen`;
        if (_issue.format === "ends_with")
          return `Ung\xFCltiger String: muss mit "${_issue.suffix}" enden`;
        if (_issue.format === "includes")
          return `Ung\xFCltiger String: muss "${_issue.includes}" enthalten`;
        if (_issue.format === "regex")
          return `Ung\xFCltiger String: muss dem Muster ${_issue.pattern} entsprechen`;
        return `Ung\xFCltig: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ung\xFCltige Zahl: muss ein Vielfaches von ${issue2.divisor} sein`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Unbekannte Schl\xFCssel" : "Unbekannter Schl\xFCssel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ung\xFCltiger Schl\xFCssel in ${issue2.origin}`;
      case "invalid_union":
        return "Ung\xFCltige Eingabe";
      case "invalid_element":
        return `Ung\xFCltiger Wert in ${issue2.origin}`;
      default:
        return `Ung\xFCltige Eingabe`;
    }
  };
};
function de_default() {
  return {
    localeError: error8()
  };
}

// node_modules/zod/v4/locales/en.js
var error9 = () => {
  const Sizable = {
    string: { unit: "characters", verb: "to have" },
    file: { unit: "bytes", verb: "to have" },
    array: { unit: "items", verb: "to have" },
    set: { unit: "items", verb: "to have" },
    map: { unit: "entries", verb: "to have" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    mac: "MAC address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    // Compatibility: "nan" -> "NaN" for display
    nan: "NaN"
    // All other type names omitted - they fall back to raw values via ?? operator
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `Invalid input: expected ${expected}, received ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
        return `Invalid option: expected one of ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Too big: expected ${issue2.origin ?? "value"} to have ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `Too big: expected ${issue2.origin ?? "value"} to be ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Too small: expected ${issue2.origin} to have ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Too small: expected ${issue2.origin} to be ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Invalid string: must start with "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Invalid string: must end with "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Invalid string: must include "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Invalid string: must match pattern ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Invalid number: must be a multiple of ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Unrecognized key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Invalid key in ${issue2.origin}`;
      case "invalid_union":
        return "Invalid input";
      case "invalid_element":
        return `Invalid value in ${issue2.origin}`;
      default:
        return `Invalid input`;
    }
  };
};
function en_default() {
  return {
    localeError: error9()
  };
}

// node_modules/zod/v4/locales/eo.js
var error10 = () => {
  const Sizable = {
    string: { unit: "karaktrojn", verb: "havi" },
    file: { unit: "bajtojn", verb: "havi" },
    array: { unit: "elementojn", verb: "havi" },
    set: { unit: "elementojn", verb: "havi" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "enigo",
    email: "retadreso",
    url: "URL",
    emoji: "emo\u011Dio",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-datotempo",
    date: "ISO-dato",
    time: "ISO-tempo",
    duration: "ISO-da\u016Dro",
    ipv4: "IPv4-adreso",
    ipv6: "IPv6-adreso",
    cidrv4: "IPv4-rango",
    cidrv6: "IPv6-rango",
    base64: "64-ume kodita karaktraro",
    base64url: "URL-64-ume kodita karaktraro",
    json_string: "JSON-karaktraro",
    e164: "E.164-nombro",
    jwt: "JWT",
    template_literal: "enigo"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nombro",
    array: "tabelo",
    null: "senvalora"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Nevalida enigo: atendi\u011Dis instanceof ${issue2.expected}, ricevi\u011Dis ${received}`;
        }
        return `Nevalida enigo: atendi\u011Dis ${expected}, ricevi\u011Dis ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Nevalida enigo: atendi\u011Dis ${stringifyPrimitive(issue2.values[0])}`;
        return `Nevalida opcio: atendi\u011Dis unu el ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Tro granda: atendi\u011Dis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementojn"}`;
        return `Tro granda: atendi\u011Dis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Tro malgranda: atendi\u011Dis ke ${issue2.origin} havu ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Tro malgranda: atendi\u011Dis ke ${issue2.origin} estu ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Nevalida karaktraro: devas komenci\u011Di per "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Nevalida karaktraro: devas fini\u011Di per "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Nevalida karaktraro: devas inkluzivi "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Nevalida karaktraro: devas kongrui kun la modelo ${_issue.pattern}`;
        return `Nevalida ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Nevalida nombro: devas esti oblo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Nekonata${issue2.keys.length > 1 ? "j" : ""} \u015Dlosilo${issue2.keys.length > 1 ? "j" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Nevalida \u015Dlosilo en ${issue2.origin}`;
      case "invalid_union":
        return "Nevalida enigo";
      case "invalid_element":
        return `Nevalida valoro en ${issue2.origin}`;
      default:
        return `Nevalida enigo`;
    }
  };
};
function eo_default() {
  return {
    localeError: error10()
  };
}

// node_modules/zod/v4/locales/es.js
var error11 = () => {
  const Sizable = {
    string: { unit: "caracteres", verb: "tener" },
    file: { unit: "bytes", verb: "tener" },
    array: { unit: "elementos", verb: "tener" },
    set: { unit: "elementos", verb: "tener" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entrada",
    email: "direcci\xF3n de correo electr\xF3nico",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "fecha y hora ISO",
    date: "fecha ISO",
    time: "hora ISO",
    duration: "duraci\xF3n ISO",
    ipv4: "direcci\xF3n IPv4",
    ipv6: "direcci\xF3n IPv6",
    cidrv4: "rango IPv4",
    cidrv6: "rango IPv6",
    base64: "cadena codificada en base64",
    base64url: "URL codificada en base64",
    json_string: "cadena JSON",
    e164: "n\xFAmero E.164",
    jwt: "JWT",
    template_literal: "entrada"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "texto",
    number: "n\xFAmero",
    boolean: "booleano",
    array: "arreglo",
    object: "objeto",
    set: "conjunto",
    file: "archivo",
    date: "fecha",
    bigint: "n\xFAmero grande",
    symbol: "s\xEDmbolo",
    undefined: "indefinido",
    null: "nulo",
    function: "funci\xF3n",
    map: "mapa",
    record: "registro",
    tuple: "tupla",
    enum: "enumeraci\xF3n",
    union: "uni\xF3n",
    literal: "literal",
    promise: "promesa",
    void: "vac\xEDo",
    never: "nunca",
    unknown: "desconocido",
    any: "cualquiera"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Entrada inv\xE1lida: se esperaba instanceof ${issue2.expected}, recibido ${received}`;
        }
        return `Entrada inv\xE1lida: se esperaba ${expected}, recibido ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrada inv\xE1lida: se esperaba ${stringifyPrimitive(issue2.values[0])}`;
        return `Opci\xF3n inv\xE1lida: se esperaba una de ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing)
          return `Demasiado grande: se esperaba que ${origin ?? "valor"} tuviera ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
        return `Demasiado grande: se esperaba que ${origin ?? "valor"} fuera ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing) {
          return `Demasiado peque\xF1o: se esperaba que ${origin} tuviera ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Demasiado peque\xF1o: se esperaba que ${origin} fuera ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Cadena inv\xE1lida: debe comenzar con "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Cadena inv\xE1lida: debe terminar en "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Cadena inv\xE1lida: debe incluir "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Cadena inv\xE1lida: debe coincidir con el patr\xF3n ${_issue.pattern}`;
        return `Inv\xE1lido ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE1lido: debe ser m\xFAltiplo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Llave${issue2.keys.length > 1 ? "s" : ""} desconocida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Llave inv\xE1lida en ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
      case "invalid_union":
        return "Entrada inv\xE1lida";
      case "invalid_element":
        return `Valor inv\xE1lido en ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
      default:
        return `Entrada inv\xE1lida`;
    }
  };
};
function es_default() {
  return {
    localeError: error11()
  };
}

// node_modules/zod/v4/locales/fa.js
var error12 = () => {
  const Sizable = {
    string: { unit: "\u06A9\u0627\u0631\u0627\u06A9\u062A\u0631", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
    file: { unit: "\u0628\u0627\u06CC\u062A", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
    array: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
    set: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0648\u0631\u0648\u062F\u06CC",
    email: "\u0622\u062F\u0631\u0633 \u0627\u06CC\u0645\u06CC\u0644",
    url: "URL",
    emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u062A\u0627\u0631\u06CC\u062E \u0648 \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
    date: "\u062A\u0627\u0631\u06CC\u062E \u0627\u06CC\u0632\u0648",
    time: "\u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
    duration: "\u0645\u062F\u062A \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
    ipv4: "IPv4 \u0622\u062F\u0631\u0633",
    ipv6: "IPv6 \u0622\u062F\u0631\u0633",
    cidrv4: "IPv4 \u062F\u0627\u0645\u0646\u0647",
    cidrv6: "IPv6 \u062F\u0627\u0645\u0646\u0647",
    base64: "base64-encoded \u0631\u0634\u062A\u0647",
    base64url: "base64url-encoded \u0631\u0634\u062A\u0647",
    json_string: "JSON \u0631\u0634\u062A\u0647",
    e164: "E.164 \u0639\u062F\u062F",
    jwt: "JWT",
    template_literal: "\u0648\u0631\u0648\u062F\u06CC"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0639\u062F\u062F",
    array: "\u0622\u0631\u0627\u06CC\u0647"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A instanceof ${issue2.expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${received} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
        }
        return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${received} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
      }
      case "invalid_value":
        if (issue2.values.length === 1) {
          return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${stringifyPrimitive(issue2.values[0])} \u0645\u06CC\u200C\u0628\u0648\u062F`;
        }
        return `\u06AF\u0632\u06CC\u0646\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A \u06CC\u06A9\u06CC \u0627\u0632 ${joinValues(issue2.values, "|")} \u0645\u06CC\u200C\u0628\u0648\u062F`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${issue2.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0635\u0631"} \u0628\u0627\u0634\u062F`;
        }
        return `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${issue2.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} \u0628\u0627\u0634\u062F`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0628\u0627\u0634\u062F`;
        }
        return `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} \u0628\u0627\u0634\u062F`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${_issue.prefix}" \u0634\u0631\u0648\u0639 \u0634\u0648\u062F`;
        }
        if (_issue.format === "ends_with") {
          return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${_issue.suffix}" \u062A\u0645\u0627\u0645 \u0634\u0648\u062F`;
        }
        if (_issue.format === "includes") {
          return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0634\u0627\u0645\u0644 "${_issue.includes}" \u0628\u0627\u0634\u062F`;
        }
        if (_issue.format === "regex") {
          return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 \u0627\u0644\u06AF\u0648\u06CC ${_issue.pattern} \u0645\u0637\u0627\u0628\u0642\u062A \u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F`;
        }
        return `${FormatDictionary[_issue.format] ?? issue2.format} \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
      }
      case "not_multiple_of":
        return `\u0639\u062F\u062F \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0645\u0636\u0631\u0628 ${issue2.divisor} \u0628\u0627\u0634\u062F`;
      case "unrecognized_keys":
        return `\u06A9\u0644\u06CC\u062F${issue2.keys.length > 1 ? "\u0647\u0627\u06CC" : ""} \u0646\u0627\u0634\u0646\u0627\u0633: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u06A9\u0644\u06CC\u062F \u0646\u0627\u0634\u0646\u0627\u0633 \u062F\u0631 ${issue2.origin}`;
      case "invalid_union":
        return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
      case "invalid_element":
        return `\u0645\u0642\u062F\u0627\u0631 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u062F\u0631 ${issue2.origin}`;
      default:
        return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
    }
  };
};
function fa_default() {
  return {
    localeError: error12()
  };
}

// node_modules/zod/v4/locales/fi.js
var error13 = () => {
  const Sizable = {
    string: { unit: "merkki\xE4", subject: "merkkijonon" },
    file: { unit: "tavua", subject: "tiedoston" },
    array: { unit: "alkiota", subject: "listan" },
    set: { unit: "alkiota", subject: "joukon" },
    number: { unit: "", subject: "luvun" },
    bigint: { unit: "", subject: "suuren kokonaisluvun" },
    int: { unit: "", subject: "kokonaisluvun" },
    date: { unit: "", subject: "p\xE4iv\xE4m\xE4\xE4r\xE4n" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "s\xE4\xE4nn\xF6llinen lauseke",
    email: "s\xE4hk\xF6postiosoite",
    url: "URL-osoite",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-aikaleima",
    date: "ISO-p\xE4iv\xE4m\xE4\xE4r\xE4",
    time: "ISO-aika",
    duration: "ISO-kesto",
    ipv4: "IPv4-osoite",
    ipv6: "IPv6-osoite",
    cidrv4: "IPv4-alue",
    cidrv6: "IPv6-alue",
    base64: "base64-koodattu merkkijono",
    base64url: "base64url-koodattu merkkijono",
    json_string: "JSON-merkkijono",
    e164: "E.164-luku",
    jwt: "JWT",
    template_literal: "templaattimerkkijono"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Virheellinen tyyppi: odotettiin instanceof ${issue2.expected}, oli ${received}`;
        }
        return `Virheellinen tyyppi: odotettiin ${expected}, oli ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Virheellinen sy\xF6te: t\xE4ytyy olla ${stringifyPrimitive(issue2.values[0])}`;
        return `Virheellinen valinta: t\xE4ytyy olla yksi seuraavista: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Liian suuri: ${sizing.subject} t\xE4ytyy olla ${adj}${issue2.maximum.toString()} ${sizing.unit}`.trim();
        }
        return `Liian suuri: arvon t\xE4ytyy olla ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Liian pieni: ${sizing.subject} t\xE4ytyy olla ${adj}${issue2.minimum.toString()} ${sizing.unit}`.trim();
        }
        return `Liian pieni: arvon t\xE4ytyy olla ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Virheellinen sy\xF6te: t\xE4ytyy alkaa "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Virheellinen sy\xF6te: t\xE4ytyy loppua "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Virheellinen sy\xF6te: t\xE4ytyy sis\xE4lt\xE4\xE4 "${_issue.includes}"`;
        if (_issue.format === "regex") {
          return `Virheellinen sy\xF6te: t\xE4ytyy vastata s\xE4\xE4nn\xF6llist\xE4 lauseketta ${_issue.pattern}`;
        }
        return `Virheellinen ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Virheellinen luku: t\xE4ytyy olla luvun ${issue2.divisor} monikerta`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return "Virheellinen avain tietueessa";
      case "invalid_union":
        return "Virheellinen unioni";
      case "invalid_element":
        return "Virheellinen arvo joukossa";
      default:
        return `Virheellinen sy\xF6te`;
    }
  };
};
function fi_default() {
  return {
    localeError: error13()
  };
}

// node_modules/zod/v4/locales/fr.js
var error14 = () => {
  const Sizable = {
    string: { unit: "caract\xE8res", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "\xE9l\xE9ments", verb: "avoir" },
    set: { unit: "\xE9l\xE9ments", verb: "avoir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entr\xE9e",
    email: "adresse e-mail",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "date et heure ISO",
    date: "date ISO",
    time: "heure ISO",
    duration: "dur\xE9e ISO",
    ipv4: "adresse IPv4",
    ipv6: "adresse IPv6",
    cidrv4: "plage IPv4",
    cidrv6: "plage IPv6",
    base64: "cha\xEEne encod\xE9e en base64",
    base64url: "cha\xEEne encod\xE9e en base64url",
    json_string: "cha\xEEne JSON",
    e164: "num\xE9ro E.164",
    jwt: "JWT",
    template_literal: "entr\xE9e"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nombre",
    array: "tableau"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Entr\xE9e invalide : instanceof ${issue2.expected} attendu, ${received} re\xE7u`;
        }
        return `Entr\xE9e invalide : ${expected} attendu, ${received} re\xE7u`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entr\xE9e invalide : ${stringifyPrimitive(issue2.values[0])} attendu`;
        return `Option invalide : une valeur parmi ${joinValues(issue2.values, "|")} attendue`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Trop grand : ${issue2.origin ?? "valeur"} doit ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\xE9l\xE9ment(s)"}`;
        return `Trop grand : ${issue2.origin ?? "valeur"} doit \xEAtre ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Trop petit : ${issue2.origin} doit ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Trop petit : ${issue2.origin} doit \xEAtre ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Cha\xEEne invalide : doit commencer par "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Cha\xEEne invalide : doit se terminer par "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Cha\xEEne invalide : doit inclure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Cha\xEEne invalide : doit correspondre au mod\xE8le ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit \xEAtre un multiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Cl\xE9${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Cl\xE9 invalide dans ${issue2.origin}`;
      case "invalid_union":
        return "Entr\xE9e invalide";
      case "invalid_element":
        return `Valeur invalide dans ${issue2.origin}`;
      default:
        return `Entr\xE9e invalide`;
    }
  };
};
function fr_default() {
  return {
    localeError: error14()
  };
}

// node_modules/zod/v4/locales/fr-CA.js
var error15 = () => {
  const Sizable = {
    string: { unit: "caract\xE8res", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "\xE9l\xE9ments", verb: "avoir" },
    set: { unit: "\xE9l\xE9ments", verb: "avoir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entr\xE9e",
    email: "adresse courriel",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "date-heure ISO",
    date: "date ISO",
    time: "heure ISO",
    duration: "dur\xE9e ISO",
    ipv4: "adresse IPv4",
    ipv6: "adresse IPv6",
    cidrv4: "plage IPv4",
    cidrv6: "plage IPv6",
    base64: "cha\xEEne encod\xE9e en base64",
    base64url: "cha\xEEne encod\xE9e en base64url",
    json_string: "cha\xEEne JSON",
    e164: "num\xE9ro E.164",
    jwt: "JWT",
    template_literal: "entr\xE9e"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Entr\xE9e invalide : attendu instanceof ${issue2.expected}, re\xE7u ${received}`;
        }
        return `Entr\xE9e invalide : attendu ${expected}, re\xE7u ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entr\xE9e invalide : attendu ${stringifyPrimitive(issue2.values[0])}`;
        return `Option invalide : attendu l'une des valeurs suivantes ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "\u2264" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} ait ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
        return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} soit ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "\u2265" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Trop petit : attendu que ${issue2.origin} ait ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Trop petit : attendu que ${issue2.origin} soit ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Cha\xEEne invalide : doit commencer par "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Cha\xEEne invalide : doit se terminer par "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Cha\xEEne invalide : doit inclure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Cha\xEEne invalide : doit correspondre au motif ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit \xEAtre un multiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Cl\xE9${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Cl\xE9 invalide dans ${issue2.origin}`;
      case "invalid_union":
        return "Entr\xE9e invalide";
      case "invalid_element":
        return `Valeur invalide dans ${issue2.origin}`;
      default:
        return `Entr\xE9e invalide`;
    }
  };
};
function fr_CA_default() {
  return {
    localeError: error15()
  };
}

// node_modules/zod/v4/locales/he.js
var error16 = () => {
  const TypeNames = {
    string: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA", gender: "f" },
    number: { label: "\u05DE\u05E1\u05E4\u05E8", gender: "m" },
    boolean: { label: "\u05E2\u05E8\u05DA \u05D1\u05D5\u05DC\u05D9\u05D0\u05E0\u05D9", gender: "m" },
    bigint: { label: "BigInt", gender: "m" },
    date: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA", gender: "m" },
    array: { label: "\u05DE\u05E2\u05E8\u05DA", gender: "m" },
    object: { label: "\u05D0\u05D5\u05D1\u05D9\u05D9\u05E7\u05D8", gender: "m" },
    null: { label: "\u05E2\u05E8\u05DA \u05E8\u05D9\u05E7 (null)", gender: "m" },
    undefined: { label: "\u05E2\u05E8\u05DA \u05DC\u05D0 \u05DE\u05D5\u05D2\u05D3\u05E8 (undefined)", gender: "m" },
    symbol: { label: "\u05E1\u05D9\u05DE\u05D1\u05D5\u05DC (Symbol)", gender: "m" },
    function: { label: "\u05E4\u05D5\u05E0\u05E7\u05E6\u05D9\u05D4", gender: "f" },
    map: { label: "\u05DE\u05E4\u05D4 (Map)", gender: "f" },
    set: { label: "\u05E7\u05D1\u05D5\u05E6\u05D4 (Set)", gender: "f" },
    file: { label: "\u05E7\u05D5\u05D1\u05E5", gender: "m" },
    promise: { label: "Promise", gender: "m" },
    NaN: { label: "NaN", gender: "m" },
    unknown: { label: "\u05E2\u05E8\u05DA \u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2", gender: "m" },
    value: { label: "\u05E2\u05E8\u05DA", gender: "m" }
  };
  const Sizable = {
    string: { unit: "\u05EA\u05D5\u05D5\u05D9\u05DD", shortLabel: "\u05E7\u05E6\u05E8", longLabel: "\u05D0\u05E8\u05D5\u05DA" },
    file: { unit: "\u05D1\u05D9\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" },
    array: { unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" },
    set: { unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" },
    number: { unit: "", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" }
    // no unit
  };
  const typeEntry = (t) => t ? TypeNames[t] : void 0;
  const typeLabel = (t) => {
    const e = typeEntry(t);
    if (e)
      return e.label;
    return t ?? TypeNames.unknown.label;
  };
  const withDefinite = (t) => `\u05D4${typeLabel(t)}`;
  const verbFor = (t) => {
    const e = typeEntry(t);
    const gender = e?.gender ?? "m";
    return gender === "f" ? "\u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05D9\u05D5\u05EA" : "\u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA";
  };
  const getSizing = (origin) => {
    if (!origin)
      return null;
    return Sizable[origin] ?? null;
  };
  const FormatDictionary = {
    regex: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    email: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC", gender: "f" },
    url: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05E8\u05E9\u05EA", gender: "f" },
    emoji: { label: "\u05D0\u05D9\u05DE\u05D5\u05D2'\u05D9", gender: "m" },
    uuid: { label: "UUID", gender: "m" },
    nanoid: { label: "nanoid", gender: "m" },
    guid: { label: "GUID", gender: "m" },
    cuid: { label: "cuid", gender: "m" },
    cuid2: { label: "cuid2", gender: "m" },
    ulid: { label: "ULID", gender: "m" },
    xid: { label: "XID", gender: "m" },
    ksuid: { label: "KSUID", gender: "m" },
    datetime: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D5\u05D6\u05DE\u05DF ISO", gender: "m" },
    date: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA ISO", gender: "m" },
    time: { label: "\u05D6\u05DE\u05DF ISO", gender: "m" },
    duration: { label: "\u05DE\u05E9\u05DA \u05D6\u05DE\u05DF ISO", gender: "m" },
    ipv4: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv4", gender: "f" },
    ipv6: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv6", gender: "f" },
    cidrv4: { label: "\u05D8\u05D5\u05D5\u05D7 IPv4", gender: "m" },
    cidrv6: { label: "\u05D8\u05D5\u05D5\u05D7 IPv6", gender: "m" },
    base64: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64", gender: "f" },
    base64url: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64 \u05DC\u05DB\u05EA\u05D5\u05D1\u05D5\u05EA \u05E8\u05E9\u05EA", gender: "f" },
    json_string: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA JSON", gender: "f" },
    e164: { label: "\u05DE\u05E1\u05E4\u05E8 E.164", gender: "m" },
    jwt: { label: "JWT", gender: "m" },
    ends_with: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    includes: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    lowercase: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    starts_with: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    uppercase: { label: "\u05E7\u05DC\u05D8", gender: "m" }
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expectedKey = issue2.expected;
        const expected = TypeDictionary[expectedKey ?? ""] ?? typeLabel(expectedKey);
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? TypeNames[receivedType]?.label ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA instanceof ${issue2.expected}, \u05D4\u05EA\u05E7\u05D1\u05DC ${received}`;
        }
        return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${expected}, \u05D4\u05EA\u05E7\u05D1\u05DC ${received}`;
      }
      case "invalid_value": {
        if (issue2.values.length === 1) {
          return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05E2\u05E8\u05DA \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA ${stringifyPrimitive(issue2.values[0])}`;
        }
        const stringified = issue2.values.map((v) => stringifyPrimitive(v));
        if (issue2.values.length === 2) {
          return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05DF ${stringified[0]} \u05D0\u05D5 ${stringified[1]}`;
        }
        const lastValue = stringified[stringified.length - 1];
        const restValues = stringified.slice(0, -1).join(", ");
        return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05DF ${restValues} \u05D0\u05D5 ${lastValue}`;
      }
      case "too_big": {
        const sizing = getSizing(issue2.origin);
        const subject = withDefinite(issue2.origin ?? "value");
        if (issue2.origin === "string") {
          return `${sizing?.longLabel ?? "\u05D0\u05E8\u05D5\u05DA"} \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05DB\u05D9\u05DC ${issue2.maximum.toString()} ${sizing?.unit ?? ""} ${issue2.inclusive ? "\u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA" : "\u05DC\u05DB\u05DC \u05D4\u05D9\u05D5\u05EA\u05E8"}`.trim();
        }
        if (issue2.origin === "number") {
          const comparison = issue2.inclusive ? `\u05E7\u05D8\u05DF \u05D0\u05D5 \u05E9\u05D5\u05D5\u05D4 \u05DC-${issue2.maximum}` : `\u05E7\u05D8\u05DF \u05DE-${issue2.maximum}`;
          return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${comparison}`;
        }
        if (issue2.origin === "array" || issue2.origin === "set") {
          const verb = issue2.origin === "set" ? "\u05E6\u05E8\u05D9\u05DB\u05D4" : "\u05E6\u05E8\u05D9\u05DA";
          const comparison = issue2.inclusive ? `${issue2.maximum} ${sizing?.unit ?? ""} \u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA` : `\u05E4\u05D7\u05D5\u05EA \u05DE-${issue2.maximum} ${sizing?.unit ?? ""}`;
          return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${subject} ${verb} \u05DC\u05D4\u05DB\u05D9\u05DC ${comparison}`.trim();
        }
        const adj = issue2.inclusive ? "<=" : "<";
        const be = verbFor(issue2.origin ?? "value");
        if (sizing?.unit) {
          return `${sizing.longLabel} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
        }
        return `${sizing?.longLabel ?? "\u05D2\u05D3\u05D5\u05DC"} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const sizing = getSizing(issue2.origin);
        const subject = withDefinite(issue2.origin ?? "value");
        if (issue2.origin === "string") {
          return `${sizing?.shortLabel ?? "\u05E7\u05E6\u05E8"} \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05DB\u05D9\u05DC ${issue2.minimum.toString()} ${sizing?.unit ?? ""} ${issue2.inclusive ? "\u05D0\u05D5 \u05D9\u05D5\u05EA\u05E8" : "\u05DC\u05E4\u05D7\u05D5\u05EA"}`.trim();
        }
        if (issue2.origin === "number") {
          const comparison = issue2.inclusive ? `\u05D2\u05D3\u05D5\u05DC \u05D0\u05D5 \u05E9\u05D5\u05D5\u05D4 \u05DC-${issue2.minimum}` : `\u05D2\u05D3\u05D5\u05DC \u05DE-${issue2.minimum}`;
          return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${comparison}`;
        }
        if (issue2.origin === "array" || issue2.origin === "set") {
          const verb = issue2.origin === "set" ? "\u05E6\u05E8\u05D9\u05DB\u05D4" : "\u05E6\u05E8\u05D9\u05DA";
          if (issue2.minimum === 1 && issue2.inclusive) {
            const singularPhrase = issue2.origin === "set" ? "\u05DC\u05E4\u05D7\u05D5\u05EA \u05E4\u05E8\u05D9\u05D8 \u05D0\u05D7\u05D3" : "\u05DC\u05E4\u05D7\u05D5\u05EA \u05E4\u05E8\u05D9\u05D8 \u05D0\u05D7\u05D3";
            return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${subject} ${verb} \u05DC\u05D4\u05DB\u05D9\u05DC ${singularPhrase}`;
          }
          const comparison = issue2.inclusive ? `${issue2.minimum} ${sizing?.unit ?? ""} \u05D0\u05D5 \u05D9\u05D5\u05EA\u05E8` : `\u05D9\u05D5\u05EA\u05E8 \u05DE-${issue2.minimum} ${sizing?.unit ?? ""}`;
          return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${subject} ${verb} \u05DC\u05D4\u05DB\u05D9\u05DC ${comparison}`.trim();
        }
        const adj = issue2.inclusive ? ">=" : ">";
        const be = verbFor(issue2.origin ?? "value");
        if (sizing?.unit) {
          return `${sizing.shortLabel} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `${sizing?.shortLabel ?? "\u05E7\u05D8\u05DF"} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC \u05D1 "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05E1\u05EA\u05D9\u05D9\u05DD \u05D1 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05DB\u05DC\u05D5\u05DC "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D0\u05D9\u05DD \u05DC\u05EA\u05D1\u05E0\u05D9\u05EA ${_issue.pattern}`;
        const nounEntry = FormatDictionary[_issue.format];
        const noun = nounEntry?.label ?? _issue.format;
        const gender = nounEntry?.gender ?? "m";
        const adjective = gender === "f" ? "\u05EA\u05E7\u05D9\u05E0\u05D4" : "\u05EA\u05E7\u05D9\u05DF";
        return `${noun} \u05DC\u05D0 ${adjective}`;
      }
      case "not_multiple_of":
        return `\u05DE\u05E1\u05E4\u05E8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA \u05DE\u05DB\u05E4\u05DC\u05D4 \u05E9\u05DC ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u05DE\u05E4\u05EA\u05D7${issue2.keys.length > 1 ? "\u05D5\u05EA" : ""} \u05DC\u05D0 \u05DE\u05D6\u05D5\u05D4${issue2.keys.length > 1 ? "\u05D9\u05DD" : "\u05D4"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key": {
        return `\u05E9\u05D3\u05D4 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1\u05D0\u05D5\u05D1\u05D9\u05D9\u05E7\u05D8`;
      }
      case "invalid_union":
        return "\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF";
      case "invalid_element": {
        const place = withDefinite(issue2.origin ?? "array");
        return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1${place}`;
      }
      default:
        return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF`;
    }
  };
};
function he_default() {
  return {
    localeError: error16()
  };
}

// node_modules/zod/v4/locales/hu.js
var error17 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "legyen" },
    file: { unit: "byte", verb: "legyen" },
    array: { unit: "elem", verb: "legyen" },
    set: { unit: "elem", verb: "legyen" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "bemenet",
    email: "email c\xEDm",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO id\u0151b\xE9lyeg",
    date: "ISO d\xE1tum",
    time: "ISO id\u0151",
    duration: "ISO id\u0151intervallum",
    ipv4: "IPv4 c\xEDm",
    ipv6: "IPv6 c\xEDm",
    cidrv4: "IPv4 tartom\xE1ny",
    cidrv6: "IPv6 tartom\xE1ny",
    base64: "base64-k\xF3dolt string",
    base64url: "base64url-k\xF3dolt string",
    json_string: "JSON string",
    e164: "E.164 sz\xE1m",
    jwt: "JWT",
    template_literal: "bemenet"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "sz\xE1m",
    array: "t\xF6mb"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k instanceof ${issue2.expected}, a kapott \xE9rt\xE9k ${received}`;
        }
        return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${expected}, a kapott \xE9rt\xE9k ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${stringifyPrimitive(issue2.values[0])}`;
        return `\xC9rv\xE9nytelen opci\xF3: valamelyik \xE9rt\xE9k v\xE1rt ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `T\xFAl nagy: ${issue2.origin ?? "\xE9rt\xE9k"} m\xE9rete t\xFAl nagy ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elem"}`;
        return `T\xFAl nagy: a bemeneti \xE9rt\xE9k ${issue2.origin ?? "\xE9rt\xE9k"} t\xFAl nagy: ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${issue2.origin} m\xE9rete t\xFAl kicsi ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${issue2.origin} t\xFAl kicsi ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\xC9rv\xE9nytelen string: "${_issue.prefix}" \xE9rt\xE9kkel kell kezd\u0151dnie`;
        if (_issue.format === "ends_with")
          return `\xC9rv\xE9nytelen string: "${_issue.suffix}" \xE9rt\xE9kkel kell v\xE9gz\u0151dnie`;
        if (_issue.format === "includes")
          return `\xC9rv\xE9nytelen string: "${_issue.includes}" \xE9rt\xE9ket kell tartalmaznia`;
        if (_issue.format === "regex")
          return `\xC9rv\xE9nytelen string: ${_issue.pattern} mint\xE1nak kell megfelelnie`;
        return `\xC9rv\xE9nytelen ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\xC9rv\xE9nytelen sz\xE1m: ${issue2.divisor} t\xF6bbsz\xF6r\xF6s\xE9nek kell lennie`;
      case "unrecognized_keys":
        return `Ismeretlen kulcs${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\xC9rv\xE9nytelen kulcs ${issue2.origin}`;
      case "invalid_union":
        return "\xC9rv\xE9nytelen bemenet";
      case "invalid_element":
        return `\xC9rv\xE9nytelen \xE9rt\xE9k: ${issue2.origin}`;
      default:
        return `\xC9rv\xE9nytelen bemenet`;
    }
  };
};
function hu_default() {
  return {
    localeError: error17()
  };
}

// node_modules/zod/v4/locales/hy.js
function getArmenianPlural(count, one, many) {
  return Math.abs(count) === 1 ? one : many;
}
function withDefiniteArticle(word) {
  if (!word)
    return "";
  const vowels = ["\u0561", "\u0565", "\u0568", "\u056B", "\u0578", "\u0578\u0582", "\u0585"];
  const lastChar = word[word.length - 1];
  return word + (vowels.includes(lastChar) ? "\u0576" : "\u0568");
}
var error18 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "\u0576\u0577\u0561\u0576",
        many: "\u0576\u0577\u0561\u0576\u0576\u0565\u0580"
      },
      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
    },
    file: {
      unit: {
        one: "\u0562\u0561\u0575\u0569",
        many: "\u0562\u0561\u0575\u0569\u0565\u0580"
      },
      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
    },
    array: {
      unit: {
        one: "\u057F\u0561\u0580\u0580",
        many: "\u057F\u0561\u0580\u0580\u0565\u0580"
      },
      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
    },
    set: {
      unit: {
        one: "\u057F\u0561\u0580\u0580",
        many: "\u057F\u0561\u0580\u0580\u0565\u0580"
      },
      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0574\u0578\u0582\u057F\u0584",
    email: "\u0567\u056C. \u0570\u0561\u057D\u0581\u0565",
    url: "URL",
    emoji: "\u0567\u0574\u0578\u057B\u056B",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0561\u0574\u057D\u0561\u0569\u056B\u057E \u0587 \u056A\u0561\u0574",
    date: "ISO \u0561\u0574\u057D\u0561\u0569\u056B\u057E",
    time: "ISO \u056A\u0561\u0574",
    duration: "ISO \u057F\u0587\u0578\u0572\u0578\u0582\u0569\u0575\u0578\u0582\u0576",
    ipv4: "IPv4 \u0570\u0561\u057D\u0581\u0565",
    ipv6: "IPv6 \u0570\u0561\u057D\u0581\u0565",
    cidrv4: "IPv4 \u0574\u056B\u057B\u0561\u056F\u0561\u0575\u0584",
    cidrv6: "IPv6 \u0574\u056B\u057B\u0561\u056F\u0561\u0575\u0584",
    base64: "base64 \u0571\u0587\u0561\u0579\u0561\u0583\u0578\u057E \u057F\u0578\u0572",
    base64url: "base64url \u0571\u0587\u0561\u0579\u0561\u0583\u0578\u057E \u057F\u0578\u0572",
    json_string: "JSON \u057F\u0578\u0572",
    e164: "E.164 \u0570\u0561\u0574\u0561\u0580",
    jwt: "JWT",
    template_literal: "\u0574\u0578\u0582\u057F\u0584"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0569\u056B\u057E",
    array: "\u0566\u0561\u0576\u0563\u057E\u0561\u056E"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 instanceof ${issue2.expected}, \u057D\u057F\u0561\u0581\u057E\u0565\u056C \u0567 ${received}`;
        }
        return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 ${expected}, \u057D\u057F\u0561\u0581\u057E\u0565\u056C \u0567 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 ${stringifyPrimitive(issue2.values[1])}`;
        return `\u054D\u056D\u0561\u056C \u057F\u0561\u0580\u0562\u0565\u0580\u0561\u056F\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 \u0570\u0565\u057F\u0587\u0575\u0561\u056C\u0576\u0565\u0580\u056B\u0581 \u0574\u0565\u056F\u0568\u055D ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getArmenianPlural(maxValue, sizing.unit.one, sizing.unit.many);
          return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0574\u0565\u056E \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin ?? "\u0561\u0580\u056A\u0565\u0584")} \u056F\u0578\u0582\u0576\u0565\u0576\u0561 ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0574\u0565\u056E \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin ?? "\u0561\u0580\u056A\u0565\u0584")} \u056C\u056B\u0576\u056B ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getArmenianPlural(minValue, sizing.unit.one, sizing.unit.many);
          return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0583\u0578\u0584\u0580 \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin)} \u056F\u0578\u0582\u0576\u0565\u0576\u0561 ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0583\u0578\u0584\u0580 \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin)} \u056C\u056B\u0576\u056B ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u057D\u056F\u057D\u057E\u056B "${_issue.prefix}"-\u0578\u057E`;
        if (_issue.format === "ends_with")
          return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0561\u057E\u0561\u0580\u057F\u057E\u056B "${_issue.suffix}"-\u0578\u057E`;
        if (_issue.format === "includes")
          return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u057A\u0561\u0580\u0578\u0582\u0576\u0561\u056F\u056B "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0570\u0561\u0574\u0561\u057A\u0561\u057F\u0561\u057D\u056D\u0561\u0576\u056B ${_issue.pattern} \u0571\u0587\u0561\u0579\u0561\u0583\u056B\u0576`;
        return `\u054D\u056D\u0561\u056C ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u054D\u056D\u0561\u056C \u0569\u056B\u057E\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0562\u0561\u0566\u0574\u0561\u057A\u0561\u057F\u056B\u056F \u056C\u056B\u0576\u056B ${issue2.divisor}-\u056B`;
      case "unrecognized_keys":
        return `\u0549\u0573\u0561\u0576\u0561\u0579\u057E\u0561\u056E \u0562\u0561\u0576\u0561\u056C\u056B${issue2.keys.length > 1 ? "\u0576\u0565\u0580" : ""}. ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u054D\u056D\u0561\u056C \u0562\u0561\u0576\u0561\u056C\u056B ${withDefiniteArticle(issue2.origin)}-\u0578\u0582\u0574`;
      case "invalid_union":
        return "\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574";
      case "invalid_element":
        return `\u054D\u056D\u0561\u056C \u0561\u0580\u056A\u0565\u0584 ${withDefiniteArticle(issue2.origin)}-\u0578\u0582\u0574`;
      default:
        return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574`;
    }
  };
};
function hy_default() {
  return {
    localeError: error18()
  };
}

// node_modules/zod/v4/locales/id.js
var error19 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "memiliki" },
    file: { unit: "byte", verb: "memiliki" },
    array: { unit: "item", verb: "memiliki" },
    set: { unit: "item", verb: "memiliki" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "alamat email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "tanggal dan waktu format ISO",
    date: "tanggal format ISO",
    time: "jam format ISO",
    duration: "durasi format ISO",
    ipv4: "alamat IPv4",
    ipv6: "alamat IPv6",
    cidrv4: "rentang alamat IPv4",
    cidrv6: "rentang alamat IPv6",
    base64: "string dengan enkode base64",
    base64url: "string dengan enkode base64url",
    json_string: "string JSON",
    e164: "angka E.164",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Input tidak valid: diharapkan instanceof ${issue2.expected}, diterima ${received}`;
        }
        return `Input tidak valid: diharapkan ${expected}, diterima ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input tidak valid: diharapkan ${stringifyPrimitive(issue2.values[0])}`;
        return `Pilihan tidak valid: diharapkan salah satu dari ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} memiliki ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
        return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} menjadi ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Terlalu kecil: diharapkan ${issue2.origin} memiliki ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Terlalu kecil: diharapkan ${issue2.origin} menjadi ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `String tidak valid: harus dimulai dengan "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `String tidak valid: harus berakhir dengan "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `String tidak valid: harus menyertakan "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `String tidak valid: harus sesuai pola ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} tidak valid`;
      }
      case "not_multiple_of":
        return `Angka tidak valid: harus kelipatan dari ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak valid di ${issue2.origin}`;
      case "invalid_union":
        return "Input tidak valid";
      case "invalid_element":
        return `Nilai tidak valid di ${issue2.origin}`;
      default:
        return `Input tidak valid`;
    }
  };
};
function id_default() {
  return {
    localeError: error19()
  };
}

// node_modules/zod/v4/locales/is.js
var error20 = () => {
  const Sizable = {
    string: { unit: "stafi", verb: "a\xF0 hafa" },
    file: { unit: "b\xE6ti", verb: "a\xF0 hafa" },
    array: { unit: "hluti", verb: "a\xF0 hafa" },
    set: { unit: "hluti", verb: "a\xF0 hafa" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "gildi",
    email: "netfang",
    url: "vefsl\xF3\xF0",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dagsetning og t\xEDmi",
    date: "ISO dagsetning",
    time: "ISO t\xEDmi",
    duration: "ISO t\xEDmalengd",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded strengur",
    base64url: "base64url-encoded strengur",
    json_string: "JSON strengur",
    e164: "E.164 t\xF6lugildi",
    jwt: "JWT",
    template_literal: "gildi"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "n\xFAmer",
    array: "fylki"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Rangt gildi: \xDE\xFA sl\xF3st inn ${received} \xFEar sem \xE1 a\xF0 vera instanceof ${issue2.expected}`;
        }
        return `Rangt gildi: \xDE\xFA sl\xF3st inn ${received} \xFEar sem \xE1 a\xF0 vera ${expected}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Rangt gildi: gert r\xE1\xF0 fyrir ${stringifyPrimitive(issue2.values[0])}`;
        return `\xD3gilt val: m\xE1 vera eitt af eftirfarandi ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin ?? "gildi"} hafi ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "hluti"}`;
        return `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin ?? "gildi"} s\xE9 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin} hafi ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin} s\xE9 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\xD3gildur strengur: ver\xF0ur a\xF0 byrja \xE1 "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `\xD3gildur strengur: ver\xF0ur a\xF0 enda \xE1 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\xD3gildur strengur: ver\xF0ur a\xF0 innihalda "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\xD3gildur strengur: ver\xF0ur a\xF0 fylgja mynstri ${_issue.pattern}`;
        return `Rangt ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `R\xF6ng tala: ver\xF0ur a\xF0 vera margfeldi af ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\xD3\xFEekkt ${issue2.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Rangur lykill \xED ${issue2.origin}`;
      case "invalid_union":
        return "Rangt gildi";
      case "invalid_element":
        return `Rangt gildi \xED ${issue2.origin}`;
      default:
        return `Rangt gildi`;
    }
  };
};
function is_default() {
  return {
    localeError: error20()
  };
}

// node_modules/zod/v4/locales/it.js
var error21 = () => {
  const Sizable = {
    string: { unit: "caratteri", verb: "avere" },
    file: { unit: "byte", verb: "avere" },
    array: { unit: "elementi", verb: "avere" },
    set: { unit: "elementi", verb: "avere" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "indirizzo email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data e ora ISO",
    date: "data ISO",
    time: "ora ISO",
    duration: "durata ISO",
    ipv4: "indirizzo IPv4",
    ipv6: "indirizzo IPv6",
    cidrv4: "intervallo IPv4",
    cidrv6: "intervallo IPv6",
    base64: "stringa codificata in base64",
    base64url: "URL codificata in base64",
    json_string: "stringa JSON",
    e164: "numero E.164",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "numero",
    array: "vettore"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Input non valido: atteso instanceof ${issue2.expected}, ricevuto ${received}`;
        }
        return `Input non valido: atteso ${expected}, ricevuto ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input non valido: atteso ${stringifyPrimitive(issue2.values[0])}`;
        return `Opzione non valida: atteso uno tra ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Troppo grande: ${issue2.origin ?? "valore"} deve avere ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementi"}`;
        return `Troppo grande: ${issue2.origin ?? "valore"} deve essere ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Troppo piccolo: ${issue2.origin} deve avere ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Troppo piccolo: ${issue2.origin} deve essere ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Stringa non valida: deve iniziare con "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Stringa non valida: deve terminare con "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Stringa non valida: deve includere "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Stringa non valida: deve corrispondere al pattern ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Numero non valido: deve essere un multiplo di ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Chiav${issue2.keys.length > 1 ? "i" : "e"} non riconosciut${issue2.keys.length > 1 ? "e" : "a"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Chiave non valida in ${issue2.origin}`;
      case "invalid_union":
        return "Input non valido";
      case "invalid_element":
        return `Valore non valido in ${issue2.origin}`;
      default:
        return `Input non valido`;
    }
  };
};
function it_default() {
  return {
    localeError: error21()
  };
}

// node_modules/zod/v4/locales/ja.js
var error22 = () => {
  const Sizable = {
    string: { unit: "\u6587\u5B57", verb: "\u3067\u3042\u308B" },
    file: { unit: "\u30D0\u30A4\u30C8", verb: "\u3067\u3042\u308B" },
    array: { unit: "\u8981\u7D20", verb: "\u3067\u3042\u308B" },
    set: { unit: "\u8981\u7D20", verb: "\u3067\u3042\u308B" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u5165\u529B\u5024",
    email: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9",
    url: "URL",
    emoji: "\u7D75\u6587\u5B57",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO\u65E5\u6642",
    date: "ISO\u65E5\u4ED8",
    time: "ISO\u6642\u523B",
    duration: "ISO\u671F\u9593",
    ipv4: "IPv4\u30A2\u30C9\u30EC\u30B9",
    ipv6: "IPv6\u30A2\u30C9\u30EC\u30B9",
    cidrv4: "IPv4\u7BC4\u56F2",
    cidrv6: "IPv6\u7BC4\u56F2",
    base64: "base64\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217",
    base64url: "base64url\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217",
    json_string: "JSON\u6587\u5B57\u5217",
    e164: "E.164\u756A\u53F7",
    jwt: "JWT",
    template_literal: "\u5165\u529B\u5024"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u6570\u5024",
    array: "\u914D\u5217"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u7121\u52B9\u306A\u5165\u529B: instanceof ${issue2.expected}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F\u304C\u3001${received}\u304C\u5165\u529B\u3055\u308C\u307E\u3057\u305F`;
        }
        return `\u7121\u52B9\u306A\u5165\u529B: ${expected}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F\u304C\u3001${received}\u304C\u5165\u529B\u3055\u308C\u307E\u3057\u305F`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u7121\u52B9\u306A\u5165\u529B: ${stringifyPrimitive(issue2.values[0])}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F`;
        return `\u7121\u52B9\u306A\u9078\u629E: ${joinValues(issue2.values, "\u3001")}\u306E\u3044\u305A\u308C\u304B\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      case "too_big": {
        const adj = issue2.inclusive ? "\u4EE5\u4E0B\u3067\u3042\u308B" : "\u3088\u308A\u5C0F\u3055\u3044";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u5927\u304D\u3059\u304E\u308B\u5024: ${issue2.origin ?? "\u5024"}\u306F${issue2.maximum.toString()}${sizing.unit ?? "\u8981\u7D20"}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        return `\u5927\u304D\u3059\u304E\u308B\u5024: ${issue2.origin ?? "\u5024"}\u306F${issue2.maximum.toString()}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "\u4EE5\u4E0A\u3067\u3042\u308B" : "\u3088\u308A\u5927\u304D\u3044";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${issue2.origin}\u306F${issue2.minimum.toString()}${sizing.unit}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        return `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${issue2.origin}\u306F${issue2.minimum.toString()}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${_issue.prefix}"\u3067\u59CB\u307E\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        if (_issue.format === "ends_with")
          return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${_issue.suffix}"\u3067\u7D42\u308F\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        if (_issue.format === "includes")
          return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${_issue.includes}"\u3092\u542B\u3080\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        if (_issue.format === "regex")
          return `\u7121\u52B9\u306A\u6587\u5B57\u5217: \u30D1\u30BF\u30FC\u30F3${_issue.pattern}\u306B\u4E00\u81F4\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        return `\u7121\u52B9\u306A${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u7121\u52B9\u306A\u6570\u5024: ${issue2.divisor}\u306E\u500D\u6570\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      case "unrecognized_keys":
        return `\u8A8D\u8B58\u3055\u308C\u3066\u3044\u306A\u3044\u30AD\u30FC${issue2.keys.length > 1 ? "\u7FA4" : ""}: ${joinValues(issue2.keys, "\u3001")}`;
      case "invalid_key":
        return `${issue2.origin}\u5185\u306E\u7121\u52B9\u306A\u30AD\u30FC`;
      case "invalid_union":
        return "\u7121\u52B9\u306A\u5165\u529B";
      case "invalid_element":
        return `${issue2.origin}\u5185\u306E\u7121\u52B9\u306A\u5024`;
      default:
        return `\u7121\u52B9\u306A\u5165\u529B`;
    }
  };
};
function ja_default() {
  return {
    localeError: error22()
  };
}

// node_modules/zod/v4/locales/ka.js
var error23 = () => {
  const Sizable = {
    string: { unit: "\u10E1\u10D8\u10DB\u10D1\u10DD\u10DA\u10DD", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" },
    file: { unit: "\u10D1\u10D0\u10D8\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" },
    array: { unit: "\u10D4\u10DA\u10D4\u10DB\u10D4\u10DC\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" },
    set: { unit: "\u10D4\u10DA\u10D4\u10DB\u10D4\u10DC\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0",
    email: "\u10D4\u10DA-\u10E4\u10DD\u10E1\u10E2\u10D8\u10E1 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8",
    url: "URL",
    emoji: "\u10D4\u10DB\u10DD\u10EF\u10D8",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u10D7\u10D0\u10E0\u10D8\u10E6\u10D8-\u10D3\u10E0\u10DD",
    date: "\u10D7\u10D0\u10E0\u10D8\u10E6\u10D8",
    time: "\u10D3\u10E0\u10DD",
    duration: "\u10EE\u10D0\u10DC\u10D2\u10E0\u10EB\u10DA\u10D8\u10D5\u10DD\u10D1\u10D0",
    ipv4: "IPv4 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8",
    ipv6: "IPv6 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8",
    cidrv4: "IPv4 \u10D3\u10D8\u10D0\u10DE\u10D0\u10D6\u10DD\u10DC\u10D8",
    cidrv6: "IPv6 \u10D3\u10D8\u10D0\u10DE\u10D0\u10D6\u10DD\u10DC\u10D8",
    base64: "base64-\u10D9\u10DD\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8",
    base64url: "base64url-\u10D9\u10DD\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8",
    json_string: "JSON \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8",
    e164: "E.164 \u10DC\u10DD\u10DB\u10D4\u10E0\u10D8",
    jwt: "JWT",
    template_literal: "\u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u10E0\u10D8\u10EA\u10EE\u10D5\u10D8",
    string: "\u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8",
    boolean: "\u10D1\u10E3\u10DA\u10D4\u10D0\u10DC\u10D8",
    function: "\u10E4\u10E3\u10DC\u10E5\u10EA\u10D8\u10D0",
    array: "\u10DB\u10D0\u10E1\u10D8\u10D5\u10D8"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 instanceof ${issue2.expected}, \u10DB\u10D8\u10E6\u10D4\u10D1\u10E3\u10DA\u10D8 ${received}`;
        }
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${expected}, \u10DB\u10D8\u10E6\u10D4\u10D1\u10E3\u10DA\u10D8 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${stringifyPrimitive(issue2.values[0])}`;
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D5\u10D0\u10E0\u10D8\u10D0\u10DC\u10E2\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8\u10D0 \u10D4\u10E0\u10D7-\u10D4\u10E0\u10D7\u10D8 ${joinValues(issue2.values, "|")}-\u10D3\u10D0\u10DC`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10D3\u10D8\u10D3\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin ?? "\u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
        return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10D3\u10D8\u10D3\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin ?? "\u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0"} \u10D8\u10E7\u10DD\u10E1 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10DE\u10D0\u10E2\u10D0\u10E0\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10DE\u10D0\u10E2\u10D0\u10E0\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin} \u10D8\u10E7\u10DD\u10E1 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10D8\u10EC\u10E7\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 "${_issue.prefix}"-\u10D8\u10D7`;
        }
        if (_issue.format === "ends_with")
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10DB\u10D7\u10D0\u10D5\u10E0\u10D3\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 "${_issue.suffix}"-\u10D8\u10D7`;
        if (_issue.format === "includes")
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1 "${_issue.includes}"-\u10E1`;
        if (_issue.format === "regex")
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D4\u10E1\u10D0\u10D1\u10D0\u10DB\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 \u10E8\u10D0\u10D1\u10DA\u10DD\u10DC\u10E1 ${_issue.pattern}`;
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E0\u10D8\u10EA\u10EE\u10D5\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10D8\u10E7\u10DD\u10E1 ${issue2.divisor}-\u10D8\u10E1 \u10EF\u10D4\u10E0\u10D0\u10D3\u10D8`;
      case "unrecognized_keys":
        return `\u10E3\u10EA\u10DC\u10DD\u10D1\u10D8 \u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1${issue2.keys.length > 1 ? "\u10D4\u10D1\u10D8" : "\u10D8"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1\u10D8 ${issue2.origin}-\u10E8\u10D8`;
      case "invalid_union":
        return "\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0";
      case "invalid_element":
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0 ${issue2.origin}-\u10E8\u10D8`;
      default:
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0`;
    }
  };
};
function ka_default() {
  return {
    localeError: error23()
  };
}

// node_modules/zod/v4/locales/km.js
var error24 = () => {
  const Sizable = {
    string: { unit: "\u178F\u17BD\u17A2\u1780\u17D2\u179F\u179A", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" },
    file: { unit: "\u1794\u17C3", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" },
    array: { unit: "\u1792\u17B6\u178F\u17BB", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" },
    set: { unit: "\u1792\u17B6\u178F\u17BB", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B",
    email: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793\u17A2\u17CA\u17B8\u1798\u17C2\u179B",
    url: "URL",
    emoji: "\u179F\u1789\u17D2\u1789\u17B6\u17A2\u17B6\u179A\u1798\u17D2\u1798\u178E\u17CD",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 \u1793\u17B7\u1784\u1798\u17C9\u17C4\u1784 ISO",
    date: "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 ISO",
    time: "\u1798\u17C9\u17C4\u1784 ISO",
    duration: "\u179A\u1799\u17C8\u1796\u17C1\u179B ISO",
    ipv4: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4",
    ipv6: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6",
    cidrv4: "\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4",
    cidrv6: "\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6",
    base64: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64",
    base64url: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64url",
    json_string: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A JSON",
    e164: "\u179B\u17C1\u1781 E.164",
    jwt: "JWT",
    template_literal: "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u179B\u17C1\u1781",
    array: "\u17A2\u17B6\u179A\u17C1 (Array)",
    null: "\u1782\u17D2\u1798\u17B6\u1793\u178F\u1798\u17D2\u179B\u17C3 (null)"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A instanceof ${issue2.expected} \u1794\u17C9\u17BB\u1793\u17D2\u178F\u17C2\u1791\u1791\u17BD\u179B\u1794\u17B6\u1793 ${received}`;
        }
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${expected} \u1794\u17C9\u17BB\u1793\u17D2\u178F\u17C2\u1791\u1791\u17BD\u179B\u1794\u17B6\u1793 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${stringifyPrimitive(issue2.values[0])}`;
        return `\u1787\u1798\u17D2\u179A\u17BE\u179F\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1787\u17B6\u1798\u17BD\u1799\u1780\u17D2\u1793\u17BB\u1784\u1785\u17C6\u178E\u17C4\u1798 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin ?? "\u178F\u1798\u17D2\u179B\u17C3"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "\u1792\u17B6\u178F\u17BB"}`;
        return `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin ?? "\u178F\u1798\u17D2\u179B\u17C3"} ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin} ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1785\u17B6\u1794\u17CB\u1795\u17D2\u178F\u17BE\u1798\u178A\u17C4\u1799 "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1794\u1789\u17D2\u1785\u1794\u17CB\u178A\u17C4\u1799 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1798\u17B6\u1793 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1795\u17D2\u1782\u17BC\u1795\u17D2\u1782\u1784\u1793\u17B9\u1784\u1791\u1798\u17D2\u179A\u1784\u17CB\u178A\u17C2\u179B\u1794\u17B6\u1793\u1780\u17C6\u178E\u178F\u17CB ${_issue.pattern}`;
        return `\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u179B\u17C1\u1781\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1787\u17B6\u1796\u17A0\u17BB\u1782\u17BB\u178E\u1793\u17C3 ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u179A\u1780\u1783\u17BE\u1789\u179F\u17C4\u1798\u17B7\u1793\u179F\u17D2\u1782\u17B6\u179B\u17CB\u17D6 ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u179F\u17C4\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${issue2.origin}`;
      case "invalid_union":
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C`;
      case "invalid_element":
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${issue2.origin}`;
      default:
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C`;
    }
  };
};
function km_default() {
  return {
    localeError: error24()
  };
}

// node_modules/zod/v4/locales/kh.js
function kh_default() {
  return km_default();
}

// node_modules/zod/v4/locales/ko.js
var error25 = () => {
  const Sizable = {
    string: { unit: "\uBB38\uC790", verb: "to have" },
    file: { unit: "\uBC14\uC774\uD2B8", verb: "to have" },
    array: { unit: "\uAC1C", verb: "to have" },
    set: { unit: "\uAC1C", verb: "to have" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\uC785\uB825",
    email: "\uC774\uBA54\uC77C \uC8FC\uC18C",
    url: "URL",
    emoji: "\uC774\uBAA8\uC9C0",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \uB0A0\uC9DC\uC2DC\uAC04",
    date: "ISO \uB0A0\uC9DC",
    time: "ISO \uC2DC\uAC04",
    duration: "ISO \uAE30\uAC04",
    ipv4: "IPv4 \uC8FC\uC18C",
    ipv6: "IPv6 \uC8FC\uC18C",
    cidrv4: "IPv4 \uBC94\uC704",
    cidrv6: "IPv6 \uBC94\uC704",
    base64: "base64 \uC778\uCF54\uB529 \uBB38\uC790\uC5F4",
    base64url: "base64url \uC778\uCF54\uB529 \uBB38\uC790\uC5F4",
    json_string: "JSON \uBB38\uC790\uC5F4",
    e164: "E.164 \uBC88\uD638",
    jwt: "JWT",
    template_literal: "\uC785\uB825"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 instanceof ${issue2.expected}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${received}\uC785\uB2C8\uB2E4`;
        }
        return `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 ${expected}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${received}\uC785\uB2C8\uB2E4`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\uC798\uBABB\uB41C \uC785\uB825: \uAC12\uC740 ${stringifyPrimitive(issue2.values[0])} \uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4`;
        return `\uC798\uBABB\uB41C \uC635\uC158: ${joinValues(issue2.values, "\uB610\uB294 ")} \uC911 \uD558\uB098\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
      case "too_big": {
        const adj = issue2.inclusive ? "\uC774\uD558" : "\uBBF8\uB9CC";
        const suffix = adj === "\uBBF8\uB9CC" ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4" : "\uC5EC\uC57C \uD569\uB2C8\uB2E4";
        const sizing = getSizing(issue2.origin);
        const unit = sizing?.unit ?? "\uC694\uC18C";
        if (sizing)
          return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${issue2.maximum.toString()}${unit} ${adj}${suffix}`;
        return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${issue2.maximum.toString()} ${adj}${suffix}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "\uC774\uC0C1" : "\uCD08\uACFC";
        const suffix = adj === "\uC774\uC0C1" ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4" : "\uC5EC\uC57C \uD569\uB2C8\uB2E4";
        const sizing = getSizing(issue2.origin);
        const unit = sizing?.unit ?? "\uC694\uC18C";
        if (sizing) {
          return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${issue2.minimum.toString()}${unit} ${adj}${suffix}`;
        }
        return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${issue2.minimum.toString()} ${adj}${suffix}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.prefix}"(\uC73C)\uB85C \uC2DC\uC791\uD574\uC57C \uD569\uB2C8\uB2E4`;
        }
        if (_issue.format === "ends_with")
          return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.suffix}"(\uC73C)\uB85C \uB05D\uB098\uC57C \uD569\uB2C8\uB2E4`;
        if (_issue.format === "includes")
          return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.includes}"\uC744(\uB97C) \uD3EC\uD568\uD574\uC57C \uD569\uB2C8\uB2E4`;
        if (_issue.format === "regex")
          return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: \uC815\uADDC\uC2DD ${_issue.pattern} \uD328\uD134\uACFC \uC77C\uCE58\uD574\uC57C \uD569\uB2C8\uB2E4`;
        return `\uC798\uBABB\uB41C ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\uC798\uBABB\uB41C \uC22B\uC790: ${issue2.divisor}\uC758 \uBC30\uC218\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
      case "unrecognized_keys":
        return `\uC778\uC2DD\uD560 \uC218 \uC5C6\uB294 \uD0A4: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\uC798\uBABB\uB41C \uD0A4: ${issue2.origin}`;
      case "invalid_union":
        return `\uC798\uBABB\uB41C \uC785\uB825`;
      case "invalid_element":
        return `\uC798\uBABB\uB41C \uAC12: ${issue2.origin}`;
      default:
        return `\uC798\uBABB\uB41C \uC785\uB825`;
    }
  };
};
function ko_default() {
  return {
    localeError: error25()
  };
}

// node_modules/zod/v4/locales/lt.js
var capitalizeFirstCharacter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
function getUnitTypeFromNumber(number4) {
  const abs = Math.abs(number4);
  const last = abs % 10;
  const last2 = abs % 100;
  if (last2 >= 11 && last2 <= 19 || last === 0)
    return "many";
  if (last === 1)
    return "one";
  return "few";
}
var error26 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "simbolis",
        few: "simboliai",
        many: "simboli\u0173"
      },
      verb: {
        smaller: {
          inclusive: "turi b\u016Bti ne ilgesn\u0117 kaip",
          notInclusive: "turi b\u016Bti trumpesn\u0117 kaip"
        },
        bigger: {
          inclusive: "turi b\u016Bti ne trumpesn\u0117 kaip",
          notInclusive: "turi b\u016Bti ilgesn\u0117 kaip"
        }
      }
    },
    file: {
      unit: {
        one: "baitas",
        few: "baitai",
        many: "bait\u0173"
      },
      verb: {
        smaller: {
          inclusive: "turi b\u016Bti ne didesnis kaip",
          notInclusive: "turi b\u016Bti ma\u017Eesnis kaip"
        },
        bigger: {
          inclusive: "turi b\u016Bti ne ma\u017Eesnis kaip",
          notInclusive: "turi b\u016Bti didesnis kaip"
        }
      }
    },
    array: {
      unit: {
        one: "element\u0105",
        few: "elementus",
        many: "element\u0173"
      },
      verb: {
        smaller: {
          inclusive: "turi tur\u0117ti ne daugiau kaip",
          notInclusive: "turi tur\u0117ti ma\u017Eiau kaip"
        },
        bigger: {
          inclusive: "turi tur\u0117ti ne ma\u017Eiau kaip",
          notInclusive: "turi tur\u0117ti daugiau kaip"
        }
      }
    },
    set: {
      unit: {
        one: "element\u0105",
        few: "elementus",
        many: "element\u0173"
      },
      verb: {
        smaller: {
          inclusive: "turi tur\u0117ti ne daugiau kaip",
          notInclusive: "turi tur\u0117ti ma\u017Eiau kaip"
        },
        bigger: {
          inclusive: "turi tur\u0117ti ne ma\u017Eiau kaip",
          notInclusive: "turi tur\u0117ti daugiau kaip"
        }
      }
    }
  };
  function getSizing(origin, unitType, inclusive, targetShouldBe) {
    const result = Sizable[origin] ?? null;
    if (result === null)
      return result;
    return {
      unit: result.unit[unitType],
      verb: result.verb[targetShouldBe][inclusive ? "inclusive" : "notInclusive"]
    };
  }
  const FormatDictionary = {
    regex: "\u012Fvestis",
    email: "el. pa\u0161to adresas",
    url: "URL",
    emoji: "jaustukas",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO data ir laikas",
    date: "ISO data",
    time: "ISO laikas",
    duration: "ISO trukm\u0117",
    ipv4: "IPv4 adresas",
    ipv6: "IPv6 adresas",
    cidrv4: "IPv4 tinklo prefiksas (CIDR)",
    cidrv6: "IPv6 tinklo prefiksas (CIDR)",
    base64: "base64 u\u017Ekoduota eilut\u0117",
    base64url: "base64url u\u017Ekoduota eilut\u0117",
    json_string: "JSON eilut\u0117",
    e164: "E.164 numeris",
    jwt: "JWT",
    template_literal: "\u012Fvestis"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "skai\u010Dius",
    bigint: "sveikasis skai\u010Dius",
    string: "eilut\u0117",
    boolean: "login\u0117 reik\u0161m\u0117",
    undefined: "neapibr\u0117\u017Eta reik\u0161m\u0117",
    function: "funkcija",
    symbol: "simbolis",
    array: "masyvas",
    object: "objektas",
    null: "nulin\u0117 reik\u0161m\u0117"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Gautas tipas ${received}, o tik\u0117tasi - instanceof ${issue2.expected}`;
        }
        return `Gautas tipas ${received}, o tik\u0117tasi - ${expected}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Privalo b\u016Bti ${stringifyPrimitive(issue2.values[0])}`;
        return `Privalo b\u016Bti vienas i\u0161 ${joinValues(issue2.values, "|")} pasirinkim\u0173`;
      case "too_big": {
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        const sizing = getSizing(issue2.origin, getUnitTypeFromNumber(Number(issue2.maximum)), issue2.inclusive ?? false, "smaller");
        if (sizing?.verb)
          return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} ${sizing.verb} ${issue2.maximum.toString()} ${sizing.unit ?? "element\u0173"}`;
        const adj = issue2.inclusive ? "ne didesnis kaip" : "ma\u017Eesnis kaip";
        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} turi b\u016Bti ${adj} ${issue2.maximum.toString()} ${sizing?.unit}`;
      }
      case "too_small": {
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        const sizing = getSizing(issue2.origin, getUnitTypeFromNumber(Number(issue2.minimum)), issue2.inclusive ?? false, "bigger");
        if (sizing?.verb)
          return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} ${sizing.verb} ${issue2.minimum.toString()} ${sizing.unit ?? "element\u0173"}`;
        const adj = issue2.inclusive ? "ne ma\u017Eesnis kaip" : "didesnis kaip";
        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} turi b\u016Bti ${adj} ${issue2.minimum.toString()} ${sizing?.unit}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Eilut\u0117 privalo prasid\u0117ti "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Eilut\u0117 privalo pasibaigti "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Eilut\u0117 privalo \u012Ftraukti "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Eilut\u0117 privalo atitikti ${_issue.pattern}`;
        return `Neteisingas ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Skai\u010Dius privalo b\u016Bti ${issue2.divisor} kartotinis.`;
      case "unrecognized_keys":
        return `Neatpa\u017Eint${issue2.keys.length > 1 ? "i" : "as"} rakt${issue2.keys.length > 1 ? "ai" : "as"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return "Rastas klaidingas raktas";
      case "invalid_union":
        return "Klaidinga \u012Fvestis";
      case "invalid_element": {
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} turi klaiding\u0105 \u012Fvest\u012F`;
      }
      default:
        return "Klaidinga \u012Fvestis";
    }
  };
};
function lt_default() {
  return {
    localeError: error26()
  };
}

// node_modules/zod/v4/locales/mk.js
var error27 = () => {
  const Sizable = {
    string: { unit: "\u0437\u043D\u0430\u0446\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" },
    file: { unit: "\u0431\u0430\u0458\u0442\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" },
    array: { unit: "\u0441\u0442\u0430\u0432\u043A\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" },
    set: { unit: "\u0441\u0442\u0430\u0432\u043A\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0432\u043D\u0435\u0441",
    email: "\u0430\u0434\u0440\u0435\u0441\u0430 \u043D\u0430 \u0435-\u043F\u043E\u0448\u0442\u0430",
    url: "URL",
    emoji: "\u0435\u043C\u043E\u045F\u0438",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0434\u0430\u0442\u0443\u043C \u0438 \u0432\u0440\u0435\u043C\u0435",
    date: "ISO \u0434\u0430\u0442\u0443\u043C",
    time: "ISO \u0432\u0440\u0435\u043C\u0435",
    duration: "ISO \u0432\u0440\u0435\u043C\u0435\u0442\u0440\u0430\u0435\u045A\u0435",
    ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441\u0430",
    ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441\u0430",
    cidrv4: "IPv4 \u043E\u043F\u0441\u0435\u0433",
    cidrv6: "IPv6 \u043E\u043F\u0441\u0435\u0433",
    base64: "base64-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430",
    base64url: "base64url-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430",
    json_string: "JSON \u043D\u0438\u0437\u0430",
    e164: "E.164 \u0431\u0440\u043E\u0458",
    jwt: "JWT",
    template_literal: "\u0432\u043D\u0435\u0441"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0431\u0440\u043E\u0458",
    array: "\u043D\u0438\u0437\u0430"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 instanceof ${issue2.expected}, \u043F\u0440\u0438\u043C\u0435\u043D\u043E ${received}`;
        }
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${expected}, \u043F\u0440\u0438\u043C\u0435\u043D\u043E ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
        return `\u0413\u0440\u0435\u0448\u0430\u043D\u0430 \u043E\u043F\u0446\u0438\u0458\u0430: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 \u0435\u0434\u043D\u0430 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin ?? "\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430"} \u0434\u0430 \u0438\u043C\u0430 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0438"}`;
        return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin ?? "\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430"} \u0434\u0430 \u0431\u0438\u0434\u0435 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin} \u0434\u0430 \u0438\u043C\u0430 ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin} \u0434\u0430 \u0431\u0438\u0434\u0435 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u043D\u0443\u0432\u0430 \u0441\u043E "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u0432\u0440\u0448\u0443\u0432\u0430 \u0441\u043E "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0432\u043A\u043B\u0443\u0447\u0443\u0432\u0430 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u043E\u0434\u0433\u043E\u0430\u0440\u0430 \u043D\u0430 \u043F\u0430\u0442\u0435\u0440\u043D\u043E\u0442 ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u0431\u0440\u043E\u0458: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0431\u0438\u0434\u0435 \u0434\u0435\u043B\u0438\u0432 \u0441\u043E ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D\u0438 \u043A\u043B\u0443\u0447\u0435\u0432\u0438" : "\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D \u043A\u043B\u0443\u0447"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u043A\u043B\u0443\u0447 \u0432\u043E ${issue2.origin}`;
      case "invalid_union":
        return "\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441";
      case "invalid_element":
        return `\u0413\u0440\u0435\u0448\u043D\u0430 \u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442 \u0432\u043E ${issue2.origin}`;
      default:
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441`;
    }
  };
};
function mk_default() {
  return {
    localeError: error27()
  };
}

// node_modules/zod/v4/locales/ms.js
var error28 = () => {
  const Sizable = {
    string: { unit: "aksara", verb: "mempunyai" },
    file: { unit: "bait", verb: "mempunyai" },
    array: { unit: "elemen", verb: "mempunyai" },
    set: { unit: "elemen", verb: "mempunyai" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "alamat e-mel",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "tarikh masa ISO",
    date: "tarikh ISO",
    time: "masa ISO",
    duration: "tempoh ISO",
    ipv4: "alamat IPv4",
    ipv6: "alamat IPv6",
    cidrv4: "julat IPv4",
    cidrv6: "julat IPv6",
    base64: "string dikodkan base64",
    base64url: "string dikodkan base64url",
    json_string: "string JSON",
    e164: "nombor E.164",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nombor"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Input tidak sah: dijangka instanceof ${issue2.expected}, diterima ${received}`;
        }
        return `Input tidak sah: dijangka ${expected}, diterima ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input tidak sah: dijangka ${stringifyPrimitive(issue2.values[0])}`;
        return `Pilihan tidak sah: dijangka salah satu daripada ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
        return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} adalah ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Terlalu kecil: dijangka ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Terlalu kecil: dijangka ${issue2.origin} adalah ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `String tidak sah: mesti bermula dengan "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `String tidak sah: mesti berakhir dengan "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `String tidak sah: mesti mengandungi "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `String tidak sah: mesti sepadan dengan corak ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} tidak sah`;
      }
      case "not_multiple_of":
        return `Nombor tidak sah: perlu gandaan ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak sah dalam ${issue2.origin}`;
      case "invalid_union":
        return "Input tidak sah";
      case "invalid_element":
        return `Nilai tidak sah dalam ${issue2.origin}`;
      default:
        return `Input tidak sah`;
    }
  };
};
function ms_default() {
  return {
    localeError: error28()
  };
}

// node_modules/zod/v4/locales/nl.js
var error29 = () => {
  const Sizable = {
    string: { unit: "tekens", verb: "heeft" },
    file: { unit: "bytes", verb: "heeft" },
    array: { unit: "elementen", verb: "heeft" },
    set: { unit: "elementen", verb: "heeft" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "invoer",
    email: "emailadres",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datum en tijd",
    date: "ISO datum",
    time: "ISO tijd",
    duration: "ISO duur",
    ipv4: "IPv4-adres",
    ipv6: "IPv6-adres",
    cidrv4: "IPv4-bereik",
    cidrv6: "IPv6-bereik",
    base64: "base64-gecodeerde tekst",
    base64url: "base64 URL-gecodeerde tekst",
    json_string: "JSON string",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "invoer"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "getal"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ongeldige invoer: verwacht instanceof ${issue2.expected}, ontving ${received}`;
        }
        return `Ongeldige invoer: verwacht ${expected}, ontving ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ongeldige invoer: verwacht ${stringifyPrimitive(issue2.values[0])}`;
        return `Ongeldige optie: verwacht \xE9\xE9n van ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const longName = issue2.origin === "date" ? "laat" : issue2.origin === "string" ? "lang" : "groot";
        if (sizing)
          return `Te ${longName}: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementen"} ${sizing.verb}`;
        return `Te ${longName}: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} is`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const shortName = issue2.origin === "date" ? "vroeg" : issue2.origin === "string" ? "kort" : "klein";
        if (sizing) {
          return `Te ${shortName}: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        }
        return `Te ${shortName}: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} is`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Ongeldige tekst: moet met "${_issue.prefix}" beginnen`;
        }
        if (_issue.format === "ends_with")
          return `Ongeldige tekst: moet op "${_issue.suffix}" eindigen`;
        if (_issue.format === "includes")
          return `Ongeldige tekst: moet "${_issue.includes}" bevatten`;
        if (_issue.format === "regex")
          return `Ongeldige tekst: moet overeenkomen met patroon ${_issue.pattern}`;
        return `Ongeldig: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ongeldig getal: moet een veelvoud van ${issue2.divisor} zijn`;
      case "unrecognized_keys":
        return `Onbekende key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ongeldige key in ${issue2.origin}`;
      case "invalid_union":
        return "Ongeldige invoer";
      case "invalid_element":
        return `Ongeldige waarde in ${issue2.origin}`;
      default:
        return `Ongeldige invoer`;
    }
  };
};
function nl_default() {
  return {
    localeError: error29()
  };
}

// node_modules/zod/v4/locales/no.js
var error30 = () => {
  const Sizable = {
    string: { unit: "tegn", verb: "\xE5 ha" },
    file: { unit: "bytes", verb: "\xE5 ha" },
    array: { unit: "elementer", verb: "\xE5 inneholde" },
    set: { unit: "elementer", verb: "\xE5 inneholde" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "e-postadresse",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dato- og klokkeslett",
    date: "ISO-dato",
    time: "ISO-klokkeslett",
    duration: "ISO-varighet",
    ipv4: "IPv4-omr\xE5de",
    ipv6: "IPv6-omr\xE5de",
    cidrv4: "IPv4-spekter",
    cidrv6: "IPv6-spekter",
    base64: "base64-enkodet streng",
    base64url: "base64url-enkodet streng",
    json_string: "JSON-streng",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "tall",
    array: "liste"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ugyldig input: forventet instanceof ${issue2.expected}, fikk ${received}`;
        }
        return `Ugyldig input: forventet ${expected}, fikk ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ugyldig verdi: forventet ${stringifyPrimitive(issue2.values[0])}`;
        return `Ugyldig valg: forventet en av ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `For stor(t): forventet ${issue2.origin ?? "value"} til \xE5 ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}`;
        return `For stor(t): forventet ${issue2.origin ?? "value"} til \xE5 ha ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `For lite(n): forventet ${issue2.origin} til \xE5 ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `For lite(n): forventet ${issue2.origin} til \xE5 ha ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ugyldig streng: m\xE5 starte med "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ugyldig streng: m\xE5 ende med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ugyldig streng: m\xE5 inneholde "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ugyldig streng: m\xE5 matche m\xF8nsteret ${_issue.pattern}`;
        return `Ugyldig ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ugyldig tall: m\xE5 v\xE6re et multiplum av ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Ukjente n\xF8kler" : "Ukjent n\xF8kkel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig n\xF8kkel i ${issue2.origin}`;
      case "invalid_union":
        return "Ugyldig input";
      case "invalid_element":
        return `Ugyldig verdi i ${issue2.origin}`;
      default:
        return `Ugyldig input`;
    }
  };
};
function no_default() {
  return {
    localeError: error30()
  };
}

// node_modules/zod/v4/locales/ota.js
var error31 = () => {
  const Sizable = {
    string: { unit: "harf", verb: "olmal\u0131d\u0131r" },
    file: { unit: "bayt", verb: "olmal\u0131d\u0131r" },
    array: { unit: "unsur", verb: "olmal\u0131d\u0131r" },
    set: { unit: "unsur", verb: "olmal\u0131d\u0131r" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "giren",
    email: "epostag\xE2h",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO heng\xE2m\u0131",
    date: "ISO tarihi",
    time: "ISO zaman\u0131",
    duration: "ISO m\xFCddeti",
    ipv4: "IPv4 ni\u015F\xE2n\u0131",
    ipv6: "IPv6 ni\u015F\xE2n\u0131",
    cidrv4: "IPv4 menzili",
    cidrv6: "IPv6 menzili",
    base64: "base64-\u015Fifreli metin",
    base64url: "base64url-\u015Fifreli metin",
    json_string: "JSON metin",
    e164: "E.164 say\u0131s\u0131",
    jwt: "JWT",
    template_literal: "giren"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "numara",
    array: "saf",
    null: "gayb"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `F\xE2sit giren: umulan instanceof ${issue2.expected}, al\u0131nan ${received}`;
        }
        return `F\xE2sit giren: umulan ${expected}, al\u0131nan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `F\xE2sit giren: umulan ${stringifyPrimitive(issue2.values[0])}`;
        return `F\xE2sit tercih: m\xFBteberler ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Fazla b\xFCy\xFCk: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"} sahip olmal\u0131yd\u0131.`;
        return `Fazla b\xFCy\xFCk: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} olmal\u0131yd\u0131.`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Fazla k\xFC\xE7\xFCk: ${issue2.origin}, ${adj}${issue2.minimum.toString()} ${sizing.unit} sahip olmal\u0131yd\u0131.`;
        }
        return `Fazla k\xFC\xE7\xFCk: ${issue2.origin}, ${adj}${issue2.minimum.toString()} olmal\u0131yd\u0131.`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `F\xE2sit metin: "${_issue.prefix}" ile ba\u015Flamal\u0131.`;
        if (_issue.format === "ends_with")
          return `F\xE2sit metin: "${_issue.suffix}" ile bitmeli.`;
        if (_issue.format === "includes")
          return `F\xE2sit metin: "${_issue.includes}" ihtiv\xE2 etmeli.`;
        if (_issue.format === "regex")
          return `F\xE2sit metin: ${_issue.pattern} nak\u015F\u0131na uymal\u0131.`;
        return `F\xE2sit ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `F\xE2sit say\u0131: ${issue2.divisor} kat\u0131 olmal\u0131yd\u0131.`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan anahtar ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} i\xE7in tan\u0131nmayan anahtar var.`;
      case "invalid_union":
        return "Giren tan\u0131namad\u0131.";
      case "invalid_element":
        return `${issue2.origin} i\xE7in tan\u0131nmayan k\u0131ymet var.`;
      default:
        return `K\u0131ymet tan\u0131namad\u0131.`;
    }
  };
};
function ota_default() {
  return {
    localeError: error31()
  };
}

// node_modules/zod/v4/locales/ps.js
var error32 = () => {
  const Sizable = {
    string: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" },
    file: { unit: "\u0628\u0627\u06CC\u067C\u0633", verb: "\u0648\u0644\u0631\u064A" },
    array: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" },
    set: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0648\u0631\u0648\u062F\u064A",
    email: "\u0628\u0631\u06CC\u069A\u0646\u0627\u0644\u06CC\u06A9",
    url: "\u06CC\u0648 \u0622\u0631 \u0627\u0644",
    emoji: "\u0627\u06CC\u0645\u0648\u062C\u064A",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u0646\u06CC\u067C\u0647 \u0627\u0648 \u0648\u062E\u062A",
    date: "\u0646\u06D0\u067C\u0647",
    time: "\u0648\u062E\u062A",
    duration: "\u0645\u0648\u062F\u0647",
    ipv4: "\u062F IPv4 \u067E\u062A\u0647",
    ipv6: "\u062F IPv6 \u067E\u062A\u0647",
    cidrv4: "\u062F IPv4 \u0633\u0627\u062D\u0647",
    cidrv6: "\u062F IPv6 \u0633\u0627\u062D\u0647",
    base64: "base64-encoded \u0645\u062A\u0646",
    base64url: "base64url-encoded \u0645\u062A\u0646",
    json_string: "JSON \u0645\u062A\u0646",
    e164: "\u062F E.164 \u0634\u0645\u06D0\u0631\u0647",
    jwt: "JWT",
    template_literal: "\u0648\u0631\u0648\u062F\u064A"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0639\u062F\u062F",
    array: "\u0627\u0631\u06D0"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F instanceof ${issue2.expected} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${received} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648`;
        }
        return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${expected} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${received} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648`;
      }
      case "invalid_value":
        if (issue2.values.length === 1) {
          return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${stringifyPrimitive(issue2.values[0])} \u0648\u0627\u06CC`;
        }
        return `\u0646\u0627\u0633\u0645 \u0627\u0646\u062A\u062E\u0627\u0628: \u0628\u0627\u06CC\u062F \u06CC\u0648 \u0644\u0647 ${joinValues(issue2.values, "|")} \u0685\u062E\u0647 \u0648\u0627\u06CC`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${issue2.origin ?? "\u0627\u0631\u0632\u069A\u062A"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0635\u0631\u0648\u0646\u0647"} \u0648\u0644\u0631\u064A`;
        }
        return `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${issue2.origin ?? "\u0627\u0631\u0632\u069A\u062A"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} \u0648\u064A`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0648\u0644\u0631\u064A`;
        }
        return `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} \u0648\u064A`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${_issue.prefix}" \u0633\u0631\u0647 \u067E\u06CC\u0644 \u0634\u064A`;
        }
        if (_issue.format === "ends_with") {
          return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${_issue.suffix}" \u0633\u0631\u0647 \u067E\u0627\u06CC \u062A\u0647 \u0648\u0631\u0633\u064A\u0696\u064A`;
        }
        if (_issue.format === "includes") {
          return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F "${_issue.includes}" \u0648\u0644\u0631\u064A`;
        }
        if (_issue.format === "regex") {
          return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F ${_issue.pattern} \u0633\u0631\u0647 \u0645\u0637\u0627\u0628\u0642\u062A \u0648\u0644\u0631\u064A`;
        }
        return `${FormatDictionary[_issue.format] ?? issue2.format} \u0646\u0627\u0633\u0645 \u062F\u06CC`;
      }
      case "not_multiple_of":
        return `\u0646\u0627\u0633\u0645 \u0639\u062F\u062F: \u0628\u0627\u06CC\u062F \u062F ${issue2.divisor} \u0645\u0636\u0631\u0628 \u0648\u064A`;
      case "unrecognized_keys":
        return `\u0646\u0627\u0633\u0645 ${issue2.keys.length > 1 ? "\u06A9\u0644\u06CC\u0689\u0648\u0646\u0647" : "\u06A9\u0644\u06CC\u0689"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u0646\u0627\u0633\u0645 \u06A9\u0644\u06CC\u0689 \u067E\u0647 ${issue2.origin} \u06A9\u06D0`;
      case "invalid_union":
        return `\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A`;
      case "invalid_element":
        return `\u0646\u0627\u0633\u0645 \u0639\u0646\u0635\u0631 \u067E\u0647 ${issue2.origin} \u06A9\u06D0`;
      default:
        return `\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A`;
    }
  };
};
function ps_default() {
  return {
    localeError: error32()
  };
}

// node_modules/zod/v4/locales/pl.js
var error33 = () => {
  const Sizable = {
    string: { unit: "znak\xF3w", verb: "mie\u0107" },
    file: { unit: "bajt\xF3w", verb: "mie\u0107" },
    array: { unit: "element\xF3w", verb: "mie\u0107" },
    set: { unit: "element\xF3w", verb: "mie\u0107" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "wyra\u017Cenie",
    email: "adres email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data i godzina w formacie ISO",
    date: "data w formacie ISO",
    time: "godzina w formacie ISO",
    duration: "czas trwania ISO",
    ipv4: "adres IPv4",
    ipv6: "adres IPv6",
    cidrv4: "zakres IPv4",
    cidrv6: "zakres IPv6",
    base64: "ci\u0105g znak\xF3w zakodowany w formacie base64",
    base64url: "ci\u0105g znak\xF3w zakodowany w formacie base64url",
    json_string: "ci\u0105g znak\xF3w w formacie JSON",
    e164: "liczba E.164",
    jwt: "JWT",
    template_literal: "wej\u015Bcie"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "liczba",
    array: "tablica"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano instanceof ${issue2.expected}, otrzymano ${received}`;
        }
        return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${expected}, otrzymano ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${stringifyPrimitive(issue2.values[0])}`;
        return `Nieprawid\u0142owa opcja: oczekiwano jednej z warto\u015Bci ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Za du\u017Ca warto\u015B\u0107: oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie mie\u0107 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element\xF3w"}`;
        }
        return `Zbyt du\u017C(y/a/e): oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie wynosi\u0107 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Za ma\u0142a warto\u015B\u0107: oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie mie\u0107 ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "element\xF3w"}`;
        }
        return `Zbyt ma\u0142(y/a/e): oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie wynosi\u0107 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zaczyna\u0107 si\u0119 od "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi ko\u0144czy\u0107 si\u0119 na "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zawiera\u0107 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi odpowiada\u0107 wzorcowi ${_issue.pattern}`;
        return `Nieprawid\u0142ow(y/a/e) ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Nieprawid\u0142owa liczba: musi by\u0107 wielokrotno\u015Bci\u0105 ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Nierozpoznane klucze${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Nieprawid\u0142owy klucz w ${issue2.origin}`;
      case "invalid_union":
        return "Nieprawid\u0142owe dane wej\u015Bciowe";
      case "invalid_element":
        return `Nieprawid\u0142owa warto\u015B\u0107 w ${issue2.origin}`;
      default:
        return `Nieprawid\u0142owe dane wej\u015Bciowe`;
    }
  };
};
function pl_default() {
  return {
    localeError: error33()
  };
}

// node_modules/zod/v4/locales/pt.js
var error34 = () => {
  const Sizable = {
    string: { unit: "caracteres", verb: "ter" },
    file: { unit: "bytes", verb: "ter" },
    array: { unit: "itens", verb: "ter" },
    set: { unit: "itens", verb: "ter" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "padr\xE3o",
    email: "endere\xE7o de e-mail",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data e hora ISO",
    date: "data ISO",
    time: "hora ISO",
    duration: "dura\xE7\xE3o ISO",
    ipv4: "endere\xE7o IPv4",
    ipv6: "endere\xE7o IPv6",
    cidrv4: "faixa de IPv4",
    cidrv6: "faixa de IPv6",
    base64: "texto codificado em base64",
    base64url: "URL codificada em base64",
    json_string: "texto JSON",
    e164: "n\xFAmero E.164",
    jwt: "JWT",
    template_literal: "entrada"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "n\xFAmero",
    null: "nulo"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Tipo inv\xE1lido: esperado instanceof ${issue2.expected}, recebido ${received}`;
        }
        return `Tipo inv\xE1lido: esperado ${expected}, recebido ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrada inv\xE1lida: esperado ${stringifyPrimitive(issue2.values[0])}`;
        return `Op\xE7\xE3o inv\xE1lida: esperada uma das ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Muito grande: esperado que ${issue2.origin ?? "valor"} tivesse ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
        return `Muito grande: esperado que ${issue2.origin ?? "valor"} fosse ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Muito pequeno: esperado que ${issue2.origin} tivesse ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Muito pequeno: esperado que ${issue2.origin} fosse ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Texto inv\xE1lido: deve come\xE7ar com "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Texto inv\xE1lido: deve terminar com "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Texto inv\xE1lido: deve incluir "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Texto inv\xE1lido: deve corresponder ao padr\xE3o ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} inv\xE1lido`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE1lido: deve ser m\xFAltiplo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Chave${issue2.keys.length > 1 ? "s" : ""} desconhecida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Chave inv\xE1lida em ${issue2.origin}`;
      case "invalid_union":
        return "Entrada inv\xE1lida";
      case "invalid_element":
        return `Valor inv\xE1lido em ${issue2.origin}`;
      default:
        return `Campo inv\xE1lido`;
    }
  };
};
function pt_default() {
  return {
    localeError: error34()
  };
}

// node_modules/zod/v4/locales/ru.js
function getRussianPlural(count, one, few, many) {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many;
  }
  if (lastDigit === 1) {
    return one;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }
  return many;
}
var error35 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "\u0441\u0438\u043C\u0432\u043E\u043B",
        few: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430",
        many: "\u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432"
      },
      verb: "\u0438\u043C\u0435\u0442\u044C"
    },
    file: {
      unit: {
        one: "\u0431\u0430\u0439\u0442",
        few: "\u0431\u0430\u0439\u0442\u0430",
        many: "\u0431\u0430\u0439\u0442"
      },
      verb: "\u0438\u043C\u0435\u0442\u044C"
    },
    array: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432"
      },
      verb: "\u0438\u043C\u0435\u0442\u044C"
    },
    set: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432"
      },
      verb: "\u0438\u043C\u0435\u0442\u044C"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0432\u0432\u043E\u0434",
    email: "email \u0430\u0434\u0440\u0435\u0441",
    url: "URL",
    emoji: "\u044D\u043C\u043E\u0434\u0437\u0438",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0434\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F",
    date: "ISO \u0434\u0430\u0442\u0430",
    time: "ISO \u0432\u0440\u0435\u043C\u044F",
    duration: "ISO \u0434\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C",
    ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441",
    ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441",
    cidrv4: "IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
    cidrv6: "IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
    base64: "\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64",
    base64url: "\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64url",
    json_string: "JSON \u0441\u0442\u0440\u043E\u043A\u0430",
    e164: "\u043D\u043E\u043C\u0435\u0440 E.164",
    jwt: "JWT",
    template_literal: "\u0432\u0432\u043E\u0434"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0447\u0438\u0441\u043B\u043E",
    array: "\u043C\u0430\u0441\u0441\u0438\u0432"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C instanceof ${issue2.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${received}`;
        }
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${stringifyPrimitive(issue2.values[0])}`;
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0434\u043D\u043E \u0438\u0437 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getRussianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"} \u0431\u0443\u0434\u0435\u0442 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getRussianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin} \u0431\u0443\u0434\u0435\u0442 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u043D\u0430\u0447\u0438\u043D\u0430\u0442\u044C\u0441\u044F \u0441 "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0437\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u043D\u0430 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}`;
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E: \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D\u043D${issue2.keys.length > 1 ? "\u044B\u0435" : "\u044B\u0439"} \u043A\u043B\u044E\u0447${issue2.keys.length > 1 ? "\u0438" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043B\u044E\u0447 \u0432 ${issue2.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435";
      case "invalid_element":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0432 ${issue2.origin}`;
      default:
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435`;
    }
  };
};
function ru_default() {
  return {
    localeError: error35()
  };
}

// node_modules/zod/v4/locales/sl.js
var error36 = () => {
  const Sizable = {
    string: { unit: "znakov", verb: "imeti" },
    file: { unit: "bajtov", verb: "imeti" },
    array: { unit: "elementov", verb: "imeti" },
    set: { unit: "elementov", verb: "imeti" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "vnos",
    email: "e-po\u0161tni naslov",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datum in \u010Das",
    date: "ISO datum",
    time: "ISO \u010Das",
    duration: "ISO trajanje",
    ipv4: "IPv4 naslov",
    ipv6: "IPv6 naslov",
    cidrv4: "obseg IPv4",
    cidrv6: "obseg IPv6",
    base64: "base64 kodiran niz",
    base64url: "base64url kodiran niz",
    json_string: "JSON niz",
    e164: "E.164 \u0161tevilka",
    jwt: "JWT",
    template_literal: "vnos"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0161tevilo",
    array: "tabela"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Neveljaven vnos: pri\u010Dakovano instanceof ${issue2.expected}, prejeto ${received}`;
        }
        return `Neveljaven vnos: pri\u010Dakovano ${expected}, prejeto ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Neveljaven vnos: pri\u010Dakovano ${stringifyPrimitive(issue2.values[0])}`;
        return `Neveljavna mo\u017Enost: pri\u010Dakovano eno izmed ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Preveliko: pri\u010Dakovano, da bo ${issue2.origin ?? "vrednost"} imelo ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementov"}`;
        return `Preveliko: pri\u010Dakovano, da bo ${issue2.origin ?? "vrednost"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Premajhno: pri\u010Dakovano, da bo ${issue2.origin} imelo ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Premajhno: pri\u010Dakovano, da bo ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Neveljaven niz: mora se za\u010Deti z "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Neveljaven niz: mora se kon\u010Dati z "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neveljaven niz: mora vsebovati "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neveljaven niz: mora ustrezati vzorcu ${_issue.pattern}`;
        return `Neveljaven ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Neveljavno \u0161tevilo: mora biti ve\u010Dkratnik ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Neprepoznan${issue2.keys.length > 1 ? "i klju\u010Di" : " klju\u010D"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Neveljaven klju\u010D v ${issue2.origin}`;
      case "invalid_union":
        return "Neveljaven vnos";
      case "invalid_element":
        return `Neveljavna vrednost v ${issue2.origin}`;
      default:
        return "Neveljaven vnos";
    }
  };
};
function sl_default() {
  return {
    localeError: error36()
  };
}

// node_modules/zod/v4/locales/sv.js
var error37 = () => {
  const Sizable = {
    string: { unit: "tecken", verb: "att ha" },
    file: { unit: "bytes", verb: "att ha" },
    array: { unit: "objekt", verb: "att inneh\xE5lla" },
    set: { unit: "objekt", verb: "att inneh\xE5lla" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "regulj\xE4rt uttryck",
    email: "e-postadress",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-datum och tid",
    date: "ISO-datum",
    time: "ISO-tid",
    duration: "ISO-varaktighet",
    ipv4: "IPv4-intervall",
    ipv6: "IPv6-intervall",
    cidrv4: "IPv4-spektrum",
    cidrv6: "IPv6-spektrum",
    base64: "base64-kodad str\xE4ng",
    base64url: "base64url-kodad str\xE4ng",
    json_string: "JSON-str\xE4ng",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "mall-literal"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "antal",
    array: "lista"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ogiltig inmatning: f\xF6rv\xE4ntat instanceof ${issue2.expected}, fick ${received}`;
        }
        return `Ogiltig inmatning: f\xF6rv\xE4ntat ${expected}, fick ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ogiltig inmatning: f\xF6rv\xE4ntat ${stringifyPrimitive(issue2.values[0])}`;
        return `Ogiltigt val: f\xF6rv\xE4ntade en av ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `F\xF6r stor(t): f\xF6rv\xE4ntade ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
        }
        return `F\xF6r stor(t): f\xF6rv\xE4ntat ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `F\xF6r lite(t): f\xF6rv\xE4ntade ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `F\xF6r lite(t): f\xF6rv\xE4ntade ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Ogiltig str\xE4ng: m\xE5ste b\xF6rja med "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Ogiltig str\xE4ng: m\xE5ste sluta med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ogiltig str\xE4ng: m\xE5ste inneh\xE5lla "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ogiltig str\xE4ng: m\xE5ste matcha m\xF6nstret "${_issue.pattern}"`;
        return `Ogiltig(t) ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ogiltigt tal: m\xE5ste vara en multipel av ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Ok\xE4nda nycklar" : "Ok\xE4nd nyckel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ogiltig nyckel i ${issue2.origin ?? "v\xE4rdet"}`;
      case "invalid_union":
        return "Ogiltig input";
      case "invalid_element":
        return `Ogiltigt v\xE4rde i ${issue2.origin ?? "v\xE4rdet"}`;
      default:
        return `Ogiltig input`;
    }
  };
};
function sv_default() {
  return {
    localeError: error37()
  };
}

// node_modules/zod/v4/locales/ta.js
var error38 = () => {
  const Sizable = {
    string: { unit: "\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" },
    file: { unit: "\u0BAA\u0BC8\u0B9F\u0BCD\u0B9F\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" },
    array: { unit: "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" },
    set: { unit: "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1",
    email: "\u0BAE\u0BBF\u0BA9\u0BCD\u0BA9\u0B9E\u0BCD\u0B9A\u0BB2\u0BCD \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0BA4\u0BC7\u0BA4\u0BBF \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",
    date: "ISO \u0BA4\u0BC7\u0BA4\u0BBF",
    time: "ISO \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",
    duration: "ISO \u0B95\u0BBE\u0BB2 \u0B85\u0BB3\u0BB5\u0BC1",
    ipv4: "IPv4 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
    ipv6: "IPv6 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
    cidrv4: "IPv4 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1",
    cidrv6: "IPv6 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1",
    base64: "base64-encoded \u0B9A\u0BB0\u0BAE\u0BCD",
    base64url: "base64url-encoded \u0B9A\u0BB0\u0BAE\u0BCD",
    json_string: "JSON \u0B9A\u0BB0\u0BAE\u0BCD",
    e164: "E.164 \u0B8E\u0BA3\u0BCD",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0B8E\u0BA3\u0BCD",
    array: "\u0B85\u0BA3\u0BBF",
    null: "\u0BB5\u0BC6\u0BB1\u0BC1\u0BAE\u0BC8"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 instanceof ${issue2.expected}, \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${received}`;
        }
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${expected}, \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${stringifyPrimitive(issue2.values[0])}`;
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BAE\u0BCD: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${joinValues(issue2.values, "|")} \u0B87\u0BB2\u0BCD \u0B92\u0BA9\u0BCD\u0BB1\u0BC1`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin ?? "\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD"} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        }
        return `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin ?? "\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1"} ${adj}${issue2.maximum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        }
        return `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin} ${adj}${issue2.minimum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${_issue.prefix}" \u0B87\u0BB2\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        if (_issue.format === "ends_with")
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${_issue.suffix}" \u0B87\u0BB2\u0BCD \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0B9F\u0BC8\u0BAF \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        if (_issue.format === "includes")
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${_issue.includes}" \u0B90 \u0B89\u0BB3\u0BCD\u0BB3\u0B9F\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        if (_issue.format === "regex")
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: ${_issue.pattern} \u0BAE\u0BC1\u0BB1\u0BC8\u0BAA\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1\u0B9F\u0BA9\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B8E\u0BA3\u0BCD: ${issue2.divisor} \u0B87\u0BA9\u0BCD \u0BAA\u0BB2\u0BAE\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      case "unrecognized_keys":
        return `\u0B85\u0B9F\u0BC8\u0BAF\u0BBE\u0BB3\u0BAE\u0BCD \u0BA4\u0BC6\u0BB0\u0BBF\u0BAF\u0BBE\u0BA4 \u0BB5\u0BBF\u0B9A\u0BC8${issue2.keys.length > 1 ? "\u0B95\u0BB3\u0BCD" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0B9A\u0BC8`;
      case "invalid_union":
        return "\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1";
      case "invalid_element":
        return `${issue2.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1`;
      default:
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1`;
    }
  };
};
function ta_default() {
  return {
    localeError: error38()
  };
}

// node_modules/zod/v4/locales/th.js
var error39 = () => {
  const Sizable = {
    string: { unit: "\u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" },
    file: { unit: "\u0E44\u0E1A\u0E15\u0E4C", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" },
    array: { unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" },
    set: { unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19",
    email: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E2D\u0E35\u0E40\u0E21\u0E25",
    url: "URL",
    emoji: "\u0E2D\u0E34\u0E42\u0E21\u0E08\u0E34",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
    date: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E41\u0E1A\u0E1A ISO",
    time: "\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
    duration: "\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
    ipv4: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv4",
    ipv6: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv6",
    cidrv4: "\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv4",
    cidrv6: "\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv6",
    base64: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64",
    base64url: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A URL",
    json_string: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A JSON",
    e164: "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28 (E.164)",
    jwt: "\u0E42\u0E17\u0E40\u0E04\u0E19 JWT",
    template_literal: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02",
    array: "\u0E2D\u0E32\u0E23\u0E4C\u0E40\u0E23\u0E22\u0E4C (Array)",
    null: "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E48\u0E32 (null)"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 instanceof ${issue2.expected} \u0E41\u0E15\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${received}`;
        }
        return `\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${expected} \u0E41\u0E15\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u0E04\u0E48\u0E32\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${stringifyPrimitive(issue2.values[0])}`;
        return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E19\u0E36\u0E48\u0E07\u0E43\u0E19 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19" : "\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin ?? "\u0E04\u0E48\u0E32"} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"}`;
        return `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin ?? "\u0E04\u0E48\u0E32"} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22" : "\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E36\u0E49\u0E19\u0E15\u0E49\u0E19\u0E14\u0E49\u0E27\u0E22 "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E25\u0E07\u0E17\u0E49\u0E32\u0E22\u0E14\u0E49\u0E27\u0E22 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35 "${_issue.includes}" \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21`;
        if (_issue.format === "regex")
          return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14 ${_issue.pattern}`;
        return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E08\u0E33\u0E19\u0E27\u0E19\u0E17\u0E35\u0E48\u0E2B\u0E32\u0E23\u0E14\u0E49\u0E27\u0E22 ${issue2.divisor} \u0E44\u0E14\u0E49\u0E25\u0E07\u0E15\u0E31\u0E27`;
      case "unrecognized_keys":
        return `\u0E1E\u0E1A\u0E04\u0E35\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E23\u0E39\u0E49\u0E08\u0E31\u0E01: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u0E04\u0E35\u0E22\u0E4C\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${issue2.origin}`;
      case "invalid_union":
        return "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E44\u0E21\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E22\u0E39\u0E40\u0E19\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E44\u0E27\u0E49";
      case "invalid_element":
        return `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${issue2.origin}`;
      default:
        return `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07`;
    }
  };
};
function th_default() {
  return {
    localeError: error39()
  };
}

// node_modules/zod/v4/locales/tr.js
var error40 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "olmal\u0131" },
    file: { unit: "bayt", verb: "olmal\u0131" },
    array: { unit: "\xF6\u011Fe", verb: "olmal\u0131" },
    set: { unit: "\xF6\u011Fe", verb: "olmal\u0131" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "girdi",
    email: "e-posta adresi",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO tarih ve saat",
    date: "ISO tarih",
    time: "ISO saat",
    duration: "ISO s\xFCre",
    ipv4: "IPv4 adresi",
    ipv6: "IPv6 adresi",
    cidrv4: "IPv4 aral\u0131\u011F\u0131",
    cidrv6: "IPv6 aral\u0131\u011F\u0131",
    base64: "base64 ile \u015Fifrelenmi\u015F metin",
    base64url: "base64url ile \u015Fifrelenmi\u015F metin",
    json_string: "JSON dizesi",
    e164: "E.164 say\u0131s\u0131",
    jwt: "JWT",
    template_literal: "\u015Eablon dizesi"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ge\xE7ersiz de\u011Fer: beklenen instanceof ${issue2.expected}, al\u0131nan ${received}`;
        }
        return `Ge\xE7ersiz de\u011Fer: beklenen ${expected}, al\u0131nan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ge\xE7ersiz de\u011Fer: beklenen ${stringifyPrimitive(issue2.values[0])}`;
        return `Ge\xE7ersiz se\xE7enek: a\u015Fa\u011F\u0131dakilerden biri olmal\u0131: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\xC7ok b\xFCy\xFCk: beklenen ${issue2.origin ?? "de\u011Fer"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\xF6\u011Fe"}`;
        return `\xC7ok b\xFCy\xFCk: beklenen ${issue2.origin ?? "de\u011Fer"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\xC7ok k\xFC\xE7\xFCk: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        return `\xC7ok k\xFC\xE7\xFCk: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ge\xE7ersiz metin: "${_issue.prefix}" ile ba\u015Flamal\u0131`;
        if (_issue.format === "ends_with")
          return `Ge\xE7ersiz metin: "${_issue.suffix}" ile bitmeli`;
        if (_issue.format === "includes")
          return `Ge\xE7ersiz metin: "${_issue.includes}" i\xE7ermeli`;
        if (_issue.format === "regex")
          return `Ge\xE7ersiz metin: ${_issue.pattern} desenine uymal\u0131`;
        return `Ge\xE7ersiz ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ge\xE7ersiz say\u0131: ${issue2.divisor} ile tam b\xF6l\xFCnebilmeli`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan anahtar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} i\xE7inde ge\xE7ersiz anahtar`;
      case "invalid_union":
        return "Ge\xE7ersiz de\u011Fer";
      case "invalid_element":
        return `${issue2.origin} i\xE7inde ge\xE7ersiz de\u011Fer`;
      default:
        return `Ge\xE7ersiz de\u011Fer`;
    }
  };
};
function tr_default() {
  return {
    localeError: error40()
  };
}

// node_modules/zod/v4/locales/uk.js
var error41 = () => {
  const Sizable = {
    string: { unit: "\u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" },
    file: { unit: "\u0431\u0430\u0439\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" },
    array: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" },
    set: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456",
    email: "\u0430\u0434\u0440\u0435\u0441\u0430 \u0435\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0457 \u043F\u043E\u0448\u0442\u0438",
    url: "URL",
    emoji: "\u0435\u043C\u043E\u0434\u0437\u0456",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u0434\u0430\u0442\u0430 \u0442\u0430 \u0447\u0430\u0441 ISO",
    date: "\u0434\u0430\u0442\u0430 ISO",
    time: "\u0447\u0430\u0441 ISO",
    duration: "\u0442\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C ISO",
    ipv4: "\u0430\u0434\u0440\u0435\u0441\u0430 IPv4",
    ipv6: "\u0430\u0434\u0440\u0435\u0441\u0430 IPv6",
    cidrv4: "\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv4",
    cidrv6: "\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv6",
    base64: "\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64",
    base64url: "\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64url",
    json_string: "\u0440\u044F\u0434\u043E\u043A JSON",
    e164: "\u043D\u043E\u043C\u0435\u0440 E.164",
    jwt: "JWT",
    template_literal: "\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0447\u0438\u0441\u043B\u043E",
    array: "\u043C\u0430\u0441\u0438\u0432"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F instanceof ${issue2.expected}, \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E ${received}`;
        }
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${expected}, \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${stringifyPrimitive(issue2.values[0])}`;
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0430 \u043E\u043F\u0446\u0456\u044F: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F \u043E\u0434\u043D\u0435 \u0437 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432"}`;
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F"} \u0431\u0443\u0434\u0435 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin} \u0431\u0443\u0434\u0435 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043F\u043E\u0447\u0438\u043D\u0430\u0442\u0438\u0441\u044F \u0437 "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0437\u0430\u043A\u0456\u043D\u0447\u0443\u0432\u0430\u0442\u0438\u0441\u044F \u043D\u0430 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043C\u0456\u0441\u0442\u0438\u0442\u0438 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0442\u0438 \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}`;
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0447\u0438\u0441\u043B\u043E: \u043F\u043E\u0432\u0438\u043D\u043D\u043E \u0431\u0443\u0442\u0438 \u043A\u0440\u0430\u0442\u043D\u0438\u043C ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u043E\u0437\u043F\u0456\u0437\u043D\u0430\u043D\u0438\u0439 \u043A\u043B\u044E\u0447${issue2.keys.length > 1 ? "\u0456" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u043A\u043B\u044E\u0447 \u0443 ${issue2.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456";
      case "invalid_element":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u0443 ${issue2.origin}`;
      default:
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456`;
    }
  };
};
function uk_default() {
  return {
    localeError: error41()
  };
}

// node_modules/zod/v4/locales/ua.js
function ua_default() {
  return uk_default();
}

// node_modules/zod/v4/locales/ur.js
var error42 = () => {
  const Sizable = {
    string: { unit: "\u062D\u0631\u0648\u0641", verb: "\u06C1\u0648\u0646\u0627" },
    file: { unit: "\u0628\u0627\u0626\u0679\u0633", verb: "\u06C1\u0648\u0646\u0627" },
    array: { unit: "\u0622\u0626\u0679\u0645\u0632", verb: "\u06C1\u0648\u0646\u0627" },
    set: { unit: "\u0622\u0626\u0679\u0645\u0632", verb: "\u06C1\u0648\u0646\u0627" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0627\u0646 \u067E\u0679",
    email: "\u0627\u06CC \u0645\u06CC\u0644 \u0627\u06CC\u0688\u0631\u06CC\u0633",
    url: "\u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644",
    emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC",
    uuid: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
    uuidv4: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 4",
    uuidv6: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 6",
    nanoid: "\u0646\u06CC\u0646\u0648 \u0622\u0626\u06CC \u0688\u06CC",
    guid: "\u062C\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
    cuid: "\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
    cuid2: "\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC 2",
    ulid: "\u06CC\u0648 \u0627\u06CC\u0644 \u0622\u0626\u06CC \u0688\u06CC",
    xid: "\u0627\u06CC\u06A9\u0633 \u0622\u0626\u06CC \u0688\u06CC",
    ksuid: "\u06A9\u06D2 \u0627\u06CC\u0633 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
    datetime: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0688\u06CC\u0679 \u0679\u0627\u0626\u0645",
    date: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u062A\u0627\u0631\u06CC\u062E",
    time: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0648\u0642\u062A",
    duration: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0645\u062F\u062A",
    ipv4: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0627\u06CC\u0688\u0631\u06CC\u0633",
    ipv6: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0627\u06CC\u0688\u0631\u06CC\u0633",
    cidrv4: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0631\u06CC\u0646\u062C",
    cidrv6: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0631\u06CC\u0646\u062C",
    base64: "\u0628\u06CC\u0633 64 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF",
    base64url: "\u0628\u06CC\u0633 64 \u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF",
    json_string: "\u062C\u06D2 \u0627\u06CC\u0633 \u0627\u0648 \u0627\u06CC\u0646 \u0633\u0679\u0631\u0646\u06AF",
    e164: "\u0627\u06CC 164 \u0646\u0645\u0628\u0631",
    jwt: "\u062C\u06D2 \u0688\u0628\u0644\u06CC\u0648 \u0679\u06CC",
    template_literal: "\u0627\u0646 \u067E\u0679"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0646\u0645\u0628\u0631",
    array: "\u0622\u0631\u06D2",
    null: "\u0646\u0644"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: instanceof ${issue2.expected} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627\u060C ${received} \u0645\u0648\u0635\u0648\u0644 \u06C1\u0648\u0627`;
        }
        return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${expected} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627\u060C ${received} \u0645\u0648\u0635\u0648\u0644 \u06C1\u0648\u0627`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${stringifyPrimitive(issue2.values[0])} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
        return `\u063A\u0644\u0637 \u0622\u067E\u0634\u0646: ${joinValues(issue2.values, "|")} \u0645\u06CC\u06BA \u0633\u06D2 \u0627\u06CC\u06A9 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u0628\u06C1\u062A \u0628\u0691\u0627: ${issue2.origin ?? "\u0648\u06CC\u0644\u06CC\u0648"} \u06A9\u06D2 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0627\u0635\u0631"} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`;
        return `\u0628\u06C1\u062A \u0628\u0691\u0627: ${issue2.origin ?? "\u0648\u06CC\u0644\u06CC\u0648"} \u06A9\u0627 ${adj}${issue2.maximum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${issue2.origin} \u06A9\u06D2 ${adj}${issue2.minimum.toString()} ${sizing.unit} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`;
        }
        return `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${issue2.origin} \u06A9\u0627 ${adj}${issue2.minimum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${_issue.prefix}" \u0633\u06D2 \u0634\u0631\u0648\u0639 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
        }
        if (_issue.format === "ends_with")
          return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${_issue.suffix}" \u067E\u0631 \u062E\u062A\u0645 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
        if (_issue.format === "includes")
          return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${_issue.includes}" \u0634\u0627\u0645\u0644 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
        if (_issue.format === "regex")
          return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: \u067E\u06CC\u0679\u0631\u0646 ${_issue.pattern} \u0633\u06D2 \u0645\u06CC\u0686 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
        return `\u063A\u0644\u0637 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u063A\u0644\u0637 \u0646\u0645\u0628\u0631: ${issue2.divisor} \u06A9\u0627 \u0645\u0636\u0627\u0639\u0641 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
      case "unrecognized_keys":
        return `\u063A\u06CC\u0631 \u062A\u0633\u0644\u06CC\u0645 \u0634\u062F\u06C1 \u06A9\u06CC${issue2.keys.length > 1 ? "\u0632" : ""}: ${joinValues(issue2.keys, "\u060C ")}`;
      case "invalid_key":
        return `${issue2.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u06A9\u06CC`;
      case "invalid_union":
        return "\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679";
      case "invalid_element":
        return `${issue2.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u0648\u06CC\u0644\u06CC\u0648`;
      default:
        return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679`;
    }
  };
};
function ur_default() {
  return {
    localeError: error42()
  };
}

// node_modules/zod/v4/locales/uz.js
var error43 = () => {
  const Sizable = {
    string: { unit: "belgi", verb: "bo\u2018lishi kerak" },
    file: { unit: "bayt", verb: "bo\u2018lishi kerak" },
    array: { unit: "element", verb: "bo\u2018lishi kerak" },
    set: { unit: "element", verb: "bo\u2018lishi kerak" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "kirish",
    email: "elektron pochta manzili",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO sana va vaqti",
    date: "ISO sana",
    time: "ISO vaqt",
    duration: "ISO davomiylik",
    ipv4: "IPv4 manzil",
    ipv6: "IPv6 manzil",
    mac: "MAC manzil",
    cidrv4: "IPv4 diapazon",
    cidrv6: "IPv6 diapazon",
    base64: "base64 kodlangan satr",
    base64url: "base64url kodlangan satr",
    json_string: "JSON satr",
    e164: "E.164 raqam",
    jwt: "JWT",
    template_literal: "kirish"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "raqam",
    array: "massiv"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Noto\u2018g\u2018ri kirish: kutilgan instanceof ${issue2.expected}, qabul qilingan ${received}`;
        }
        return `Noto\u2018g\u2018ri kirish: kutilgan ${expected}, qabul qilingan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Noto\u2018g\u2018ri kirish: kutilgan ${stringifyPrimitive(issue2.values[0])}`;
        return `Noto\u2018g\u2018ri variant: quyidagilardan biri kutilgan ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Juda katta: kutilgan ${issue2.origin ?? "qiymat"} ${adj}${issue2.maximum.toString()} ${sizing.unit} ${sizing.verb}`;
        return `Juda katta: kutilgan ${issue2.origin ?? "qiymat"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Juda kichik: kutilgan ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        }
        return `Juda kichik: kutilgan ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Noto\u2018g\u2018ri satr: "${_issue.prefix}" bilan boshlanishi kerak`;
        if (_issue.format === "ends_with")
          return `Noto\u2018g\u2018ri satr: "${_issue.suffix}" bilan tugashi kerak`;
        if (_issue.format === "includes")
          return `Noto\u2018g\u2018ri satr: "${_issue.includes}" ni o\u2018z ichiga olishi kerak`;
        if (_issue.format === "regex")
          return `Noto\u2018g\u2018ri satr: ${_issue.pattern} shabloniga mos kelishi kerak`;
        return `Noto\u2018g\u2018ri ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Noto\u2018g\u2018ri raqam: ${issue2.divisor} ning karralisi bo\u2018lishi kerak`;
      case "unrecognized_keys":
        return `Noma\u2019lum kalit${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} dagi kalit noto\u2018g\u2018ri`;
      case "invalid_union":
        return "Noto\u2018g\u2018ri kirish";
      case "invalid_element":
        return `${issue2.origin} da noto\u2018g\u2018ri qiymat`;
      default:
        return `Noto\u2018g\u2018ri kirish`;
    }
  };
};
function uz_default() {
  return {
    localeError: error43()
  };
}

// node_modules/zod/v4/locales/vi.js
var error44 = () => {
  const Sizable = {
    string: { unit: "k\xFD t\u1EF1", verb: "c\xF3" },
    file: { unit: "byte", verb: "c\xF3" },
    array: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" },
    set: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0111\u1EA7u v\xE0o",
    email: "\u0111\u1ECBa ch\u1EC9 email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ng\xE0y gi\u1EDD ISO",
    date: "ng\xE0y ISO",
    time: "gi\u1EDD ISO",
    duration: "kho\u1EA3ng th\u1EDDi gian ISO",
    ipv4: "\u0111\u1ECBa ch\u1EC9 IPv4",
    ipv6: "\u0111\u1ECBa ch\u1EC9 IPv6",
    cidrv4: "d\u1EA3i IPv4",
    cidrv6: "d\u1EA3i IPv6",
    base64: "chu\u1ED7i m\xE3 h\xF3a base64",
    base64url: "chu\u1ED7i m\xE3 h\xF3a base64url",
    json_string: "chu\u1ED7i JSON",
    e164: "s\u1ED1 E.164",
    jwt: "JWT",
    template_literal: "\u0111\u1EA7u v\xE0o"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "s\u1ED1",
    array: "m\u1EA3ng"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i instanceof ${issue2.expected}, nh\u1EADn \u0111\u01B0\u1EE3c ${received}`;
        }
        return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${expected}, nh\u1EADn \u0111\u01B0\u1EE3c ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${stringifyPrimitive(issue2.values[0])}`;
        return `T\xF9y ch\u1ECDn kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i m\u1ED9t trong c\xE1c gi\xE1 tr\u1ECB ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${issue2.origin ?? "gi\xE1 tr\u1ECB"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "ph\u1EA7n t\u1EED"}`;
        return `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${issue2.origin ?? "gi\xE1 tr\u1ECB"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i b\u1EAFt \u0111\u1EA7u b\u1EB1ng "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i k\u1EBFt th\xFAc b\u1EB1ng "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i bao g\u1ED3m "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i kh\u1EDBp v\u1EDBi m\u1EABu ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} kh\xF4ng h\u1EE3p l\u1EC7`;
      }
      case "not_multiple_of":
        return `S\u1ED1 kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i l\xE0 b\u1ED9i s\u1ED1 c\u1EE7a ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Kh\xF3a kh\xF4ng \u0111\u01B0\u1EE3c nh\u1EADn d\u1EA1ng: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Kh\xF3a kh\xF4ng h\u1EE3p l\u1EC7 trong ${issue2.origin}`;
      case "invalid_union":
        return "\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7";
      case "invalid_element":
        return `Gi\xE1 tr\u1ECB kh\xF4ng h\u1EE3p l\u1EC7 trong ${issue2.origin}`;
      default:
        return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7`;
    }
  };
};
function vi_default() {
  return {
    localeError: error44()
  };
}

// node_modules/zod/v4/locales/zh-CN.js
var error45 = () => {
  const Sizable = {
    string: { unit: "\u5B57\u7B26", verb: "\u5305\u542B" },
    file: { unit: "\u5B57\u8282", verb: "\u5305\u542B" },
    array: { unit: "\u9879", verb: "\u5305\u542B" },
    set: { unit: "\u9879", verb: "\u5305\u542B" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u8F93\u5165",
    email: "\u7535\u5B50\u90AE\u4EF6",
    url: "URL",
    emoji: "\u8868\u60C5\u7B26\u53F7",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO\u65E5\u671F\u65F6\u95F4",
    date: "ISO\u65E5\u671F",
    time: "ISO\u65F6\u95F4",
    duration: "ISO\u65F6\u957F",
    ipv4: "IPv4\u5730\u5740",
    ipv6: "IPv6\u5730\u5740",
    cidrv4: "IPv4\u7F51\u6BB5",
    cidrv6: "IPv6\u7F51\u6BB5",
    base64: "base64\u7F16\u7801\u5B57\u7B26\u4E32",
    base64url: "base64url\u7F16\u7801\u5B57\u7B26\u4E32",
    json_string: "JSON\u5B57\u7B26\u4E32",
    e164: "E.164\u53F7\u7801",
    jwt: "JWT",
    template_literal: "\u8F93\u5165"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u6570\u5B57",
    array: "\u6570\u7EC4",
    null: "\u7A7A\u503C(null)"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B instanceof ${issue2.expected}\uFF0C\u5B9E\u9645\u63A5\u6536 ${received}`;
        }
        return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${expected}\uFF0C\u5B9E\u9645\u63A5\u6536 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${stringifyPrimitive(issue2.values[0])}`;
        return `\u65E0\u6548\u9009\u9879\uFF1A\u671F\u671B\u4EE5\u4E0B\u4E4B\u4E00 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${issue2.origin ?? "\u503C"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u4E2A\u5143\u7D20"}`;
        return `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${issue2.origin ?? "\u503C"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${_issue.prefix}" \u5F00\u5934`;
        if (_issue.format === "ends_with")
          return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${_issue.suffix}" \u7ED3\u5C3E`;
        if (_issue.format === "includes")
          return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u5305\u542B "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u6EE1\u8DB3\u6B63\u5219\u8868\u8FBE\u5F0F ${_issue.pattern}`;
        return `\u65E0\u6548${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u65E0\u6548\u6570\u5B57\uFF1A\u5FC5\u987B\u662F ${issue2.divisor} \u7684\u500D\u6570`;
      case "unrecognized_keys":
        return `\u51FA\u73B0\u672A\u77E5\u7684\u952E(key): ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} \u4E2D\u7684\u952E(key)\u65E0\u6548`;
      case "invalid_union":
        return "\u65E0\u6548\u8F93\u5165";
      case "invalid_element":
        return `${issue2.origin} \u4E2D\u5305\u542B\u65E0\u6548\u503C(value)`;
      default:
        return `\u65E0\u6548\u8F93\u5165`;
    }
  };
};
function zh_CN_default() {
  return {
    localeError: error45()
  };
}

// node_modules/zod/v4/locales/zh-TW.js
var error46 = () => {
  const Sizable = {
    string: { unit: "\u5B57\u5143", verb: "\u64C1\u6709" },
    file: { unit: "\u4F4D\u5143\u7D44", verb: "\u64C1\u6709" },
    array: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" },
    set: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u8F38\u5165",
    email: "\u90F5\u4EF6\u5730\u5740",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u65E5\u671F\u6642\u9593",
    date: "ISO \u65E5\u671F",
    time: "ISO \u6642\u9593",
    duration: "ISO \u671F\u9593",
    ipv4: "IPv4 \u4F4D\u5740",
    ipv6: "IPv6 \u4F4D\u5740",
    cidrv4: "IPv4 \u7BC4\u570D",
    cidrv6: "IPv6 \u7BC4\u570D",
    base64: "base64 \u7DE8\u78BC\u5B57\u4E32",
    base64url: "base64url \u7DE8\u78BC\u5B57\u4E32",
    json_string: "JSON \u5B57\u4E32",
    e164: "E.164 \u6578\u503C",
    jwt: "JWT",
    template_literal: "\u8F38\u5165"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA instanceof ${issue2.expected}\uFF0C\u4F46\u6536\u5230 ${received}`;
        }
        return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${expected}\uFF0C\u4F46\u6536\u5230 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${stringifyPrimitive(issue2.values[0])}`;
        return `\u7121\u6548\u7684\u9078\u9805\uFF1A\u9810\u671F\u70BA\u4EE5\u4E0B\u5176\u4E2D\u4E4B\u4E00 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${issue2.origin ?? "\u503C"} \u61C9\u70BA ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u500B\u5143\u7D20"}`;
        return `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${issue2.origin ?? "\u503C"} \u61C9\u70BA ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${issue2.origin} \u61C9\u70BA ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${issue2.origin} \u61C9\u70BA ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${_issue.prefix}" \u958B\u982D`;
        }
        if (_issue.format === "ends_with")
          return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${_issue.suffix}" \u7D50\u5C3E`;
        if (_issue.format === "includes")
          return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u5305\u542B "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u7B26\u5408\u683C\u5F0F ${_issue.pattern}`;
        return `\u7121\u6548\u7684 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u7121\u6548\u7684\u6578\u5B57\uFF1A\u5FC5\u9808\u70BA ${issue2.divisor} \u7684\u500D\u6578`;
      case "unrecognized_keys":
        return `\u7121\u6CD5\u8B58\u5225\u7684\u9375\u503C${issue2.keys.length > 1 ? "\u5011" : ""}\uFF1A${joinValues(issue2.keys, "\u3001")}`;
      case "invalid_key":
        return `${issue2.origin} \u4E2D\u6709\u7121\u6548\u7684\u9375\u503C`;
      case "invalid_union":
        return "\u7121\u6548\u7684\u8F38\u5165\u503C";
      case "invalid_element":
        return `${issue2.origin} \u4E2D\u6709\u7121\u6548\u7684\u503C`;
      default:
        return `\u7121\u6548\u7684\u8F38\u5165\u503C`;
    }
  };
};
function zh_TW_default() {
  return {
    localeError: error46()
  };
}

// node_modules/zod/v4/locales/yo.js
var error47 = () => {
  const Sizable = {
    string: { unit: "\xE0mi", verb: "n\xED" },
    file: { unit: "bytes", verb: "n\xED" },
    array: { unit: "nkan", verb: "n\xED" },
    set: { unit: "nkan", verb: "n\xED" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u1EB9\u0300r\u1ECD \xECb\xE1w\u1ECDl\xE9",
    email: "\xE0d\xEDr\u1EB9\u0301s\xEC \xECm\u1EB9\u0301l\xEC",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\xE0k\xF3k\xF2 ISO",
    date: "\u1ECDj\u1ECD\u0301 ISO",
    time: "\xE0k\xF3k\xF2 ISO",
    duration: "\xE0k\xF3k\xF2 t\xF3 p\xE9 ISO",
    ipv4: "\xE0d\xEDr\u1EB9\u0301s\xEC IPv4",
    ipv6: "\xE0d\xEDr\u1EB9\u0301s\xEC IPv6",
    cidrv4: "\xE0gb\xE8gb\xE8 IPv4",
    cidrv6: "\xE0gb\xE8gb\xE8 IPv6",
    base64: "\u1ECD\u0300r\u1ECD\u0300 t\xED a k\u1ECD\u0301 n\xED base64",
    base64url: "\u1ECD\u0300r\u1ECD\u0300 base64url",
    json_string: "\u1ECD\u0300r\u1ECD\u0300 JSON",
    e164: "n\u1ECD\u0301mb\xE0 E.164",
    jwt: "JWT",
    template_literal: "\u1EB9\u0300r\u1ECD \xECb\xE1w\u1ECDl\xE9"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "n\u1ECD\u0301mb\xE0",
    array: "akop\u1ECD"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi instanceof ${issue2.expected}, \xE0m\u1ECD\u0300 a r\xED ${received}`;
        }
        return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi ${expected}, \xE0m\u1ECD\u0300 a r\xED ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi ${stringifyPrimitive(issue2.values[0])}`;
        return `\xC0\u1E63\xE0y\xE0n a\u1E63\xEC\u1E63e: yan \u1ECD\u0300kan l\xE1ra ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `T\xF3 p\u1ECD\u0300 j\xF9: a n\xED l\xE1ti j\u1EB9\u0301 p\xE9 ${issue2.origin ?? "iye"} ${sizing.verb} ${adj}${issue2.maximum} ${sizing.unit}`;
        return `T\xF3 p\u1ECD\u0300 j\xF9: a n\xED l\xE1ti j\u1EB9\u0301 ${adj}${issue2.maximum}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `K\xE9r\xE9 ju: a n\xED l\xE1ti j\u1EB9\u0301 p\xE9 ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum} ${sizing.unit}`;
        return `K\xE9r\xE9 ju: a n\xED l\xE1ti j\u1EB9\u0301 ${adj}${issue2.minimum}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 b\u1EB9\u0300r\u1EB9\u0300 p\u1EB9\u0300l\xFA "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 par\xED p\u1EB9\u0300l\xFA "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 n\xED "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 b\xE1 \xE0p\u1EB9\u1EB9r\u1EB9 mu ${_issue.pattern}`;
        return `A\u1E63\xEC\u1E63e: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `N\u1ECD\u0301mb\xE0 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 j\u1EB9\u0301 \xE8y\xE0 p\xEDp\xEDn ti ${issue2.divisor}`;
      case "unrecognized_keys":
        return `B\u1ECDt\xECn\xEC \xE0\xECm\u1ECD\u0300: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `B\u1ECDt\xECn\xEC a\u1E63\xEC\u1E63e n\xEDn\xFA ${issue2.origin}`;
      case "invalid_union":
        return "\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e";
      case "invalid_element":
        return `Iye a\u1E63\xEC\u1E63e n\xEDn\xFA ${issue2.origin}`;
      default:
        return "\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e";
    }
  };
};
function yo_default() {
  return {
    localeError: error47()
  };
}

// node_modules/zod/v4/core/registries.js
var _a;
var $output = /* @__PURE__ */ Symbol("ZodOutput");
var $input = /* @__PURE__ */ Symbol("ZodInput");
var $ZodRegistry = class {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap();
    this._idmap = /* @__PURE__ */ new Map();
  }
  add(schema, ..._meta) {
    const meta3 = _meta[0];
    this._map.set(schema, meta3);
    if (meta3 && typeof meta3 === "object" && "id" in meta3) {
      this._idmap.set(meta3.id, schema);
    }
    return this;
  }
  clear() {
    this._map = /* @__PURE__ */ new WeakMap();
    this._idmap = /* @__PURE__ */ new Map();
    return this;
  }
  remove(schema) {
    const meta3 = this._map.get(schema);
    if (meta3 && typeof meta3 === "object" && "id" in meta3) {
      this._idmap.delete(meta3.id);
    }
    this._map.delete(schema);
    return this;
  }
  get(schema) {
    const p = schema._zod.parent;
    if (p) {
      const pm = { ...this.get(p) ?? {} };
      delete pm.id;
      const f = { ...pm, ...this._map.get(schema) };
      return Object.keys(f).length ? f : void 0;
    }
    return this._map.get(schema);
  }
  has(schema) {
    return this._map.has(schema);
  }
};
function registry() {
  return new $ZodRegistry();
}
(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
var globalRegistry = globalThis.__zod_globalRegistry;

// node_modules/zod/v4/core/api.js
// @__NO_SIDE_EFFECTS__
function _string(Class2, params) {
  return new Class2({
    type: "string",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedString(Class2, params) {
  return new Class2({
    type: "string",
    coerce: true,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _email(Class2, params) {
  return new Class2({
    type: "string",
    format: "email",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _guid(Class2, params) {
  return new Class2({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuidv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v4",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuidv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v6",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuidv7(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v7",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _url(Class2, params) {
  return new Class2({
    type: "string",
    format: "url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _emoji2(Class2, params) {
  return new Class2({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _nanoid(Class2, params) {
  return new Class2({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _cuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _cuid2(Class2, params) {
  return new Class2({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _ulid(Class2, params) {
  return new Class2({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _xid(Class2, params) {
  return new Class2({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _ksuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _ipv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _ipv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _mac(Class2, params) {
  return new Class2({
    type: "string",
    format: "mac",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _cidrv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _cidrv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _base64(Class2, params) {
  return new Class2({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _base64url(Class2, params) {
  return new Class2({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _e164(Class2, params) {
  return new Class2({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _jwt(Class2, params) {
  return new Class2({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
var TimePrecision = {
  Any: null,
  Minute: -1,
  Second: 0,
  Millisecond: 3,
  Microsecond: 6
};
// @__NO_SIDE_EFFECTS__
function _isoDateTime(Class2, params) {
  return new Class2({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: false,
    local: false,
    precision: null,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _isoDate(Class2, params) {
  return new Class2({
    type: "string",
    format: "date",
    check: "string_format",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _isoTime(Class2, params) {
  return new Class2({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _isoDuration(Class2, params) {
  return new Class2({
    type: "string",
    format: "duration",
    check: "string_format",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _number(Class2, params) {
  return new Class2({
    type: "number",
    checks: [],
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedNumber(Class2, params) {
  return new Class2({
    type: "number",
    coerce: true,
    checks: [],
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _int(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "safeint",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _float32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "float32",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _float64(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "float64",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _int32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "int32",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uint32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "uint32",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _boolean(Class2, params) {
  return new Class2({
    type: "boolean",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedBoolean(Class2, params) {
  return new Class2({
    type: "boolean",
    coerce: true,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _bigint(Class2, params) {
  return new Class2({
    type: "bigint",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedBigint(Class2, params) {
  return new Class2({
    type: "bigint",
    coerce: true,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _int64(Class2, params) {
  return new Class2({
    type: "bigint",
    check: "bigint_format",
    abort: false,
    format: "int64",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uint64(Class2, params) {
  return new Class2({
    type: "bigint",
    check: "bigint_format",
    abort: false,
    format: "uint64",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _symbol(Class2, params) {
  return new Class2({
    type: "symbol",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _undefined2(Class2, params) {
  return new Class2({
    type: "undefined",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _null2(Class2, params) {
  return new Class2({
    type: "null",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _any(Class2) {
  return new Class2({
    type: "any"
  });
}
// @__NO_SIDE_EFFECTS__
function _unknown(Class2) {
  return new Class2({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function _never(Class2, params) {
  return new Class2({
    type: "never",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _void(Class2, params) {
  return new Class2({
    type: "void",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _date(Class2, params) {
  return new Class2({
    type: "date",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedDate(Class2, params) {
  return new Class2({
    type: "date",
    coerce: true,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _nan(Class2, params) {
  return new Class2({
    type: "nan",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _lt(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
// @__NO_SIDE_EFFECTS__
function _lte(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
// @__NO_SIDE_EFFECTS__
function _gt(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
// @__NO_SIDE_EFFECTS__
function _gte(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
// @__NO_SIDE_EFFECTS__
function _positive(params) {
  return /* @__PURE__ */ _gt(0, params);
}
// @__NO_SIDE_EFFECTS__
function _negative(params) {
  return /* @__PURE__ */ _lt(0, params);
}
// @__NO_SIDE_EFFECTS__
function _nonpositive(params) {
  return /* @__PURE__ */ _lte(0, params);
}
// @__NO_SIDE_EFFECTS__
function _nonnegative(params) {
  return /* @__PURE__ */ _gte(0, params);
}
// @__NO_SIDE_EFFECTS__
function _multipleOf(value, params) {
  return new $ZodCheckMultipleOf({
    check: "multiple_of",
    ...normalizeParams(params),
    value
  });
}
// @__NO_SIDE_EFFECTS__
function _maxSize(maximum, params) {
  return new $ZodCheckMaxSize({
    check: "max_size",
    ...normalizeParams(params),
    maximum
  });
}
// @__NO_SIDE_EFFECTS__
function _minSize(minimum, params) {
  return new $ZodCheckMinSize({
    check: "min_size",
    ...normalizeParams(params),
    minimum
  });
}
// @__NO_SIDE_EFFECTS__
function _size(size, params) {
  return new $ZodCheckSizeEquals({
    check: "size_equals",
    ...normalizeParams(params),
    size
  });
}
// @__NO_SIDE_EFFECTS__
function _maxLength(maximum, params) {
  const ch = new $ZodCheckMaxLength({
    check: "max_length",
    ...normalizeParams(params),
    maximum
  });
  return ch;
}
// @__NO_SIDE_EFFECTS__
function _minLength(minimum, params) {
  return new $ZodCheckMinLength({
    check: "min_length",
    ...normalizeParams(params),
    minimum
  });
}
// @__NO_SIDE_EFFECTS__
function _length(length, params) {
  return new $ZodCheckLengthEquals({
    check: "length_equals",
    ...normalizeParams(params),
    length
  });
}
// @__NO_SIDE_EFFECTS__
function _regex(pattern, params) {
  return new $ZodCheckRegex({
    check: "string_format",
    format: "regex",
    ...normalizeParams(params),
    pattern
  });
}
// @__NO_SIDE_EFFECTS__
function _lowercase(params) {
  return new $ZodCheckLowerCase({
    check: "string_format",
    format: "lowercase",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uppercase(params) {
  return new $ZodCheckUpperCase({
    check: "string_format",
    format: "uppercase",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _includes(includes, params) {
  return new $ZodCheckIncludes({
    check: "string_format",
    format: "includes",
    ...normalizeParams(params),
    includes
  });
}
// @__NO_SIDE_EFFECTS__
function _startsWith(prefix, params) {
  return new $ZodCheckStartsWith({
    check: "string_format",
    format: "starts_with",
    ...normalizeParams(params),
    prefix
  });
}
// @__NO_SIDE_EFFECTS__
function _endsWith(suffix, params) {
  return new $ZodCheckEndsWith({
    check: "string_format",
    format: "ends_with",
    ...normalizeParams(params),
    suffix
  });
}
// @__NO_SIDE_EFFECTS__
function _property(property, schema, params) {
  return new $ZodCheckProperty({
    check: "property",
    property,
    schema,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _mime(types, params) {
  return new $ZodCheckMimeType({
    check: "mime_type",
    mime: types,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _overwrite(tx) {
  return new $ZodCheckOverwrite({
    check: "overwrite",
    tx
  });
}
// @__NO_SIDE_EFFECTS__
function _normalize(form) {
  return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
}
// @__NO_SIDE_EFFECTS__
function _trim() {
  return /* @__PURE__ */ _overwrite((input) => input.trim());
}
// @__NO_SIDE_EFFECTS__
function _toLowerCase() {
  return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function _toUpperCase() {
  return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function _slugify() {
  return /* @__PURE__ */ _overwrite((input) => slugify(input));
}
// @__NO_SIDE_EFFECTS__
function _array(Class2, element, params) {
  return new Class2({
    type: "array",
    element,
    // get element() {
    //   return element;
    // },
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _union(Class2, options, params) {
  return new Class2({
    type: "union",
    options,
    ...normalizeParams(params)
  });
}
function _xor(Class2, options, params) {
  return new Class2({
    type: "union",
    options,
    inclusive: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _discriminatedUnion(Class2, discriminator, options, params) {
  return new Class2({
    type: "union",
    options,
    discriminator,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _intersection(Class2, left, right) {
  return new Class2({
    type: "intersection",
    left,
    right
  });
}
// @__NO_SIDE_EFFECTS__
function _tuple(Class2, items, _paramsOrRest, _params) {
  const hasRest = _paramsOrRest instanceof $ZodType;
  const params = hasRest ? _params : _paramsOrRest;
  const rest = hasRest ? _paramsOrRest : null;
  return new Class2({
    type: "tuple",
    items,
    rest,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _record(Class2, keyType, valueType, params) {
  return new Class2({
    type: "record",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _map(Class2, keyType, valueType, params) {
  return new Class2({
    type: "map",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _set(Class2, valueType, params) {
  return new Class2({
    type: "set",
    valueType,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _enum(Class2, values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new Class2({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _nativeEnum(Class2, entries, params) {
  return new Class2({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _literal(Class2, value, params) {
  return new Class2({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _file(Class2, params) {
  return new Class2({
    type: "file",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _transform(Class2, fn) {
  return new Class2({
    type: "transform",
    transform: fn
  });
}
// @__NO_SIDE_EFFECTS__
function _optional(Class2, innerType) {
  return new Class2({
    type: "optional",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _nullable(Class2, innerType) {
  return new Class2({
    type: "nullable",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _default(Class2, innerType, defaultValue) {
  return new Class2({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    }
  });
}
// @__NO_SIDE_EFFECTS__
function _nonoptional(Class2, innerType, params) {
  return new Class2({
    type: "nonoptional",
    innerType,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _success(Class2, innerType) {
  return new Class2({
    type: "success",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _catch(Class2, innerType, catchValue) {
  return new Class2({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
  });
}
// @__NO_SIDE_EFFECTS__
function _pipe(Class2, in_, out) {
  return new Class2({
    type: "pipe",
    in: in_,
    out
  });
}
// @__NO_SIDE_EFFECTS__
function _readonly(Class2, innerType) {
  return new Class2({
    type: "readonly",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _templateLiteral(Class2, parts, params) {
  return new Class2({
    type: "template_literal",
    parts,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _lazy(Class2, getter) {
  return new Class2({
    type: "lazy",
    getter
  });
}
// @__NO_SIDE_EFFECTS__
function _promise(Class2, innerType) {
  return new Class2({
    type: "promise",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _custom(Class2, fn, _params) {
  const norm = normalizeParams(_params);
  norm.abort ?? (norm.abort = true);
  const schema = new Class2({
    type: "custom",
    check: "custom",
    fn,
    ...norm
  });
  return schema;
}
// @__NO_SIDE_EFFECTS__
function _refine(Class2, fn, _params) {
  const schema = new Class2({
    type: "custom",
    check: "custom",
    fn,
    ...normalizeParams(_params)
  });
  return schema;
}
// @__NO_SIDE_EFFECTS__
function _superRefine(fn) {
  const ch = /* @__PURE__ */ _check((payload) => {
    payload.addIssue = (issue2) => {
      if (typeof issue2 === "string") {
        payload.issues.push(issue(issue2, payload.value, ch._zod.def));
      } else {
        const _issue = issue2;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        _issue.input ?? (_issue.input = payload.value);
        _issue.inst ?? (_issue.inst = ch);
        _issue.continue ?? (_issue.continue = !ch._zod.def.abort);
        payload.issues.push(issue(_issue));
      }
    };
    return fn(payload.value, payload);
  });
  return ch;
}
// @__NO_SIDE_EFFECTS__
function _check(fn, params) {
  const ch = new $ZodCheck({
    check: "custom",
    ...normalizeParams(params)
  });
  ch._zod.check = fn;
  return ch;
}
// @__NO_SIDE_EFFECTS__
function describe(description) {
  const ch = new $ZodCheck({ check: "describe" });
  ch._zod.onattach = [
    (inst) => {
      const existing = globalRegistry.get(inst) ?? {};
      globalRegistry.add(inst, { ...existing, description });
    }
  ];
  ch._zod.check = () => {
  };
  return ch;
}
// @__NO_SIDE_EFFECTS__
function meta(metadata) {
  const ch = new $ZodCheck({ check: "meta" });
  ch._zod.onattach = [
    (inst) => {
      const existing = globalRegistry.get(inst) ?? {};
      globalRegistry.add(inst, { ...existing, ...metadata });
    }
  ];
  ch._zod.check = () => {
  };
  return ch;
}
// @__NO_SIDE_EFFECTS__
function _stringbool(Classes, _params) {
  const params = normalizeParams(_params);
  let truthyArray = params.truthy ?? ["true", "1", "yes", "on", "y", "enabled"];
  let falsyArray = params.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
  if (params.case !== "sensitive") {
    truthyArray = truthyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
    falsyArray = falsyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
  }
  const truthySet = new Set(truthyArray);
  const falsySet = new Set(falsyArray);
  const _Codec = Classes.Codec ?? $ZodCodec;
  const _Boolean = Classes.Boolean ?? $ZodBoolean;
  const _String = Classes.String ?? $ZodString;
  const stringSchema = new _String({ type: "string", error: params.error });
  const booleanSchema = new _Boolean({ type: "boolean", error: params.error });
  const codec2 = new _Codec({
    type: "pipe",
    in: stringSchema,
    out: booleanSchema,
    transform: ((input, payload) => {
      let data = input;
      if (params.case !== "sensitive")
        data = data.toLowerCase();
      if (truthySet.has(data)) {
        return true;
      } else if (falsySet.has(data)) {
        return false;
      } else {
        payload.issues.push({
          code: "invalid_value",
          expected: "stringbool",
          values: [...truthySet, ...falsySet],
          input: payload.value,
          inst: codec2,
          continue: false
        });
        return {};
      }
    }),
    reverseTransform: ((input, _payload) => {
      if (input === true) {
        return truthyArray[0] || "true";
      } else {
        return falsyArray[0] || "false";
      }
    }),
    error: params.error
  });
  return codec2;
}
// @__NO_SIDE_EFFECTS__
function _stringFormat(Class2, format, fnOrRegex, _params = {}) {
  const params = normalizeParams(_params);
  const def = {
    ...normalizeParams(_params),
    check: "string_format",
    type: "string",
    format,
    fn: typeof fnOrRegex === "function" ? fnOrRegex : (val) => fnOrRegex.test(val),
    ...params
  };
  if (fnOrRegex instanceof RegExp) {
    def.pattern = fnOrRegex;
  }
  const inst = new Class2(def);
  return inst;
}

// node_modules/zod/v4/core/to-json-schema.js
function initializeContext(params) {
  let target = params?.target ?? "draft-2020-12";
  if (target === "draft-4")
    target = "draft-04";
  if (target === "draft-7")
    target = "draft-07";
  return {
    processors: params.processors ?? {},
    metadataRegistry: params?.metadata ?? globalRegistry,
    target,
    unrepresentable: params?.unrepresentable ?? "throw",
    override: params?.override ?? (() => {
    }),
    io: params?.io ?? "output",
    counter: 0,
    seen: /* @__PURE__ */ new Map(),
    cycles: params?.cycles ?? "ref",
    reused: params?.reused ?? "inline",
    external: params?.external ?? void 0
  };
}
function process3(schema, ctx, _params = { path: [], schemaPath: [] }) {
  var _a2;
  const def = schema._zod.def;
  const seen = ctx.seen.get(schema);
  if (seen) {
    seen.count++;
    const isCycle = _params.schemaPath.includes(schema);
    if (isCycle) {
      seen.cycle = _params.path;
    }
    return seen.schema;
  }
  const result = { schema: {}, count: 1, cycle: void 0, path: _params.path };
  ctx.seen.set(schema, result);
  const overrideSchema = schema._zod.toJSONSchema?.();
  if (overrideSchema) {
    result.schema = overrideSchema;
  } else {
    const params = {
      ..._params,
      schemaPath: [..._params.schemaPath, schema],
      path: _params.path
    };
    if (schema._zod.processJSONSchema) {
      schema._zod.processJSONSchema(ctx, result.schema, params);
    } else {
      const _json = result.schema;
      const processor = ctx.processors[def.type];
      if (!processor) {
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
      }
      processor(schema, ctx, _json, params);
    }
    const parent = schema._zod.parent;
    if (parent) {
      if (!result.ref)
        result.ref = parent;
      process3(parent, ctx, params);
      ctx.seen.get(parent).isParent = true;
    }
  }
  const meta3 = ctx.metadataRegistry.get(schema);
  if (meta3)
    Object.assign(result.schema, meta3);
  if (ctx.io === "input" && isTransforming(schema)) {
    delete result.schema.examples;
    delete result.schema.default;
  }
  if (ctx.io === "input" && result.schema._prefault)
    (_a2 = result.schema).default ?? (_a2.default = result.schema._prefault);
  delete result.schema._prefault;
  const _result = ctx.seen.get(schema);
  return _result.schema;
}
function extractDefs(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const idToSchema = /* @__PURE__ */ new Map();
  for (const entry of ctx.seen.entries()) {
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      const existing = idToSchema.get(id);
      if (existing && existing !== entry[0]) {
        throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      }
      idToSchema.set(id, entry[0]);
    }
  }
  const makeURI = (entry) => {
    const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
    if (ctx.external) {
      const externalId = ctx.external.registry.get(entry[0])?.id;
      const uriGenerator = ctx.external.uri ?? ((id2) => id2);
      if (externalId) {
        return { ref: uriGenerator(externalId) };
      }
      const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
      entry[1].defId = id;
      return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}` };
    }
    if (entry[1] === root) {
      return { ref: "#" };
    }
    const uriPrefix = `#`;
    const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
    const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
    return { defId, ref: defUriPrefix + defId };
  };
  const extractToDef = (entry) => {
    if (entry[1].schema.$ref) {
      return;
    }
    const seen = entry[1];
    const { ref, defId } = makeURI(entry);
    seen.def = { ...seen.schema };
    if (defId)
      seen.defId = defId;
    const schema2 = seen.schema;
    for (const key in schema2) {
      delete schema2[key];
    }
    schema2.$ref = ref;
  };
  if (ctx.cycles === "throw") {
    for (const entry of ctx.seen.entries()) {
      const seen = entry[1];
      if (seen.cycle) {
        throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
      }
    }
  }
  for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (schema === entry[0]) {
      extractToDef(entry);
      continue;
    }
    if (ctx.external) {
      const ext = ctx.external.registry.get(entry[0])?.id;
      if (schema !== entry[0] && ext) {
        extractToDef(entry);
        continue;
      }
    }
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      extractToDef(entry);
      continue;
    }
    if (seen.cycle) {
      extractToDef(entry);
      continue;
    }
    if (seen.count > 1) {
      if (ctx.reused === "ref") {
        extractToDef(entry);
        continue;
      }
    }
  }
}
function finalize(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const flattenRef = (zodSchema) => {
    const seen = ctx.seen.get(zodSchema);
    if (seen.ref === null)
      return;
    const schema2 = seen.def ?? seen.schema;
    const _cached = { ...schema2 };
    const ref = seen.ref;
    seen.ref = null;
    if (ref) {
      flattenRef(ref);
      const refSeen = ctx.seen.get(ref);
      const refSchema = refSeen.schema;
      if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
        schema2.allOf = schema2.allOf ?? [];
        schema2.allOf.push(refSchema);
      } else {
        Object.assign(schema2, refSchema);
      }
      Object.assign(schema2, _cached);
      const isParentRef = zodSchema._zod.parent === ref;
      if (isParentRef) {
        for (const key in schema2) {
          if (key === "$ref" || key === "allOf")
            continue;
          if (!(key in _cached)) {
            delete schema2[key];
          }
        }
      }
      if (refSchema.$ref && refSeen.def) {
        for (const key in schema2) {
          if (key === "$ref" || key === "allOf")
            continue;
          if (key in refSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(refSeen.def[key])) {
            delete schema2[key];
          }
        }
      }
    }
    const parent = zodSchema._zod.parent;
    if (parent && parent !== ref) {
      flattenRef(parent);
      const parentSeen = ctx.seen.get(parent);
      if (parentSeen?.schema.$ref) {
        schema2.$ref = parentSeen.schema.$ref;
        if (parentSeen.def) {
          for (const key in schema2) {
            if (key === "$ref" || key === "allOf")
              continue;
            if (key in parentSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(parentSeen.def[key])) {
              delete schema2[key];
            }
          }
        }
      }
    }
    ctx.override({
      zodSchema,
      jsonSchema: schema2,
      path: seen.path ?? []
    });
  };
  for (const entry of [...ctx.seen.entries()].reverse()) {
    flattenRef(entry[0]);
  }
  const result = {};
  if (ctx.target === "draft-2020-12") {
    result.$schema = "https://json-schema.org/draft/2020-12/schema";
  } else if (ctx.target === "draft-07") {
    result.$schema = "http://json-schema.org/draft-07/schema#";
  } else if (ctx.target === "draft-04") {
    result.$schema = "http://json-schema.org/draft-04/schema#";
  } else if (ctx.target === "openapi-3.0") {
  } else {
  }
  if (ctx.external?.uri) {
    const id = ctx.external.registry.get(schema)?.id;
    if (!id)
      throw new Error("Schema is missing an `id` property");
    result.$id = ctx.external.uri(id);
  }
  Object.assign(result, root.def ?? root.schema);
  const defs = ctx.external?.defs ?? {};
  for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (seen.def && seen.defId) {
      defs[seen.defId] = seen.def;
    }
  }
  if (ctx.external) {
  } else {
    if (Object.keys(defs).length > 0) {
      if (ctx.target === "draft-2020-12") {
        result.$defs = defs;
      } else {
        result.definitions = defs;
      }
    }
  }
  try {
    const finalized = JSON.parse(JSON.stringify(result));
    Object.defineProperty(finalized, "~standard", {
      value: {
        ...schema["~standard"],
        jsonSchema: {
          input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
          output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
        }
      },
      enumerable: false,
      writable: false
    });
    return finalized;
  } catch (_err) {
    throw new Error("Error converting schema to JSON.");
  }
}
function isTransforming(_schema, _ctx) {
  const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
  if (ctx.seen.has(_schema))
    return false;
  ctx.seen.add(_schema);
  const def = _schema._zod.def;
  if (def.type === "transform")
    return true;
  if (def.type === "array")
    return isTransforming(def.element, ctx);
  if (def.type === "set")
    return isTransforming(def.valueType, ctx);
  if (def.type === "lazy")
    return isTransforming(def.getter(), ctx);
  if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") {
    return isTransforming(def.innerType, ctx);
  }
  if (def.type === "intersection") {
    return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
  }
  if (def.type === "record" || def.type === "map") {
    return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
  }
  if (def.type === "pipe") {
    return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
  }
  if (def.type === "object") {
    for (const key in def.shape) {
      if (isTransforming(def.shape[key], ctx))
        return true;
    }
    return false;
  }
  if (def.type === "union") {
    for (const option of def.options) {
      if (isTransforming(option, ctx))
        return true;
    }
    return false;
  }
  if (def.type === "tuple") {
    for (const item of def.items) {
      if (isTransforming(item, ctx))
        return true;
    }
    if (def.rest && isTransforming(def.rest, ctx))
      return true;
    return false;
  }
  return false;
}
var createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
  const ctx = initializeContext({ ...params, processors });
  process3(schema, ctx);
  extractDefs(ctx, schema);
  return finalize(ctx, schema);
};
var createStandardJSONSchemaMethod = (schema, io2, processors = {}) => (params) => {
  const { libraryOptions, target } = params ?? {};
  const ctx = initializeContext({ ...libraryOptions ?? {}, target, io: io2, processors });
  process3(schema, ctx);
  extractDefs(ctx, schema);
  return finalize(ctx, schema);
};

// node_modules/zod/v4/core/json-schema-processors.js
var formatMap = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
};
var stringProcessor = (schema, ctx, _json, _params) => {
  const json2 = _json;
  json2.type = "string";
  const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
  if (typeof minimum === "number")
    json2.minLength = minimum;
  if (typeof maximum === "number")
    json2.maxLength = maximum;
  if (format) {
    json2.format = formatMap[format] ?? format;
    if (json2.format === "")
      delete json2.format;
    if (format === "time") {
      delete json2.format;
    }
  }
  if (contentEncoding)
    json2.contentEncoding = contentEncoding;
  if (patterns && patterns.size > 0) {
    const regexes = [...patterns];
    if (regexes.length === 1)
      json2.pattern = regexes[0].source;
    else if (regexes.length > 1) {
      json2.allOf = [
        ...regexes.map((regex) => ({
          ...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
          pattern: regex.source
        }))
      ];
    }
  }
};
var numberProcessor = (schema, ctx, _json, _params) => {
  const json2 = _json;
  const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
  if (typeof format === "string" && format.includes("int"))
    json2.type = "integer";
  else
    json2.type = "number";
  if (typeof exclusiveMinimum === "number") {
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json2.minimum = exclusiveMinimum;
      json2.exclusiveMinimum = true;
    } else {
      json2.exclusiveMinimum = exclusiveMinimum;
    }
  }
  if (typeof minimum === "number") {
    json2.minimum = minimum;
    if (typeof exclusiveMinimum === "number" && ctx.target !== "draft-04") {
      if (exclusiveMinimum >= minimum)
        delete json2.minimum;
      else
        delete json2.exclusiveMinimum;
    }
  }
  if (typeof exclusiveMaximum === "number") {
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json2.maximum = exclusiveMaximum;
      json2.exclusiveMaximum = true;
    } else {
      json2.exclusiveMaximum = exclusiveMaximum;
    }
  }
  if (typeof maximum === "number") {
    json2.maximum = maximum;
    if (typeof exclusiveMaximum === "number" && ctx.target !== "draft-04") {
      if (exclusiveMaximum <= maximum)
        delete json2.maximum;
      else
        delete json2.exclusiveMaximum;
    }
  }
  if (typeof multipleOf === "number")
    json2.multipleOf = multipleOf;
};
var booleanProcessor = (_schema, _ctx, json2, _params) => {
  json2.type = "boolean";
};
var bigintProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("BigInt cannot be represented in JSON Schema");
  }
};
var symbolProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Symbols cannot be represented in JSON Schema");
  }
};
var nullProcessor = (_schema, ctx, json2, _params) => {
  if (ctx.target === "openapi-3.0") {
    json2.type = "string";
    json2.nullable = true;
    json2.enum = [null];
  } else {
    json2.type = "null";
  }
};
var undefinedProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Undefined cannot be represented in JSON Schema");
  }
};
var voidProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Void cannot be represented in JSON Schema");
  }
};
var neverProcessor = (_schema, _ctx, json2, _params) => {
  json2.not = {};
};
var anyProcessor = (_schema, _ctx, _json, _params) => {
};
var unknownProcessor = (_schema, _ctx, _json, _params) => {
};
var dateProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Date cannot be represented in JSON Schema");
  }
};
var enumProcessor = (schema, _ctx, json2, _params) => {
  const def = schema._zod.def;
  const values = getEnumValues(def.entries);
  if (values.every((v) => typeof v === "number"))
    json2.type = "number";
  if (values.every((v) => typeof v === "string"))
    json2.type = "string";
  json2.enum = values;
};
var literalProcessor = (schema, ctx, json2, _params) => {
  const def = schema._zod.def;
  const vals = [];
  for (const val of def.values) {
    if (val === void 0) {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Literal `undefined` cannot be represented in JSON Schema");
      } else {
      }
    } else if (typeof val === "bigint") {
      if (ctx.unrepresentable === "throw") {
        throw new Error("BigInt literals cannot be represented in JSON Schema");
      } else {
        vals.push(Number(val));
      }
    } else {
      vals.push(val);
    }
  }
  if (vals.length === 0) {
  } else if (vals.length === 1) {
    const val = vals[0];
    json2.type = val === null ? "null" : typeof val;
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json2.enum = [val];
    } else {
      json2.const = val;
    }
  } else {
    if (vals.every((v) => typeof v === "number"))
      json2.type = "number";
    if (vals.every((v) => typeof v === "string"))
      json2.type = "string";
    if (vals.every((v) => typeof v === "boolean"))
      json2.type = "boolean";
    if (vals.every((v) => v === null))
      json2.type = "null";
    json2.enum = vals;
  }
};
var nanProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("NaN cannot be represented in JSON Schema");
  }
};
var templateLiteralProcessor = (schema, _ctx, json2, _params) => {
  const _json = json2;
  const pattern = schema._zod.pattern;
  if (!pattern)
    throw new Error("Pattern not found in template literal");
  _json.type = "string";
  _json.pattern = pattern.source;
};
var fileProcessor = (schema, _ctx, json2, _params) => {
  const _json = json2;
  const file2 = {
    type: "string",
    format: "binary",
    contentEncoding: "binary"
  };
  const { minimum, maximum, mime } = schema._zod.bag;
  if (minimum !== void 0)
    file2.minLength = minimum;
  if (maximum !== void 0)
    file2.maxLength = maximum;
  if (mime) {
    if (mime.length === 1) {
      file2.contentMediaType = mime[0];
      Object.assign(_json, file2);
    } else {
      Object.assign(_json, file2);
      _json.anyOf = mime.map((m) => ({ contentMediaType: m }));
    }
  } else {
    Object.assign(_json, file2);
  }
};
var successProcessor = (_schema, _ctx, json2, _params) => {
  json2.type = "boolean";
};
var customProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Custom types cannot be represented in JSON Schema");
  }
};
var functionProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Function types cannot be represented in JSON Schema");
  }
};
var transformProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Transforms cannot be represented in JSON Schema");
  }
};
var mapProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Map cannot be represented in JSON Schema");
  }
};
var setProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Set cannot be represented in JSON Schema");
  }
};
var arrayProcessor = (schema, ctx, _json, params) => {
  const json2 = _json;
  const def = schema._zod.def;
  const { minimum, maximum } = schema._zod.bag;
  if (typeof minimum === "number")
    json2.minItems = minimum;
  if (typeof maximum === "number")
    json2.maxItems = maximum;
  json2.type = "array";
  json2.items = process3(def.element, ctx, { ...params, path: [...params.path, "items"] });
};
var objectProcessor = (schema, ctx, _json, params) => {
  const json2 = _json;
  const def = schema._zod.def;
  json2.type = "object";
  json2.properties = {};
  const shape = def.shape;
  for (const key in shape) {
    json2.properties[key] = process3(shape[key], ctx, {
      ...params,
      path: [...params.path, "properties", key]
    });
  }
  const allKeys = new Set(Object.keys(shape));
  const requiredKeys = new Set([...allKeys].filter((key) => {
    const v = def.shape[key]._zod;
    if (ctx.io === "input") {
      return v.optin === void 0;
    } else {
      return v.optout === void 0;
    }
  }));
  if (requiredKeys.size > 0) {
    json2.required = Array.from(requiredKeys);
  }
  if (def.catchall?._zod.def.type === "never") {
    json2.additionalProperties = false;
  } else if (!def.catchall) {
    if (ctx.io === "output")
      json2.additionalProperties = false;
  } else if (def.catchall) {
    json2.additionalProperties = process3(def.catchall, ctx, {
      ...params,
      path: [...params.path, "additionalProperties"]
    });
  }
};
var unionProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  const isExclusive = def.inclusive === false;
  const options = def.options.map((x, i) => process3(x, ctx, {
    ...params,
    path: [...params.path, isExclusive ? "oneOf" : "anyOf", i]
  }));
  if (isExclusive) {
    json2.oneOf = options;
  } else {
    json2.anyOf = options;
  }
};
var intersectionProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  const a = process3(def.left, ctx, {
    ...params,
    path: [...params.path, "allOf", 0]
  });
  const b = process3(def.right, ctx, {
    ...params,
    path: [...params.path, "allOf", 1]
  });
  const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
  const allOf = [
    ...isSimpleIntersection(a) ? a.allOf : [a],
    ...isSimpleIntersection(b) ? b.allOf : [b]
  ];
  json2.allOf = allOf;
};
var tupleProcessor = (schema, ctx, _json, params) => {
  const json2 = _json;
  const def = schema._zod.def;
  json2.type = "array";
  const prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items";
  const restPath = ctx.target === "draft-2020-12" ? "items" : ctx.target === "openapi-3.0" ? "items" : "additionalItems";
  const prefixItems = def.items.map((x, i) => process3(x, ctx, {
    ...params,
    path: [...params.path, prefixPath, i]
  }));
  const rest = def.rest ? process3(def.rest, ctx, {
    ...params,
    path: [...params.path, restPath, ...ctx.target === "openapi-3.0" ? [def.items.length] : []]
  }) : null;
  if (ctx.target === "draft-2020-12") {
    json2.prefixItems = prefixItems;
    if (rest) {
      json2.items = rest;
    }
  } else if (ctx.target === "openapi-3.0") {
    json2.items = {
      anyOf: prefixItems
    };
    if (rest) {
      json2.items.anyOf.push(rest);
    }
    json2.minItems = prefixItems.length;
    if (!rest) {
      json2.maxItems = prefixItems.length;
    }
  } else {
    json2.items = prefixItems;
    if (rest) {
      json2.additionalItems = rest;
    }
  }
  const { minimum, maximum } = schema._zod.bag;
  if (typeof minimum === "number")
    json2.minItems = minimum;
  if (typeof maximum === "number")
    json2.maxItems = maximum;
};
var recordProcessor = (schema, ctx, _json, params) => {
  const json2 = _json;
  const def = schema._zod.def;
  json2.type = "object";
  const keyType = def.keyType;
  const keyBag = keyType._zod.bag;
  const patterns = keyBag?.patterns;
  if (def.mode === "loose" && patterns && patterns.size > 0) {
    const valueSchema = process3(def.valueType, ctx, {
      ...params,
      path: [...params.path, "patternProperties", "*"]
    });
    json2.patternProperties = {};
    for (const pattern of patterns) {
      json2.patternProperties[pattern.source] = valueSchema;
    }
  } else {
    if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") {
      json2.propertyNames = process3(def.keyType, ctx, {
        ...params,
        path: [...params.path, "propertyNames"]
      });
    }
    json2.additionalProperties = process3(def.valueType, ctx, {
      ...params,
      path: [...params.path, "additionalProperties"]
    });
  }
  const keyValues = keyType._zod.values;
  if (keyValues) {
    const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
    if (validKeyValues.length > 0) {
      json2.required = validKeyValues;
    }
  }
};
var nullableProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  const inner = process3(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  if (ctx.target === "openapi-3.0") {
    seen.ref = def.innerType;
    json2.nullable = true;
  } else {
    json2.anyOf = [inner, { type: "null" }];
  }
};
var nonoptionalProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process3(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var defaultProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  process3(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  json2.default = JSON.parse(JSON.stringify(def.defaultValue));
};
var prefaultProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  process3(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  if (ctx.io === "input")
    json2._prefault = JSON.parse(JSON.stringify(def.defaultValue));
};
var catchProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  process3(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  let catchValue;
  try {
    catchValue = def.catchValue(void 0);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  json2.default = catchValue;
};
var pipeProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  const innerType = ctx.io === "input" ? def.in._zod.def.type === "transform" ? def.out : def.in : def.out;
  process3(innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = innerType;
};
var readonlyProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  process3(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  json2.readOnly = true;
};
var promiseProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process3(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var optionalProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process3(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var lazyProcessor = (schema, ctx, _json, params) => {
  const innerType = schema._zod.innerType;
  process3(innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = innerType;
};
var allProcessors = {
  string: stringProcessor,
  number: numberProcessor,
  boolean: booleanProcessor,
  bigint: bigintProcessor,
  symbol: symbolProcessor,
  null: nullProcessor,
  undefined: undefinedProcessor,
  void: voidProcessor,
  never: neverProcessor,
  any: anyProcessor,
  unknown: unknownProcessor,
  date: dateProcessor,
  enum: enumProcessor,
  literal: literalProcessor,
  nan: nanProcessor,
  template_literal: templateLiteralProcessor,
  file: fileProcessor,
  success: successProcessor,
  custom: customProcessor,
  function: functionProcessor,
  transform: transformProcessor,
  map: mapProcessor,
  set: setProcessor,
  array: arrayProcessor,
  object: objectProcessor,
  union: unionProcessor,
  intersection: intersectionProcessor,
  tuple: tupleProcessor,
  record: recordProcessor,
  nullable: nullableProcessor,
  nonoptional: nonoptionalProcessor,
  default: defaultProcessor,
  prefault: prefaultProcessor,
  catch: catchProcessor,
  pipe: pipeProcessor,
  readonly: readonlyProcessor,
  promise: promiseProcessor,
  optional: optionalProcessor,
  lazy: lazyProcessor
};
function toJSONSchema(input, params) {
  if ("_idmap" in input) {
    const registry2 = input;
    const ctx2 = initializeContext({ ...params, processors: allProcessors });
    const defs = {};
    for (const entry of registry2._idmap.entries()) {
      const [_, schema] = entry;
      process3(schema, ctx2);
    }
    const schemas = {};
    const external = {
      registry: registry2,
      uri: params?.uri,
      defs
    };
    ctx2.external = external;
    for (const entry of registry2._idmap.entries()) {
      const [key, schema] = entry;
      extractDefs(ctx2, schema);
      schemas[key] = finalize(ctx2, schema);
    }
    if (Object.keys(defs).length > 0) {
      const defsSegment = ctx2.target === "draft-2020-12" ? "$defs" : "definitions";
      schemas.__shared = {
        [defsSegment]: defs
      };
    }
    return { schemas };
  }
  const ctx = initializeContext({ ...params, processors: allProcessors });
  process3(input, ctx);
  extractDefs(ctx, input);
  return finalize(ctx, input);
}

// node_modules/zod/v4/core/json-schema-generator.js
var JSONSchemaGenerator = class {
  /** @deprecated Access via ctx instead */
  get metadataRegistry() {
    return this.ctx.metadataRegistry;
  }
  /** @deprecated Access via ctx instead */
  get target() {
    return this.ctx.target;
  }
  /** @deprecated Access via ctx instead */
  get unrepresentable() {
    return this.ctx.unrepresentable;
  }
  /** @deprecated Access via ctx instead */
  get override() {
    return this.ctx.override;
  }
  /** @deprecated Access via ctx instead */
  get io() {
    return this.ctx.io;
  }
  /** @deprecated Access via ctx instead */
  get counter() {
    return this.ctx.counter;
  }
  set counter(value) {
    this.ctx.counter = value;
  }
  /** @deprecated Access via ctx instead */
  get seen() {
    return this.ctx.seen;
  }
  constructor(params) {
    let normalizedTarget = params?.target ?? "draft-2020-12";
    if (normalizedTarget === "draft-4")
      normalizedTarget = "draft-04";
    if (normalizedTarget === "draft-7")
      normalizedTarget = "draft-07";
    this.ctx = initializeContext({
      processors: allProcessors,
      target: normalizedTarget,
      ...params?.metadata && { metadata: params.metadata },
      ...params?.unrepresentable && { unrepresentable: params.unrepresentable },
      ...params?.override && { override: params.override },
      ...params?.io && { io: params.io }
    });
  }
  /**
   * Process a schema to prepare it for JSON Schema generation.
   * This must be called before emit().
   */
  process(schema, _params = { path: [], schemaPath: [] }) {
    return process3(schema, this.ctx, _params);
  }
  /**
   * Emit the final JSON Schema after processing.
   * Must call process() first.
   */
  emit(schema, _params) {
    if (_params) {
      if (_params.cycles)
        this.ctx.cycles = _params.cycles;
      if (_params.reused)
        this.ctx.reused = _params.reused;
      if (_params.external)
        this.ctx.external = _params.external;
    }
    extractDefs(this.ctx, schema);
    const result = finalize(this.ctx, schema);
    const { "~standard": _, ...plainResult } = result;
    return plainResult;
  }
};

// node_modules/zod/v4/core/json-schema.js
var json_schema_exports = {};

// node_modules/zod/v4/classic/schemas.js
var schemas_exports2 = {};
__export(schemas_exports2, {
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBase64: () => ZodBase64,
  ZodBase64URL: () => ZodBase64URL,
  ZodBigInt: () => ZodBigInt,
  ZodBigIntFormat: () => ZodBigIntFormat,
  ZodBoolean: () => ZodBoolean,
  ZodCIDRv4: () => ZodCIDRv4,
  ZodCIDRv6: () => ZodCIDRv6,
  ZodCUID: () => ZodCUID,
  ZodCUID2: () => ZodCUID2,
  ZodCatch: () => ZodCatch,
  ZodCodec: () => ZodCodec,
  ZodCustom: () => ZodCustom,
  ZodCustomStringFormat: () => ZodCustomStringFormat,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodE164: () => ZodE164,
  ZodEmail: () => ZodEmail,
  ZodEmoji: () => ZodEmoji,
  ZodEnum: () => ZodEnum,
  ZodExactOptional: () => ZodExactOptional,
  ZodFile: () => ZodFile,
  ZodFunction: () => ZodFunction,
  ZodGUID: () => ZodGUID,
  ZodIPv4: () => ZodIPv4,
  ZodIPv6: () => ZodIPv6,
  ZodIntersection: () => ZodIntersection,
  ZodJWT: () => ZodJWT,
  ZodKSUID: () => ZodKSUID,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMAC: () => ZodMAC,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNanoID: () => ZodNanoID,
  ZodNever: () => ZodNever,
  ZodNonOptional: () => ZodNonOptional,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodNumberFormat: () => ZodNumberFormat,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodPipe: () => ZodPipe,
  ZodPrefault: () => ZodPrefault,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodStringFormat: () => ZodStringFormat,
  ZodSuccess: () => ZodSuccess,
  ZodSymbol: () => ZodSymbol,
  ZodTemplateLiteral: () => ZodTemplateLiteral,
  ZodTransform: () => ZodTransform,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodULID: () => ZodULID,
  ZodURL: () => ZodURL,
  ZodUUID: () => ZodUUID,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  ZodXID: () => ZodXID,
  ZodXor: () => ZodXor,
  _ZodString: () => _ZodString,
  _default: () => _default2,
  _function: () => _function,
  any: () => any,
  array: () => array,
  base64: () => base642,
  base64url: () => base64url2,
  bigint: () => bigint2,
  boolean: () => boolean2,
  catch: () => _catch2,
  check: () => check,
  cidrv4: () => cidrv42,
  cidrv6: () => cidrv62,
  codec: () => codec,
  cuid: () => cuid3,
  cuid2: () => cuid22,
  custom: () => custom,
  date: () => date3,
  describe: () => describe2,
  discriminatedUnion: () => discriminatedUnion,
  e164: () => e1642,
  email: () => email2,
  emoji: () => emoji2,
  enum: () => _enum2,
  exactOptional: () => exactOptional,
  file: () => file,
  float32: () => float32,
  float64: () => float64,
  function: () => _function,
  guid: () => guid2,
  hash: () => hash,
  hex: () => hex2,
  hostname: () => hostname2,
  httpUrl: () => httpUrl,
  instanceof: () => _instanceof,
  int: () => int,
  int32: () => int32,
  int64: () => int64,
  intersection: () => intersection,
  ipv4: () => ipv42,
  ipv6: () => ipv62,
  json: () => json,
  jwt: () => jwt,
  keyof: () => keyof,
  ksuid: () => ksuid2,
  lazy: () => lazy,
  literal: () => literal,
  looseObject: () => looseObject,
  looseRecord: () => looseRecord,
  mac: () => mac2,
  map: () => map,
  meta: () => meta2,
  nan: () => nan,
  nanoid: () => nanoid3,
  nativeEnum: () => nativeEnum,
  never: () => never,
  nonoptional: () => nonoptional,
  null: () => _null3,
  nullable: () => nullable,
  nullish: () => nullish2,
  number: () => number2,
  object: () => object,
  optional: () => optional,
  partialRecord: () => partialRecord,
  pipe: () => pipe,
  prefault: () => prefault,
  preprocess: () => preprocess,
  promise: () => promise,
  readonly: () => readonly,
  record: () => record,
  refine: () => refine,
  set: () => set,
  strictObject: () => strictObject,
  string: () => string2,
  stringFormat: () => stringFormat,
  stringbool: () => stringbool,
  success: () => success,
  superRefine: () => superRefine,
  symbol: () => symbol,
  templateLiteral: () => templateLiteral,
  transform: () => transform,
  tuple: () => tuple,
  uint32: () => uint32,
  uint64: () => uint64,
  ulid: () => ulid2,
  undefined: () => _undefined3,
  union: () => union,
  unknown: () => unknown,
  url: () => url,
  uuid: () => uuid2,
  uuidv4: () => uuidv4,
  uuidv6: () => uuidv6,
  uuidv7: () => uuidv7,
  void: () => _void2,
  xid: () => xid2,
  xor: () => xor
});

// node_modules/zod/v4/classic/checks.js
var checks_exports2 = {};
__export(checks_exports2, {
  endsWith: () => _endsWith,
  gt: () => _gt,
  gte: () => _gte,
  includes: () => _includes,
  length: () => _length,
  lowercase: () => _lowercase,
  lt: () => _lt,
  lte: () => _lte,
  maxLength: () => _maxLength,
  maxSize: () => _maxSize,
  mime: () => _mime,
  minLength: () => _minLength,
  minSize: () => _minSize,
  multipleOf: () => _multipleOf,
  negative: () => _negative,
  nonnegative: () => _nonnegative,
  nonpositive: () => _nonpositive,
  normalize: () => _normalize,
  overwrite: () => _overwrite,
  positive: () => _positive,
  property: () => _property,
  regex: () => _regex,
  size: () => _size,
  slugify: () => _slugify,
  startsWith: () => _startsWith,
  toLowerCase: () => _toLowerCase,
  toUpperCase: () => _toUpperCase,
  trim: () => _trim,
  uppercase: () => _uppercase
});

// node_modules/zod/v4/classic/iso.js
var iso_exports = {};
__export(iso_exports, {
  ZodISODate: () => ZodISODate,
  ZodISODateTime: () => ZodISODateTime,
  ZodISODuration: () => ZodISODuration,
  ZodISOTime: () => ZodISOTime,
  date: () => date2,
  datetime: () => datetime2,
  duration: () => duration2,
  time: () => time2
});
var ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
  $ZodISODateTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function datetime2(params) {
  return _isoDateTime(ZodISODateTime, params);
}
var ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
  $ZodISODate.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function date2(params) {
  return _isoDate(ZodISODate, params);
}
var ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
  $ZodISOTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function time2(params) {
  return _isoTime(ZodISOTime, params);
}
var ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
  $ZodISODuration.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function duration2(params) {
  return _isoDuration(ZodISODuration, params);
}

// node_modules/zod/v4/classic/errors.js
var initializer2 = (inst, issues) => {
  $ZodError.init(inst, issues);
  inst.name = "ZodError";
  Object.defineProperties(inst, {
    format: {
      value: (mapper) => formatError(inst, mapper)
      // enumerable: false,
    },
    flatten: {
      value: (mapper) => flattenError(inst, mapper)
      // enumerable: false,
    },
    addIssue: {
      value: (issue2) => {
        inst.issues.push(issue2);
        inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (issues2) => {
        inst.issues.push(...issues2);
        inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
      }
      // enumerable: false,
    },
    isEmpty: {
      get() {
        return inst.issues.length === 0;
      }
      // enumerable: false,
    }
  });
};
var ZodError = $constructor("ZodError", initializer2);
var ZodRealError = $constructor("ZodError", initializer2, {
  Parent: Error
});

// node_modules/zod/v4/classic/parse.js
var parse2 = /* @__PURE__ */ _parse(ZodRealError);
var parseAsync2 = /* @__PURE__ */ _parseAsync(ZodRealError);
var safeParse2 = /* @__PURE__ */ _safeParse(ZodRealError);
var safeParseAsync2 = /* @__PURE__ */ _safeParseAsync(ZodRealError);
var encode2 = /* @__PURE__ */ _encode(ZodRealError);
var decode2 = /* @__PURE__ */ _decode(ZodRealError);
var encodeAsync2 = /* @__PURE__ */ _encodeAsync(ZodRealError);
var decodeAsync2 = /* @__PURE__ */ _decodeAsync(ZodRealError);
var safeEncode2 = /* @__PURE__ */ _safeEncode(ZodRealError);
var safeDecode2 = /* @__PURE__ */ _safeDecode(ZodRealError);
var safeEncodeAsync2 = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
var safeDecodeAsync2 = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);

// node_modules/zod/v4/classic/schemas.js
var ZodType = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
  $ZodType.init(inst, def);
  Object.assign(inst["~standard"], {
    jsonSchema: {
      input: createStandardJSONSchemaMethod(inst, "input"),
      output: createStandardJSONSchemaMethod(inst, "output")
    }
  });
  inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
  inst.def = def;
  inst.type = def.type;
  Object.defineProperty(inst, "_def", { value: def });
  inst.check = (...checks) => {
    return inst.clone(util_exports.mergeDefs(def, {
      checks: [
        ...def.checks ?? [],
        ...checks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch)
      ]
    }), {
      parent: true
    });
  };
  inst.with = inst.check;
  inst.clone = (def2, params) => clone(inst, def2, params);
  inst.brand = () => inst;
  inst.register = ((reg, meta3) => {
    reg.add(inst, meta3);
    return inst;
  });
  inst.parse = (data, params) => parse2(inst, data, params, { callee: inst.parse });
  inst.safeParse = (data, params) => safeParse2(inst, data, params);
  inst.parseAsync = async (data, params) => parseAsync2(inst, data, params, { callee: inst.parseAsync });
  inst.safeParseAsync = async (data, params) => safeParseAsync2(inst, data, params);
  inst.spa = inst.safeParseAsync;
  inst.encode = (data, params) => encode2(inst, data, params);
  inst.decode = (data, params) => decode2(inst, data, params);
  inst.encodeAsync = async (data, params) => encodeAsync2(inst, data, params);
  inst.decodeAsync = async (data, params) => decodeAsync2(inst, data, params);
  inst.safeEncode = (data, params) => safeEncode2(inst, data, params);
  inst.safeDecode = (data, params) => safeDecode2(inst, data, params);
  inst.safeEncodeAsync = async (data, params) => safeEncodeAsync2(inst, data, params);
  inst.safeDecodeAsync = async (data, params) => safeDecodeAsync2(inst, data, params);
  inst.refine = (check2, params) => inst.check(refine(check2, params));
  inst.superRefine = (refinement) => inst.check(superRefine(refinement));
  inst.overwrite = (fn) => inst.check(_overwrite(fn));
  inst.optional = () => optional(inst);
  inst.exactOptional = () => exactOptional(inst);
  inst.nullable = () => nullable(inst);
  inst.nullish = () => optional(nullable(inst));
  inst.nonoptional = (params) => nonoptional(inst, params);
  inst.array = () => array(inst);
  inst.or = (arg) => union([inst, arg]);
  inst.and = (arg) => intersection(inst, arg);
  inst.transform = (tx) => pipe(inst, transform(tx));
  inst.default = (def2) => _default2(inst, def2);
  inst.prefault = (def2) => prefault(inst, def2);
  inst.catch = (params) => _catch2(inst, params);
  inst.pipe = (target) => pipe(inst, target);
  inst.readonly = () => readonly(inst);
  inst.describe = (description) => {
    const cl = inst.clone();
    globalRegistry.add(cl, { description });
    return cl;
  };
  Object.defineProperty(inst, "description", {
    get() {
      return globalRegistry.get(inst)?.description;
    },
    configurable: true
  });
  inst.meta = (...args) => {
    if (args.length === 0) {
      return globalRegistry.get(inst);
    }
    const cl = inst.clone();
    globalRegistry.add(cl, args[0]);
    return cl;
  };
  inst.isOptional = () => inst.safeParse(void 0).success;
  inst.isNullable = () => inst.safeParse(null).success;
  inst.apply = (fn) => fn(inst);
  return inst;
});
var _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => stringProcessor(inst, ctx, json2, params);
  const bag = inst._zod.bag;
  inst.format = bag.format ?? null;
  inst.minLength = bag.minimum ?? null;
  inst.maxLength = bag.maximum ?? null;
  inst.regex = (...args) => inst.check(_regex(...args));
  inst.includes = (...args) => inst.check(_includes(...args));
  inst.startsWith = (...args) => inst.check(_startsWith(...args));
  inst.endsWith = (...args) => inst.check(_endsWith(...args));
  inst.min = (...args) => inst.check(_minLength(...args));
  inst.max = (...args) => inst.check(_maxLength(...args));
  inst.length = (...args) => inst.check(_length(...args));
  inst.nonempty = (...args) => inst.check(_minLength(1, ...args));
  inst.lowercase = (params) => inst.check(_lowercase(params));
  inst.uppercase = (params) => inst.check(_uppercase(params));
  inst.trim = () => inst.check(_trim());
  inst.normalize = (...args) => inst.check(_normalize(...args));
  inst.toLowerCase = () => inst.check(_toLowerCase());
  inst.toUpperCase = () => inst.check(_toUpperCase());
  inst.slugify = () => inst.check(_slugify());
});
var ZodString = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  _ZodString.init(inst, def);
  inst.email = (params) => inst.check(_email(ZodEmail, params));
  inst.url = (params) => inst.check(_url(ZodURL, params));
  inst.jwt = (params) => inst.check(_jwt(ZodJWT, params));
  inst.emoji = (params) => inst.check(_emoji2(ZodEmoji, params));
  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
  inst.uuid = (params) => inst.check(_uuid(ZodUUID, params));
  inst.uuidv4 = (params) => inst.check(_uuidv4(ZodUUID, params));
  inst.uuidv6 = (params) => inst.check(_uuidv6(ZodUUID, params));
  inst.uuidv7 = (params) => inst.check(_uuidv7(ZodUUID, params));
  inst.nanoid = (params) => inst.check(_nanoid(ZodNanoID, params));
  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
  inst.cuid = (params) => inst.check(_cuid(ZodCUID, params));
  inst.cuid2 = (params) => inst.check(_cuid2(ZodCUID2, params));
  inst.ulid = (params) => inst.check(_ulid(ZodULID, params));
  inst.base64 = (params) => inst.check(_base64(ZodBase64, params));
  inst.base64url = (params) => inst.check(_base64url(ZodBase64URL, params));
  inst.xid = (params) => inst.check(_xid(ZodXID, params));
  inst.ksuid = (params) => inst.check(_ksuid(ZodKSUID, params));
  inst.ipv4 = (params) => inst.check(_ipv4(ZodIPv4, params));
  inst.ipv6 = (params) => inst.check(_ipv6(ZodIPv6, params));
  inst.cidrv4 = (params) => inst.check(_cidrv4(ZodCIDRv4, params));
  inst.cidrv6 = (params) => inst.check(_cidrv6(ZodCIDRv6, params));
  inst.e164 = (params) => inst.check(_e164(ZodE164, params));
  inst.datetime = (params) => inst.check(datetime2(params));
  inst.date = (params) => inst.check(date2(params));
  inst.time = (params) => inst.check(time2(params));
  inst.duration = (params) => inst.check(duration2(params));
});
function string2(params) {
  return _string(ZodString, params);
}
var ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  _ZodString.init(inst, def);
});
var ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
  $ZodEmail.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function email2(params) {
  return _email(ZodEmail, params);
}
var ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
  $ZodGUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function guid2(params) {
  return _guid(ZodGUID, params);
}
var ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
  $ZodUUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function uuid2(params) {
  return _uuid(ZodUUID, params);
}
function uuidv4(params) {
  return _uuidv4(ZodUUID, params);
}
function uuidv6(params) {
  return _uuidv6(ZodUUID, params);
}
function uuidv7(params) {
  return _uuidv7(ZodUUID, params);
}
var ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
  $ZodURL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function url(params) {
  return _url(ZodURL, params);
}
function httpUrl(params) {
  return _url(ZodURL, {
    protocol: /^https?$/,
    hostname: regexes_exports.domain,
    ...util_exports.normalizeParams(params)
  });
}
var ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
  $ZodEmoji.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function emoji2(params) {
  return _emoji2(ZodEmoji, params);
}
var ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
  $ZodNanoID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function nanoid3(params) {
  return _nanoid(ZodNanoID, params);
}
var ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
  $ZodCUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cuid3(params) {
  return _cuid(ZodCUID, params);
}
var ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
  $ZodCUID2.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cuid22(params) {
  return _cuid2(ZodCUID2, params);
}
var ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
  $ZodULID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ulid2(params) {
  return _ulid(ZodULID, params);
}
var ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
  $ZodXID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function xid2(params) {
  return _xid(ZodXID, params);
}
var ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
  $ZodKSUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ksuid2(params) {
  return _ksuid(ZodKSUID, params);
}
var ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
  $ZodIPv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ipv42(params) {
  return _ipv4(ZodIPv4, params);
}
var ZodMAC = /* @__PURE__ */ $constructor("ZodMAC", (inst, def) => {
  $ZodMAC.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function mac2(params) {
  return _mac(ZodMAC, params);
}
var ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
  $ZodIPv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ipv62(params) {
  return _ipv6(ZodIPv6, params);
}
var ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
  $ZodCIDRv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cidrv42(params) {
  return _cidrv4(ZodCIDRv4, params);
}
var ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
  $ZodCIDRv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cidrv62(params) {
  return _cidrv6(ZodCIDRv6, params);
}
var ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
  $ZodBase64.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function base642(params) {
  return _base64(ZodBase64, params);
}
var ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
  $ZodBase64URL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function base64url2(params) {
  return _base64url(ZodBase64URL, params);
}
var ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
  $ZodE164.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function e1642(params) {
  return _e164(ZodE164, params);
}
var ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
  $ZodJWT.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function jwt(params) {
  return _jwt(ZodJWT, params);
}
var ZodCustomStringFormat = /* @__PURE__ */ $constructor("ZodCustomStringFormat", (inst, def) => {
  $ZodCustomStringFormat.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function stringFormat(format, fnOrRegex, _params = {}) {
  return _stringFormat(ZodCustomStringFormat, format, fnOrRegex, _params);
}
function hostname2(_params) {
  return _stringFormat(ZodCustomStringFormat, "hostname", regexes_exports.hostname, _params);
}
function hex2(_params) {
  return _stringFormat(ZodCustomStringFormat, "hex", regexes_exports.hex, _params);
}
function hash(alg, params) {
  const enc = params?.enc ?? "hex";
  const format = `${alg}_${enc}`;
  const regex = regexes_exports[format];
  if (!regex)
    throw new Error(`Unrecognized hash format: ${format}`);
  return _stringFormat(ZodCustomStringFormat, format, regex, params);
}
var ZodNumber = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
  $ZodNumber.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => numberProcessor(inst, ctx, json2, params);
  inst.gt = (value, params) => inst.check(_gt(value, params));
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.lt = (value, params) => inst.check(_lt(value, params));
  inst.lte = (value, params) => inst.check(_lte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  inst.int = (params) => inst.check(int(params));
  inst.safe = (params) => inst.check(int(params));
  inst.positive = (params) => inst.check(_gt(0, params));
  inst.nonnegative = (params) => inst.check(_gte(0, params));
  inst.negative = (params) => inst.check(_lt(0, params));
  inst.nonpositive = (params) => inst.check(_lte(0, params));
  inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
  inst.step = (value, params) => inst.check(_multipleOf(value, params));
  inst.finite = () => inst;
  const bag = inst._zod.bag;
  inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
  inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
  inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? 0.5);
  inst.isFinite = true;
  inst.format = bag.format ?? null;
});
function number2(params) {
  return _number(ZodNumber, params);
}
var ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
  $ZodNumberFormat.init(inst, def);
  ZodNumber.init(inst, def);
});
function int(params) {
  return _int(ZodNumberFormat, params);
}
function float32(params) {
  return _float32(ZodNumberFormat, params);
}
function float64(params) {
  return _float64(ZodNumberFormat, params);
}
function int32(params) {
  return _int32(ZodNumberFormat, params);
}
function uint32(params) {
  return _uint32(ZodNumberFormat, params);
}
var ZodBoolean = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
  $ZodBoolean.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => booleanProcessor(inst, ctx, json2, params);
});
function boolean2(params) {
  return _boolean(ZodBoolean, params);
}
var ZodBigInt = /* @__PURE__ */ $constructor("ZodBigInt", (inst, def) => {
  $ZodBigInt.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => bigintProcessor(inst, ctx, json2, params);
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.gt = (value, params) => inst.check(_gt(value, params));
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.lt = (value, params) => inst.check(_lt(value, params));
  inst.lte = (value, params) => inst.check(_lte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  inst.positive = (params) => inst.check(_gt(BigInt(0), params));
  inst.negative = (params) => inst.check(_lt(BigInt(0), params));
  inst.nonpositive = (params) => inst.check(_lte(BigInt(0), params));
  inst.nonnegative = (params) => inst.check(_gte(BigInt(0), params));
  inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
  const bag = inst._zod.bag;
  inst.minValue = bag.minimum ?? null;
  inst.maxValue = bag.maximum ?? null;
  inst.format = bag.format ?? null;
});
function bigint2(params) {
  return _bigint(ZodBigInt, params);
}
var ZodBigIntFormat = /* @__PURE__ */ $constructor("ZodBigIntFormat", (inst, def) => {
  $ZodBigIntFormat.init(inst, def);
  ZodBigInt.init(inst, def);
});
function int64(params) {
  return _int64(ZodBigIntFormat, params);
}
function uint64(params) {
  return _uint64(ZodBigIntFormat, params);
}
var ZodSymbol = /* @__PURE__ */ $constructor("ZodSymbol", (inst, def) => {
  $ZodSymbol.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => symbolProcessor(inst, ctx, json2, params);
});
function symbol(params) {
  return _symbol(ZodSymbol, params);
}
var ZodUndefined = /* @__PURE__ */ $constructor("ZodUndefined", (inst, def) => {
  $ZodUndefined.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => undefinedProcessor(inst, ctx, json2, params);
});
function _undefined3(params) {
  return _undefined2(ZodUndefined, params);
}
var ZodNull = /* @__PURE__ */ $constructor("ZodNull", (inst, def) => {
  $ZodNull.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => nullProcessor(inst, ctx, json2, params);
});
function _null3(params) {
  return _null2(ZodNull, params);
}
var ZodAny = /* @__PURE__ */ $constructor("ZodAny", (inst, def) => {
  $ZodAny.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => anyProcessor(inst, ctx, json2, params);
});
function any() {
  return _any(ZodAny);
}
var ZodUnknown = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
  $ZodUnknown.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => unknownProcessor(inst, ctx, json2, params);
});
function unknown() {
  return _unknown(ZodUnknown);
}
var ZodNever = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
  $ZodNever.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => neverProcessor(inst, ctx, json2, params);
});
function never(params) {
  return _never(ZodNever, params);
}
var ZodVoid = /* @__PURE__ */ $constructor("ZodVoid", (inst, def) => {
  $ZodVoid.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => voidProcessor(inst, ctx, json2, params);
});
function _void2(params) {
  return _void(ZodVoid, params);
}
var ZodDate = /* @__PURE__ */ $constructor("ZodDate", (inst, def) => {
  $ZodDate.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => dateProcessor(inst, ctx, json2, params);
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  const c = inst._zod.bag;
  inst.minDate = c.minimum ? new Date(c.minimum) : null;
  inst.maxDate = c.maximum ? new Date(c.maximum) : null;
});
function date3(params) {
  return _date(ZodDate, params);
}
var ZodArray = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
  $ZodArray.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => arrayProcessor(inst, ctx, json2, params);
  inst.element = def.element;
  inst.min = (minLength, params) => inst.check(_minLength(minLength, params));
  inst.nonempty = (params) => inst.check(_minLength(1, params));
  inst.max = (maxLength, params) => inst.check(_maxLength(maxLength, params));
  inst.length = (len, params) => inst.check(_length(len, params));
  inst.unwrap = () => inst.element;
});
function array(element, params) {
  return _array(ZodArray, element, params);
}
function keyof(schema) {
  const shape = schema._zod.def.shape;
  return _enum2(Object.keys(shape));
}
var ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
  $ZodObjectJIT.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => objectProcessor(inst, ctx, json2, params);
  util_exports.defineLazy(inst, "shape", () => {
    return def.shape;
  });
  inst.keyof = () => _enum2(Object.keys(inst._zod.def.shape));
  inst.catchall = (catchall) => inst.clone({ ...inst._zod.def, catchall });
  inst.passthrough = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
  inst.loose = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
  inst.strict = () => inst.clone({ ...inst._zod.def, catchall: never() });
  inst.strip = () => inst.clone({ ...inst._zod.def, catchall: void 0 });
  inst.extend = (incoming) => {
    return util_exports.extend(inst, incoming);
  };
  inst.safeExtend = (incoming) => {
    return util_exports.safeExtend(inst, incoming);
  };
  inst.merge = (other) => util_exports.merge(inst, other);
  inst.pick = (mask) => util_exports.pick(inst, mask);
  inst.omit = (mask) => util_exports.omit(inst, mask);
  inst.partial = (...args) => util_exports.partial(ZodOptional, inst, args[0]);
  inst.required = (...args) => util_exports.required(ZodNonOptional, inst, args[0]);
});
function object(shape, params) {
  const def = {
    type: "object",
    shape: shape ?? {},
    ...util_exports.normalizeParams(params)
  };
  return new ZodObject(def);
}
function strictObject(shape, params) {
  return new ZodObject({
    type: "object",
    shape,
    catchall: never(),
    ...util_exports.normalizeParams(params)
  });
}
function looseObject(shape, params) {
  return new ZodObject({
    type: "object",
    shape,
    catchall: unknown(),
    ...util_exports.normalizeParams(params)
  });
}
var ZodUnion = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
  $ZodUnion.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => unionProcessor(inst, ctx, json2, params);
  inst.options = def.options;
});
function union(options, params) {
  return new ZodUnion({
    type: "union",
    options,
    ...util_exports.normalizeParams(params)
  });
}
var ZodXor = /* @__PURE__ */ $constructor("ZodXor", (inst, def) => {
  ZodUnion.init(inst, def);
  $ZodXor.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => unionProcessor(inst, ctx, json2, params);
  inst.options = def.options;
});
function xor(options, params) {
  return new ZodXor({
    type: "union",
    options,
    inclusive: false,
    ...util_exports.normalizeParams(params)
  });
}
var ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("ZodDiscriminatedUnion", (inst, def) => {
  ZodUnion.init(inst, def);
  $ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
  return new ZodDiscriminatedUnion({
    type: "union",
    options,
    discriminator,
    ...util_exports.normalizeParams(params)
  });
}
var ZodIntersection = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
  $ZodIntersection.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => intersectionProcessor(inst, ctx, json2, params);
});
function intersection(left, right) {
  return new ZodIntersection({
    type: "intersection",
    left,
    right
  });
}
var ZodTuple = /* @__PURE__ */ $constructor("ZodTuple", (inst, def) => {
  $ZodTuple.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => tupleProcessor(inst, ctx, json2, params);
  inst.rest = (rest) => inst.clone({
    ...inst._zod.def,
    rest
  });
});
function tuple(items, _paramsOrRest, _params) {
  const hasRest = _paramsOrRest instanceof $ZodType;
  const params = hasRest ? _params : _paramsOrRest;
  const rest = hasRest ? _paramsOrRest : null;
  return new ZodTuple({
    type: "tuple",
    items,
    rest,
    ...util_exports.normalizeParams(params)
  });
}
var ZodRecord = /* @__PURE__ */ $constructor("ZodRecord", (inst, def) => {
  $ZodRecord.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => recordProcessor(inst, ctx, json2, params);
  inst.keyType = def.keyType;
  inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
function partialRecord(keyType, valueType, params) {
  const k = clone(keyType);
  k._zod.values = void 0;
  return new ZodRecord({
    type: "record",
    keyType: k,
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
function looseRecord(keyType, valueType, params) {
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    mode: "loose",
    ...util_exports.normalizeParams(params)
  });
}
var ZodMap = /* @__PURE__ */ $constructor("ZodMap", (inst, def) => {
  $ZodMap.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => mapProcessor(inst, ctx, json2, params);
  inst.keyType = def.keyType;
  inst.valueType = def.valueType;
  inst.min = (...args) => inst.check(_minSize(...args));
  inst.nonempty = (params) => inst.check(_minSize(1, params));
  inst.max = (...args) => inst.check(_maxSize(...args));
  inst.size = (...args) => inst.check(_size(...args));
});
function map(keyType, valueType, params) {
  return new ZodMap({
    type: "map",
    keyType,
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
var ZodSet = /* @__PURE__ */ $constructor("ZodSet", (inst, def) => {
  $ZodSet.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => setProcessor(inst, ctx, json2, params);
  inst.min = (...args) => inst.check(_minSize(...args));
  inst.nonempty = (params) => inst.check(_minSize(1, params));
  inst.max = (...args) => inst.check(_maxSize(...args));
  inst.size = (...args) => inst.check(_size(...args));
});
function set(valueType, params) {
  return new ZodSet({
    type: "set",
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
var ZodEnum = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
  $ZodEnum.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => enumProcessor(inst, ctx, json2, params);
  inst.enum = def.entries;
  inst.options = Object.values(def.entries);
  const keys = new Set(Object.keys(def.entries));
  inst.extract = (values, params) => {
    const newEntries = {};
    for (const value of values) {
      if (keys.has(value)) {
        newEntries[value] = def.entries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...util_exports.normalizeParams(params),
      entries: newEntries
    });
  };
  inst.exclude = (values, params) => {
    const newEntries = { ...def.entries };
    for (const value of values) {
      if (keys.has(value)) {
        delete newEntries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...util_exports.normalizeParams(params),
      entries: newEntries
    });
  };
});
function _enum2(values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new ZodEnum({
    type: "enum",
    entries,
    ...util_exports.normalizeParams(params)
  });
}
function nativeEnum(entries, params) {
  return new ZodEnum({
    type: "enum",
    entries,
    ...util_exports.normalizeParams(params)
  });
}
var ZodLiteral = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
  $ZodLiteral.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => literalProcessor(inst, ctx, json2, params);
  inst.values = new Set(def.values);
  Object.defineProperty(inst, "value", {
    get() {
      if (def.values.length > 1) {
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      }
      return def.values[0];
    }
  });
});
function literal(value, params) {
  return new ZodLiteral({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...util_exports.normalizeParams(params)
  });
}
var ZodFile = /* @__PURE__ */ $constructor("ZodFile", (inst, def) => {
  $ZodFile.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => fileProcessor(inst, ctx, json2, params);
  inst.min = (size, params) => inst.check(_minSize(size, params));
  inst.max = (size, params) => inst.check(_maxSize(size, params));
  inst.mime = (types, params) => inst.check(_mime(Array.isArray(types) ? types : [types], params));
});
function file(params) {
  return _file(ZodFile, params);
}
var ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
  $ZodTransform.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => transformProcessor(inst, ctx, json2, params);
  inst._zod.parse = (payload, _ctx) => {
    if (_ctx.direction === "backward") {
      throw new $ZodEncodeError(inst.constructor.name);
    }
    payload.addIssue = (issue2) => {
      if (typeof issue2 === "string") {
        payload.issues.push(util_exports.issue(issue2, payload.value, def));
      } else {
        const _issue = issue2;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        _issue.input ?? (_issue.input = payload.value);
        _issue.inst ?? (_issue.inst = inst);
        payload.issues.push(util_exports.issue(_issue));
      }
    };
    const output = def.transform(payload.value, payload);
    if (output instanceof Promise) {
      return output.then((output2) => {
        payload.value = output2;
        return payload;
      });
    }
    payload.value = output;
    return payload;
  };
});
function transform(fn) {
  return new ZodTransform({
    type: "transform",
    transform: fn
  });
}
var ZodOptional = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => optionalProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
  return new ZodOptional({
    type: "optional",
    innerType
  });
}
var ZodExactOptional = /* @__PURE__ */ $constructor("ZodExactOptional", (inst, def) => {
  $ZodExactOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => optionalProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
  return new ZodExactOptional({
    type: "optional",
    innerType
  });
}
var ZodNullable = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
  $ZodNullable.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => nullableProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
  return new ZodNullable({
    type: "nullable",
    innerType
  });
}
function nullish2(innerType) {
  return optional(nullable(innerType));
}
var ZodDefault = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
  $ZodDefault.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => defaultProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeDefault = inst.unwrap;
});
function _default2(innerType, defaultValue) {
  return new ZodDefault({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : util_exports.shallowClone(defaultValue);
    }
  });
}
var ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
  $ZodPrefault.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => prefaultProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
  return new ZodPrefault({
    type: "prefault",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : util_exports.shallowClone(defaultValue);
    }
  });
}
var ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
  $ZodNonOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => nonoptionalProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
  return new ZodNonOptional({
    type: "nonoptional",
    innerType,
    ...util_exports.normalizeParams(params)
  });
}
var ZodSuccess = /* @__PURE__ */ $constructor("ZodSuccess", (inst, def) => {
  $ZodSuccess.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => successProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function success(innerType) {
  return new ZodSuccess({
    type: "success",
    innerType
  });
}
var ZodCatch = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
  $ZodCatch.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => catchProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeCatch = inst.unwrap;
});
function _catch2(innerType, catchValue) {
  return new ZodCatch({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
  });
}
var ZodNaN = /* @__PURE__ */ $constructor("ZodNaN", (inst, def) => {
  $ZodNaN.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => nanProcessor(inst, ctx, json2, params);
});
function nan(params) {
  return _nan(ZodNaN, params);
}
var ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
  $ZodPipe.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => pipeProcessor(inst, ctx, json2, params);
  inst.in = def.in;
  inst.out = def.out;
});
function pipe(in_, out) {
  return new ZodPipe({
    type: "pipe",
    in: in_,
    out
    // ...util.normalizeParams(params),
  });
}
var ZodCodec = /* @__PURE__ */ $constructor("ZodCodec", (inst, def) => {
  ZodPipe.init(inst, def);
  $ZodCodec.init(inst, def);
});
function codec(in_, out, params) {
  return new ZodCodec({
    type: "pipe",
    in: in_,
    out,
    transform: params.decode,
    reverseTransform: params.encode
  });
}
var ZodReadonly = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
  $ZodReadonly.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => readonlyProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
  return new ZodReadonly({
    type: "readonly",
    innerType
  });
}
var ZodTemplateLiteral = /* @__PURE__ */ $constructor("ZodTemplateLiteral", (inst, def) => {
  $ZodTemplateLiteral.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => templateLiteralProcessor(inst, ctx, json2, params);
});
function templateLiteral(parts, params) {
  return new ZodTemplateLiteral({
    type: "template_literal",
    parts,
    ...util_exports.normalizeParams(params)
  });
}
var ZodLazy = /* @__PURE__ */ $constructor("ZodLazy", (inst, def) => {
  $ZodLazy.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => lazyProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.getter();
});
function lazy(getter) {
  return new ZodLazy({
    type: "lazy",
    getter
  });
}
var ZodPromise = /* @__PURE__ */ $constructor("ZodPromise", (inst, def) => {
  $ZodPromise.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => promiseProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function promise(innerType) {
  return new ZodPromise({
    type: "promise",
    innerType
  });
}
var ZodFunction = /* @__PURE__ */ $constructor("ZodFunction", (inst, def) => {
  $ZodFunction.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => functionProcessor(inst, ctx, json2, params);
});
function _function(params) {
  return new ZodFunction({
    type: "function",
    input: Array.isArray(params?.input) ? tuple(params?.input) : params?.input ?? array(unknown()),
    output: params?.output ?? unknown()
  });
}
var ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
  $ZodCustom.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => customProcessor(inst, ctx, json2, params);
});
function check(fn) {
  const ch = new $ZodCheck({
    check: "custom"
    // ...util.normalizeParams(params),
  });
  ch._zod.check = fn;
  return ch;
}
function custom(fn, _params) {
  return _custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
  return _refine(ZodCustom, fn, _params);
}
function superRefine(fn) {
  return _superRefine(fn);
}
var describe2 = describe;
var meta2 = meta;
function _instanceof(cls, params = {}) {
  const inst = new ZodCustom({
    type: "custom",
    check: "custom",
    fn: (data) => data instanceof cls,
    abort: true,
    ...util_exports.normalizeParams(params)
  });
  inst._zod.bag.Class = cls;
  inst._zod.check = (payload) => {
    if (!(payload.value instanceof cls)) {
      payload.issues.push({
        code: "invalid_type",
        expected: cls.name,
        input: payload.value,
        inst,
        path: [...inst._zod.def.path ?? []]
      });
    }
  };
  return inst;
}
var stringbool = (...args) => _stringbool({
  Codec: ZodCodec,
  Boolean: ZodBoolean,
  String: ZodString
}, ...args);
function json(params) {
  const jsonSchema = lazy(() => {
    return union([string2(params), number2(), boolean2(), _null3(), array(jsonSchema), record(string2(), jsonSchema)]);
  });
  return jsonSchema;
}
function preprocess(fn, schema) {
  return pipe(transform(fn), schema);
}

// node_modules/zod/v4/classic/compat.js
var ZodIssueCode = {
  invalid_type: "invalid_type",
  too_big: "too_big",
  too_small: "too_small",
  invalid_format: "invalid_format",
  not_multiple_of: "not_multiple_of",
  unrecognized_keys: "unrecognized_keys",
  invalid_union: "invalid_union",
  invalid_key: "invalid_key",
  invalid_element: "invalid_element",
  invalid_value: "invalid_value",
  custom: "custom"
};
function setErrorMap(map2) {
  config2({
    customError: map2
  });
}
function getErrorMap() {
  return config2().customError;
}
var ZodFirstPartyTypeKind;
/* @__PURE__ */ (function(ZodFirstPartyTypeKind2) {
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));

// node_modules/zod/v4/classic/from-json-schema.js
var z = {
  ...schemas_exports2,
  ...checks_exports2,
  iso: iso_exports
};
var RECOGNIZED_KEYS = /* @__PURE__ */ new Set([
  // Schema identification
  "$schema",
  "$ref",
  "$defs",
  "definitions",
  // Core schema keywords
  "$id",
  "id",
  "$comment",
  "$anchor",
  "$vocabulary",
  "$dynamicRef",
  "$dynamicAnchor",
  // Type
  "type",
  "enum",
  "const",
  // Composition
  "anyOf",
  "oneOf",
  "allOf",
  "not",
  // Object
  "properties",
  "required",
  "additionalProperties",
  "patternProperties",
  "propertyNames",
  "minProperties",
  "maxProperties",
  // Array
  "items",
  "prefixItems",
  "additionalItems",
  "minItems",
  "maxItems",
  "uniqueItems",
  "contains",
  "minContains",
  "maxContains",
  // String
  "minLength",
  "maxLength",
  "pattern",
  "format",
  // Number
  "minimum",
  "maximum",
  "exclusiveMinimum",
  "exclusiveMaximum",
  "multipleOf",
  // Already handled metadata
  "description",
  "default",
  // Content
  "contentEncoding",
  "contentMediaType",
  "contentSchema",
  // Unsupported (error-throwing)
  "unevaluatedItems",
  "unevaluatedProperties",
  "if",
  "then",
  "else",
  "dependentSchemas",
  "dependentRequired",
  // OpenAPI
  "nullable",
  "readOnly"
]);
function detectVersion(schema, defaultTarget) {
  const $schema = schema.$schema;
  if ($schema === "https://json-schema.org/draft/2020-12/schema") {
    return "draft-2020-12";
  }
  if ($schema === "http://json-schema.org/draft-07/schema#") {
    return "draft-7";
  }
  if ($schema === "http://json-schema.org/draft-04/schema#") {
    return "draft-4";
  }
  return defaultTarget ?? "draft-2020-12";
}
function resolveRef(ref, ctx) {
  if (!ref.startsWith("#")) {
    throw new Error("External $ref is not supported, only local refs (#/...) are allowed");
  }
  const path3 = ref.slice(1).split("/").filter(Boolean);
  if (path3.length === 0) {
    return ctx.rootSchema;
  }
  const defsKey = ctx.version === "draft-2020-12" ? "$defs" : "definitions";
  if (path3[0] === defsKey) {
    const key = path3[1];
    if (!key || !ctx.defs[key]) {
      throw new Error(`Reference not found: ${ref}`);
    }
    return ctx.defs[key];
  }
  throw new Error(`Reference not found: ${ref}`);
}
function convertBaseSchema(schema, ctx) {
  if (schema.not !== void 0) {
    if (typeof schema.not === "object" && Object.keys(schema.not).length === 0) {
      return z.never();
    }
    throw new Error("not is not supported in Zod (except { not: {} } for never)");
  }
  if (schema.unevaluatedItems !== void 0) {
    throw new Error("unevaluatedItems is not supported");
  }
  if (schema.unevaluatedProperties !== void 0) {
    throw new Error("unevaluatedProperties is not supported");
  }
  if (schema.if !== void 0 || schema.then !== void 0 || schema.else !== void 0) {
    throw new Error("Conditional schemas (if/then/else) are not supported");
  }
  if (schema.dependentSchemas !== void 0 || schema.dependentRequired !== void 0) {
    throw new Error("dependentSchemas and dependentRequired are not supported");
  }
  if (schema.$ref) {
    const refPath = schema.$ref;
    if (ctx.refs.has(refPath)) {
      return ctx.refs.get(refPath);
    }
    if (ctx.processing.has(refPath)) {
      return z.lazy(() => {
        if (!ctx.refs.has(refPath)) {
          throw new Error(`Circular reference not resolved: ${refPath}`);
        }
        return ctx.refs.get(refPath);
      });
    }
    ctx.processing.add(refPath);
    const resolved = resolveRef(refPath, ctx);
    const zodSchema2 = convertSchema(resolved, ctx);
    ctx.refs.set(refPath, zodSchema2);
    ctx.processing.delete(refPath);
    return zodSchema2;
  }
  if (schema.enum !== void 0) {
    const enumValues = schema.enum;
    if (ctx.version === "openapi-3.0" && schema.nullable === true && enumValues.length === 1 && enumValues[0] === null) {
      return z.null();
    }
    if (enumValues.length === 0) {
      return z.never();
    }
    if (enumValues.length === 1) {
      return z.literal(enumValues[0]);
    }
    if (enumValues.every((v) => typeof v === "string")) {
      return z.enum(enumValues);
    }
    const literalSchemas = enumValues.map((v) => z.literal(v));
    if (literalSchemas.length < 2) {
      return literalSchemas[0];
    }
    return z.union([literalSchemas[0], literalSchemas[1], ...literalSchemas.slice(2)]);
  }
  if (schema.const !== void 0) {
    return z.literal(schema.const);
  }
  const type = schema.type;
  if (Array.isArray(type)) {
    const typeSchemas = type.map((t) => {
      const typeSchema = { ...schema, type: t };
      return convertBaseSchema(typeSchema, ctx);
    });
    if (typeSchemas.length === 0) {
      return z.never();
    }
    if (typeSchemas.length === 1) {
      return typeSchemas[0];
    }
    return z.union(typeSchemas);
  }
  if (!type) {
    return z.any();
  }
  let zodSchema;
  switch (type) {
    case "string": {
      let stringSchema = z.string();
      if (schema.format) {
        const format = schema.format;
        if (format === "email") {
          stringSchema = stringSchema.check(z.email());
        } else if (format === "uri" || format === "uri-reference") {
          stringSchema = stringSchema.check(z.url());
        } else if (format === "uuid" || format === "guid") {
          stringSchema = stringSchema.check(z.uuid());
        } else if (format === "date-time") {
          stringSchema = stringSchema.check(z.iso.datetime());
        } else if (format === "date") {
          stringSchema = stringSchema.check(z.iso.date());
        } else if (format === "time") {
          stringSchema = stringSchema.check(z.iso.time());
        } else if (format === "duration") {
          stringSchema = stringSchema.check(z.iso.duration());
        } else if (format === "ipv4") {
          stringSchema = stringSchema.check(z.ipv4());
        } else if (format === "ipv6") {
          stringSchema = stringSchema.check(z.ipv6());
        } else if (format === "mac") {
          stringSchema = stringSchema.check(z.mac());
        } else if (format === "cidr") {
          stringSchema = stringSchema.check(z.cidrv4());
        } else if (format === "cidr-v6") {
          stringSchema = stringSchema.check(z.cidrv6());
        } else if (format === "base64") {
          stringSchema = stringSchema.check(z.base64());
        } else if (format === "base64url") {
          stringSchema = stringSchema.check(z.base64url());
        } else if (format === "e164") {
          stringSchema = stringSchema.check(z.e164());
        } else if (format === "jwt") {
          stringSchema = stringSchema.check(z.jwt());
        } else if (format === "emoji") {
          stringSchema = stringSchema.check(z.emoji());
        } else if (format === "nanoid") {
          stringSchema = stringSchema.check(z.nanoid());
        } else if (format === "cuid") {
          stringSchema = stringSchema.check(z.cuid());
        } else if (format === "cuid2") {
          stringSchema = stringSchema.check(z.cuid2());
        } else if (format === "ulid") {
          stringSchema = stringSchema.check(z.ulid());
        } else if (format === "xid") {
          stringSchema = stringSchema.check(z.xid());
        } else if (format === "ksuid") {
          stringSchema = stringSchema.check(z.ksuid());
        }
      }
      if (typeof schema.minLength === "number") {
        stringSchema = stringSchema.min(schema.minLength);
      }
      if (typeof schema.maxLength === "number") {
        stringSchema = stringSchema.max(schema.maxLength);
      }
      if (schema.pattern) {
        stringSchema = stringSchema.regex(new RegExp(schema.pattern));
      }
      zodSchema = stringSchema;
      break;
    }
    case "number":
    case "integer": {
      let numberSchema = type === "integer" ? z.number().int() : z.number();
      if (typeof schema.minimum === "number") {
        numberSchema = numberSchema.min(schema.minimum);
      }
      if (typeof schema.maximum === "number") {
        numberSchema = numberSchema.max(schema.maximum);
      }
      if (typeof schema.exclusiveMinimum === "number") {
        numberSchema = numberSchema.gt(schema.exclusiveMinimum);
      } else if (schema.exclusiveMinimum === true && typeof schema.minimum === "number") {
        numberSchema = numberSchema.gt(schema.minimum);
      }
      if (typeof schema.exclusiveMaximum === "number") {
        numberSchema = numberSchema.lt(schema.exclusiveMaximum);
      } else if (schema.exclusiveMaximum === true && typeof schema.maximum === "number") {
        numberSchema = numberSchema.lt(schema.maximum);
      }
      if (typeof schema.multipleOf === "number") {
        numberSchema = numberSchema.multipleOf(schema.multipleOf);
      }
      zodSchema = numberSchema;
      break;
    }
    case "boolean": {
      zodSchema = z.boolean();
      break;
    }
    case "null": {
      zodSchema = z.null();
      break;
    }
    case "object": {
      const shape = {};
      const properties = schema.properties || {};
      const requiredSet = new Set(schema.required || []);
      for (const [key, propSchema] of Object.entries(properties)) {
        const propZodSchema = convertSchema(propSchema, ctx);
        shape[key] = requiredSet.has(key) ? propZodSchema : propZodSchema.optional();
      }
      if (schema.propertyNames) {
        const keySchema = convertSchema(schema.propertyNames, ctx);
        const valueSchema = schema.additionalProperties && typeof schema.additionalProperties === "object" ? convertSchema(schema.additionalProperties, ctx) : z.any();
        if (Object.keys(shape).length === 0) {
          zodSchema = z.record(keySchema, valueSchema);
          break;
        }
        const objectSchema2 = z.object(shape).passthrough();
        const recordSchema = z.looseRecord(keySchema, valueSchema);
        zodSchema = z.intersection(objectSchema2, recordSchema);
        break;
      }
      if (schema.patternProperties) {
        const patternProps = schema.patternProperties;
        const patternKeys = Object.keys(patternProps);
        const looseRecords = [];
        for (const pattern of patternKeys) {
          const patternValue = convertSchema(patternProps[pattern], ctx);
          const keySchema = z.string().regex(new RegExp(pattern));
          looseRecords.push(z.looseRecord(keySchema, patternValue));
        }
        const schemasToIntersect = [];
        if (Object.keys(shape).length > 0) {
          schemasToIntersect.push(z.object(shape).passthrough());
        }
        schemasToIntersect.push(...looseRecords);
        if (schemasToIntersect.length === 0) {
          zodSchema = z.object({}).passthrough();
        } else if (schemasToIntersect.length === 1) {
          zodSchema = schemasToIntersect[0];
        } else {
          let result = z.intersection(schemasToIntersect[0], schemasToIntersect[1]);
          for (let i = 2; i < schemasToIntersect.length; i++) {
            result = z.intersection(result, schemasToIntersect[i]);
          }
          zodSchema = result;
        }
        break;
      }
      const objectSchema = z.object(shape);
      if (schema.additionalProperties === false) {
        zodSchema = objectSchema.strict();
      } else if (typeof schema.additionalProperties === "object") {
        zodSchema = objectSchema.catchall(convertSchema(schema.additionalProperties, ctx));
      } else {
        zodSchema = objectSchema.passthrough();
      }
      break;
    }
    case "array": {
      const prefixItems = schema.prefixItems;
      const items = schema.items;
      if (prefixItems && Array.isArray(prefixItems)) {
        const tupleItems = prefixItems.map((item) => convertSchema(item, ctx));
        const rest = items && typeof items === "object" && !Array.isArray(items) ? convertSchema(items, ctx) : void 0;
        if (rest) {
          zodSchema = z.tuple(tupleItems).rest(rest);
        } else {
          zodSchema = z.tuple(tupleItems);
        }
        if (typeof schema.minItems === "number") {
          zodSchema = zodSchema.check(z.minLength(schema.minItems));
        }
        if (typeof schema.maxItems === "number") {
          zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
        }
      } else if (Array.isArray(items)) {
        const tupleItems = items.map((item) => convertSchema(item, ctx));
        const rest = schema.additionalItems && typeof schema.additionalItems === "object" ? convertSchema(schema.additionalItems, ctx) : void 0;
        if (rest) {
          zodSchema = z.tuple(tupleItems).rest(rest);
        } else {
          zodSchema = z.tuple(tupleItems);
        }
        if (typeof schema.minItems === "number") {
          zodSchema = zodSchema.check(z.minLength(schema.minItems));
        }
        if (typeof schema.maxItems === "number") {
          zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
        }
      } else if (items !== void 0) {
        const element = convertSchema(items, ctx);
        let arraySchema = z.array(element);
        if (typeof schema.minItems === "number") {
          arraySchema = arraySchema.min(schema.minItems);
        }
        if (typeof schema.maxItems === "number") {
          arraySchema = arraySchema.max(schema.maxItems);
        }
        zodSchema = arraySchema;
      } else {
        zodSchema = z.array(z.any());
      }
      break;
    }
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
  if (schema.description) {
    zodSchema = zodSchema.describe(schema.description);
  }
  if (schema.default !== void 0) {
    zodSchema = zodSchema.default(schema.default);
  }
  return zodSchema;
}
function convertSchema(schema, ctx) {
  if (typeof schema === "boolean") {
    return schema ? z.any() : z.never();
  }
  let baseSchema = convertBaseSchema(schema, ctx);
  const hasExplicitType = schema.type || schema.enum !== void 0 || schema.const !== void 0;
  if (schema.anyOf && Array.isArray(schema.anyOf)) {
    const options = schema.anyOf.map((s) => convertSchema(s, ctx));
    const anyOfUnion = z.union(options);
    baseSchema = hasExplicitType ? z.intersection(baseSchema, anyOfUnion) : anyOfUnion;
  }
  if (schema.oneOf && Array.isArray(schema.oneOf)) {
    const options = schema.oneOf.map((s) => convertSchema(s, ctx));
    const oneOfUnion = z.xor(options);
    baseSchema = hasExplicitType ? z.intersection(baseSchema, oneOfUnion) : oneOfUnion;
  }
  if (schema.allOf && Array.isArray(schema.allOf)) {
    if (schema.allOf.length === 0) {
      baseSchema = hasExplicitType ? baseSchema : z.any();
    } else {
      let result = hasExplicitType ? baseSchema : convertSchema(schema.allOf[0], ctx);
      const startIdx = hasExplicitType ? 0 : 1;
      for (let i = startIdx; i < schema.allOf.length; i++) {
        result = z.intersection(result, convertSchema(schema.allOf[i], ctx));
      }
      baseSchema = result;
    }
  }
  if (schema.nullable === true && ctx.version === "openapi-3.0") {
    baseSchema = z.nullable(baseSchema);
  }
  if (schema.readOnly === true) {
    baseSchema = z.readonly(baseSchema);
  }
  const extraMeta = {};
  const coreMetadataKeys = ["$id", "id", "$comment", "$anchor", "$vocabulary", "$dynamicRef", "$dynamicAnchor"];
  for (const key of coreMetadataKeys) {
    if (key in schema) {
      extraMeta[key] = schema[key];
    }
  }
  const contentMetadataKeys = ["contentEncoding", "contentMediaType", "contentSchema"];
  for (const key of contentMetadataKeys) {
    if (key in schema) {
      extraMeta[key] = schema[key];
    }
  }
  for (const key of Object.keys(schema)) {
    if (!RECOGNIZED_KEYS.has(key)) {
      extraMeta[key] = schema[key];
    }
  }
  if (Object.keys(extraMeta).length > 0) {
    ctx.registry.add(baseSchema, extraMeta);
  }
  return baseSchema;
}
function fromJSONSchema(schema, params) {
  if (typeof schema === "boolean") {
    return schema ? z.any() : z.never();
  }
  const version2 = detectVersion(schema, params?.defaultTarget);
  const defs = schema.$defs || schema.definitions || {};
  const ctx = {
    version: version2,
    defs,
    refs: /* @__PURE__ */ new Map(),
    processing: /* @__PURE__ */ new Set(),
    rootSchema: schema,
    registry: params?.registry ?? globalRegistry
  };
  return convertSchema(schema, ctx);
}

// node_modules/zod/v4/classic/coerce.js
var coerce_exports = {};
__export(coerce_exports, {
  bigint: () => bigint3,
  boolean: () => boolean3,
  date: () => date4,
  number: () => number3,
  string: () => string3
});
function string3(params) {
  return _coercedString(ZodString, params);
}
function number3(params) {
  return _coercedNumber(ZodNumber, params);
}
function boolean3(params) {
  return _coercedBoolean(ZodBoolean, params);
}
function bigint3(params) {
  return _coercedBigint(ZodBigInt, params);
}
function date4(params) {
  return _coercedDate(ZodDate, params);
}

// node_modules/zod/v4/classic/external.js
config2(en_default());

// src/module/service/Service.interface.ts
var packageFeatureSchema = external_exports.object({
  text: external_exports.string().trim().min(1, "Feature text is required"),
  sortOrder: external_exports.number().int().optional().default(0)
});
var servicePackageSchema = external_exports.object({
  name: external_exports.string().trim().min(1, "Package name is required"),
  price: external_exports.number().positive("Price must be positive"),
  description: external_exports.string().trim().min(1, "Description is required"),
  deliveryDays: external_exports.number().int().positive("Delivery days must be positive"),
  revisions: external_exports.number().int().min(0, "Revisions must be 0 or more"),
  sortOrder: external_exports.number().int().optional().default(0),
  features: external_exports.array(packageFeatureSchema).optional().default([])
});
var serviceFeatureSchema = external_exports.object({
  text: external_exports.string().trim().min(1, "Feature text is required"),
  sortOrder: external_exports.number().int().optional().default(0)
});
var relatedPostSchema = external_exports.object({
  title: external_exports.string().trim().min(1, "Title is required"),
  description: external_exports.string().trim().min(1, "Description is required"),
  category: external_exports.string().trim().min(1, "Category is required"),
  image: external_exports.string().trim().min(1, "Image URL is required"),
  href: external_exports.string().trim().min(1, "Link is required"),
  sortOrder: external_exports.number().int().optional().default(0)
});
var createServiceSchema = external_exports.object({
  slug: external_exports.string().trim().min(1, "Slug is required").max(100, "Slug is too long").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  title: external_exports.string().trim().min(1, "Title is required").max(200, "Title is too long"),
  description: external_exports.string().trim().min(1, "Description is required"),
  longDescription: external_exports.string().trim().optional(),
  icon: external_exports.string().trim().optional(),
  image: external_exports.string().trim().optional(),
  tag: external_exports.string().trim().optional(),
  projects: external_exports.string().trim().optional(),
  isActive: external_exports.boolean().optional().default(true),
  sortOrder: external_exports.number().int().optional().default(0),
  features: external_exports.array(serviceFeatureSchema).optional().default([]),
  packages: external_exports.array(servicePackageSchema).optional().default([]),
  relatedPosts: external_exports.array(relatedPostSchema).optional().default([])
});
var updateServiceSchema = createServiceSchema.partial();

// src/module/service/Service.service.ts
var serviceInclude = {
  features: {
    orderBy: { sortOrder: "asc" }
  },
  packages: {
    orderBy: { sortOrder: "asc" },
    include: {
      features: {
        orderBy: { sortOrder: "asc" }
      }
    }
  },
  relatedPosts: {
    orderBy: { sortOrder: "asc" }
  },
  _count: {
    select: {
      featuredItems: true
    }
  }
};
var getAllServicesFromDB = async (includeInactive = false) => {
  return prisma.service.findMany({
    where: includeInactive ? {} : { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: serviceInclude
  });
};
var getServiceBySlugFromDB = async (slug) => {
  const service = await prisma.service.findUnique({
    where: { slug },
    include: {
      ...serviceInclude,
      featuredItems: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        select: {
          id: true,
          slug: true,
          title: true,
          shortDescription: true,
          category: true,
          image: true,
          rating: true,
          reviews: true
        }
      }
    }
  });
  if (!service) {
    throw new AppError(404, "Service not found", "SERVICE_NOT_FOUND");
  }
  return service;
};
var createServiceIntoDB = async (user, payload) => {
  if (!user?.id || user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Only admin can create service", "FORBIDDEN");
  }
  const existing = await prisma.service.findUnique({
    where: { slug: payload.slug }
  });
  if (existing) {
    throw new AppError(
      400,
      "Service with this slug already exists",
      "SLUG_EXISTS"
    );
  }
  return prisma.service.create({
    data: {
      slug: payload.slug,
      title: payload.title,
      description: payload.description,
      longDescription: payload.longDescription || null,
      icon: payload.icon || null,
      image: payload.image || null,
      tag: payload.tag || null,
      projects: payload.projects || null,
      isActive: payload.isActive ?? true,
      sortOrder: payload.sortOrder ?? 0,
      features: {
        create: payload.features.map((f, i) => ({
          text: f.text,
          sortOrder: f.sortOrder ?? i
        }))
      },
      packages: {
        create: payload.packages.map((pkg, i) => ({
          name: pkg.name,
          price: pkg.price,
          description: pkg.description,
          deliveryDays: pkg.deliveryDays,
          revisions: pkg.revisions,
          sortOrder: pkg.sortOrder ?? i,
          features: {
            create: pkg.features.map((f, j) => ({
              text: f.text,
              sortOrder: f.sortOrder ?? j
            }))
          }
        }))
      },
      relatedPosts: {
        create: payload.relatedPosts.map((post, i) => ({
          title: post.title,
          description: post.description,
          category: post.category,
          image: post.image,
          href: post.href,
          sortOrder: post.sortOrder ?? i
        }))
      }
    },
    include: serviceInclude
  });
};
var updateServiceIntoDB = async (user, serviceId, payload) => {
  if (!user?.id || user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Only admin can update service", "FORBIDDEN");
  }
  const service = await prisma.service.findUnique({
    where: { id: serviceId }
  });
  if (!service) {
    throw new AppError(404, "Service not found", "SERVICE_NOT_FOUND");
  }
  if (payload.slug && payload.slug !== service.slug) {
    const slugExists = await prisma.service.findUnique({
      where: { slug: payload.slug }
    });
    if (slugExists) {
      throw new AppError(
        400,
        "Service with this slug already exists",
        "SLUG_EXISTS"
      );
    }
  }
  return prisma.$transaction(async (tx) => {
    const updated = await tx.service.update({
      where: { id: serviceId },
      data: {
        ...payload.slug !== void 0 && { slug: payload.slug },
        ...payload.title !== void 0 && { title: payload.title },
        ...payload.description !== void 0 && {
          description: payload.description
        },
        ...payload.longDescription !== void 0 && {
          longDescription: payload.longDescription
        },
        ...payload.icon !== void 0 && { icon: payload.icon },
        ...payload.image !== void 0 && { image: payload.image },
        ...payload.tag !== void 0 && { tag: payload.tag },
        ...payload.projects !== void 0 && { projects: payload.projects },
        ...payload.isActive !== void 0 && { isActive: payload.isActive },
        ...payload.sortOrder !== void 0 && {
          sortOrder: payload.sortOrder
        }
      }
    });
    if (payload.features) {
      await tx.serviceFeature.deleteMany({
        where: { serviceId }
      });
      await tx.serviceFeature.createMany({
        data: payload.features.map((f, i) => ({
          serviceId,
          text: f.text,
          sortOrder: f.sortOrder ?? i
        }))
      });
    }
    if (payload.packages) {
      const oldPackages = await tx.servicePackage.findMany({
        where: { serviceId },
        select: { id: true }
      });
      for (const pkg of oldPackages) {
        await tx.packageFeature.deleteMany({
          where: { packageId: pkg.id }
        });
      }
      await tx.servicePackage.deleteMany({
        where: { serviceId }
      });
      for (let i = 0; i < payload.packages.length; i++) {
        const pkg = payload.packages[i];
        await tx.servicePackage.create({
          data: {
            serviceId,
            name: pkg.name,
            price: pkg.price,
            description: pkg.description,
            deliveryDays: pkg.deliveryDays,
            revisions: pkg.revisions,
            sortOrder: pkg.sortOrder ?? i,
            features: {
              create: pkg.features.map((f, j) => ({
                text: f.text,
                sortOrder: f.sortOrder ?? j
              }))
            }
          }
        });
      }
    }
    if (payload.relatedPosts) {
      await tx.serviceRelatedPost.deleteMany({
        where: { serviceId }
      });
      await tx.serviceRelatedPost.createMany({
        data: payload.relatedPosts.map((post, i) => ({
          serviceId,
          title: post.title,
          description: post.description,
          category: post.category,
          image: post.image,
          href: post.href,
          sortOrder: post.sortOrder ?? i
        }))
      });
    }
    return tx.service.findUnique({
      where: { id: serviceId },
      include: serviceInclude
    });
  });
};
var deleteServiceFromDB = async (user, serviceId) => {
  if (!user?.id || user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Only admin can delete service", "FORBIDDEN");
  }
  const service = await prisma.service.findUnique({
    where: { id: serviceId }
  });
  if (!service) {
    throw new AppError(404, "Service not found", "SERVICE_NOT_FOUND");
  }
  return prisma.service.delete({
    where: { id: serviceId }
  });
};
var ServiceService = {
  getAllServicesFromDB,
  getServiceBySlugFromDB,
  createServiceIntoDB,
  updateServiceIntoDB,
  deleteServiceFromDB
};

// src/module/service/Service.controller.ts
var getAllServices = catchAsync_default(async (req, res) => {
  const includeInactive = req.query.includeInactive === "true";
  const result = await ServiceService.getAllServicesFromDB(includeInactive);
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Services retrieved successfully",
    data: result
  });
});
var getServiceBySlug = catchAsync_default(async (req, res) => {
  const result = await ServiceService.getServiceBySlugFromDB(
    req.params.slug
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Service retrieved successfully",
    data: result
  });
});
var createService = catchAsync_default(async (req, res) => {
  const parsed = createServiceSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(
      400,
      parsed.error.issues.map((e) => e.message).join(", "),
      "VALIDATION_ERROR"
    );
  }
  const result = await ServiceService.createServiceIntoDB(
    req.user,
    parsed.data
  );
  sendResponse_default(res, {
    statusCode: 201,
    success: true,
    message: "Service created successfully",
    data: result
  });
});
var updateService = catchAsync_default(async (req, res) => {
  const parsed = updateServiceSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(
      400,
      parsed.error.issues.map((e) => e.message).join(", "),
      "VALIDATION_ERROR"
    );
  }
  const result = await ServiceService.updateServiceIntoDB(
    req.user,
    req.params.id,
    parsed.data
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Service updated successfully",
    data: result
  });
});
var deleteService = catchAsync_default(async (req, res) => {
  const result = await ServiceService.deleteServiceFromDB(
    req.user,
    req.params.id
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Service deleted successfully",
    data: result
  });
});
var ServiceController = {
  getAllServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService
};

// src/module/service/Service.route.ts
var router10 = Router10();
router10.get("/", ServiceController.getAllServices);
router10.get("/:slug", ServiceController.getServiceBySlug);
router10.post("/", auth_guard_default("ADMIN"), ServiceController.createService);
router10.patch("/:id", auth_guard_default("ADMIN"), ServiceController.updateService);
router10.delete("/:id", auth_guard_default("ADMIN"), ServiceController.deleteService);
var ServiceRoutes = router10;

// src/module/Featureditem/Featureditem.route.ts
import { Router as Router11 } from "express";

// src/module/Featureditem/Featureditem.service.ts
var featuredItemInclude = {
  service: {
    select: {
      id: true,
      slug: true,
      title: true
    }
  },
  features: {
    orderBy: { sortOrder: "asc" }
  },
  technologies: true,
  packages: {
    orderBy: { sortOrder: "asc" },
    include: {
      features: {
        orderBy: { sortOrder: "asc" }
      }
    }
  },
  images: {
    orderBy: { sortOrder: "asc" }
  }
};
var getAllFeaturedItemsFromDB = async (serviceId, includeInactive = false) => {
  return prisma.featuredItem.findMany({
    where: {
      ...includeInactive ? {} : { isActive: true },
      ...serviceId ? { serviceId } : {}
    },
    orderBy: { sortOrder: "asc" },
    include: featuredItemInclude
  });
};
var getFeaturedItemBySlugFromDB = async (slug) => {
  const item = await prisma.featuredItem.findUnique({
    where: { slug },
    include: featuredItemInclude
  });
  if (!item) {
    throw new AppError(
      404,
      "Featured item not found",
      "FEATURED_ITEM_NOT_FOUND"
    );
  }
  return item;
};
var createFeaturedItemIntoDB = async (user, payload) => {
  if (!user?.id || user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Only admin can create featured item", "FORBIDDEN");
  }
  const existing = await prisma.featuredItem.findUnique({
    where: { slug: payload.slug }
  });
  if (existing) {
    throw new AppError(
      400,
      "Featured item with this slug already exists",
      "SLUG_EXISTS"
    );
  }
  if (payload.serviceId) {
    const service = await prisma.service.findUnique({
      where: { id: payload.serviceId }
    });
    if (!service) {
      throw new AppError(404, "Service not found", "SERVICE_NOT_FOUND");
    }
  }
  return prisma.featuredItem.create({
    data: {
      slug: payload.slug,
      serviceId: payload.serviceId || null,
      title: payload.title,
      shortDescription: payload.shortDescription,
      description: payload.description,
      longDescription: payload.longDescription || null,
      category: payload.category,
      image: payload.image,
      overview: payload.overview,
      challenge: payload.challenge,
      solution: payload.solution,
      result: payload.result,
      rating: payload.rating ?? null,
      reviews: payload.reviews ?? null,
      isActive: payload.isActive ?? true,
      sortOrder: payload.sortOrder ?? 0,
      features: {
        create: payload.features.map((f, i) => ({
          text: f.text,
          sortOrder: f.sortOrder ?? i
        }))
      },
      technologies: {
        create: payload.technologies.map((t) => ({
          name: t.name
        }))
      },
      packages: {
        create: payload.packages.map((pkg, i) => ({
          name: pkg.name,
          price: pkg.price,
          description: pkg.description,
          deliveryDays: pkg.deliveryDays,
          revisions: pkg.revisions,
          sortOrder: pkg.sortOrder ?? i,
          features: {
            create: pkg.features.map((f, j) => ({
              text: f.text,
              sortOrder: f.sortOrder ?? j
            }))
          }
        }))
      },
      images: {
        create: payload.images.map((img, i) => ({
          url: img.url,
          sortOrder: img.sortOrder ?? i
        }))
      }
    },
    include: featuredItemInclude
  });
};
var updateFeaturedItemIntoDB = async (user, itemId, payload) => {
  if (!user?.id || user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Only admin can update featured item", "FORBIDDEN");
  }
  const item = await prisma.featuredItem.findUnique({
    where: { id: itemId }
  });
  if (!item) {
    throw new AppError(
      404,
      "Featured item not found",
      "FEATURED_ITEM_NOT_FOUND"
    );
  }
  if (payload.slug && payload.slug !== item.slug) {
    const slugExists = await prisma.featuredItem.findUnique({
      where: { slug: payload.slug }
    });
    if (slugExists) {
      throw new AppError(
        400,
        "Featured item with this slug already exists",
        "SLUG_EXISTS"
      );
    }
  }
  if (payload.serviceId) {
    const service = await prisma.service.findUnique({
      where: { id: payload.serviceId }
    });
    if (!service) {
      throw new AppError(404, "Service not found", "SERVICE_NOT_FOUND");
    }
  }
  return prisma.$transaction(async (tx) => {
    await tx.featuredItem.update({
      where: { id: itemId },
      data: {
        ...payload.slug !== void 0 && { slug: payload.slug },
        ...payload.serviceId !== void 0 && {
          serviceId: payload.serviceId || null
        },
        ...payload.title !== void 0 && { title: payload.title },
        ...payload.shortDescription !== void 0 && {
          shortDescription: payload.shortDescription
        },
        ...payload.description !== void 0 && {
          description: payload.description
        },
        ...payload.longDescription !== void 0 && {
          longDescription: payload.longDescription
        },
        ...payload.category !== void 0 && { category: payload.category },
        ...payload.image !== void 0 && { image: payload.image },
        ...payload.overview !== void 0 && { overview: payload.overview },
        ...payload.challenge !== void 0 && {
          challenge: payload.challenge
        },
        ...payload.solution !== void 0 && { solution: payload.solution },
        ...payload.result !== void 0 && { result: payload.result },
        ...payload.rating !== void 0 && { rating: payload.rating },
        ...payload.reviews !== void 0 && { reviews: payload.reviews },
        ...payload.isActive !== void 0 && { isActive: payload.isActive },
        ...payload.sortOrder !== void 0 && {
          sortOrder: payload.sortOrder
        }
      }
    });
    if (payload.features) {
      await tx.featuredItemFeature.deleteMany({
        where: { featuredItemId: itemId }
      });
      await tx.featuredItemFeature.createMany({
        data: payload.features.map((f, i) => ({
          featuredItemId: itemId,
          text: f.text,
          sortOrder: f.sortOrder ?? i
        }))
      });
    }
    if (payload.technologies) {
      await tx.featuredItemTech.deleteMany({
        where: { featuredItemId: itemId }
      });
      await tx.featuredItemTech.createMany({
        data: payload.technologies.map((t) => ({
          featuredItemId: itemId,
          name: t.name
        }))
      });
    }
    if (payload.packages) {
      const oldPackages = await tx.featuredItemPackage.findMany({
        where: { featuredItemId: itemId },
        select: { id: true }
      });
      for (const pkg of oldPackages) {
        await tx.featuredItemPackageFeature.deleteMany({
          where: { packageId: pkg.id }
        });
      }
      await tx.featuredItemPackage.deleteMany({
        where: { featuredItemId: itemId }
      });
      for (let i = 0; i < payload.packages.length; i++) {
        const pkg = payload.packages[i];
        await tx.featuredItemPackage.create({
          data: {
            featuredItemId: itemId,
            name: pkg.name,
            price: pkg.price,
            description: pkg.description,
            deliveryDays: pkg.deliveryDays,
            revisions: pkg.revisions,
            sortOrder: pkg.sortOrder ?? i,
            features: {
              create: pkg.features.map((f, j) => ({
                text: f.text,
                sortOrder: f.sortOrder ?? j
              }))
            }
          }
        });
      }
    }
    if (payload.images) {
      await tx.featuredItemImage.deleteMany({
        where: { featuredItemId: itemId }
      });
      await tx.featuredItemImage.createMany({
        data: payload.images.map((img, i) => ({
          featuredItemId: itemId,
          url: img.url,
          sortOrder: img.sortOrder ?? i
        }))
      });
    }
    return tx.featuredItem.findUnique({
      where: { id: itemId },
      include: featuredItemInclude
    });
  });
};
var deleteFeaturedItemFromDB = async (user, itemId) => {
  if (!user?.id || user.role !== UserRole.ADMIN) {
    throw new AppError(403, "Only admin can delete featured item", "FORBIDDEN");
  }
  const item = await prisma.featuredItem.findUnique({
    where: { id: itemId }
  });
  if (!item) {
    throw new AppError(
      404,
      "Featured item not found",
      "FEATURED_ITEM_NOT_FOUND"
    );
  }
  return prisma.featuredItem.delete({
    where: { id: itemId }
  });
};
var FeaturedItemService = {
  getAllFeaturedItemsFromDB,
  getFeaturedItemBySlugFromDB,
  createFeaturedItemIntoDB,
  updateFeaturedItemIntoDB,
  deleteFeaturedItemFromDB
};

// src/module/Featureditem/Featureditem.interface.ts
var featuredItemImageSchema = external_exports.object({
  url: external_exports.string().trim().min(1, "Image URL is required"),
  sortOrder: external_exports.number().int().optional().default(0)
});
var featuredItemFeatureSchema = external_exports.object({
  text: external_exports.string().trim().min(1, "Feature text is required"),
  sortOrder: external_exports.number().int().optional().default(0)
});
var featuredItemTechSchema = external_exports.object({
  name: external_exports.string().trim().min(1, "Technology name is required")
});
var packageFeatureSchema2 = external_exports.object({
  text: external_exports.string().trim().min(1, "Feature text is required"),
  sortOrder: external_exports.number().int().optional().default(0)
});
var featuredItemPackageSchema = external_exports.object({
  name: external_exports.string().trim().min(1, "Package name is required"),
  price: external_exports.number().positive("Price must be positive"),
  description: external_exports.string().trim().min(1, "Description is required"),
  deliveryDays: external_exports.number().int().positive("Delivery days must be positive"),
  revisions: external_exports.number().int().min(0, "Revisions must be 0 or more"),
  sortOrder: external_exports.number().int().optional().default(0),
  features: external_exports.array(packageFeatureSchema2).optional().default([])
});
var createFeaturedItemSchema = external_exports.object({
  slug: external_exports.string().trim().min(1, "Slug is required").max(150, "Slug is too long").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  serviceId: external_exports.string().trim().optional(),
  title: external_exports.string().trim().min(1, "Title is required").max(300, "Title is too long"),
  shortDescription: external_exports.string().trim().min(1, "Short description is required"),
  description: external_exports.string().trim().min(1, "Description is required"),
  longDescription: external_exports.string().trim().optional(),
  category: external_exports.string().trim().min(1, "Category is required"),
  image: external_exports.string().trim().min(1, "Image URL is required"),
  overview: external_exports.string().trim().min(1, "Overview is required"),
  challenge: external_exports.string().trim().min(1, "Challenge is required"),
  solution: external_exports.string().trim().min(1, "Solution is required"),
  result: external_exports.string().trim().min(1, "Result is required"),
  rating: external_exports.number().min(0).max(5).optional(),
  reviews: external_exports.number().int().min(0).optional(),
  isActive: external_exports.boolean().optional().default(true),
  sortOrder: external_exports.number().int().optional().default(0),
  features: external_exports.array(featuredItemFeatureSchema).optional().default([]),
  technologies: external_exports.array(featuredItemTechSchema).optional().default([]),
  packages: external_exports.array(featuredItemPackageSchema).optional().default([]),
  images: external_exports.array(featuredItemImageSchema).optional().default([])
});
var updateFeaturedItemSchema = createFeaturedItemSchema.partial();

// src/module/Featureditem/Featureditem.controller.ts
var getAllFeaturedItems = catchAsync_default(async (req, res) => {
  const serviceId = req.query.serviceId;
  const includeInactive = req.query.includeInactive === "true";
  const result = await FeaturedItemService.getAllFeaturedItemsFromDB(
    serviceId,
    includeInactive
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Featured items retrieved successfully",
    data: result
  });
});
var getFeaturedItemBySlug = catchAsync_default(
  async (req, res) => {
    const result = await FeaturedItemService.getFeaturedItemBySlugFromDB(
      req.params.slug
    );
    sendResponse_default(res, {
      statusCode: 200,
      success: true,
      message: "Featured item retrieved successfully",
      data: result
    });
  }
);
var createFeaturedItem = catchAsync_default(async (req, res) => {
  const parsed = createFeaturedItemSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(
      400,
      parsed.error.issues.map((e) => e.message).join(", "),
      "VALIDATION_ERROR"
    );
  }
  const result = await FeaturedItemService.createFeaturedItemIntoDB(
    req.user,
    parsed.data
  );
  sendResponse_default(res, {
    statusCode: 201,
    success: true,
    message: "Featured item created successfully",
    data: result
  });
});
var updateFeaturedItem = catchAsync_default(async (req, res) => {
  const parsed = updateFeaturedItemSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(
      400,
      parsed.error.issues.map((e) => e.message).join(", "),
      "VALIDATION_ERROR"
    );
  }
  const result = await FeaturedItemService.updateFeaturedItemIntoDB(
    req.user,
    req.params.id,
    parsed.data
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Featured item updated successfully",
    data: result
  });
});
var deleteFeaturedItem = catchAsync_default(async (req, res) => {
  const result = await FeaturedItemService.deleteFeaturedItemFromDB(
    req.user,
    req.params.id
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Featured item deleted successfully",
    data: result
  });
});
var FeaturedItemController = {
  getAllFeaturedItems,
  getFeaturedItemBySlug,
  createFeaturedItem,
  updateFeaturedItem,
  deleteFeaturedItem
};

// src/module/Featureditem/Featureditem.route.ts
var router11 = Router11();
router11.get("/", FeaturedItemController.getAllFeaturedItems);
router11.get("/:slug", FeaturedItemController.getFeaturedItemBySlug);
router11.post("/", auth_guard_default("ADMIN"), FeaturedItemController.createFeaturedItem);
router11.patch(
  "/:id",
  auth_guard_default("ADMIN"),
  FeaturedItemController.updateFeaturedItem
);
router11.delete(
  "/:id",
  auth_guard_default("ADMIN"),
  FeaturedItemController.deleteFeaturedItem
);
var FeaturedItemRoutes = router11;

// src/routes/index.ts
var router12 = Router12();
var moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes
  },
  {
    path: "/messages",
    route: MessageRoutes
  },
  {
    path: "/offers",
    route: OfferRoutes
  },
  {
    path: "/projects",
    route: ProjectRoutes
  },
  {
    path: "/project-updates",
    route: ProjectUpdateRoutes
  },
  {
    path: "/attachments",
    route: AttachmentRoutes
  },
  {
    path: "/notifications",
    route: NotificationRoutes
  },
  {
    path: "/public-messages",
    route: PublicMessageRoutes
  },
  {
    path: "/payment",
    route: PaymentWebhookRoutes
  },
  {
    path: "/services",
    route: ServiceRoutes
  },
  {
    path: "/featured-items",
    route: FeaturedItemRoutes
  }
];
moduleRoutes.forEach((route) => router12.use(route.path, route.route));
var routes_default = router12;

// src/app.ts
import { toNodeHandler } from "better-auth/node";
var app = express2();
app.use(
  "/api/v1/payment/stripe-webhook",
  express2.raw({ type: "application/json" })
);
app.use(express2.json());
app.use(express2.urlencoded({ extended: true }));
app.set("trust proxy", true);
app.use(
  cors({
    origin: env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "\u{1F680} Server is running..."
  });
});
app.use("/api/v1", routes_default);
app.use(notFound_default);
app.use(globalErrorHandler_default);
var app_default = app;

// src/server.ts
import { Server } from "socket.io";
var PORT = env.PORT || 5e3;
var httpServer = http.createServer(app_default);
var io = new Server(httpServer, {
  cors: {
    origin: env.FRONTEND_URL,
    credentials: true
  }
});
io.on("connection", (socket) => {
  console.log("\u{1F50C} User connected:", socket.id);
  socket.on("join", (userId) => {
    if (!userId) return;
    socket.join(`user:${userId}`);
    console.log(`\u{1F464} User joined room: user:${userId}`);
  });
  socket.on(
    "join_project",
    (payload) => {
      if (!payload?.projectId) return;
      if (payload.conversationType) {
        socket.join(`project:${payload.projectId}:${payload.conversationType}`);
        console.log(
          `\u{1F4C1} Joined project room: project:${payload.projectId}:${payload.conversationType}`
        );
        return;
      }
      socket.join(`project:${payload.projectId}`);
      console.log(`\u{1F4C1} Joined project room: project:${payload.projectId}`);
    }
  );
  socket.on(
    "join_visitor",
    (payload) => {
      const visitorId = typeof payload === "string" ? payload : payload?.visitorId;
      if (!visitorId) return;
      socket.join(`visitor:${visitorId}`);
      console.log(`\u{1F310} Visitor joined room: visitor:${visitorId}`);
    }
  );
  socket.on("disconnect", () => {
    console.log("\u274C User disconnected:", socket.id);
  });
});
var server;
var startServer = async () => {
  try {
    server = httpServer.listen(PORT, () => {
      console.log(`\u{1F680} Server running on http://localhost:${PORT}`);
      console.log(`\u{1F30D} Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error48) {
    console.error("\u274C Failed to start server:", error48);
    process.exit(1);
  }
};
var shutdown = (signal) => {
  console.log(`
\u{1F6D1} Received ${signal}. Shutting down server...`);
  if (server) {
    server.close(() => {
      console.log("\u2705 Server closed successfully");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};
startServer();
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
export {
  io
};
