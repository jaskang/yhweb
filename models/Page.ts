import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IPage extends Document {
  title: string;
  content: string;
  slug: string;
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema = new Schema<IPage>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

export default models.Page || model<IPage>("Page", PageSchema);
