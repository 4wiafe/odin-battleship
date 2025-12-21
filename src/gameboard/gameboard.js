import { Ships } from "../ships/ships.js";

class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.ships = [];
    this.MAX_SHIPS = 5;
  }

  placeShip(ship, x, y, direction) {
    if (this.ships.length >= this.MAX_SHIPS) {
      return false;
    }

    const { length } = ship;
    const size = this.board.length;

    const isOutOfBounds =
      (direction === "horizontal" && x + length > size) ||
      (direction === "vertical" && y + length > size);

    if (isOutOfBounds) return false;

    for (let i = 0; i < length; i++) {
      const cell =
        direction === "horizontal"
          ? this.board[y][x + i]
          : this.board[y + i][x];

      if (cell !== null) return false;
    }

    for (let i = 0; i < length; i++) {
      if (direction === "horizontal") {
        this.board[y][x + i] = ship;
      } else {
        this.board[y + i][x] = ship;
      }
    }

    this.ships.push(ship);
    return true;
  }

  receiveAttack(x, y) {
    if (x < 0 || y < 0 || y >= this.board.length || x >= this.board.length) {
      throw new Error(`Invalid attack coordinate ${y}, ${x}`);
    }

    const cell = this.board[y][x];

    if (cell === "hit" || cell === "miss") {
      return "already hit";
    }

    if (cell && typeof cell.hit === "function") {
      cell.hit();
      this.board[y][x] = "hit";

      return "hit";
    }

    this.board[y][x] = "miss";
    return "miss";
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }

  resetBoard() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.ships = [];
  }

  toJSON() {
    return {
      board: this.board.map((row) =>
        row.map((cell) => {
          if (cell instanceof Ships) {
            const index = this.ships.indexOf(cell);
            return { shipIndex: index };
          }
          return cell;
        }),
      ),
      ships: this.ships.map((ship) => ship.toJSON()),
      MAX_SHIPS: this.MAX_SHIPS,
    };
  }

  static fromJSON(data) {
    const gameboard = new Gameboard();

    gameboard.ships = data.ships.map((shipData) => Ships.fromJSON(shipData));

    gameboard.board = data.board.map((row) =>
      row.map((cell) => {
        if (cell && cell.shipIndex !== undefined) {
          return gameboard.ships[cell.shipIndex];
        }
        return cell;
      }),
    );

    gameboard.MAX_SHIPS = data.MAX_SHIPS;
    return gameboard;
  }
}

export { Gameboard };
