import { Ships } from "../ships/ships.js";

const ship1 = new Ships(3);
const ship2 = new Ships(4);

class Gameboard {
  board = Array.from({ length: 10 }, () => Array(10).fill(null));

  placeShip(ship, x, y, direction) {
    if (
      (direction === 'horizontal' && x + ship.length > this.board.length) ||
      (direction === 'vertical' && y + ship.length > this.board.length)
    ) return false;

    for (let i = 0; i < ship.length; i++) {
      if (direction === 'horizontal') {
        if (this.board[y][x + i] !== null) return false;

        this.board[y][x + i] = ship;
      } else if (direction === 'vertical') {
        if (this.board[y + i][x] !== null) return false;

        this.board[y + i][x] = ship;
      }
    }

    return true;
  }
}

const newBoard = new Gameboard();
console.log(newBoard.placeShip(ship1, 0, 0, 'vertical'));
console.log(newBoard.placeShip(ship1, 0, 0, "vertical"));

export { Gameboard };
