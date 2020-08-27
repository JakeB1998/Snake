const audioPlayer = new Audio("Src/backroundMusic.mp3");
const gameOverAudio = new Audio("Src/game-over.wav");
const uiAudio = new Audio("Src/ui-sfx.wav");
var snakeGrowAudio = null;
var promise = false; //play permission implicity, done by interacting with html
var queToPlay = false; //que to play backround music once either the neccassary permisssions are granted
var playable  = true; //play permission explicit
var sfxPlayable = true;

document.body.addEventListener("click", function() {
    promiseGrant();
});

/**
 * Grants the user promise to play audio. 
 * This is done when the user interracts with the html file in anyway
 * is called outside of script
 */
function promiseGrant() {
    promise = true;
    console.log(queToPlay);
    if (queToPlay) {
        queToPlay = false;
        playBackroundMusic();
    }
}

/**
 * Plays backround music
 */
  function playBackroundMusic() {
    if (promise === true && playable === true) {
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
        if (audio !== undefined)
        {
            if (audio !== null && playable === true && promise === true)
            {
                audio.play();
            }
            else{
                console.log("Playable: " + playable + "\nPromise: " + promise);
            }
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
    if (sfxPlayable)
    {
        playAudio(snakeGrowAudio);
    }
  }

  /**
   * Sets wether or not the audio player has permission to output audio
   * @param {*} playableValue 
   */
  function setPlayble(playableValue)
  {
    playable = playableValue
    if (playable === false)
    {
        stopBackroundMusic();
    }
    else
    {
        playBackroundMusic();
    }

  }

  /**
   * 
   * @param {*} playableValue 
   */
  function setSFXPlayable(playableValue)
  {
      sfxPlayable = playableValue;
  }

  function X()
  {
      
  }
  /**
   * 
   * @param {*} audio 
   */
  function playSFX(audio)
  {
      if (sfxPlayable)
    {
        playAudio(audio);
    }
    else
    {
        console.log("SFX playabale: " + sfxPlayable);
    }
  }

