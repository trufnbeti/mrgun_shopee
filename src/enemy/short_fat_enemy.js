import { Graphics } from "pixi.js";
import { Enemy } from "./enemy";

export class ShortFatEnemy extends Enemy{
    constructor(x, y, direction, maxX, color){
        super();
        this.direction = direction;
        this.speed = this.direction * 2.5;
        this.maxX = maxX;
        this.color = color;
        // this.weapon.scale.x = direction;
        this.drawHead();
        this.drawBody();
        this.addChild(this.head, this.body);
        this.position.set(x, y - this.height);
        this.equipWeapon();
        this.isLeanRight = true;
        this.isLeanLeft = false;
        this.angleLean = 1;
        this.timer = 0;
    }
    move(){
        if (this.direction == -1)
            if (this.x > this.maxX)
                this.x += this.speed;
            else
                this.angle = 0;
        if (this.direction == 1)
            if (this.x < this.maxX)
                this.x += this.speed;
            else
                this.angle = 0;
        
    }
    drawHead(){
        this.head = new Graphics();
        this.head.beginFill(0xffffff); //white
        this.head.drawRect(0, 0, 40, 25);
        this.head.endFill();
    }
    drawBody(){
        this.body = new Graphics();
        this.body.beginFill(this.color); //red
        this.body.drawRect(-5, 25, 50, 30);
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
    lean(){
        if (this.isLeanRight){
            this.isLeanLeft = true;
            this.isLeanRight = false;
            this.angle = this.angleLean;
        }else{
            this.isLeanLeft = false;
            this.isLeanRight = true;
            this.angle = -this.angleLean;
        }
    }
    update(dt){
        super.update(dt);
        this.timer += dt;
        if (this.timer > 5){
            this.lean();
            this.timer = 0;
        }
        this.move();
    }
}