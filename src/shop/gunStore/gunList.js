import * as PIXI from "pixi.js";
import { Application, Assets, Container, Graphics, RenderTexture, Sprite,} from "pixi.js";
import { Button, List } from '@pixi/ui';
import { GameConstant } from "../../gameConstant";

export class GunList extends List{
    constructor() {
        super({
            width: GameConstant.GAME_WIDTH - 100,
            height: GameConstant.GAME_HEIGHT /3 *2 - 300,
            vertPadding: 100,
            horPadding: 50,
        });

    }

}