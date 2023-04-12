bgMusic = document.getElementById("bgAudio");
imgMusic = document.getElementById("btnSonImg");
bgMusic.volume = 0.75;

imgBlackSkin = document.getElementById("imgBlackSkin");
btnBlackSkin = document.getElementById("btnBlackSkin");

imgRedSkin = document.getElementById("imgRedSkin");
btnRedSkin = document.getElementById("btnRedSkin");

imgBluekSkin = document.getElementById("imgBluekSkin");
btnBlueSkin = document.getElementById("btnBlueSkin");

function testLocalStorage() {
    var mod = 'modernizr';
    try {
        localStorage.setItem(mod, mod);
        localStorage.removeItem(mod);
        return true;
    } catch(e) {
        return false;
    }
}


if(testLocalStorage() === true){
    console.log('- Game Started -');
}else if(testLocalStorage() === false){
    console.log("no localstorage");
    document.location.href="errorLoading.html"; // create page errorLoading.html
}else{
    console.log("error first init");
    document.location.href="errorLoading.html"; // create page errorLoading.html
}


function firstInit(){
    localStorage.setItem('scoreboard', JSON.stringify([{pseudo: 'Unknown', score: 0}, {pseudo: 'Unknown', score: 0}, {pseudo: 'Unknown', score: 0}, {pseudo: 'Unknown', score: 0}, {pseudo: 'Unknown', score: 0}, {pseudo: 'Unknown', score: 0}, {pseudo: 'Unknown', score: 0}, {pseudo: 'Unknown', score: 0}, {pseudo: 'Unknown', score: 0}, {pseudo: 'Unknown', score: 0}]));
    localStorage.setItem('isFirstInit', JSON.stringify(false));
}
if(JSON.parse(localStorage.getItem('isFirstInit')) !== false){
    // console.log("First Init");
    firstInit();
}

localStorage.setItem("colorSkin", 0);

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
  localStorage.removeItem("colorSkin");
  localStorage.setItem("colorSkin", 0);
});
btnRedSkin.addEventListener("click", () => {
  imgRedSkin.style.display = "block";
  imgBlackSkin.style.display = "none";
  imgBluekSkin.style.display = "none";
  localStorage.removeItem("colorSkin");
  localStorage.setItem("colorSkin", 1);
});
btnBlueSkin.addEventListener("click", () => {
  imgBluekSkin.style.display = "block";
  imgBlackSkin.style.display = "none";
  imgRedSkin.style.display = "none";
  localStorage.removeItem("colorSkin");
  localStorage.setItem("colorSkin", 2);
  
});

/* exmple fonction:
addevent listener -> fonction("blue")
img. = ...
*/