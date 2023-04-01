bgMusic = document.getElementById("bgAudio");
imgMusic = document.getElementById("btnSonImg");
bgMusic.volume = 0.75;

imgBlackSkin = document.getElementById("imgBlackSkin");
btnBlackSkin = document.getElementById("btnBlackSkin");

imgRedSkin = document.getElementById("imgRedSkin");
btnRedSkin = document.getElementById("btnRedSkin");

imgBluekSkin = document.getElementById("imgBluekSkin");
btnBlueSkin = document.getElementById("btnBlueSkin");

function change_mute() {
  if (bgMusic.muted == false) {
    bgMusic.muted = true;
    imgMusic.src = "./img/sonoff.svg"
  } else {
    bgMusic.muted = false;
    imgMusic.src = "./img/sonon.svg"
  }

}
btnBlackSkin.addEventListener("click", () => {
  imgBlackSkin.style.display = "block";
  imgRedSkin.style.display = "none";
  imgBluekSkin.style.display = "none";
});
btnRedSkin.addEventListener("click", () => {
  imgRedSkin.style.display = "block";
  imgBlackSkin.style.display = "none";
  imgBluekSkin.style.display = "none";
});
btnBlueSkin.addEventListener("click", () => {
  imgBluekSkin.style.display = "block";
  imgBlackSkin.style.display = "none";
  imgRedSkin.style.display = "none";
});
