import { Request, Response } from "express";

export const getAllOrders = (_req: Request, res: Response) => {
  res.send("get all orders");
};
export const getSingleOrder = (_req: Request, res: Response) => {
  res.send("get single order");
};
export const getCurrentUserOrders = (_req: Request, res: Response) => {
  res.send("get current user orders");
};
export const createOrder = (_req: Request, res: Response) => {
  res.send("create order");
};
export const updateOrder = (_req: Request, res: Response) => {
  res.send("get all orders");
};
