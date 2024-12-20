import { NextFunction, Request, Response } from "express";
import { ApplicantModel } from "../../models/applicant";
import { validateApplicant } from "../../validations/applicant";

// APPLY JOB
export const applyJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = validateApplicant(req.body);

    // Check if the job exists
    const existingApplicant = await ApplicantModel.findOne({
      user: body.user,
      job: body.job,
    });

    if (existingApplicant) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job." });
    }

    const newApplicant = await ApplicantModel.create(body);
    newApplicant.save();
    res.status(200).json({
      succes: true,
      message: "Job applied successfully",
      data: newApplicant,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL APPLICANT'S JOBS
export const getApplicantJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsersAppliedJobs = await ApplicantModel.find().exec();

    res.status(200).json({
      succes: true,
      message: "Applicant's all jobs",
      data: allUsersAppliedJobs,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL USERS WHO APPLIED FOR A JOB
export const getJobApplicants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "Job id is required" });
    }
    const allUsersAppliedJobs = await ApplicantModel.find({
      job: userId,
    }).exec();

    res.status(200).json({
      succes: true,
      message: "Applicant's all jobs",
      data: allUsersAppliedJobs,
    });
  } catch (error) {
    next(error);
  }
};
