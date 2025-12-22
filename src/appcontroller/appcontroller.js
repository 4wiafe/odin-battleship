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
      this.game.initialize();
      return this.game;
    }

    this.game = GameController.fromJSON(saved);
    return this.game;
  }

  handleAttack(x, y) {
    this.game.executeTurn(x, y);
  }

  saveProgress() {
    return StorageService.save(this.game);
  }

  clearProgress() {
    StorageService.clear();
    return this.restartGame();
  }

  restartGame() {
    this.game = new GameController();
    this.game.initialize();
    return this.game
  }  
}

export { AppController };
