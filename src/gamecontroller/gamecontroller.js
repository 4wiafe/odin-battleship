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
}

export { GameController };
