import { Container, Graphics } from "pixi.js";
import { GameConstant } from "../gameConstant";

export class GunStoreScene extends Container{

    constructor() {
        super();
        // Add black background
        const background = new Graphics();
        background.beginFill(0x202020);
        background.drawRect(0, 0, GameConstant.GAME_WIDTH, GameConstant.GAME_HEIGHT);
        background.endFill();
        this.addChild(background);

        console.log("gun store scene");
        
    }

    
}