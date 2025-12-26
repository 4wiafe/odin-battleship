# Battleship Game
A classic Battleship game built with vanilla JavaScript, following Test-Driven Development (TDD) principles and clean separation of concerns.
The game is played against a computer opponent with turn-based logic and a simple UI.

## 🎮 Features
- Player vs Computer gameplay
- Turn-based attack system
- Ships with hit and sunk logic
- Gameboards with hit/miss tracking
- Computer makes random legal moves
- Game over detection with winner display
- Restart game functionality
Clean separation between logic and UI

## 🧱 Project Structure
src/
├── ships/
│   └── ships.js
├── gameboard/
│   └── gameboard.js
├── player/
│   ├── player.js
│   └── computer.js
├── gamecontroller/
│   └── gamecontroller.js
├── appcontroller/
│   └── appcontroller.js
├── uicontroller/
│   └── uicontroller.js
├── storageservice/
│   └── storageservice.js
└── index.js

## 🧠 Architecture Overview
### Core Logic (No DOM)

#### Ship
Handles hits and sunk state.

#### Gameboard
Manages ship placement, attacks, and board state.

#### Player / Computer
Own a gameboard and perform moves.

#### GameController
Controls turn logic and game rules.

### Application Layer

#### AppController
Coordinates game flow, turn timing, and game-over logic.

### UI Layer

#### UIController
Handles rendering, user interactions, and visual updates.
No game logic lives here.

## Testing
Written with Jest
Focuses on public interfaces only
DOM is intentionally excluded from tests
Logic is fully testable in isolation

## 🛠️ Technologies Used
- JavaScript (ES Modules)
- HTML & CSS
- Jest (for testing)

## 📌 Notes
This project was built as part of a TDD learning exercise, focusing on:
Clean architecture
Separation of concerns
Maintainable, testable code
