import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../types/interfaces";
import validator from "validator";

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, "User Name is required"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "User Email is required"],
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "Please provide valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User Password is required"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "user"],
      message: "Role can only be admin or user",
    },
    default: "user",
  },
});

UserSchema.pre("save", async function () {
  console.log(this.modifiedPaths());
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(this.password, salt);
  this.password = hashedPass;
});

export const User = mongoose.model<IUser>("User", UserSchema);
