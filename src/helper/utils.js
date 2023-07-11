export class Util {
    static random(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    static AABBCheck(x1, y1, w1, h1, x2, y2, w2, h2) {
      return ((x1 < x2 + w2) && (x1 + w1 > x2) && (y1 < y2 + h2) && (y1 + h1 > y2));
    }
  
    static registerOnPointerDown(displayObject, onPointerDown, context) {
      displayObject.interactive = true;
      displayObject.on("pointerdown", onPointerDown, context);
    }

    static checkCollision(objA, objB) {
        var a = objA.getBounds();
        var b = objB.getBounds();
    
        var rightmostLeft = a.left < b.left ? b.left : a.left;
        var leftmostRight = a.right > b.right ? b.right : a.right;
    
        if (leftmostRight <= rightmostLeft) {
            return false;
        }
    
        var bottommostTop = a.top < b.top ? b.top : a.top;
        var topmostBottom = a.bottom > b.bottom ? b.bottom : a.bottom;
    
        return topmostBottom > bottommostTop;
    }
    
    static randomColor(){
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        return `rgb(${red}, ${green}, ${blue})`;
    }
  }