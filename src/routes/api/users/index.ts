import { Router } from "express";
import UserModel from "../../../models/user";
import { getAppliedJobsByUser } from "../../../controllers/user";

const router = Router();


// Fake db


// GET /api/users
router.get("/", async(req, res) => {
    const users = await UserModel.find();

    res.json({
      message: "Welcome to all users.",
      users
    })
});


// GET / applied jobs by user
router.get("/:userId/applied-jobs",  getAppliedJobsByUser as any)



export default router;
