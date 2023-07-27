import { Assets, Container } from "pixi.js";
import particleSettings from "../../../assets/json/emitterDust.json"
import { Emitter, upgradeConfig } from "@pixi/particle-emitter";

export class DustEffect extends Container{
    constructor(){
        super();
        this.texture = Assets.get("dust");
        this.emitterDust = new Emitter(this, upgradeConfig(particleSettings, [this.texture]));
        this.emitterDust.autoUpdate = true;
        this.emitterDust.emit = false;

        // Đảo ngược hướng chạy của Emitter
        this.emitterDust.rotation = Math.PI;
    }

    play(){
        // Điều chỉnh vị trí của Emitter để xuất hiện từ phía sau nhân vật
        const distanceBehindPlayer = 20; // Điều chỉnh khoảng cách bụi xuất hiện phía sau nhân vật
        this.position.set(- this.parent.direction * distanceBehindPlayer, 55);
        
        this.emitterDust.emit = true;
    }
}