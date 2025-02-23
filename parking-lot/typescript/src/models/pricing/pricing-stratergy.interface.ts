export interface IPricingStrategy {
  calculatePrice(duration: number): number;
}
