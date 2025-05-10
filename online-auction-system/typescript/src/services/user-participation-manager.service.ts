import { IAuction, IUser, IUserParticipationManager } from "../interfaces";

export class UserParticipationManagerService
  implements IUserParticipationManager
{
  private static instance: UserParticipationManagerService;
  private participationMap = new Map<IUser<"BUYER">, Set<IAuction>>();
  private auctionMap = new Map<IAuction, Set<IUser<"BUYER">>>();

  private constructor() {}

  public static getInstance(): IUserParticipationManager {
    if (!UserParticipationManagerService.instance) {
      UserParticipationManagerService.instance =
        new UserParticipationManagerService();
    }
    return UserParticipationManagerService.instance;
  }

  public registerUser(user: IUser<"BUYER">, auction: IAuction): void {
    if (!this.participationMap.has(user)) {
      this.participationMap.set(user, new Set<IAuction>());
    }
    this.participationMap.get(user)?.add(auction);

    if (!this.auctionMap.has(auction)) {
      this.auctionMap.set(auction, new Set<IUser<"BUYER">>());
    }
    this.auctionMap.get(auction)?.add(user);
  }

  public getBidderCount(auction: IAuction): number {
    if (this.auctionMap.has(auction)) {
      return this.auctionMap.get(auction)?.size ?? 0;
    }
    return 0;
  }

  public isBuyerPreferred(user: IUser<"BUYER">): boolean {
    if (this.participationMap.has(user)) {
      return (this.participationMap.get(user)?.size ?? 0) > 2;
    }
    return false;
  }
}

// Type assertion to ensure the class implements the static interface
// (
//   UserParticipationManagerService as unknown as IUserParticipationManager.Static
// ).getInstance = UserParticipationManagerService.getInstance;
