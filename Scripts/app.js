import {Snake, SnakeHandler} from "./snake.js";
import {BindingEvents} from "./keybindings.js";
import {Food, FoodRenderer, FoodHandler} from "./food.js";
var scoreUI = document.querySelector("p");

var snkaePixelSize = 10;
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var debugText = document.querySelector("title");
var keyBindings = new BindingEvents();
var foodHandler = new FoodHandler(canvas, context);
var foodRenderer = new FoodRenderer(context);
var snakeHandler = new SnakeHandler(context,snkaePixelSize);
var snakeHead = new Snake(250,250, false);

snakeHandler.addBody(260,250);
snakeHandler.addBody(270,250);
var snakeTail = snakeHandler.addBody(280,250);
snakeHandler.init();



document.getElementById("exitBtn").addEventListener("click", onExit, true);


var lastRender = 0;
var exit = false;



var world = new Array(canvas.clientHeight);

for (var i = 0 ; i < world.length; i++)
{
    world[i] = new Array(canvas.clientWidth); // create 2d array
    world[i].fill(0);
}
context.fillStyle = "#FF0000";

var score = 0;
var cords = null;

foodHandler.createFood(canvas.clientWidth, canvas.clientHeight);
foodHandler.renderAllFood(context);

function onExit()
{
    exit = true;
    debugText.textContent = "Game Over!";

}
function update(progress) 
  {
    if (foodHandler.foodEaten !== score)
    {
      score = foodHandler.foodEaten;
    }

    if (checkCollisionWall(snakeHead.x,snakeHead.y, canvas.clientWidth, canvas.clientHeight) === false)
    {
      if (foodHandler.checkCollision(snakeHead.x,snakeHead.y,snakeHead.xSize,snakeHead.ySize))
      {
          console.log("Ate food");
      }
      
      
      var cords = keyBindings.findVector();
      if (cords !== null)
      {
        
        snakeHandler.moveSnake(snakeHead, snakeTail, cords["xDir"], cords["yDir"], foodHandler, context);
        //console.log(snake.x + "," + snake.y);
      
      }
    }
    else
    {
      onExit();
    }
  }
  
  function draw() 
  {
    if (scoreUI.textContent !== "Score: " + score)
    {
      scoreUI.textContent = "Score: " + score;
      
    }
         snakeHandler.render(snakeHead,snakeTail);
          foodHandler.renderAllFood(context);
      
    // Draw the state of the world
  }

  function loop(timestamp) 
  {
      if (exit === false)
      {
        var progress = timestamp - lastRender;
    
        if (snakeHandler.snakeDead !== true)
        {
          update(progress);
          draw();
        }
    
        lastRender = timestamp;
        window.requestAnimationFrame(loop);
      }
  }


window.requestAnimationFrame(loop);

function foodEatenCallback()
{
  foodHandler.createFood(canvas.clientWidth, canvas.clientHeight);
}
