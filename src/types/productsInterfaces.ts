import { ITokenUser } from "./authInterfaces";

export interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  company: string;
  colors: string[];
  featured: boolean;
  freeShipping: boolean;
  inventory: number;
  averageRating: number;
  user: ITokenUser;
}
