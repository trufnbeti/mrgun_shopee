import { Assets, Container, Sprite } from "pixi.js";
import { Util } from "../../helper/utils";
import { GameConstant } from "../../gameConstant";

export class Decoration {
    constructor(){

    }


    random(){
        const key = Math.floor(Util.random(0, 8));
        switch (key) {
            case 1:
                return  this.addDecor("fence1");
                break;
            case 2:
                return  this.addDecor("fence2");
                break;
            case 3:
                return  this.addDecor("fence3");   
                break;             
            case 4:
                return this.addDecor("lightPole"); 
                break;
            case 5:
                return this.addDecor("pot"); 
                break;
            case 6:
                return this.addDecor("lightPole2"); 
                break;
            case 7:
                return this.addDecor("car"); 
                break;
            default:
                break;
        }
    }

    addDecor(name){
        const decor =  Sprite.from(Assets.get(name));
        return decor;
    }
}