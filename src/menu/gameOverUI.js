import * as PIXI from "pixi.js";
import {Application,Assets,Container,Graphics,RenderTexture,Sprite,} from "pixi.js";
import { PlayScene } from "../scenes/playScene";
import { GameConstant } from "../gameConstant";
import { Game } from "../game";

export class GameOverUI extends Container {
  constructor() {
    super();
    this._showGameOverUI();

    this._initTextSmall();

    // this._initLevel();
    // this._initMoney();
    // this._initBestScore();

    this._init();

    this.interactive = true;
    this.sortChildren();
  }


  _initLevel() {}

  _initMoney() {}

  _initBestScore() {}

  _init() {
    // Tạo container để chứa các button
    this.buttonContainer = new Container();
    this.addChild(this.buttonContainer);

    this._initButtonRestart();

    // Thiết lập vị trí và căn giữa container chứa các button
    this.buttonContainer.x = GameConstant.GAME_WIDTH / 2 - 70;
    this.buttonContainer.y = GameConstant.GAME_HEIGHT - 300;
  }

  _initButtonRestart() {
    // Button 'Restart'
    this.buttonRestart = Sprite.from(Assets.get("restart"));
    this.buttonRestart.x = 0;
    this.buttonContainer.addChild(this.buttonRestart);
  }

  _initTextSmall() {
    this.smallTextStyle = new PIXI.TextStyle({
      fontFamily: "Century Gothic",
      fontSize: 35,
      // fontStyle: 'italic',
      fontWeight: "bold",
      fill: ["#ffffff"],
    });
  }

  _showGameOverUI() {
    this.visible = true;
  }

  update(delta) {
    
  }

}
