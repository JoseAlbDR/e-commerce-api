import { Request, Response } from "express";
import { User } from "../models/User";
import { StatusCodes } from "http-status-codes";
import { ISingleUserRequest } from "../types/userInterfaces";
import { NotFoundError } from "../errors";

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await User.find({ role: "user" });

  res.status(StatusCodes.OK).json({ users });
};
export const getSingleUser = async (req: ISingleUserRequest, res: Response) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  res.status(StatusCodes.OK).json({ user });
};
export const showCurrentUser = async (_req: Request, res: Response) => {
  res.send("Show Current User");
};
export const updateUser = async (_req: Request, res: Response) => {
  res.send("Update User");
};
export const updateUserPassword = async (_req: Request, res: Response) => {
  res.send("Update User Password");
};
