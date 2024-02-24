class Display {

    "use strict";

    constructor(canvas) {

        this.display = canvas.getContext("2d");
        this.buffer = document.createElement("canvas").getContext("2d");
        this.settings = document.createElement("canvas").getContext("2d");
        this.input = "";
        this.color = "black";
        this.hue = 109;
        this.saturation = 27;
        this.brightness = 40;
        this.antiAlisasing = 0;

    }

    drawBackground(ctx) {

        ctx.fillStyle = `hsl(${this.hue}, ${this.saturation}%, ${this.brightness}%)`;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    }

    measureWordWidth(ctx, word, size = 16) {

        ctx.font = `${size}px MisterPixel`;
        return ctx.measureText(word)["width"];
    }

    createWord(ctx, word, x, y, offsetX = 0, border = true, words = 1, size = 16, alpha, color = this.color) {

        ctx.globalAlpha  = alpha;
        ctx.lineWidth = 1;

        ctx.font = `${size}px MisterPixel`;
        this.widths = [];
        if (words > 1) {

            for (let i = 0; i < words; i++) {

                this.widths[i] = ctx.measureText(word[i])["width"];

            }

            this.width = Math.max(...this.widths);

        } else
            this.width = ctx.measureText(word)["width"];

        if (offsetX != 0)
            x += Math.floor(this.width * offsetX);

        if (border) {

            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.rect(x, y, this.width + 8, 16 * words);
            ctx.stroke();

        }
        
        
        ctx.fillStyle = color;
        if (words > 1) {

            for (let i = 0; i < words; i++) {

                ctx.fillText(word[i], x + 5 + (this.width - ctx.measureText(word[i])["width"]), (i + 1) * (y + 14), this.width + 4);

            }

        } else
            ctx.fillText(word, x + 5, y + 14, this.width + 4);

        ctx.globalAlpha = 1;
    }

    createObject(ctx, img, x, y, width, height, alpha = 1) {
        
        ctx.globalAlpha = alpha;
        ctx.drawImage(img, x, y, width, height);

    }

    createRect(ctx, x, y, width, height, color = this.color, thickness = 1, alpha = 1) {

        ctx.globalAlpha = alpha;
        ctx.lineWidth = thickness;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.stroke();
        ctx.globalAlpha = 1;

    }

    createFill(ctx, x, y, width, height, alpha = 1) {

        ctx.globalAlpha = alpha;
        ctx.fillStyle = `hsl(${this.hue}, ${this.saturation}%, ${this.brightness}%)`;
        ctx.fillRect(x, y, width,height);
        ctx.globalAlpha = 1;

    }

    resize(width, height, ratio) {

        if (height / width > ratio) {

            this.display.canvas.height = width * ratio - 20;
            this.display.canvas.width = width - 20;
            
        } else {

            this.display.canvas.height = height - 20;
            this.display.canvas.width = height / ratio - 20;

        }

    }

    render() {

        this.display.imageSmoothingEnabled = this.antiAlisasing;

        switch (Math.floor(gameState)) {

            case 1:
                this.settings.clearRect(0, 0, this.settings.canvas.width, this.settings.canvas.height);

        }

        this.display.drawImage(this.buffer.canvas,
            0, 0,
            this.buffer.canvas.width, this.buffer.canvas.height,
            0, 0,
            this.display.canvas.width, this.display.canvas.height);
            
        this.display.drawImage(
            this.settings.canvas,
            0, 0,
            this.settings.canvas.width, this.settings.canvas.height,
            Math.floor(this.display.canvas.width / 10), Math.floor(this.display.canvas.height / 10),
            Math.floor(this.display.canvas.width * 8 / 10), Math.floor(this.display.canvas.height * 8 / 10));

        this.color = this.brightness <= 25 ? "white" : "black";
        
        this.display.canvas.style.borderColor = this.color;
        
    }

}