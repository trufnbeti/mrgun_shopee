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

export class BlackListScene extends Container{

    constructor() {
        super();
        this._initBackGround();
        this._initTextBig();
        this._initTextSmall();
        this._initTextTitle();
        this._initBGListBoss();
        this._iniTextList();
        this._initButtonCancel();

        console.log("black list scene");
        
    }

    _initButtonCancel() {
        this.buttonCancel = Sprite.from(Assets.get("cancel"));
        this.buttonCancel.position.set(this.bgListBoss.width , (GameConstant.GAME_HEIGHT - this.bgListBoss.height - 50) / 2);
        this.buttonCancel.scale.set(0.76);
        this.addChild(this.buttonCancel);
        this.buttonCancel.interactive = true;
        this.buttonCancel.cursor = "pointer";

        this.buttonCancel.on("pointerdown", () => {
            this.hide();
        });
    }
    
    _iniTextList(){
        let levelBlackList = 1;
        this.textList = new PIXI.Text("LIST NO. 1", this.smallTextStyle);
        this.textList.anchor.set(0.5);
        this.textList.zIndex = 2;
        this.textList.position.set(GameConstant.GAME_WIDTH/2, (GameConstant.GAME_HEIGHT - this.bgListBoss.height) / 2 + 50);
        this.addChild(this.textList);
    }

    _initBGListBoss() {
        this.bgListBoss = new Graphics();
        this.bgListBoss.beginFill(0x364354);
        
        const width = 616;
        const height = 1000;
        const x = (GameConstant.GAME_WIDTH - width) / 2;
        const y = (GameConstant.GAME_HEIGHT - height) / 2;
        const cornerRadius = 30; // Điều chỉnh bán kính bo góc tròn tại đây
        
        this.bgListBoss.drawRoundedRect(x, y, width, height, cornerRadius);
        
        this.bgListBoss.endFill();
        this.addChild(this.bgListBoss);
    }


    _initTextTitle() {
        this.textTitle = new PIXI.Text("BLACK LIST", this.bigTextStyle);
        this.textTitle.anchor.set(0.5);
        this.textTitle.zIndex = 2;
        this.textTitle.position.set(GameConstant.GAME_WIDTH/2, 50);
        this.addChild(this.textTitle);
      }

    _initTextBig() {
        this.bigTextStyle = new PIXI.TextStyle({
          fontFamily: "Triomphe Bold Autoinstr",
          fontSize: 35,
          fontWeight: "bold",
          fill: ["#ffffff"],
        });
      }

      _initTextSmall() {
        this.smallTextStyle = new PIXI.TextStyle({
          fontFamily: "Triomphe Bold Autoinstr",
          fontSize: 25,
          fill: ["#ffffff"],
        });
    }
    _initBackGround(){
        // Add black background
        const background = new Graphics();
        background.beginFill(0x000000, 0.92);
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