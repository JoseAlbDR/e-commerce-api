import { Request, Response } from "express";
import { User } from "../models/User";
import { StatusCodes } from "http-status-codes";
import { ISingleUserRequest } from "../types/userInterfaces";
import { NotFoundError, UnauthenticatedError } from "../errors";

export const getAllUsers = async (req: Request, res: Response) => {
  const { role } = req.user;

  if (role !== "admin") {
    throw new UnauthenticatedError("Only admin can get all users");
  }

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
export const updateUserPassword = async (req: Request, res: Response) => {
  res.json(req.body);
};
