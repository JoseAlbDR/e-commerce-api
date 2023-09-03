import { Request, Response } from "express";
import { ITokenUser, IUserRequest } from "../types/interfaces";
import { User } from "../models/User";
import { StatusCodes } from "http-status-codes";
import { createJWT } from "../utils";
export const registerController = async (req: IUserRequest, res: Response) => {
  const { name, email, password } = req.body;

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const newUser = await User.create({ name, email, password, role });
  const tokenUser: ITokenUser = {
    name: newUser.name,
    userId: newUser._id,
    role: newUser.role,
  };

  const token = createJWT(tokenUser);
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  });

  res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
};

export const loginController = (_req: Request, res: Response) => {
  res.send("Login controller");
};

export const logoutController = (_req: Request, res: Response) => {
  res.send("Logout controller");
};
