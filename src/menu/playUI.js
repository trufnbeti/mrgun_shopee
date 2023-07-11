import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { Game } from "../game";
import { GameConstant } from "../gameConstant";

export class PlayUI extends Container{
    constructor() {
      super();
      this._initScore();
      this.resize();
      console.log(this.scoreText.position);
    }
  
    _initScore() {
      let textStyle = new TextStyle({ fontSize: 30, align: "center", fill: 0xffffff });
      this.scoreText = new Text(`Score: 0`, textStyle);
      this.scoreText.anchor.set(1, 0);
      this.addChild(this.scoreText);
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
    }

  
    hide() {
      this.visible = false;
    }
  
    show() {
      this.visible = true;
    }
  
    resize() {
      this.scoreText.x = this.width + 50;
      this.scoreText.y = 50;
    }
  }