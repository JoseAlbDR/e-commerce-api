import mongoose from "mongoose";
import { IProduct } from "../types/productsInterfaces";

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      minlength: 10,
      maxlength: 50,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
    },
    company: {
      type: String,
      required: [true, "Product company is required"],
    },
    colors: {
      type: [],
      required: [true, "Product colors is required"],
    },
    featured: {
      type: Boolean,
      default: false,
      required: [true, "Product featured is required"],
    },
    freeShipping: {
      type: Boolean,
      default: false,
      required: [true, "Product free shipping is required"],
    },
    inventory: {
      type: Number,
      min: 0,
      default: 0,
      required: [true, "Product inventory is required"],
    },
    user: {
      type: Object,
    },
  },
  { timestamps: true }
);

export const product = mongoose.model<IProduct>("Product", ProductSchema);
