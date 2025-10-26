import { Ships } from "../ships/ships.js";

const ship = new Ships(3);

class Gameboard {
  board = Array.from({ length: 10 }, () => Array(10).fill(null));

  placeShip(ship, x, y, direction) {
    for (let i = 0; i < ship.length; i++) {
      if (direction === 'horizontal') {
        this.board[y][x + i] = ship;
      } else if (direction === 'vertical') {
        this.board[y + i][x] = ship;
      }
    }

    console.log(this.board);
    return true;
  }
}

const newBoard = new Gameboard();
console.log(newBoard.placeShip(ship, 0, 0, 'horizontal'));

export { Gameboard };
