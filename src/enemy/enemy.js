import { Assets, Container, Graphics, Sprite, Ticker } from "pixi.js";
import { Weapon } from "../weapon/weapon";

export class Enemy extends Container{
    constructor(){
        super();
        // this.position.set(x, y);
        this.weapon = new Weapon(Assets.get('usp_s'));
        this.ticker = Ticker.shared;
        this.ticker.add(this.update, this);
    }
    equipWeapon(){
        if (this.direction == -1) //weapon ben trai
            this.weapon.weapon.scale.x *= -1;
            
    
        this.weapon.x = this.width / 2;
        this.weapon.y = this.height / 2;
        
        this.addChild(this.weapon);
    }
    update(dt){
    }
    attack(player){
        console.log("Bắn chetme thằng player");
        
    }
}