import { sound } from "@pixi/sound";
import { Container } from "pixi.js";
import { Util } from "../helper/utils";
import { GameConstant } from "../gameConstant";
import { GameState } from "../scenes/playScene";

export class BulletManager extends Container {
    constructor(player, map , enemyManager, playScene){
        super();
        this.player = player;
        this.map = map;
        this.enemyManager = enemyManager;
        this.playScene = playScene;
    }
    _checkBullets(dt){
        let bullets = this.player.gun.bullets;
        let bulletsToRemove = [];
        const steps = this.map.stairs[this.map.currentIndex + 1].stairSprites; // xét các bậc của cầu thang ngay trước mặt
        this.enemyManager.enemy.isShooted = false;
        bullets.forEach(bullet => {
            bullet.update(dt);
            const bound = bullet.getBounds();
            if(Util.checkCollision(bullet, this.enemyManager.enemy.head) || Util.checkCollision(bullet, this.enemyManager.enemy.body)){ // kiểm tra va chạm giữa đạn và địch
                if(Util.checkCollision(bullet, this.enemyManager.enemy.head)){
                    this.player.score += 50;
                    sound.play("headshotSound");
                } 
                else{
                    this.player.score += 25;
                    sound.play("hitSound");
                } 
                bulletsToRemove.push(bullet);
                if(!this.enemyManager.enemy.isShooted){
                    if (this.enemyManager.enemy.name === "Normal")
                    this.enemyManager.enemy.deaded = true;
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
            eBullet.update(dt)
            if(Util.checkCollision(eBullet, this.player.sprite)){
                sound.play("hitSound");
                // Game._initScene();
                this.map.removeChild(this.player);
                eBullet.visible = false;
                this.playScene.state = GameState.GameOver;
                this.playScene.gameOverUI.show(); 
                
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
    }
}