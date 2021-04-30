const snakeSpeed = 2;
/**
 * Constructor for Snake Object.
 * @param {*} x 
 * @param {*} y 
 * @param {*} isTail 
 */
function Snake(x,y,isTail) {
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.row = y;
    this.collumn = x;
    this.xSize = 10;
    this.ySize = 10;
    this.snakeSpeed = 2;
    this.tail = isTail;
    this.boundingBox = new BoundingBox(this.x, this.y, this.xSize, this.ySize);
}

Snake.prototype.updatePosition = function(xNew,yNew) {
    this.prevX = this.x;
    this.prevY = this.y;
    this.x = xNew;
    this.y = yNew;
    this.boundingBox.updateBounds(this.x, this.y);
}

function BoundingBox(x,y, xSize, ySize) {
    this.x = x;
    this.y = y;
    this.centerX = this.x + xSize / 2;
    this.centerY = this.y + ySize / 2;
    this.xMin = x;
    this.xMax = x + xSize;
    this.yMin = y;
    this.yMax = y + ySize;
}

BoundingBox.prototype.intersects = function(boundingBox) {
    if (boundingBox) {
        //console.log([this.xMin, boundingBox.xMin, this.xMax, boundingBox.xMax, this.yMin, boundingBox.yMin, this.yMax, boundingBox.yMax]);
        return this.xMin <= boundingBox.xMax && this.xMax >= boundingBox.xMin && this.yMax >= boundingBox.yMin && this.yMin <= boundingBox.yMax;
    }
    return false;
}

BoundingBox.prototype.updateBounds = function(x,y) {
    this.x = x;
    this.y = y;
    this.centerX = this.x + this.xSize / 2;
    this.centerY = this.y + this.ySize / 2;
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
function SnakeHandler(context,snakeCordSize) {

    this.snakeDead = false;
    this.context = context
    this.snakeSize = 0;
    this.snakeCordSize = snakeCordSize;
    this.moveBuffer = null;
    this.snakeParts = null;
    this.skipCycles = 0;
    /**
     * 
     * @param {*} snakeSpeed 
     */
    this.init = (snakeSpeed) =>{
        this.moveBuffer = new Array(this.snakeCordSize * this.snakeSize); // this is equal to the size of the snake so the rectangle clears corners before turning.
        this.moveBuffer.fill({dirUnitX : -1, dirUnitY : 0 * snakeSpeed}); // starts to go to left
        this.snakeParts = [];
    }
    /**
     * 
     * @param {*} x 
     * @param {*} y 
     */
    this.addBody = (x,y) =>{ 
        this.snakeSize++;
        var newPart = new Snake(x,y,true);
        var tail = this.getSnakeTail();
        if (this.moveBuffer !== undefined){
            for (var i = 0; i < this.snakeCordSize; i++){
                this.moveBuffer.push({dirUnitX: 0, dirUnitY : 0});     
            }
            this.snakeParts.push(newPart);
            this.printBuffer();
        }
        return newPart;
    }

    this.growBody = (x,y) => {
        var tail = this.getSnakeTail();
        var tailVector = [tail.prevX - tail.x, tail.prevY - tail.y];
        tail = this.addBody(x,y);
        tail.prevX = tail.x + tailVector[0]; //because we stall out rendering the tail and clearing the prev position of the tail we need to mannuly assign the previous cordinates.
        tail.prevY = tail.y + tailVector[1];
        //this.skipCycles = tail.xSize / snakeSpeed //allow vertical smooth growing
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
       if (this.snakeDead === false){
            if (isNaN(dirUnitX) === false && isNaN(dirUnitY) === false){
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
            
            var linkingPart = null;
            for (let i = 0; i < this.snakeParts.length; i++) {
                if (linkingPart) {
                    if (i + 1 < this.snakeParts.length || this.skipCycles === 0) this.snakeParts[i].updatePosition(linkingPart.prevX, linkingPart.prevY);
                    linkingPart = this.snakeParts[i];
                } else {
                    linkingPart = this.snakeParts[i];
                    linkingPart.updatePosition(linkingPart.x + dirUnitX, linkingPart.y + dirUnitY);
                }
            }
            
            this.moveBuffer.pop();
            return;
            }
        }
    }

    this.getSnakeHead = () => {
        return this.snakeParts && this.snakeParts.length > 0 ? this.snakeParts[0] : null;
    }

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
        
        this.context.clearRect(snakeHead.prevX, snakeHead.prevY , 10, 10);
        this.context.fillStyle = "red";
        this.context.fillRect(snakeHead.x,snakeHead.y, 10,10);
        this.context.fillStyle = "green";
        this.context.fillRect(snakeHead.prevX, snakeHead.prevY, 10,10);
        if (snakeTail.tail) {
            if (this.skipCycles === 0) {
                this.clearTail(snakeTail.prevX,snakeTail.prevY,snakeTail.xSize,snakeTail.ySize);
                this.context.fillRect(snakeTail.x,snakeTail.y, snakeTail.xSize,snakeTail.ySize); 
            } else if (this.skipCycles > 0) {this.skipCycles -= 1; console.log(this.skipCycles)}
        }
        else {
            console.log("Snake tail is not tail");
        }

    }

    /**
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} xSize 
     * @param {*} ySize 
     */
    this.clearTail = (x,y,xSize,ySize) => {
        this.context.clearRect(x,y,xSize,ySize);
    }



    /**
     * Prints move buffer
     */
    this.printBuffer = () => {
        var string = "";
        var x;
        for (x = 0; x <  this.moveBuffer.length; x++){
            string+= "\n" + this.moveBuffer[x]["dirUnitX"].toString() + " , " + this.moveBuffer[x]["dirUnitY"].toString();
        }

        console.log(string);
    }
}
