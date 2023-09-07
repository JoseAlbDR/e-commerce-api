import { Request } from "express";
import mongoose from "mongoose";

export interface IReview {
  rating: number;
  title: string;
  comment: string;
  userId: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>;
  productId: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>;
}

export interface IReviewRequest extends Request {
  body: Omit<IReview, "user">;
}
