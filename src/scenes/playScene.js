import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { Player } from "../objects/player/player";
import { Map } from "../objects/map/map";
import { GameConstant } from "../gameConstant";
import { ShortFatEnemy } from "../enemy/short_fat_enemy";
import { ShortSkinnyEnemy } from "../enemy/short_skinny_enemy";
import { TallEnemy } from "../enemy/tall_enemy";
import { sound } from "@pixi/sound";
import { Menu } from "../menu/menu";
import { GameOverUI } from "../menu/gameOverUI";
import { Game } from "../game";
import { Boss } from "../enemy/boss";
import { Util } from "../helper/utils";
import { EnemyManager, EnemyManagerEvent } from "../manager/enemyManager";
import { PlayUI } from "../menu/playUI";

export const GameState = Object.freeze({
    menu: 0,
    playing: 1,
    gameover: 2,
    boss: 3,
})

export class PlayScene extends Container{
    constructor(app){
        super();
        this.app = app;
        this._init();
        this._initHandleTap();
        this._initMenu();

    }

    _initHandleTap(){
        document.addEventListener("pointerdown", () => {
            setTimeout(() => {
                this.navigateToGunScene();
              }, 100);
        })
    }


    navigateToGunScene() {
        if (this.state === GameState.menu) {
            this._initPlay();
            this.state = GameState.playing;
        }
    }

    _init(){
        this.state = GameState.menu;
        this.map = new Map(this, this.app);
        this.addChild(this.map);
        this.player = new Player(this.map);
        this.map.addChild(this.player)


        this._initEnemies();
        this._initUI();

        this.killCount= 0;
        this.killNeed = 1;

        this.score = 0;

    }
    
    _initUI(){
        this.playUI = new PlayUI();
        this.addChild(this.playUI);
    }

    _initPlay(){
        this.interactive = true;
        this.buttonMode = true;
        this.on("pointerdown", () => {
            if(!this.player.gun.isShot) 
                this.player.gun.shoot(this.dt)
                this.enemyManager.enemy.isReady = true;
        })
    }

    _initMenu(){
        this.menu = new Menu();
        this.addChild(this.menu);
    }

    _initEnemies(){
        this.enemyManager = new EnemyManager(this.map);
        this.addChild(this.enemyManager);
        this.enemyManager.on(EnemyManagerEvent.Hit, this._onEnemyHit, this);
    }

    _initgameOverUI(){
        this.gameOverUI = new GameOverUI(this.menu);
        this.addChild(this.gameOverUI);
    }

    _onEnemyHit(){
        if(this.killCount < this.killNeed) {
            this.killCount++;
            this.enemyManager._spawnEnemy(this.player);
        }
        else{
            if(this.state == GameState.playing) {
                this.enemyManager._spawnBoss(this.player);
                this.playUI._initBossHp(this.enemyManager.enemy);
                this.state = GameState.boss;
            }
            // boss
            else{
                this.enemyManager._onBossHit();
                this.playUI.updateBossHp();
            }
        }
        this.playUI.updateScore(this.score);
        if(!this.player.isMoving) this.player.calPath(this.map.nextStair());
        this.enemyManager.enemy.isShooted = true;
    }

    update(dt) {
        this.dt = dt;            
        if(this.state == GameState.playing || this.state == GameState.boss){
            this.player.update(dt);
            this.map.update(dt);
            this.enemyManager.update(dt);
            this.checkBullets(dt);
            if(this.enemyManager.enemy.cooldown <= 0) this.enemyManager.enemy.weapon.attack(this.player)
        }   
        else if (this.state == 0){
            this.menu.update(dt);
        }else if(this.state == 2){
            //update game over UI
            this.gameOverUI.update(dt);
        }

    }

    checkBullets(dt){
        
        let bullets = this.player.gun.bullets;
        let bulletsToRemove = [];
        const steps = this.map.stairs[this.map.currentIndex + 1].stairSprites; // xét các bậc của cầu thang ngay trước mặt
        this.enemyManager.enemy.isShooted = false;

        bullets.forEach(bullet => {
            bullet.update(dt);
            const bound = bullet.getBounds();
            if(Util.checkCollision(bullet, this.enemyManager.enemy.head) || Util.checkCollision(bullet, this.enemyManager.enemy.body)){ // kiểm tra va chạm giữa đạn và địch
                if(Util.checkCollision(bullet, this.enemyManager.enemy.head)){
                    this.score += 50;
                    sound.play("headshotSound");
                } 
                else{
                    this.score += 25;
                    sound.play("hitSound");
                } 
                bulletsToRemove.push(bullet)
                this.enemyManager._onHit();
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
                this.state = 2; // Add this line to show the game over UI
                this._initgameOverUI(); 
                
            }
        }
    }
   
    hitStair(){
        console.log("hit the wall");
    }
}