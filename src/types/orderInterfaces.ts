import mongoose from "mongoose";

type Status = "pending" | "failed" | "paid" | "delivered" | "canceled";

export interface ICartItem {
  name: string;
  image: string;
  price: number;
  amount: number;
  product: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>;
}

export interface IOrder {
  tax: number;
  shippingFee: number;
  subtotal: number;
  total: number;
  orderItems: ICartItem[];
  user: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>;
  status: Status;
  clientSecret: string;
  paymentIntentId: string;
}
