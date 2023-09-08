import { Request, Response } from "express";
import { ICartItem, IOrderRequest } from "../types/orderInterfaces";
import { BadRequestError, NotFoundError } from "../errors";
import { Product } from "../models/Product";

export const getAllOrders = async (_req: Request, res: Response) => {
  res.send("get all orders");
};
export const getSingleOrder = async (_req: Request, res: Response) => {
  res.send("get single order");
};
export const getCurrentUserOrders = async (_req: Request, res: Response) => {
  res.send("get current user orders");
};
export const createOrder = async (req: IOrderRequest, res: Response) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1)
    throw new BadRequestError("No cart items provided");

  if (!tax || !shippingFee)
    throw new BadRequestError("Please provide tax and shipping fee");

  let orderItems: ICartItem[] = [];
  let subTotal: number = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findById(item.product);
    if (!dbProduct)
      throw new NotFoundError(
        `No product found with id ${item.product as string}`
      );
    const { name, price, image, _id } = dbProduct;
    const singleOrderItem: ICartItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };

    // all item to order
    orderItems = [...orderItems, singleOrderItem];
    // calculate subtotal
    subTotal += item.amount * price;
  }
  console.log(orderItems);
  console.log(subTotal);
  res.send("create order");
};
export const updateOrder = async (_req: Request, res: Response) => {
  res.send("update order");
};
