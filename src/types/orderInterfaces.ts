import mongoose from "mongoose";
import { IProduct } from "./productsInterfaces";

export interface IOrder {
  tax: number;
  shippingFee: number;
  subtotal: number;
  total: number;
  orderItems: IProduct[];
  user: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>;
  status: string;
  clientSecret: string;
  paymentId: string;
}
