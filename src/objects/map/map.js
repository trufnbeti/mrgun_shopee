import { Container, Graphics, Ticker } from "pixi.js";
import { Stair } from "./stair";
import { GameConstant } from "../../gameConstant";

export class Map extends Container{
    constructor(parent, app){
        super();
        this.parent = parent;
        this.app = app;
        this._init();
    }
    _init(){
        this.parent.addChild(this);
        this.sortableChildren = true;
        this.color = this.randomColor();
        this.stairs = [];
        this.genStairs();
        this.speed = 1;
    }
    update(delta){
        if(this.moveDistance > 0){
            this.y += this.speed * delta;
            this.moveDistance -= this.speed *delta;
        }
    }
    genStairs(){
        this.stairs.push(new Stair(this.x, this.y+ 400, 0, this, -1, 2))
        this.currentIndex = -1;
        for(let i = 1; i < 8; i++){
            this.genNewStair();
        }
    }
    genNewStair(){
        const previousStair = this.stairs[this.stairs.length - 1];
        const stepNumber = Math.floor(Math.random()*2 + 3);
        const dir = previousStair.direction == 1 ? -1 : 1;
        const y = previousStair.y - stepNumber* GameConstant.Step_Size;
        const z = previousStair.zIndex - 1;
        this.stairs.push(new Stair(this.x, y , z, this, dir, stepNumber))
    }
    nextStair() {
        const nextIndex = (this.currentIndex + 1) % this.stairs.length;
        
        this.currentIndex = nextIndex;

        this.genNewStair();
        this.moveDistance = this.stairs[this.currentIndex].stepNumber*25;
        if(this.currentIndex > 3){
            for(let i = this.currentIndex - 3; i < this.currentIndex+8; i++){
            const alpha = 0.3 + (i - this.currentIndex)/10;
            this.stairs[i].updateShade(alpha);
            }
            this.parent.removeChild(this.stairs[this.currentIndex-4])
            this.stairs[this.currentIndex-4].destroy();
        }
        return(this.stairs[this.currentIndex]);
    }
    convertToHex(colorValue) {
        const hex = colorValue.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }
    randomColor() {
        const red = Math.floor(Math.random() * 200) + 50 ;
        const green = Math.floor(Math.random() * 200) ;
        const blue = Math.floor(Math.random() * 150 + 100);

        const color = "#" + this.convertToHex(red) + this.convertToHex(green) + this.convertToHex(blue);
        
        return color;
    }
}