import { Computer } from "../player/computer.js";
import { Player } from "../player/player.js";

class GameController {
  constructor() {
    this.currentTurn = null;
    this.isGameOver = false;
    this.winner = null;
  }

  initialize() {
    this.player = new Player();
    this.computer = new Computer();
    this.player.setShips();
    this.computer.setShips();
    this.currentTurn = this.player;
    this.isGameOver = false;
    this.winner = null;
  }

  switchTurn() {
    return (this.currentTurn =
      this.currentTurn === this.player ? this.computer : this.player);
  }

  executeTurn(x, y) {
    if (this.checkGameOver()) return "Game is already over.";
    
    const currentTurn = this.currentTurn;
    const player = this.player;
    const computer = this.computer;
    let target;
    let attackResult;

    if (currentTurn === player) {
      target = computer.gameboard;
      attackResult = player.makeMove(target, x, y);

      if (attackResult === "already hit") {
        console.log("Spot already hit. Try again with new coordinates.");

        return "already hit";
      }
      
      if (attackResult === "miss") {
        this.switchTurn();

        return "miss";
      }
      
      if (attackResult === "hit") {
        if (this.checkGameOver()) {
          return "Game over!";
        }

        console.log("Hit! Attack again with new coordinates.");
      }
    } else {
      target = player.gameboard;
      attackResult = computer.makeMove(target, x, y);

      if (attackResult === "miss") {
        this.switchTurn();

        return "miss";
      }
      
      if (attackResult === "already hit") {
        console.log("Chosen spot already hit. Generating new attack coordinates...");
        const newX = Math.floor(Math.random() * 10);
        const newY = Math.floor(Math.random() * 10);

        return computer.makeMove(target, newX, newY);
      }
      
      if (attackResult === "hit") {
        if (this.checkGameOver()) {
          return "Game over!";
        }

        const newX = Math.floor(Math.random() * 10);
        const newY = Math.floor(Math.random() * 10);

        return computer.makeMove(target, newX, newY);
      }
    }

    return attackResult;
  }

  checkGameOver() {
    if (this.computer.gameboard.allShipsSunk()) {
      this.isGameOver = true;
      this.winner = this.player

      return true;
    }

    if (this.player.gameboard.allShipsSunk()) {
      this.isGameOver = true;
      this.winner = this.computer;

      return true;
    }

    return false;
  }

  restartGame() {
    this.initialize();
  }

  toJSON() {
    return {
      player: this.player.toJSON(),
      computer: this.computer.toJSON(),
      currentTurn: this.currentTurn === this.player ? "player" : "computer",
      isGameOver: this.isGameOver,
      winner: this.winner
        ? this.winner === this.player
          ? "player"
          : "computer"
        : null
    };
  }

  static fromJSON(data) {
    const gameController = new GameController();
    gameController.player = Player.fromJSON(data.player);
    gameController.computer = Computer.fromJSON(data.computer);
    gameController.currentTurn = data.currentTurn === "player"
      ? gameController.player
      : gameController.computer;
    
    gameController.isGameOver = data.isGameOver;
    gameController.winner = data.winner === "player"
      ? gameController.player
      : data.winner === "computer"
        ? gameController.computer
      : null;

    return gameController;
  }
}

export { GameController };
