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
});
