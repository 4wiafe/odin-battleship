import { Player } from "../player/player";
import { Gameboard } from "../gameboard/gameboard";
import { Ships } from "../ships/ships";

let player;
let gameboard;
let ship;

beforeEach(() => {
  player = new Player();
  gameboard = new Gameboard();
  ship = new Ships(5);
});

describe("player behavior", () => {
  test("should create a player instance successfully", () => {
    expect(player).toBeTruthy();
  });

  test("player should be able to place ships", () => {
    expect(player.setShips()).toBe(true);
  });

  test("player should be able to attack opponent's board", () => {
    const x = 0;
    const y = 0;
    
    const mockOpponent = {
      receiveAttack: jest.fn(),
      ships: [{isSunk: jest.fn()}],
      allShipsSunk: jest.fn()
    };

    mockOpponent.receiveAttack
      .mockReturnValueOnce("hit")
      .mockReturnValueOnce("miss")
      .mockReturnValueOnce("already hit");

    const hitResult = player.makeMove(mockOpponent, x, y);
    expect(mockOpponent.receiveAttack).toHaveBeenCalledWith(x, y);
    expect(hitResult).toBe("hit");

    const missResult = player.makeMove(mockOpponent, x, y);
    expect(mockOpponent.receiveAttack).toHaveBeenCalledWith(x, y);
    expect(missResult).toBe("miss");

    const alreadyHit = player.makeMove(mockOpponent, x, y);
    expect(mockOpponent.receiveAttack).toHaveBeenCalledWith(x, y);
    expect(alreadyHit).toBe("already hit");

    expect(mockOpponent.ships[0].isSunk).toHaveBeenCalledTimes(1);
    expect(mockOpponent.allShipsSunk).toHaveBeenCalledTimes(1);
    expect(mockOpponent.receiveAttack).toHaveBeenCalledTimes(3);
  });
});
