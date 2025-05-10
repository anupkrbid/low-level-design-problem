import { Board } from "../board.class";
import { GameEngine } from "../game-engine.class";
import { BoardSetupState } from "./board-setup-state.class";
import { GameEngineState } from "./game-engine-state.interface";

export class EndGameState implements GameEngineState {
  constructor(public gameEngine: GameEngine) {}

  getGameState(): string {
    throw new Error("Method not implemented.");
  }

  initGame(boardSize: number): void {
    console.log("Cannot initialize game in EndGameState.");
    console.log("Use resetGame() method to reset the game.");
  }

  addPlayer(name: string, symbol: string): void {
    console.log("Cannot add player in EndGameState.");
    console.log("Use resetGame() method to reset the game.");
  }

  startGame(): void {
    console.log("Cannot start game in EndGameState.");
    console.log("Use resetGame() method to reset the game.");
  }

  makeMove(row: number, col: number): void {
    console.log("Cannot make a move in EndGameState.");
    console.log("Use resetGame() method to reset the game.");
  }

  printBoard(): void {
    this.gameEngine.getBoard().printBoard();
  }

  resetGame(): void {
    this.gameEngine.setGameState(new BoardSetupState(this.gameEngine));
    this.gameEngine.resetPlayers();
    console.log(
      "Game has been reset. You can now initialize and start a new game."
    );
  }
}
