import { IAuction } from "./auction.interface";
import { IUser } from "./user.interface";

export interface IUserParticipationManager {
  registerUser(user: IUser<"BUYER">, auction: IAuction): void;
  getBidderCount(auction: IAuction): number;
  isBuyerPreferred(user: IUser<"BUYER">): boolean;
}

export namespace IUserParticipationManager {
  export interface Static {
    getInstance(): IUserParticipationManager;
  }
}
