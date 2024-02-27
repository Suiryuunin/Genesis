class Word {

    constructor(word, x, y, display, settings, offsetX = 0, maxY = 9 * 32, centered = false, size = 16, color, color2, alpha = 1, alpha2 = 0, alphaO = 1) {

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

        this.color = color*0 == 0 ? this.display.color : color;
        this.color2 = color2*0 == 0 ? (color2 < 0 ? 'rgba(0,0,0,0)' : this.display.color) : color2;
        this.cH1 = color*0 == 0 ? true : false;
        this.cH2 = color2*0 == 0 ? true : false;
        this.alpha = alpha;
        this.alpha2 = alpha2;
        this.alphaO = alphaO;

    }
    
    updatePos() {

        if (this.cH1)
            this.color = this.display.color;
        if (this.cH2)
            this.color2 = this.display.color;

        // this.display.createWord(this.display.buffer, this.word, this.x, this.y, this.offsetX, true, 1, this.size);
        this.display.createWord(this.display.buffer, this.word, this.x - 0.5, this.y - 1, this.offsetX, true, 1, this.size, this.alpha2, this.color2, (this.size>16) ? -this.size/4 : 0);
        this.display.createWord(this.display.buffer, this.word, this.x, this.y, this.offsetX, true, 1, this.size, this.alpha, this.color, (this.size>16) ? -this.size/4 : 0);
        this.display.createWord(this.display.buffer, this.overlay,
            (this.centered) ? (this.x - Math.round(this.display.measureWordWidth(this.display.buffer, this.word, this.size)/2)) : this.x, this.y,
            (this.centered) ? 0 : this.offsetX, false, 1, this.size, this.alphaO,
            'red'
        );
        this.display.createWord(this.display.buffer, this.overlay,
            (this.centered) ? (this.x - Math.round(this.display.measureWordWidth(this.display.buffer, this.word, this.size)/2)) : this.x, this.y,
            (this.centered) ? 0 : this.offsetX, false, 1, this.size, this.alphaO,
            'red'
        );
        if (this.y <= this.maxY && Math.floor(gameState) == 1)
            this.y += this.settings.speed;

    }

}

class Words {

    constructor(words, lines, x, y, display, offsetX = 0, size = 16, color, color2, alpha = 1, alpha2 = 0) {

        this.display = display;
        this.word = "や";
        this.words = words;
        this.lines = lines;
        this.overlay = '';
        this.x = x;
        this.y = y;
        this.offsetX = offsetX;
        this.size = size;

        this.color = color*0 == 0 ? this.display.color : color;
        this.color2 = color2*0 == 0 ? (color2 < 0 ? 'rgba(0,0,0,0)' : this.display.color) : color2;
        this.cH1 = color*0 == 0 ? true : false;
        this.cH2 = color2*0 == 0 ? true : false;
        this.alpha = alpha;
        this.alpha2 = alpha2;

    }
    
    updatePos() {

        if (this.cH1)
            this.color = this.display.color;
        if (this.cH2)
            this.color2 = this.display.color;

        // this.display.createWord(this.display.buffer, this.word, this.x, this.y, this.offsetX, true, 1, this.size);
        this.display.createWord(this.display.buffer, this.words, this.x - 0.5, this.y - 0.1, this.offsetX, false, this.lines, this.size, this.alpha2, this.color2, (this.size>16) ? -this.size/4 : 0, 1);
        this.display.createWord(this.display.buffer, this.words, this.x,       this.y,       this.offsetX, false, this.lines, this.size, this.alpha,  this.color,  (this.size>16) ? -this.size/4 : 0, 1);

    }

}