import path from "path";
import multer from "multer";

// Setting storage engine for multer
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});


const fileFilter = (req:Request, file:Express.Multer.File, cb:Function) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
}

export const upload = multer({ storage, fileFilter :  void fileFilter });
