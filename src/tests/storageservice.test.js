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

  test("should have a save method", () => {
    gameController.initialize();

    jest.spyOn(localStorage, "setItem");
    const result = StorageService.save(gameController);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "battleshipGameData",
      JSON.stringify(gameController),
    );
    expect(result).toBe(true);
  });
});
