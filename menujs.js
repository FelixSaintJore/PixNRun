bgMusic = document.getElementById("bgAudio");
bgMusic.volume = 0.75;

function change_mute() {
  if(bgMusic.muted==false){
    bgMusic.muted=true;
    $('.mute').css('background-image','url(img/sonoff.svg)')
  }else{
    bgMusic.muted=false;
    $('.mute').css('background-image','url(img/sonon.svg)')
  }

}
