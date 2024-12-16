import { Model, model, Schema } from "mongoose";
import { ICategory } from "../../interfaces/category";

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CategoryModel: Model<ICategory> = model<ICategory>(
  "category",
  CategorySchema
);

export default CategoryModel;