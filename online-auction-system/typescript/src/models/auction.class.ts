import { BidEvaluatorService } from "../services/bid-evaluator.service";
import { BidManagerService } from "../services/bid-manager.service";
import { User } from "./user.class";

export class Auction {
  private bidManager: BidManagerService;
  private bidEvaluator: BidEvaluatorService;
  constructor(
    private id: string,
    private lowestBid: number,
    private highestBid: number,
    private participationCose: number,
    private seller: User<"SELLER">
  ) {
    this.bidManager = new BidManagerService(this);
    this.bidEvaluator = new BidEvaluatorService(this.bidManager);
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
    return this.participationCose;
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
