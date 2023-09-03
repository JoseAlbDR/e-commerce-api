import jwt from "jsonwebtoken";
import "dotenv/config";
import { ITokenUser } from "../types/interfaces";
import { Response } from "express";

export const createJWT = (payload: ITokenUser): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

export const isTokenValid = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET);

export const attachCookiesToResponse = (
  res: Response,
  tokenUser: ITokenUser
) => {
  const token = createJWT(tokenUser);
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  });
  return token;
};
