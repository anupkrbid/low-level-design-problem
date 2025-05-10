import { Board } from "../board.class";
import { GameEngine } from "../game-engine.class";
import { AddPlayerState } from "./add-player-state.class";
import { GameEngineState } from "./game-engine-state.interface";

export class BoardSetupState implements GameEngineState {
  constructor(public gameEngine: GameEngine) {}

  getGameState(): string {
    throw new Error("Method not implemented.");
  }

  initGame(boardSize: number): void {
    if (boardSize < 3) {
      console.log("Invalid board size. Please choose a min board size of 3.");
    } else {
      this.gameEngine.setBoard(new Board(boardSize));
      this.gameEngine.getBoard().printBoard();
      this.gameEngine.setGameState(new AddPlayerState(this.gameEngine));
      console.log(
        "Game initialized with a " + boardSize + "x" + boardSize + " board"
      );
    }
  }

  addPlayer(name: string, symbol: string): void {
    console.log("Cannot add player in BoardSetupState.");
    console.log("Please initialize the game first.");
    console.log("Use initGame(boardSize) method to initialize the game.");
  }

  startGame(): void {
    console.log("Cannot start game in BoardSetupState.");
    console.log("Please initialize the game first.");
    console.log("Use initGame(boardSize) method to initialize the game.");
  }

  makeMove(row: number, col: number): void {
    console.log("Cannot make move in BoardSetupState.");
    console.log("Please initialize the game first.");
    console.log("Use initGame(boardSize) method to initialize the game.");
  }

  printBoard(): void {
    console.log("Cannot print board in BoardSetupState.");
    console.log("Please initialize the game first.");
    console.log("Use initGame(boardSize) method to initialize the game.");
  }

  resetGame(): void {
    this.gameEngine.setGameState(new BoardSetupState(this.gameEngine));
    this.gameEngine.resetPlayers();
    console.log(
      "Game has been reset. You can now initialize and start a new game."
    );
  }
}
