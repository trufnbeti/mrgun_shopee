import { Assets, Container } from "pixi.js";
import particleSettings from "../../../assets/json/emitter.json"
import { Emitter, upgradeConfig } from "@pixi/particle-emitter";

export class ShootingEffect extends Container{
    constructor(){
        super();
        this.texture = Assets.get("shooting_particle");
        this.emitter = new Emitter(this, upgradeConfig(particleSettings, [this.texture]));
        this.emitter.autoUpdate = true;
        this.emitter.emit = false;
    }
    _init(){
        
    }
    play(){
        this.beta = this.parent.direction == -1 ? this.parent.currentAnlge : Math.PI - this.parent.currentAnlge;
        this.x =  this.parent.direction*this.parent.sprite.width/2*Math.cos(this.beta*Math.PI/180);
        this.y =  this.parent.direction*this.parent.sprite.width/2*Math.sin(this.beta*Math.PI/180);
        this.emitter.emit = true;
    }
}