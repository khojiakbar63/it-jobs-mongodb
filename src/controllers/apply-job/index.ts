import { NextFunction, Request, Response } from "express";
import UserModel from "../../models/user";
import JobModel from "../../models/job";

export const applyJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, jobId } = req.body;

    // Validate user and job existence
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const job = await JobModel.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });


    if (!job || !job.applicants) {
        return res.status(404).json({ success: false, message: "Job not found or applicants field missing" });
      }
      

   // Check if the user has already applied
   if (job.applicants.includes(userId)) {
    return res.status(400).json({ success: false, message: "You have already applied for this job" });
  }

      // Update Job: Add user to applicants
      job.applicants.push(user._id);
      await job.save();

      // Update User: Add job to appliedJobs
      user.appliedJobs?.push(job._id);
      await user.save();

      res.status(200).json({ success: true, message: "Job applied successfully" });


  } catch (error) {
    console.log(error);
    next(error);
  }
};


export const getApplicantsByJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobId } = req.params;

    // Validate job existence
    const job = await JobModel.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Get applicants
    const applicants = await UserModel.find({ _id: { $in: job.applicants } });

    res.status(200).json({ success: true, applicants });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
