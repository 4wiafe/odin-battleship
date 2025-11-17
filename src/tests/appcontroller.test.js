import { AppController } from "../appcontroller/appcontroller.js";
import { GameController } from "../gamecontroller/gamecontroller.js";
import { StorageService } from "../storageservice/storageservice.js";

jest.mock("../gamecontroller/gamecontroller.js");
jest.mock("../storageservice/storageservice.js");

let app;

beforeEach(() => {
  app = new AppController();
  jest.clearAllMocks()
});

describe("AppController", () => {
  test("AppController should exist", () => {
    expect(app).toBeTruthy();
  });

  test("initialize() loads saved game if available", () => {
    const mockGame = { mock: true };

    StorageService.load.mockReturnValue(mockGame);

    app.initialize();

    expect(StorageService.load).toHaveBeenCalledTimes(1);
    expect(app.game).toBe(mockGame);
  });

  test("initialize() creates new game if no saved data", () => {
    StorageService.load.mockReturnValue(false);

    app.initialize();

    expect(GameController).toHaveBeenCalledTimes(1);
    expect(app.game.initialize).toHaveBeenCalledTimes(1);
  });
});
