import { Container, Graphics } from "pixi.js";
import { Player } from "../objects/player/player";
import { Map } from "../objects/map/map";
import { GameConstant } from "../gameConstant";
import { ShortFatEnemy } from "../enemy/short_fat_enemy";
import { ShortSkinnyEnemy } from "../enemy/short_skinny_enemy";
import { TallEnemy } from "../enemy/tall_enemy";
import { sound } from "@pixi/sound";
import { Menu } from "../menu/menu";
import { Enemy } from "../enemy/enemy";

export const GameState = Object.freeze({
    menu: 0,
    playing: 1,
    gameover: 2,
})

export class PlayScene extends Container{
    constructor(app){
        super();
        this.app = app;
        this._init();
        this._initHandleTap();
        this._initMenu();
        this.gameState = GameState.menu;
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
        this.map = new Map(this, this.app);
        const firstStair = this.map.stairs[0];
        this.player = new Player(this.map);
        // this.enemy = new Enemy(50, 330, 2);
        this.enemy = this.createEnemy(0, firstStair.y, 1, 50, this.randomColor())
        this.map.addChild(this.enemy)

        this.isHitEnemy = false;

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
        })
    }

    _initMenu(){
        this.menu = new Menu();
        this.addChild(this.menu);
    }

    update(dt) {
        this.dt = dt;
        
        if(this.gameState == 1){
            this.player.update(dt);
            this.map.update(dt);
            this.enemy.update(dt);
            if(this.enemy.cooldown <= 0) this.enemy.attack(this.player)
            this.checkBullets(dt);
        }   
        else this.menu.update(dt);
        

    }
    checkBullets(dt){
        
        let bullets = this.player.gun.bullets;
        let bulletsToRemove = [];
        const steps = this.map.stairs[this.map.currentIndex + 1].stairSprites; // xét các bậc của cầu thang ngay trước mặt
        if (!this.player.gun.isShot)
            this.isHitEnemy = false;
        
        bullets.forEach(bullet => {
            bullet.update(dt);
            const bound = bullet.getBounds();
            if(this.checkCollision(bullet, this.enemy.head) || this.checkCollision(bullet, this.enemy.body)){ // kiểm tra va chạm giữa đạn và địch
                bulletsToRemove.push(bullet)
                this.hitEnemy();
                this.isHitEnemy = true;
            }
            else {
                steps.forEach(step => { // kiểm tra va trạm giữa đạn và cầu thang
                if(this.checkCollision(step, bullet)){
                    bulletsToRemove.push(bullet)

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
        this.map.removeChild(this.enemy);
        // this.enemy.destroy();
        const currenStair = this.map.stairs[this.map.currentIndex+2];
        const size = GameConstant.Step_Size;
        const xMax = this.player.direction == -1 ? GameConstant.GAME_WIDTH - currenStair.stepNumber*size*2  : currenStair.stepNumber*size*2 - 40;
        const x = (this.player.direction == -1) ? GameConstant.GAME_WIDTH : 0;
        const y = currenStair.y;
        const colorNextEnemy = this.randomColor();

        this.map.removeChild(this.enemy);
        this.enemy = this.createEnemy(x, y, this.player.direction, xMax, colorNextEnemy);
        this.map.addChild(this.enemy);


        if(!this.player.isMoving) this.player.calPath(this.map.nextStair());
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