export class Food
{
    constructor(x,y,xSize,ySize, staticMovement)
    {
        this.x = x;
        this.y = y;
        this.xSize = xSize;
        this.ySize = ySize;
        this.staticMovement = staticMovement;
        this.rendered = false;
        this.eaten = false;
    }


    isPointInFood(x,y,xSize, ySize)
    {
        var xTemp = -1;;
        var yTemp = -1;
        for ( var i = 0; i < xSize; i++ )
        {
             xTemp = x + i;
            for (var z = 0; z < ySize; z++)
            {
                yTemp = y + z;
                if (this.RunThroughAllPoints(xTemp,yTemp))
                {
                    return true;
                }

            }

        }
        return false;
    }

    RunThroughAllPoints(x,y)
    { 
        for ( var i = 0; i < this.xSize; i++ )
        {
            var xTemp = this.x + i;
            for (var z = 0; z < this.ySize; z++)
            {
                var yTemp = this.y + z;
                if ( xTemp === x && yTemp === y)
                {
                    return true;
                }

            }

           
        }
        return false;

    }

}


export class FoodRenderer
{
    constructor(context)
    {
        this.context = context;
    }


    draw(food)
    {
        this.context.fillC
    }
}


export class FoodHandler
{
    constructor( canvas, context)
    {
       
        this.canvas = canvas;
        this.arraySize = 0;
        this.foods = new Array(this.arraySize);
        this.context = context;
        this.foodEaten = 0;
        
    

    }

    isArrayFull(arr)
    {

        for (var z = 0; z < arr.length; z++)
        {
            if (arr[z] === null)
            {
                return false;
            }
        }
        return true;
    }

    createFood(widthMax,heightMax)
    {
       
        return this.createFoodAt( Math.floor((Math.random() * widthMax)),Math.floor((Math.random() * heightMax)));

    }
    checkCollision(snakeX,snakeY,snakeXSize,snakeYSize)
    {
        for (var i = 0; i < this.foods.length; i++)
        {

                if (this.checkCollisionOfFood(this.foods[i],snakeX,snakeY,snakeXSize,snakeYSize))
                {
                    this.eatFood(this.foods[i]);
                    return true;
                }
        }

        return false;
     
    }

    checkCollisionOfFood( food,snakeX,snakeY, snakeXSize, snakeYSize)
    {
        
        return food.isPointInFood(snakeX,snakeY,snakeXSize
            ,snakeY);
        
    }

    createFoodAt(x,y)
    {
        
        var food = new Food(x,y,10,10,false);
        this.addFood(food);
        console.log("Food created at : " + food.x + ", " + food.y);
        return food;
    }

    /**
     * Adds a food object to the foods arry using Array.push()
     * @param {*} food 
     */
    addFood(food)
    {
        
        this.foods.push(food);
    }

    /**
     * eats a specific food object
     * @param {*} food eaten
     */
    eatFood(food)
    {
        if (food.eaten === false)
        {
            food.eaten = true;
            this.context.clearRect(food.x - (food.xSize / 2),
                                    food.y - (food.ySize / 2) 
                                    ,food.xSize * 4,food.ySize * 4);
            
            this.foodEaten+= 1;
            this.createFood(this.canvas.clientWidth, this.canvas.clientHeight);
          
        }
        //TODO : Deleted food

        
    }


    /**
     * Renders food that are unredndered. This is due to food being static and having no movement.
     * This means it only has to be rendered once when spawned and once when eaten
     * @param {*} food 
     * @param {*} context 
     */
    renderFood(food,context)
    {
        console.log("Food Rendered at: " + food.x + ", " + food.y);
        /*
        context.beginPath();
      context.arc(food.x, food.y, food.xSize, 0, 2 * Math.PI, false);
      context.fillStyle = 'green';
      context.fill();
      context.lineWidth = 5;
      context.strokeStyle = '#003300';
      context.stroke();
      */

     context.fillStyle = 'blue';
      context.fillRect(food.x, food.y, food.xSize, food.ySize);
      context.fillStyle = 'green';
      food.rendered = true;
      

    }

    renderAllFood(context)
    {
       
        for (var i = 0; i < this.foods.length; i++)
        {
            if (this.foods[i] !== null)
            {
                if (this.foods[i] instanceof Food)
                {
                    if (this.foods[i].rendered !== true)
                    {
                        this.renderFood(this.foods[i],context);
                    }
                    
                }
                else
                {
                    console.log("Not instance of food class in foods handler array of Food objects");
                }


            }
        }
    }

    
}