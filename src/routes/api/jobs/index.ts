import { Router } from "express";
import {
  createJob,
  deleteJob,
  updateJob,
  getAllJobs,
  getJobById,
} from "../../../controllers/jobs";
import { verifyToken } from "../../../middlewares/index";
import { getApplicantsByJob } from "../../../controllers/apply-job";

const router = Router();

// GET: get all jobs
router.get("/", getAllJobs as any);

// GET: get a single job by id
router.get("/:jobId", getJobById as any);

// POST: create a new job
router.post("/add", verifyToken as any, createJob as any);

// PUT: update an existing job
router.patch("/:jobId", verifyToken as any, updateJob as any);

// DELETE: delete a job
router.delete("/:jobId", verifyToken as any, deleteJob as any);

// // Get applicants for a job
router.get("/:jobId/applicants", getApplicantsByJob as any)

export default router;