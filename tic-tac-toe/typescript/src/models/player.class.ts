// export type PlayerSymbol = "X" | "O";

export class Player {
  constructor(private name: string, private symbol: string) {}

  getName(): string {
    return this.name;
  }

  getSymbol(): string {
    return this.symbol;
  }
}
