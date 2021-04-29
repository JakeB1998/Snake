var buttonEndGame = null;
var toggleButtonEndGame = null;

window.addEventListener('load', () => {
    buttonEndGame = document.getElementById("exitBtn");
    buttonEndGame.addEventListener('click', handleExitButton);
});




function handleExitButton(toggle) {
    initGameOver()
}