import { GameController } from "../gamecontroller/gamecontroller";
import { StorageService } from "../storageservice/storageservice";

let gameController;
let storageService;

before(() => {
  gameController = new GameController;
  storageService = new StorageService;
});

describe("save, load and clear data", () => {
  test("should have a storageService instance", () => {
    expect(storageService).toBeTruthy();
  });
});
