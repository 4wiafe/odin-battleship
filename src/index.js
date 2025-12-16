import "./styles.css";
import { UIController } from "./dom/uicontroller.js";
import { AppController } from "./appcontroller/appcontroller.js";

const app = new AppController();
const game = new UIController(app);

game.init();
