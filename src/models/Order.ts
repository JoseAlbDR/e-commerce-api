import mongoose from "mongoose";
import { IOrder } from "../types/orderInterfaces";

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    tax: {
      type: Number,
      min: 0,
    },
    shippingFee: {
      type: Number,
      min: 0,
    },
    subtotal: {
      type: Number,
      min: 0,
    },
    total: {
      type: Number,
      min: 1,
    },
    orderItems: {
      type: [],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientSecret: {
      type: String,
    },
    paymentId: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema);
