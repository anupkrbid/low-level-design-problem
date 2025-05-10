import {
  IAuction,
  IBidManager,
  IUser,
  IBid,
  IUserParticipationManager,
} from "../interfaces";
import { UserParticipationManagerService } from "./user-participation-manager.service";

export class BidManagerService implements IBidManager {
  private bidMap = new Map<IUser<"BUYER">, IBid>();
  private userParticipationManager: IUserParticipationManager;
  constructor(private auction: IAuction) {
    this.userParticipationManager =
      UserParticipationManagerService.getInstance();
  }

  public getBids(): IBid[] {
    return Array.from(this.bidMap.values());
  }

  public createBid(user: IUser<"BUYER">, amount: number) {
    if (!this.auction.isOpen()) {
      throw new Error("Auction is closed.");
    }

    if (this.bidMap.has(user)) {
      throw new Error("User has already placed a bid.");
    }
    if (!this.isValidBid(amount)) {
      throw new Error("Bid is not valid.");
    }
    this.bidMap.set(user, { user, amount });
    this.userParticipationManager.registerUser(user, this.auction);
  }

  public updateBid(user: IUser<"BUYER">, amount: number) {
    if (!this.auction.isOpen()) {
      throw new Error("Auction is closed.");
    }

    if (!this.bidMap.has(user)) {
      throw new Error("User has not placed a bid.");
    }
    if (!this.isValidBid(amount)) {
      throw new Error("Bid is not valid.");
    }
    this.bidMap.set(user, { user, amount });
  }

  public withdrawBid(user: IUser<"BUYER">) {
    if (!this.auction.isOpen()) {
      throw new Error("Auction is closed.");
    }

    if (!this.bidMap.has(user)) {
      throw new Error("User has not placed a bid.");
    }
    this.bidMap.delete(user);
  }

  private isValidBid(bid: number): boolean {
    return (
      bid >= this.auction.getLowestBid() && bid <= this.auction.getHighestBid()
    );
  }
}
