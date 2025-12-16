import { Ships } from "../ships/ships.js";
import { Gameboard } from "../gameboard/gameboard.js";

class Player {
  constructor(name = "Player") {
    this.name = name;
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
        
        placed = this.gameboard.placeShip(ship, xCoordinate, yCoordinate, direction);
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

  toJSON() {
    return {
      name: this.name,
      gameboard: this.gameboard.toJSON(),
      totalShips: this.totalShips
    };
  }

  static fromJSON(data) {
    const player = new Player(data.name);
    player.gameboard = Gameboard.fromJSON(data.gameboard);
    player.totalShips = data.totalShips;

    return player;
  }
}

export { Player };
