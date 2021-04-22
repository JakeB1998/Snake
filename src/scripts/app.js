var scoreUI = document.querySelector("p");
var clickRequestWindow = document.querySelector("h2");
const logger = new Logger();
var snkaePixelSize = 10;
var canvas = null;
var context = null;
var debugText = null;
var keyBindings = null;
var foodHandler = null;
var foodRenderer = null;
var snakeHandler = null;
var snakeHead = null;
var snakeTail = null;
var lastRender = 0;
var exit = false;
var world = null;
var score = 0;
var cords = null;
var started = false;
window.addEventListener('load', () => {
  document.body.addEventListener("click", function() {
    if (started === false) {
      window.requestAnimationFrame(loop);
      clickRequestWindow.textContent = "";
      started = true;
    }
  });
  scoreUI = document.querySelector("p");
  clickRequestWindow = document.querySelector("h2");
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
  debugText = document.querySelector("title");
  keyBindings = new BindingEvents();
  initGame();
  //snakeHandler.addBody(snakeTail.x,snakeTail.y);
  document.getElementById("exitBtn").addEventListener("click", onExit, true);
  world = new Array(canvas.clientHeight);
  for (var i = 0 ; i < world.length; i++){
      world[i] = new Array(canvas.clientWidth); // create 2d array
      world[i].fill(0);
  }
  context.fillStyle = "#FF0000";
});

/**
 * Called on exit
 */
function onExit() {
    exit = true;
    debugText.textContent = "Game Over!";
    initGameOver();
}

/**
 * 
 * @param {*} progress 
 */
function update(progress) {
    var lastRecordedEaten = foodHandler.foodEaten;
    if (foodHandler.foodEaten !== score) {
      score = foodHandler.foodEaten;
    }

    if (checkCollisionWall(snakeHead.x,snakeHead.y, canvas.clientWidth, canvas.clientHeight) === false) {
      if (foodHandler.checkCollision(snakeHead.x,snakeHead.y,snakeHead.xSize,snakeHead.ySize)) {
          console.log("Ate food");
      }
      var cords = keyBindings.findVector();
      if (cords !== null) {
        
        snakeHandler.moveSnake(snakeHead, snakeTail, cords["xDir"], cords["yDir"], foodHandler, context);
        if (lastRecordedEaten !== foodHandler.foodEaten)  {  // ate food in this moce 
            snakeHandler.addBody(snakeTail.x,snakeTail.y);
        }
        //console.log(snake.x + "," + snake.y);
      }
    }
    else
      onExit();
  }
  
  /**
   * Renders all the data to the screen. 
   * Called every framed timestamp.
   */
  function draw()  {
    if (scoreUI.textContent !== "Score: " + score) {
      scoreUI.textContent = "Score: " + score; 
    }
    snakeHandler.render(snakeHead,snakeTail);
    foodHandler.renderAllFood(context);
    // Draw the state of the world
  }

  /**
   * The main loop that runs every framed timestamp.
   * @param {*} timestamp 
   */
  function loop(timestamp) {
      if (exit === false) {
        var progress = timestamp - lastRender;
        if (snakeHandler.snakeDead !== true) {
          update(progress);
          draw();
        }
        lastRender = timestamp;
        window.requestAnimationFrame(loop);
      }
  }

/**
 * Initializes game.
 */
function initGame() {
  foodHandler = new FoodHandler(canvas, context);
  foodRenderer = new FoodRenderer(context);
  snakeHandler = new SnakeHandler(context,snkaePixelSize);
  snakeHead = new Snake(250,250, false);
  snakeTail = snakeHead;
  snakeHandler.init(snakeHead.snakeSpeed);
  snakeTail = snakeHandler.addBody(250,250);
  foodHandler.createFood(canvas.clientWidth, canvas.clientHeight);
  foodHandler.renderAllFood(context);
  playBackroundMusic();
}

/**
 * Initalizes protocol to handle a game over state.
 */
function initGameOver() {
  stopBackroundMusic();
  console.log("Inited death");
}
