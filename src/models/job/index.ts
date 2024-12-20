import mongoose, { model, Model, Schema } from "mongoose";
import { IJob } from "../../interfaces/job";
 
const JobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    company: {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      contactEmail: {
        type: String,
        required: true,
      },
      contactPhone: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const JobModel: Model<IJob> = model<IJob>("job", JobSchema);

export default JobModel;