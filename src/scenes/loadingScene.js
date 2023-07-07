import * as PIXI from "pixi.js";
import { Container, Graphics, Text, TextStyle, Sprite , Assets} from "pixi.js";
import { GameConstant } from "../gameConstant";

export class LoadingScene extends Container {
  constructor() {
    super();
    this._init();
    this._initLogoLoading();
  }

  _initLogoLoading(){
    this.layoutUIContainer = new PIXI.Container();
    this.addChild(this.layoutUIContainer);
    const logoTexture = PIXI.Texture.from('assets/images/logo/logoMRGUN.png');
    this.logoSpriter = new PIXI.Sprite(logoTexture);
    this.logoSpriter.position.set(80/2, GameConstant.GAME_HEIGHT / 2.8);
    this.logoSpriter.scale.set(0.75);;
    this.layoutUIContainer.addChild(this.logoSpriter);
  }

  _init() {
    const progressTextStyle = new TextStyle({
      fill: 0xffffff,
      fontSize: 24,
      fontWeight: "bold",
    });

    // Add black background
    const background = new Graphics();
    background.beginFill(0x0A0A0A);
    background.drawRect(0, 0, GameConstant.GAME_WIDTH, GameConstant.GAME_HEIGHT);
    background.endFill();
    this.addChild(background);

    this.progressBarWidth = 300;
    this.progressBarHeight = 20;
    const progressBarX = (GameConstant.GAME_WIDTH - this.progressBarWidth) / 2;
    const progressBarY = (GameConstant.GAME_HEIGHT - this.progressBarHeight) / 2;

    this.progressBar = new Graphics();
    // this.progressBar.beginFill(0x00ff00); // Màu xanh
    this.progressBar.lineStyle(1, 0xffd700);
    this.progressBar.drawRect(0, 0, this.progressBarWidth, this.progressBarHeight);
    this.progressBar.x = progressBarX;
    this.progressBar.y = progressBarY;
    this.addChild(this.progressBar);

    const progressText = new Text("Loading...", progressTextStyle);
    progressText.anchor.set(0.5);
    progressText.x = GameConstant.GAME_WIDTH / 2;
    progressText.y = progressBarY + this.progressBarHeight + 20;
    this.addChild(progressText);
  }

  setProgress(progress) {

    this.progressBar.clear();
    this.progressBar.lineStyle(1, 0xffd700);
    this.progressBar.drawRect(0, 0, this.progressBarWidth, this.progressBarHeight);
    this.progressBar.beginFill(0xffd700);
    this.progressBar.drawRect(
      0,
      0,
      progress * this.progressBarWidth,
      this.progressBar.height
    );
    this.progressBar.endFill();
  }
}
