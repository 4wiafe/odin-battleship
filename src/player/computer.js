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

  makeMove(opponentBoard, x, y) {
    const attackResult = opponentBoard.receiveAttack(x, y);

    if (attackResult === "hit") {
      opponentBoard.ships.forEach((ship) => {
        if (ship.isSunk()) {
          console.log(`Ship ${ship.length} has sunk!`);
        }
      });

      const allSunk = opponentBoard.allShipsSunk();

      if (allSunk) {
        console.log("All ships have sunk!");

        return "Game over!";
      }

      return "hit";
    } else if (attackResult === "miss") {
      console.log("You missed!");

      return "miss";
    } else if (attackResult === "already hit") {
      console.log("Coordinates already attacked. Try different coordinates.");

      return "already hit";
    }

    return attackResult;
  }

  toJSON() {
    return {
      gameboard: this.gameboard.toJSON(),
      totalShips: this.totalShips,
    };
  }

  static fromJSON(data) {
    const computer = new Computer();
    computer.gameboard = Gameboard.fromJSON(data.gameboard);
    computer.totalShips = data.totalShips;

    return computer;
  }
}

export { Computer };
