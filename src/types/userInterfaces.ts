import { Request } from "express";

export interface ISingleUserRequest extends Request {
  params: {
    id: string;
  };
}
