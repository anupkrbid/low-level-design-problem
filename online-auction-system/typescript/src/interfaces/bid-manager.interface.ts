import { IBid } from "./bid.interface";
import { IUser } from "./user.interface";

export interface IBidManager {
  getBids(): IBid[];
  createBid(user: IUser<"BUYER">, amount: number): void;
  updateBid(user: IUser<"BUYER">, amount: number): void;
  withdrawBid(user: IUser<"BUYER">): void;
}
