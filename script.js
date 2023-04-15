/* 

https://www.youtube.com/watch?v=rTVoyWu8r6g

*/


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 500;
const scaleFactor = 1; //scale for bg


const scaledCanvas = {
    width: canvas.width / scaleFactor,
    height: canvas.height / scaleFactor
}
bgMusic = document.getElementById("bgAudio");
imgMusic = document.getElementById("btnSonImg");
bgMusic.volume = 0.75;

function change_mute() {
    if (bgMusic.muted == false) {
      bgMusic.muted = true;
      imgMusic.src = "./img/sonoff.svg"
    } else {
      bgMusic.muted = false;
      imgMusic.src = "./img/sonon.svg"
    }
  
  }

let IDanimation = 1;

var colorSkin = localStorage.getItem('colorSkin');
const floor = 0;
const GLB_gravity = 1;
let GLB_velocityX = 5;
let GLB_velocityY = 17;
const GLB_speed = 10;
const GLB_bgColor = '#35daf0';
let GLB_scoreboard = [];
let GLB_currentScore = 0;
let GLB_pseudo = 'Player';

class Sprite {
    constructor({ position, velocity, animations }) {
        this.position = position;
        this.velocity = velocity;
        this.spriteWidth = 65;
        this.spriteHeight = 65;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.minFrame = 0;
        this.maxFrame = 355;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frameBuffer = 8;
        this.elapsedFrame = 0;
        this.lastKey;
        this.animations = animations;
        this.hasJumped = false;
    }   

    draw() {
        if (!this.image) return
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        if (collisionDetection(this)){
            console.log("collision returned true ");
            //subject.position.x = obs.obsRencontre.x;
            
        }
        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = floor;
        } else {
            this.velocity.y += GLB_gravity;
        }

        if((Math.round(this.position.y + this.height)) === canvas.height){
            player.hasJumped = false;
        }

        /*if(this.frameX < 8) this.frameX++;
        else 
        this.frameX = 0;*/
        this.elapsedFrame++;
        if (this.elapsedFrame % this.frameBuffer === 0) {
            if (this.frame < this.maxFrame) this.frame++;
            else this.frame = this.minFrame;
            this.frameX = this.frame % 8;
        }
    }
}

