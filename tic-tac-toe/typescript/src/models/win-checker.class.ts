import { Nullable } from "../utils";

export class WinChecker {
  checkWin(grid: Nullable<string>[][], gridLength: number): boolean {
    // Check rows
    for (let i = 0; i < gridLength; i++) {
      if (grid[i].every((cell) => cell === grid[i][0] && cell !== null)) {
        return true;
      }
    }

    // Check columns
    for (let i = 0; i < gridLength; i++) {
      if (grid.every((row) => row[i] === grid[0][i] && row[i] !== null)) {
        return true;
      }
    }

    // Check diagonals
    if (
      grid.every(
        (row, index) => row[index] === grid[0][0] && row[index] !== null
      )
    ) {
      return true;
    }
    if (
      grid.every(
        (row, index) =>
          row[gridLength - 1 - index] === grid[0][gridLength - 1] &&
          row[gridLength - 1 - index] !== null
      )
    ) {
      return true;
    }

    return false;
  }
}
