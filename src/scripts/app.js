var scoreUI = null;
var clickRequestWindow = null;
const clickInstructionsText = "Click on screen to start";
const logger = new Logger();
var gameData = null;
var settings = null;
var snakePixelSize = 10;
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
  scoreUI = document.querySelector("p");
  clickRequestWindow = document.querySelector("#instructions");0
  gameData = gameDataHandler.loadGameData();
  settings = settingsHandler.loadSettings();
  handleSettingsChange(settings);
  showClickInstruct();
  scoreUI = document.querySelector("p");
  clickRequestWindow = document.querySelector("h2");
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
  debugText = document.querySelector("title");
  keyBindings = new BindingEvents();
  initGame();
  //snakeHandler.addBody(snakeTail.x,snakeTail.y);
  document.getElementById("exitBtn").addEventListener("click", onExit, true);
  
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
  exit = false;
  world = new Array(canvas.clientHeight);
  for (var i = 0 ; i < world.length; i++){
      world[i] = new Array(canvas.clientWidth); // create 2d array
      world[i].fill(0);
  }
  context.fillStyle = "#FF0000";
  context.fillStyle = 'white';
  context.fillRect(0,0,canvas.width, canvas.height);
  foodHandler = new FoodHandler(canvas, context);
  foodRenderer = new FoodRenderer(context);
  snakeHandler = new SnakeHandler(context,snakePixelSize);
  snakeHead = new Snake(250,250, false);
  snakeTail = snakeHead;
  snakeHandler.init(snakeHead.snakeSpeed);
  snakeTail = snakeHandler.addBody(250,250);
  foodHandler.createFood(canvas.clientWidth, canvas.clientHeight);
  foodHandler.renderAllFood(context);
  console.log(snakeHead);
  playBackroundMusic();
}

/**
 * Initalizes protocol to handle a game over state.
 */
function initGameOver() {
  stopBackroundMusic();
  console.log("Inited death");
  showClickInstruct();
}



function handleGameDataChange(gameDataJson) {

}

function handleSettingsChange(settingsJson) {
  if (typeof settingsJson !== 'undefined' && settingsJson != null) {
    toggleMusicButton.setToggle(settingsJson.music);
  }
}
function showClickInstruct() {
  clickRequestWindow.textContent = clickInstructionsText;
  document.body.addEventListener("click", hideClickInstruct);
}

function hideClickInstruct() {
    clickRequestWindow.textContent = "";
    started = true;
    initGame();
    window.requestAnimationFrame(loop);
    document.body.removeEventListener('click', showClickInstruct)
  
}
