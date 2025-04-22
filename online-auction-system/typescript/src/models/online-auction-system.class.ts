import { Bid } from "../interfaces/bid.interface";
import { Nullable } from "../utils";
import { Auction } from "./auction.class";
import { User } from "./user.class";

export class OnlineAuctionSystem {
  private auctions: Auction[] = [];
  private sellers: User<"SELLER">[] = [];
  private buyers: User<"BUYER">[] = [];

  constructor() {}

  public addBuyer(name: string): void {
    this.buyers.push(new User<"BUYER">(name, "BUYER"));
  }

  public addSeller(name: string): void {
    this.sellers.push(new User<"SELLER">(name, "SELLER"));
  }

  public createAuction(
    id: string,
    lowestBid: number,
    highestBid: number,
    participationCost: number,
    sellerName: string
  ): void {
    const seller = this.sellers.find((s) => s.getName() === sellerName);
    if (!seller) {
      throw new Error(`Seller ${sellerName} not found`);
    }
    const auction = new Auction(
      id,
      lowestBid,
      highestBid,
      participationCost,
      seller
    );
    this.auctions.push(auction);
  }
  public createBid(
    buyerName: string,
    auctionId: string,
    bidAmount: number
  ): void {
    const buyer = this.buyers.find((b) => b.getName() === buyerName);
    if (!buyer) {
      throw new Error(`Buyer ${buyerName} not found`);
    }
    const auction = this.auctions.find((a) => a.getId() === auctionId);
    if (!auction) {
      throw new Error(`Auction ${auctionId} not found`);
    }
    const bidManager = auction.getBidManager();
    bidManager.createBid(buyer, bidAmount);
  }

  public updateBid(
    buyerName: string,
    auctionId: string,
    bidAmount: number
  ): void {
    const buyer = this.buyers.find((b) => b.getName() === buyerName);
    if (!buyer) {
      throw new Error(`Buyer ${buyerName} not found`);
    }
    const auction = this.auctions.find((a) => a.getId() === auctionId);
    if (!auction) {
      throw new Error(`Auction ${auctionId} not found`);
    }
    const bidManager = auction.getBidManager();
    bidManager.updateBid(buyer, bidAmount);
  }

  withdrawBid(buyerName: string, auctionId: string): void {
    const buyer = this.buyers.find((b) => b.getName() === buyerName);
    if (!buyer) {
      throw new Error(`Buyer ${buyerName} not found`);
    }
    const auction = this.auctions.find((a) => a.getId() === auctionId);
    if (!auction) {
      throw new Error(`Auction ${auctionId} not found`);
    }
    const bidManager = auction.getBidManager();
    bidManager.withdrawBid(buyer);
  }

  closeAuction(auctionId: string): Nullable<Bid> {
    const auction = this.auctions.find((a) => a.getId() === auctionId);
    if (!auction) {
      throw new Error(`Auction ${auctionId} not found`);
    }
    auction.close();
    return auction.getBidEvaluator().getWinningBid();
  }

  getProfit(sellerName: string, auctionId: string): number {
    const auction = this.auctions.find((a) => a.getId() === auctionId);
    if (!auction) {
      throw new Error(`Auction ${auctionId} not found`);
    }

    return auction.getProfitCalculator().calculateProfit();
  }
}
