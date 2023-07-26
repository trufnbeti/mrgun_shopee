import { Assets, Container, Graphics, Sprite, Ticker } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { Gun } from "./gun";
import { sound } from "@pixi/sound";

export class Player extends Container {
    constructor(parent){
        super();
        this.parent = parent;
        this._initAbility();
        this._initCharacter();
        this._initGun();
    }
    _initCharacter(){
        this.sortableChildren = true;
        let outfitName = localStorage.getItem('outfit');
        if(outfitName == null){
            outfitName = "CLASSIC";
            localStorage.setItem('outfit', outfitName);
        } 
        localStorage.setItem(outfitName, false);
        this.removeChild(this.sprite);
        this.sprite = Sprite.from(outfitName);
        this.sprite.scale.x *= this.direction
        this.sprite.anchor.set(0.5, 0);
        this.addChild(this.sprite);
    }
    _initGun(){
        let gunName = localStorage.getItem('gun');
        if(gunName == null){
            gunName = "AUG";
            localStorage.setItem('gun', gunName);
        } 
        localStorage.setItem(gunName, false);
        this.removeChild(this.gun);
        this.gun = new Gun(this, gunName);
        this.gun.zIndex = 1;
    }
    _initAbility(){
        this.x = GameConstant.GAME_WIDTH/2;
        this.y = this.parent.stairs[0].y + 50 - 55;
        this.zIndex = 1;
        this.color = 0xFF0000;
        this.direction = -1;
        this.speed = 5;
        this.isMoving = false;
        this.needFlip = false;
        this.canJump = true;
        this.isJumping = false;
        this.maxJumpForce = 8;
        this.jumpForce = this.maxJumpForce;
        this.minY = this.y;
        this.gravity = 0.3;

        this.hp = 5;
    }

    onPointerDown(dt){
        if(!this.gun.isShot)
            this.gun.shoot(dt);
    }

    update(delta){
        this.move(delta);
        this.gun.update(delta);
        this.sprite.scale.x = this.direction === 1 ? 1 : -1
    }

    move(dt) {
        // Còn đoạn đường thứ 2 chưa đi thì tiếp tục di chuyển
        if (this.path2 > 0) {
            this.isMoving = true; // biến này hiện tại chưa sử dụng sau này để thêm đk cho player không thể bắn khi đang di chuyển
            if (this.path1 > 0) {
                // Đi đoạn đường thứ 1 trước
                this.path1 -= this.speed * dt;
                this.x += this.direction * this.speed * dt;
            } else {
                //Sau khi đi xong thì bắt đầu nhảy
                if (this.jumpStep > 0) {
                    if (this.canJump && !this.isJumping) {
                        this.isJumping = true; // biến thể hiện đang nhảy
                        this.canJump = false; // biến thể hiện rằng nhân vật sẵn sàng đê nhảy
                        this.minY = this.y - GameConstant.Step_Size;
                        this.jumpForce = this.maxJumpForce; // Reset jump force when starting a new jump
                    }
                    this.jump(dt);
                } else { 
                    this.path2 -= this.speed * dt;
                    this.x += this.direction * this.speed * dt;
                }
            }
            
        } else{
            if (this.needFlip) {
                this.flip();
                this.needFlip = false;
                this.isMoving = false;
                this.gun.isShot = false;
            }
            
        } 
    }
    
    jump(dt) {
        if (this.isJumping) {
            this.x += this.direction * this.speed * dt * 0.4;
            this.y += this.gravity*dt;
            this.gravity += 0.1*dt;
            if (this.jumpForce > 0) {
                this.jumpForce -= this.gravity*dt;
                this.y -= this.jumpForce*dt;
                if(this.y > this.minY) this.y = this.minY;
            } else {
                this.isJumping = false;
            }
        } else {
            this.jumpStep -= 1;
            this.canJump = true;
            this.gravity = 0.3;
            this.y = this.minY;
            sound.play("jumpSound");
        }
    }
    
    calPath(nextStair){
        const width = GameConstant.GAME_WIDTH;
        const size = GameConstant.Step_Size;
        const wallDistance = this.direction === 1 ? this.x : width-this.x;
        this.path2 = nextStair.stepNumber * size;
        this.jumpStep = nextStair.stepNumber;
        this.path1 = width - wallDistance - this.path2*3;
        this.needFlip = true;
    }
    flip(){
        this.direction = this.direction == 1 ? -1 : 1;
    }
 
}