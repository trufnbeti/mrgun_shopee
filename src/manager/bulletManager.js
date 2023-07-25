import { sound } from "@pixi/sound";
import { Container } from "pixi.js";
import { Util } from "../helper/utils";
import { GameConstant } from "../gameConstant";
import { GameState } from "../scenes/playScene";
import { Blood, BloodEvent } from "../objects/blood/blood";
import { HitEffect } from "../objects/enemy/hitEffect";
import { HeadshotEffect } from "../objects/effect/headshotEffect";

export const ManagerEvent = Object.freeze({
    Removed: "manager:remove",
})

export class BulletManager extends Container {
    constructor(player, map , enemyManager, playScene){
        super();
        this.player = player;
        this.map = map;
        this.enemyManager = enemyManager;
        this.playScene = playScene;

        this.bloods = [];
        this.bloodNumber = this.player.gun.damage*3;
        this.currentBloodIndex = 0;
        for(let i = 0; i < 6; i++){
            this._spawnBloods();
        }
        this._initEffect();
    }
    _initEffect(){
        this.hitBodyEffect = new HitEffect(this.enemyManager.enemy, 40);
        this.hitBodyEffect._initText(this.player.gun.damage);
        this.map.addChild(this.hitBodyEffect);
        this.hitHeadEffect = new HitEffect(this.enemyManager.enemy, 70);
        this.hitHeadEffect._initText(this.player.gun.damage*2);
        this.map.addChild(this.hitHeadEffect);

        this.headshotEffect = new HeadshotEffect();
        this.addChild(this.headshotEffect);
    }
    _checkBullets(dt){
        let bullets = this.player.gun.bullets;
        const steps = this.map.stairs[this.map.currentIndex + 1].stairSprites; // xét các bậc của cầu thang ngay trước mặt
        let bonus = 1;
        bullets.forEach(bullet => {
            bullet.update(dt);
            if(!bullet.isDestroyed && (Util.checkCollision(bullet, this.enemyManager.enemy.head) || Util.checkCollision(bullet, this.enemyManager.enemy.body)) ){ // kiểm tra va chạm giữa đạn và địch                
                if(Util.checkCollision(bullet, this.enemyManager.enemy.head)){ 
                    if(!this.enemyManager.enemy.isShooted){

                        this.hitHeadEffect._initEnemy(this.enemyManager.enemy);
                        
                        this.player.score += 50;

                        this.headshotEffect.updateText();
                        this.headshotEffect.count ++;
    
                        this.playScene.playUI.updateMoney();
                    }
                    this.hitHeadEffect.playOnce();

                    this.headshotEffect._onHeadshot();

                    bonus = 2;
                    sound.play("hitSound");
                    sound.play("headshotSound");
                } 
                else{
                    this.hitBodyEffect._initEnemy(this.enemyManager.enemy);
                    this.hitBodyEffect.playOnce();

                    this.headshotEffect.count = 0;
                    this.headshotEffect.updateText();

                    this.player.score += 25;
                    sound.play("hitSound");
                }
                this.playScene.playUI.updateScore(this.player.score);
                
                //cập nhật thông tin cho những giọt máu đang xét
                for(let i = (this.currentBloodIndex) * this.bloodNumber; i < (this.currentBloodIndex + 1) * this.bloodNumber; i++){
                    this.bloods[i]._initEnemy(this.enemyManager.enemy);
                    this.bloods[i]._initForce(bullet.damage* 2);
                    this.bloods[i]._initPlatform(steps);
                }
                this.currentBloodIndex = (this.currentBloodIndex + 1) % 6;
                //==============
                
                if (this.enemyManager.enemy.name === "Normal"){
                    this.enemyManager.enemy.deaded = true;
                    this.enemyManager.enemy.isReady = false;
                }
                
                else{
                    this.enemyManager._onHit(bonus);
                }

                bullet._onDestroyed();
            }
            else {
                steps.forEach(step => { // kiểm tra va trạm giữa đạn và cầu thang
                if(!bullet.isDestroyed && Util.checkCollision(step, bullet)){
                    bullet._onDestroyed();
                    sound.play("hitWallSound");
                }
                })
            }
        });

        // enemy bullet
        if(this.enemyManager.enemy.weapon.isShot){
            let eBullet = this.enemyManager.enemy.weapon.bullet;
            if(!eBullet.destroyed){
                eBullet.update(dt)
                if(Util.checkCollision(eBullet, this.player.sprite)){
                    sound.play("hitSound");
                    this.player.hp -= 1;

                    eBullet._onDestroyed();
                    
                    this.enemyManager.enemy.reCooldown();

                    this.player.gun.isShot = false;
                    this.playScene.playUI.updatePlayerHp();
                    if(this.player.hp == 0){
                        this.map.removeChild(this.player);
                        this.playScene.state = GameState.GameOver;
                        this.playScene.gameOverUI.show(); 
                    }
                    
                    this.hitHeadEffect._initEnemy(this.player);
                    this.hitHeadEffect.playOnce();
                    for(let i = (this.currentBloodIndex) * this.bloodNumber; i < (this.currentBloodIndex + 1) * this.bloodNumber; i++){
                        this.bloods[i]._initEnemy(this.player);
                        this.bloods[i]._initForce(eBullet.damage* 2);
                        let index = this.map.currentIndex;
                        if(index < 0) index = 0;
                        this.bloods[i]._initPlatform(this.map.stairs[index].stairSprites);
                    }
                    this.currentBloodIndex = (this.currentBloodIndex + 1) % 6;
                    
                }
            }
            
        }
    }
    
    _spawnBloods(){
        for(let i = 0; i < this.bloodNumber; i++){
            const blood = new Blood();
            blood._initPlatform([]);
            this.map.addChild(blood);
            this.bloods.push(blood)
        }
    }

    removeBlood(blood){
        let index = this.bloods.indexOf(blood);
        if (index >= 0) {
            this.bloods.splice(index, 1);
            this.map.removeChild(blood);
            this.emit(ManagerEvent.Removed, blood);
            blood.destroy();
        }
    }

    update(dt){
        this._checkBullets(dt);
        //enemy ngã xuống thì spawn thằng mới
        if (this.enemyManager.enemy.name === "Normal")
            if (this.enemyManager.enemy.y > GameConstant.GAME_HEIGHT)
                this.enemyManager._onHit();
        //===========

        this.hitBodyEffect.update(dt);
        this.hitHeadEffect.update(dt);
        this.headshotEffect.update(dt);

        this.bloods.forEach(blood => {
            blood && blood.update(dt);
        });
    }
}