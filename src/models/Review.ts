import mongoose from "mongoose";
import { IReview, ReviewModel } from "../types/reviewsInterfaces";

const ReviewSchema = new mongoose.Schema<IReview, ReviewModel>(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Plase provide rating"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide title"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    comment: {
      type: String,
      trim: true,
      required: [true, "Please provide review text"],
      maxlength: [1000, "Title cannot exceed 1000 characters"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.post("save", async function () {
  await Review.calculateAverageRating(this.product);
});

ReviewSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function () {
    await Review.calculateAverageRating(this.product);
  }
);

ReviewSchema.static(
  "calculateAverageRating",
  async function calculateAverageRating(product: mongoose.Types.ObjectId) {
    console.log(product);
  }
);

export const Review = mongoose.model<IReview, ReviewModel>(
  "Review",
  ReviewSchema
);
