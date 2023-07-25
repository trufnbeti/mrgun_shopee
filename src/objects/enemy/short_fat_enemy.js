import { Graphics } from "pixi.js";
import { Enemy } from "./enemy";

export class ShortFatEnemy extends Enemy{
    constructor(x, y, direction, maxX, color){
        super();
        this._init(x, y, direction, maxX, color);
    }
    _init(x, y, direction, maxX, color){
        this.direction = direction;
        this.speed = this.direction * 2.5;
        this.maxX = maxX;
        this.color = color;
        this.drawHead();
        this.drawBody();
        this.addChild(this.head, this.body);
        this.position.set(x, y - (this.head.height + this.body.height) / 2);
        const centerX = this.body.width / 2;
        const centerY = (this.head.height + this.body.height) / 2;
        this.pivot.set(centerX, centerY);
        this.equipWeapon();
        this.isLeanRight = true;
        this.isLeanLeft = false;
        this.angleLean = 1;
        this.timer = 0;
        
    }
    move(dt){
        if (!this.deaded){
            if (this.direction == -1)
                if (this.x > this.maxX)
                    this.x += this.speed * dt;
                else
                    this.angle = 0;
            if (this.direction == 1)
                if (this.x < this.maxX)
                    this.x += this.speed * dt;
                else
                    this.angle = 0;
        }
        
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
    lean(){
        if (!this.deaded){
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
    }
    update(dt){
        super.update(dt);
        this.timer += dt;
        if (this.timer > 5){
            this.lean();
            this.timer = 0;
        }
        this.move(dt);
    }
}