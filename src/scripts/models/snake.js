const snakeSpeed = 2;
/**
 * Constructor for Snake Object.
 * @param {*} x 
 * @param {*} y 
 * @param {*} isTail 
 */
function Snake(x,y) {
    this.x = x;
    this.y = y;
    this.prevX = -1;
    this.prevY = -1;
    this.row = y;
    this.collumn = x;
    this.xSize =  10;
    this.ySize = 10;
    this.size = 10;
    this.snakeSpeed = 2;
    this.neck = false;
    this.tail = true;
    this.boundingBox = new BoundingBox(this.x, this.y, this.xSize, this.ySize);
    this.collidable = true;
}

Snake.prototype.updatePosition = function(xNew,yNew) {
    this.prevX = this.prevX !== this.x ? this.x : this.prevX;
    this.prevY = this.prevY !== this.y ? this.y : this.prevY;
    this.x = xNew;
    this.y = yNew;
    this.boundingBox.updateBounds(this.x, this.y);
}

function BoundingBox(x,y, xSize, ySize) {
    this.x = x;
    this.y = y;
    this.centerX = parseFloat(this.x + xSize / 2);
    this.centerY = parseFloat(this.y + ySize / 2);
    this.xSize = xSize;
    this.ySize = ySize;
    this.xMin = x;
    this.xMax = x + xSize;
    this.yMin = y;
    this.yMax = y + ySize;
}

BoundingBox.prototype.intersects = function(boundingBox) {
    if (boundingBox) {
        return this.xMin < boundingBox.xMax && this.xMax > boundingBox.xMin && this.yMax > boundingBox.yMin && this.yMin < boundingBox.yMax;
    }
    return false;
}

BoundingBox.prototype.updateBounds = function(x,y) {
    this.x = x;
    this.y = y;
    this.centerX = parseFloat(this.x + this.xSize / 2);
    this.centerY = parseFloat(this.y + this.ySize / 2);
    this.xMin = x;
    this.xMax = x + this.xSize;
    this.yMin = y;
    this.yMax = y + this.ySize;
}

/**
 * Constructor for SnakeHandler Object.
 * @param {*} context 
 * @param {*} snakeCordSize 
 */
