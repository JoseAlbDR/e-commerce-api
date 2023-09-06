import { Request, Response } from "express";
import { IProduct, IProductRequest } from "../types/productsInterfaces";
import { Product } from "../models/Product";
import { StatusCodes } from "http-status-codes";
export const createProduct = async (req: IProductRequest, res: Response) => {
  const product: IProduct = { ...req.body, user: req.user.userId };
  const newProduct = await Product.create(product);
  res.status(StatusCodes.OK).json({ product: newProduct });
};

export const getAllProducts = async (_req: Request, res: Response) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

export const getSingleProduct = async (req: Request, res: Response) => {
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
