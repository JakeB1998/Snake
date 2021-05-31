function Food(x,y,xSize,ySize, staticMovement) {
    this.x = x;
    this.y = y;
    this.xSize = xSize;
    this.ySize = ySize;
    this.staticMovement = staticMovement;
    this.rendered = false;
    this.eaten = false;
    
    /**
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} xSize 
     * @param {*} ySize 
     */
    this.isPointInFood = (x,y) => {
        let xTemp = x -this.x;
        let yTemp = y - this.y;
        if (xTemp <= this.xSize && xTemp >= 0 && yTemp <= this.ySize && yTemp >= 0){
            log(xTemp + ',' + yTemp);
        }
        
        return xTemp <= this.xSize && xTemp >= 0 && yTemp <= this.ySize && yTemp >= 0;
    }

}

/**
 * Object Constrcutoor for Food Renderer Object.
 * @param {*} context 
 */
function FoodRenderer(context) {
        this.context = context;
        
        /**
         * 
         * @param {*} food 
         */
        this.draw = (food) => {
            this.context.fillC
        }
}

/**
 * Object constructor for Food Handler
 * @param {*} canvas 
 * @param {*} context 
 */
function FoodHandler(canvas, context) {
        this.canvas = canvas;
        this.arraySize = 0;
        this.foods = new Array(this.arraySize);
        this.context = context;
        this.foodEaten = 0;

    this.isArrayFull = (arr)  =>{
        for (let z = 0; z < arr.length; z++)  {
            if (arr[z] === null) {
                return false;
            }
        }
        return true;
    }

    this.createFood = (widthMax,heightMax) => { 
        let x = 0;
        let y = 0;
        const spaceBetween = 50;
        while (true) {
            x = Math.floor((Math.random() * widthMax));
            y = Math.floor((Math.random() * heightMax));
            if (widthMax - x >= spaceBetween && heightMax - y >= spaceBetween
                && x - spaceBetween >= 0 && y - spaceBetween >= 0) {
                break;
            }
        }
        return this.createFoodAt(x,y);
    }
    this.checkCollision = (snakeX,snakeY,snakeXSize,snakeYSize) => {
        let cords = [[snakeX,snakeY], [snakeX + snakeXSize, snakeY], [snakeX,snakeY + snakeYSize], [snakeX + snakeXSize, snakeY + snakeYSize]];
        for (var i = 0; i < this.foods.length; i++) {
                if (this.checkCollisionOfFood(this.foods[i],cords)) {
                    this.eatFood(this.foods[i]);
                    return true;
                }
        }
        return false;
    }

    this.checkCollisionOfFood = ( food, cords) => { 
        
        if (cords != null){
            for (let i = 0; i < cords.length; i++){
                    if(result = food.isPointInFood(cords[i][0], cords[i][1])){
                        return true;
                    }
            }
        }
        return false;
    }
    this.createFoodAt = (x,y) => {
        let food = new Food(x,y,10,10,false);
        this.addFood(food);
        console.log("Food created at : " + food.x + ", " + food.y);
        return food;
    }

    /**
     * Adds a food object to the foods arry using Array.push()
     * @param {*} food 
     */
    this.addFood = (food) => {
        this.foods.push(food);
    }

    /**
     * eats a specific food object
     * @param {*} food eaten
     */
    this.eatFood = (food) => {
        if (food.eaten === false) {
            food.eaten = true;
            this.context.clearRect(food.x,food.y,food.xSize, food.ySize);
            
            this.foodEaten+= 1;
            var index = this.foods.findIndex(i => i.x === food.x && i.y === food.y);
            this.foods.splice(index,1);
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
    this.renderFood = (food,context) => {
     context.fillStyle = 'blue';
     let circle = new Path2D();
     circle.arc(food.x + food.xSize / 2, food.y + food.ySize / 2, food.xSize / 2, 0,  2 * Math.PI);
     context.fill(circle);
     context.fillStyle = 'green';
     food.rendered = true;
    }

    this.renderAllFood = (context) => {
        for (let i = 0; i < this.foods.length; i++) {
            if (this.foods[i] !== null) {
                if (this.foods[i] instanceof Food) {
                    if (this.foods[i].rendered !== true)  {
                        this.renderFood(this.foods[i],context);
                    }   
                }
                else {
                    console.log("Not instance of food class in foods handler array of Food objects");
                }
            }
        }
    }
}