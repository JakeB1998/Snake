var audioPlayer = new Audio("Src/backroundMusic.mp3");
var gameOverAudio = new Audio("Src/game-over.wav");
var promise = false; //play permission implicity, done by interacting with html
var queToPlay = false; //que to play backround music once either the neccassary permisssions are granted
var playable  = true; //play permission explicit

document.body.addEventListener("click", function()
{
    promiseGrant();
});

/**
 * Grants the user promise to play audio. 
 * This is done when the user interracts with the html file in anyway
 * is called outside of script
 */
function promiseGrant()
{
    promise = true;
    console.log(queToPlay);
    if (queToPlay)
    {
        queToPlay = false;
        playBackroundMusic();
    }
}

/**
 * 
 */
  function playBackroundMusic()
  {
    if (promise === true && playable === true)
    {
      audioPlayer.play();
    }
    else
    {
        queToPlay = true;
    }
   
  }

  /**
   * Stops backround music
   */
  function stopBackroundMusic()
  {
      if (promise)
      {
         audioPlayer.pause();
      }
  }

  /**
   * Plays the audio files accosiated with the game over game state
   */
  function playGameOverSound()
  {

  }

  /**
   * Stops the audio files accosiated with the game over game state
   */
  function stopGameOverSound()
  {

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
      else{
          playBackroundMusic();
      }

  }

