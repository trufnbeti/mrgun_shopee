import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { GameConstant } from "../gameConstant";

export class LoadingScene extends Container {
  constructor() {
    super();
    this._init();
  }

  _init() {
    const progressTextStyle = new TextStyle({
      fill: 0xffffff,
      fontSize: 24,
      fontWeight: "bold",
    });

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
