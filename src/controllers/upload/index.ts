import fs from "fs/promises";
import { NextFunction, Request, Response } from "express";

import cloudinary from "../../config/cloudinary";

import path from "path";
import multer from "multer";

// POST : single image
export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Process the image here using the uploaded file
    const imgUrl = await cloudinary.uploader.upload(req?.file?.path, {
      folder: "it-jobs",
    });

    // Remove the file from the local filesystem
    await fs.unlink(req?.file?.path);

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imgUrl: imgUrl?.secure_url,
    });
  } catch (error) {
    next(error);
  }
};

// POST : multiple images
export const uploadMultipleImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const imgUrls = await Promise.all(
      req.files.map(async (file) => {
        const imgUrl = await cloudinary.uploader.upload(file.path, {
          folder: "it-jobs",
        });

        // Remove the file from the local filesystem
        await fs.unlink(file.path);

        return imgUrl?.secure_url;
      })
    );

    res.status(200).json({
      success: true,
      message: "Multiple images uploaded successfully",
      imgUrls,
    });
  } catch (error) {
    next(error);
  }
};

// POST : PDF
export const uploadPDF = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });

    }
    if (!req?.file?.path) {
      throw new Error("File path is undefined");
    }

    const pdfUrl = await cloudinary.uploader.upload(req?.file?.path, {
      folder: "it-jobs",
      resource_type: "raw",
    });


    // Remove the file from the local filesystem
    await fs.unlink(req?.file?.path);

    res.status(200).json({
      success: true,
      message: "PDF uploaded successfully",
      pdfUrl: pdfUrl?.secure_url,
    })
  } catch (error) {
    next(error);
  }
};
