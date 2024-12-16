import { NextFunction, Request, Response } from "express";
import CategoryModel from "../../models/category";

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await CategoryModel.find();

    res.status(200).json({
      success: true,
      messsage: "ok",
      data,
    });
  } catch (error) {
    next(error);
  }
};