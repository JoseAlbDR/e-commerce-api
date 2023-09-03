import { MongoError } from "mongodb";
import mongoose, { Model } from "mongoose";

// User Interfaces
export type IUserModel = Model<IUser, { [_ in never]: never }, IUserMethods>;

export interface IUserMethods {
  createJWT(tokenUser: ITokenUser): string;
  checkPassword(candidatePassword: string): Promise<boolean>;
}

export interface ITokenUser {
  userId: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>;
  name: string;
  role: "admin" | "user";
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

// Error interfaces
export interface IDuplicateMongoError extends MongoError {
  keyValue: {
    [x: string]: string;
  };
}

export interface IRequiredMongoError extends MongoError {
  errors: {
    [x: string]:
      | { [y: string]: string }
      | { [y: string]: { [z: string]: string } };
  };
}

export interface ICastMongoError extends MongoError {
  reason: { [x: string]: string };
  value: string;
}
