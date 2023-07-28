import * as PIXI from "pixi.js";
import {
  Application,
  Assets,
  Container,
  Graphics,
  RenderTexture,
  Sprite,
} from "pixi.js";
import { GameConstant } from "../../gameConstant";
import * as TWEEN from "@tweenjs/tween.js";

export class Lamp extends Container{

    constructor() {
      super();
      this._initLight();
      this._initLamp(); 
      
    }

    _initLamp(){
        this.lampImg = Sprite.from(Assets.get("lamp"));
        this.lampImg.position.set((GameConstant.GAME_WIDTH - this.lampImg.width*0.6)/2, 0);
        this.lampImg.scale.set(0.6)
        this.addChild(this.lampImg);

        let moveCount = 0; // Biến đếm số lần di chuyển

    const moveTween = new TWEEN.Tween(this.lampImg.position)
        .to({ x: this.lampImg.x, y: this.lampImg.y + 10 }, 300)
        .easing(TWEEN.Easing.Quadratic.InOut);

    // Sử dụng .onComplete() để khi kết thúc một lần tween, ta sẽ gọi lại để tiếp tục di chuyển hoặc dừng.
    moveTween.onComplete(() => {
        moveCount++; // Tăng biến đếm sau mỗi lần di chuyển

        // Kiểm tra nếu đã di chuyển đủ 3 lần, thì dừng tween.
        if (moveCount >= 6) {
            moveTween.stop();
        } else {
            moveTween.yoyo(true).start(); // Di chuyển xuống 10px và sau đó quay lại 10px lên.
        }
    });

    // Bắt đầu tween ban đầu để bắt đầu di chuyển.
    moveTween.start();
    }
    _initLight() {
        this.lightImg = Sprite.from(Assets.get("light"));
        this.lightImg.position.set((GameConstant.GAME_WIDTH - this.lightImg.width*0.72)/2, 230);
        this.lightImg.scale.set(0.75)
        this.addChild(this.lightImg);
        this.lightImg.alpha = 1;

         // Tạo tween để thay đổi thuộc tính alpha của đèn sáng.
        const alphaTween = new TWEEN.Tween(this.lightImg)
        .to({ alpha: 0.3 }, 300) // Thời gian chuyển từ sáng sang tối là 300ms
        .easing(TWEEN.Easing.Quadratic.InOut);

    // Sử dụng .onComplete() để khi kết thúc một lần tween, ta sẽ gọi lại để tiếp tục nháy đèn.
        alphaTween.onComplete(() => {
            this.lightImg.alpha = 1; // Đặt lại alpha về 1 để chuẩn bị cho lần nháy tiếp theo
            this.lightCount++; // Đếm số lần nháy đèn

            // Nếu đã nhấp nháy đèn 5 lần thì không cần tiếp tục nữa.
            if (this.lightCount >= 10) {
                return;
            }

            // Tiếp tục nháy đèn bằng cách chạy tween tiếp theo.
            alphaTween.start();
        });

        // Bắt đầu tween ban đầu để bắt đầu nháy đèn.
        alphaTween.start();

        this.lightCount = 1; 
      }

      update(delta) {
        TWEEN.update();
      }
      
}