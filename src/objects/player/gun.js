import { Assets, Container, Graphics, Sprite, Ticker } from "pixi.js";
import { Bullet } from "./bullet";
import GunData from "../../../assets/json/data.json"
import TWEEN, { Tween } from "@tweenjs/tween.js"
import { ShootingEffect } from "./shootingEffect";

export class Gun extends Container{
    constructor(parent, name){
        super();
        this.parent = parent;
        this.y = 30;
        this.name = name;
        this.dt = 0;
        this._init();
    }
    _init(){
        this.sortableChildren = true;
        this._initSprite();
        this._initData();
        this._initEffect();
        this._initBullet();

        this.currentAnlge = 0;
        this.maxAngle = 45;
        this.isIncresing = true;
        this.isShot = false;
        this.isShooting = false;

    }

    _initSprite(){
        this.sprite = Sprite.from(Assets.get(this.name));
        this.sprite.scale.x *= this.parent.direction;
        this.x = 10*this.parent.direction;
        this.addChild(this.sprite);
        this.sprite.anchor.set(0.5);
        this.sprite.zIndex = 2;

        this.graphics = new Graphics();
        this.addChild(this.graphics);
        this.parent.addChild(this);
    }

    _initData(){
        const gunData = GunData[this.name]

        this.type = gunData.type;
        this.radius = gunData.radius;
        this.speed = gunData.speed;
        this.damage = gunData.damage;
        this.bulletRadius = gunData.bulletRadius;
        this.bulletNumber = gunData.bulletNumber;
        this.bulletSpeed = gunData.bulletSpeed
        this.deviation = gunData.deviation;
    }

    _initEffect(){
        this.shootingEffect = new ShootingEffect();
        this.addChild(this.shootingEffect);
    }

    _initBullet(){
        this.bullets = [];
        for(let i = 0; i < this.bulletNumber; i++){
            let bullet = new Bullet();
            this.addChild(bullet);
            this.bullets.push(bullet);
        }
    }

    update(dt){
        this.flip();
        this.x = 10*this.parent.direction;
        this.graphics.clear();
        if(!this.isShooting) this.drawAimBar(dt);
        this.dt += Ticker.shared.deltaMS;
        this.sprite.angle = this.parent.direction == -1 ? this.currentAnlge : -this.currentAnlge
        this.direction = this.parent.direction
        TWEEN.update(this.dt * 1000);
    }
    runAngle(dt){
        if(this.isIncresing){
            
            if(this.currentAnlge  < this.maxAngle){
                this.currentAnlge += this.speed * dt;
            }
            else this.isIncresing = false;
        }
        else {
            if(this.currentAnlge  > 0){
                this.currentAnlge -= this.speed * dt;
                this.currentAnlge = this.currentAnlge < 0 ? 0 : this.currentAnlge
            }
            else this.isIncresing = true;
        }
    }
    drawAimBar(dt){
        this.runAngle(dt);
        this.graphics.clear();
        if(this.parent.isMoving || this.isShot){
            this.isIncresing = false;
        } 
        else this.drawCircularSector(this.currentAnlge);
    }
    drawCircularSector(angle) {
        let startAngle = Math.PI; 
        let endAngle = (Math.PI + angle * (Math.PI / 180));
        
        if(this.parent.direction == 1){
            startAngle = 2*Math.PI - angle * (Math.PI / 180); 
            endAngle = 2*Math.PI;
        }
        
        this.graphics.beginFill(0xFFFFFF, 0.15);
        this.graphics.arc(0, 0, this.radius, startAngle, endAngle, false);
        this.graphics.lineTo(0, 0);
        this.graphics.closePath();
        
        this.graphics.beginFill(0xFFFFFF, 0.6);
        const beta = angle * Math.PI / 180 - Math.PI/2;
        this.graphics.lineStyle(1, 0xFFFFFF);
        const dotX = -this.parent.direction*this.radius* Math.sin(beta);
        const dotY = -this.radius* Math.cos(beta)
        this.graphics.lineTo(dotX, dotY);
        this.graphics.endFill(); // Thêm dòng này để kết thúc việc vẽ và điền màu
      }
    flip(){
        this.sprite.scale.x = this.parent.direction == 1 ? 1 : -1;
    }
    shoot(dt){
        if(this.type == "rapid"){
            let index = 0;
            new TWEEN.Tween({t: 0}).to({t: 1}, 100*1000*Math.abs(1-dt)).repeat(this.bulletNumber).onRepeat(()=> {
                this.isShooting = true; 
                this.shootingEffect.play();
                this.bullets[index]._init();
                index++;
            }).start(this.dt * 1000)
            .onComplete(() => {
                this.isShooting = false;
            });
        }
        else for(let i = 0; i < this.bulletNumber; i++) this.bullets[i]._init(); 
        this.isShot = true;
        this._onShootAnimation();
    }

    _onShootAnimation(){
        const moveTween = new TWEEN.Tween(this.sprite).to({ x: this.sprite.x - this.direction * this.damage * 5 }, 50* 1000);
        const returnTween = new TWEEN.Tween(this.sprite).to({ x: 0}, 50* 1000);

        // moveTween.chain(returnTween);
        moveTween.onStart(() => this.isShooting = true)
        .start(this.dt * 1000)
        .onComplete(() => {
            returnTween.onComplete(() => this.isShooting = false).start(this.dt * 1000);
        })

        this.shootingEffect.play();
    }
}