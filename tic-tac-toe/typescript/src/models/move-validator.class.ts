import { Nullable } from "../utils";

export class MoveValidator {
  constructor() {}

  static isValidMove(
    row: number,
    col: number,
    grid: Nullable<string>[][],
    gridSize: number
  ): boolean {
    if (grid[row][col] !== null) {
      return false;
    }

    if (row < 0 || col < 0 || row >= gridSize || col >= gridSize) {
      return false;
    }

    return true;
  }
}
