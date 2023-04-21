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
            ninjaDeath();
            
        }
        
        if (this.position.x + this.width + this.velocity.x >= canvas.width) {
            this.position.x = canvas.width - this.width;
        }
        else if (this.position.x + this.velocity.x <= 0){
            this.position.x = 0;
        }
        else {
            this.position.x += this.velocity.x;
        }
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
        this.draw();
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
