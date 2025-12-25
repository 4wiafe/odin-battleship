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
    if (this.checkGameOver()) return "Game over!";

    if (this.currentTurn === this.player) {
      const result = this.player.makeMove(this.computer.gameboard, x, y);

      if (result === "already hit") return result;
      
      if (result === "miss") {
        this.switchTurn();
        this.executeComputerTurn();
      }

      return result;
    }
  }

  executeComputerTurn() {
    if (this.checkGameOver()) return "Game over!"

    const {x, y} = this.computer.getRandomMove();
    const result = this.computer.makeMove(this.player.gameboard, x, y);

    if (result === "miss") {
      this.switchTurn();
    }

    if (result === "hit") {
      this.executeComputerTurn();
    }
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
