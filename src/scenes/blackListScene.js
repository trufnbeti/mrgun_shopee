import { Container, Graphics } from "pixi.js";
import { GameConstant } from "../gameConstant";

export class BlackListScene extends Container{

    constructor() {
        super();
        console.log("black list scene");
        this._initBackGround();

    }

    _initTextTitle(){
        this.textTitle = new PIXI.Text() 
    }

    _initBackGround(){
        // Add black background
        const background = new Graphics();
        background.beginFill(0x202020);
        background.drawRect(0, 0, GameConstant.GAME_WIDTH, GameConstant.GAME_HEIGHT);
        background.endFill();
        this.addChild(background);
    }

    _initTextSmall() {
        this.smallTextStyle = new PIXI.TextStyle({
          fontFamily: "Century Gothic",
          fontSize: 35,
          // fontStyle: 'italic',
          fontWeight: "bold",
          fill: ["#ffffff"],
        });
      }
    
}