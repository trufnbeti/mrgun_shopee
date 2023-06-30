import { Graphics, Ticker } from "pixi.js";
import { Enemy } from "./enemy";


export class TallEnemy extends Enemy{
    constructor(x, y, direction, maxX, color){
        super(x, y);
        this.direction = direction;
        this.speed = this.direction * 13;
        this.color = color;
        this.maxX = maxX;
        // this.weapon.scale.x = direction;
        this.drawHead();
        this.drawBody();
        this.addChild(this.head, this.body);
        this.position.set(x, y - this.height);
        this.equipWeapon();
        this.isJumping = false;
        this.gravity = 0.98;
        this.power = 8;
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
        if (this.isJumping) return;
        const jumpAt = this.y;
        this.isJumping = true;
        let time = 0;

        const tick = deltaMs => {
            const jumpHeight = (-this.gravity / 2) * Math.pow(time, 2) + this.power * time;

            if (jumpHeight < 0) {
            Ticker.shared.remove(tick);
            this.y = jumpAt;
            return;
            }

            this.y = jumpAt - jumpHeight;
            time += deltaMs;
        }

        Ticker.shared.add(tick);
    }
    drawHead(){
        this.head = new Graphics();
        this.head.beginFill(0xffffff); //white
        this.head.drawRect(0, 0, 20, 20);
        this.head.endFill();
    }
    drawBody(){
        this.body = new Graphics();
        this.body.beginFill(this.color); //red
        this.body.drawRect(0, 20, 20, 40);
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