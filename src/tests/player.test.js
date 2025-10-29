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
});
