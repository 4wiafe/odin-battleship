import { Gameboard } from "../gameboard/gameboard";
import { Ships } from "../ships/ships";

const gameboard = new Gameboard();
const ship = new Ships(4);

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

  test('attack cells', () => {
    expect(gameboard.receiveAttack(0, 0)).toBe(true);
    expect(gameboard.receiveAttack(0, 0)).toBe(false);
    expect(gameboard.receiveAttack(1, 1)).toBe(false);
  });
});
