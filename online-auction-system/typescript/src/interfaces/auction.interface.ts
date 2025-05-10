import { AuctionStatus } from "../enums/auction-status.enum";
import { IBidEvaluator } from "./bid-evaluator.interface";
import { IBidManager } from "./bid-manager.interface";
import { IProfitCalculator } from "./profit-calculator.interface";
import { IUser } from "./user.interface";

export interface IAuction {
  getId(): string;
  getLowestBid(): number;
  getHighestBid(): number;
  getParticipationCost(): number;
  getAuctionStatus(): AuctionStatus;
  getProfitCalculator(): IProfitCalculator;
  close(): void;
  isOpen(): boolean;
  getSeller(): IUser<"SELLER">;
  getBidManager(): IBidManager;
  getBidEvaluator(): IBidEvaluator;
}
