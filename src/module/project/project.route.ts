import { Router } from "express";
import { ProjectController } from "./project.controller";
import authGuard from "../../middlewares/auth.guard";

const router = Router();

router.get(
  "/",
  authGuard("ADMIN", "EMPLOYEE", "CLIENT"),
  ProjectController.getProjects,
);

router.get(
  "/:id",
  authGuard("ADMIN", "EMPLOYEE", "CLIENT"),
  ProjectController.getSingleProject,
);

router.patch(
  "/:id/assign",
  authGuard("ADMIN"),
  ProjectController.assignEmployee,
);

router.patch(
  "/:id/status",
  authGuard("ADMIN"),
  ProjectController.changeProjectStatus,
);

export const ProjectRoutes = router;
