import { Router } from "express";
import authGuard from "../../middlewares/auth.guard";
import { ServiceController } from "./Service.controller";

const router = Router();

// public routes
router.get("/", ServiceController.getAllServices);
router.get("/:slug", ServiceController.getServiceBySlug);

// admin routes
router.post("/", authGuard("ADMIN"), ServiceController.createService);
router.patch("/:id", authGuard("ADMIN"), ServiceController.updateService);
router.delete("/:id", authGuard("ADMIN"), ServiceController.deleteService);

export const ServiceRoutes = router;
