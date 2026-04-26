import { Router } from "express";
import authGuard from "../../middlewares/auth.guard";
import { FeaturedItemController } from "./Featureditem.controller";

const router = Router();

// public routes
router.get("/", FeaturedItemController.getAllFeaturedItems);
router.get("/:slug", FeaturedItemController.getFeaturedItemBySlug);

// admin routes
router.post("/", authGuard("ADMIN"), FeaturedItemController.createFeaturedItem);
router.patch(
  "/:id",
  authGuard("ADMIN"),
  FeaturedItemController.updateFeaturedItem,
);
router.delete(
  "/:id",
  authGuard("ADMIN"),
  FeaturedItemController.deleteFeaturedItem,
);

export const FeaturedItemRoutes = router;
