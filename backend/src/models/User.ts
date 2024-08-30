import mongoose, { Document, Schema } from "mongoose";
import mongooseLong from "mongoose-long";

// Register mongoose-long plugin
mongooseLong(mongoose);

// Define UserDocument interface
export type UserDocument = Document & {
  _id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  isPremium?: boolean;
  languageCode: string;
  allowsWriteToPm: boolean;
  photoUrl: string;
};

// Create UserSchema
const UserSchema = new Schema<UserDocument>(
  {
    _id: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    username: { type: String },
    isPremium: { type: Boolean },
    languageCode: { type: String, required: true },
    allowsWriteToPm: { type: Boolean, required: true },
    photoUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

// Create UserModel
export const UserModel = mongoose.model<UserDocument>("User", UserSchema);
