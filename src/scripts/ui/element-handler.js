var mainContainer = document.getElementById("mainContainer");
var gameOverContainer = document.getElementById("gameOverContainer");
removeGameOverScreen();
addGameOverScreen();
function addGameOverScreen(){
    if (gameOverContainer !== null) {
        document.body.append(gameOverContainer);
    }
    else {
        console.log('game over screen is null');
    }
}

function removeGameOverScreen() {
    if (gameOverContainer !== null) {
        gameOverContainer.parentElement.removeChild(gameOverContainer);
    }
    else {
        console.log('game over screen is null');
    }
}