import { Gameboard } from "../gameboard/gameboard.js";
import { Ships } from "../ships/ships.js";

class Computer {
  constructor() {
    this.gameboard = new Gameboard();
    this.totalShips = 5;
  }

  setShips() {
    const shipsLength = [2, 3, 5, 6, 8];

    for (let i = 0; i < shipsLength.length; i++) {
      let ship = new Ships(shipsLength[i]);

      let placed = false;
      let maxAttempts = 100;

      while (!placed && maxAttempts > 0) {
        const xCoordinate = Math.floor(Math.random() * 10);
        const yCoordinate = Math.floor(Math.random() * 10);
        const direction =
          Math.floor(Math.random() * 10) + 1 > 5 ? "horizontal" : "vertical";

        placed = this.gameboard.placeShip(
          ship,
          xCoordinate,
          yCoordinate,
          direction,
        );
        
        maxAttempts--;
      }

      if (!placed) return false;
    }

    return true;
  }
}

export { Computer };
