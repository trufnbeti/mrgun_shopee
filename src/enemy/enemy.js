import { Assets, Container, Graphics, Sprite, Ticker } from "pixi.js";
import { Weapon } from "../weapon/weapon";

export const EnemyEvent = Object.freeze({
    Collide: "enemy:collide"
})

export class Enemy extends Container{
    constructor(){
        super();
        this.name = "Normal";
        // this.position.set(x, y);
        this.weapon = new Weapon(Assets.get('usp_s'));
        this._init();
        this.velocity = {
            x: 0,
            y: 0
        };
        this.deaded = false;
        this.isDead = false;
        this.jumpHeight = 15;
        this.gravity = 0.98;
        this.deadAngle = 20;
        this.timeRotateDead = 0;

    }
    _init(){
        this.cooldown = 50;
        this.isShot = false;
        this.isReady = false;
        this.isShooted = false;
    }
    equipWeapon(){
        if (this.direction == -1) //weapon ben trai
            this.weapon.sprite.scale.x *= -1;
            
    
        this.weapon.x = this.width / 2;
        this.weapon.y = this.height / 2;
        
        this.addChild(this.weapon);
    }
    update(dt){
        if(this.cooldown > 0) {
            if(this.isReady) this.cooldown -= dt;
        }
        else{
            this.weapon.update(dt);
        }
        if (this.deaded){
            this.dead(dt);
        }
    }
    dead(dt){
        this.timeRotateDead += dt;
        if (this.timeRotateDead > 1.5){
            this.angle += this.deadAngle;
            this.timeRotateDead = 0;
        }
        this.y += this.velocity.y;
        this.velocity.y += this.gravity;
        
        if (this.isDead)    return;
        this.isDead = true;
        this.velocity.y = -this.jumpHeight;
    }

    reCooldown(){
        this.isReady = false;
        this.cooldown = 50;
    }

}