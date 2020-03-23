import { compare, hash } from "bcryptjs";
import { Document, model, Model, Schema } from "mongoose";
import validator from "validator";
import { config } from "../../config";

export interface UserSchema extends Document {
  email: string;
  name: string;
  password: string;
}

export const userSchema = new Schema<UserSchema>({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate: validator.isEmail,
  },
  name: { type: String, required: true, trim: true },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate: (value: string) => !value.toLowerCase().includes("password"),
  },
});

userSchema.pre("save", async function (this: UserSchema, next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await hash(user.password, config.bcryptHashRounds);
  }

  next();
});

userSchema.statics.findByCredentials = async (
  email: string,
  password: string,
) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

export interface UserModel extends Model<UserSchema> {
  findByCredentials(email: string, password: string): Promise<UserSchema>;
}

export const UserModel = model<UserSchema, UserModel>("User", userSchema);
