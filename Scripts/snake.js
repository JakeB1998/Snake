
export class Snake
{
    
    constructor(x,y, isTail)
    {
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
    
    }

    
}


export class SnakeHandler
{
    constructor(context,snakeCordSize)
    {
        this.snakeDead = false;
        this.context = context
        this.snakeSize = 0;
        this.snakeCordSize = snakeCordSize;
        
    }

    /**
     * 
     * @param {*} snakeSpeed 
     */
    init(snakeSpeed)
    {
        this.moveBuffer = new Array(this.snakeCordSize * this.snakeSize); // this is equal to the size of the snake so the rectangle clears corners before turning.
        this.moveBuffer.fill({dirUnitX : -1, dirUnitY : 0 * snakeSpeed}); // starts to go to left
        //this.moveBuffer.unshift({dirUnitX : -1, dirUnitY : 0})

    }


    /**
     * 
     * @param {*} x 
     * @param {*} y 
     */
    addBody(x,y)
    {
        
        this.snakeSize++;
     
        if (this.moveBuffer !== undefined)
        {
            
            for (var i = 0; i < this.snakeCordSize; i++)
            {
                 //this.moveBuffer.push({dirUnitX, dirUnitY});
                this.moveBuffer.push({dirUnitX: 0, dirUnitY : 0});
                
            }

            this.printBuffer();
        }
        
        return new Snake(x,y,true);
    }

    moveSnake(snake, snakeTail, dirUnitX, dirUnitY, foodHandler, context) {
        
       if (this.snakeDead === false)
       {
            if (isNaN(dirUnitX) === false && isNaN(dirUnitY) === false)
            {
                dirUnitX *= snake.snakeSpeed;
                dirUnitY *= snake.snakeSpeed;
                this.moveBuffer.unshift({dirUnitX,dirUnitY}); // add move to buffer
            // this.printBuffer();
            
            //console.log( snake.x + "," + snake.y + "\n" + snakeTail.x + "," + snakeTail.y)
            if (checkCollisionOnSelf(dirUnitX, dirUnitY, snake, context))
            {
                var x = snake.x + dirUnitX;
                var y = snake.y + dirUnitY;
                console.log("Snake hit itself at : " + x + "," + y);
                this.snakeDead = true;
                return;
                
            }
                snake.prevX = snake.x;
                snake.prevY = snake.y;
                snake.x = snake.x + dirUnitX;
                snake.y = snake.y + dirUnitY;

                snakeTail.prevX = snakeTail.x;
                snakeTail.prevY = snakeTail.y;
                snakeTail.x += this.moveBuffer[this.moveBuffer.length - 1]["dirUnitX"];
                snakeTail.y += this.moveBuffer[this.moveBuffer.length - 1]["dirUnitY"];

                this.moveBuffer.pop();
                //this.printBuffer();
                
                
                
                return;
            }
            
            console.log("Nan detected");
        }
    }

    render(snakeHead, snakeTail)
    {
        this.clearTail(snakeTail.x,snakeTail.y, snakeTail.xSize,snakeTail.ySize);
        this.context.clearRect(snakeHead.prevX, snakeHead.prevY , 10, 10);
        this.context.fillStyle = "red";
        this.context.fillRect(snakeHead.x,snakeHead.y, 10,10);
        this.context.fillStyle = "green";
        this.context.fillRect(snakeHead.prevX, snakeHead.prevY, 10,10);


        if (snakeTail.tail === true)
        {
            this.clearTail(snakeTail.prevX,snakeTail.prevY,snakeTail.xSize,snakeTail.ySize);
            this.context.fillRect(snakeTail.x,snakeTail.y, snakeTail.xSize,snakeTail.ySize);
            
            
        }
        else{
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
    clearTail(x,y,xSize,ySize)
    {
        this.context.clearRect(x,y,xSize,ySize);

    }

    /**
     * 
     * @param {*} sizeIncreased 
     */
    handleMovebuffer(sizeIncreased)
    {
        if (sizeIncreased)
        {

        }
    }

    /**
     * Prints move buffer
     */
    printBuffer()
    {
        var string = "";
        var x;
        for (x = 0; x <  this.moveBuffer.length; x++)
        {
            string+= "\n" + this.moveBuffer[x]["dirUnitX"].toString() + " , " + this.moveBuffer[x]["dirUnitY"].toString();
        }

        console.log(string);
    }
}
