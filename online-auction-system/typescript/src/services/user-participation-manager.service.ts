import { Auction } from "../models/auction.class";
import { User } from "../models/user.class";

export class UserParticipationManagerService {
  private static instance: UserParticipationManagerService;
  private participationMap = new Map<User<"BUYER">, Set<Auction>>();
  private auctionMap = new Map<Auction, Set<User<"BUYER">>>();

  private constructor() {}

  public static getInstance(): UserParticipationManagerService {
    if (!UserParticipationManagerService.instance) {
      UserParticipationManagerService.instance =
        new UserParticipationManagerService();
    }
    return UserParticipationManagerService.instance;
  }

  public registerUser(user: User<"BUYER">, auction: Auction): void {
    if (!this.participationMap.has(user)) {
      this.participationMap.set(user, new Set<Auction>());
    }
    this.participationMap.get(user)?.add(auction);

    if (!this.auctionMap.has(auction)) {
      this.auctionMap.set(auction, new Set<User<"BUYER">>());
    }
    this.auctionMap.get(auction)?.add(user);
  }

  public getBidderCount(auction: Auction): number {
    if (this.auctionMap.has(auction)) {
      return this.auctionMap.get(auction)?.size ?? 0;
    }
    return 0;
  }

  public isBuyerPreferred(user: User<"BUYER">): boolean {
    if (this.participationMap.has(user)) {
      return (this.participationMap.get(user)?.size ?? 0) > 2;
    }
    return false;
  }
}
