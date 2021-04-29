var musicButton = null;
var toggleMusicButton = null;

window.addEventListener('load', () => {
    musicButton = document.getElementById("musicBtn");
    if (musicButton) {
        toggleMusicButton = new ToggleButton(musicButton, true, (toggle) => {
            handleMusicButton(toggle);
        });
    }
})


function handleMusicButton(active) {
    setPlayble(active);
    let temp = gameDataHandler.loadSettings();
    temp.music = active
    gameDataHandler.saveSettings(temp);
    handleButtonActivationUI(musicButton,"red",active);
}