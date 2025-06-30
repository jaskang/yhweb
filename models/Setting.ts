import mongoose, { Schema, Document, models, model } from "mongoose";

export interface ISetting extends Document {
  key: string;
  value: string;
}

const SettingSchema = new Schema<ISetting>({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true },
});

export default models.Setting || model<ISetting>("Setting", SettingSchema);
