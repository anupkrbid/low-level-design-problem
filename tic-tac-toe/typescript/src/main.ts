import { GameEngine } from "./models/game-engine.class";
import { Player } from "./models/player.class";

const gameName: string = "Tic Tac Toe";
console.log(`Hello, ${gameName}!`);

const gameEngine = new GameEngine();
gameEngine.setupBoard(3);

const p1 = new Player("Player 1", "X");
const p2 = new Player("Player 2", "O");
// Example moves
// gameEngine.makeMove(0);
