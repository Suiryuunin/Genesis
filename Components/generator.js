"use strict";

localStorage.setItem('sent', 'false');
let tTimes = 0;

class Generator {

    constructor(display, settings) {

        this.index = 0;
        this.word = "";
        this.display = display;
        this.settings = settings;

        this.generate = function(url, callback) {
    
            const request = new XMLHttpRequest();

            request.onload = function() {
                
                if (request.readyState == 4 && request.status == 200) {
                    callback(this.responseText.split(" "));
                }
                document.querySelector('h2').style.display = `none`;
                localStorage.setItem('sent', 'true');
            }

            if (localStorage.getItem('sent') == 'false' && tTimes > 0)
                document.querySelector('h2').style.display = `block`;
            
            localStorage.setItem('sent', 'false');
            tTimes++;

            console.log(url);

            request.open("GET", url, true);
            request.send();
    
        }

    }


    random(url) {

        this.generate(url, (output) => {
            let index = Math.floor(Math.random() * output.length);
            while (output[index].length > this.settings.maxChar)
                index = Math.floor(Math.random() * output.length);

            this.word = output[index];

            if (this.word.includes("Chapter")) {

                this.word = [this.word.slice(0, 7), [this.word.slice(7)]].join(" ");

            }

            if (this.settings.caps == 0)
                this.word = this.word.toLowerCase();

        });

    }

    storyMode(url) {

        this.generate(url, (output) => {

            while (output[this.index].length > this.settings.maxChar)
                this.index++;

            this.word = output[this.index];

            if (this.settings.caps == 0)
                this.word = this.word.toLowerCase();

            this.index++;

        });

    }

    Generate() {

        if (this.settings.mode == 0)
            this.storyMode(`Assets/Texts/${(this.settings.text.replaceAll(" ", "")).toLowerCase()}.txt`);

        else
            this.random(`Assets/Texts/${(this.settings.text.replaceAll(" ", "")).toLowerCase()}.txt`);
        
    }

}
