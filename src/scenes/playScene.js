import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { Player } from "../objects/player/player";
import { Map } from "../objects/map/map";
import { Menu } from "../menu/menu";
import { GameOverUI } from "./gameOverUI";
import { EnemyManager, EnemyManagerEvent } from "../manager/enemyManager";
import { PlayUI } from "../menu/playUI";
import { BulletManager } from "../manager/bulletManager";
import { InputEvent, InputManager } from "../input/inputManager";
import { HitEffect } from "../enemy/hitEffect";
import { Util } from "../helper/utils";

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
        if (this.state == GameState.Menu) {
            return;
        }
        if(this.state == GameState.GameOver){
            return;
        }
        this.enemyManager.enemy.isReady = true;
        this.player.onPointerDown(this.dt);
    }

    _init(){
        this.state = GameState.Menu;
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
        this.killNeed = Util.random(5, 10);

        this.player.score = 0;
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
        this.enemyManager.on(EnemyManagerEvent.Hit, this._onEnemyHit, this);
    }

    _onEnemyHit(){

        if(this.killCount < this.killNeed) {
            this.killCount++;
            this.enemyManager._spawnEnemy(this.player);
        }
        else{
            if(this.state == GameState.Playing) {
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
        this.playUI.updateScore(this.player.score);
        if(!this.player.isMoving) this.player.calPath(this.map.nextStair());
        this.enemyManager.enemy.isShooted = true;
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
        }else if(this.state == GameState.GameOver){
            //update game over UI
            this.gameOverUI.update(dt);
        }

    }
    
    hitStair(){
        console.log("hit the wall");
    }
}