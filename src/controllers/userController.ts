import { Request, Response } from "express";
import { User } from "../models/User";
import { StatusCodes } from "http-status-codes";
import {
  ISingleUserRequest,
  IUpdatePasswordRequest,
} from "../types/userInterfaces";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors";

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await User.find({ role: "user" }).select("-password");

  // const resultUsers = users.map(({ name, _id, email, role }) => ({
  //   userId: _id,
  //   name,
  //   email,
  //   role,
  // }));

  res.status(StatusCodes.OK).json({ users });
};
export const getSingleUser = async (req: ISingleUserRequest, res: Response) => {
  const { id } = req.params;
  console.log(req.user);
  const user = await User.findById(id).select("-password");

  if (!user) {
    throw new NotFoundError("User not found");
  }

  res.status(StatusCodes.OK).json({ user });
};
export const showCurrentUser = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};
export const updateUser = async (req: Request, res: Response) => {
  res.json(req.body);
};

export const updateUserPassword = async (
  req: IUpdatePasswordRequest,
  res: Response
) => {
  const { oldPassword, newPassword } = req.body;

  if (oldPassword === newPassword)
    throw new BadRequestError("Password can not be the same");

  const user = await User.findById(req.user.userId);

  if (user) {
    const isPasswordValid = await user.checkPassword(oldPassword);

    if (!isPasswordValid) throw new UnauthenticatedError("Invalid password");

    user.password = newPassword;
    await user.save();

    res.status(StatusCodes.OK).json({ msg: "Password updated successfully" });
  }
};
