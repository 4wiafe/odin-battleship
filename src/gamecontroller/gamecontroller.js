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
  }
}

export { GameController };
