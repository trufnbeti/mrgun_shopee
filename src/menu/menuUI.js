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
import { SettingScene } from "../scenes/settingScene";
import * as TWEEN from "@tweenjs/tween.js";
import { Money } from "../objects/money/money";

export class MenuUI extends Container {
  constructor() {
    super();

    this._initBackGround();
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
    // Create a semi-transparent background
    const background = new Graphics();
    background.beginFill(0x000000, 0.25); 
    background.drawRect(0, 0, GameConstant.GAME_WIDTH, GameConstant.GAME_HEIGHT);
    background.endFill();
    this.addChild(background);

    this.layoutUIContainer = new PIXI.Container();
    this.addChild(this.layoutUIContainer);

    this._initLevel();
    this._initMoney();
    this._initLOGO();
    this.bestScore();
  }

  _initLOGO() {
    this.logoSpriter = Sprite.from(Assets.get("logoMRGUN"));
    this.logoSpriter.position.set(GameConstant.GAME_WIDTH / 2 - this.logoSpriter.width*0.4, GameConstant.GAME_HEIGHT / 7 + 20);
    this.logoSpriter.scale.set(0.75);;
    this.layoutUIContainer.addChild(this.logoSpriter);
  }

  _initLevel() {
    const graphicLevel = new Graphics();
    graphicLevel.beginFill(0x525252);
    const w = 350; 
    graphicLevel.drawRoundedRect((GameConstant.GAME_WIDTH - w) / 2,100, w, 32, 27);
    graphicLevel.endFill();
    this.addChild(graphicLevel);

    this._initTextNormal();
    this.level = localStorage.getItem("level");
    if(!this.level){
        localStorage.setItem("level", 1);
        this.level = 1;
    } 
    this.textLevel = new PIXI.Text("LEVEL "+this.level, this.normalTextStyle);
    this.textLevel.position.set((GameConstant.GAME_WIDTH - this.textLevel.width) / 2, 100);
    this.addChild(this.textLevel);
  }

  _initMoney(){
    this.money = new Money();
    this.addChild(this.money);
  }

  bestScore(){
    this.bestScore = new Container();

    this._initTextBig();
    this.textTitle = new PIXI.Text("BEST:", this.bigTextStyle);
    this.textTitle.anchor.set(0.5);
    this.textTitle.zIndex = 2;
    this.textTitle.position.set(0, 0);

    let score = 0;
    score = localStorage.getItem('bestScore');
    this.score = new PIXI.Text(score, this.bigTextStyle);
    this.score.anchor.set(0.5);
    this.score.zIndex = 2;
    this.score.position.set(this.textTitle.width + 20, 0)

    this.bestScore.position.set((GameConstant.GAME_WIDTH - this.textTitle.width)/2, 
                                      this.logoSpriter.y + this.logoSpriter.height + 40);
    this.bestScore.addChild(this.textTitle);
    this.bestScore.addChild(this.score);

    this.addChild(this.bestScore);
  }

  _initTextSmall() {
    this.smallTextStyle = new PIXI.TextStyle({
      fontFamily: "Triomphe Bold Autoinstr",
      fontSize: 35,
      fill: ["#ffffff"],
    });
  }

  _initTextNormal() {
    this.normalTextStyle = new PIXI.TextStyle({
      fontFamily: "Triomphe Regular Autoinstr",
      fontSize: 25,
      fill: ["#ffffff"],
    });
  }

  _initTextBig() {
    this.bigTextStyle = new PIXI.TextStyle({
      fontFamily: "Triomphe Regular Autoinstr",
      fontSize: 52,
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

    this._initButtonSetting();
    this._initButtonOutfits();
    this._initButtonBlacklist();
    this._initButtonGuns();

    this.addChild(this.buttonContainer);
  }

  _initButtonSetting() {
    this.buttonSetting = Sprite.from(Assets.get("setting"));
    this.buttonSetting.position.set(40, 40);
    this.buttonContainer.addChild(this.buttonSetting);
    this.buttonSetting.interactive = true;
    this.buttonSetting.cursor = "pointer";

    this.buttonSetting.on("pointerdown", () => {
      this._onAnotherScene();
      Game.app.stage.removeChild(this.settingScene);
      this.settingScene = new SettingScene(this.app);
      Game.app.stage.addChild(this.settingScene);
    });
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
      Game.app.stage.removeChild(this.blackListScene);
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
      Game.app.stage.removeChild(this.outfitsScene);
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

    this._pulsingAnimation(this.buttonGuns);

    this.buttonGuns.on("pointerdown", () => {
      this._onAnotherScene();
      
      Game.app.stage.removeChild(this.gunStoreScene);
      this.gunStoreScene = new GunStoreScene(this.app);
      Game.app.stage.addChild(this.gunStoreScene);
    });
  }

  _pulsingAnimation(button) {
    const scaleTween = new TWEEN.Tween(button)
    .to( {scale:{ x: 1.1, y: 1.1 }, position: { x: button.x - button.width*0.05, y: button.y - button.height*0.075}}, 300)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .repeat(Infinity)
    .yoyo(true)
    .start();
  }

  update(delta) {
    TWEEN.update();

    this.blinkCounter += delta * 0.1;
    this.gameReloadText.alpha = Math.abs(Math.sin(this.blinkCounter));

    this.money.updateText();
  }

  _initBackGround() {
    // Add black background
    const background = new PIXI.Graphics();
    let colorFill = 0x000000;
    let startOpacity = 0.9; 
    let endOpacity = 0.0;   
    // Create a gradient fill with fading opacity
    const height = 300; // Adjust the height as needed
    for (let i = 0; i < height; i+=2) {
      const alpha = startOpacity - (startOpacity - endOpacity) * (i / height);
      background.beginFill(colorFill, alpha);
      background.drawRect(0, i, GameConstant.GAME_WIDTH, 6);
      background.endFill();
    }
    this.addChild(background);
}

  show() {
    this.visible = true;
  }
  hide(){
    this.visible = false;
  }
  _onAnotherScene(){
    this.gameReloadText.interactive = false;
    this.buttonGuns.interactive = false;
    this.buttonBlacklist.interactive = false;
    this.buttonOutfits.interactive = false;
    this.buttonSetting.interactive = false;
  }
  _onPlayScene(){
    this.gameReloadText.interactive = true;
    this.buttonGuns.interactive = true;
    this.buttonBlacklist.interactive = true;
    this.buttonOutfits.interactive = true;
    this.buttonSetting.interactive = true;
    Game.playScene.bulletManager.effectManager.updateText();
  }
}
