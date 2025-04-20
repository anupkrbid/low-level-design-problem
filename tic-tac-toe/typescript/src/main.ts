import colors from "yoctocolors";
import {
  intro,
  outro,
  isCancel,
  cancel,
  log,
  spinner,
  text,
} from "@clack/prompts";
import { GameEngine } from "./models/game-engine.class";

const sleep = (ms: number) =>
  new Promise((resolve, reject) => setTimeout(resolve, ms));

const s = spinner();

const game = new GameEngine();

intro(`${colors.cyan("Welcome to Tic Tac Toe!")}`);

const boardSize = await text({
  message: "Initialize Board Size",
  defaultValue: "3",
  validate(value) {
    if (!/^\d+$/.test(value) || parseInt(value, 10) <= 2) {
      return "Please enter a valid number greater than 2!";
    }
  },
});

if (isCancel(boardSize)) {
  cancel("Operation cancelled.");
  process.exit(0);
} else {
  game.initGame(parseInt(boardSize, 10));
}

// s.start("Installing via npm");

// await sleep(3000);
// log.info(
//   `${colors.yellow(
//     "This is a simple Tic Tac Toe game implemented in TypeScript."
//   )}`
// );
// s.stop("Installed via npm");
// log.info(
//   `${colors.yellow(
//     "This is a simple Tic Tac Toe game implemented in TypeScript."
//   )}`
// );

// s.start("Installing via npm");
// await sleep(3000);

// s.stop("Installed via npm");
outro(`You're all set!`);
function setTimeout(resolve: (value: unknown) => void, ms: number): void {
  throw new Error("Function not implemented.");
}
