import { AuctionStatus } from "../enums";
import {
  IAuction,
  IBidManager,
  IBidEvaluator,
  IProfitCalculator,
  IUser,
} from "../interfaces";
import {
  BidManagerService,
  BidEvaluatorService,
  ProfitCalculatorService,
} from "../services";

export class Auction implements IAuction {
  private bidManager: IBidManager;
  private bidEvaluator: IBidEvaluator;
  private profitCalculator: IProfitCalculator;
  private status: AuctionStatus = AuctionStatus.OPEN;
  constructor(
    private id: string,
    private lowestBid: number,
    private highestBid: number,
    private participationCost: number,
    private seller: IUser<"SELLER">
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

  getProfitCalculator(): IProfitCalculator {
    return this.profitCalculator;
  }

  close(): void {
    this.status = AuctionStatus.CLOSED;
  }

  isOpen(): boolean {
    return this.status === AuctionStatus.OPEN;
  }

  getSeller(): IUser<"SELLER"> {
    return this.seller;
  }

  getBidManager(): IBidManager {
    return this.bidManager;
  }

  getBidEvaluator(): IBidEvaluator {
    return this.bidEvaluator;
  }
}
