var buttonEndGame = document.getElementById("exitBtn");
var toggle = true;
buttonEndGame.addEventListener( "click", handleExitButton);

function handleExitButton()
{
    if (toggle)
    {
        //button.textContent = "Play music";
        toggle = false;
    }
    else{
        toggle = true;
    }
    //setPlayble(toggle);
    handleButtonActivationUI(buttonEndGame,undefined, toggle);
}