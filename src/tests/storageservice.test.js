import { GameController } from "../gamecontroller/gamecontroller";
import { StorageService } from "../storageservice/storageservice";

let gameController;
let storageService;

beforeEach(() => {
  gameController = new GameController();
  storageService = new StorageService();
});

describe("save, load and clear data", () => {
  test("should have a storageService instance", () => {
    expect(storageService).toBeTruthy();
  });

  
  test("should have a save method", () => {
    gameController.initialize();

    jest.spyOn(Storage.prototype, "setItem");
    const result = storageService.save("gameData", gameController);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "gameData",
      JSON.stringify(gameController));
    expect(result).toBe(true);
  });
});
