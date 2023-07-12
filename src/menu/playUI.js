import { Container, Text, TextStyle, Graphics } from "pixi.js";
import { Game } from "../game";
import { GameConstant } from "../gameConstant";

export class PlayUI extends Container{
    constructor() {
      super();
      this._initScore();
      this.resize();
    }
  
    _initScore() {
      let textStyle = new TextStyle({ 
        fontFamily: "Triomphe Bold Autoinstr",
        fontSize: 30,
        fill: ["#ffffff"],
      });
      this.scoreText = new Text(`Score: 0`, textStyle);
      this.addChild(this.scoreText);

      let textStyle2 = new TextStyle({ 
        fontFamily: "Triomphe Bold Autoinstr",
        fontSize: 20,
        fill: ["#ffffff"], 
      });

      this.bestScore = localStorage.getItem('bestScore');
      this.bestScoreText = new Text(this.bestScore, textStyle2);
      this.addChild(this.bestScoreText);
    }

    _initBossHp(boss){
        this.enemy = boss;
        this.bossHp = new Graphics();
        this.addChild(this.bossHp);
        this.updateBossHp();
    }

    _initPlayerHp(player){
        this.player = player;
        this.playerHp = new Graphics();
        this.addChild(this.playerHp);
        this.updatePlayerHp();
    }

    updateBossHp(){
        this.bossHp.clear();
        this.bossHp.lineStyle(1, 0xffffff);
        this.bossHp.drawRect(GameConstant.GAME_WIDTH/2 - 150, 100, 300, 25);
        this.bossHp.beginFill(0xFF0000);
        this.bossHp.drawRect(GameConstant.GAME_WIDTH/2 - 150, 100, 300 * (this.enemy.hp/ this.enemy.maxHp), 25);
        this.bossHp.endFill();
    }

    updatePlayerHp(){
        this.playerHp.clear();
        for(let i = 0; i < this.player.hp; i++){
          this.playerHp.lineStyle(1, 0xffffff);
          this.playerHp.drawRect(50 + i* 40, 150, 30, 30);
          this.playerHp.beginFill(0xFF0000);
          this.playerHp.drawRect(50 + i* 40, 150, 30, 30);
          this.playerHp.endFill();
        }
        
    }
  
    updateScore(score) {
      this.scoreText.text = `Score: ${score}`;
      if(score > this.bestScore){
        this.bestScore = score;
        this.bestScoreText.text = this.bestScore;
        localStorage.setItem('bestScore', score);
      }
    }

  
    hide() {
      this.visible = false;
    }
  
    show() {
      this.visible = true;
    }
  
    resize() {
      this.scoreText.x =  50;
      this.scoreText.y = 50;
      this.bestScoreText.x = 50;
      this.bestScoreText.y = 100;
    }
  }