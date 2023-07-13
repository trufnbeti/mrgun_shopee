import { Graphics, Ticker } from "pixi.js"

export class HitEffect extends Graphics{
    constructor(enemy, radius){
        super();
        this.enemy = enemy;
        this.radius = radius;
        this._init();
    }
    _init(){
        this.color = this.enemy.color;
        this.opacity = 0.5;
        this.beginFill(this.color, this.opacity);
        this.drawCircle(0, 0, this.radius);
        this.endFill();
        this.x = this.enemy.x;
        this.y = this.enemy.y;
    }
    update(dt){
        this.radius += 5 * dt;
        this.opacity -= 0.05 * dt;
        this.clear();
        if (this.radius < 50){
            this.beginFill(this.color, this.opacity);
            this.drawCircle(0, 0, this.radius);
            this.endFill();
        }
    }
}