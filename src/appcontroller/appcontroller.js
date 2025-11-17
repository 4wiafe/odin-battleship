import { GameController } from "../gamecontroller/gamecontroller.js";
import { StorageService } from "../storageservice/storageservice.js";

class AppController{ 
  constructor() {
    this.game = null;
  }

  initialize() {
    const saved = StorageService.load();

    if (!saved) {
      this.game = new GameController();
      return this.game.initialize();
    }

    this.game = saved;
    return this.game;
  }
}

export { AppController };
