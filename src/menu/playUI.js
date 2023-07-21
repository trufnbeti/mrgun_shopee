import * as PIXI from "pixi.js";
import { Container, Text, TextStyle, Graphics, Sprite, Assets } from "pixi.js";
import { Game } from "../game";
import { GameConstant } from "../gameConstant";

export class PlayUI extends Container{
    constructor() {
      super();
      this._initScore();
      this._initLevel();
      this._initMoney();

      this.resize();
    }

    _initLevel() {
      this.graphicLevel = new Graphics();
      this.graphicLevel.beginFill(0x525252);
      const w = 350; 
      this.graphicLevel.drawRoundedRect((GameConstant.GAME_WIDTH - w) / 2,100, w, 32, 27);
      this.graphicLevel.endFill();
      this.addChild(this.graphicLevel);
  
      this._initTextNormal();
      this.textLevel = new PIXI.Text("LEVEL 1", this.normalTextStyle);
      this.textLevel.position.set((GameConstant.GAME_WIDTH - this.textLevel.width) / 2, 100);
      this.addChild(this.textLevel);
    }
    _initTextNormal() {
      this.normalTextStyle = new PIXI.TextStyle({
        fontFamily: "Triomphe Regular Autoinstr",
        fontSize: 25,
        fill: ["#ffffff"],
      });
    }

    _initScore() {
      this.textStyle = new TextStyle({ 
        fontFamily: "Triomphe Bold Autoinstr",
        fontSize: 30,
        fill: ["#ffffff"],
      });
      this.scoreText = new Text(`Score: 0`, this.textStyle);
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
        this.healthBar = new Container();
        this.healthBar.position.set(50, 150);
        this.addChild(this.healthBar);
        this.updatePlayerHp();
    }

    _initMoney() {
      this.money = new Container();
      this.addChild(this.money);
      this.moneySprite = Sprite.from(Assets.get("money"));
      this.money.addChild(this.moneySprite);
      this.moneySprite.scale.set(0.4);

      let money = localStorage.getItem('money');
      this.moneyText = new Text(money,this.textStyle);
      this.moneyText.x = this.moneySprite.width + 10;
      this.money.addChild(this.moneyText)
    }

    updateBossHp(){
        this.bossHp.clear();
        this.bossHp.lineStyle(1, 0xffffff);
        this.bossHp.drawRect(GameConstant.GAME_WIDTH/2 - 150, 100, 300, 25);
        this.bossHp.beginFill(0xFF0000);
        this.bossHp.drawRect(GameConstant.GAME_WIDTH/2 - 150, 100, 300 * (this.enemy.hp/ this.enemy.maxHp), 25);
        this.bossHp.endFill();
    }

    updatePlayerHp() {  
      this.healthBar.removeChildren();
      for (let i = 0; i < this.player.hp; i++) {
        let heart = Sprite.from(Assets.get("heart"));
        this.healthBar.addChild(heart);
        heart.x = i * 40;
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

    updateLevel(percent) {
      if(percent <= 1){
        this.graphicLevel.clear();
        this.graphicLevel.beginFill(0x525252);
        const w = 350; 
        this.graphicLevel.drawRoundedRect((GameConstant.GAME_WIDTH - w) / 2,100, w, 32, 27);
        this.graphicLevel.endFill();
  
        this.graphicLevel.beginFill(0xFF007F);
        this.graphicLevel.drawRoundedRect((GameConstant.GAME_WIDTH - w) / 2,100, w* percent, 32, 27);
        this.graphicLevel.endFill();
      }
      else setTimeout(()=> {
        this.graphicLevel.visible = false;
        this.textLevel.visible = false;
      }, 50); 
    }

    updateMoney(){
      let moneyString = localStorage.getItem('money'); 
      let moneyNumber = parseInt(moneyString);
      localStorage.setItem('money', moneyNumber + 1);
      this.moneyText.text = localStorage.getItem('money');
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

      this.money.position.set(GameConstant.GAME_WIDTH - 130, 60);
    }
  }