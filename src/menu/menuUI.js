import * as PIXI from "pixi.js";
import {
  Application,
  Assets,
  Container,
  Graphics,
  RenderTexture,
  Sprite,
} from "pixi.js";
import { GameState, PlayScene } from "../scenes/playScene";
import { GameConstant } from "../gameConstant";
import { Game } from "../game";
import { BlackListScene } from "../scenes/blackListScene";
import { OutfitsScene } from "../scenes/outFitsScene";
import { GunStoreScene } from "../scenes/gunStoreScene";

export class MenuUI extends Container {
  constructor() {
    super();

    this.gameOverBar = new PIXI.Container();

    this.game = new Game();
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
    // Create a semi-transparent background
    const background = new Graphics();
    background.beginFill(0x000000, 0.25); 
    background.drawRect(0, 0, GameConstant.GAME_WIDTH, GameConstant.GAME_HEIGHT);
    background.endFill();
    this.addChild(background);

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
      this.hide();
      setTimeout(() => {
        this.parent.parent.state = GameState.Playing;
      }, 50);
    });
  }

  _init() {

    // Tạo container để chứa các button
    this.buttonContainer = new Container();

    this._initButtonOutfits();
    this._initButtonBlacklist();
    this._initButtonGuns();

    this.addChild(this.buttonContainer);
  }

  _initButtonBlacklist() {
    // Button 'blacklist'
    this.buttonBlacklist = Sprite.from(Assets.get("blacklist"));
    this.buttonBlacklist.position.set(this.buttonOutfits.x - this.buttonBlacklist.width - 40, 1000);
    this.buttonContainer.addChild(this.buttonBlacklist);
    this.buttonBlacklist.interactive = true;
    this.buttonBlacklist.cursor = "pointer";

    this.buttonBlacklist.on("pointerdown", () => {
      this._onAnotherScene();
      this.blackListScene = new BlackListScene(this.app);
      Game.app.stage.addChild(this.blackListScene);
    });
  }

  _initButtonOutfits() {
    // Button 'outfits'
    this.buttonOutfits = Sprite.from(Assets.get("outfits"));
    this.buttonOutfits.position.set((GameConstant.GAME_WIDTH - this.buttonOutfits.width)/2 , 1000)
    this.buttonContainer.addChild(this.buttonOutfits);
    this.buttonOutfits.interactive = true;
    this.buttonOutfits.cursor = "pointer";

    this.buttonOutfits.on("pointerdown", () => {
      this._onAnotherScene();
      this.outfitsScene = new OutfitsScene(this.app);
      Game.app.stage.addChild(this.outfitsScene);
    });
  }

  _initButtonGuns() {
    // Button 'guns'
    this.buttonGuns = Sprite.from(Assets.get("gunstore"));
    this.buttonGuns.position.set(this.buttonOutfits.x + this.buttonGuns.width + 40, 1000);
    this.buttonContainer.addChild(this.buttonGuns);
    this.buttonGuns.interactive = true;
    this.buttonGuns.cursor = "pointer";

    this.buttonGuns.on("pointerdown", () => {
      this._onAnotherScene();
      
      this.gunStoreScene = new GunStoreScene(this.app);
      Game.app.stage.addChild(this.gunStoreScene);
    });
  }

  update(delta) {
    this.blinkCounter += delta * 0.1;
    this.gameReloadText.alpha = Math.abs(Math.sin(this.blinkCounter));
  }

  show() {
    this.visible = true;
  }
  hide(){
    this.visible = false;
  }
  _onAnotherScene(){
    this.gameReloadText.interactive = false;
  }
  _onPlayScene(){
    this.gameReloadText.interactive = true;
  }
}
