import { Board } from "./board.class";

export const GameResultState = {
  IN_PROGRESS: "IN_PROGRESS",
  DRAW: "DRAW",
  WIN: "WIN",
} as const;

// Type: "IN_PROGRESS" | "DRAW" | "WIN"
export type GameResultStateType =
  (typeof GameResultState)[keyof typeof GameResultState];

export class GameEngine {
  private board: Board;
  private moves: [number, number, string][] = [];
  private gameState: GameResultStateType = GameResultState.IN_PROGRESS;

  //   private winner: string | null;

  //   constructor() {

  //     this.currentPlayer = 'X';
  //     this.winner = null;
  //   }

  setupBoard(boardSize: number = 3): void {
    this.board = new Board(boardSize);
    this.board.printBoard();
  }

  addPlayer(player: string): void {
    this.board.addPlayer(player, symbol);
    this.moves.push([this.board.getPlayerIndex(player), 0, symbol]);
    this.board.printBoard();
  }

  //   public makeMove(position: number): boolean {
  //     if (this.board[position] || this.winner) {
  //       return false; // Invalid move
  //     }
  //     this.board[position] = this.currentPlayer;
  //     if (this.checkWinner()) {
  //       this.winner = this.currentPlayer;
  //     } else {
  //       this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  //     }
  //     return true;
  //   }
}
