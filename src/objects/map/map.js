import { Container, Graphics, Ticker } from "pixi.js";
import { Stair } from "./stair";
import { GameConstant } from "../../gameConstant";

export class Map extends Container{
    constructor(app){
        super();
        this.app = app;
        this._init();
    }
    _init(){
        this.sortableChildren = true;
        this.color = this.randomColor();
        this.stairs = [];
        this.genStairs();
        this.speed = 2;
    }
    update(delta){
        if(this.moveDistance > 0){
            this.y += this.speed * delta;
            this.moveDistance -= this.speed *delta;
        }
    }
    genStairs(){
        this.stairs.push(new Stair(this.x, this.y+ GameConstant.GAME_HEIGHT*0.6, 0, this, -1, 2))
        this.currentIndex = -1;
        for(let i = 1; i < 15; i++){
            this.genNewStair();
        }
    }
    genNewStair(){
        const previousStair = this.stairs[this.stairs.length - 1];
        const stepNumber = Math.floor(Math.random()*4 + 3);
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
            this.removeChild(this.stairs[this.currentIndex-4])
            this.stairs[this.currentIndex-4].destroy();
        }
        return(this.stairs[this.currentIndex]);
    }
    randomColor() {
        let red, green, blue;
      
        const randomNumber = Math.floor(Math.random() * 3);
        const max = 200;
        const ranMax = 150;
        const ranMin = 30;
      
        switch (randomNumber) {
            case 0:
                red = Math.floor(Math.random() * ranMin);
                green = max;
                blue = Math.floor(Math.random() * ranMax);
                break;
            case 1:
                red = max;
                green = Math.floor(Math.random() * ranMin);;
                blue = Math.floor(Math.random() * ranMax);
                break;
            case 2:
                red = Math.floor(Math.random() * ranMax);
                green = Math.floor(Math.random() * ranMin);;
                blue = max;
                break;
        }
      
        return `rgb(${red}, ${green}, ${blue})`;
      }
}