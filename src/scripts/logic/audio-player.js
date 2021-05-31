const audioPlayer = new Audio("src/assets/sound/backroundMusic.mp3");
const gameOverAudio = new Audio("src/assets/sound/game-over.wav");
const uiAudio = new Audio("src/assets/sound/ui-sfx.wav");
var snakeGrowAudio = null;
var promise = false; //play permission implicity, done by interacting with html
var queToPlay = false; //que to play backround music once either the neccassary permisssions are granted
var playable  = true; //play permission explicit
var sfxPlayable = true;

window.addEventListener('load', () => {
    document.body.addEventListener("click", promiseGrant);
})


/**
 * Grants the user promise to play audio. 
 * This is done when the user interracts with the html file in anyway
 * is called outside of script
 */
function promiseGrant() {
    promise = true;
    if (queToPlay) {
        queToPlay = false;
        playBackroundMusic();
    }
    document.body.removeEventListener("click", promiseGrant);
}

/**
 * Plays backround music
 */
  function playBackroundMusic() {
   
    if (promise && playable) {
      audioPlayer.play();
    }
    else {
        queToPlay = true;
    }
  }

  /**
   * Stops backround music
   */
  function stopBackroundMusic() {
      if (promise) {
          logger.logInfo("Backround stopped")
         audioPlayer.pause();
      }
  }

  /**
   * Plays the audio files accosiated with the game over game state
   */
  function playGameOverSound() {
      if (sfxPlayable) {
         playAudio(gameOverAudio);
      }
  }

  /**
   * Plays audio fle through html audio player if condiitions are met
   * @param {*} audio 
   */
  function playAudio(audio) {
        if (typeof audio !== 'undefined' && audio != null) {
            if (playable && promise) {
                audio.play();
            }
            else console.log("Playable: " + playable + "\nPromise: " + promise);
        }
  }

  /**
   * Stops the audio files accosiated with the game over game state
   */
  function stopGameOverSound() {

  }

  /**
   * 
   */
  function playGrowSound() {
    if (sfxPlayable) playAudio(snakeGrowAudio);
  }

  /**
   * Sets wether or not the audio player has permission to output audio
   * @param {*} playableValue 
   */
  function setPlayble(playableValue) {
    playable = playableValue
    if (!playable) {
        stopBackroundMusic();
    }
    else playBackroundMusic();
  }

  /**
   * 
   * @param {*} playableValue 
   */
  function setSFXPlayable(playableValue) {
      sfxPlayable = playableValue;
  }

 
  /**
   * 
   * @param {*} audio 
   */
  function playSFX(audio) {
    if (sfxPlayable) {
        playAudio(audio);
    } 
  }

