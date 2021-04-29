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
    handleButtonActivationUI(musicButton,"red",active);
}