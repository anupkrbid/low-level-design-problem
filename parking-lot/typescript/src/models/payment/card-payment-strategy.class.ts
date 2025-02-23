import { AbstractPaymentStrategy } from "./payment-strategy.abstract-class";

export class CardPaymentStrategy extends AbstractPaymentStrategy {
  constructor(private cardNumber: string, private cvv: string) {
    super();
  }
  public pay(amount: number): void {
    console.log(`Paying ${amount} using card.`);
  }
}
