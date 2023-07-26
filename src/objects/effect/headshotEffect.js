import { Container, Graphics, Text, Ticker } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import TWEEN,{ Tween } from "@tweenjs/tween.js";

export class HeadshotEffect extends Container{
    constructor(){
        super();
        this._init();
    }
    _init(){
        this.dt = 0;
        this.count = 0;
        this._initText();
        this._initRect();
        this.hide();
    }
    _initText(){
        this.headshotText = new Text("HEADSHOT", {fontSize: 50, fill: 0xFFFF00, fontStyle: 'bold'});
        this.headshotText.anchor.set(0.5);
        this.addChild(this.headshotText);
        this.headshotText.position.set(GameConstant.GAME_WIDTH/2, GameConstant.GAME_HEIGHT/3);
    }
    _initRect(){
        this.rect = new Graphics();
        this.addChild(this.rect);
        this.rect.beginFill(0xffffff);
        this.rect.drawRect(0,0, GameConstant.GAME_WIDTH, GameConstant.GAME_HEIGHT);
        this.rect.endFill();
    }
    _onHeadshot(){
        this.show();
        const effectDuration = 400 * 1000; // Thời gian hiệu ứng (ms)
        const finalTextScale = 1;
        const finalAlpha = 0; // Độ mờ cuối cùng

        this.rect.scale.set(1);
        this.rect.alpha = 0.6;
        this.headshotText.scale.set(0.2);
        this.headshotText.alpha = 1;

        // tween của hình chữ nhật
        new TWEEN.Tween(this.rect)
        .to({alpha: finalAlpha }, 50 * 1000)
        .onUpdate(() => {

        })
        .onComplete(() => {
        })
        .start(this.dt * 1000);

        //tween của text
        new TWEEN.Tween(this.headshotText)
        .to({ scale: { x: finalTextScale, y: finalTextScale }, alpha: finalAlpha }, effectDuration)
        .onUpdate(() => {

        })
        .onComplete(() => {
        })
        .start(this.dt * 1000);
    }
    update(dt){
        this.dt += Ticker.shared.deltaMS;
    }
    updateText(){
        if(this.count > 0) this.headshotText.text = "HEADSHOT X" + (this.count+1); 
        else this.headshotText.text = "HEADSHOT";
    }
    hide(){
        this.visible = false;
    }
    show(){
        this.visible = true;
    }
}