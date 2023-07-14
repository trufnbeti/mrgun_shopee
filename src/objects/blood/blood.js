import { Container, Graphics } from "pixi.js";
import { Util } from "../../helper/utils";
import { GameConstant } from "../../gameConstant";

export const BloodEvent = Object.freeze({
    Removed: "blood:removed",
})

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
        this.frictionForce = 0.02;  
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
                const blood = this.getBounds();
                const stepBound = step.getBounds();
                if(this.direction == -1 && blood.right > stepBound.right && blood.left <= stepBound.right||
                    this.direction == 1 && blood.left < stepBound.left && blood.right >= stepBound.left ) 
                    this.vectorX = 0;
                this.y -= this.vectorY;
                this.frictionForce = 0.04;
                this.vectorY = this.vectorYMin;
                return;
            }
        });
        this.vectorY += this.gravity;
    }

    _checkOnScreen(){
        const global =  this.getGlobalPosition();
        if(global.x < 0 || global.x > GameConstant.GAME_WIDTH || global.y > GameConstant.GAME_HEIGHT)
            this._onRemoved();
    }

    _onRemoved(){
        this.emit(BloodEvent.Removed);
        console.log("Im still here");
    }
    
    update(dt){
        this.y += this.vectorY;
        this._checkOnPlatform();
        this._checkOnScreen();
        if(this.vectorX < 0) return;
        else {
            
            this.x += this.direction *  this.vectorX *dt;
            this.vectorX -= this.frictionForce*dt;
        }
    }

    destroy(){
        super.destroy();
    }
}