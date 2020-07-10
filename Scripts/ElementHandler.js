var mainContainer = document.getElementById("mainContainer");
var gameOverContainer = document.getElementById("gameOverContainer");
removeGameOverScreen();
addGameOverScreen();
function addGameOverScreen()
{
    document.body.append(gameOverContainer);
}

function removeGameOverScreen()
{
    gameOverContainer.parentElement.removeChild(gameOverContainer);
}