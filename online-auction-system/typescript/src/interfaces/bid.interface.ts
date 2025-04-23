import { IUser } from "./user.interface";

export interface IBid {
  user: IUser<"BUYER">;
  amount: number;
}
