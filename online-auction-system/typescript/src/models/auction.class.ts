import { AuctionStatus } from "../enums/auction-status.enum";
import { BidEvaluatorService } from "../services/bid-evaluator.service";
import { BidManagerService } from "../services/bid-manager.service";
import { ProfitCalculatorService } from "../services/profit-calculator.service";
import { User } from "./user.class";

export class Auction {
  private bidManager: BidManagerService;
  private bidEvaluator: BidEvaluatorService;
  private profitCalculator: ProfitCalculatorService;
  private status: AuctionStatus = AuctionStatus.OPEN;
  constructor(
    private id: string,
    private lowestBid: number,
    private highestBid: number,
    private participationCost: number,
    private seller: User<"SELLER">
  ) {
    this.bidManager = new BidManagerService(this);
    this.bidEvaluator = new BidEvaluatorService(this.bidManager);
    this.profitCalculator = new ProfitCalculatorService(this);
  }

  getId(): string {
    return this.id;
  }

  getLowestBid(): number {
    return this.lowestBid;
  }

  getHighestBid(): number {
    return this.highestBid;
  }

  getParticipationCost(): number {
    return this.participationCost;
  }

  getAuctionStatus(): AuctionStatus {
    return this.status;
  }

  getProfitCalculator(): ProfitCalculatorService {
    return this.profitCalculator;
  }

  close(): void {
    this.status = AuctionStatus.CLOSED;
  }

  isOpen(): boolean {
    return this.status === AuctionStatus.OPEN;
  }

  getSeller(): User<"SELLER"> {
    return this.seller;
  }

  getBidManager(): BidManagerService {
    return this.bidManager;
  }

  getBidEvaluator(): BidEvaluatorService {
    return this.bidEvaluator;
  }
}
