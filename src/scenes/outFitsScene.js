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
import { ItemFrame } from "../objects/item/itemFrame";
import { UnlockGun } from "../shop/gunStore/unlockGun";

export class OutfitsScene extends Container{

    constructor() {
        super();
        this._initBackGround();
        this._initTextBig();
        this._initTextSmall();
        this._initTextTitle();

        this._initLight();

        this._initButtonBack();
        this._initMoney();
        this._initBGOutfits();

       this._initOutfit();

       this._initUnlockGun();
    }

    _initUnlockGun() {
      const unlockGun = new UnlockGun(); 
      this.addChild(unlockGun); // Add the UnlockGun to the GunStoreScene container
    }

    _initLight() {
      this.lightImg = Sprite.from(Assets.get("light"));
      this.lightImg.scale.y = 1.55;
      this.lightImg.scale.x = 1.15;
      this.lightImg.position.set((GameConstant.GAME_WIDTH - this.lightImg.width)/2 + 11, 0);
      this.addChild(this.lightImg);
    }

    _initBGOutfits(){
        //add background with color follow stair random
        const bGOutfits = new Graphics();
        bGOutfits.beginFill(0x26370a);
        bGOutfits.drawRect(0, GameConstant.GAME_HEIGHT / 3, GameConstant.GAME_WIDTH, GameConstant.GAME_HEIGHT);
        bGOutfits.endFill();
        this.addChild(bGOutfits);
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
            Game.playScene.player._initCharacter();
            this.hide();
        });
    }

    _initTextTitle() {
        this.textTitle = new PIXI.Text("OUTFITS", this.bigTextStyle);
        this.textTitle.anchor.set(0.5);
        this.textTitle.zIndex = 2;
        this.textTitle.position.set(GameConstant.GAME_WIDTH/2, 80);
        this.addChild(this.textTitle);
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
          fontSize: 25,
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

    _initOutfit(){
      this.items = new ItemFrame('outfit',
      ['CLASSIC',
      'HITMAN',
      'ATIS',
      'DARKA',
      'TRUG',
      'PIXI',
      'MRKIN',
      'MRKHIM',
      'TINY']);
      this.addChild(this.items);
    }

    hide(){
      this.visible = false;
      Game.playScene.menu.menuUI._onPlayScene();
    }
    show(){
      this.visible = true;
    }
    
}