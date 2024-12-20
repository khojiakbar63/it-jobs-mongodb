import { Types } from "mongoose";

export interface IApplicant {
  _id?: string;
  user: Types.ObjectId;
  job: Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
  notes: string;
  resumeUrl: string;
  createAt?: Date;
  updatedAt?: Date;
}