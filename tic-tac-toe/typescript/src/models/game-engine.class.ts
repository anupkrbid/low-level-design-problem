import { Nullable } from "../utils";
import { Board } from "./board.class";
import { BoardSetupState } from "./game-engine-state/board-setup-state.class";
import { GameEngineState } from "./game-engine-state/game-engine-state.interface";
import { Player } from "./player.class";

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
  private players: Player[] = [];
  // private gameState: GameResultStateType = GameResultState.IN_PROGRESS;

  private currentState: GameEngineState;
  private currentPlayer: Nullable<Player> = null;

  constructor() {
    this.setGameState(new BoardSetupState(this));
  }

  getBoard(): Board {
    return this.board;
  }

  setBoard(board: Board): void {
    this.board = board;
  }

  setGameState(state: GameEngineState): void {
    this.currentState = state;
  }

  resetPlayers(): void {
    this.players = [];
    this.currentPlayer = null;
  }

  setCurrentPlayer(player: Player): void {
    this.currentPlayer = player;
    console.log(
      `${this.currentPlayer.getName()}'s turn [${this.currentPlayer.getSymbol()}]: Enter row and column: `
    );
  }

  getCurrentPlayer(): Nullable<Player> {
    return this.currentPlayer;
  }

  getPlayers(): Player[] {
    return this.players;
  }

  initGame(boardSize: number): void {
    this.currentState.initGame(boardSize);
  }

  addPlayer(playerName: string, symbol: string): void {
    this.currentState.addPlayer(playerName, symbol);
  }

  startGame(): void {
    this.currentState.startGame();
  }

  makeMove(row: number, col: number): void {
    this.currentState.makeMove(row, col);
  }

  printBoard(): void {
    this.currentState.printBoard();
  }

  resetGame(): void {
    this.currentState.resetGame();
  }
}
