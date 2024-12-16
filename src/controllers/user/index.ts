import { Request, Response, NextFunction } from "express";
import UserModel from "../../models/user";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (page - 1) * limit;

    const users = await UserModel.find().skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      message: "ok",
      data: users,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(
          (await UserModel.countDocuments().exec()) / limit
        ),
      },
    });
  } catch (error) {
    next(error);
  }
};


export const getAppliedJobsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId).populate("appliedJobs");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "ok",
      data: user.appliedJobs,
    });
  }
  catch (error) {
    next(error
      )
  }
}