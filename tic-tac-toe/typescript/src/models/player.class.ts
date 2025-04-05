export type PlayerSymbol = "X" | "O";

export class Player {
  constructor(private name: string, private symbol: PlayerSymbol) {
    if (!["X", "O"].includes(symbol)) {
      throw new Error(
        `Invalid Symbol: ${symbol}. Allowed values are "X" or "O".`
      );
    }
  }

  getName(): string {
    return this.name;
  }

  getSymbol(): PlayerSymbol {
    return this.symbol;
  }
}
