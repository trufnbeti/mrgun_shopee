import { sound } from "@pixi/sound";
import { Container } from "pixi.js";
import { Util } from "../helper/utils";
import { GameConstant } from "../gameConstant";
import { GameState } from "../scenes/playScene";
import { Blood } from "../objects/blood/blood";
import { HitEffect } from "../objects/enemy/hitEffect";

export class BulletManager extends Container {
    constructor(player, map , enemyManager, playScene){
        super();
        this.player = player;
        this.map = map;
        this.enemyManager = enemyManager;
        this.playScene = playScene;
        this.bloods = [];
        this.explodes = [];
    }
    _checkBullets(dt){
        let bullets = this.player.gun.bullets;
        let bulletsToRemove = [];
        const steps = this.map.stairs[this.map.currentIndex + 1].stairSprites; // xét các bậc của cầu thang ngay trước mặt
        this.enemyManager.enemy.isShooted = false;
        bullets.forEach(bullet => {
            bullet.update(dt);
            const bound = bullet.getBounds();
            if( (Util.checkCollision(bullet, this.enemyManager.enemy.head) || Util.checkCollision(bullet, this.enemyManager.enemy.body)) && !this.enemyManager.enemy.isShooted ){ // kiểm tra va chạm giữa đạn và địch
                
                let explode;
                
                if(Util.checkCollision(bullet, this.enemyManager.enemy.head)){
                    explode = new HitEffect(this.enemyManager.enemy, 70);
                    this.player.score += 50;
                    sound.play("headshotSound");
                } 
                else{
                    explode = new HitEffect(this.enemyManager.enemy, 40);
                    this.player.score += 25;
                    sound.play("hitSound");
                }
                this.playScene.playUI.updateScore(this.player.score);
                
                this.map.addChild(explode);
                this.explodes.push(explode);
                //==========
                bulletsToRemove.push(bullet);
                
                for(let i = 0; i < bullet.damage*2; i++){
                    const blood = new Blood(this.enemyManager.enemy);
                    this.map.addChild(blood);
                    blood._initForce(bullet.damage* 3);
                    blood._initPlatform(steps);
                    this.bloods.push(blood)
                }


                if(!this.enemyManager.enemy.isShooted){
                    if (this.enemyManager.enemy.name === "Normal"){
                        this.enemyManager.enemy.deaded = true;
                        this.enemyManager.enemy.isReady = false;
                    }
                    
                    else{
                        this.enemyManager._onHit();
                    }
                    // console.log(this.enemy.name == "Normal");

                }
                else this.enemyManager.enemy.takeDmg(this.player.gun.damage)
                
            }
            else {
                steps.forEach(step => { // kiểm tra va trạm giữa đạn và cầu thang
                if(Util.checkCollision(step, bullet)){
                    bulletsToRemove.push(bullet)
                    sound.play("hitWallSound");
                }
                })
            }
            if(bound.x < 0 || bound.x > GameConstant.GAME_WIDTH) bulletsToRemove.push(bullet)
        });
        bulletsToRemove.forEach(bullet => { // loại bỏ các viên đạn va chạm đã được đánh dấu
            const index = bullets.indexOf(bullet);
            if (index > -1) {
                bullets.splice(index, 1);
            }
            bullet.destroy();
        });
        
        // enemy bullet
        if(this.enemyManager.enemy.weapon.isShot){
            let eBullet = this.enemyManager.enemy.weapon.bullet;
            if(!eBullet.destroyed){
                eBullet.update(dt)
                if(Util.checkCollision(eBullet, this.player.sprite)){
                    sound.play("hitSound");
                    this.player.hp -= 1;
                    eBullet.destroy();
                    
                    this.enemyManager.enemy.reCooldown();
                    this.enemyManager.enemy.weapon.restart();

                    this.player.gun.isShot = false;
                    this.playScene.playUI.updatePlayerHp();
                    if(this.player.hp == 0){
                        this.map.removeChild(this.player);
                        this.playScene.state = GameState.GameOver;
                        this.playScene.gameOverUI.show(); 
                    }
                    
                    
                }
            }
            
        }
    }
    _checkEnemy(){

    }
    _checkWall(){

    }
    update(dt){
        this._checkBullets(dt);
        //enemy ngã xuống thì spawn thằng mới
        if (this.enemyManager.enemy.name === "Normal")
            if (this.enemyManager.enemy.y > GameConstant.GAME_HEIGHT)
                this.enemyManager._onHit();
        //===========

        this.explodes.forEach(explode => {
            explode.update(dt);
        });

        this.bloods.forEach(blood => {
            blood.update(dt);
        });
    }
}