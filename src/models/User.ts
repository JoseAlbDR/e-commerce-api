import mongoose from "mongoose";
import { IUser } from "../types/interfaces";

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, "User Name is required"],
  },
  email: {
    type: String,
    required: [true, "User Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User Password is required"],
  },
});

export const User = mongoose.model<IUser>("User", UserSchema);
