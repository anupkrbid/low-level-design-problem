import { AbstractPaymentStrategy } from "./payment-strategy.abstract-class";

export class CashPaymentStrategy extends AbstractPaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ${amount} using cash`);
  }
}
