import * as PIXI from "pixi.js";
import {Application,Assets,Container,Graphics,RenderTexture,Sprite,} from "pixi.js";
import { PlayScene } from "./playScene";
import { GameConstant } from "../gameConstant";
import { Game } from "../game";
import { Menu } from "../menu/menu";

export class GameOverUI extends Container {
  constructor(menu) {
    super();
    // Create a semi-transparent background
    const background = new Graphics();
    background.beginFill(0x000000, 0.9); 
    background.drawRect(0, 0, GameConstant.GAME_WIDTH, GameConstant.GAME_HEIGHT);
    background.endFill();
    this.addChild(background);

    this.menu = menu;

    this._initTextBig();
    this._initTextSmall();
    this._initTextNormal();

    this._initButtonRestart();
    this._initButtonCap();
    this._initButtonRank();
    this._bestScore();

    this._initLevel();
    this._initMoney();
    this._initTextBestScore();

    this.sortChildren();
  }

  _bestScore(){
    let score = 0;
    score = localStorage.getItem('bestScore');
    this.score = new PIXI.Text(score, this.bigTextStyle);
    this.score.anchor.set(0.5);
    this.score.zIndex = 2;
    this.score.position.set(GameConstant.GAME_WIDTH/2, 350);
    this.addChild(this.score);
  }

  _initLevel() {
    this.textLevel = new PIXI.Text("LEVEL: ", this.normalTextStyle);
    this.textLevel.anchor.set(0.5);
    this.textLevel.zIndex = 2;
    this.textLevel.position.set(GameConstant.GAME_WIDTH/2, 440);
    this.addChild(this.textLevel);
  }

  _initMoney(){
    this.money = Sprite.from(Assets.get("money"));
    this.money.position.set(GameConstant .GAME_WIDTH - 130, 60);
    this.money.scale.set(0.4);
    this.addChild(this.money);
}

  _initTextBestScore() {
    this.textTitle = new PIXI.Text("BEST SCORE", this.smallTextStyle);
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
      this.hide();
      setTimeout(() => Game._initScene(), 50);
    });

  }

  _initButtonCap() {
    // Button cap screen
    this.buttonCap = Sprite.from(Assets.get("cap"));
    this.buttonCap.position.set(this.buttonRestart.x - this.buttonCap.width - 30, this.buttonRestart.y + 25);
    this.addChild(this.buttonCap);

    this.buttonCap.interactive = true;
    this.buttonCap.cursor = "pointer";

    // this.buttonRestart.on("pointerdown", () => {
    //   this.parent.removeChild(this);

    // });
  }

  _initButtonRank() {
    // Button Rank
    this.buttonRank = Sprite.from(Assets.get("rank"));
    this.buttonRank.position.set(this.buttonRestart.x + this.buttonRestart.width + 30, this.buttonRestart.y + 25);
    this.addChild(this.buttonRank);

    this.buttonRank.interactive = true;
    this.buttonRank.cursor = "pointer";

    // this.buttonRestart.on("pointerdown", () => {
    //   this.parent.removeChild(this);

    // });
  }

  _initTextSmall() {
    this.smallTextStyle = new PIXI.TextStyle({
      fontFamily: "Triomphe Light Autoinstr",
      fontSize: 35,
      fill: ["#fbe64d"],
    });
  }

  _initTextNormal() {
    this.normalTextStyle = new PIXI.TextStyle({
      fontFamily: "Triomphe Light Autoinstr",
      fontSize: 38,
      fill: ["#ffffff"],
    });
  }

  _initTextBig() {
    this.bigTextStyle = new PIXI.TextStyle({
      fontFamily: "Triomphe Regular Autoinstr",
      fontSize: 145,
      fill: ["#fbe64d"],
    });
  }

  show() {
    this.visible = true;
    this.score.text = localStorage.getItem('bestScore');
  }
  hide(){
    this.visible = false;
  }

}
