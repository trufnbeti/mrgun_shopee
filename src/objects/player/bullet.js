import { Assets, Container, Graphics, Ticker } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { sound } from "@pixi/sound";

export const BulletEvent = Object.freeze({
    Shoot: "shoot",
    Destroyed: "destroyed"
})
export class Bullet extends Container{
    constructor(){
        super();
        this.graphics = new Graphics();
        this.addChild(this.graphics);
        this.on(BulletEvent.Shoot, this.show);
        this.on(BulletEvent.Destroyed, this.hide);
    }
    _init(){
        this.direction = this.parent.direction // hướng bắn
        this.beta = this.direction == -1 ? this.parent.currentAnlge : Math.PI - this.parent.currentAnlge // góc lệch của đạn
        this.speed = this.parent.bulletSpeed; // tốc độ bay
        this.deviation = this.parent.deviation; // độ lệch của đạn 
        this.damage = this.parent.damage;

        const randomValue = Math.random() * (2 * this.deviation) - this.deviation;
        this.type = this.parent.type; // kiểu bắn

        this.x =  this.direction*this.parent.sprite.width/4*Math.cos(this.beta*Math.PI/180);
        this.y =  this.direction*this.parent.sprite.width/4*Math.sin(this.beta*Math.PI/180);

       switch (this.type) {
            case "rapid":
                const pistolSound = sound.find("pistolSound");
                pistolSound.volume = 0.1;
                pistolSound.play();
                this.x -= randomValue * Math.cos(this.beta * Math.PI / 180);
                this.y -= randomValue * Math.sin(this.beta * Math.PI / 180);
                this.beta += randomValue / 5;
                break;
            case "singer":
                const revolerSound = sound.find("revolerSound");
                // revolerSound.volume = 0.1;
                revolerSound.play();
                this.x -= randomValue * Math.cos(this.beta * Math.PI / 180);
                this.y -= randomValue * Math.sin(this.beta * Math.PI / 180);
                this.beta += randomValue / 5;
                break;
            case "shotgun":
                const shotgunSound = sound.find("shotgunSound");
                shotgunSound.volume = 0.1;
                shotgunSound.play();
                this.beta += randomValue;
                break;
            case "sniper":
                sound.play("sniperSound");
                sound.play("reloadSound");
                break;
            default:
                break;
        }
        this._onShoot();
        this.drawBullet();
    }
    update(dt){
        if(this.isDestroyed){
            return;
        }
        const realspeed = this.speed* this.direction;
        this.x += realspeed*Math.cos(this.beta*Math.PI/180) * dt;
        this.y += realspeed * Math.sin(this.beta*Math.PI/180) * dt;
    }
    drawBullet(){
        this.graphics.clear();
        this.graphics.beginFill(0xFFFFFF)
        this.graphics.drawCircle(0, 0, this.parent.bulletRadius);
    }

    destroy(){
        super.destroy();
    }

    _onShoot(){
        this.emit(BulletEvent.Shoot);
    }

    _onDestroyed(){
        this.emit(BulletEvent.Destroyed);

    }

    hide(){
        this.visible = false;
        this.isDestroyed = true;
        this.x = 0;
        this.y = 0;
    }
    show(){
        this.visible = true;
        this.isDestroyed = false;
    }
}