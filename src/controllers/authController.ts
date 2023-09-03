import { Request, Response } from "express";
import {
  ILoginRequest,
  IResponseUser,
  IUserRequest,
} from "../types/interfaces";
import { User } from "../models/User";
import { StatusCodes } from "http-status-codes";
import { attachCookiesToResponse } from "../utils";
import { UnauthenticatedError } from "../errors";

export const registerController = async (req: IUserRequest, res: Response) => {
  const { name, email, password } = req.body;

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const newUser = await User.create({ name, email, password, role });
  const registeredUser: IResponseUser = {
    name: newUser.name,
    userId: newUser._id,
    role: newUser.role,
  };

  attachCookiesToResponse({ res, user: registeredUser });

  res.status(StatusCodes.CREATED).json({ user: registeredUser });
};

export const loginController = async (req: ILoginRequest, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new UnauthenticatedError("Invalid email");
  }

  const isPasswordCorrect = await user.checkPassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid password");
  }

  const loguedUser: IResponseUser = {
    name: user.name,
    userId: user._id,
    role: user.role,
  };

  attachCookiesToResponse({ res, user: loguedUser });

  res.status(StatusCodes.OK).json({ user: loguedUser });
};

export const logoutController = (_req: Request, res: Response) => {
  res.send("Logout controller");
};
