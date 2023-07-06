import { Graphics } from "pixi.js";
import { Enemy } from "./enemy";


export class ShortSkinnyEnemy extends Enemy{
    constructor(x, y, direction, maxX, color){
        super();
        this.direction = direction;
        this.speed = this.direction * 4;
        this.color = color;
        this.maxX = maxX;
        // this.weapon.scale.x = direction;
        this.drawHead();
        this.drawBody();
        this.addChild(this.head, this.body);
        this.position.set(x, y - this.height);
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
        this.head = new Graphics();
        this.head.beginFill(0xffffff); //white
        this.head.drawRect(0, 0, 40, 30);
        this.head.endFill();
    }
    drawBody(){
        this.body = new Graphics();
        this.body.beginFill(this.color); //red
        this.body.drawRect(5, 30, 30, 30);
        this.body.endFill();
    }
    update(dt){
        super.update(dt);
        this.move(dt);
    }
}