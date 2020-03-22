import { Document, model, Schema } from "mongoose";

export const userSchema = new Schema({
  name: String
});

interface User extends Document {
  name: string;
}

export const UserModel = model<User>("User", userSchema);
