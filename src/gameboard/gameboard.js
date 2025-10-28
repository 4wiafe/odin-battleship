import { Ships } from '../ships/ships.js';

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
      const cell =
        direction === 'horizontal'
          ? this.board[y][x + i]
          : this.board[y + i][x];

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

  receiveAttack(x, y) {
    if (
      x < 0 ||
      y < 0 ||
      y >= this.board.length ||
      x >= this.board.length
    ) {
      throw new Error(`Invalid attack coordinate ${y}, ${x}`);
    }

    const cell = this.board[y][x];

    if (cell === 'hit' || cell === 'miss') {
      return 'already hit';
    }

    if (cell && typeof cell.hit === 'function') {
      cell.hit();
      this.board[y][x] = 'hit';

      return 'hit';
    }

    this.board[y][x] = 'miss';
    return 'miss';
  }
}

const ship1 = new Ships(3);
const gameboard = new Gameboard();
gameboard.placeShip(ship1, 0, 0, "horizontal");
console.log(gameboard.receiveAttack(0, 0));
console.log(gameboard.receiveAttack(0, 0));
console.log(gameboard.receiveAttack(1, 1));
console.log(gameboard.receiveAttack(1, 1));

export { Gameboard };
