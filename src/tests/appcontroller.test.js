import { AppController } from "../appcontroller/appcontroller.js";
import { GameController } from "../gamecontroller/gamecontroller.js";
import { StorageService } from "../storageservice/storageservice.js";

let appController;
let gameController;
let storageService;

beforeEach(() => {
  appController = new AppController();
  gameController = new GameController();
  storageService = new StorageService();
});

describe("appController behaviour", () => {
  test("appController should exist", () => {
    expect(appController).toBeTruthy();
  });
});
