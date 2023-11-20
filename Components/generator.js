"use strict";

class Generator {

    constructor(display) {

        this.index = 0;
        this.word = "";
        this.display = display;

        this.generate = function(url, callback) {
    
            const request = new XMLHttpRequest();
    
            request.onload = function() {
                
                if (request.readyState == 4 && request.status == 200) {
                    callback(this.responseText.split(" "));
                }
            }
    
            request.open("GET", url, true);
            request.send();
    
        }

    }


    random(url) {

        this.generate(url, (output) => {
            this.word = output[Math.floor(Math.random() * output.length)];
            if (this.word.includes("Chapter")) {

                this.word = [this.word.slice(0, 7), [this.word.slice(7)]].join(" ");

            }

        });

    }

    storyMode(url) {

        this.generate(url, (output) => {

            this.word = output[this.index];
            if (this.word != undefined && this.word.includes("Chapter")) {

                this.word = [this.word.slice(0, 7), [this.word.slice(7)]].join(" ");

            }
            this.index++;

        });

    }

}