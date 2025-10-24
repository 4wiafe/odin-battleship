import { Gameboard } from "../gameboard/gameboard";

const gameboard = new Gameboard();

describe('gameboard behavior', () => {
  test(`should create a new gameboard instance successfully`, () => {
    expect(gameboard).toBeTruthy();
  });

  test('board should be an array', () => {
    expect(gameboard.board.length).toBe(10);
  });
});
