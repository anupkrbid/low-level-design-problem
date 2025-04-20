import { Board } from "../board.class";
import { GameEngine } from "../game-engine.class";
import { Player } from "../player.class";
import { BoardSetupState } from "./board-setup-state.class";
import { GameEngineState } from "./game-engine-state.interface";
import { InProgressState } from "./in-progress-state.class";

export class AddPlayerState implements GameEngineState {
  constructor(public gameEngine: GameEngine) {}

  getGameState(): string {
    throw new Error("Method not implemented.");
  }

  initGame(boardSize: number) {
    console.log("Cannot initialize game in AddPlayerState.");
    console.log("Use addPlayer(name, symbol) method to addPlayer to the game.");
  }
  addPlayer(name: string, symbol: string): void {
    if (
      this.gameEngine
        .getPlayers()
        .findIndex((p: Player) => p.getSymbol() === symbol) > -1
    ) {
      console.log("Symbol already taken. Please choose another symbol.");
    } else {
      const newPlayer = new Player(name, symbol);
      this.gameEngine.getPlayers().push(newPlayer);
      console.log(
        "Player " +
          newPlayer.getName() +
          " added with symbol " +
          newPlayer.getSymbol()
      );
    }
  }

  startGame(): void {
    if (this.gameEngine.getPlayers().length < 2) {
      console.log("Please add at least 2 players to start the game.");
    } else {
      this.gameEngine.setGameState(new InProgressState(this.gameEngine));
      console.log("Game is in progress.");

      this.gameEngine.setCurrentPlayer(this.gameEngine.getPlayers()[0]);
    }
  }

  makeMove(row: number, col: number): void {
    console.log("Cannot make move in AddPlayerState.");
    console.log("Please add players to the game first.");
    console.log(
      "Use addPlayer(name, symbol) method to add players to the game."
    );
    console.log("Use startGame() method to start the game.");
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
