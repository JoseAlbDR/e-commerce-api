import jwt from "jsonwebtoken";
import "dotenv/config";
import { ITokenUser } from "../types/interfaces";

export const createJWT = (payload: ITokenUser): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

export const isTokenValid = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET);
