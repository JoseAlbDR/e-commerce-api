import { Request, Response } from "express";
import { ICartItem, IOrderRequest } from "../types/orderInterfaces";
import { BadRequestError, NotFoundError } from "../errors";
import { Product } from "../models/Product";
import Stripe from "stripe";
import { Order } from "../models/Order";
import { StatusCodes } from "http-status-codes";

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2023-08-16",
});

export const getAllOrders = async (_req: Request, res: Response) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders });
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
  let subtotal: number = 0;

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
    subtotal += item.amount * price;
  }
  // calculate total
  const total = tax + shippingFee + subtotal;

  // get client secret
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  const order = await Order.create({
    clientSecret: paymentIntent.client_secret,
    items: orderItems,
    subtotal,
    total,
    tax,
    user: req.user.userId,
    shippingFee,
    paymentIntentId: paymentIntent.id,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: paymentIntent.client_secret });
};
export const updateOrder = async (_req: Request, res: Response) => {
  res.send("update order");
};
