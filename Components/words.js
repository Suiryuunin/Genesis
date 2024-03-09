let id = 0;

class Word {

    constructor(word, x, y, display, settings, offsetX = 0, maxY = 9 * 32, centered = false, size = 16, color, color2, alpha = 1, alpha2 = 0, alphaO = 1) {

        this.id = id;
        id++;

        this.display = display;
        this.settings = settings;
        this.word = word;
        this.overlay = '';
        this.x = x;
        this.y = y;
        this.w = this.display.measureWordWidth(this.display.buffer, this.word, this.size);
        this.h = Math.round(16 * size / 16 + 2 - (size - 16) * 2);

        this.offsetX = offsetX;
        this.maxY = maxY;
        this.speed = Math.round((Math.random()) * (this.settings.speed - 1)) + 1;
        this.velX = Math.round((Math.random()) * (this.settings.speed - 1)) + 1;
        this.velY = 0;
        this.gravity = Math.round((Math.random()) * (this.settings.speed - 1)) + 1;
        this.loss = 0.5;
        this.cumLoss = 0.5;
        this.r = [];
        this.l = [];
        this.t = [];
        this.b = [];

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

    collide(target, i, forWhat, update = false) //Check if their horizontal sides are in the same zone on the X axis
    {
        let sides = "";
        
        //Horizontal
        if
        (
            ( //this has its right edge around the same zone as the target's horizontal side
                this.x + this.w * (this.offsetX+1) + 10 > target.x + target.w * target.offsetX - 4 && //right ->
                this.x + this.w * (this.offsetX+1) + 10 < target.x + target.w * (target.offsetX+1) + 10 //right <-
            )
        )
        {sides += "r"; if (update) this.r[i] = true;}
        else
        {this.r[i] = false;}

        if
        (
            ( //this has its left edge around the same zone as the target's horizontal side
                this.x + this.w * this.offsetX - 4 > target.x + target.w * target.offsetX - 4 && //left ->
                this.x + this.w * this.offsetX - 4 < target.x + target.w * (target.offsetX+1) + 10 //left <-
            )
        )
        {sides += "l"; if (update) this.l[i] = true;}
        else
        {this.l[i] = false;}

        if
        (
            ( //this has its both edges outside the zone of the target's horizontal side
                this.x + this.w * this.offsetX - 4 < target.x + target.w * target.offsetX - 4 && //left <-
                this.x + this.w * (this.offsetX+1) + 10 > target.x + target.w * (target.offsetX+1) + 10 //right ->
            )
        )
        {
            sides += "rl";
            if (update)
            {
                this.r[i] = true;
                this.l[i] = true;
            }
        }

        //Vertical

        if
        (
            ( //this has its bottom edge around the same zone as the target's vertical side
                this.y > target.y && //top v
                this.y < target.y + target.h //top ^
            )
        )
        {sides += "t"; if (update) this.t[i] = true;}
        else
        {this.t[i] = false;}

        if
        (
            ( //this has its bottom edge around the same zone as the target's vertical side
                this.y + this.h > target.y && //bottom v
                this.y + this.h < target.y + target.h //bottom ^
            )
        )
        {sides += "b"; if (update) this.b[i] = true;}
        else
        {this.b[i] = false;}

        if
        (
            ( //this has its both edges outside the zone of the target's vertical side
                this.y < target.y && //top ^
                this.y + this.h > target.y + target.h //bottom v
            )
        )
        {
            sides += "tb";
            if (update)
            {
                this.t[i] = true;
                this.b[i] = true;
            }
        }

        return (sides.includes(forWhat));
    }
    collisionCheck(target, i)
    {
        switch(true)
        {
            case ((this.collide(target, i, 'rb') || this.collide(target, i, 'lb') || this.collide(target, i, 'rlb')) && !this.b[i]):
            {
                this.velY = this.gravity * 2 - this.loss;
                this.cumLoss += this.loss;
                break;
            }
            case ((this.collide(target, i, 'rt') || this.collide(target, i, 'lt') || this.collide(target, i, 'rlt')) && !this.t[i]):
            {
                this.velY -= this.gravity;
                this.cumLoss += this.loss;
                break;
            }
            case ((this.collide(target, i, 'rt') || this.collide(target, i, 'rb') || this.collide(target, i, 'rtb')) && !this.r[i]):
            {
                this.velX = -(Math.abs(this.velX) - this.loss);
                break;
            }
            case ((this.collide(target, i, 'lt') || this.collide(target, i, 'lb') || this.collide(target, i, 'ltb')) && !this.l[i]):
            {
                this.velX = (Math.abs(this.velX) - this.loss);
                break;
            }
        }
    }
    
    updatePos() {

        if (this.cH1)
            this.color = this.display.color;
        if (this.cH2)
            this.color2 = this.display.color;

        this.w = this.display.measureWordWidth(this.display.buffer, this.word, this.size);

        this.display.createWord(this.display.buffer, this.word, this.x - 1, this.y - 1, this.offsetX, true, 1, this.size, this.alpha2, this.color2, (this.size>16) ? -this.size/4 : 0);
        this.display.createWord(this.display.buffer, this.word, this.x, this.y, this.offsetX, true, 1, this.size, this.alpha, this.color, (this.size>16) ? -this.size/4 : 0);
        this.display.createWord(this.display.buffer, this.overlay,
            (this.centered) ? (this.x - Math.round(this.w/2)) : this.x, this.y,
            (this.centered) ? 0 : this.offsetX, false, 1, this.size, this.alphaO,
            'red'
        );
        this.display.createWord(this.display.buffer, this.overlay,
            (this.centered) ? (this.x - Math.round(this.w/2)) : this.x, this.y,
            (this.centered) ? 0 : this.offsetX, false, 1, this.size, this.alphaO,
            'red'
        );

        if (Math.floor(gameState) == 1)
        {
            if (this.settings.gameMode <= 1) //Normal fall
            {
                if (this.y <= this.maxY)
                    this.y += (this.settings.gameMode == 1) ? this.settings.speed : this.speed;
            }
            else //Bouncy
            {
                for (let i = 0; i < words.length; i++)
                {
                    if (words[i] != undefined && words[i].id != this.id)
                    {
                        this.collisionCheck(words[i], i);
                        this.collide(words[i], i, 'meh', true);
                    }
                }

                if (this.y + this.h >= this.maxY)
                {
                    this.velY = this.gravity * 3 - this.cumLoss;
                    this.cumLoss += this.loss;
                }

                if ((this.x + this.w * this.offsetX - 4 <= 0))
                    this.velX = (Math.abs(this.velX) - this.loss);

                if (this.x + this.w * (this.offsetX+1) + 10 >= viewport[0])
                    this.velX = -(Math.abs(this.velX) - this.loss);

                this.velY -= this.gravity/10;

                this.x += this.velX;
                this.y -= this.velY;
            }
        }

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
        this.display.createWord(this.display.buffer, this.words, this.x - 1, this.y - 1, this.offsetX, false, this.lines, this.size, this.alpha2, this.color2, (this.size>16) ? -this.size/4 : 0, 1);
        this.display.createWord(this.display.buffer, this.words, this.x,       this.y,       this.offsetX, false, this.lines, this.size, this.alpha,  this.color,  (this.size>16) ? -this.size/4 : 0, 1);

    }

}