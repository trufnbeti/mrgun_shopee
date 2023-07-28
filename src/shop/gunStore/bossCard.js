import * as PIXI from "pixi.js";
import { Application, Assets, Container, Graphics, RenderTexture, Sprite,} from "pixi.js";
import { Gun } from "../../objects/player/gun";
import { GameConstant } from "../../gameConstant";
import { Boss } from "../../objects/enemy/boss";

export class BossCard extends Container {
    constructor(index) {
        super();  
        this.bossIndex = index;
        this._stageBoss(); // hien thi trang thai boss

        this._bossDefeat();
        this.sortableChildren = true;
        this._initBoss(index);
    }
  
    _stageBoss(){
        this.stageboss = new Container();

        this.live = Sprite.from(Assets.get("bllive"));
        this.live.scale.set(0.76);
        this.stageboss.addChild(this.live);

        this.defeated = Sprite.from(Assets.get("bldefeated"));
        this.defeated.scale.set(0.76);
        this.stageboss.addChild(this.defeated);
        this.defeated.visible = false;

        this.stageboss.position.set(0, 0);

        this.addChild(this.stageboss);
        
    }

    _bossDefeat(){
        this.defeat = Sprite.from(Assets.get("defeat"));
        this.defeat.scale.set(0.76);
        this.addChild(this.defeat);
        this.defeat.position.set(this.stageboss.x, this.stageboss.y);
        const isDefeated = localStorage.getItem(this.bossIndex);
        if(isDefeated == "true"){
            this.defeat.visible = true;
        }
        else this.defeat.visible = false;
        this.defeat.zIndex = 2;
    }

    _initBoss(indexR){
        this.boss = new Container();

        this.head = new Sprite(Assets.get('boss_head_' + indexR));
        this.head.scale.set(0.25);
        this.boss.addChild(this.head);

        this.body = new Sprite(Assets.get('boss_body_' + indexR));
        this.body.scale.set(0.25);
        this.body.y = this.head.height;
        this.head.x = 0;
        this.head.anchor.set(0.5, 0);
        this.body.anchor.set(0.5, 0);

        this.boss.addChild(this.body);

        this.boss.position.set(this.stageboss.x + this.boss.width, this.stageboss.y + (this.live.height*0.76 - this.boss.height*0.25)/2 - 20);

        this.addChild(this.boss);
    }

    _initText(names){
        this._initTextBig();

        this.name = new PIXI.Text(names, this.bigTextStyle);
        this.name.position.set(200 , this.live.height/2-13);
        this.addChild(this.name);
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