import { Gameboard } from "../gameboard/gameboard.js";
import { Ships } from "../ships/ships.js";

class Computer {
  constructor() {
    this.gameboard = new Gameboard();
    this.totalShips = 5;
  }
}

export { Computer };
