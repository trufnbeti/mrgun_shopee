import { Container } from "pixi.js";
import { Game } from "../game";
import { HitEffect } from "../objects/enemy/hitEffect";
import { HeadshotEffect } from "../objects/effect/headshotEffect";
import { sound } from "@pixi/sound";
import { BulletManagerEvent } from "./bulletManager";


export class EffectManager extends Container{
    constructor(map, player, enemyManager){
        super();
        this.map = map;
        this.player = player;
        this.enemy = enemyManager.enemy;
        this._init();

        this.on(BulletManagerEvent.HitEnemyBody, this.onBodyHit);
        this.on(BulletManagerEvent.HitEnemyHead, this.onHeadHit);
        this.on(BulletManagerEvent.HitPlayer, this.onPlayerHit);
    }
    _init(){
        this.hitBodyEffect = new HitEffect(this.enemy, 40);
        this.map.addChild(this.hitBodyEffect);

        this.hitHeadEffect = new HitEffect(this.enemy, 70);
        this.map.addChild(this.hitHeadEffect);

        
        this.headshotEffect = new HeadshotEffect();
        this.addChild(this.headshotEffect);

        this._initText();
    }
    _initText(){        
        this.hitBodyEffect._initText(this.player.gun.damage);
        this.hitHeadEffect._initText(this.player.gun.damage*2);
    }

    _onHitEnemyHead(){
        this.emit(BulletManagerEvent.HitEnemyHead);
    }
    _onHitEnemyBody(){
        this.emit(BulletManagerEvent.HitEnemyBody);
    }
    _onHitPlayer(){
        this.emit(BulletManagerEvent.HitPlayer);
    }

    onHeadHit(){
        this.enemy = Game.playScene.bulletManager.enemyManager.enemy;
        this.hitHeadEffect._initEnemy(this.enemy);
        this.hitHeadEffect.playOnce();

        this.headshotEffect._onHeadshot();

        sound.play("hitSound");
        sound.play("headshotSound");
    }

    onBodyHit(){
        this.enemy = Game.playScene.bulletManager.enemyManager.enemy;
        this.hitBodyEffect._initEnemy(this.enemy);
        this.hitBodyEffect.playOnce();

        sound.play("hitSound");
    }

    onPlayerHit(){
        this.hitHeadEffect._initEnemy(this.player);
        this.hitHeadEffect.playOnce();

        sound.play("hitSound");
    }

    updateHeadshotCount(){
        this.headshotEffect.updateText();
        this.headshotEffect.count ++;
    }

    resetHeadshotCount(){
        this.headshotEffect.count = 0;
        this.headshotEffect.updateText();
    }

    updateText(){
        this.hitBodyEffect.updateText(this.player.gun.damage);
        this.hitHeadEffect.updateText(this.player.gun.damage*2);
    }

    update(dt){
        this.hitBodyEffect.update(dt);
        this.hitHeadEffect.update(dt);
        this.headshotEffect.update(dt);
    }
} 