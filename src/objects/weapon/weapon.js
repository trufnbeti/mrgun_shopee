import { AnimatedSprite, Container, Sprite } from "pixi.js";
import GunData from "../../../assets/json/data.json"
import { Bullet } from "../player/bullet";


export class Weapon extends Container{
    constructor(texture){
        super();
        this.sprite = new Sprite(texture);
        this.sprite.anchor.set(0, 0.5);
        this.sprite.scale.set(1.2);
        this.addChild(this.sprite);
        this.runAngle = 0;
        this.isShot = false;
        this.speed = 1.2;
    }
    update(dt){
            if(this.runAngle < this.currentAnlge*1.4) {
                this.runAngle += this.speed * dt;
                this.sprite.angle += this.speed*this.direction*dt;
                
            }
                
            else { 
                this.currentAnlge *= -1;
                this.shoot();
                this.isShot  = true;
            } 
    }
    attack(player){
        const playerPosition = player.getGlobalPosition();
        this.currentAnlge = this.calculateAngle(playerPosition.x, playerPosition.y+10);
        this.direction = player.direction == 1 ? -1 : 1;
    }

    calculateAngle(x, y){
        const globalPosition = this.getGlobalPosition();
        const dx = Math.abs(x - globalPosition.x);
        const dy = Math.abs(y - globalPosition.y);
        const angleRadians = Math.atan2(dy, dx);
        const angleDegrees = angleRadians * (180 / Math.PI);
        return angleDegrees;
    }

    restart(){
        this.isShot = false;
        this.sprite.angle = 0;
        this.runAngle = 0;
        this.speed = 1.2;
    }

    shoot(){
        if(!this.isShot){

            const gunData = GunData['USP-S'];
            this.type = gunData.type;
            this.radius = gunData.radius;
            this.speed = gunData.speed;
            this.damage = gunData.damage;
            this.bulletRadius = gunData.bulletRadius;
            this.bulletNumber = gunData.bulletNumber;
            this.bulletSpeed = gunData.bulletSpeed
            this.deviation = 0;

            this.bullet = new Bullet(this)
        }
    }
}