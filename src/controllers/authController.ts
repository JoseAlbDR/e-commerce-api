import { Request, Response } from "express";
export const registerController = (_req: Request, res: Response) => {
  res.send("Register controller");
};

export const loginController = (_req: Request, res: Response) => {
  res.send("Login controller");
};

export const logoutController = (_req: Request, res: Response) => {
  res.send("Logout controller");
};
