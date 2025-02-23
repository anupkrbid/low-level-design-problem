import { AbstractPaymentStrategy } from "./payment-strategy.abstract-class";

export class FastTagPaymentStrategy extends AbstractPaymentStrategy {
  constructor(private fastTagId: string) {
    super();
  }

  public pay(amount: number): void {
    console.log(`Paid ${amount} using FastTag`);
  }
}
