import { Bid } from "../interfaces/bid.interface";
import { Auction } from "../models/auction.class";
import { User } from "../models/user.class";
import { UserParticipationManagerService } from "./user-participation-manager.service";

export class BidManagerService {
  private bidMap = new Map<User<"BUYER">, Bid>();
  private userParticipationManager: UserParticipationManagerService;
  constructor(private auction: Auction) {
    this.userParticipationManager =
      UserParticipationManagerService.getInstance();
  }

  public getBids(): Bid[] {
    return Array.from(this.bidMap.values());
  }

  public createBid(user: User<"BUYER">, amount: number) {
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

  public updateBid(user: User<"BUYER">, amount: number) {
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

  public withdrawBid(user: User<"BUYER">) {
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
