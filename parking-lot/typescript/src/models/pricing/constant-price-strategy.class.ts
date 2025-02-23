import { IPricingStrategy } from "./pricing-stratergy.interface";

export class ConstantPriceStrategy implements IPricingStrategy {
  calculatePrice(duration: number): number {
    return 100;
  }
}
