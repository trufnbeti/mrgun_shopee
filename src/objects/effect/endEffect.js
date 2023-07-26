import { Container, Graphics } from "pixi.js";

export class EndPortal extends Container{
    constructor(x,y){
        super();
        this.graphics = new Graphics();
        this.graphics.beginFill(0xffffff);
        this.graphics.drawRect(0, 0, 50, 100);
        this.graphics.endFill();
        this.addChild(this.graphics);
        this.x = x;
        this.y = y - this.height;
        this.zIndex = 3;
    }
}