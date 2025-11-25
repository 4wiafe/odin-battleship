import { AppController } from "../appcontroller/appcontroller.js";

class UIController{
  constructor(appController) {
    this.appController = appController;
    
    this.displayMessage = document.querySelector(".display-message");
    this.boardContainer = document.querySelector("#board-container");
    this.playerBoard = document.querySelector("#player-board");
    this.computerBoard = document.querySelector("#computer-board");
    this.randomBtn = this.querySelector(".random-btn");
    this.randomBtn = this.querySelector(".start-btn");
  }
 }

export { UIController };
