import { Request, Response } from "express";

export const getAllUsers = async (_req: Request, res: Response) => {
  res.send("Get All Users");
};
export const getSingleUser = async (_req: Request, res: Response) => {
  res.send("Get Single User");
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
