import { Request, Response } from "express";

export const createReview = async (req: Request, res: Response) => {
  res.send("create review");
};

export const getAllReviews = async (req: Request, res: Response) => {
  res.send("all reviews");
};

export const getSingleReview = async (req: Request, res: Response) => {
  res.send("single review");
};

export const updateReview = async (req: Request, res: Response) => {
  res.send("update review");
};

export const deleteReview = async (req: Request, res: Response) => {
  res.send("create review");
};
