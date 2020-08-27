
function handleButtonActivationUI(button, color,  activateOrDeactivated)
{
    if (button !== undefined)
        console.log(button.textContent + " Button, Toggle: " + activateOrDeactivated);
    if (color !== undefined)
    {
        if (activateOrDeactivated)
            button.style.color = "";
        else
            button.style.color = color;
    }   

    playSFX(uiAudio);
}