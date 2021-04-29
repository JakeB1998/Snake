var buttonEndGame = null;
var toggleButtonEndGame = null;

window.addEventListener('click', () => {
    buttonEndGame = document.getElementById("exitBtn");
    toggleButton = new ToggleButton(buttonEndGame, true, (toggle) => {
        handleExitButton(toggle);
    })
});




function handleExitButton(toggle) {
    handleButtonActivationUI(buttonEndGame,undefined, toggle);
}