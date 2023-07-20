import * as PIXI from "pixi.js";
import { Application, Assets, Container, Graphics, RenderTexture, Sprite,} from "pixi.js";
import { Button, List } from '@pixi/ui';
import { GameConstant } from "../../gameConstant";
import { GunCard } from "./gunCard";

export class GunList extends List {
    constructor() {
        super({
            width: GameConstant.GAME_WIDTH / 2,
            height: GameConstant.GAME_HEIGHT / 3 * 2,
            vertPadding: 100,      // Set the vertical padding between items
            horPadding: 50,
            type: ['vertical'],
        });

        this._initProperties();
    }

    _initProperties() {
        this.position.set(20, GameConstant.GAME_HEIGHT / 3);
    }


}
