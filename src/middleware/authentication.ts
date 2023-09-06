import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError } from "../errors";
import { isTokenValid } from "../utils";
import { IResponseUser } from "../types/authInterfaces";
const authenticateUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { token } = req.signedCookies as Record<string, string>;

  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  try {
    const payload = isTokenValid(token) as IResponseUser;
    const { userId, name, role } = payload;
    req.user = { userId, name, role };
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError("Unauthenticated");
  }
};

export default authenticateUser;
