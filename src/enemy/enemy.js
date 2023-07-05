import { Assets, Container, Graphics, Sprite, Ticker } from "pixi.js";
import { Weapon } from "../weapon/weapon";

export class Enemy extends Container{
    constructor(){
        super();
        // this.position.set(x, y);
        this.weapon = new Weapon(Assets.get('usp_s'));
        this._init();

    }
    _init(){
        this.cooldown = 200;
        this.isShot = false;
    }
    equipWeapon(){
        if (this.direction == -1) //weapon ben trai
            this.weapon.weapon.scale.x *= -1;
            
    
        this.weapon.x = this.width / 2;
        this.weapon.y = this.height / 2;
        
        this.addChild(this.weapon);
    }
    update(dt){
        if(this.cooldown > 0)this.cooldown -= dt;
    }
    attack(player){
        if(!this.isShot){
            console.log("hit");
            this.isShot  = true;
        }
        
    }
}