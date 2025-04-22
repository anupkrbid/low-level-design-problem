import { Auction } from "../models/auction.class";
import { UserParticipationManagerService } from "./user-participation-manager.service";

export class ProfitCalculatorService {
  private userParticipationManager: UserParticipationManagerService;
  constructor(private auction: Auction) {
    this.userParticipationManager =
      UserParticipationManagerService.getInstance();
  }

  public calculateProfit(): number {
    const winningBid = this.auction.getBidEvaluator().getWinningBid();

    const bidderCommision =
      this.userParticipationManager.getBidderCount(this.auction) *
      0.2 *
      this.auction.getParticipationCost();

    if (winningBid) {
      return (
        bidderCommision +
        winningBid.amount -
        (this.auction.getLowestBid() + this.auction.getHighestBid()) / 2
      );
    }

    return bidderCommision;
  }
}
