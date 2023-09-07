import mongoose from "mongoose";

export interface IReview {
  rating: number;
  title: string;
  comment: string;
  user: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>;
  product: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>;
}