function SnakeHandler(context,snakeCordSize,) {

    this.snakeDead = false;
    this.context = context
    this.snakeSize = 0;
    this.snakeCordSize = snakeCordSize;
    this.moveBuffer = null;
    this.snakeParts = null;
    this.skipCycles = 0;

    /**
     * Initalizes handler for the snake
     * @param {*} snakeSpeed speed of the snake. currently a constant
     * @param {*} x x location
     * @param {*} y y location
     */
    this.init = (snakeSpeed, x,y) =>{
        this.moveBuffer = [];
        this.snakeParts = [];
        var part = this.addHead(x,y);
        part = this.growBody(x, y); //neck to avoid collisions when turning
        part.neck = true;
    }

    /**
     * Adds the head to the snake. done on intialization. should only be called once per snake game.
     * @param {*} x x location
     * @param {*} y y location
     * @returns 
     */
    this.addHead = (x,y) => {
        var head = this.addBody(x,y);
        head.prevX = x + snakeSpeed;
        head.prevY = head.y;
        return head;
    }

    /**
     * Adds a body component. This is without growing animations. should not call.
     * @param {*} x x location
     * @param {*} y y location
     * @returns snake body part
     */
    this.addBody = (x,y, ) =>{ 
        this.snakeSize++;
        var newPart = new Snake(x,y);
        var tail = this.getSnakeTail();
        if (this.snakeParts.length > 0) {
            if (this.moveBuffer !== undefined){
                for (var i = 0; i < Math.floor(this.snakeCordSize / snakeSpeed); i++){
                    this.moveBuffer.push({dirUnitX: 0, dirUnitY : 0});     
                }
            }
        }
        this.snakeParts.push(newPart);
        return newPart;
    }

    /**
     * Grows the body by adding a body part to the snake and handling mathmatical data handling for animations on the body part.
     * @param {*} x x location
     * @param {*} y y location
     * @returns snake body part
     */
    this.growBody = (x,y) => {
        var tail = this.getSnakeTail();
        var tailVector = [(tail.prevX - tail.x) / snakeSpeed, (tail.prevY - tail.y) / snakeSpeed];
        tail = this.addBody(x ,y);
        tail.prevX = tail.x + tailVector[0];
        tail.prevY = tail.y + tailVector[1];
        tail.collidable = false;
        return tail;
        //console.log(`Old position: ${x},${y}. New Position: ${tail.x}, ${tail.y}`);
    }

    /**
     * 
     * @param {*} snake 
     * @param {*} snakeTail 
     * @param {*} dirUnitX 
     * @param {*} dirUnitY 
     * @param {*} foodHandler 
     * @param {*} context 
     */
    this.moveSnake = (snake, snakeTail, dirUnitX, dirUnitY, foodHandler, context) => {
       if (this.snakeDead === false) {
            if (isNaN(dirUnitX) || isNaN(dirUnitY)) return;
            dirUnitX *= snake.snakeSpeed;
            dirUnitY *= snake.snakeSpeed;
            this.moveBuffer.unshift({dirUnitX,dirUnitY}); // add move to buffer
            if (checkCollisionOnSelf(dirUnitX, dirUnitY, snake, this.snakeParts,context)) {
                var x = snake.x + dirUnitX;
                var y = snake.y + dirUnitY;
                console.log("Snake hit itself at : " + x + "," + y);
                this.snakeDead = true;
                return;   
            }

            for (let i = 0; i < this.snakeParts.length; i++) {
                var part = this.snakeParts[i];
                if (part != null) {
                    if (this.snakeParts.length > 0 && i + 1 === this.snakeParts.length && !part.neck) {
                        part.collidable = !(this.moveBuffer[i* part.size / snakeSpeed]['dirUnitX'] === 0 && this.moveBuffer[i * part.size / snakeSpeed]['dirUnitY'] === 0)
                    }
                    part.updatePosition(part.x + this.moveBuffer[i* part.size / snakeSpeed]['dirUnitX'], part.y + this.moveBuffer[i * part.size / snakeSpeed]['dirUnitY'])
                }
            }
            this.moveBuffer.pop();
            return;
        }
        
    }

    /**
     * 
     * @returns Snake head. If only one snake part then head and tail are the same object.
     */
    this.getSnakeHead = () => {
        return this.snakeParts && this.snakeParts.length > 0 ? this.snakeParts[0] : null;
    }

    /**
     * 
     * @returns Snake tail. If only one snake part then head and tail are the same object.
     */
    this.getSnakeTail = () => {
        return this.snakeParts && this.snakeParts.length > 0 ? this.snakeParts[this.snakeParts.length - 1] : null;
    }

    /**
     * 
     * @param {*} snakeHead 
     * @param {*} snakeTail 
     */
    this.render = () =>{
        var snakeHead = this.getSnakeHead();
        var snakeTail = this.getSnakeTail();
        
        this.context.clearRect(snakeHead.prevX, snakeHead.prevY , snakeHead.xSize, snakeHead.ySize);
        this.context.fillStyle = "green";
        this.context.fillRect(snakeHead.prevX, snakeHead.prevY , snakeHead.xSize, snakeHead.ySize);
        this.clearTail(snakeTail.x + (snakeTail.prevX - snakeTail.x),snakeTail.y + (snakeTail.prevY - snakeTail.x),snakeTail.xSize,snakeTail.ySize);
        if (this.getSnakeHead() !== this.getSnakeTail()) {
            this.context.fillRect(snakeTail.x,snakeTail.y, snakeTail.xSize,snakeTail.ySize);
            this.context.fillStyle = "yellow";
            //console.log(`${snakeTail.x + (snakeTail.prevX - snakeTail.x)},${snakeTail.y + (snakeTail.prevY - snakeTail.x)}`)
            this.clearTail(snakeTail.x + (snakeTail.prevX - snakeTail.x) * snakeTail.xSize / snakeSpeed,snakeTail.y + (snakeTail.prevY - snakeTail.y) * snakeTail.ySize / snakeSpeed,snakeTail.xSize,snakeTail.ySize); 
        }
        this.context.fillStyle = "red";
        this.context.fillRect(snakeHead.x,snakeHead.y, snakeHead.xSize,snakeHead.ySize);
    }

    /**
     * 
     * @param {*} x x location
     * @param {*} y y location
     * @param {*} xSize size of x component
     * @param {*} ySize size of y component
     */
    this.clearTail = (x,y,xSize,ySize) => {
        this.context.clearRect(x,y,xSize,ySize);
    }

}
