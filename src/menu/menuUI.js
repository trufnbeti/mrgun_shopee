import * as PIXI from "pixi.js";
import { Application, Assets, Container, Graphics, RenderTexture, Sprite } from "pixi.js";
import { PlayScene } from "../scenes/playScene";
import { GameConstant } from "../gameConstant";
import { Game } from "../game";

export class MenuUI extends Container {

    constructor() {
        super();
        this._showMenuUI();

        this.gameOverBar = new PIXI.Container();

        this.smallTextStyle = new PIXI.TextStyle({
            fontFamily: 'Arial Black',
            fontSize: 25,
            // fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff'],
        });

        this.gameReloadText = new PIXI.Text("TAP TO START", this.smallTextStyle);
        
        this.gameReloadText.anchor.set(0.5);
        this.gameReloadText.zIndex = 2;
        this.gameReloadText.interactive = true;
        this.gameReloadText.cursor = 'pointer';
        this.gameReloadText.position.set(0, 50);
        this.gameOverBar.addChild(this.gameReloadText);

        this.gameOverBar.position.set(720 / 2, 1080 / 2);


        this.gameReloadText.on('pointerdown', () => {
            this.parent.removeChild(this);
        });

        this.addChild(this.gameOverBar);
        this.zIndex = 100;
        this.blinkCounter = 1;
        this._init();
    }

    update(delta) {
        this.blinkCounter += delta * 0.1;
        this.gameReloadText.alpha = Math.abs(Math.sin(this.blinkCounter));
    }

    _init() {
        // Tạo container để chứa các button
        this.buttonContainer = new Container();
        this.addChild(this.buttonContainer);
    
        // Button 'blacklist'
        this.buttonBlacklist = Sprite.from(Assets.get("blacklist"));
        this.buttonBlacklist.x = 0;
        this.buttonContainer.addChild(this.buttonBlacklist);
    
        // Button 'outfits'
        this.buttonOutfits = Sprite.from(Assets.get("outfits"));
        this.buttonOutfits.x = this.buttonBlacklist.width + 50; // Khoảng cách giữa các button
        this.buttonContainer.addChild(this.buttonOutfits);
    
        // Button 'guns'
        this.buttonGuns = Sprite.from(Assets.get("gunstore"));
        this.buttonGuns.x = this.buttonOutfits.x + this.buttonOutfits.width + 50; // Khoảng cách giữa các button
        this.buttonContainer.addChild(this.buttonGuns);

    
        const scaleIncreaseSpeed = 0.2; 

        // Thiết lập vị trí và căn giữa container chứa các button
        this.buttonContainer.x = 140;
        this.buttonContainer.y = 710;
      }
    
    _showMenuUI(){
        this.visible = true;
    }
}

