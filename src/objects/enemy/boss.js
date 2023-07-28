import { Assets, Container, Graphics, Sprite, Ticker } from "pixi.js";
import { Enemy } from "./enemy";
import { GameConstant } from "../../gameConstant";
import { Util } from "../../helper/utils";
import { Weapon } from "../weapon/weapon";

export class Boss extends Enemy{
    constructor(x, y, direction, maxX){
        super();
        this._init(x, y, direction, maxX);
    }
    _init(x, y, direction, maxX){
        this.name = "Boss";
        this.direction = direction;
        this.maxX = maxX + this.width/2;
        this.hp = 50;
        this.maxHp = 50;
        this._initBody();
        this.weapon =new Weapon(Assets.get('USP-S'))
        this.position.set(x, y - this.height / 2);
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        this.pivot.set(centerX, centerY);
        this.equipWeapon();
        this.head.scale.x *= direction;
        this.body.scale.x *= direction;
        this.weapon.sprite.scale.x *= direction;
        this.isJumping = false;
        this.gravity = 0.98;
        this.power = 20;
        this.timer = 0;
        this.angleRotation = 20;
        this._initAbility();
    }
    _initBody(){
        let indexR = Math.floor(Math.random() * 22) + 1;
        this.head = new Sprite(Assets.get('boss_head_' + indexR));
        this.body = new Sprite(Assets.get('boss_body_' + indexR));
        this.head.anchor.set(0.5, 0);
        this.body.anchor.set(0.5, 0);
        this.head.scale.set(0.25);
        this.body.scale.set(0.25);
        this.body.y = this.head.height;
        this.head.x = 0;
        this.addChild(this.head, this.body);
        this.index = indexR;
    }
    _initAbility(){
        this.appeared = false;
        this.speed = 5;
        this.isMoving = false;
        this.needFlip = false;
        this.canJump = true;
        this.Jumping = false;
        this.maxJumpForce = 8;
        this.jumpForce = this.maxJumpForce;
        this.minY = this.y;
        
        this.color = Util.randomColor();

    }
    update(dt){
        super.update(dt);
        if(this.destroyed) return;
        this.timer += dt;
        if(!this.appeared)this.move(dt);
        else this.move2(dt);
    }
    
    takeDmg(amout){
        this.hp -= amout;
    }
    move(dt){
        if (this.timer > 1){
            this.rotate();
            this.timer = 0;
        }
        if (this.direction == -1)
            if (this.x > this.maxX){
                this.x -= this.speed * dt;
            }
            else{
                this.angle = 0;
                this.appeared = true;
            }
                
        if (this.direction == 1)
            if (this.x < this.maxX){
                this.x += this.speed * dt;
            }
            else{
                this.angle = 0;
                this.appeared = true;
            }
                

        if (this.isJumping) return;
        const jumpAt = this.y;
        this.isJumping = true;
        let time = 0;

        const tick = deltaMs => {
            const jumpHeight = (-this.gravity / 2) * Math.pow(time, 2) + this.power * time;

            if (jumpHeight < 0) {
                this.y = jumpAt;
                this.gravity = 0.3;
                Ticker.shared.remove(tick);
                return;
            }

            this.y = jumpAt - jumpHeight;
            time += deltaMs;
        }

        Ticker.shared.add(tick);
    }
    rotate(){
        this.angle += this.angleRotation;
    }
    equipWeapon(){            
    
        this.weapon.x = 0;
        this.weapon.y = this.height / 2;
        
        this.addChild(this.weapon);
    }

    ///// di chuyển và nhảy trên map - copy từ player 

    move2(dt) {
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
                    if (this.canJump && !this.Jumping) {
                        this.Jumping = true; // biến thể hiện đang nhảy
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
            }
            
        } 
    }
    
    jump(dt) {
        if (this.Jumping) {
            this.x += this.direction * this.speed * dt * 0.4;
            this.y += this.gravity*dt;
            this.gravity += 0.1*dt;
            if (this.jumpForce > 0) {
                this.jumpForce -= this.gravity*dt;
                this.y -= this.jumpForce*dt;
                if(this.y > this.minY) this.y = this.minY;
            } else {
                this.Jumping = false;
            }
        } else {
            this.jumpStep -= 1;
            this.canJump = true;
            this.gravity = 0.3;
            this.y = this.minY;
        }
    }
    
    calPath(nextStair){
        if(this.hp <= 0) return;
        const width = GameConstant.GAME_WIDTH;
        const size = GameConstant.Step_Size;
        const wallDistance = this.direction === 1 ? this.x : width-this.x + this.width/2;
        this.path2 = size + this.width/2;
        this.jumpStep = nextStair.stepNumber;
        this.path1 = width - wallDistance - nextStair.stepNumber * size*3;
        this.needFlip = true;
    }
    flip(){
        this.direction = this.direction == 1 ? -1 : 1;
        this.head.scale.x *= -1;
        this.body.scale.x *= -1;
        this.weapon.sprite.scale.x *= -1;
        this.weapon.x = 0;
    }
}