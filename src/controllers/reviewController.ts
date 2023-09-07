import { Request, Response } from "express";
import { IReview, IReviewRequest } from "../types/reviewsInterfaces";
import { Review } from "../models/Review";
import { StatusCodes } from "http-status-codes";
import { Product } from "../models/Product";
import { BadRequestError, NotFoundError } from "../errors";
import { checkPermissions } from "../utils";
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

  if (alreadySubmitted)
    throw new BadRequestError("Already submitted review for this product");

  const newReview = await Review.create(review);

  res.status(StatusCodes.CREATED).json({ review: newReview });
};

export const getAllReviews = async (_req: Request, res: Response) => {
  const reviews = await Review.find({});

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

export const getSingleReview = async (req: Request, res: Response) => {
  const review = await Review.findById(req.params.id);

  if (!review)
    throw new NotFoundError(`Review not found with id ${req.params.id}`);

  res.status(StatusCodes.OK).json({ review });
};

export const updateReview = async (_req: Request, res: Response) => {
  res.send("update review");
};

export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;

  const review = await Review.findOne({ _id: id });

  if (!review) throw new NotFoundError(`Review not found with id ${id}`);

  checkPermissions(req.user, review.userId);

  await Review.findByIdAndDelete(review._id);

  res.sendStatus(StatusCodes.OK);
};
