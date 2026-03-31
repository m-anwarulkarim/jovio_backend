import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import validateQuery from "../../middlewares/validateQuery";
import { requireAuth } from "../../middlewares/auth.middleware";
import { DepartmentController } from "./department.controller";
import {
  createDepartmentValidationSchema,
  getDepartmentsQueryValidationSchema,
  updateDepartmentValidationSchema,
} from "./department.validation";

const router = Router();

router.post(
  "/",
  requireAuth,
  validateRequest(createDepartmentValidationSchema),
  DepartmentController.createDepartment,
);

router.get(
  "/",
  requireAuth,
  validateQuery(getDepartmentsQueryValidationSchema),
  DepartmentController.getAllDepartments,
);

router.get(
  "/:departmentId",
  requireAuth,
  DepartmentController.getSingleDepartment,
);

router.patch(
  "/:departmentId",
  requireAuth,
  validateRequest(updateDepartmentValidationSchema),
  DepartmentController.updateDepartment,
);

router.delete(
  "/:departmentId",
  requireAuth,
  DepartmentController.deleteDepartment,
);

export const DepartmentRoutes = router;
