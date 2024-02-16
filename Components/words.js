class Word {

    constructor(word, x, y, display, settings, offsetX = 0, maxY = 9 * 32) {

        this.display = display;
        this.settings = settings;
        this.word = word;
        this.x = x;
        this.y = y;
        this.offsetX = offsetX;
        this.maxY = maxY;

    }
    
    updatePos() {

        this.display.createWord(this.display.buffer, this.word, this.x, this.y, this.offsetX);
        this.display.createWord(this.display.buffer, this.word, this.x, this.y, this.offsetX);
        if (this.y <= this.maxY && Math.floor(gameState) == 1)
            this.y += this.settings.speed;

    }

}