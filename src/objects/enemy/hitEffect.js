import { Graphics, Text, Ticker } from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import { Game } from "../../game";

export class HitEffect extends Graphics {
  constructor(enemy, radius) {
    super();
    this.enemy = enemy;
    this.maxRadius = radius;
    this.dt = 0;
  }

  _init() {
    this.color = this.enemy.color;

    this.text.x = 0;
    this.text.y = -20;
    
    this.alpha = 1;
    this.scale.set(1); // Kích thước ban đầu
    this.x = this.enemy.x;
    this.y = this.enemy.y;
    this.zIndex = 3;
  
    this.clear();
    this.beginFill(this.color, this.alpha);
    this.drawCircle(0, 0, 5);
    this.endFill();
  }
  

  _initEnemy(enemy) {
    this.enemy = enemy;
  }

  _initText(damage){
    this.text = new Text(damage, {fontSize: 50, fill: 0xFFFF00, fontStyle: 'bold'})
    this.text.scale.set(0.1);
    this.addChild(this.text);

  }

  playOnce() {
    const effectDuration = 300 * 1000; // Thời gian hiệu ứng (ms)
    const finalScale = this.maxRadius / 5; // Kích thước cuối cùng
    const finalAlpha = 0; // Độ mờ cuối cùng

    this._init();

    // Tạo tween mới để thay đổi giá trị scale và alpha
    new TWEEN.Tween(this)
      .to({ scale: { x: finalScale, y: finalScale }, alpha: finalAlpha }, effectDuration)
      .onUpdate(() => {

      })
      .onComplete(() => {
      })
      .start(this.dt * 1000);

    new TWEEN.Tween(this.text)
    .to({ x: this.enemy.direction * 5, y: -10}, effectDuration)
    .onUpdate(() => {

    })
    .onComplete(() => {
    })
    .start(this.dt * 1000);
  }

  update(dt) {
    this.dt += Ticker.shared.deltaMS;
    // TWEEN.update(this.dt);
    // !! ĐẶC BIỆT CHÚ Ý TWEEN ĐÃ ĐƯỢC UPDATE Ở GUN !!
  }
}
