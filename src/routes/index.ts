import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.route";
import { CompanyRoutes } from "../module/company/company.route";
import { EmployeeRoutes } from "../module/employee/employee.route";
import { TaskRoutes } from "../module/task/task.route";
import { TaskCommentRoutes } from "../module/task-comment/taskComment.route";
import { DepartmentRoutes } from "../module/department/department.route";
import { TaskAttachmentRoutes } from "../module/taskAttachment/taskAttachment.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/companies", CompanyRoutes);
router.use("/employees", EmployeeRoutes);
router.use("/departments", DepartmentRoutes);
router.use("/tasks", TaskRoutes);
router.use("/", TaskCommentRoutes);
// router.use("/", TaskAttachmentRoutes);
export default router;
