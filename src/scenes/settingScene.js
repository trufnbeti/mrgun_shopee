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

        this.musicStage();
        this.soundStage();
        
    }

    musicStage(){
      this.musicContainer = new Container();
      this.musicContainer.cursor = "pointer";
      this.musicContainer.interactive = true;

      this.OnStage1 = Sprite.from(Assets.get("on"));
      this.OnStage1.scale.set(0.7);
      this.OnStage1.position.set(GameConstant.GAME_WIDTH/2, GameConstant.GAME_HEIGHT /3 - 30);
      this.musicContainer.addChild(this.OnStage1);

      this.OffStage1 = Sprite.from(Assets.get("off"));
      this.OffStage1.scale.set(0.7);
      this.OffStage1.position.set(GameConstant.GAME_WIDTH/2, GameConstant.GAME_HEIGHT /3 - 30);
      this.musicContainer.addChild(this.OffStage1);
      this.OffStage1.visible = false;

      this.addChild(this.musicContainer);

      let tmp1 = 1;
      const savedTmp1 = localStorage.getItem("musicStage");
      if (savedTmp1 !== null) {
        tmp1 = parseInt(savedTmp1, 10);
        // Khôi phục trạng thái hiển thị dựa trên giá trị tmp1
        this.OnStage1.visible = tmp1 === 1;
        this.OffStage1.visible = tmp1 === 0;
      }

      // Sự kiện click để thay đổi trạng thái và lưu vào localStorage
      this.musicContainer.on("pointerdown", () => {
        if (tmp1 === 1) {
          this.OnStage1.visible = false;
          this.OffStage1.visible = true;
          tmp1 = 0;
        } else {
          this.OnStage1.visible = true;
          this.OffStage1.visible = false;
          tmp1 = 1;
        }
        // Lưu trạng thái tmp1 vào localStorage
        localStorage.setItem("musicStage", tmp1);
        Game.startBackgroundMusic();

      });
    }

    soundStage(){
      this.soundContainer = new Container();
      this.soundContainer.cursor = "pointer";
      this.soundContainer.interactive = true;

      this.OnStage = Sprite.from(Assets.get("on"));
      this.OnStage.scale.set(0.7);
      this.OnStage.position.set(GameConstant.GAME_WIDTH/2, GameConstant.GAME_HEIGHT /3 + 73);
      this.soundContainer.addChild(this.OnStage);

      this.OffStage = Sprite.from(Assets.get("off"));
      this.OffStage.scale.set(0.7);
      this.OffStage.position.set(GameConstant.GAME_WIDTH/2, GameConstant.GAME_HEIGHT /3 + 73);
      this.soundContainer.addChild(this.OffStage);
      this.OffStage.visible = false;

      this.addChild(this.soundContainer);

      let tmp = 1;
      const savedTmp = localStorage.getItem("soundStage");
      if (savedTmp !== null) {
        tmp = parseInt(savedTmp, 10);
        // Khôi phục trạng thái hiển thị dựa trên giá trị tmp1
        this.OnStage.visible = tmp === 1;
        this.OffStage.visible = tmp === 0;
      }

      // Sự kiện click để thay đổi trạng thái và lưu vào localStorage
      this.soundContainer.on("pointerdown", () => {
        if (tmp === 1) {
          this.OnStage.visible = false;
          this.OffStage.visible = true;
          tmp = 0;
        } else {
          this.OnStage.visible = true;
          this.OffStage.visible = false;
          tmp = 1;
        }
        // Lưu trạng thái tmp1 vào localStorage
        localStorage.setItem("soundStage", tmp);
      });
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
        this.textSound.position.set(this.textMusic.x + 12, GameConstant.GAME_HEIGHT /3 + 110);
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