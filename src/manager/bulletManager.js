import { sound } from "@pixi/sound";
import { Container } from "pixi.js";
import { Util } from "../helper/utils";
import { GameConstant } from "../gameConstant";
import { GameState } from "../scenes/playScene";
import { Blood, BloodEvent } from "../objects/blood/blood";
import { HitEffect } from "../objects/enemy/hitEffect";
import { HeadshotEffect } from "../objects/effect/headshotEffect";
import { EffectManager } from "./effectManager";

export const BulletManagerEvent = Object.freeze({
    HitEnemyBody: "hit:enemybody",
    HitEnemyHead: "hit:enemyhead",
    HitPlayer: 'hit:player'
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

        this.effectManager = new EffectManager(map, player, enemyManager);
        this.addChild(this.effectManager);

        this.level = localStorage.getItem("level");
        if(!this.level){
            localStorage.setItem("level", 1);
            this.level = 1;
        } 
    }

    _checkBullets(dt){
        let bullets = this.player.gun.bullets;
        const steps = this.map.stairs[this.map.currentIndex + 1].stairSprites; // xét các bậc của cầu thang ngay trước mặt
        let bonus = 1;
        let hit = false;
        bullets.forEach(bullet => {
            bullet.update(dt);
            if(!bullet.isDestroyed && (Util.checkCollision(bullet, this.enemyManager.enemy.head) || Util.checkCollision(bullet, this.enemyManager.enemy.body)) ){ // kiểm tra va chạm giữa đạn và địch                
                hit = true;
                if(Util.checkCollision(bullet, this.enemyManager.enemy.head)){ 
                    if(!this.enemyManager.enemy.isShooted){

                        this.player.score += parseInt(this.level)*2;

                        this.effectManager.updateHeadshotCount();
    
                        this.playScene.playUI.updateMoney();
                    }
                    this.effectManager._onHitEnemyHead();

                    bonus = 2;
                } 
                else{
                    if(!this.enemyManager.enemy.isShooted){
                        this.player.score += parseInt(this.level);
                        this.effectManager.resetHeadshotCount();
                    }
                    this.effectManager._onHitEnemyBody();
                }
                this.playScene.playUI.updateScore(this.player.score);
                
                this.updateBloods(this.enemyManager.enemy, bullet);
                
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

        if(hit){
            if(!this.playScene.end && !this.player.isMoving) this.player.calPath(this.map.nextStair());

            if(this.playScene.state == GameState.BossFight){
                if(this.enemyManager.enemy.hp <= 0) this.enemyManager._onEnd();
                this.enemyManager.BossMove();
            }   
        }

        // enemy bullet
        if(this.enemyManager.enemy.weapon.isShot){
            let eBullet = this.enemyManager.enemy.weapon.bullet;
            if(!eBullet.destroyed){
                eBullet.update(dt)
                if(Util.checkCollision(eBullet, this.player.sprite)){
                    this.player.hp -= 1;

                    eBullet._onDestroyed();
                    
                    this.enemyManager.enemy.reCooldown();

                    this.effectManager._onHitPlayer();

                    this.player.gun.isShot = false;
                    this.playScene.playUI.updatePlayerHp();
                    if(this.player.hp == 0){
                        this.map.removeChild(this.player);
                        this.playScene.state = GameState.GameOver;
                        this.playScene.gameOverUI.show(); 
                    }
                    this.updateBloods(this.player, eBullet)       
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

    updateBloods(enemy, bullet){
        for(let i = (this.currentBloodIndex) * this.bloodNumber; i < (this.currentBloodIndex + 1) * this.bloodNumber; i++){
            this.bloods[i]._initEnemy(enemy);
            this.bloods[i]._initForce(bullet.damage* 2);
            let index = this.map.currentIndex;
            if(enemy == this.enemyManager.enemy) index ++;
            if(index < 0) index = 0;
            this.bloods[i]._initPlatform(this.map.stairs[index].stairSprites);
        }
        this.currentBloodIndex = (this.currentBloodIndex + 1) % 6;
    }

    update(dt){
        if(this.player.gun.isShot)this._checkBullets(dt);
        //enemy ngã xuống thì spawn thằng mới
        if (this.enemyManager.enemy.name === "Normal")
            if (this.enemyManager.enemy.y > GameConstant.GAME_HEIGHT)
                this.enemyManager._onHit();
        //===========

        this.effectManager.update(dt);

        this.bloods.forEach(blood => {
            blood && blood.update(dt);
        });
    }
}