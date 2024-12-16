import { Router } from "express";
import { signIn, signUp } from "../../../controllers/auth";

const router = Router();

router.post("/sign-up", signUp as any);
router.post("/sign-in", signIn as any);


export default router;
