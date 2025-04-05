# Machine Coding Assignment: Tic Tac Toe Game

## Objective

Build a fully functional, object-oriented **Tic Tac Toe** game that supports **two players** playing on a customizable board size (default: 3x3). The game continues until one player wins or the match ends in a draw.

---

## Functional Requirements

### Board

- The game board is a **square grid of size NxN**
- Board size **N should be configurable** (minimum: 3)
- The game starts with an **empty board**

### Players

- The game supports **2 players**, each assigned a **symbol** (X or O)
- Players take **alternate turns** placing their symbol on the board
- The **first player is chosen randomly** or deterministically (your choice)

### Win Conditions

A player wins if they fill an entire:

- **Row**
- **Column**
- **Primary Diagonal or Secondary Diagonal**

### Draw Condition

The game ends in a draw if:

- **All cells are filled**
- **No winning condition is met**

---

## Required APIs / Methods

| Method                                | Description                                                          |
| ------------------------------------- | -------------------------------------------------------------------- |
| `initGame(int boardSize)`             | Initializes the board of size `boardSize x boardSize`                |
| `addPlayer(String name, char symbol)` | Adds a player with the given name and symbol                         |
| `startGame()`                         | Starts the game, prints board after each move, announces winner/draw |
| `makeMove(int row, int col)`          | Makes a move for the current player at the specified cell            |
| `printBoard()` (_Optional_)           | Visualizes the current state of the board                            |
| `resetGame()` (_Optional_)            | Resets the game to the initial state                                 |

---

## Sample Console Output

```
> initGame(3)
Game initialized with a 3x3 board

> addPlayer("Alice", 'X')
Player Alice added with symbol X

> addPlayer("Bob", 'O')
Player Bob added with symbol O

> startGame()
Alice's turn [X]: Enter row and column: 0 0
Bob's turn [O]: Enter row and column: 1 1
Alice's turn [X]: Enter row and column: 0 1
Bob's turn [O]: Enter row and column: 2 2
Alice's turn [X]: Enter row and column: 0 2

Winner: Alice 🎉
```

---

## Class Design Suggestions

### Core Classes & Responsibilities

| Class                      | Responsibility                                                          |
| -------------------------- | ----------------------------------------------------------------------- |
| **GameEngine**             | Orchestrates gameplay: board setup, turn management, win/draw detection |
| **Board**                  | Manages the NxN grid, placing moves, and printing                       |
| **Player**                 | Holds player details: name and symbol                                   |
| **MoveValidator**          | Validates input: correct range, cell availability                       |
| **WinChecker**             | Determines win/draw after every move                                    |
| **GameState** (_Optional_) | Enum for game state (IN_PROGRESS, WIN, DRAW)                            |

### Constraints & Validations

- Board size **N must be ≥ 3**
- A cell can be occupied **only once**
- Player symbols must be **unique**
- Prompt if a player inputs **invalid coordinates** or repeats a move

---

## Bonus Features (_Optional_)

- `undoMove()` feature
- Support **N players** (e.g., 4x4 board with 3 players)
- Configurable **win length** (e.g., 4-in-a-row for 5x5 board)
- AI player support (random / minimax)
- **GUI** (if desired outside console)

---

## Edge Cases to Handle

- Same cell picked **twice**
- Duplicate **symbol** or **player name**
- Invalid **cell coordinates**
- Trying to play **after game is over**

---

## Deliverables

- ✅ **Console-based, working OOPs code**
- ✅ **Modular class design**
- ✅ **Clear output messages for gameplay**
- ✅ **Run everything from a `main()` method or driver class**
