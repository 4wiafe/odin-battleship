import { Gameboard } from "../gameboard/gameboard";

const gameboard = new Gameboard();

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
});
