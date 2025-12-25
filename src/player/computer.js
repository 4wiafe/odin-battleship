import { Gameboard } from "../gameboard/gameboard.js";
import { Ships } from "../ships/ships.js";

class Computer {
  constructor() {
    this.gameboard = new Gameboard();
    this.totalShips = 5;
    this.availableMoves = [];

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        this.availableMoves.push({x, y});
      }
    }
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
          return "sunk";
        }
      });

      const allSunk = opponentBoard.allShipsSunk();

      if (allSunk) {
        return "Game over!";
      }

      return "hit";
    }
    
    if (attackResult === "miss") {
      return "miss";
    }
    
    if (attackResult === "already hit") {
      return "already hit";
    }

    return attackResult;
  }

  getRandomMove() {
    const randomIndex = Math.floor(Math.random() * this.availableMoves.length);
    return this.availableMoves.splice(randomIndex, 1)[0];
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
