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
    update(dt){
    }
}