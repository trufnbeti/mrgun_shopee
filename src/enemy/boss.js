import { Assets, Container, Graphics, Sprite, Ticker } from "pixi.js";
import { Enemy } from "./enemy";
import { Weapon } from "../weapon/weapon";

export class Boss extends Enemy{
    constructor(x, y, direction, maxX){
        super();
        this.direction = direction;
        this.speed = this.direction * 4.5;
        this.maxX = maxX;
        this.hp = 50;
        // this._init();
        this.weapon =new Weapon(Assets.get('usp_s'))
        this.position.set(x, y - this.height / 2);
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        this.pivot.set(centerX, centerY);
        this.equipWeapon();
        this.scale.x *= this.direction;
        this.isJumping = false;
        this.gravity = 0.98;
        this.power = 20;
        this.timer = 0;
        this.angleRotation = 20;
    }
    _init(){
        super._init();
        let indexR = Math.floor(Math.random() * 22) + 1;
        console.log(indexR);
        this.head = new Container();
        this.body = new Container();
        let head = new Sprite(Assets.get('boss_head_' + indexR));
        let body = new Sprite(Assets.get('boss_body_' + indexR));
        head.scale.set(0.25);
        body.scale.set(0.25);
        this.head.addChild(head);
        this.body.y = this.head.height;
        this.body.addChild(body);
        this.head.x = this.body.width / 2 - this.head.width / 2;
        this.addChild(this.head, this.body);
    }
    takeDmg(amout){
        this.hp -= amout;
        if (this.hp <= 0 )
            this.destroy();
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
    rotate(){
        this.angle += this.angleRotation;
    }
    equipWeapon(){            
    
        this.weapon.x = this.width / 2;
        this.weapon.y = this.height / 2;
        
        this.addChild(this.weapon);
    }
    update(dt){
        super.update(dt);
        this.timer += dt;
        if (this.timer > 1){
            this.rotate();
            this.timer = 0;
        }
        this.move();
    }
}