import { Gameboard } from "../gameboard/gameboard";
import { Ships } from "../ships/ships";

let gameboard;
let ship;

beforeEach(() => {
  gameboard = new Gameboard();
  ship = new Ships(4);
});

describe('gameboard behavior', () => {
  test(`should create a new gameboard instance successfully`, () => {
    expect(gameboard).toBeTruthy();
  });

  test('board should be an array with 10 rows', () => {
    expect(gameboard.board.length).toBe(10);
  });

  test('each row should have 10 cells', () => {
    expect(gameboard.board.every(row => {
      return Array.isArray(row);
    })).toBeTruthy();
  });

  test('each row should have 10 cells', () => {
    expect(gameboard.board.every(row => row.length === 10)).toBeTruthy();
  });

  test('place ship on board successfully', () => {
    expect(gameboard.placeShip(ship, 0, 0, 'horizontal')).toBe(true);
  });

  test('should not allow placing more than 5 ships', () => {
    for (let i = 0; i < 5; i++) {
      gameboard.placeShip(ship, 0, i, 'horizontal');
    }

    const extraShip = new Ships(2);

    expect(gameboard.placeShip(extraShip, 0, 5, 'horizontal')).toBe(false);
  });

  test('should attack cells and mark hit/miss/already hit correctly', () => {
    gameboard.placeShip(ship, 0, 0, 'horizontal');

    expect(gameboard.receiveAttack(0, 0)).toBe('hit');
    expect(gameboard.receiveAttack(0, 0)).toBe('already hit');
    expect(gameboard.receiveAttack(3, 3)).toBe('miss');
  });

  test('should call ship.hit() when a ship is hit', () => {
    const mockShip = { hit: jest.fn(), length: 3 };
    const mockGameboard = new Gameboard();

    mockGameboard.placeShip(mockShip, 0, 0, 'horizontal');

    mockGameboard.receiveAttack(0, 0);

    expect(mockShip.hit).toHaveBeenCalledTimes(1);
  });

  test('initial sunk state should be false', () => {
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    expect(gameboard.allShipsSunk()).toBe(false);
  });

  test('should check if all ships have sunk', () => {
    for (let i = 0; i < ship.length; i++) {
      gameboard.receiveAttack(i, 0);
    }

    expect(gameboard.allShipsSunk()).toBe(true);
  });
});
