import { Container } from "pixi.js";

export class GunUI extends Container{

    constructor(parent) {
        super();

        this._init();
    }

    _init(){
        // Tạo container để chứa các button
        this.buttonContainer = new Container();
        this.addChild(this.buttonContainer);
    
        // Button 'ak'
        this.buttonBlacklist = Sprite.from(Assets.get("blacklist"));
        this.buttonBlacklist.x = 0;
        this.buttonBlacklist.scale.set(130 / this.buttonBlacklist.width);
        this.buttonContainer.addChild(this.buttonBlacklist);
    
        // Button 'aug'
        this.buttonOutfits = Sprite.from(Assets.get("outfits"));
        this.buttonOutfits.x = this.buttonBlacklist.width + 40; // Khoảng cách giữa các button
        this.buttonOutfits.scale.set(130 / this.buttonOutfits.width);
        this.buttonContainer.addChild(this.buttonOutfits);
    
        // Button 'desert_eagle'
        this.buttonGuns = Sprite.from(Assets.get("gunstore"));
        this.buttonGuns.x = this.buttonOutfits.x + this.buttonOutfits.width + 40; // Khoảng cách giữa các button
        this.buttonGuns.scale.set(130 / this.buttonGuns.width);
        this.buttonContainer.addChild(this.buttonGuns);
    

        // Thiết lập vị trí và căn giữa container chứa các button
        this.buttonContainer.x = 60;
        this.buttonContainer.y = 520;
    }
    
}