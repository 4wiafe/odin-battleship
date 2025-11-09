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
    gameController.initialize();
    gameController.currentTurn = gameController.player;

    expect(gameController.switchTurn()).toBeTruthy();
    expect(gameController.currentTurn).toBe(gameController.computer);
  });

  test("should execute a turn and switch player", () => {
    gameController.initialize();
   
    const x = 0;
    const y = 0;

    expect(gameController.currentTurn).toBe(gameController.player);

    const result = gameController.executeTurn(x, y);

    expect(["hit", "miss", "already hit", "Game over!"]).toContain(result);
    expect(gameController.currentTurn).toBe(gameController.computer);
    expect(gameController.isGameOver).toBe(false);
  });

  test("should end game when all ships have sunk", () => {
    gameController.initialize();

    gameController.computer.gameboard.allShipsSunk = () => true;
    gameController.player.gameboard.allShipsSunk = () => false;

    const result = gameController.checkGameOver();

    expect(result).toBe(true);
    expect(gameController.isGameOver).toBe(true);
    expect(gameController.winner).toBe(gameController.player);
  });

  test("should restart game with a clean state", () => {
    gameController.initialize();

    gameController.isGameOver = true;
    gameController.winner = gameController.player;
    gameController.currentTurn = gameController.computer;

    gameController.restart();

    expect(gameController.isGameOver).toBe(false);
    expect(gameController.winner).toBe(null);
    expect(gameController.currentTurn).toBe(gameController.player);
    expect(gameController.player).toBeDefined();
    expect(gameController.computer).toBeDefined();
  });
});
