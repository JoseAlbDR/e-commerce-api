import { Request, Response } from "express";
import { IProduct, IProductRequest } from "../types/productsInterfaces";
import { Product } from "../models/Product";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";
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
  const product = await Product.findById(req.params.id);
  if (!product)
    throw new NotFoundError(`Product with id ${req.params.id} not found`);
  res.status(StatusCodes.OK).json({ product });
};

export const updateProduct = async (req: IProductRequest, res: Response) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!product)
    throw new NotFoundError(`Product with id ${req.params.id} not found`);
  res.status(StatusCodes.OK).json({ product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product)
    throw new NotFoundError(`Product with id ${req.params.id} not found`);
  res.sendStatus(StatusCodes.OK);
};

export const uploadImage = async (_req: Request, res: Response) => {
  res.send("upload image");
};
