import { Container } from "pixi.js";
import { Item } from "./item";
import { GameConstant } from "../../gameConstant";
import { Util } from "../../helper/utils";

export class ItemFrame extends Container{
    constructor(type, items){
        super();
        this.type = type;
        this.itemsName = items;
        this.items = [];
        this.lockItems = [];
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
                item.bg.visible = false;
                item.position.set(100 + j  * (GameConstant.ITEM_WIDTH + 40),100 + i * (GameConstant.ITEM_HEIGHT + 40));
                if(item.isLock == "false"){
                    item.interactive = true;
                    item.cursor = "pointer";
                    item.on("pointerdown", () => this._onPointdown(item));

                }
                else {
                    item.lock.visible = true;
                    this.lockItems.push(item);
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
        item.lock.visible = false;
        localStorage.setItem(this.type, item.name);
    }

    selectItem(targetItem){
        localStorage.setItem(this.type, targetItem.name);
        localStorage.setItem(targetItem.name, false);
        targetItem.interactive = true;
        targetItem.cursor = "pointer";
        targetItem.on("pointerdown", () => this._onPointdown(targetItem));
        this._onPointdown(targetItem);
    }

    resetButton(){
       this.items.forEach(item => {
            if(item.isLock == "false"){
                item.interactive = true;
                item.cursor = "pointer";
                item.on("pointerdown", () => this._onPointdown(item));
            }
       }) 
    }

    unlockRandom(){
        const length = this.lockItems.length;
        const index = Math.floor(Util.random(0, length -1));
        this.selectItem(this.lockItems[index]);
        this.lockItems.splice(index, 1);
    }
}