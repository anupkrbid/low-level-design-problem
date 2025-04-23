import { IAuction, IBid, IUser } from "../interfaces";
import { Nullable } from "../utils";
import { Auction } from "./auction.class";
import { User } from "./user.class";

export class OnlineAuctionSystem {
  private auctions: IAuction[] = [];
  private sellers: IUser<"SELLER">[] = [];
  private buyers: IUser<"BUYER">[] = [];

  constructor() {}

  public addBuyer(name: string): void {
    const existingBuyer = this.buyers.find((b) => b.getName() === name);
    if (existingBuyer) {
      throw new Error(`Buyer ${name} already exists`);
    }
    this.buyers.push(new User<"BUYER">(name, "BUYER"));
  }

  public addSeller(name: string): void {
    const existingSeller = this.sellers.find((s) => s.getName() === name);
    if (existingSeller) {
      throw new Error(`Seller ${name} already exists`);
    }
    this.sellers.push(new User<"SELLER">(name, "SELLER"));
  }

  public createAuction(
    id: string,
    lowestBid: number,
    highestBid: number,
    participationCost: number,
    sellerName: string
  ): void {
    const existingSeller = this.sellers.find((s) => s.getName() === sellerName);
    if (!existingSeller) {
      throw new Error(`Seller ${sellerName} not found`);
    }
    const auction = new Auction(
      id,
      lowestBid,
      highestBid,
      participationCost,
      existingSeller
    );
    this.auctions.push(auction);
  }
  public createBid(
    buyerName: string,
    auctionId: string,
    bidAmount: number
  ): void {
    const existingBuyer = this.buyers.find((b) => b.getName() === buyerName);
    if (!existingBuyer) {
      throw new Error(`Buyer ${buyerName} not found`);
    }
    const auction = this.auctions.find((a) => a.getId() === auctionId);
    if (!auction) {
      throw new Error(`AuctionId ${auctionId} not found`);
    }
    const bidManager = auction.getBidManager();
    bidManager.createBid(existingBuyer, bidAmount);
  }

  public updateBid(
    buyerName: string,
    auctionId: string,
    bidAmount: number
  ): void {
    const existingBuyer = this.buyers.find((b) => b.getName() === buyerName);
    if (!existingBuyer) {
      throw new Error(`Buyer ${buyerName} not found`);
    }
    const auction = this.auctions.find((a) => a.getId() === auctionId);
    if (!auction) {
      throw new Error(`AuctionId ${auctionId} not found`);
    }
    const bidManager = auction.getBidManager();
    bidManager.updateBid(existingBuyer, bidAmount);
  }

  withdrawBid(buyerName: string, auctionId: string): void {
    const existingBuyer = this.buyers.find((b) => b.getName() === buyerName);
    if (!existingBuyer) {
      throw new Error(`Buyer ${buyerName} not found`);
    }
    const auction = this.auctions.find((a) => a.getId() === auctionId);
    if (!auction) {
      throw new Error(`AuctionId ${auctionId} not found`);
    }
    const bidManager = auction.getBidManager();
    bidManager.withdrawBid(existingBuyer);
  }

  closeAuction(auctionId: string): Nullable<IBid> {
    const existingAuction = this.auctions.find((a) => a.getId() === auctionId);
    if (!existingAuction) {
      throw new Error(`AuctionId ${auctionId} not found`);
    }
    existingAuction.close();
    return existingAuction.getBidEvaluator().getWinningBid();
  }

  getProfit(sellerName: string, auctionId: string): number {
    const existingAuction = this.auctions.find((a) => a.getId() === auctionId);
    if (!existingAuction) {
      throw new Error(`AuctionId ${auctionId} not found`);
    }

    return existingAuction.getProfitCalculator().calculateProfit();
  }
}
