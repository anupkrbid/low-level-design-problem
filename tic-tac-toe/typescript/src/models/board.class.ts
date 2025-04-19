import { Nullable } from "../utils";
import { MoveValidator } from "./move-validator.class";
import { Player } from "./player.class";

export class Board {
  private grid: string[][] = [];
  private history: [number, number, Player][] = [];

  constructor(private gridSize: number) {
    this.grid = Array(this.gridSize).fill(Array(this.gridSize).fill(null));
  }

  getBoard(): string[][] {
    return this.grid;
  }

  getBoardSize(): number {
    return this.gridSize;
  }

  placeMove(row: number, col: number, player: Player): boolean {
    if (MoveValidator.isValidMove(row, col, this.grid, this.gridSize)) {
      this.grid[row][col] = player.getSymbol();
      this.history.push([row, col, player]);
      return true;
    } else {
      console.log("Invalid Move: Cell already occupied or out of bounds");
      return false;
    }
  }

  getMovesHistory(): [number, number, Player][] {
    return this.history;
  }

  printBoard(): void {
    console.log(this.grid.map((row) => row.join(" | ")).join("\n"));
  }
}
