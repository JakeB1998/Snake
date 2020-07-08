var audioPlayer = new Audio("Src/backroundMusic.mp3");
var promise = false;
var queToPlay = false;
document.body.addEventListener("click", function(){
promiseGrant();
});

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

  function playBackroundMusic()
  {
    if (promise)
    {
      audioPlayer.play();
    }
    else
    {
        queToPlay = true;
    }
   
  }

  function stopBackroundMusic()
  {
      if (promise)
      {
         audioPlayer.pause();
      }
  }

