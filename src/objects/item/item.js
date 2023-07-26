import * as PIXI from "pixi.js";
import { Assets, Container, Graphics, Sprite, Text } from "pixi.js";
import { GameConstant } from "../../gameConstant";

export class Item extends Container{
    constructor(name){
        super();
        this.name = name;
        this._init();
    }
    _init(){
        this._initFrame();
        this._initBg();
        this._initSprite();
        this._initText();
        this._initLock();

        // this.interactive = true;
        // this.cursor = "pointer";
        // this.on("pointerdown", this._onPointdown, this);
        this.resize();
    }
    _initFrame(){
        this.frame = new Graphics();
        let yellowc = 0xf3b23d;
        this.frame.lineStyle(10, yellowc);
        this.frame.drawRoundedRect(0,0, GameConstant.ITEM_WIDTH, GameConstant.ITEM_HEIGHT, 20);
        this.addChild(this.frame);
    }

    _initBg(){
        this.bg = new Graphics();
        let yellowc = 0xf3b23d;
        this.bg.beginFill(yellowc);
        this.bg.drawRoundedRect(0,0, GameConstant.ITEM_WIDTH, GameConstant.ITEM_HEIGHT, 20);
        this.addChild(this.bg);

        this.bg.visible = false;
    }

    _initLock(){
        this.lock = new Graphics();
        this.lock.beginFill(0x00000, 0.5);
        this.lock.drawRoundedRect(-5,-5, GameConstant.ITEM_WIDTH + 10, GameConstant.ITEM_HEIGHT + 10, 20);
        this.addChild(this.lock);

        this.isLock = localStorage.getItem(this.name);
        if(this.isLock == null){
            this.isLock = true;
            localStorage.setItem(this.name, this.isLock);
        }
        
        this.lock.visible = false;
    }

    _initSprite(){
        this.sprite = Sprite.from(Assets.get(this.name));
        this.addChild(this.sprite);
    }

    _initText(){
        this._initTextSmall();
        this.text = new Text(this.name, this.smallTextStyle);

        this.addChild(this.text);
    }
    _initTextSmall() {
        this.smallTextStyle = new PIXI.TextStyle({
          fontFamily: "Triomphe Light Autoinstr",
          fontSize: 20,
          fill: ["#ffffff"],
        });
    }

    _onPointdown(){
        this.bg.visible = !this.bg.visible;
    }
    resize(){
        this.sprite.scale.set(1.45)
        this.sprite.anchor.set(0.5);
        this.sprite.x = this.width/2 - this.sprite.width/4;
        this.sprite.y = this.height/2 - this.sprite.height/2 + 40;

        this.text.x = this.width/2 - this.text.width/2;
        this.text.y = this.height/4 - this.text.height ;
    }
}