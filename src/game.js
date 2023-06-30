import { Application, Assets, Container, Graphics, RenderTexture, Sprite } from "pixi.js";
import { manifest} from "./bundle/manifest";
import { GameConstant } from "./gameConstant";
import { PlayScene } from "./scenes/playScene";
import { sound } from "@pixi/sound";
import { LoadingScene } from "./scenes/loadingScene";

export class Game {
    static init() {
        this.app = new Application({
            width: GameConstant.GAME_WIDTH,
            height: GameConstant.GAME_HEIGHT,
            backgroundColor: 0x1099bb,
        });
        document.body.appendChild(this.app.view);
        const viewStyle = this.app.view.style;
        viewStyle.position = "absolute";
        viewStyle.display = "block";
        viewStyle.padding = "0px 300px"; 

        this.loadingScene = new LoadingScene();
        this.app.stage.addChild(this.loadingScene);

        this._loadGameAssets().then((asset)=> {
            this._initScene();
            this.loadingScene.destroy();
            this.startBackgroundMusic();
            this.app.ticker.maxFPS = 60;
            this.app.ticker.add(this.update, this);
        });
    }

    static async _loadGameAssets() {
        await Assets.init({ manifest: manifest });
        const bundleIds = manifest.bundles.map((bundle) => bundle.name);
    
        const bundleProgress = new Array(bundleIds.length).fill(0);
        let totalProgress = 0;
    
        for (let i = 0; i < bundleIds.length; i++) {
          await Assets.loadBundle(bundleIds[i], (loadProgress) => {
            bundleProgress[i] = loadProgress;
            totalProgress = bundleProgress.reduce((sum, value) => sum + value, 0) / bundleIds.length;
            this.loadingScene.setProgress(totalProgress);
          });
        }
      }

    static startBackgroundMusic() {
        sound.volumeAll = 1;
        const bgMusic = sound.find("bgMusic");
        bgMusic.volume = 0.3;
        bgMusic.autoPlay = true;
        bgMusic.play();
    }

    static update(dt){
        this.playScene.update(dt);
    }

    static _initScene() {
        this.playScene = new PlayScene(this.app);
        this.app.stage.addChild(this.playScene);
    }
}
window.onload = function () {
    Game.init();
}

// window.addEventListener("resize", (event) => {
//     Game.resize(window.innerWidth, window.innerHeight)
// });