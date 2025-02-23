export abstract class AbstractPaymentStrategy {
  public abstract pay(amount: number): void;
}
