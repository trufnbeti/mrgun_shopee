import * as PIXI from "pixi.js";
import { Application, Assets, Container, Graphics, RenderTexture, Sprite,} from "pixi.js";
import { Gun } from "../../objects/player/gun";

export class GunCard extends Container {
    constructor() {
        super();  
        this._initTextBig();

        this._initSprite(0);
    }

    _initSprite(i) {
        this._initLineClose();
        this._initLineOpen();
        this._initBGChoose();

        this.close.visible = false;
        this.open.visible = false;
        this.choose.visible = false;
    
        if (i == 0) {
            this.close.visible = true;
        } else if (i == 1) {
            this.open.visible = true;
        } else if (i == 2) {
            this.choose.visible = true;
        }
    }
    //Add color for item open
    _initLineOpen(){
        this.open = new Container();
        this.open.cursor = "pointer";
        this.open.interactive = 'true';
        this.open.on("pointerdown", () => this.onSetGun());

        this.lineOpen = new Graphics();
        this.lineOpen.lineStyle(10, 0xf4b544);
        this.lineOpen.drawRoundedRect(0, 0, 150, 166, 17);
        this.open.addChild(this.lineOpen);

        this.uspS = Sprite.from(Assets.get("usp_s"));
        this.uspS.anchor.set(0.5);
        this.uspS.scale.set(3)
        this.uspS.position.set(80, 0);
        this.open.addChild(this.uspS);

        // this.name = new PIXI.Text(string, this.bigTextStyle);
        // this.name.anchor.set(0.5);
        // this.name.zIndex = 2;
        // this.name.position.set(-80, 0);
        // this.open.addChild(this.name);

        this.addChild(this.open);
    }

    ///Add color for item close
    _initLineClose(){
        this.close = new Container();
        this.close.cursor = "pointer";
        this.close.interactive = 'true';
        this.close.on("pointerdown", () => this.onSetGun());
        
        this.lineClose = new Graphics();
        this.lineClose.lineStyle(10, 0x646464); // Đặt độ rộng và màu sắc của viền
        this.lineClose.drawRoundedRect(0, 0, 150, 166);
        this.close.addChild(this.lineClose);

        this.uspS = Sprite.from(Assets.get("usp_s"));
        this.uspS.anchor.set(0.5);
        this.uspS.scale.set(3)
        this.uspS.position.set(80, 0);
        this.close.addChild(this.uspS);

        // this.name = new PIXI.Text(string, this.bigTextStyle);
        // this.name.anchor.set(0.5);
        // this.name.zIndex = 2;
        // this.name.position.set(-80, 0);
        // this.close.addChild(this.name);

        this.addChild(this.close);
    }
    // Add color for item choose
    _initBGChoose(){
        this.choose = new Container();
        this.choose.cursor = "pointer";
        this.choose.interactive = 'true';
        this.choose.on("pointerdown", () => this.onSetGun());

        this.bGChoose = new Graphics();
        this.bGChoose.beginFill(0xf4b544);
        this.bGChoose.drawRoundedRect(0, 0, 150, 166);
        this.bGChoose.endFill();
        this.choose.addChild(this.bGChoose);

        this.uspS = Sprite.from(Assets.get("usp_s"));
        this.uspS.anchor.set(0.5);
        this.uspS.scale.set(3)
        this.uspS.position.set(-80, 0);
        this.choose.addChild(this.uspS);

        // this.name = new PIXI.Text(string, this.bigTextStyle);
        // this.name.anchor.set(0.5);
        // this.name.zIndex = 2;
        // this.name.position.set(-80, 0);
        // this.choose.addChild(this.name);

        this.addChild(this.choose);
    }

    // onGetGun() {
    //     this.emit("getGun", this.gun);
    // }

    // onSetGun() {
    //     this.emit("setGun", this.gun);
    // }

    _initTextBig() {
        this.bigTextStyle = new PIXI.TextStyle({
          fontFamily: "Triomphe Bold Autoinstr",
          fontSize: 25,
          fontStyle: 'bold',
          fill: ["#ffffff"],
        });
    }
}