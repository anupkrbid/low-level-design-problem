import { GameEngine } from "../game-engine.class";

export interface GameEngineState {
  gameEngine: GameEngine;

  getGameState(): string;

  initGame(boardSize: number): void;
  addPlayer(name: string, symbol: string): void;
  startGame(): void;
  makeMove(row: number, col: number): void;
  printBoard(): void;
  resetGame(): void;
}

// BoardSetup -> AddPlayer -> ReadToPlay -> InProgress -> End
