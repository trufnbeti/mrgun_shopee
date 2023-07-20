import { Assets, Container, Graphics, Sprite, Ticker } from "pixi.js";
import { Weapon } from "../weapon/weapon";

export const EnemyEvent = Object.freeze({
    Collide: "enemy:collide"
})

export class Enemy extends Container{
    constructor(){
        super();
        this.name = "Normal";
        this.weapon = new Weapon(Assets.get('usp_s'));

        this.cooldown = 50;
        this.isShot = false;
        this.isReady = false;
        this.isShooted = false;

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
    // _init(){
    //     this.name = "Normal";
    //     this.weapon = new Weapon(Assets.get('usp_s'));

    //     this.cooldown = 50;
    //     this.isShot = false;
    //     this.isReady = false;
    //     this.isShooted = false;

    //     this.velocity = {
    //         x: 0,
    //         y: 0
    //     };
    //     this.deaded = false;
    //     this.isDead = false;
    //     this.jumpHeight = 15;
    //     this.gravity = 0.98;
    //     this.deadAngle = 20;
    //     this.timeRotateDead = 0;
    // }
    equipWeapon(){
        this.weapon.sprite.scale.x = this.direction;
        this.weapon.restart();
        this.reCooldown();
    
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
        this.angle = 0;
        this.deaded = false;
        this.velocity.y = 0;
        this.timeRotateDead = 0;
        this.isDead = false;
    }

}