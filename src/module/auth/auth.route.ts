import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { AuthController } from "./auth.controller";
import { auth } from "../../lib/auth";
import authGuard from "../../middlewares/auth.guard";

const router = Router();

// custom auth routes
router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.post(
  "/logout",
  authGuard("ADMIN", "EMPLOYEE", "CLIENT"),
  AuthController.logout,
);

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

router.get("/users", authGuard("ADMIN"), AuthController.getAllUsers);
// Better Auth built-in routes
router.all("/better-auth/*splat", toNodeHandler(auth));

export const AuthRoutes = router;
