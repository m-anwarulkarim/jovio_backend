import crypto from "crypto";
import type { Request, Response } from "express";

const VISITOR_ID_COOKIE = "public_visitor_id";
const VISITOR_TOKEN_COOKIE = "public_visitor_token";
const VISITOR_COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 30; // 30 days

const getSecret = () => {
  const secret = process.env.PUBLIC_CHAT_SECRET;

  if (!secret) {
    throw new Error("PUBLIC_CHAT_SECRET is not set");
  }

  return secret;
};

const signVisitorId = (visitorId: string) => {
  return crypto
    .createHmac("sha256", getSecret())
    .update(visitorId)
    .digest("hex");
};

const safeEqual = (a: string, b: string) => {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(aBuffer, bBuffer);
};

const generateVisitorId = () => {
  return `visitor_${crypto.randomBytes(16).toString("hex")}`;
};

const parseCookies = (cookieHeader?: string) => {
  const cookies: Record<string, string> = {};

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

const getVisitorSessionFromRequest = (req: Request) => {
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
    token,
  };
};

const setVisitorSession = (res: Response, visitorId: string) => {
  const token = signVisitorId(visitorId);
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie(VISITOR_ID_COOKIE, visitorId, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: VISITOR_COOKIE_MAX_AGE,
    path: "/",
  });

  res.cookie(VISITOR_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: VISITOR_COOKIE_MAX_AGE,
    path: "/",
  });

  return { visitorId, token };
};

const ensureVisitorSession = (req: Request, res: Response) => {
  const existingSession = getVisitorSessionFromRequest(req);

  if (existingSession) {
    return existingSession;
  }

  const visitorId = generateVisitorId();
  return setVisitorSession(res, visitorId);
};

const verifyVisitorToken = (visitorId: string, token: string) => {
  const expectedToken = signVisitorId(visitorId);
  return safeEqual(token, expectedToken);
};

export const PublicVisitorSession = {
  VISITOR_ID_COOKIE,
  VISITOR_TOKEN_COOKIE,
  generateVisitorId,
  signVisitorId,
  parseCookies,
  getVisitorSessionFromRequest,
  setVisitorSession,
  ensureVisitorSession,
  verifyVisitorToken,
};
