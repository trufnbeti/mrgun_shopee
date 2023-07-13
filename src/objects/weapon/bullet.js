import { Container, Graphics, Sprite } from "pixi.js";

export class Bullet extends Container{
    constructor(radius, color) {
        super();
    
        // Create a PIXI.Graphics object to draw the circle
        const graphics = new Graphics();
        graphics.beginFill(color);
        graphics.drawCircle(0, 0, radius);
        graphics.endFill();
    
        // Add the graphics object to the container
        this.addChild(graphics);
    
        // Set the properties of the bullet
        this.radius = radius;
        this.color = color;
      }
}