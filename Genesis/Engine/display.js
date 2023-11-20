class Display {

    "use strict";

    constructor(canvas) {

        this.display = canvas.getContext("2d");
        this.buffer = document.createElement("canvas").getContext("2d");
        this.settings = document.createElement("canvas").getContext("2d");
        this.input = "";

    }

    drawBackground(ctx) {

        ctx.fillStyle = "#54824a";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    }

    createWord(ctx, word, x, y, offsetX = 0, border = true, words = 1, size = 16) {

        ctx.imageSmoothingEnabled = false;

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

            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.rect(x, y, this.width + 8, 16 * words);
            ctx.stroke();

        }
        
        
        ctx.fillStyle = "black";
        if (words > 1) {

            for (let i = 0; i < words; i++) {

                ctx.fillText(word[i], x + 5 + (this.width - ctx.measureText(word[i])["width"]), (i + 1) * (y + 14), this.width + 4);

            }

        } else
            ctx.fillText(word, x + 5, y + 14, this.width + 4);

    }

    createObject(ctx, img, x, y, width, height) {

        ctx.drawImage(img, x, y, width, height);

    }

    createRect(ctx, x, y, width, height, color = "black", thickness = 1) {

        ctx.lineWidth = thickness;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.stroke();

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

        this.display.imageSmoothingEnabled = false;

        switch (gameState) {

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
        
    }

}