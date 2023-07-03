import { AnimatedSprite, Container, Sprite } from "pixi.js";
import { Bullet } from "./bullet";

export class Weapon extends Container{
    constructor(texture){
        super();
        this.weapon = new Sprite(texture);
        this.bullet = new Bullet(5, "white");
        this.weapon.anchor.set(0, 0.5);
        this.weapon.scale.set(1.2);
        // this.bullet.position.set(this.weapon.width, this.weapon.height / 4);
        this.addChild(this.weapon);
    }
}