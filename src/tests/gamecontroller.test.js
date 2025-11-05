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

  test("should initialize with player and computer instances", () => {
    gameController.initialize();

    expect(gameController.player).toBeTruthy();
    expect(gameController.computer).toBeTruthy();
    expect(gameController.player).toBeInstanceOf(Player);
    expect(gameController.computer).toBeInstanceOf(Computer);
    expect(gameController.currentTurn).toBe(gameController.player);
  });

  test("should have a switchTurn() method", () => {
    gameController.currentTurn = gameController.player;
    
    expect(gameController.switchTurn()).toBeTruthy();
    expect(gameController.currentTurn).toBe(gameController.computer);
  });
});
