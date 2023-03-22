bgMusic = document.getElementById("bgAudio");
imgMusic = document.getElementById("btnSonImg")
bgMusic.volume = 0.80;

function change_mute() {
  if(bgMusic.muted==false){
    bgMusic.muted=true;
    imgMusic.src="./img/sonoff.svg"
  }else{
    bgMusic.muted=false;
    imgMusic.src="./img/sonon.svg"
  }

}
