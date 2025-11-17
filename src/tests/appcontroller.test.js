import { AppController } from "../appcontroller/appcontroller.js";
import { GameController } from "../gamecontroller/gamecontroller.js";
import { StorageService } from "../storageservice/storageservice.js";

jest.mock("../storageservice/storageservice.js");

let app;

beforeEach(() => {
  app = new AppController();
  StorageService.load.mockClear();
  StorageService.save.mockClear();
  StorageService.clear.mockClear();
});

describe("AppController", () => {
  test("appController should exist", () => {
    expect(app).toBeTruthy();
  });

  test("initialize() should load saved game if data exists", () => {
    const mockSavedGame = { some: "data" };

    StorageService.load.mockReturnValue(mockSavedGame);
    jest.spyOn(GameController, "fromJSON").mockReturnValue({ loaded: true });
    
    app.initialize();

    expect(StorageService.load).toHaveBeenCalledTimes(1);
    expect(GameController.fromJSON).toHaveBeenCalledWith(mockSavedGame);
    expect(app.game).toEqual({ loaded: true });
  });
});
