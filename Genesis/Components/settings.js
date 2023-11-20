class Settings {

    constructor() {

        // Default values
        this.maxWords = 3;
        this.interval = 50;
        this.speed = 3;
        this.health = 3;
        this.text = "Genesis";
        this.caps = false;

    }

    modify(text, maxWords, interval, speed, health, caps) {

        this.text = text;
        this.maxWords = maxWords;
        this.interval = interval;
        this.speed = speed;
        this.health = health;
        this.caps = caps;

    }
    
}

class SettingsObject {

    constructor(setting, x, y, width, height, color, display, value = 0, minMax, valueOffset = 0) {

        this.setting = setting;

        this.x = x;
        this.y = y;
        this.barX = x + Math.floor(width / 2);
        this.barY = y + Math.floor(height / 2);
        this.fixedPos = [x + width / 2, y + 3];
        this.width = width;
        this.height = height;
        this.color = color;
        this.display = display;
        this.value = value;
        this.minMax = minMax;
        this.valueOffset = valueOffset;

        this.barWidth = this.width + Math.floor(this.display.settings.canvas.width / 2) - 48;

    }

    updatePos() {

        this.display.createWord(this.display.settings, this.setting, 48, this.y - 5, 0, false);

        this.display.createRect(this.display.settings, this.x, this.y, this.width, this.height, this.color);
        this.display.createRect(this.display.settings, this.x, this.y, this.width, this.height, this.color);
        this.display.createRect(this.display.settings, this.fixedPos[0], this.fixedPos[1], this.barWidth, this.height - 6, this.color);
        
        this.display.createWord(this.display.settings, this.value, 48 + this.barWidth + 32, this.y - 5, 0, false);

    }

}