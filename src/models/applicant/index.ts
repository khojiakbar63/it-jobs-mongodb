import mongoose from "mongoose";
import { IApplicant } from "../../interfaces/applicant";
import { Schema } from "mongoose";


const ApplicantSchema = new Schema<IApplicant>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    job: {
      type: Schema.Types.ObjectId,
      ref: "job",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    notes: {
      type: String,
      required: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

  
  export const ApplicantModel = mongoose.model<IApplicant>("Applicant", ApplicantSchema);
  