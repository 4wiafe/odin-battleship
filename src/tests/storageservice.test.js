import { GameController } from "../gamecontroller/gamecontroller";
import { StorageService } from "../storageservice/storageservice";

let gameController;

beforeAll(() => {
  global.localStorage = {
    store: {},
    setItem(key, value) {
      this.store[key] = value;
    },
    getItem(key) {
      return this.store[key] || null;
    },
    removeItem(key) {
      delete this.store[key];
    },
    clear() {
      this.store = {};
    }
  };
});

beforeEach(() => {
  gameController = new GameController();
});

describe("save, load and clear data", () => {
  test("should have a storageService instance", () => {
    expect(StorageService).toBeTruthy();
  });

  test("save game data to localStorage", () => {
    gameController.initialize();

    jest.spyOn(localStorage, "setItem");
    const result = StorageService.save(gameController);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "battleshipGameData",
      JSON.stringify(gameController),
    );
    expect(result).toBe(true);
  });

  test("load game data from localStorage", () => {
    gameController.initialize();

    const mockData = JSON.stringify(gameController.toJSON());
    localStorage.setItem("battleshipGameData", mockData);

    jest.spyOn(localStorage, "getItem");

    const loadedGame = StorageService.load();

    expect(localStorage.getItem).toHaveBeenCalledWith("battleshipGameData");
    expect(loadedGame).toBeInstanceOf(GameController);
    expect(loadedGame.isGameOver).toBe(false);
  });

  test("clear data from localStorage", () => {
    gameController.initialize();

    const mockData = JSON.stringify(gameController.toJSON());
    localStorage.setItem("battleshipGameData", mockData);

    jest.spyOn(localStorage, "removeItem");

    const clearGameData = StorageService.clear();
    expect(localStorage.removeItem).toHaveBeenCalledWith("battleshipGameData");
    expect(clearGameData).toBe(true);
  });
});
