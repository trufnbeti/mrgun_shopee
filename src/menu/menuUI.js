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

        // this._initLevel();
        // this._initMoney();
        // this._initLOGO();
        // this._initBestScore();

        this._initTextSmall();
        this._initTapToStart();

        this.addChild(this.gameOverBar);
        this.zIndex = 100;
        this.blinkCounter = 1;
        this._init();
    }

    _initLOGO(){

    }

    _init() {
        // Tạo container để chứa các button
        this.buttonContainer = new Container();
        this.addChild(this.buttonContainer);
    
        this._initButtonMusic();
        this._initButtonSound();
        this._initButtonBlacklist();
        this._initButtonOutfits();
        this._initButtonGuns();

        // Thiết lập vị trí và căn giữa container chứa các button
        this.buttonContainer.x = 65;
        this.buttonContainer.y = 710;
    }

    _initTextSmall(){
        this.smallTextStyle = new PIXI.TextStyle({
            fontFamily: 'Century Gothic',
            fontSize: 35,
            // fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff'],
        });

    }

    _initTapToStart(){
        this.gameReloadText = new PIXI.Text("TAP TO START", this.smallTextStyle);
        this.gameReloadText.anchor.set(0.5);
        this.gameReloadText.zIndex = 2;
        this.gameReloadText.interactive = true;
        this.gameReloadText.cursor = 'pointer';
        this.gameReloadText.position.set(0, 50);
        this.gameOverBar.addChild(this.gameReloadText);
        this.gameOverBar.position.set(720 / 2, 600);

        const hitArea = new PIXI.Rectangle(-420, -636, 720, 690);
        this.gameReloadText.hitArea = hitArea;

        this.gameReloadText.on('pointerdown', () => {
            this.parent.removeChild(this);
        });
    }

    _initButtonMusic(){
        // Button 'music'
        this.buttonMusic = Sprite.from(Assets.get("music"));
        this.buttonMusic.x = 0;
        this.buttonMusic.scale.set(0.65);
        this.buttonContainer.addChild(this.buttonMusic);
    }

    _initButtonSound(){
        // Button 'sound'
        this.buttonSound = Sprite.from(Assets.get("sound"));
        this.buttonSound.y = this.buttonMusic.height + 10;
        this.buttonSound.scale.set(0.65);
        this.buttonContainer.addChild(this.buttonSound);
    }

    _initButtonBlacklist(){
        // Button 'blacklist'
        this.buttonBlacklist = Sprite.from(Assets.get("blacklist"));
        this.buttonBlacklist.x = this.buttonMusic.width + 30;
        this.buttonContainer.addChild(this.buttonBlacklist);
    }

    _initButtonOutfits(){
        // Button 'outfits'
        this.buttonOutfits = Sprite.from(Assets.get("outfits"));
        this.buttonOutfits.x = this.buttonMusic.width + this.buttonBlacklist.width + 60; // Khoảng cách giữa các button
        this.buttonContainer.addChild(this.buttonOutfits);
    }

    _initButtonGuns(){
        // Button 'guns'
        this.buttonGuns = Sprite.from(Assets.get("gunstore"));
        this.buttonGuns.x = this.buttonMusic.width + this.buttonBlacklist.x + this.buttonOutfits.width + 60; // Khoảng cách giữa các button
        this.buttonContainer.addChild(this.buttonGuns);
    }

    update(delta) {
        this.blinkCounter += delta * 0.1;
        this.gameReloadText.alpha = Math.abs(Math.sin(this.blinkCounter));
    }
    
    _showMenuUI(){
        this.visible = true;
    }
}

