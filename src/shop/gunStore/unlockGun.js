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
import * as TWEEN from "@tweenjs/tween.js";

export class UnlockGun extends Container{

    constructor() {
        super();
        this._init();
    }

    _init(){
        
        this._initUnlockRandom();
        this._LockRandomGun();
        this._initWatchPR();
        
        this.checkMoney();
    }

    _initUnlockRandom() {
        this.btnRandomGun = Sprite.from(Assets.get("unlockRandom"));
        this.btnRandomGun.position.set(70, GameConstant.GAME_HEIGHT - 120);
        this.btnRandomGun.scale.set(0.6)
        this.addChild(this.btnRandomGun);

        const scaleTween = new TWEEN.Tween(this.btnRandomGun.scale)
        .to({ x: 0.7, y: 0.7 }, 300)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .repeat(Infinity)
        .yoyo(true)
        .start();

        const translateTween = new TWEEN.Tween(this.btnRandomGun.position)
        .to({ x: this.btnRandomGun.x - 15, y: this.btnRandomGun.y - 10}, 300)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .repeat(Infinity)
        .yoyo(true)
        .start();

        this.btnRandomGun.interactive = true;
        this.btnRandomGun.cursor = "pointer";
        let tmp = 1;
        this.btnRandomGun.on("pointerdown", () => {
            let money = localStorage.getItem('money');
                money = money - 250;
                if(money < 250){
                    tmp = 0;
                }
                localStorage.setItem('money', money);
                this.parent.money.updateText();
            if(tmp == 0){
                scaleTween.stop();
                translateTween.stop();
                this.btnRandomGun.scale.set(0.6);
                this.btnRandomGun.position.set(70, GameConstant.GAME_HEIGHT - 120);
                this.lockRandom.visible = true;
                this.btnRandomGun.visible = false;
            }
            if(this.parent.items.lockItems.length > 0) this.parent.items.unlockRandom();
        });
    }

    _initWatchPR(){
        this.btnWatchPR = Sprite.from(Assets.get("watchPR"));
        this.btnWatchPR.position.set(GameConstant.GAME_WIDTH - 250, GameConstant.GAME_HEIGHT - 120);
        this.btnWatchPR.scale.set(0.6)
        this.addChild(this.btnWatchPR);
        this.btnWatchPR.interactive = true;
        this.btnWatchPR.cursor = "pointer";

        this.btnWatchPR.on("pointerdown", () => {
            let money = localStorage.getItem('money');
            money = parseInt(money, 10); 
            money = money + 350;
            localStorage.setItem('money', money);
            this.parent.money.updateText();

            this.checkMoney();

            this.openLinkInBrowser('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        });
    }

    openLinkInBrowser(url) {
        const win = window.open(url, '_blank');
        win.focus();
    }

    _LockRandomGun() {
        this.lockRandom = new Container();
        
        this.btnRandomGun1 = Sprite.from(Assets.get("unlockRandom"));
        this.btnRandomGun1.position.set(70, GameConstant.GAME_HEIGHT - 120);
        this.btnRandomGun1.scale.set(0.6)
        this.lockRandom.addChild(this.btnRandomGun1);

        this.lockRandomGun = new Graphics();
        this.lockRandomGun.beginFill(0x000000, 0.7);
        this.lockRandomGun.drawRoundedRect(70, GameConstant.GAME_HEIGHT - 120, this.btnRandomGun.width+1,  this.btnRandomGun.height, 17);
        this.lockRandomGun.endFill();
        this.lockRandom.addChild(this.lockRandomGun);

        this.addChild(this.lockRandom);
    }

    show(){
        this.visible = true;
    }

    hide(){
        this.visible = false;
    }

      update(delta) {
        TWEEN.update();
      }

    checkMoney(){
        let money = localStorage.getItem('money');
        if (money < 250) {
            this.unlockHide();
        } else {
            this.unlockShow();
        } 

    }

    unlockShow(){
        this.lockRandom.visible = false;
        this.btnRandomGun.visible = true;
    }

    unlockHide(){
        this.lockRandom.visible = true;
        this.btnRandomGun.visible = false;
    }

}