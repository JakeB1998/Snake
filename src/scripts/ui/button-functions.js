
function handleButtonActivationUI(button, color,  activateOrDeactivated) {
    if (color) {
        if (activateOrDeactivated) button.style.color = "";
        else button.style.color = color;
    }   

    playSFX(uiAudio);
}
