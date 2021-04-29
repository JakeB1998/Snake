
function handleButtonActivationUI(button, color,  activateOrDeactivated) {
    if (button) console.log(button.textContent + " Button, Toggle: " + activateOrDeactivated);
    if (color) {
        if (activateOrDeactivated) button.style.color = "";
        else button.style.color = color;
    }   

    playSFX(uiAudio);
}
