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
        this.addChild(this.frame);
        this.frame.lineStyle(4, 0xFFFF00);
        this.frame.drawRoundedRect(0,0, GameConstant.ITEM_WIDTH, GameConstant.ITEM_HEIGHT);
    }

    _initBg(){
        this.bg = new Graphics();
        this.addChild(this.bg);
        this.bg.beginFill(0xFFFF00);
        this.bg.drawRoundedRect(0,0, GameConstant.ITEM_WIDTH, GameConstant.ITEM_HEIGHT);
        this.bg.visible = false;
    }

    _initLock(){
        this.lock = new Graphics();
        this.addChild(this.lock);
        this.lock.beginFill(0x00000, 0.5);
        this.lock.drawRoundedRect(-4,-4, GameConstant.ITEM_WIDTH + 8, GameConstant.ITEM_HEIGHT+8);
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
        this.text = new Text(this.name);
        this.addChild(this.text);
    }

    _onPointdown(){
        this.bg.visible = !this.bg.visible;
    }
    resize(){
        this.sprite.anchor.set(0.5);
        this.sprite.x = this.width/2 - this.sprite.width/4;
        this.sprite.y = this.height/2 - this.sprite.height/2;

        this.text.x = this.width/2 - this.text.width/2;
        this.text.y = this.height/2 + this.sprite.height/4;
    }
}