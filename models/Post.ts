import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  category: mongoose.Types.ObjectId;
  author: string;
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    author: { type: String, required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

export default models.Post || model<IPost>("Post", PostSchema);
