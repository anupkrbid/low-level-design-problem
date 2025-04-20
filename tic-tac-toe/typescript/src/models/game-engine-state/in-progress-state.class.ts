import { Nullable } from "../../utils";
import { Board } from "../board.class";
import { GameEngine } from "../game-engine.class";
import { Player } from "../player.class";
import { WinChecker } from "../win-checker.class";
import { BoardSetupState } from "./board-setup-state.class";
import { EndGameState } from "./end-game-state.class";
import { GameEngineState } from "./game-engine-state.interface";

export class InProgressState implements GameEngineState {
  constructor(public gameEngine: GameEngine) {}

  getGameState(): string {
    throw new Error("Method not implemented.");
  }

  initGame(boardSize: number): void {
    console.log("Cannot initialize game in InProgressState.");
    console.log("Use makeMove(row, col) method to makeMove in the game.");
    console.log("Use resetGame() method to reset the game.");
  }

  addPlayer(name: string, symbol: string): void {
    console.log("Cannot add player in InProgressState.");
    console.log("Use makeMove(row, col) method to makeMove in the game.");
    console.log("Use resetGame() method to reset the game.");
  }

  startGame(): void {
    console.log("Cannot start game in InProgressState.");
    console.log("Use makeMove(row, col) method to makeMove in the game.");
    console.log("Use resetGame() method to reset the game.");
  }

  makeMove(row: number, col: number): void {
    const board = this.gameEngine.getBoard();

    if (!board.placeMove(row, col, this.gameEngine.getCurrentPlayer()!)) {
      return;
    }

    const winner: Nullable<string> = WinChecker.findWinner(
      board.getBoard(),
      board.getBoardSize()
    );

    if (winner) {
      console.log(
        `Winner: ${this.gameEngine.getCurrentPlayer()?.getName()} 🎉`
      );
      this.gameEngine.setGameState(new EndGameState(this.gameEngine));
      this.gameEngine.getBoard().printBoard();
      console.log("Game Over");
    } else {
      const nextPlayer = this.getPlayerForNextMove();
      this.gameEngine.setCurrentPlayer(nextPlayer);
    }
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

  private getPlayerForNextMove(): Player {
    const history = this.gameEngine.getBoard().getMovesHistory();

    const lastMove = history[history.length - 1];
    const lastMovePlayer = lastMove[2];

    const allPlayers = this.gameEngine.getPlayers();

    const lastPlayerIndex = allPlayers.findIndex(
      (player: Player) => player.getSymbol() === lastMovePlayer.getSymbol()
    );

    const nextPlayerIndex = (lastPlayerIndex + 1) % allPlayers.length;
    const nextPlayer = allPlayers[nextPlayerIndex];

    return nextPlayer;
  }
}
