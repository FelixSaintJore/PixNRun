bgMusic = document.getElementById("bgAudio");
bgMusic.volume = 0.75;

function change_mute() {
  if(bgMusic.muted==false){
    bgMusic.muted=true;
  }else{
    bgMusic.muted=false;
  }

}
