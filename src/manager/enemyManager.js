import { Container } from "pixi.js";
import { Util } from "../helper/utils";
import { GameConstant } from "../gameConstant";
import { ShortFatEnemy } from "../objects/enemy/short_fat_enemy";
import { ShortSkinnyEnemy } from "../objects/enemy/short_skinny_enemy";
import { TallEnemy } from "../objects/enemy/tall_enemy";
import { Boss } from "../objects/enemy/boss";
import { Game } from "../game";
import { BossCard } from "../shop/gunStore/bossCard";

export const EnemyManagerEvent = Object.freeze({
    Hit: "enemymanager:hit",
    End: "enemymanager:end"
  })
  
  export class EnemyManager extends Container{
    constructor(map) {
      super();
      this.map = map;
      this._init();
      this.bossStage = new BossCard();
    }

    _init(){
        this.shortFat = new ShortFatEnemy(0, 0, 1, 0, 0x00000);
        this.shortSkinny = new ShortSkinnyEnemy(0, 0, 1, 0, 0x00000);
        this.tall = new TallEnemy(0, 0, 1, 0, 0x00000);
        this.enemy = this.randomEnemy();
        this.enemy._init(0, this.map.stairs[0].y, 1, 75, Util.randomColor());
        this.map.addChild(this.enemy)
        this.bonus = 1;
    }
  
    _spawnEnemy(player) {
      
      const nextStair = this.map.stairs[this.map.currentIndex+1];
      const size = GameConstant.Step_Size;
      const xMax = player.direction == -1 ? GameConstant.GAME_WIDTH - nextStair.stepNumber*size*2 + 25  : nextStair.stepNumber*size*2 - 25;
      const x = (player.direction == -1) ? GameConstant.GAME_WIDTH + 50 : -60;
      const y = nextStair.y;
      const colorNextEnemy = Util.randomColor();
      this.map.removeChild(this.enemy);
      this.enemy = this.randomEnemy();
      this.enemy._init(x, y, player.direction, xMax, colorNextEnemy);
      this.map.addChild(this.enemy);
    }

    randomEnemy(){
        const run = Math.floor(Math.random() * 3) + 1;
        let enemy = null;
        switch (run) {
            case 1:
                enemy = this.shortFat;
                break;
            case 2:
                enemy = this.shortSkinny;
                break;
            case 3:
                enemy = this.tall;
                break;
            default:
                break;
        }
        return enemy;
    }

    _spawnBoss(player){
        const nextStair = this.map.stairs[this.map.currentIndex+1];
        const size = GameConstant.Step_Size;
        const xMax = player.direction == -1 ? GameConstant.GAME_WIDTH - nextStair.stepNumber*size*2 + 25  : nextStair.stepNumber*size*2 - 25;
        const x = (player.direction == -1) ? GameConstant.GAME_WIDTH + 50 : -60;
        const y = nextStair.y;

        this.player = player;
        this.map.removeChild(this.enemy);
        this.enemy = new Boss(x, y,  player.direction, xMax); 
        this.map.addChild(this.enemy);

    }

    _onHit(bonus){
        this.bonus = bonus;
        this.emit(EnemyManagerEvent.Hit);
    }

    _onEnd(){
        this.emit(EnemyManagerEvent.End);
    }
  
    _onBossHit(){
        this.enemy.takeDmg(this.player.gun.damage * this.bonus);

    }
    BossMove(){
        if(this.enemy.hp <= 0) return;
        const nextStair = this.map.stairs[this.map.currentIndex+1];
        if(!this.enemy.isMoving){
            this.enemy.calPath(nextStair);
            this.enemy.reCooldown();
        }
    }

    onBossDied(){
        this.enemy.destroy();
        
        // this.bossCard._initBoss(i);
        this.bossStage._initBoss()
        this.bossStage._updateStage();
    }

    whereBossDied(){
        return this.enemy.y + this.enemy.height/2;
    }

    _onPlayerShoot(){
        this.enemy.isReady = true;
        this.enemy.isShooted = false;
    }
    update(dt) {
      this.enemy.update(dt);
    }
  }