/* 

https://www.youtube.com/watch?v=rTVoyWu8r6g

*/
// Your CSS as text
var styles = `
    #gallery {  
        width: 100%; 
        overflow: hidden;  
        white-space: nowrap;
    }
    #gallery img {  
        height: 200px;
    }
`



// window.addEventListener('load', (event) => {
//     console.log('The page has fully loaded');
//     canvasHeight = window.innerHeight* 0.9;
//     canvasWidth = window.innerWidth * 0.8;
// });


var styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)


const canvas = document.getElementById("canvasGame");
const ctx = canvas.getContext('2d');
const speed = 10;
const timer = Date.now;


canvas.width = window.innerWidth * 0.9;
canvas.height = 500;

const scaleFactor = 2;

const scaledCanvas = {
    width: canvas.width / scaleFactor,
    height: canvas.height / scaleFactor
}

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const GLB_gravity = .7;
let GLB_velocityX = 5;
let GLB_velocityY = 15;

const GLB_bgColor = '#35daf0';

class Sprite {
    constructor({position, velocity, persoImg}) {
        this.position = position;
        this.velocity = velocity;
        this.image = new Image();
        this.image.src = persoImg;
        this.width = 47;
        this.height = 159;
        this.lastKey;
    }

    draw() {
        if(!this.image) return
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        }else{
            this.velocity.y += GLB_gravity;
        }
    }
}

class obstacle {
    constructor({position, width, height}) {
        this.position = position;
        //this.velocity = velocity;
        this.width = width;
        this.height = height;
    }
    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        if (this.position.x + this.width  >= 0) {
            this.draw();
            this.position.x -= speed*0.1;
        }
        else {
            return 0;
        }
        

    }

}


class SpriteBackground {
    constructor({position, imageSrc}) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc[0];

    }

    draw() {
        if(!this.image) return
        ctx.drawImage(this.image, this.position.x, this.position.y);

    }

    update() {
        this.draw();
        this.position.x -= speed*0.1;
    }
}
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    }, velocity: {
        x: 0,
        y: 0
    },
    persoImg: './img/perso.png'
});


const block2 = new obstacle({
    position: {
        x: 200,
        y: 300
    },
    width: 40,
    height: 15
});

const block = new obstacle({
    position: {
        x: 100,
        y: 200
    },
    width: 50,
    height: 30
})
// need to add a queue to make the background


class ObstaclesOnScreen {
    constructor(listeObstacle) {
        this.listeObstacle = listeObstacle;
    }
    draw() {
        console.log("obstacles should be drawing now")
        this.listeObstacle.forEach(element => {
            element.draw();
        })
    }

    update() {
        this.listeObstacle.forEach(element => {
            element.update();

        })
    }
 } 

const tableObstacle = [block, block2];
const obsOnScreen = new ObstaclesOnScreen(tableObstacle);

obsOnScreen.draw();
player.draw();


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
    },
    arrowDown: {
        pressed : false
    }
}

const background = new SpriteBackground({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: ['./img/background.png']
})
//create an class with all the positions for the blocks + check with each move that we are not colliding 
function animate() {
    window.requestAnimationFrame(animate);
    //ctx.fillStyle = 'black';
    ctx.fillStyle = GLB_bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    //console.log('go');
    ctx.save();
    ctx.scale(scaleFactor, scaleFactor);
    ctx.translate(0, -background.image.height + scaledCanvas.height);
    background.update();
    ctx.restore();

    player.update();
    obsOnScreen.update();

    player.velocity.x = 0;

    /*if((keys.z.pressed && player.lastKey === 'z') || (keys.arrowUp.pressed && player.lastKey === 'ArrowUp')) {
        player.velocity.y = -GLB_velocityY;
    } else if ((keys.q.pressed && player.lastKey === 'q') || (keys.arrowLeft.pressed && player.lastKey === 'ArrowLeft')) {
        player.velocity.x = -GLB_velocityX;
    } else if ((keys.d.pressed && player.lastKey === 'd') || (keys.arrowRight.pressed && player.lastKey === 'ArrowRight')) {
        player.velocity.x = GLB_velocityX;
    }*/

    if((keys.z.pressed || keys.arrowUp.pressed) && ((Math.round((player.position.y + player.height) /100) * 100) == canvas.height)) {
        player.velocity.y = -GLB_velocityY;
    }
    if (keys.q.pressed|| keys.arrowLeft.pressed) {
        player.velocity.x = -GLB_velocityX;
    }
    if (keys.d.pressed || keys.arrowRight.pressed ) {
        player.velocity.x = GLB_velocityX;
    }
    if (keys.arrowDown.pressed && player.position.y >= canvas.height) {
        player.velocity.y = GLB_velocityY;
    }

    //creer une sorte de garbage collector pour quand les obstacles ne sont plus visible
}

animate();

window.addEventListener('keydown', (event) => {
    switch(event.key) {
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
        case 'ArrowDown' : 
            keys.arrowDown.pressed = true;
            player.lastKey = 'ArrowDown';
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch(event.key) {
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
        case 'ArrowDown':
            keys.arrowDown.pressed = false;
            break;
    }
});



 