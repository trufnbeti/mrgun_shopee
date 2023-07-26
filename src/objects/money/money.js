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
import { UnlockGun } from "../../shop/gunStore/unlockGun";

export class Money extends Container{

    constructor() {
        super();
        this.show();
        this._initMoney();
    }

    _initMoney() {
        this.money = new Container();
        this.addChild(this.money);
        this.moneySprite = Sprite.from(Assets.get("money"));
        this.money.addChild(this.moneySprite);
        this.moneySprite.scale.set(0.4);
    
        let money = localStorage.getItem('money');
        if(money == null){
          money = 0;
          localStorage.setItem('money', 0);
        } 

        this.moneyText = new PIXI.Text(money,{ 
          fontFamily: "Triomphe Bold Autoinstr",
          fontSize: 30,
          fill: ["#ffffff"],
        });
        this.moneyText.x = this.moneySprite.width + 10;
        this.money.addChild(this.moneyText);
        this.money.position.set(GameConstant.GAME_WIDTH - 130, 30);
    }
    updateText(){
      let money = localStorage.getItem('money');

      this.moneyText.text = money;
    }

    show(){
        this.visible = true;
    }
}
