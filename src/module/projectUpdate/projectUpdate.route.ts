import { Router } from "express";
import { ProjectUpdateController } from "./projectUpdate.controller";
import authGuard from "../../middlewares/auth.guard";

const router = Router();

router.post(
  "/",
  authGuard("ADMIN", "EMPLOYEE"),
  ProjectUpdateController.createProjectUpdate,
);

router.get(
  "/",
  authGuard("ADMIN", "EMPLOYEE", "CLIENT"),
  ProjectUpdateController.getProjectUpdates,
);

router.get(
  "/:id",
  authGuard("ADMIN", "EMPLOYEE", "CLIENT"),
  ProjectUpdateController.getSingleProjectUpdate,
);

export const ProjectUpdateRoutes = router;
