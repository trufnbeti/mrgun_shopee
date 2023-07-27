import * as PIXI from "pixi.js";
import { Application, Assets, Container, Graphics, RenderTexture, Sprite,} from "pixi.js";
import { Button, ScrollBox } from '@pixi/ui';
import { GameConstant } from "../../gameConstant";
import { BossCard, ItemsCard } from "./bossCard";

export class BlackList extends ScrollBox {
    constructor() {
        super({
            width: GameConstant.GAME_WIDTH ,
            height: GameConstant.GAME_HEIGHT - 470,
            elementsMargin: 22,
            vertPadding: 0,
        });

        this._initProperties();
        this._initName();
        
        this._initBossCard();

    }

    _initProperties() {
        this.position.set(105, 260);

    }

    _initBossCard() {
        for (let i = 1; i < 23; i++) {

            this.bossCard = new BossCard();
            
            this.bossCard._initBoss(i);
            this.bossCard._initText(this.names[i-1]);

            this.addItem(this.bossCard);
        }
    }

    _initName(){
        this.names = [
            "KALISTA",
            "LEE SIN",
            "LISSANDRA",
            "KATARINA",
            "KENNEN",
            "MALZAHAR",
            "MISS FORTUNE",
            "MASTER YI",
            "MORDEKAISER",
            "NOCTURNE",
            "NAUTILUS",
            "OLAF",
            "QUINN",
            "POPPY",
            "TRYNDAMERE",
            "SORAKA",
            "TAHM KENCH",
            "SKARRAR",
            "S",
            "VEIGAR",
            "WARWICK",
            "YASUO",
            "ZAC",
            "ZYRA",
            "Ziggs",
            "YONE"
            ];
    }

}