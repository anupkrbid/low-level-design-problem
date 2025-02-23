import { IPricingStrategy } from "./pricing-stratergy.interface";

export class HourlyPriceStrategy implements IPricingStrategy {
  constructor(private basePrice: number) {}

  public calculatePrice(duration: number): number {
    return this.basePrice * duration;
  }
}
