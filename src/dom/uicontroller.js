import { AppController } from "../appcontroller/appcontroller.js";

class UIController{
  constructor(appController) {
    this.appController = appController;

    this.displayMessage = document.querySelector(".display-message");
    this.boardContainer = document.querySelector("#board-container");
    this.playerBoard = document.querySelector("#player-board");
    this.computerBoard = document.querySelector("#computer-board");
    this.randomBtn = document.querySelector(".random-btn");
    this.randomBtn = document.querySelector(".start-btn");
  }

  init() {
    this.appController.initialize();
  }
 }

export { UIController };
