import { Container, Graphics } from "pixi.js";
import { Util } from "../../helper/utils";

export class Blood extends Container{
    constructor(enemy){
        super();
        this.enemy = enemy;
        this._initSprite();
    }
    _initSprite(){
        this.color = this.enemy.color;
        this.radius = Util.random(4, 6);
        this.sprite = new Graphics();
        this.sprite.beginFill(this.color)
        this.addChild(this.sprite);
        this.sprite.drawCircle(0,0, this.radius);

        this.x = this.enemy.x;
        this.y = this.enemy.y;
    }
    _initForce(force){
        this.direction = this.enemy.direction;
        this.vectorX = Util.random(0.5, force);
        this.frictionForce = 0.1;  
        this.gravity = 0.5;
        this.vectorYMin = 5;
        this.vectorY = Util.random(-this.vectorYMin, 0) - 2*this.vectorYMin;
    }
    
    _initPlatform(steps){
        this.steps = steps;
    }

    _checkOnPlatform(){
        this.steps.forEach( step => {
            if(Util.checkCollision(this, step)) {
                this.y -= this.vectorY;
                this.frictionForce = 0.2;
                this.vectorY = this.vectorYMin;
                return;
            }
        });
        this.vectorY += this.gravity;
    }
    
    update(dt){
        this.y += this.vectorY;
        this._checkOnPlatform();
        if(this.vectorX < 0) return;
        else {
            
            this.x += this.direction *  this.vectorX *dt;
            this.vectorX -= this.frictionForce*dt;
        }
    }
}