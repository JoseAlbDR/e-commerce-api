import { Request, Response } from "express";
import { IReview, IReviewRequest } from "../types/reviewsInterfaces";
import { Review } from "../models/Review";
import { StatusCodes } from "http-status-codes";
import { Product } from "../models/Product";
import { BadRequestError, NotFoundError } from "../errors";
// import mongoose from "mongoose";

export const createReview = async (req: IReviewRequest, res: Response) => {
  const review: IReview = { ...req.body, userId: req.user.userId };
  const { productId } = review;

  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct)
    throw new NotFoundError(`No Product with id: ${productId as string}`);

  const alreadySubmitted = await Review.findOne({
    productId: review.productId,
    userId: review.userId,
  });

  console.log(alreadySubmitted);

  if (alreadySubmitted)
    throw new BadRequestError("Already submitted review for this product");

  const newReview = await Review.create(review);

  res.status(StatusCodes.CREATED).json({ review: newReview });
};

export const getAllReviews = async (_req: Request, res: Response) => {
  res.send("all reviews");
};

export const getSingleReview = async (_req: Request, res: Response) => {
  res.send("single review");
};

export const updateReview = async (_req: Request, res: Response) => {
  res.send("update review");
};

export const deleteReview = async (_req: Request, res: Response) => {
  res.send("delete review");
};
