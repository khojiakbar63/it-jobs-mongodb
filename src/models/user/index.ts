import mongoose, { model, Schema } from "mongoose";
import { IUser } from "../../interfaces/user";

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    languages: {
      type: [String],
      default: [],
    },
    nationality: {
      type: String,
      default: "",
    },
    profession: {
      type: String,
      default: "",
    },
    experience: {
      type: Number,
      default: 0,
    },
    experiences: [
      {
        company: {
          type: String,
          default: "",
        },
        position: {
          type: String,
          default: "",
        },
        description: {
          type: String,
          default: "",
        },
        startDate: {
          type: Date,
          default: null,
        },
        endDate: {
          type: Date,
          default: null,
        },
      },
    ]
  },
  {
    timestamps: true,
  }
);

const UserModel = model<IUser>("user", UserSchema);

export default UserModel;
