class Particle
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.w = this.h = Math.round(Math.random()*2+5);
        this.velX = this.iVelX = Math.round(Math.random()*8+2) * (Math.round(Math.random())*2-1);
        this.velY = this.iVelY = Math.round(Math.random()*8+2) * (Math.round(Math.random())*2-1);
        this.lifetime = 69;
    }
    updatePos()
    {
        // Update the position
        this.x += this.velX;
        this.y -= this.velY;
        this.velX*=0.95;
        this.velY*=0.95;
        this.lifetime--;
    }
    updateRender()
    {
        // Update the render
        display.createFill(display.buffer, this.x, this.y, this.w, this.h, this.velX/this.iVelX, `hsl(${display.hueW}deg, ${display.saturationW}%, ${display.brightnessW}%)`);
    }
}