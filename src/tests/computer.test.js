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
});
