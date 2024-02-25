class Word {

    constructor(word, x, y, display, settings, offsetX = 0, maxY = 9 * 32, centered = false, size = 16) {

        this.display = display;
        this.settings = settings;
        this.word = word;
        this.overlay = '';
        this.x = x;
        this.y = y;
        this.offsetX = offsetX;
        this.maxY = maxY;
        this.centered = centered;
        this.size = size;

    }
    
    updatePos() {

        // this.display.createWord(this.display.buffer, this.word, this.x, this.y, this.offsetX, true, 1, this.size);
        this.display.createWord(this.display.buffer, this.word, this.x, this.y, this.offsetX, true, 1, this.size, 1, this.display.color, (this.size>16) ? -this.size/4 : 0);
        this.display.createWord(this.display.buffer, this.overlay,
            (this.centered) ? (this.x - Math.round(this.display.measureWordWidth(this.display.buffer, this.word)/2)) : this.x, this.y,
            (this.centered) ? 0 : this.offsetX, false, 1, this.size, 1,
            'red'
        );
        this.display.createWord(this.display.buffer, this.overlay,
            (this.centered) ? (this.x - Math.round(this.display.measureWordWidth(this.display.buffer, this.word)/2)) : this.x, this.y,
            (this.centered) ? 0 : this.offsetX, false, 1, this.size, 1,
            'red'
        );
        if (this.y <= this.maxY && Math.floor(gameState) == 1)
            this.y += this.settings.speed;

    }

}