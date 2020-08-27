var sfxButton = document.getElementById("sfxBtn");
var sfxToggle = true;
sfxButton.addEventListener( "click", handleSFXButton);

function handleSFXButton() {
    if (sfxToggle) {
        //button.textContent = "Play music";
        sfxToggle = false;
    }
    else {
        sfxToggle = true;
    }
    setSFXPlayable(sfxToggle);
    handleButtonActivationUI(sfxButton,"red",sfxToggle);
}

