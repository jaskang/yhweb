import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IAdmin extends Document {
  username: string;
  password: string; // 哈希
}

const AdminSchema = new Schema<IAdmin>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default models.Admin || model<IAdmin>("Admin", AdminSchema);
