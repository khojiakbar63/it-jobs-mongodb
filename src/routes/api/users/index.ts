import { Router } from "express";
import UserModel from "../../../models/user";

const router = Router();

// GET /api/users
router.get("/", async (req, res) => {
  const users = await UserModel.find();

  res.json({
    message: "Welcome to all users.",
    users,
  });
});

export default router;
