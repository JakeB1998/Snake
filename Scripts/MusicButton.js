var musicButton = document.getElementById("musicBtn");
var musicBtnToggle = true;
musicButton.addEventListener( "click", handleMusicButton);

function handleMusicButton() {
    if (musicBtnToggle) {
        //button.textContent = "Play music";
        musicBtnToggle = false;
    }
    else {
        musicBtnToggle = true;
    }
    setPlayble(musicBtnToggle);
    handleButtonActivationUI(musicButton,"red",musicBtnToggle);
}