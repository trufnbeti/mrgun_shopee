import * as PIXI from "pixi.js";
import {
  Application,
  Assets,
  Container,
  Graphics,
  RenderTexture,
  Sprite,
} from "pixi.js";
import { GameConstant } from "../gameConstant";
import { Game } from "../game";

export class SettingScene extends Container{

    constructor() {
        super();
        this._initBackGround();
        this._initTextBig();
        this._initTextSmall();
        this._initTextTitle();
        this._initButtonBack();
        this._initMoney();

        this._initTextMusic();
        this._initTextSounds();
        
    }

    _initMoney(){
        this.money = Sprite.from(Assets.get("money"));
        this.money.position.set(GameConstant .GAME_WIDTH - 130, 60);
        this.money.scale.set(0.4);
        this.addChild(this.money);
    }

    _initButtonBack() {
        this.buttonBack = Sprite.from(Assets.get("back"));
        this.buttonBack.position.set(30, 60);
        this.buttonBack.scale.set(0.4);
        this.addChild(this.buttonBack);
        this.buttonBack.interactive = true;
        this.buttonBack.cursor = "pointer";

        this.buttonBack.on("pointerdown", () => {
            this.hide();
        });
    }

    _initTextTitle() {
        this.textTitle = new PIXI.Text("SETTINGS", this.bigTextStyle);
        this.textTitle.anchor.set(0.5);
        this.textTitle.zIndex = 2;
        this.textTitle.position.set(GameConstant.GAME_WIDTH/2, 80);
        this.addChild(this.textTitle);
      }

      _initTextMusic() {
        this.textMusic= new PIXI.Text("MUSIC", this.smallTextStyle);
        this.textMusic.anchor.set(0.5);
        this.textMusic.zIndex = 2;
        this.textMusic.position.set(GameConstant.GAME_WIDTH/4, GameConstant.GAME_HEIGHT /3);
        this.addChild(this.textMusic);
      }

      _initTextSounds() {
        this.textSound = new PIXI.Text("SOUNDS", this.smallTextStyle);
        this.textSound.anchor.set(0.5);
        this.textSound.zIndex = 2;
        this.textSound.position.set(this.textMusic.x + 12, GameConstant.GAME_HEIGHT /3 + 100);
        this.addChild(this.textSound);
      }

      _initTextBig() {
        this.bigTextStyle = new PIXI.TextStyle({
          fontFamily: "Triomphe Bold Autoinstr",
          fontSize: 35,
          fill: ["#ffffff"],
        });
      }

      _initTextSmall() {
        this.smallTextStyle = new PIXI.TextStyle({
          fontFamily: "Triomphe Bold Autoinstr",
          fontSize: 30,
          fill: ["#ffffff"],
        });
    }

    _initBackGround(){
        // Add black background
        const background = new Graphics();
        let colorFill = 0x000000;
        background.beginFill(colorFill, 0.9);
        background.drawRect(0, 0, GameConstant.GAME_WIDTH, GameConstant.GAME_HEIGHT);
        background.endFill();
        this.addChild(background);
    }

    hide(){
      this.visible = false;
      Game.playScene.menu.menuUI._onPlayScene();
    }
    show(){
      this.visible = true;
    }
    
}