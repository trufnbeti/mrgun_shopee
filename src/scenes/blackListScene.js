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

export class BlackListScene extends Container{

    constructor() {
        super();
        this._initBackGround();
        this._initTextBig();
        this._initTextSmall();
        this._initTextTitle();
        this._initBGListBoss();
        this._iniTextList();
        this._initButtonBack();

        console.log("black list scene");
        
    }

    _initButtonBack() {
        this.buttonBack = Sprite.from(Assets.get("back"));
        this.buttonBack.position.set(30, 60);
        this.buttonBack.scale.set(0.4);
        this.addChild(this.buttonBack);
        this.buttonBack.interactive = true;
        this.buttonBack.cursor = "pointer";
    }
    
    _iniTextList(){
        let levelBlackList = 1;
        this.textList = new PIXI.Text("LIST NO. 1", this.smallTextStyle);
        this.textList.anchor.set(0.5);
        this.textList.zIndex = 2;
        this.textList.position.set(GameConstant.GAME_WIDTH/2, (GameConstant.GAME_HEIGHT - 900) / 2 + 50);
        this.addChild(this.textList);
    }

    _initBGListBoss() {
        this.bgListBoss = new Graphics();
        this.bgListBoss.beginFill(0x293B4B);
        
        const width = 600;
        const height = 900;
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
        this.textTitle.position.set(GameConstant.GAME_WIDTH/2, 80);
        this.addChild(this.textTitle);
      }

    _initTextBig() {
        this.bigTextStyle = new PIXI.TextStyle({
          fontFamily: "Century Gothic",
          fontSize: 35,
          // fontStyle: 'italic',
          fontWeight: "bold",
          fill: ["#ffffff"],
        });
      }

      _initTextSmall() {
        this.smallTextStyle = new PIXI.TextStyle({
          fontFamily: "Helvetica",
          fontSize: 25,
          fill: ["#ffffff"],
        });
    }
    _initBackGround(){
        // Add black background
        const background = new Graphics();
        background.beginFill(0x131313);
        background.drawRect(0, 0, GameConstant.GAME_WIDTH, GameConstant.GAME_HEIGHT);
        background.endFill();
        this.addChild(background);
    }

    
}