class SpriteBackground{
    constructor(image, speedBuffer){
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 500;
        this.x2 = this.width;
        this.speedBuffer = speedBuffer;
        this.speedy = GLB_speed * this.speedBuffer;
        this.image = image;
    }
    update(){
        this.speedy = GLB_speed * this.speedBuffer; 
        if(this.x <= -this.width){ 
            this.x = this.width + this.x2 - this.speedy;
        }
        if(this.x2 <= -this.width){
            this.x2  = this.width + this.x - this.speedy;
        }
        this.x = Math.floor(this.x - this.speedy);
        this.x2 = Math.floor(this.x2 - this.speedy);
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}


/*class Plateforme {
    constructor({ position, velocity, platef }) {
        this.position = position;
        this.velocity = velocity;
        this.image = new Image();
        this.image.src = platef;
    }
    draw() {
        if (!this.image) return
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }

    update() {
        this.draw();

    }

}
const plateforme1 = new Plateforme({
    position: {
        x: 400,
        y: 400,
        width: 166,
        height: 27
    }, velocity: {
        x: 0,
        y: 0
    },
    platef: ''
})

class Obstacle {
    constructor({ position, velocity, obs }) {
        this.position = position;
        this.velocity = velocity;
        this.image = new Image();
        this.image.src = obs;
    }
    draw() {
        if (!this.image) return
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }

    update() {
        this.draw();
        this.position.x -= GLB_speed * 0.1;
    }

}
const obstaclepique = new Obstacle({
    position: {
        x: 600,
        y: 480
    }, velocity: {
        x: 0,
        y: 0
    },
    obs: ''
})*/

let obs1 = new Crater({
    position: {
        x: canvas.width,
        y: canvas.height - 35 /* attention changer */
    }
});

let obs2 = new Comete({
    position: {
        x: canvas.width,
        y: 0
    }
});

const collisionBlocks = [obs1, obs2];

collisionBlocks.forEach(element => {
    //console.log(element);
    element.draw();
})

function createObstacles(nom){
    switch (nom) {
        case "Crater" :
            nbcrateres =  Math.floor((Math.random() * 3) +1);
            for (i =0;i<nbcrateres;i++){
                collisionBlocks.push(new Crater({
                    position: {
                        x: canvas.width + i * 25,
                        y: canvas.height - 35 /* attention changer */
                    }
                }))
            }
            break;
        
        case "Comet" : 
            nbcrateres =  Math.floor((Math.random() * 3) +1);
            for (i =0;i<nbcrateres;i++){
                collisionBlocks.push(new Comete({
                    position: {
                        x: canvas.width,
                        y: 0
                    }
                }))
            }
            break;
    }
    
    
}

//return :
//          - object position
//          - collision : bool to know if there is collision
//          - bord
//return false sinon
function collisionDetection(subject) {
    var collision = false;
    collisionBlocks.forEach(obstacle=> {
        //console.log("obs de nom " + obstacle.constructor.name  + " avec pour bas " + obstacle.position.y);
        if( subject.position.x + subject.width>= obstacle.position.x 
            && subject.position.x< obstacle.position.x + obstacle.width
            && subject.position.y + subject.height >= obstacle.position.y
            && subject.position.y < obstacle.position.y + obstacle.height
            )
            {
            collision = true;
        }
    } )
    return collision;
}


const keys = {
    z: {
        pressed: false
    },
    q: {
        pressed: false
    },
    d: {
        pressed: false
    },
    arrowUp: {
        pressed: false
    },
    arrowLeft: {
        pressed: false
    },
    arrowRight: {
        pressed: false
    }
}

//function init() {
/* mettre dans une fonction, dans un autre fichier, et l'appeler ici */
const playerDontMove = new Image();
playerDontMove.src = './img/playerDontMove.png';
const playerDontMoveRed = new Image();
playerDontMoveRed.src = './img/playerDontMoveRed.png';
const playerDontMoveBlue = new Image();
playerDontMoveBlue.src = './img/playerDontMoveBlue.png';

const playerRight = new Image();
playerRight.src = './img/playerRight.png';
const playerRightRed = new Image();
playerRightRed.src = './img/playerRightRed.png';
const playerRightBlue = new Image();
playerRightBlue.src = './img/playerRightBlue.png';

const playerJump = new Image();
playerJump.src = './img/playerJump.png';
const playerJumpRed = new Image();
playerJumpRed.src = './img/playerJumpRed.png';
const playerJumpBlue = new Image();
playerJumpBlue.src = './img/playerJumpBlue.png';

const playerLeft = new Image();
playerLeft.src = './img/playerLeft.png';
const playerLeftRed = new Image();
playerLeftRed.src = './img/playerLeftRed.png';
const playerLeftBlue = new Image();
playerLeftBlue.src = './img/playerLeftBlue.png';

const playerDead = new Image();
playerDead.src = './img/playerDead.png';
const playerDeadRed = new Image();
playerDeadRed.src = './img/playerDeadRed.png';
const playerDeadBlue = new Image();
playerDeadBlue.src = './img/playerDeadBlue.png';
/* --- */



const player = new Sprite({
    position: {
        x: 0,
        y: 0
    }, velocity: {
        x: 0,
        y: 0
    },
    animations: { // 0=> noir, 1=> rouge, 2=> bleu
        static: [playerDontMove, playerDontMoveRed, playerDontMoveBlue],
        right: [playerRight, playerRightRed, playerRightBlue],
        jump: [playerJump, playerJumpRed, playerJumpBlue],
        left: [playerLeft, playerLeftRed, playerLeftBlue]
    }
    
});
player.draw();


/* mettre dans une fonction, dans un autre fichier, et l'appeler ici */
const floorLayer = new Image();
floorLayer.src = './img/floor.png'; //first layer
const routeLayer = new Image();
routeLayer.src = './img/route.png'; //first layer
const batimentLayer = new Image();
batimentLayer.src = './img/batiment.png';
const rocheLayer = new Image();
rocheLayer.src = './img/roche.png';
const skyLayer = new Image();
skyLayer.src = './img/sky.png';
const ovniLayer = new Image();
ovniLayer.src = './img/ovni.png'; //last layer
/* --- */


const layer1 = new SpriteBackground(floorLayer,0.6);
const layer2 = new SpriteBackground(routeLayer,0.5);
const layer3 = new SpriteBackground(rocheLayer,0.4);
const layer4 = new SpriteBackground(batimentLayer,0.2);
const layer5 = new SpriteBackground(skyLayer,0.1);
const layer6 = new SpriteBackground(ovniLayer,0.3);

//}
//init();

var countCraters = 0;
let countComets = 0;
var tt = 0;

function animate() {

    /*background*/
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    layer5.draw();
    layer5.update();
    layer6.draw();
    layer6.update();
    layer4.draw();
    layer4.update();
    layer3.draw();
    layer3.update();
    layer2.update();
    layer2.draw();
    layer1.update();
    layer1.draw();
    
    
    IDanimation = window.requestAnimationFrame(animate);
    /*player*/
    player.update();

    /*plateformes*/
    //plateforme1.update();
    collisionBlocks.forEach((element, i)=>{
        if (element.constructor.name = "Comete" 
        && element.position.x >= 0 
        && element.position.y + element.height + element.velocity.y >= canvas.height ){
            collisionBlocks[i]= new Crater({
                position: {
                    x: element.position.x,
                    y: canvas.height - 35
                }
            })
        }
        else if (element.position.x >= 0 &&  element.position.y  <= canvas.height ){
            
            element.update();
        }
        else {
            collisionBlocks.splice(i,1);
        }
    })

    player.velocity.x = 0;

    if (countCraters < document.timeline.currentTime / 2500){
        countCraters++;
        createObstacles("Crater");
    }

    if (countComets < document.timeline.currentTime / 1750){
        countComets++;
        createObstacles("Comet");
    }

    /*if((keys.z.pressed && player.lastKey === 'z') || (keys.arrowUp.pressed && player.lastKey === 'ArrowUp')) {
        player.velocity.y = -GLB_velocityY;
    } else if ((keys.q.pressed && player.lastKey === 'q') || (keys.arrowLeft.pressed && player.lastKey === 'ArrowLeft')) {
        player.velocity.x = -GLB_velocityX;
    } else if ((keys.d.pressed && player.lastKey === 'd') || (keys.arrowRight.pressed && player.lastKey === 'ArrowRight')) {
        player.velocity.x = GLB_velocityX;
    }*/
    if ((keys.z.pressed || keys.arrowUp.pressed) && ((Math.round((player.position.y + player.height) / 100) * 100) == canvas.height) && player.hasJumped !== true) {
        player.velocity.y = -GLB_velocityY;
        player.image = player.animations.jump[colorSkin];
        player.hasJumped = true
    }else if (player.velocity.y == floor){
        player.image = player.animations.static[colorSkin];
    }if (keys.q.pressed || keys.arrowLeft.pressed) {
        player.velocity.x = -GLB_velocityX;
        player.image = player.animations.left[colorSkin];
    }if (keys.d.pressed || keys.arrowRight.pressed) {
        player.velocity.x = GLB_velocityX;
        player.image = player.animations.right[colorSkin];
    }
}

animate();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'z':
            keys.z.pressed = true;
            player.lastKey = 'z';
            
