import { GameController } from "../gamecontroller/gamecontroller";
import { Player } from "../player/player";
import { Computer } from "../player/computer";

let gameController;
let player;
let computer;

beforeEach(() => {
  gameController = new GameController();
  player = new Player();
  computer = new Computer();
});

describe("game behavior", () => {
  test("should have a gameController instance", () => {
    expect(gameController).toBeTruthy();
  });
});
