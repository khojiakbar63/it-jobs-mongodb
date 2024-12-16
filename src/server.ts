import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";

import routes from "./routes"; // Ensure this file has the correct route definitions
import { apiErrorHandler } from "./errors";
import { CustomError } from "./interfaces/errors";

const app: Application = express();
const PORT = process.env.PORT || 7000;

// Middlewares
dotenv.config();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Route registration
app.use("/api", routes);

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(
      "mongodb+srv://IT-JOB_S:IT-JOB_S@cluster0.7ytnb.mongodb.net/db"
    );

    console.log("Connected to database");
  } catch (error) {
    console.error(`Error connecting to database: ${error}`);
  }
}

// 404 Handler
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  const error: CustomError = new Error(
    `Can't find ${req.originalUrl} on the server!`
  );
  error.statusCode = 404;
  next(error);
});

// Global error handler
app.use(apiErrorHandler as any);

// Start server
app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server is running on port ${PORT}`);
});
