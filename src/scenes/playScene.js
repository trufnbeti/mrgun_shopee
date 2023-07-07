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
        this._initScore();

    }

    _initHandleTap(){
        document.addEventListener("pointerdown", () => {
            this.navigateToGunScene();
        })
    }


    navigateToGunScene() {
        if (this.gameState === GameState.menu) {
            this._initPlay();
            this.gameState = GameState.playing;
        }
    }

    _init(){
        this.gameState = GameState.menu;
        this.map = new Map(this, this.app);
        const firstStair = this.map.stairs[0];
        this.player = new Player(this.map);
        // this.enemy = new Enemy(50, 330, 2);
        this.enemy = this.createEnemy(0, firstStair.y, 1, 50, this.randomColor())
        this.map.addChild(this.enemy)

        this.killCount= 0;
        this.killNeed = 1;
    }

    _initPlay(){
        this.interactive = true;
        this.buttonMode = true;
        document.body.addEventListener("keydown", (event) => {
            if (event.code === "Space") {
                // this.player.calPath(this.map.nextStair());
                this.player.changeClothes("cowboy");
                this.player.changeGun("sawed_off");
            }
        });
        this.on("pointerdown", () => {
            if(!this.player.gun.isShot) 
                this.player.gun.shoot(this.dt)
                this.enemy.isReady = true;
        })
    }

    _initMenu(){
        this.menu = new Menu();
        this.addChild(this.menu);
    }
    _initScore(){
        this.score = 0;
        this.scoreText = new Text(this.score);
        this.addChild(this.scoreText);
        this.scoreText.position.set(50, 50);
        const textStyle = new TextStyle({
            fontFamily: "Arial",
            fontSize: 50,
            fill: 0xffffff,
        })
        this.scoreText.style = textStyle;
    }

    update(dt) {
        this.dt = dt;            
        this.scoreText.text = this.score;
        if(this.gameState == GameState.playing){
            this.player.update(dt);
            this.map.update(dt);
            this.enemy.update(dt);
            this.checkBullets(dt);
            if(this.enemy.cooldown <= 0) this.enemy.weapon.attack(this.player)
        }   
        else if (this.gameState == 0){
            this.menu.update(dt);
        }else if(this.gameState == 2){
            //update game over UI
            this.gameOverUI.update(dt);
        }
        else if(this.gameState == GameState.boss){
            this.player.update(dt);
            this.map.update(dt);
            this.enemy.update(dt);
            this.checkBullets(dt);
            //if(this.enemy.cooldown <= 0) this.enemy.weapon.attack(this.player)
        }

    }

    _initgameOverUI(){
        this.gameOverUI = new GameOverUI(this.menu);
        this.addChild(this.gameOverUI);
    }

    checkBullets(dt){
        
        let bullets = this.player.gun.bullets;
        let bulletsToRemove = [];
        const steps = this.map.stairs[this.map.currentIndex + 1].stairSprites; // xét các bậc của cầu thang ngay trước mặt
        this.enemy.isShooted = false;

        bullets.forEach(bullet => {
            bullet.update(dt);
            const bound = bullet.getBounds();
            if(this.checkCollision(bullet, this.enemy.head) || this.checkCollision(bullet, this.enemy.body)){ // kiểm tra va chạm giữa đạn và địch
                if(this.checkCollision(bullet, this.enemy.head)){
                    this.score += 50;
                    sound.play("headshotSound");
                } 
                else{
                    this.score += 25;
                    sound.play("hitSound");
                } 
                bulletsToRemove.push(bullet)
                if(!this.enemy.isShooted)
                    this.hitEnemy();
                else this.enemy.takeDmg(this.player.gun.damage)
            }
            else {
                steps.forEach(step => { // kiểm tra va trạm giữa đạn và cầu thang
                if(this.checkCollision(step, bullet)){
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
        if(this.enemy.weapon.isShot){
            let eBullet = this.enemy.weapon.bullet;
            eBullet.update(dt)
            if(this.checkCollision(eBullet, this.player.sprite)){
                sound.play("hitSound");
                Game._initScene();
                this.map.removeChild(this.player);
                eBullet.visible = false;
                this._initgameOverUI(); 
                this.gameState = 2; // Add this line to show the game over UI
            }
        }
    }
    createEnemy(x, y, direction, maxX, color){
        const run = Math.floor(Math.random() * 3) + 1;
        let enemy = null;
        switch (run) {
            case 1:
                enemy = new ShortFatEnemy(x, y, direction, maxX, color);
                break;
            case 2:
                enemy = new ShortSkinnyEnemy(x, y, direction, maxX, color);
                break;
            case 3:
                enemy = new TallEnemy(x, y, direction, maxX, color);
                break;
            default:
                break;
        }
        return enemy;
    }
    hitEnemy(){
        const nextStair = this.map.stairs[this.map.currentIndex+2];
        const size = GameConstant.Step_Size;
        const xMax = this.player.direction == -1 ? GameConstant.GAME_WIDTH - nextStair.stepNumber*size*2  : nextStair.stepNumber*size*2 - 40;
        const x = (this.player.direction == -1) ? GameConstant.GAME_WIDTH + 50 : -60;
        const y = nextStair.y;
        if(this.killCount < this.killNeed){
            this.killCount++;
            const colorNextEnemy = this.randomColor();
            this.map.removeChild(this.enemy);
            this.enemy = this.createEnemy(x, y, this.player.direction, xMax, colorNextEnemy);
            this.map.addChild(this.enemy);
        }
        else {
            // enemy bình thường
            if(this.gameState == GameState.playing) {
                this.map.removeChild(this.enemy);
                this.enemy = new Boss(x, y,  this.player.direction, xMax);  
                this.map.addChild(this.enemy);
                this.gameState = GameState.boss;
            }
            // boss
            else{
                this.enemy.takeDmg(this.player.gun.damage);
                if(!this.enemy.isMoving){
                    this.enemy.calPath(nextStair);
                }
            }
        }
        
        if(!this.player.isMoving) this.player.calPath(this.map.nextStair());
        this.enemy.isShooted = true;
    }

    hitStair(){
        console.log("hit the wall");
    }
    randomColor(){
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        return `rgb(${red}, ${green}, ${blue})`;
    }
    checkCollision(objA, objB) {
        var a = objA.getBounds();
        var b = objB.getBounds();
    
        var rightmostLeft = a.left < b.left ? b.left : a.left;
        var leftmostRight = a.right > b.right ? b.right : a.right;
    
        if (leftmostRight <= rightmostLeft) {
            return false;
        }
    
        var bottommostTop = a.top < b.top ? b.top : a.top;
        var topmostBottom = a.bottom > b.bottom ? b.bottom : a.bottom;
    
        return topmostBottom > bottommostTop;
    }
}