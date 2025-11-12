import { GameController } from "../gamecontroller/gamecontroller.js";

const KEY = "battleshipGameData";

class StorageService {
  static save(gamecontroller) {
    try {
      const gameData = gamecontroller.toJSON();
      localStorage.setItem(KEY, JSON.stringify(gameData));
      return true;
    } catch (error) {
      console.error("Failed to save game data", error);
      return false;
    }
  }
 }

export { StorageService };
