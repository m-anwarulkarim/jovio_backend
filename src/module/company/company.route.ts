import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { requireAuth } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";
import { CompanyController } from "./company.controller";
import {
  createCompanyValidationSchema,
  getCompaniesQueryValidationSchema,
  updateCompanyStatusValidationSchema,
  updateCompanyValidationSchema,
  updateCompanyVerificationValidationSchema,
} from "./company.validation";
import validateQuery from "../../middlewares/validateQuery";

const router = Router();

router.post(
  "/",
  requireAuth,
  validateRequest(createCompanyValidationSchema),
  CompanyController.createCompany,
);

router.get("/my-company", requireAuth, CompanyController.getMyCompany);

router.patch(
  "/my-company",
  requireAuth,
  requireRole("COMPANY_OWNER"),
  validateRequest(updateCompanyValidationSchema),
  CompanyController.updateMyCompany,
);

router.get(
  "/",
  validateQuery(getCompaniesQueryValidationSchema),
  CompanyController.getAllCompanies,
);

router.get("/:slugOrId", CompanyController.getSingleCompany);

router.patch(
  "/:companyId/verify",
  requireAuth,
  requireRole("ADMIN"),
  validateRequest(updateCompanyVerificationValidationSchema),
  CompanyController.updateCompanyVerification,
);

router.patch(
  "/:companyId/status",
  requireAuth,
  requireRole("ADMIN"),
  validateRequest(updateCompanyStatusValidationSchema),
  CompanyController.updateCompanyStatus,
);

export const CompanyRoutes = router;
