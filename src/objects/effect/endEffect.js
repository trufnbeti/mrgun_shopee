import { Assets, Container, Graphics, Sprite } from "pixi.js";

export class EndPortal extends Container{
    constructor(x,y){
        super();
        this.graphics = Sprite.from(Assets.get("wingame"));
        this.graphics.position.set(0,0);
        this.addChild(this.graphics);
        this.x = x;
        this.y = y - this.height;
        this.zIndex = 3;
    }
}