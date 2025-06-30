import mongoose, { Schema, Document, models, model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
  parent?: mongoose.Types.ObjectId;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  parent: { type: Schema.Types.ObjectId, ref: "Category" },
});

export default models.Category || model<ICategory>("Category", CategorySchema);
