import { Assets, Container, Sprite } from "pixi.js";

export class EndPortal extends Container{
    constructor(x,y,direction){
        super();
        this.sprite = Sprite.from(Assets.get("wingame"));
        this.sprite.anchor.set(0.5, 0);
        this.sprite.scale.x *= direction;
        this.addChild(this.sprite);
        this.x = x ;
        this.y = y - this.height;
        this.zIndex = 3;
    }
}