import { Router } from "express";

import {
  applyJobRoutes,
  authRoutes,
  categoryRoutes,
  jobsRoutes,
  uploadRoutes,
  usersRoutes,
} from "./api";

const router = Router();

router.use("/auth", authRoutes);
router.use("/jobs", jobsRoutes);
router.use("/users", usersRoutes);
router.use("/category", categoryRoutes);
router.use("/upload", uploadRoutes);
router.use("/apply-job", applyJobRoutes);

export default router;