import { Graphics, Ticker } from "pixi.js";
import { Enemy } from "./enemy";


export class TallEnemy extends Enemy{
    constructor(x, y, direction, maxX, color){
        super(x, y);
        this.head = new Graphics();
        this.body = new Graphics();
        this.addChild(this.head, this.body);
        this._init(x, y, direction, maxX, color);
    }
    _init(x, y, direction, maxX, color){
        this.direction = direction;
        this.speed = this.direction * 13;
        this.color = color;
        this.maxX = maxX;
        this.drawHead();
        this.drawBody();
        this.position.set(x, y - (this.head.height + this.body.height) / 2);
        const centerX = this.body.width / 2;
        const centerY = (this.head.height + this.body.height) / 2;
        this.pivot.set(centerX, centerY);
        this.equipWeapon();
        this.isJumping = false;
        this.gravity = 0.98;
        this.power = 8;
    }
    move(dt){
        if (this.direction == -1)
            if (this.x > this.maxX)
                this.x += this.speed * dt;
        if (this.direction == 1)
            if (this.x < this.maxX)
                this.x += this.speed * dt;
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
        this.head.beginFill(0xffffff); //white
        this.head.drawRect(0, 0, 20, 20);
        this.head.endFill();
    }
    drawBody(){
        this.body.beginFill(this.color); //red
        this.body.drawRect(0, 20, 20, 40);
        this.body.endFill();
    }
    
    update(dt){
        super.update(dt);
        this.move(dt);
    }
}