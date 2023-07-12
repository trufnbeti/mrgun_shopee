import { Application, Assets, Container, Graphics, RenderTexture, Sprite } from "pixi.js";
import { manifest} from "./bundle/manifest";
import { GameConstant } from "./gameConstant";
import { PlayScene } from "./scenes/playScene";
import { sound } from "@pixi/sound";
import { LoadingScene } from "./scenes/loadingScene";
import { InputManager } from "./input/inputManager";

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
        viewStyle.padding = "0px 0px 0px 0px"; 

        this.loadingScene = new LoadingScene();
        this.app.stage.addChild(this.loadingScene);

        this._loadGameAssets().then((asset)=> {
            InputManager.init(this.app.view);
            this._initScene();
            this.loadingScene.destroy();
            this.startBackgroundMusic();
            this.app.ticker.maxFPS = 60;
            this.app.ticker.add(this.update, this);
        });

        this.resize();
    }

    static async _loadGameAssets() {
        await Assets.init({ manifest: manifest });
        const bundleIds = manifest.bundles.map((bundle) => bundle.name);
      
        const bundleProgress = new Array(bundleIds.length).fill(0);
        let totalProgress = 0;
      
        for (let i = 0; i < bundleIds.length; i++) {
          await new Promise((resolve) => {
            setTimeout(async () => {
              await Assets.loadBundle(bundleIds[i], (loadProgress) => {
                bundleProgress[i] = loadProgress;
                totalProgress = bundleProgress.reduce((sum, value) => sum + value, 0) / bundleIds.length;
                this.loadingScene.setProgress(totalProgress);
              });
              resolve();
            }, 300); // Delay of 1 second (1000 milliseconds)
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
        this.app.stage.removeChild(this.playScene)
        this.playScene = new PlayScene(this.app);
        this.app.stage.addChild(this.playScene);
    }

    static resize(){
        // current screen size
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        // uniform scale for our game
        const scale = Math.min(screenWidth / GameConstant.GAME_WIDTH, screenHeight / GameConstant.GAME_HEIGHT);

        // the "uniformly englarged" size for our game
        const enlargedWidth = Math.floor(scale * GameConstant.GAME_WIDTH);
        const enlargedHeight = Math.floor(scale * GameConstant.GAME_HEIGHT);

        // margins for centering our game
        const horizontalMargin = (screenWidth - enlargedWidth) / 2;
        const verticalMargin = (screenHeight - enlargedHeight) / 2;

        // now we use css trickery to set the sizes and margins
        this.app.view.style.width = `${enlargedWidth}px`;
        this.app.view.style.height = `${enlargedHeight}px`;
        this.app.view.style.marginLeft = this.app.view.style.marginRight = `${horizontalMargin}px`;
        this.app.view.style.marginTop = this.app.view.style.marginBottom = `${verticalMargin}px`;
    }
}
window.onload = function () {
    Game.init();
}
window.addEventListener("resize", (event) => {
        Game.resize()
    });
