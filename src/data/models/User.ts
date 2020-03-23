import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Document, model, Model, Schema } from "mongoose";
import validator from "validator";
import { config } from "../../config";

export interface UserSchema extends Document {
  email: string;
  name: string;
  password: string;
  generateAuthToken(): Promise<string>;
  tokens: { token: string }[];
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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (this: UserSchema, next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await hash(user.password, config.bcryptHashRounds);
  }

  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = sign({ _id: user._id.toString() }, config.jwtSalt);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

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
