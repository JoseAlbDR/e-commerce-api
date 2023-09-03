import mongoose, { Model } from "mongoose";
import { Response } from "express";

export type IUserModel = Model<IUser, { [_ in never]: never }, IUserMethods>;

export interface IUserMethods {
  checkPassword(candidatePassword: string): Promise<boolean>;
}

export interface IResponseUser {
  userId: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>;
  name: string;
  role: "admin" | "user";
}

export interface ITokenUserPayload {
  payload: IResponseUser;
}

export interface IAttachCookies {
  res: Response;
  user: IResponseUser;
}

export interface IUser {
  _id: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

export interface IUserRequest {
  body: IUser;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginRequest {
  body: ILogin;
}
