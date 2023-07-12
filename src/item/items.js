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
import { ItemState } from "./itemState";

export class Item extends Container{
    constructor() {
        super();

        

        this.uspS();
    }

    gunState(){
        const gunState = new ItemState();
        // this.gunState.position.set(70, GameConstant.GAME_HEIGHT /3);
        this.addChild(gunState);
    }

    uspS(){
        this.uspS = Sprite.from(Assets.get("usp_s"));
        this.gunState();
        this.position.set(70, GameConstant.GAME_HEIGHT /3 + 30);
        this.uspS.position.set(30, 50);
        this.uspS.scale.set(3)
        this.addChild(this.uspS);
        this.name();
    }

    name(){
        this._initTextBig();
        this.textTitle = new PIXI.Text("USP-S", this.bigTextStyle);
        this.textTitle.anchor.set(0.5);
        this.textTitle.zIndex = 2;
        this.addChild(this.textTitle);
    }
  
    _initTextBig() {
        this.bigTextStyle = new PIXI.TextStyle({
          fontFamily: "Triomphe Bold Autoinstr",
          fontSize: 25,
          fontStyle: 'bold',
          fill: ["#ffffff"],
        });
      }
    show(){
        this.visible = true;
    }

}