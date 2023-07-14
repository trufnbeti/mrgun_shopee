import { Assets, Container, Graphics, Sprite, Text } from "pixi.js";

export class GunCard extends Container {
    constructor(skin) {
        super();     
        this._initProperties(skin);
        this._initSprite();
    }

    _initProperties(skin) {
        this.skin = skin;
        this.texture = this.skin.texture1;
        this.enabled = this.skin.enabled;
    }

    _initSprite(i) {
        this._initBGChoose();
        this._initLineClose();
        this._initLineOpen();

        if(i == 0) {
            this.choose.visible = false;
            this.open.visible = false;
            this.close.visible = true;
        }else if (i == 1) {
            this.choose.visible = false;
            this.open.visible = true;
            this.close.visible = false;
        }else if (i == 2){
            this.choose.visible = true;
            this.open.visible = false;
            this.close.visible = false;
        }
    }

    //Add color for item open
    _initLineOpen(){
        this.open = new Container();
        this.open.cursor = "pointer";
        this.open.eventMode = 'static';
        this.open.on("pointerdown", () => this.onSetGun());

        this.lineOpen = new Graphics();
        colorLine = 0xf4b544;
        lineOpen.lineStyle(10, colorLine); // Đặt độ rộng và màu sắc của viền
        lineOpen.drawRoundedRect(w, h, 150, 166, 17);
        this.open.addChild(lineOpen);

        this.uspS = Sprite.from(Assets.get("usp_s"));
        this.uspS.anchor.set(0.5);
        this.uspS.scale.set(3)
        this.uspS.position.set(-80, 0);
        this.open.addChild(this.uspS);

        this._initTextBig();
        this.name = new PIXI.Text(string, this.bigTextStyle);
        this.name.anchor.set(0.5);
        this.name.zIndex = 2;
        this.name.position.set(-80, 0);
        this.open.addChild(this.name);
    }

    ///Add color for item close
    _initLineClose(){
        this.close = new Container();
        this.close.cursor = "pointer";
        this.close.eventMode = 'static';
        this.close.on("pointerdown", () => this.onSetGun());

        this.lineClose = new Graphics();
        lineClose.lineStyle(10, 0x646464); // Đặt độ rộng và màu sắc của viền
        lineClose.drawRect(w, h, 150, 166);
        this.close.addChild(lineClose);

        this.uspS = Sprite.from(Assets.get("usp_s"));
        this.uspS.anchor.set(0.5);
        this.uspS.scale.set(3)
        this.uspS.position.set(-80, 0);
        this.close.addChild(this.uspS);

        this._initTextBig();
        this.name = new PIXI.Text(string, this.bigTextStyle);
        this.name.anchor.set(0.5);
        this.name.zIndex = 2;
        this.name.position.set(-80, 0);
        this.close.addChild(this.name);
        
        this.addChild(this.close);
    }

    // Add color for item choose
    _initBGChoose(){
        this.choose = new Container();
        this.choose.cursor = "pointer";
        this.choose.eventMode = 'static';
        this.choose.on("pointerdown", () => this.onSetGun());

        this.bGChoose = new Graphics();
        colorFill = 0xf4b544;
        bGChoose.beginFill(colorFill);
        bGChoose.drawRect(w, h, 150, 166);
        bGChoose.endFill();
        this.addChild(bGChoose);

        this.uspS = Sprite.from(Assets.get("usp_s"));
        this.uspS.anchor.set(0.5);
        this.uspS.scale.set(3)
        this.uspS.position.set(-80, 0);
        this.choose.addChild(this.uspS);

        this._initTextBig();
        this.name = new PIXI.Text(string, this.bigTextStyle);
        this.name.anchor.set(0.5);
        this.name.zIndex = 2;
        this.name.position.set(-80, 0);
        this.choose.addChild(this.name);
        
        this.addChild(this.choose);
    }

    onGetGun() {
        this.emit("getGun", this.gun);
    }

    onSetGun() {
        this.emit("setGun", this.gun);
    }

    _initTextBig() {
        this.bigTextStyle = new PIXI.TextStyle({
          fontFamily: "Triomphe Bold Autoinstr",
          fontSize: 25,
          fontStyle: 'bold',
          fill: ["#ffffff"],
        });
    }
}