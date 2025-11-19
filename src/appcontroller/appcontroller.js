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

  handleAttack(x, y) {
    return this.game.executeTurn(x, y);
  }

  saveProgress() {
    return StorageService.save(this.game);
  }

  clearProgress() {
    return StorageService.clear();
  }

  restartGame() {
    return this.game.restartGame();
  }  
}

export { AppController };
