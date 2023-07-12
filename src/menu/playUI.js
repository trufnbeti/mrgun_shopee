import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { Game } from "../game";
import { GameConstant } from "../gameConstant";

export class PlayUI extends Container{
    constructor() {
      super();
      this._initScore();
      this.resize();
    }
  
    _initScore() {
      let textStyle = new TextStyle({ fontSize: 30, align: "center", fill: 0xffffff });
      this.scoreText = new Text(`Score: 0`, textStyle);
      this.addChild(this.scoreText);
      let textStyle2 = new TextStyle({ fontSize: 20, align: "center", fill: 0xffffff });
      this.bestScore = localStorage.getItem('bestScore');
      this.bestScoreText = new Text(this.bestScore, textStyle2);
      this.addChild(this.bestScoreText);
    }

    _initBossHp(boss){
        this.enemy = boss;
        this.graphics = new Graphics();
        this.addChild(this.graphics);
        this.updateBossHp();
    }
    updateBossHp(){
        this.graphics.clear();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.drawRect(GameConstant.GAME_WIDTH/2 - 150, 100, 300, 25);
        this.graphics.beginFill(0xFF0000);
        this.graphics.drawRect(GameConstant.GAME_WIDTH/2 - 150, 100, 300 * (this.enemy.hp/ this.enemy.maxHp), 25);
        this.graphics.endFill();
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