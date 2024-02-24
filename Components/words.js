class Word {

    constructor(word, x, y, display, settings, offsetX = 0, maxY = 9 * 32, centered = false) {

        this.display = display;
        this.settings = settings;
        this.word = word;
        this.overlay = '';
        this.x = x;
        this.y = y;
        this.offsetX = offsetX;
        this.maxY = maxY;
        this.centered = centered;

    }
    
    updatePos() {

        this.display.createWord(this.display.buffer, this.word, this.x, this.y, this.offsetX);
        this.display.createWord(this.display.buffer, this.word, this.x, this.y, this.offsetX);
        this.display.createWord(this.display.buffer, this.overlay,
            (this.centered) ? (this.x - Math.round(this.display.measureWordWidth(this.display.buffer, this.word)/2)) : this.x, this.y,
            (this.centered) ? 0 : this.offsetX, false, 1, 16, 1,
            'red'
        );
        this.display.createWord(this.display.buffer, this.overlay,
            (this.centered) ? (this.x - Math.round(this.display.measureWordWidth(this.display.buffer, this.word)/2)) : this.x, this.y,
            (this.centered) ? 0 : this.offsetX, false, 1, 16, 1,
            'red'
        );
        if (this.y <= this.maxY && Math.floor(gameState) == 1)
            this.y += this.settings.speed;

    }

}