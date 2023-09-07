import { Request } from "express";
import mongoose from "mongoose";

export interface IReview {
  rating: number;
  title: string;
  comment: string;
  user: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>;
  product: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>;
}

export interface IReviewRequest extends Request {
  body: Omit<IReview, "user">;
}
