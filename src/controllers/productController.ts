import { Request, Response } from "express";
export const createProduct = async (_req: Request, res: Response) => {
  res.send("create product");
};
export const getAllProducts = async (_req: Request, res: Response) => {
  res.send("get all products");
};
export const getSingleProduct = async (_req: Request, res: Response) => {
  res.send("get single product");
};
export const updateProduct = async (_req: Request, res: Response) => {
  res.send("update product");
};
export const deleteProduct = async (_req: Request, res: Response) => {
  res.send("delete product");
};
export const uploadImage = async (_req: Request, res: Response) => {
  res.send("upload image");
};
