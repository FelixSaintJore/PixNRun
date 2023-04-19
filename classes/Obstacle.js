let ObstacleSpeedX = -4;


class Obstacle {
    constructor({ position, imageSrc, velocity}) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.velocity = velocity;
        //pt devra le tejs
        this.width = this.image.width; //canvas.width / 30;
        this.height = this.image.height;// canvas.height / 20;
    }

    draw() {
        if(!this.image) return
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }

    //update(){}
}


class Comete extends Obstacle {
    
    constructor({ position}) {
        
        super({ position
            ,imageSrc : "img/ninja.png"
            ,velocity : {x : ObstacleSpeedX, y : 3}});
    }
    
    update() {
        
        if (this.position.x + this.width >= 0) {

            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.velocity.y += GLB_gravity * 0.1;
            this.draw();

        }
    }
}

class Crater extends Obstacle {
    constructor({ position}) {
        super({ position
            , imageSrc : "img/ninja.png"
            ,velocity : {x : ObstacleSpeedX, y : 0}
    });
    }
    
    update() {
        if (this.position.x + this.width >= 0 && this.position.y >= 0) {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.draw();

        }
    }

}

