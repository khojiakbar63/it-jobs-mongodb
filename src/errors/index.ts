import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const apiErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    const zodErrors = error.errors.reduce((acc, err) => {
      const fieldPath = err.path.join("."); // Join the path for readability
      acc[fieldPath] = err.message; // Map field to its error message
      return acc;
    }, {} as Record<string, string>); // Initialize an empty object for mapping

    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: zodErrors, // Return field-specific error mapping
    });
  }

  // Default status code and message
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  // Respond with a proper error message
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};