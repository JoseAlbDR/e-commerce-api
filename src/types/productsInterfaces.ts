import { IUser } from "./authInterfaces";

export type Category = "office" | "kitchen" | "bedroom";
export type Company = "ikea" | "liddy" | "marcos";

export interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  category: Category;
  company: Company;
  colors: string[];
  featured: boolean;
  freeShipping: boolean;
  inventory: number;
  averageRating: number;
  user: IUser;
}
