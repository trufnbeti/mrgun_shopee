import * as PIXI from "pixi.js";
import { Container, Text, TextStyle, Graphics, Sprite, Assets } from "pixi.js";
import { Game } from "../game";
import { GameConstant } from "../gameConstant";
import { Money } from "../objects/money/money";

export class PlayUI extends Container{
    constructor() {
      super();
      this._initTextNormal();
      this._initTextBig();
      this._initScore();
      this._initLevel();
      this._initMoney();

      this._bossIcon();
      this.bossIcon.visible = false;

      this.resize();
    }
    _bossIcon(){
      this.bossIcon = Sprite.from(Assets.get("bossIcon"));
      this.bossIcon.position.set(GameConstant.GAME_WIDTH/2 - 216, 100 - this.bossIcon.height/20);
      this.bossIcon.scale.set(0.15);
      this.addChild(this.bossIcon);
    }

    _initLevel() {
      this.graphicLevel = new Graphics();
      this.graphicLevel.beginFill(0x525252);
      const w = 350; 
      this.graphicLevel.drawRoundedRect((GameConstant.GAME_WIDTH - w) / 2,100, w, 32, 27);
      this.graphicLevel.endFill();
      this.addChild(this.graphicLevel);

      this.level = localStorage.getItem("level");
        if(!this.level){
            localStorage.setItem("level", 1);
            this.level = 1;
        } 
      this.textLevel = new PIXI.Text("LEVEL "+this.level, this.normalTextStyle);
      this.textLevel.position.set((GameConstant.GAME_WIDTH - this.textLevel.width) / 2, 100);
      this.addChild(this.textLevel);
    }
    _initTextNormal() {
      this.normalTextStyle = new PIXI.TextStyle({
        fontFamily: 'Triomphe Light Autoinstr',
        fontSize: 25,
        fill: ["#ffffff"],
      });
    }

    _initTextBig() {
      this.BigTextStyle = new PIXI.TextStyle({
        fontFamily: "Triomphe Bold Autoinstr",
        fontSize: 55,
        fill: ["#ffffff"],
      });
    }

    _initScore() {
      this.scoreText = new Text(`0`, this.BigTextStyle);
      this.addChild(this.scoreText);

      this.bestScore = localStorage.getItem('bestScore');
    }

    _initBossHp(boss){
        this.enemy = boss;

        this.bossHpBG = new Graphics();
        this.bossHpBG.beginFill(0x525252);
        this.bossHpBG.drawRoundedRect(GameConstant.GAME_WIDTH/2 - 175, 100, 350, 12, 10);
        this.bossHpBG.endFill();
        this.addChild(this.bossHpBG);

        this.bossHp = new Graphics();
        this.addChild(this.bossHp);

        this.updateBossHp();
        this.bossIcon.visible = true;
    }

    _initPlayerHp(player){
        this.player = player;
        this.healthBar = new Container();
        this.addChild(this.healthBar);
        this.updatePlayerHp();
    }

    _initMoney() {
      this.money = new Money();
      this.addChild(this.money);
    }

    updateBossHp(){
        this.bossHp.clear();
        this.bossHp.beginFill(0x7c39f0);
        this.bossHp.drawRoundedRect(GameConstant.GAME_WIDTH/2 - 175, 100, 350 * (this.enemy.hp/ this.enemy.maxHp), 12, 10);
        this.bossHp.endFill();
    }

    updatePlayerHp() {  
      this.healthBar.removeChildren();
      for (let i = 0; i < this.player.hp; i++) {
        let heart = Sprite.from(Assets.get("heart"));
        heart.scale.set(0.5);
        this.healthBar.addChild(heart);
        this.healthBar.position.set((GameConstant.GAME_WIDTH - heart.width*i/2 - 40*i)/2, 45);
        heart.x = i * 40;
      }
    }
  
    updateScore(score) {
      this.scoreText.text = `${score}`;
      if(score > this.bestScore){
        this.bestScore = score;
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
  
        this.graphicLevel.beginFill(0xea3956);
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
    }
  
    hide() {
      this.visible = false;
    }
  
    show() {
      this.visible = true;
    }
  
    resize() {
      this.scoreText.x =  20;
      this.scoreText.y = 10;

    }
  }