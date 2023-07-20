import * as PIXI from "pixi.js";
import { Application, Assets, Container, Graphics, RenderTexture, Sprite,} from "pixi.js";
import { GameConstant } from "../gameConstant";
import { Game } from "../game";
import { ItemFrame } from "../objects/item/itemFrame";
import { Lamp } from "../shop/gunStore/lamp";
import { UnlockGun } from "../shop/gunStore/unlockGun";


export class GunStoreScene extends Container{
  constructor() {
    super();
    this._initBackGround();
    this._initBG();

    this._initLamp();
    
    this._initTextBig();
    this._initTextSmall();
    this._initTextTitle();
    this._initButtonBack();
    this._initMoney();

    this._initUnlockGun(); 
    
    this._initGun(); 
  }

  _initLamp(){
    const lamp = new Lamp();
    this.addChild(lamp);
  }

  _initUnlockGun() {
    const unlockGun = new UnlockGun(); 
    this.addChild(unlockGun); // Add the UnlockGun to the GunStoreScene container
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
        this.parent.removeChild(this);
        Game._initScene();
    });
  }

  _initTextTitle() {
    this.textTitle = new PIXI.Text("GUN STORE", this.bigTextStyle);
    this.textTitle.anchor.set(0.5);
    this.textTitle.zIndex = 2;
    this.textTitle.position.set(GameConstant.GAME_WIDTH/2, 80);
    this.addChild(this.textTitle);
  }

  _initTextBig() {
    this.bigTextStyle = new PIXI.TextStyle({
      fontFamily: "Triomphe Bold Autoinstr",
      fontSize: 35,
      fontStyle: 'bold',
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

  _initBG(){
    //add background with color follow stair random
    const bGOutfits = new Graphics();
    bGOutfits.beginFill(0x26370a);
    bGOutfits.drawRect(0, GameConstant.GAME_HEIGHT / 3, GameConstant.GAME_WIDTH, GameConstant.GAME_HEIGHT);
    bGOutfits.endFill();
    this.addChild(bGOutfits);
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

  _initGun(){
    this.items = new ItemFrame('gun',['ak', 'aug', 'scout', 'sawed_off', 'desert_eagle', 'r8', 'mp5', 'negev', 'usp_s']);
    this.addChild(this.items);
  }
    
}