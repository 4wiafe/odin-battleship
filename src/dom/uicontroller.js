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
    this.renderBoard();
    this.renderPlayerShips();
  }

  renderBoard() {
    for (let i = 0; i < 100; i++) {
      const row = Math.floor(i / 10);
      const col = i % 10;

      const playerCell = document.createElement("div");
      playerCell.classList.add("grid-item");
      playerCell.dataset.x = row;
      playerCell.dataset.y = col;
      this.playerBoard.append(playerCell);

      const computerCell = document.createElement("div");
      computerCell.classList.add("grid-item");
      computerCell.dataset.x = row;
      computerCell.dataset.y = col;
      this.computerBoard.append(computerCell);
    }
  }

  renderPlayerShips() {
    const internalBoard = this.appController.game.player.gameboard;
    const playerCells = this.playerBoard.querySelectorAll(".grid-item");

    console.log(internalBoard);

    playerCells.forEach(cell => {
      const row = Number(cell.dataset.x);
      const col = Number(cell.dataset.y);

      if (internalBoard.board[row][col] !== null) {
        cell.classList.add("ship");
      }
    });
  }
 }

export { UIController };
