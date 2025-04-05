import { Nullable } from "../utils";
import { MoveValidator } from "./move-validator.class";
import { Player } from "./player.class";

export class Board {
  private grid: Nullable<string>[][] = [];
  private history: Nullable<[number, number, Player]>[] = [];

  constructor(private gridSize: number) {
    this.grid = Array(this.gridSize).fill(Array(this.gridSize).fill(null));
  }

  getBoard(): Nullable<string>[][] {
    return this.grid;
  }

  getBoardSize(): number {
    return this.gridSize;
  }

  placeMove(row: number, col: number, player: Player): void {
    if (MoveValidator.isValidMove(row, col, this.grid, this.gridSize)) {
      this.grid[row][col] = player.getSymbol();
      this.history.push([row, col, player]);
      this.printBoard();
    } else {
      console.log("Invalid Move: Cell already occupied or out of bounds");
    }
  }

  printBoard(): void {
    console.log(this.grid.map((row) => row.join(" | ")).join("\n"));
  }
}
