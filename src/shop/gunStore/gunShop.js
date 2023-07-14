import * as PIXI from "pixi.js";
import { Application, Assets, Container, Graphics, RenderTexture, Sprite,} from "pixi.js";
import { Button, ScrollBox } from '@pixi/ui';
import { GameConstant } from "../../gameConstant";
import { ItemsCard } from "./gunCard";

export class GunShop extends ScrollBox {
    constructor() {
        super({
            width: GameConstant.GAME_WIDTH * 3,
            height: GameConstant.GAME_HEIGHT /3 *2 - 300,
            vertPadding: 180,
            horPadding: 20,
        });

    }

}