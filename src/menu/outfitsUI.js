import { Container } from "pixi.js";

export class OutfitsUI extends Container{

    constructor() {
        super();
        
        this.OutfitsUI = new PIXI.Container();

        this.smallTextStyle = new PIXI.TextStyle({
            fontFamily: 'Arial Black',
            fontSize: 25,
            // fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff'],
        });

        this.outfitText = new PIXI.Text("OUTFITS", this.smallTextStyle);
        this.outfitText.anchor.set(0.5);
        this.outfitText.zIndex = 2;
        this.outfitText.interactive = true;
        this.OutfitsUI.addChild(this.outfitText);

        this.OutfitsUI.position.set(600 / 2, 700 / 2);

        this.addChild(this.OutfitsUI);
        
    }

}