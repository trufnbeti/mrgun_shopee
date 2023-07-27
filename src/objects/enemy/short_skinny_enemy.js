import { Graphics } from "pixi.js";
import { Enemy } from "./enemy";


export class ShortSkinnyEnemy extends Enemy{
    constructor(x, y, direction, maxX, color){
        super();
        this.head = new Graphics();
        this.body = new Graphics();
        this.addChild(this.head, this.body);
        this._init(x, y, direction, maxX, color);
    }
    _init(x, y, direction, maxX, color){
        this.direction = direction;
        this.speed = this.direction * 7;
        this.color = color;
        this.maxX = maxX;
        this.drawHead();
        this.drawBody();
        this.position.set(x, y - (this.head.height + this.body.height) / 2);
        const centerX = this.body.width / 2;
        const centerY = (this.head.height + this.body.height) / 2;
        this.pivot.set(centerX, centerY);
        this.equipWeapon();
    }
    move(dt){
        if (this.direction == -1)
            if (this.x > this.maxX)
                this.x += this.speed * dt;
        if (this.direction == 1)
            if (this.x < this.maxX)
                this.x += this.speed * dt;
    }
    drawHead(){
        this.head.beginFill(0xffffff); //white
        this.head.drawRect(0, 0, 40, 30);
        this.head.endFill();
    }
    drawBody(){
        this.body.beginFill(this.color); //red
        this.body.drawRect(5, 30, 30, 30);
        this.body.endFill();
    }
    update(dt){
        super.update(dt);
        this.move(dt);
    }
}