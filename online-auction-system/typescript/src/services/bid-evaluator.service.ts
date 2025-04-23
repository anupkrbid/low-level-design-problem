import { Nullable } from "../utils";
import { UserParticipationManagerService } from "./user-participation-manager.service";
import {
  IBid,
  IBidEvaluator,
  IBidManager,
  IUserParticipationManager,
} from "../interfaces";

export class BidEvaluatorService implements IBidEvaluator {
  private userParticipationManager: IUserParticipationManager;
  constructor(private bidManager: IBidManager) {
    this.userParticipationManager =
      UserParticipationManagerService.getInstance();
  }
  public getWinningBid(): Nullable<IBid> {
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
