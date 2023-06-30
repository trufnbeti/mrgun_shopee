import { Application, Assets, Container, Graphics, RenderTexture, Sprite } from "pixi.js";
import * as PIXI from "pixi.js";
import { PlayScene } from "../scenes/playScene";
import { GameConstant } from "../gameConstant";
import { MenuUI } from "./menuUI";

export class Menu extends Container{
    constructor() {
        super();

        this.menuUI = new MenuUI();
        this.addChild(this.menuUI);
        this.sortChildren();       

    }

    update(delta) {
        this.menuUI.update(delta);
    }
        
}