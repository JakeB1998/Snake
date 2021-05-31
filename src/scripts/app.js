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
var snakeHead = null; //remove
var snakeTail = null; //remove
var lastRender = 0;
var exit = false;
var world = null;
var score = 0;
var cords = null;
var started = false;

const debugLog = true;
const logger = new Logger(debugLog)

window.addEventListener('load', () => {
  scoreUI = document.querySelector("p");
  clickRequestWindow = document.querySelector("#instructions");0
  gameData = gameDataHandler.loadGameData();
  console.log(gameData)
  gameDataHandler.gameData = gameData;
  settings = gameDataHandler.loadSettings();
  handleSettingsChange(null,settings);
  showClickInstruct();
  scoreUI = document.querySelector("p");
  clickRequestWindow = document.querySelector("h2");
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
  debugText = document.querySelector("title");
  keyBindings = new BindingEvents();
  initGame(); 
});

/**
 * Called on exit
 */
function onExit() {
    exit = true;
    initGameOver();
}

/**
 * 
 * @param {*} progress 
 */
function update(progress) {
  var snakeHead = snakeHandler.getSnakeHead();
  var snakeTail = snakeHandler.getSnakeTail();
    var lastRecordedEaten = foodHandler.foodEaten;
    if (foodHandler.foodEaten !== score) {
      score = foodHandler.foodEaten;
    }
    if (!checkCollisionWall(snakeHead.x, snakeHead.y, canvas.clientWidth, canvas.clientHeight)) {
      if (foodHandler.checkCollision(snakeHead.x,snakeHead.y,snakeHead.xSize,snakeHead.ySize)) {
          console.log("Ate food");
      }
      var cords = keyBindings.findVector();
      if (cords != null) {
        snakeHandler.moveSnake(snakeHead, snakeTail, cords["xDir"], cords["yDir"], foodHandler, context);
        if (lastRecordedEaten !== foodHandler.foodEaten)  {  // ate food in this moce 
          snakeHandler.growBody(snakeTail.x,snakeTail.y);
            //snakeHandler.addBody(snakeTail.prevX,snakeTail.prevY);
        }
      }
    }
    else
      initGameOver();
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
      if (!exit) {
        var progress = timestamp - lastRender;
        if (!snakeHandler.snakeDead) {
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
  world = new Array(canvas.clientHeight);
  for (var i = 0 ; i < world.length; i++){
      world[i] = new Array(canvas.clientWidth); // create 2d array
      world[i].fill(0);
  }
  clearScreen()
  foodHandler = new FoodHandler(canvas, context);
  foodRenderer = new FoodRenderer(context);
  snakeHandler = new SnakeHandler(context,snakePixelSize);
  snakeHandler.init(2,Math.floor(canvas.width / 2), Math.floor(canvas.height / 2));
  snakeHead = snakeHandler.getSnakeHead();
  snakeTail = snakeHandler.getSnakeTail();
  foodHandler.createFood(canvas.clientWidth, canvas.clientHeight);
  foodHandler.renderAllFood(context);
  playBackroundMusic();
}

/**
 * Initalizes protocol to handle a game over state.
 */
function initGameOver() {
  requestAnimationFrame(() => {
    exit = true;
    console.log('game over')
    debugText.textContent = "Game Over!";
    window.requestAnimationFrame(clearScreen); 
    stopBackroundMusic();
    showClickInstruct();
  });
 
}

function clearScreen() {
  let prevFill = context.fillStyle;
  context.fillStyle = 'white';
  context.fillRect(0,0,canvas.width, canvas.height);
  context.fillStyle = prevFill;
}

function handleGameDataChange(prevGameDataJson, gameDataJson) {
    if (gameDataJson) {
      var prevSetting = prevGameDataJson && prevGameDataJson.data ? prevGameDataJson.data.settings : null;
      if (gameDataJson.data) {
        //handle data and pass down
        handleSettingsChange(prevSetting, gameDataJson.data.settings);
      }
    }
}

function handleSettingsChange(prevSettingsJson,settingsJson) {
  if (typeof settingsJson !== 'undefined' && settingsJson != null) {
    toggleMusicButton.setToggle(settingsJson.music);
    toggleSfxButton.setToggle(settingsJson.sfx);
  }
}
function showClickInstruct() {
    clickRequestWindow.textContent = clickInstructionsText;
    document.body.addEventListener("click", hideClickInstruct);
}

function hideClickInstruct() {
    clickRequestWindow.textContent = "";
    debugText.textContent = "Snake Game"
    started = true;
    exit = false;
    initGame();
    window.requestAnimationFrame(loop);
    document.body.removeEventListener('click', hideClickInstruct)
  
}
