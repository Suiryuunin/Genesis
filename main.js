"use strict";

const render = () => 
{
    display.drawBackground(display.buffer);
    display.createObject(display.buffer, background, -16, -16, viewport[0] + 32, viewport[1] + 32, 0.5);

    if (Math.floor(gameState) >= 0) {
        if (Math.floor(gameState) == 0) {

            display.drawBackground(display.settings);
            display.createObject(display.settings, background, -16, -16, viewport[0] + 32, viewport[1] + 32, 0.5);

            document.querySelector('body').style.backgroundColor = `hsl(${display.hue}, ${display.saturation}%, ${(display.brightness - 10 < 0) ? 0 : display.brightness - 10}%)`;
            document.querySelector('div').style.filter = `hue-rotate(${display.hue}deg)`;
            document.querySelector('div').style.opacity = `${(display.brightness -25 < 50) ? 50 : display.brightness-25}%`;


            // display.createRect(display.settings, 0, 0, display.settings.canvas.width, display.settings.canvas.height, display.color, 10, 0.5);

            display.createWord(display.settings, "Settings", Math.floor(display.settings.canvas.width / 2), 32, -0.5, false, 1, 32);
            display.createWord(display.settings, "Settings", Math.floor(display.settings.canvas.width / 2), 32, -0.5, false, 1, 32);

            for (let i = 0; i < pages[Math.floor(gameState * 10 - 1)].length; i++) {

                pages[Math.floor(gameState * 10 - 1)][i].updatePos();
                
            }

            switch (Math.floor(gameState * 10 - 1)) {

                case 0:
                    display.createWord(display.settings, "Gameplay", Math.floor(display.settings.canvas.width / 2) + 2, 256 - 5, -0.5, false, 1, 16);
                    break;

                case 1:
                    display.createWord(display.settings, "Gameplay", Math.floor(display.settings.canvas.width / 2) + 2, 256 - 5, -0.5, false, 1, 16);
                    break;

                case 2:
                    display.createWord(display.settings, "Graphics", Math.floor(display.settings.canvas.width / 2) + 2, 256 - 5, -0.5, false, 1, 16);
                    break;

            }
        
        }

        if (generator.word != "") {
            for (let i = 0; i < words.length; i++) {

                if (words[i] != undefined)
                    words[i].updatePos();
                
            }
            
        }

        let scoresDisplays = [localStorage.getItem("Highscore").toString(), score.toString()];

        for (let i = 0; i < scoresDisplays.length; i++) {

            if (Math.floor(scoresDisplays[i].length / 3) > 0) {

                let newStr = scoresDisplays[i].slice(0, scoresDisplays[i].length % 3);

                if (scoresDisplays[i].length % 3 != 0)
                    newStr += "'";

                for (let j = 0; j < Math.floor(scoresDisplays[i].length / 3); j++) {

                    newStr += scoresDisplays[i].slice(scoresDisplays[i].length % 3 + j * 3, scoresDisplays[i].length % 3 + (j + 1) * 3) + "'";

                }
                newStr = newStr.substring(0, newStr.length - 1);

                scoresDisplays[i] = newStr;

            }

        }
        

        // UI
        display.createWord(display.buffer, ["Combo", combo], Math.floor(display.buffer.canvas.width / 2), 1, -0.5, true, 2);
        display.createWord(display.buffer, ["Highscore", scoresDisplays[0], "Score", scoresDisplays[1]], Math.floor(display.buffer.canvas.width) - 9, 1, -1, true, 4);
        display.createWord(display.buffer, display.input, Math.floor(display.buffer.canvas.width / 2), display.buffer.canvas.height - 17, -0.5, false);
        display.createWord(display.buffer, `[${display.input}]`, Math.floor(display.buffer.canvas.width / 2), display.buffer.canvas.height - 17, -0.5, false);
        display.createWord(display.buffer, `Lost ${lost}`, 1, display.buffer.canvas.height - 17, 0, false);
        display.createWord(display.buffer, `Typed ${typed}`, display.buffer.canvas.width - 9, display.buffer.canvas.height - 17, -1, false);

        display.createObject(display.buffer, heart, 0, 0, 32, 32);

        display.createRect(display.buffer, 36, 1, 124, 32);
        if (health > 0) {
            
            display.createRect(display.buffer, 40, 5, health, 24, color);
            display.createRect(display.buffer, 40, 5, health, 24, color);

        }
    }
    else
    {

        display.createWord(display.buffer, 'Genesis', 32 -8, Math.floor(display.buffer.canvas.height / 2) -48, 0, false, 1, 48);
        display.createWord(display.buffer, 'Genesis', 32 -8, Math.floor(display.buffer.canvas.height / 2) -48, 0, false, 1, 48);

        for (let i = 0; i < words.length; i++)
        {
            if (words[i] != undefined)
            {
                words[i].updatePos();
            }
        }
        display.createWord(display.buffer, `[${display.input}]`, Math.floor(display.buffer.canvas.width / 2), display.buffer.canvas.height - 17, -0.5, false);
    }

    display.render();

};

let aniCount = 0;
let aniTimes = 0;

