import { MongoError } from "mongodb";

// User Interfaces

export interface IUser {
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
