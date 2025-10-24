import { Gameboard } from "../gameboard/gameboard";

const gameboard = new Gameboard();

describe('gameboard behavior', () => {
  test(`should create a new gameboard instance successfully`, () => {
    expect(gameboard).toBeTruthy();
  });
});
