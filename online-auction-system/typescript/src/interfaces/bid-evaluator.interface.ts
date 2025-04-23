import { IBid } from "./bid.interface";
import { Nullable } from "../utils";

export interface IBidEvaluator {
  getWinningBid(): Nullable<IBid>;
}
