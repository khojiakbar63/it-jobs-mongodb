import { Router } from "express";
import { applyJob, getApplicantJobs, getJobApplicants } from "../../../controllers/apply-job";

const router = Router();

router.post("/", applyJob as any);
router.get("/jobs/:jobId", getApplicantJobs as any);
router.get("/users/:userId", getJobApplicants as any);


export default router;
