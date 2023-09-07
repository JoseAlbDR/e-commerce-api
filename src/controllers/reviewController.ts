import { Request, Response } from "express";
import { IReview, IReviewRequest } from "../types/reviewsInterfaces";
import { Review } from "../models/Review";
import { StatusCodes } from "http-status-codes";
import { Product } from "../models/Product";
import { BadRequestError, NotFoundError } from "../errors";
import { checkPermissions } from "../utils";

export const createReview = async (req: IReviewRequest, res: Response) => {
  const review: IReview = { ...req.body, user: req.user.userId };
  const { product } = review;

  const isValidProduct = await Product.findOne({ _id: product });

  if (!isValidProduct)
    throw new NotFoundError(`No Product with id: ${product as string}`);

  const alreadySubmitted = await Review.findOne({
    productId: review.product,
    userId: review.user,
  });

  if (alreadySubmitted)
    throw new BadRequestError("Already submitted review for this product");

  const newReview = await Review.create(review);

  res.status(StatusCodes.CREATED).json({ review: newReview });
};

export const getAllReviews = async (_req: Request, res: Response) => {
  const reviews = await Review.find({}).populate({
    path: "product",
    select: "name company price",
  });

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

export const getSingleReview = async (req: Request, res: Response) => {
  const review = await Review.findById(req.params.id);

  if (!review)
    throw new NotFoundError(`Review not found with id ${req.params.id}`);

  res.status(StatusCodes.OK).json({ review });
};

export const updateReview = async (req: IReviewRequest, res: Response) => {
  const { id } = req.params;
  const { title, rating, comment } = req.body;

  const review = await Review.findOne({ _id: id });

  if (!review) throw new NotFoundError(`Review not found with id ${id}`);

  checkPermissions(req.user, review.user);

  review.title = title;
  review.rating = rating;
  review.comment = comment;

  await review.save();

  res.status(StatusCodes.OK).json({ review });
};

export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;

  const review = await Review.findOne({ _id: id });

  if (!review) throw new NotFoundError(`Review not found with id ${id}`);

  checkPermissions(req.user, review.user);

  await Review.findByIdAndDelete(review._id);

  res.sendStatus(StatusCodes.OK);
};
