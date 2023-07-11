import { Container } from "pixi.js";
import { Util } from "../helper/utils";
import { GameConstant } from "../gameConstant";
import { ShortFatEnemy } from "../enemy/short_fat_enemy";
import { ShortSkinnyEnemy } from "../enemy/short_skinny_enemy";
import { TallEnemy } from "../enemy/tall_enemy";
import { Boss } from "../enemy/boss";
import { Game } from "../game";

export const EnemyManagerEvent = Object.freeze({
    Hit: "enemymanager:hit",
  })
  
  export class EnemyManager extends Container{
    constructor(map) {
      super();
      this.map = map;
      this.enemy = this.createEnemy(0, this.map.stairs[0].y, 1, 50, Util.randomColor());
      this.map.addChild(this.enemy)
    }
  
    _spawnEnemy(player) {
      
      const nextStair = this.map.stairs[this.map.currentIndex+2];
      const size = GameConstant.Step_Size;
      const xMax = player.direction == -1 ? GameConstant.GAME_WIDTH - nextStair.stepNumber*size*2  : nextStair.stepNumber*size*2 - 40;
      const x = (player.direction == -1) ? GameConstant.GAME_WIDTH + 50 : -60;
      const y = nextStair.y;
      const colorNextEnemy = Util.randomColor();
      this.map.removeChild(this.enemy);
      this.enemy = this.createEnemy(x, y, player.direction, xMax, colorNextEnemy);
      this.map.addChild(this.enemy);
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

    _spawnBoss(player){
        const nextStair = this.map.stairs[this.map.currentIndex+2];
        const size = GameConstant.Step_Size;
        const xMax = player.direction == -1 ? GameConstant.GAME_WIDTH - nextStair.stepNumber*size*2  : nextStair.stepNumber*size*2 - 40;
        const x = (player.direction == -1) ? GameConstant.GAME_WIDTH + 50 : -60;
        const y = nextStair.y;

        this.player = player;
        this.map.removeChild(this.enemy);
        this.enemy = new Boss(x, y,  player.direction, xMax); 
        this.map.addChild(this.enemy);
    }

    _onHit(){
        this.emit(EnemyManagerEvent.Hit)
    }
  
    _onBossHit(){
        const nextStair = this.map.stairs[this.map.currentIndex+2];
        this.enemy.takeDmg(this.player.gun.damage);
        if(!this.enemy.isMoving){
            this.enemy.calPath(nextStair);
            this.enemy.reCooldown();
        }
        if(this.enemy.hp <= 0) Game._initScene();
    }
    update(dt) {
      this.enemy.update(dt);
    }
  }