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

  static load() {
    try {
      const gameData = localStorage.getItem(KEY);
      if (!gameData) return false;

      const parsed = JSON.parse(gameData);
      return GameController.fromJSON(parsed);
    } catch (error) {
      console.error("Failed to load game data");
      return false;
    }
  }

  static clear() {
    try {
      localStorage.removeItem(KEY);
      return true;
    } catch (error) {
      console.error("Failed to clear game data", error);
      return false;
    }
  }
}

export { StorageService };
