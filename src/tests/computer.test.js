import { Computer } from "../player/computer";

let computer;

beforeEach(() => {
  computer = new Computer();
});

describe("computer behaviour", () => {
  test("should create a computer instance successfully", () => {
    expect(computer).toBeTruthy();
  });
});
