import { Request, Response } from "express";
import { IReview, IReviewRequest } from "../types/reviewsInterfaces";
import { Review } from "../models/Review";
import { StatusCodes } from "http-status-codes";

export const createReview = async (req: IReviewRequest, res: Response) => {
  const review: IReview = { ...req.body, user: req.user.userId };

  const newReview = await Review.create(review);

  res.status(StatusCodes.OK).json({ review: newReview });
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
