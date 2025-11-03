import { Computer } from "../player/computer";

let computer;

beforeEach(() => {
  computer = new Computer();
});

describe("computer behaviour", () => {
  test("should create a computer instance successfully", () => {
    expect(computer).toBeTruthy();
  });

  test("should place ships on board successfully", () => {
    expect(computer.setShips()).toBe(true);
  });

  test("should be able to attack player's board", () => {
    const x = 0;
    const y = 0;

    const mockOpponent = {
      receiveAttack: jest.fn(),
      ships: [{ isSunk: jest.fn() }],
      allShipsSunk: jest.fn(),
    };

    mockOpponent.receiveAttack
      .mockReturnValueOnce("hit")
      .mockReturnValueOnce("miss")
      .mockReturnValueOnce("already hit");

    const hitResult = computer.makeMove(mockOpponent, x, y);
    expect(mockOpponent.receiveAttack).toHaveBeenCalledWith(x, y);
    expect(hitResult).toBe("hit");

    const missResult = computer.makeMove(mockOpponent, x, y);
    expect(mockOpponent.receiveAttack).toHaveBeenCalledWith(x, y);
    expect(missResult).toBe("miss");

    const alreadyHit = computer.makeMove(mockOpponent, x, y);
    expect(mockOpponent.receiveAttack).toHaveBeenCalledWith(x, y);
    expect(alreadyHit).toBe("already hit");

    expect(mockOpponent.ships[0].isSunk).toHaveBeenCalledTimes(1);
    expect(mockOpponent.allShipsSunk).toHaveBeenCalledTimes(1);
    expect(mockOpponent.receiveAttack).toHaveBeenCalledTimes(3);
  });
});
