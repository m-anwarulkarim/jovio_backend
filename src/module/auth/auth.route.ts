import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { AuthController } from "./auth.controller";
import { auth } from "../../lib/auth";
import authGuard from "../../middlewares/auth.guard";

const router = Router();

// Better Auth built-in routes
router.all("/better-auth/*splat", toNodeHandler(auth));

// Custom auth routes
router.get(
  "/me",
  authGuard("ADMIN", "EMPLOYEE", "CLIENT"),
  AuthController.getMe,
);
router.get(
  "/session",
  authGuard("ADMIN", "EMPLOYEE", "CLIENT"),
  AuthController.getMySession,
);

export const AuthRoutes = router;
