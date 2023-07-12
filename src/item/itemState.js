import * as PIXI from "pixi.js";
import {
  Application,
  Assets,
  Container,
  Graphics,
  RenderTexture,
  Sprite,
} from "pixi.js";

export class Choose extends Container{
    constructor() {
        super();
        
        
    }

    // Add color for item choose
    _initBGChoose(w, h, colorFill){
        const bGChoose = new Graphics();
        colorFill = 0x51afe2;
        bGChoose.beginFill(colorFill);
        bGChoose.drawRect(w, h, 154, 167);
        bGChoose.endFill();
        this.addChild(bGChoose);
    }

    _showColorItemChoose(){
        this.visible = true;
    }

    ///Add color for item close
    _initLineClose(w, h){
        const lineClose = new Graphics();
        lineClose.lineStyle(10, 646464); // Đặt độ rộng và màu sắc của viền
        lineClose.drawRect(w, h, 154, 167);
        this.addChild(lineClose);
    }

    _showLineColorClose(){
        this.visible = true;
    }

    //Add color for item open
    _initLineOpen(w, h, colorLine){
        const lineOpen = new Graphics();
        colorLine = 0x51afe2;
        lineOpen.lineStyle(10, colorLine); // Đặt độ rộng và màu sắc của viền
        lineOpen.drawRect(w, h, 154, 167);
        this.addChild(lineOpen);
    }

    _showLineColorOpen(){
        this.visible = true;
    }

}