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
import { Game } from "../../game";

export class UnlockGun extends Container{

    constructor() {
        super();
        this._init();
    }

    _init(){
        this._initUnlockRandom();
        this._initWatchPR();
    }

    _initUnlockRandom() {
        this.btnRandomGun = Sprite.from(Assets.get("unlockRandom"));
        this.btnRandomGun.position.set(70, GameConstant.GAME_HEIGHT - 120);
        this.btnRandomGun.scale.set(0.6)
        this.addChild(this.btnRandomGun);

        this.btnRandomGun.interactive = true;
        this.btnRandomGun.cursor = "pointer";
        let tmp = 1;
        this.btnRandomGun.on("pointerdown", () => {
            if(tmp == 1){
                tmp = 0;
                this._LockRandomGun();
                console.log("lock random gun");
            }
        });
    }

    _initWatchPR(){
        this.btnWatchPR = Sprite.from(Assets.get("watchPR"));
        this.btnWatchPR.position.set(GameConstant.GAME_WIDTH - 225, GameConstant.GAME_HEIGHT - 120);
        this.btnWatchPR.scale.set(0.6)
        this.addChild(this.btnWatchPR);
        this.btnWatchPR.interactive = true;
        this.btnWatchPR.cursor = "pointer";

        this.btnWatchPR.on("pointerdown", () => {
            console.log("watch pr");
        });
    }

    _LockRandomGun() {
        const lockRandomGun = new Graphics();
        lockRandomGun.beginFill(0x000000, 0.7);
        lockRandomGun.drawRoundedRect(70, GameConstant.GAME_HEIGHT - 120, 333, 97, 16);
        lockRandomGun.endFill();
        this.addChild(lockRandomGun);
    }

    show(){
        this.visible = true;
    }

    hide(){
        this.visible = false;
    }

}