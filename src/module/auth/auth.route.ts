import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  registerValidationSchema,
  loginValidationSchema,
  changePasswordValidationSchema,
} from "./auth.validation";
import { requireAuth } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";

const router = Router();

router.post(
  "/register",
  validateRequest(registerValidationSchema),
  AuthController.register,
);

router.post(
  "/login",
  validateRequest(loginValidationSchema),
  AuthController.login,
);

router.post("/logout", requireAuth, AuthController.logout);

router.get("/me", requireAuth, AuthController.getMe);

router.post(
  "/change-password",
  requireAuth,
  validateRequest(changePasswordValidationSchema),
  AuthController.changePassword,
);
router.get(
  "/all",
  requireAuth,
  // requireRole("ADMIN"),
  AuthController.getAllUsers,
);

export const AuthRoutes = router;
