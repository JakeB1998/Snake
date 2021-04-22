var sfxButton = null;
var toggleSfxButton = null;

window.addEventListener('load', () => {
    sfxButton = document.getElementById("sfxBtn");
    toggleSfxButton = new ToggleButton(sfxButton, true, (toggle) => {
        handleSFXButton(toggle);
    });
})


function handleSFXButton(toggle) {
    setSFXPlayable(toggle);
    handleButtonActivationUI(sfxButton,"red",toggle);
}

