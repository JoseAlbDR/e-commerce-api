import { Request, Response } from "express";

export const createReview = async (_req: Request, res: Response) => {
  res.send("create review");
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
