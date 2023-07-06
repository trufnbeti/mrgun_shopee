import * as PIXI from "pixi.js";
import {
  Application,
  Assets,
  Container,
  Graphics,
  RenderTexture,
  Sprite,
} from "pixi.js";
import { PlayScene } from "../scenes/playScene";
import { GameConstant } from "../gameConstant";
import { Game } from "../game";

export class MenuUI extends Container {
  constructor() {
    super();
    this._showMenuUI();

    this.gameOverBar = new PIXI.Container();

    this._initLayout();

    this._initTextSmall();
    this._initTapToStart();

    this.addChild(this.gameOverBar);
    this.zIndex = 100;
    this.blinkCounter = 1;
    this._init();
    this.interactive = true;
    this.sortChildren();
  }

  _initLayout(){
    this.layoutUIContainer = new PIXI.Container();
    this.addChild(this.layoutUIContainer);

    // this._initLevel();
    // this._initMoney();
    this._initLOGO();
    // this._initBestScore();
  }

  _initLOGO() {
    this.logoSpriter = Sprite.from(Assets.get("logoMRGUN"));
    this.logoSpriter.position.set(GameConstant.GAME_WIDTH / 2 - this.logoSpriter.width*0.4, GameConstant.GAME_HEIGHT / 8);
    this.logoSpriter.scale.set(0.75);;
    this.layoutUIContainer.addChild(this.logoSpriter);
  }

  _initLevel() {}

  _initMoney() {}

  _initBestScore() {}

  _init() {
    // Tạo container để chứa các button
    this.buttonContainer = new Container();
    this.addChild(this.buttonContainer);

    this._initButtonOutfits();
    this._initButtonBlacklist();
    this._initButtonGuns();

    // Thiết lập vị trí và căn giữa container chứa các button
    this.buttonContainer.x = GameConstant.GAME_WIDTH / 2 - 70;
    this.buttonContainer.y = GameConstant.GAME_HEIGHT - 300;
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

  _initTapToStart() {
    this.gameReloadText = new PIXI.Text("TAP TO START", this.smallTextStyle);
    this.gameReloadText.anchor.set(0.5);
    this.gameReloadText.zIndex = 2;
    this.gameReloadText.interactive = true;
    this.gameReloadText.cursor = "pointer";
    this.gameReloadText.position.set(0, 50);
    this.gameOverBar.addChild(this.gameReloadText);
    this.gameOverBar.position.set(720 / 2, 600);
    const hitArea = new PIXI.Rectangle(-GameConstant.GAME_WIDTH / 2, -650, GameConstant.GAME_WIDTH, GameConstant.GAME_HEIGHT);
    
    this.gameReloadText.hitArea = hitArea;

    this.gameReloadText.on("pointerdown", () => {
      this.parent.removeChild(this);
    });
  }

  _initButtonBlacklist() {
    // Button 'blacklist'
    this.buttonBlacklist = Sprite.from(Assets.get("blacklist"));
    this.buttonBlacklist.x = this.buttonOutfits.x - 160;
    this.buttonContainer.addChild(this.buttonBlacklist);
  }

  _initButtonOutfits() {
    // Button 'outfits'
    this.buttonOutfits = Sprite.from(Assets.get("outfits"));
    this.buttonOutfits.x = 0; // Khoảng cách giữa các button
    this.buttonContainer.addChild(this.buttonOutfits);
  }

  _initButtonGuns() {
    // Button 'guns'
    this.buttonGuns = Sprite.from(Assets.get("gunstore"));
    this.buttonGuns.x =this.buttonOutfits.x + 160; // Khoảng cách giữa các button
    this.buttonContainer.addChild(this.buttonGuns);
  }

  update(delta) {
    this.blinkCounter += delta * 0.1;
    this.gameReloadText.alpha = Math.abs(Math.sin(this.blinkCounter));
    console.log("blink 1");
  }

  _showMenuUI() {
    this.visible = true;
  }
}
