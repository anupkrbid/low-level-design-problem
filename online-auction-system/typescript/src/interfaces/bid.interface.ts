import { User } from "../models/user.class";

export interface Bid {
  user: User<"BUYER">;
  amount: number;
}
