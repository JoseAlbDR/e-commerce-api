import { MongoError } from "mongodb";
import mongoose, { Model } from "mongoose";

// User Interfaces
export type UserModel = Model<IUser, { [_ in never]: never }, IUserMethods>;

export interface IUserMethods {
  createJWT(): string;
  checkPassword(candidatePassword: string): Promise<boolean>;
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
