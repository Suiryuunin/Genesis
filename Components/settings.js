class Settings {

    constructor() {

        // Default values
        // Setup
        this.text = "Genesis";
        this.genMode = 0;
        this.gameMode = 0;
        this.oGameMode = 0;
        this.words = 30;
        this.maxChar = 30;
        
        // Gameplay
        this.maxWords = 3;
        this.interval = 50;
        this.speed = 2;
        this.health = 3;
        this.caps = false;
        this.auto = 1;
        this.old = [this.text, this.genMode, this.gameMode, this.words, this.maxChar];
        this.check = false;

    }

    updateOld()
    {
        this.old = [this.text, this.genMode, this.gameMode, this.words, this.maxChar];
    }

    modify(/* Gameplay -> */ maxWords, interval, speed, caps, auto, space,
        /* Setup -> */ text = this.text, genMode = this.genMode, gameMode = this.gameMode, words = this.words, maxChar = this.maxChar)
    {

        this.maxWords = maxWords;
        this.interval = interval;
        this.speed = speed;
        this.caps = caps;
        this.auto = auto;
        this.check = space;

        this.text = text;
        this.genMode = genMode;
        this.gameMode = gameMode;
        this.words = words;
        this.maxChar = maxChar;

    }
    
}

class Slider {

    constructor(setting, x, y, width, height, display, value = 0, minMax, valueOffset = 0, alpha = 1) {

        this.type = "slider";

        this.setting = setting;

        this.x = x + 60;
        this.y = y;
        this.barX = x + Math.floor(width / 2);
        this.barY = y + Math.floor(height / 2);
        this.fixedPos = [this.x + width / 2, this.y];
        this.width = width;
        this.height = height;
        this.display = display;
        this.value = value;
        this.minMax = minMax;
        this.valueOffset = valueOffset;

        this.alpha = alpha

        this.barWidth = this.width + Math.floor(this.display.settings.canvas.width / 2) - 48;

    }

    updatePos() {

        this.display.createWord(this.display.settings, this.setting, 48, this.y - 5, 0, false, 1, 16, this.alpha);

        this.display.createRect(this.display.settings, this.x, this.y, this.width, this.height, this.display.color, 1, this.alpha);
        this.display.createRect(this.display.settings, this.x, this.y, this.width, this.height, this.display.color, 1, this.alpha);
        this.display.createRect(this.display.settings, this.fixedPos[0], this.fixedPos[1] + 3, this.barWidth, this.height - 6, this.display.color, 1, this.alpha);
        
        this.display.createWord(this.display.settings, this.value, 196, this.y - 5, -0.5, false);
        this.display.createFill(this.display.settings, this.x, this.y, this.width, this.height, 0.5 - (1-this.alpha) / 2)

    }

}

class Options {

    constructor(setting, x, y, display, options, index = 0, offsetX = 0, alpha = 1) {

        this.type = "options";

        this.setting = setting;

        this.x = x + 168;
        this.y = y - 5;
        this.fixedPos = [this.x, this.y];
        this.offsetX = offsetX;

        this.display = display;
        this.options = options;
        this.index = index;

        this.display.settings.font = `16px MisterPixel`;
        this.width = this.display.settings.measureText(this.options[this.index])["width"];
        this.height = 16;

        this.alpha = alpha

    }

    updatePos() {

        this.display.settings.font = `16px MisterPixel`;
        this.width = this.display.settings.measureText(this.options[this.index])["width"];

        this.x = this.fixedPos[0] + this.offsetX * this.width + 2;

        this.display.createWord(this.display.settings, this.setting, 48, this.y, 0, false, 1, 16, this.alpha);
        this.display.createWord(this.display.settings, this.options[this.index], this.fixedPos[0], this.y, this.offsetX, true, 1, 16, this.alpha);

    }

}

class Button {

    constructor(x, y, display, text, offsetX = 0, enabled, pageChange) {

        this.type = "button";

        this.text = text;

        this.x = x;
        this.y = y - 6;
        this.fixedPos = [this.x, this.y];
        this.offsetX = offsetX;
        this.enabled = enabled;

        this.display = display;

        this.display.settings.font = `16px MisterPixel`;
        this.width = this.display.settings.measureText(this.text)["width"];
        this.height = 16;

        this.action = () => {

            if (enabled) {

                if (pageChange * 0 == 0)
                {
                    gameState += pageChange;
                    lastPage += pageChange;
                }
                else
                {
                    document.getElementById('borderS').style.display = 'none';
                    
                    INIT();
                }

            }
        
        }

    }

    updatePos() {

        this.display.settings.font = `16px MisterPixel`;
        this.width = this.display.settings.measureText(this.text)["width"];

        this.x = this.fixedPos[0] + this.offsetX * this.width + 2;

        this.display.createWord(this.display.settings, this.text, this.fixedPos[0], this.y, this.offsetX, false, 1, 16, (this.enabled) ? 1 : 0.5);

    }

}