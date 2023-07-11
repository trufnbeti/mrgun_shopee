import { Assets, Container, Graphics, Sprite, Ticker } from "pixi.js";
import { Weapon } from "../weapon/weapon";

export const EnemyEvent = Object.freeze({
    Collide: "enemy:collide"
})

export class Enemy extends Container{
    constructor(){
        super();
        // this.position.set(x, y);
        this.weapon = new Weapon(Assets.get('usp_s'));
        this._init();

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
    }
}