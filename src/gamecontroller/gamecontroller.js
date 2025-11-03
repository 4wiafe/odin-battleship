import { Computer } from "../player/computer.js";
import { Player } from "../player/player.js";

class GameController {
  constructor() {
    this.currentTurn = false;
    this.isGameOver = false;
    this.winner = null;
  }
}

export { GameController };
