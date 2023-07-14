import { Graphics, Ticker } from "pixi.js"

export class HitEffect extends Graphics{
    constructor(enemy, radius){
        super();
        this.enemy = enemy;
        this.maxRadius = radius;
        this._init();
    }
    _init(){
        this.color = this.enemy.color;
        this.opacity = 0.1;
        this.beginFill(this.color, this.opacity);
        this.radius = 5;
        this.deltaRadius = (this.maxRadius - this.radius) / 10
        this.drawCircle(0, 0, this.radius);
        this.endFill();
        this.x = this.enemy.x;
        this.y = this.enemy.y;
    }
    update(dt){
        this.clear();
    
        if(this.opacity < 0) return;

        if (this.radius < this.maxRadius){

            this.radius += this.deltaRadius * dt;
            this.opacity -= 0.005 * dt;

            this.beginFill(this.color, this.opacity);
            this.drawCircle(0, 0, this.radius);
            this.endFill();
        }
    }
}