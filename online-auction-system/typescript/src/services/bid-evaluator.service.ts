import { Bid } from "../interfaces/bid.interface";
import { Nullable } from "../utils";
import { BidManagerService } from "./bid-manager.service";
import { UserParticipationManagerService } from "./user-participation-manager.service";

export class BidEvaluatorService {
  private userParticipationManager: UserParticipationManagerService;
  constructor(private bidManager: BidManagerService) {
    this.userParticipationManager =
      UserParticipationManagerService.getInstance();
  }
  public getWinningBid(): Nullable<Bid> {
    const bids = this.bidManager.getBids();
    if (bids.length === 0) {
      return null;
    }

    let highestBids = [bids[0]];
    for (const bid of bids) {
      if (bid.amount > highestBids[0].amount) {
        highestBids = [bid];
      } else if (bid.amount === highestBids[0].amount) {
        highestBids.push(bid);
      }
    }

    if (highestBids.length > 1) {
      // Filter bids for which the buyer is preferred.
      const preferredBids = highestBids.filter((bid) =>
        this.userParticipationManager.isBuyerPreferred(bid.user)
      );
      // Return the preferred bid if it's unique.
      return preferredBids.length === 1 ? preferredBids[0] : null;
    }

    return highestBids[0]; // Winner
  }
}
