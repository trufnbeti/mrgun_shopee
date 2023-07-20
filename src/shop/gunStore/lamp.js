import * as PIXI from "pixi.js";
import {
  Application,
  Assets,
  Container,
  Graphics,
  RenderTexture,
  Sprite,
} from "pixi.js";
import { GameConstant } from "../../gameConstant";
// import { TWEEN } from "@tweenjs/tween.js"; // Import TWEEN from the installed package

export class Lamp extends Container{

    constructor() {
      super();
      this._initLight();
      this._initLamp(); 
      
    }

    _initLamp(){
        this.lampImg = Sprite.from(Assets.get("lamp"));
        this.lampImg.position.set((GameConstant.GAME_WIDTH - this.lampImg.width*0.6)/2, 0);
        this.lampImg.scale.set(0.6)
        this.addChild(this.lampImg);
    }
    _initLight() {
        this.lightImg = Sprite.from(Assets.get("light"));
        this.lightImg.position.set((GameConstant.GAME_WIDTH - this.lightImg.width*0.72)/2, 230);
        this.lightImg.scale.set(0.75)
        this.addChild(this.lightImg);
      }
          
      
    update(delta) {
    }
      
}