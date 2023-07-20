import { Container } from "pixi.js";
import { Item } from "./item";
import { GameConstant } from "../../gameConstant";

export class ItemFrame extends Container{
    constructor(type, items){
        super();
        this.type = type;
        this.itemsName = items;
        this.items = [];
        this.y = 400;
        this._init();
    }
    _init(){
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                const k = i * 3 + j;
                let item = new Item(this.itemsName[k]);
                this.addChild(item);
                this.items.push(item);

                item.position.set(100 + j  * (GameConstant.ITEM_WIDTH + 40),100 + i * (GameConstant.ITEM_HEIGHT + 40));
                
                // console.log(item.isLock);
                if(item.isLock){
                    item.interactive = true;
                    item.cursor = "pointer";
                    item.on("pointerdown", () => this._onPointdown(item));
                }
            }
        }

        const targetName = localStorage.getItem(this.type);
        const targetItem = this.items.find(item => item.name === targetName);
        targetItem.bg.visible = true;
        targetItem.lock.visible = false;
    }
    _onPointdown(item){
        this.items.forEach(item => {
            item.bg.visible = false;
        });
        item.bg.visible = true;
        localStorage.setItem(this.type, item.name);
    }
}