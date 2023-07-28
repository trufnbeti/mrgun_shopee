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
import * as TWEEN from "@tweenjs/tween.js";

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

        let moveCount = 0; 

      const moveTween = new TWEEN.Tween(this.lampImg.position)
        .to({ x: this.lampImg.x, y: this.lampImg.y + 10 }, 300)
        .easing(TWEEN.Easing.Quadratic.InOut);

        moveTween.onComplete(() => {
            moveCount++; 
            if (moveCount >= 6) {
                moveTween.stop();
            } else {
                moveTween.yoyo(true).start(); 
            }
        });

      moveTween.start();
    }
    _initLight() {
        this.lightImg = Sprite.from(Assets.get("light"));
        this.lightImg.position.set((GameConstant.GAME_WIDTH - this.lightImg.width*0.72)/2, 230);
        this.lightImg.scale.set(0.75)
        this.addChild(this.lightImg);
        this.lightImg.alpha = 1;

        const alphaTween = new TWEEN.Tween(this.lightImg)
        .to({ alpha: 0.3 }, 300) 
        .easing(TWEEN.Easing.Quadratic.InOut);

        alphaTween.onComplete(() => {
            this.lightImg.alpha = 1; 
            this.lightCount++; 
            if (this.lightCount >= 10) {
                return;
            }

            alphaTween.start();
        });
        alphaTween.start();

        this.lightCount = 1; 
      }

      update(delta) {
        TWEEN.update();
      }
      
}