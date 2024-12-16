import mongoose from "mongoose";



const jobApplicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    status: { type: String, enum: ["Applied", "Interviewed", "Hired", "Rejected"], default: "Applied" },
    appliedAt: { type: Date, default: Date.now },
  });
  
  export const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
  