            break;
        case 'q':
            keys.q.pressed = true;
            player.lastKey = 'q';
            break;
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'ArrowUp':
            keys.arrowUp.pressed = true;
            player.lastKey = 'ArrowUp';
            break;
        case 'ArrowLeft':
            keys.arrowLeft.pressed = true;
            player.lastKey = 'ArrowLeft';
            break;
        case 'ArrowRight':
            keys.arrowRight.pressed = true;
            player.lastKey = 'ArrowRight';
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'z':
            keys.z.pressed = false;
            break;
        case 'q':
            keys.q.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        case 'ArrowUp':
            keys.arrowUp.pressed = false;
            break;
        case 'ArrowLeft':
            keys.arrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.arrowRight.pressed = false;
            break;
    }
});

let pauseImg = new Image();
pauseImg.src = './img/logoPause.png';

var startTime, endtime, timediff;
function toggleAnimation() {
    // console.log(IDanimation);
    if (IDanimation==0) {
        // Animation stoppée : on la relance
        animate();  
        
        
    } else {  // Arrêt de l'animation
        
        cancelAnimationFrame(IDanimation);
        
        IDanimation=0;
        ctx.save();
        ctx.scale(0.25, 0.25);
        ctx.drawImage(pauseImg, canvas.width * 1.65 ,canvas.height * 1.25);
        ctx.restore();
    }
}

window.addEventListener('keypress', (event) =>{
   if (event.key == 'p'){
        toggleAnimation();
   }
});
