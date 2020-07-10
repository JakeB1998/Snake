var button = document.getElementById("musicBtn");
var toggle = true;
button.addEventListener( "click", handleMusicButton);

function handleMusicButton()
{
    if (toggle)
    {
        //button.textContent = "Play music";
        toggle = false;
    }
    else{
        toggle = true;
    }
    setPlayble(toggle);
    
}