import { ILogin } from "./authInterfaces";
import { IUpdatePassword } from "./userInterfaces";
export type CustomBody = ILogin | IUpdatePassword;
