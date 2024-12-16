import { Router } from "express";
import { applyJob } from "../../../controllers/apply-job";

const router = Router();

router.post("/", applyJob as any);


export default router;
