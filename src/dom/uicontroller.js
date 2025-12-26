class UIController{
  constructor(appController) {
    this.appController = appController;
    this.isGameActive = false;

    this.displayMessage = document.querySelector(".display-message");
    this.boardContainer = document.querySelector("#board-container");
    this.playerBoard = document.querySelector("#player-board");
    this.computerBoard = document.querySelector("#computer-board");
    this.randomBtn = document.querySelector(".random-btn");
    this.startBtn = document.querySelector(".start-btn");
    this.restartBtn = document.querySelector(".restart");
    this.cancelBtn = document.querySelector(".cancel");
    this.dialog = document.querySelector("dialog");
    this.overlay = document.querySelector(".overlay");
    this.winner = document.querySelector(".winner");
  }

  init() {
    this.appController.initialize();
    this.render();
    this.bindEvents();
  }

  clearState() {
    this.playerBoard.innerHTML = "";
    this.computerBoard.innerHTML = "";
  }

  render() {
    this.clearState();
    this.renderBoard();
    this.renderPlayerShips();
    this.renderAttacks();
    this.switchTurnUI();
    this.displayWinner();
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

    playerCells.forEach(cell => {
      const row = Number(cell.dataset.x);
      const col = Number(cell.dataset.y);

      if (internalBoard.board[row][col] !== null) {
        cell.classList.add("playerShips");
      }
    });
  }

  renderComputerShips() {
    const internalBoard = this.appController.game.computer.gameboard;
    const computerCells = this.computerBoard.querySelectorAll(".grid-item");

    computerCells.forEach((cell) => {
      const row = Number(cell.dataset.x);
      const col = Number(cell.dataset.y);

      if (internalBoard.board[row][col] !== null) {
        return;
      }
    });
  }

  renderAttacks() {
    const computerBoard = this.appController.game.computer.gameboard.board;
    const playerBoard = this.appController.game.player.gameboard.board;
    
    this.computerBoard.querySelectorAll(".grid-item").forEach(cell => {
      const row = Number(cell.dataset.x);
      const col = Number(cell.dataset.y);
      const result = computerBoard[row][col];

      if (result === "hit") {
        cell.classList.add("hit", "disabled");
      }

      if (result === "miss") {
        cell.classList.add("miss", "disabled");
      }
    });

    this.playerBoard.querySelectorAll(".grid-item").forEach((cell) => {
      const row = Number(cell.dataset.x);
      const col = Number(cell.dataset.y);
      const result = playerBoard[row][col];

      if (result === "hit") {
        cell.classList.add("hit", "disabled");
      }

      if (result === "miss") {
        cell.classList.add("miss", "disabled");
      }
    });
  }

  attackState(x, y) {
    this.appController.handleAttack(x, y);
    this.render();
  }

  switchTurnUI() {
    const currentTurn = this.appController.game.currentTurn;
    const player = this.appController.game.player;
    const computer = this.appController.game.computer;

    if (currentTurn === player) {
      this.playerBoard.classList.add("disabled");
      this.computerBoard.classList.remove("disabled");
    }

    if (currentTurn === computer) {
      this.computerBoard.classList.add("disabled");
      this.playerBoard.classList.remove("disabled");
    }
  }

  displayWinner() {
    if (this.appController.getWinner()) {
      const gameWinner = this.appController.game.winner;
      const player = this.appController.game.player;
      const computer = this.appController.game.computer;

      if (gameWinner === player) {
        this.winner.textContent = "You win! 🎉";
      }

      if (gameWinner === computer) {
        this.winner.textContent = "Computer wins! 🤖";
      }

      this.overlay.style.display = "block";
      this.dialog.style.display = "flex";
    }
  }

  bindEvents() {
    this.randomBtn.addEventListener("click", () => {
      this.appController.game.player.gameboard.resetBoard();
      this.appController.game.player.setShips();
      this.render();
    });

    this.computerBoard.addEventListener("click", (event) => {
      if (!this.isGameActive) return;

      const targetCell = event.target;

      if (!targetCell.classList.contains("grid-item")) return;
      if (targetCell.classList.contains("disabled")) return;

      if (targetCell.classList.contains("grid-item")) {
        const x = targetCell.dataset.x;
        const y = targetCell.dataset.y;

        this.attackState(y, x);
      }

    });

    this.startBtn.addEventListener("click", () => {
      this.isGameActive = true;
      this.startBtn.style.display = "none";
      this.randomBtn.style.display = "none";
    });

    this.restartBtn.addEventListener("click", () => {
      this.init();
      this.dialog.style.display = "none";
      this.overlay.style.display = "none";
    });

    this.cancelBtn.addEventListener("click", () => {
      this.dialog.style.display = "none";
      this.overlay.style.display = "none";
    })
  }
 }

export { UIController };
