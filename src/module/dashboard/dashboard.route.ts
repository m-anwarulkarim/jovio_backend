import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { DashboardController } from "./dashboard.controller";

const router = Router();

router.get("/stats", requireAuth, DashboardController.getDashboardStats);

export const DashboardRoutes = router;
