import type { NextFunction, Request, Response } from "express";

type THitInfo = {
  count: number;
  startTime: number;
};

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 20;

const memoryStore = new Map<string, THitInfo>();

const getClientKey = (req: Request) => {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0]?.trim() || req.ip || "unknown";
  }

  if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
    return String(forwardedFor[0]).trim();
  }

  return req.ip || req.socket.remoteAddress || "unknown";
};

const publicMessageRateLimit = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const key = getClientKey(req);
  const now = Date.now();

  const existing = memoryStore.get(key);

  if (!existing) {
    memoryStore.set(key, {
      count: 1,
      startTime: now,
    });
    return next();
  }

  if (now - existing.startTime > WINDOW_MS) {
    memoryStore.set(key, {
      count: 1,
      startTime: now,
    });
    return next();
  }

  if (existing.count >= MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later.",
      errorCode: "TOO_MANY_REQUESTS",
    });
  }

  existing.count += 1;
  memoryStore.set(key, existing);

  return next();
};

export default publicMessageRateLimit;
