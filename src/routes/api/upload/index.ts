import { Router } from "express";
import {
  uploadImage,
  uploadMultipleImages,
  uploadPDF,
} from "../../../controllers/upload";
import { upload } from "../../../config/multer";
import { verifyToken } from "../../../middlewares";

const router = Router();

// SINGLE
router.post(
  "/image",
  verifyToken as any,
  upload.single("image"),
  uploadImage as any
);

// MULTIPLE
router.post(
  "/images",
  verifyToken as any,
  upload.array("images"),
  uploadMultipleImages as any
);

// PDF
router.post("/pdf", 
    verifyToken as any, 
    upload.single("pdf"), 
    uploadPDF as any);

export default router;
