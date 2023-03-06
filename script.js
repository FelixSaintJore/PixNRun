/* 

https://www.youtube.com/watch?v=rTVoyWu8r6g

*/

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;

const scaleFactor = 2;

const scaledCanvas = {
    width: canvas.width / scaleFactor,
    height: canvas.height / scaleFactor
}

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
player.draw();
console.log(player);

class Plateforme{
    constructor({position, platef}){
        this.position=position;
        this.image = new Image();
        this.image.src = platef;
    }
    draw() {
        if(!this.image) return
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
    },
    platef: './img/plateforme1.png'
})

class Obstacle{
    constructor({position,velocity, obs}){
        this.position=position;
        this.velocity = velocity;
        this.image = new Image();
        this.image.src = obs;
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
const obstaclepique = new Obstacle({
    position: {
        x: 600,
        y: 450
    }, velocity: {
        x: 0,
        y: 0
    },
    obs: './img/obspique.png'
})


class SpriteBackground {
    constructor({position, imageSrc}) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw() {
        if(!this.image) return
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }

    update() {
        this.draw();
    }
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

const background = new SpriteBackground({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

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
    /*plateformes*/
    plateforme1.update();
    /*obbstacles*/
    obstaclepique.update();
    /*player*/
    player.update();

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
    if (keys.d.pressed || keys.arrowRight.pressed) {
        player.velocity.x = GLB_velocityX;
    }
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
    }
});