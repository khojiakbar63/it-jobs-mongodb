import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "it-jobs";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is required",
    });
  }

  jwt.verify(token, SECRET_KEY, (error) => {
    if (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }
    next();
  });
};