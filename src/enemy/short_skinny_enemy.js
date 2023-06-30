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
    move(){
        if (this.direction == -1)
            if (this.x > this.maxX)
                this.x += this.speed;
        if (this.direction == 1)
            if (this.x < this.maxX)
                this.x += this.speed;
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
    equipWeapon(){
        if (this.direction == -1){ //weapon ben trai
            this.weapon.weapon.scale.x *= -1;
            this.weapon.x = this.width / 2;
            this.weapon.y = this.height / 2;
        }else{ //weapon ben phai
            this.weapon.x = this.width / 2;
            this.weapon.y = this.height / 2;
        }
        this.addChild(this.weapon);
    }
    update(){
        super.update();
        this.move();
    }
}