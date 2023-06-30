import { Container, Graphics, Sprite } from "pixi.js";

export class Enemy extends Container{
    constructor(x, y, speed){
        super();
        this.position.set(x, y);
        this.speed = speed;
        this.drawHead();
        this.drawBody();
        this.addChild(this.head, this.body);
    }
    drawHead(){
        this.head = new Graphics();
        this.head.beginFill(0xffffff); //white
        this.head.drawRect(0, 0, 40, 30);
        this.head.endFill();
    }
    drawBody(){
        this.body = new Graphics();
        this.body.beginFill(0xFF0000); //red
        this.body.drawRect(5, 30, 30, 40);
        this.body.endFill();
    }
    // equipWeapon(weapon){
    //     this.weapon = weapon;
    //     this.weapon.x = this.width / 2;
    //     this.weapon.y = this.height / 2;
    //     console.log(this.weapon.position);
    //     this.addChild(this.weapon);
    // }
    update(){

    }
}