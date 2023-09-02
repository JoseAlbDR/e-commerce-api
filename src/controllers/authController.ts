import { Request, Response } from "express";
import { IUserRequest } from "../types/interfaces";
import { User } from "../models/User";
export const registerController = async (req: IUserRequest, res: Response) => {
  const newUser = await User.create(req.body);
  res.json(newUser);
};

export const loginController = (_req: Request, res: Response) => {
  res.send("Login controller");
};

export const logoutController = (_req: Request, res: Response) => {
  res.send("Logout controller");
};
