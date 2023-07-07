import * as PIXI from "pixi.js";
import {Application,Assets,Container,Graphics,RenderTexture,Sprite,} from "pixi.js";
import { PlayScene } from "../scenes/playScene";
import { GameConstant } from "../gameConstant";
import { Game } from "../game";
import { Menu } from "./menu";

export class GameOverUI extends Container {
  constructor(menu) {
    super();
    // Create a semi-transparent background
    const background = new Graphics();
    background.beginFill(0x000000, 0.9); 
    background.drawRect(0, 0, GameConstant.GAME_WIDTH, GameConstant.GAME_HEIGHT);
    background.endFill();
    this.addChild(background);

    this.menu = Menu;
    this._showGameOverUI();

    this._initTextBig();

    this._initButtonRestart();

    // this._initLevel();
    this._initMoney();
    this._initBestScore();

    this.sortChildren();
  }


  _initLevel() {}

  _initMoney(){
    this.money = Sprite.from(Assets.get("money"));
    this.money.position.set(GameConstant .GAME_WIDTH - 130, 60);
    this.money.scale.set(0.4);
    this.addChild(this.money);
}

  _initBestScore() {
    this.textTitle = new PIXI.Text("BEST SCORE", this.bigTextStyle);
    this.textTitle.anchor.set(0.5);
    this.textTitle.zIndex = 2;
    this.textTitle.position.set(GameConstant.GAME_WIDTH/2, 250);
    this.addChild(this.textTitle);
  }

  _initButtonRestart() {
    // Button 'Restart'
    this.buttonRestart = Sprite.from(Assets.get("restart"));
    this.buttonRestart.position.set((GameConstant.GAME_WIDTH - this.buttonRestart.width) / 2, GameConstant.GAME_HEIGHT/4*3);
    this.addChild(this.buttonRestart);

    // Add event listener to the restart button
    this.buttonRestart.interactive = true;
    this.buttonRestart.cursor = "pointer";

    this.buttonRestart.on("pointerdown", () => {
      this.parent.removeChild(this);
       // Show the menu
      Game._initScene();
    });

  }

  _initTextBig() {
    this.bigTextStyle = new PIXI.TextStyle({
      fontFamily: "Arial",
      fontSize: 35,
      fill: ["#FFFF00"],
    });
  }

  _showGameOverUI() {
    this.visible = true;
  }

  update(delta) {
    
  }

}