const update = () => {

    if (Math.floor(gameState) >= 0) {
        increment = Math.round(10 * (settings.maxWords / 2) / (settings.interval / 40) * (settings.speed * 5) / (settings.health / 10) + settings.caps * 500);

        switch (Math.floor(gameState)) {

            case 0:

                if (mouseInput != undefined)
                    window.addEventListener("mousemove", mouseInput.move);
                
                
                settings.modify(pages[1][0].value, pages[1][1].value, pages[1][2].value, pages[1][4].index, pages[1][5].index, pages[0][0].options[pages[0][0].index], pages[0][1].index, pages[0][2].value, pages[0][3].value);


                // Gameplay Pt1

                localStorage.setItem("Text", pages[0][0].index);

                localStorage.setItem("Mode", pages[0][1].index);

                localStorage.setItem("Words", pages[0][2].value - pages[0][2].valueOffset);

                localStorage.setItem("MaxChar", pages[0][3].value - pages[0][3].valueOffset);


                // Gameplay Pt2
                
                localStorage.setItem("MaxWords", pages[1][0].value - pages[1][0].valueOffset);
                
                localStorage.setItem("Interval", pages[1][1].value - pages[1][1].valueOffset);
                
                localStorage.setItem("Speed", pages[1][2].value - pages[1][2].valueOffset);
                
                localStorage.setItem("HP", pages[1][3].value - pages[1][3].valueOffset);
                
                localStorage.setItem("Caps", pages[1][4].index);
                
                localStorage.setItem("Auto", pages[1][5].index);
                

                // Graphics

                display.hue = pages[2][0].value;
                display.saturation = pages[2][1].value;
                display.brightness = pages[2][2].value;
                display.antiAlisasing = pages[2][3].index;
                
                localStorage.setItem("Hue", pages[2][0].value);
                localStorage.setItem("Sat", pages[2][1].value);
                localStorage.setItem("Bright", pages[2][2].value);
                localStorage.setItem("AA", pages[2][3].index);
                
                break;

            case 1:

                if (settings.old[0] != settings.text || settings.old[1] != settings.mode || settings.old[2] != settings.words || settings.old[3] != settings.maxChar)
                    setup();
                
                if (score < scoreTarget)
                    score += Math.ceil((scoreTarget - score) / 10);
                else if (score - 1 >= scoreTarget)
                    score += Math.floor((scoreTarget - score) / 5);
                

                if (combo < comboTarget)
                    combo += Math.ceil((comboTarget - combo) / 20);
                else
                    combo += Math.floor((comboTarget - combo) / 20);
                
                if (health >= Math.floor(healthTarget * (healthWidth / settings.health)))
                    health -= Math.ceil((health - healthTarget * (healthWidth / settings.health)) / 20);
                else
                    health -= Math.floor((health - healthTarget * (healthWidth / settings.health)) / 20);
                
                let scores = [score, localStorage.getItem("Highscore")];
                localStorage.setItem("Highscore", Math.max(...scores));
                
                if (healthTarget <= 0 && !finished) {

                    for (let i = 0; i < settings.maxWords; i++)
                            delete words[i];

                    generator.word = undefined;

                }

                if (count > settings.interval) {

                    if (!finished) {

                        for (let i = 0; i < settings.maxWords; i++) {

                            if (words[i] == undefined) {
                
                                if (generator.word == undefined) {
                
                                    finished = true;
                                    for (let i = 0; i < settings.maxWords; i++) {

                                        if (words[i] != undefined) {

                                            finished = false;

                                        }

                                    }
                                    
                                    if (finished) {

                                        if (healthTarget > 0)
                                            clearState = lost > 0 ? "CLEAR" : "FULL COMBO";
                                        else
                                            clearState = "YOU DIED";
                
                                        words[i]  = new Word(clearState, display.buffer.canvas.width / 2, -16, display, settings, -0.5, display.buffer.canvas.height / 2 - 8, true);
                                        
                                    }

                                    break;
                
                                }
                                
                                if (wordsSum < settings.words) {

                                    words[i] = new Word(generator.word, Math.floor(Math.random() * (display.buffer.canvas.width - generator.word.length * 10 - 5) + 5), -16, display, settings);
                                    wordsSum++;
                                    generator.Generate();


                                } else {

                                    generator.word = undefined;

                                }
                                break;
                
                            }
                
                        }
                        count = 0;

                    }

                } else {

                    for (let i = 0; i < words.length; i++) {

                        if (words[i] != undefined && words[i].y > viewport[1] ) {
                
                            comboTarget = 0;
                            lost += 1;
                            healthTarget -= 1;
                            delete words[i];
                
                        }
                
                    }

                }


                if (settings.auto == 1)
                    check();
                
                count++;
                break;

        }

        color = `hsl(${health - 20}, ${Math.min(...[display.saturation, display.brightness])}%, ${(health/healthWidth) * 50 + 25}%)`;
    }
    else
    {
        if (option != undefined)
        {
            words[option].x += aniCount ** 2;
            aniCount++;
            if (words[option].x - display.measureWordWidth(display.buffer, words[option].word) > viewport[0])
            {
                switch(option)
                {
                    case 0:
                        setup();
                        break;
                    case 1:
                        break;
                    case 2:
                        window.open("Assets/Miscellaneous/dummy.html");
                        window.close();
                        
                        break;
                }
                option = undefined;
                aniCount = 0;
            }
        }
    }
    if (Math.floor(gameState) != 0 && display.input == "")
        display.input = "...";

};

