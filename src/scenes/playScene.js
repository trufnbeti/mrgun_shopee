import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { Player } from "../objects/player/player";
import { Map } from "../objects/map/map";
import { Menu } from "../menu/menu";
import { GameOverUI } from "./gameOverUI";
import { EnemyManager, EnemyManagerEvent } from "../manager/enemyManager";
import { PlayUI } from "../menu/playUI";
import { BulletManager } from "../manager/bulletManager";
import { InputEvent, InputManager } from "../input/inputManager";
import { HitEffect } from "../objects/enemy/hitEffect";
import { Util } from "../helper/utils";
import { GameConstant } from "../gameConstant";
import { EndPortal } from "../objects/effect/endEffect";

export const GameState = Object.freeze({
    Menu: "menu",
    Playing: "playing",
    GameOver: "gameover",
    BossFight: "bossfight",
})

export class PlayScene extends Container{
    constructor(app){
        super();
        this.app = app;
        this._init();
        this._initInputHandler();

    }

    _initInputHandler() {
        InputManager.emitter.on(InputEvent.MouseDown, this._onPointerDown, this);
        // InputManager.emitter.on(InputEvent.MouseMove, this._onPointerMove, this);
        // InputManager.emitter.on(InputEvent.MouseUp, this._onPointerUp, this);
    }

    _onPointerDown(pos) {
        if (this.state == GameState.Playing || this.state == GameState.BossFight) {
            if(!this.player.isMoving){
                this.enemyManager._onPlayerShoot();
                this.player.onPointerDown(this.dt);
            }
        }
        else return;

    }

    _init(){
        this.state = GameState.Menu;
        this.end = false;
        this.map = new Map(this, this.app);
        this.addChild(this.map);
        this.player = new Player(this.map);
        this.map.addChild(this.player)


        this._initEnemies();
        this._initUI();
        this.playUI._initPlayerHp(this.player);
        
        this.bulletManager = new BulletManager(this.player, this.map, this.enemyManager, this);
        this.addChild(this.bulletManager);

        this.killCount= 0;
        this.killNeed = Util.random(8, 10);

    }
    
    _initUI(){
        this.playUI = new PlayUI();
        this.addChild(this.playUI);

        this.menu = new Menu();
        this.addChild(this.menu);

        this.gameOverUI = new GameOverUI(this.menu);
        this.addChild(this.gameOverUI);
        this.gameOverUI.hide();
    }

    _initEnemies(){
        this.enemyManager = new EnemyManager(this.map);
        this.addChild(this.enemyManager);
        this.enemyManager.on(EnemyManagerEvent.Hit, this.onEnemyHit, this);
        this.enemyManager.on(EnemyManagerEvent.End, this.onEnd, this);
    }

    onEnemyHit(){

        if(this.killCount < this.killNeed - 1) {
            this.killCount++;
            this.enemyManager._spawnEnemy(this.player);
        }
        else{
            if(this.state == GameState.Playing) {
                this.killCount++;
                this.enemyManager._spawnBoss(this.player);
                this.playUI._initBossHp(this.enemyManager.enemy);
                this.state = GameState.BossFight;
            }
            // boss
            else{
                this.enemyManager._onBossHit();
                this.playUI.updateBossHp();
            }
        }
        this.playUI.updateLevel(this.killCount / (this.killNeed))
        this.enemyManager.enemy.isShooted = true;
    }

    onEnd(){
        this.end = true;
        const stair = this.map.stairs[this.map.currentIndex];
        if(!this.player.isMoving){
            this.player.endPath(stair);
        } 
        let x = this.player.direction == -1 ? 0 : GameConstant.GAME_WIDTH; 
        this.map.addChild(new EndPortal(x,this.enemyManager.whereBossDied(),this.player.direction));
        this.enemyManager.onBossDied();
        
        const level = localStorage.getItem("level");
        localStorage.setItem('level', parseInt(level)+1);
        localStorage.setItem('score', this.player.score);
    }

    update(dt) {
        this.dt = dt;
        if(this.state == GameState.Playing || this.state == GameState.BossFight){
            this.player.update(dt);
            this.map.update(dt);
            this.enemyManager.update(dt);
            this.bulletManager.update(dt);
            if(this.enemyManager.enemy.cooldown <= 0) this.enemyManager.enemy.weapon.attack(this.player)
        }   
        else if (this.state == GameState.Menu){
            this.menu.update(dt);
        }

        this.playUI.money.updateText();
        this.gameOverUI.money.updateText();
    }
    
    hitStair(){
        console.log("hit the wall");
    }
}