import { Ships } from "../ships/ships.js";

class Gameboard {
  board = Array.from({ length: 10 }, () => Array(10).fill(null));

  placeShip(ship, x, y, direction) {
    const { length } = ship;
    const size = this.board.length;

    const isOutOfBounds =
      (direction === 'horizontal' && x + length > size) ||
      (direction === 'vertical' && y + length > size);
    
    if (isOutOfBounds) return false;

    for (let i = 0; i < length; i++) {
      const cell = direction === 'horizontal' ? this.board[y][x + i] : this.board[y + i][x];

      if (cell !== null) return false;
    }

    for (let i = 0; i < length; i++) {
      if (direction === 'horizontal') {
        this.board[y][x + i] = ship;
      } else {
        this.board[y + i][x] = ship;
      }
    }

    return true;
  }
}

export { Gameboard };
