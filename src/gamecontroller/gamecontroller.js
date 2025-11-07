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
      } else if (attackResult === "miss") {
        this.switchTurn();

        return "miss";
      } else if (attackResult === "hit") {
        if (target.allShipsSunk()) {
          this.isGameOver = true;
          this.winner = currentTurn;

          return "Game over!"
        } else {
          console.log("Hit! Attack again with new coordinates.");
        }
      }
    } else {
      target = player.gameboard;
      attackResult = computer.makeMove(target, x, y);

      if (attackResult === "miss") {
        this.switchTurn();

        return "miss";
      } else if (attackResult === "already hit") {
        console.log("Chosen spot already hit. Generating new attack coordinates...");
        const newX = Math.floor(Math.random() * 10);
        const newY = Math.floor(Math.random() * 10);

        attackResult = computer.makeMove(target, newX, newY);
      } else if (attackResult === "hit") {
        if (target.allShipsSunk()) {
          this.isGameOver = true;
          this.winner = currentTurn;

          return "Game over!";
        } else {
          const newX = Math.floor(Math.random() * 10);
          const newY = Math.floor(Math.random() * 10);

          attackResult = computer.makeMove(target, newX, newY);
        }
      }
    }

    return attackResult;
  }
}

export { GameController };
