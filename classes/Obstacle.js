let ObstacleSpeedX = -3;


class Obstacle {
    constructor({ position, imageSrc, velocity}) {
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
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.velocity = velocity;
        //this.animations = ;

       }

    draw() {
        if(!this.image) return
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.width, this.height);
    }

    //update(){}
}


class Comete extends Obstacle {
    
    constructor({ position}) {
        
        super({ position
            ,imageSrc : "img/meteor.png"
            ,velocity : {x : ObstacleSpeedX, y : 3}});
    }
    
    update() {
        
        if (this.position.x + this.width >= 0) {

            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.velocity.y += GLB_gravity * 0.01;
            this.draw();

        }
    }
}

class Crater extends Obstacle {
    constructor({ position}) {
        super({ position
            , imageSrc : "img/crater.png"
            ,velocity : {x : ObstacleSpeedX, y : 0}
    });
    }
    
    update() {
        if (this.position.x + this.width >= 0 && this.position.y >= 0) {
            this.position.x += this.velocity.x;
            this.draw();

        }
    }

}

