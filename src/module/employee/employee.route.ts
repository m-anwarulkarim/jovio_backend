import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import validateQuery from "../../middlewares/validateQuery";
import { requireAuth } from "../../middlewares/auth.middleware";
import { EmployeeController } from "./employee.controller";
import {
  convertExistingUserToEmployeeValidationSchema,
  createEmployeeValidationSchema,
  getEmployeesQueryValidationSchema,
  updateEmployeeValidationSchema,
} from "./employee.validation";

const router = Router();

router.post(
  "/",
  requireAuth,
  validateRequest(createEmployeeValidationSchema),
  EmployeeController.createEmployee,
);

router.get(
  "/",
  requireAuth,
  validateQuery(getEmployeesQueryValidationSchema),
  EmployeeController.getCompanyEmployees,
);

router.get("/:employeeId", requireAuth, EmployeeController.getSingleEmployee);

router.patch(
  "/:employeeId",
  requireAuth,
  validateRequest(updateEmployeeValidationSchema),
  EmployeeController.updateEmployee,
);

router.delete(
  "/:employeeId",
  requireAuth,
  EmployeeController.deactivateEmployee,
);
router.patch(
  "/convert-existing",
  requireAuth,
  validateRequest(convertExistingUserToEmployeeValidationSchema),
  EmployeeController.convertExistingUserToEmployee,
);
export const EmployeeRoutes = router;
