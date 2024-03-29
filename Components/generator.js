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
                tTimes = 0;
            }

            if (localStorage.getItem('sent') == 'false' && tTimes > 3)
                document.querySelector('h2').style.display = `block`;
            
            localStorage.setItem('sent', 'false');
            tTimes++;

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

        if (this.settings.genMode == 0)
            this.storyMode(`Assets/Texts/${(this.settings.text.replaceAll(" ", "")).toLowerCase()}.txt`);

        else
            this.random(`Assets/Texts/${(this.settings.text.replaceAll(" ", "")).toLowerCase()}.txt`);
        
    }

}
