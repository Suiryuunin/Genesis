"use strict";

const render = () => 
{
    display.drawBackground(display.buffer);
    display.createObject(display.buffer, background, -16, -16, viewport[0] + 32, viewport[1] + 32, 0.5);
    display.createRect(display.buffer, 1, 1, viewport[0]-2, viewport[1]-2, display.color, 2, 0.5);

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
                    display.createWord(display.settings, "Setup", Math.floor(display.settings.canvas.width / 2) + 2, 256 - 5, -0.5, false, 1, 16);
                    break;

                case 1:
                    display.createWord(display.settings, "Gameplay", Math.floor(display.settings.canvas.width / 2) + 2, 256 - 5, -0.5, false, 1, 16);
                    break;

                case 2:
                    display.createWord(display.settings, "Gameplay", Math.floor(display.settings.canvas.width / 2) + 2, 256 - 5, -0.5, false, 1, 16);
                    break;
                
                case 3:
                    display.createWord(display.settings, "Graphics", Math.floor(display.settings.canvas.width / 2) + 2, 256 - 5, -0.5, false, 1, 16);
                    break;

                case 4:
                    display.createWord(display.settings, "Graphics", Math.floor(display.settings.canvas.width / 2) + 2, 256 - 5, -0.5, false, 1, 16);
                    preview.updateRender();
                    break;

            }
        
        }

        if (generator.word != "") {
            for (let i = 0; i < words.length; i++) {

                if (words[i] != undefined)
                {
                    words[i].updatePos();
                    if (settings.gameMode > 1)
                    {
                        words[i].noClipping();
                        words[i].updateVel();
                    }
                    words[i].updateRender();
                }
                
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

        display.createObject(display.buffer, (settings.gameMode != 3 ? heart : heartI), 2, 2, 32, 32);

        if (settings.gameMode != 3)
        {
            display.createRect(display.buffer, 36, 1, 124, 32);
            if (health > 0) {
                
                display.createRect(display.buffer, 40, 5, health, 24, color);
                display.createRect(display.buffer, 40, 5, health, 24, color);

            }
        }
        
    }
    else
    {

        display.createWord(display.buffer, titleData[0], 32 -8, titleData[1], 0, false, 1, 48, 1, `hsl(${display.hueW}deg, ${display.saturationW}%, ${display.brightnessW}%)`);
        display.createWord(display.buffer, titleData[0], 32 -8 + 1, titleData[1] + 1, 0, false, 1, 48, 0.5);

        display.createObject(display.buffer, ((rTStep > rTSteps / 4) && (rTStep < (rTSteps / 4 * 3))) ? heartIR : heartI, Math.floor(viewport[0] / 4 * 3) - rW / 2, Math.floor(viewport[1] / 2) - 64 + 32, rW, 128);
        

        for (let i = 0; i < words.length; i++)
        {
            if (words[i] != undefined)
            {
                words[i].updatePos();
                words[i].updateRender();
            }
        }
        display.createWord(display.buffer, `[${display.input}]`, Math.floor(display.buffer.canvas.width / 2), display.buffer.canvas.height - 17, -0.5, false);
    }

    display.render();

};

let aniCount = 0;
let aniTimes = 0;
let rDelay = 0;

let instances = 0;

const update = () => {

    if (mobile)
    {
        if (input.value.length > 12 && (Math.floor(gameState) != 0))
            input.value = input.value.substring(0, 11);
        else if (input.value.length > 1 && (Math.floor(gameState) == 0))
            input.value = input.value.substring(0, 1);

        if (settings.check != 0 && input.value.includes(" ") && Math.floor(gameState != -1))
            input.value = input.value.replace(" ", "");
        display.input = input.value;
        
        for (let i = 0; i < words.length; i++) {
            if (words[i] != undefined) {
                if (display.input == words[i].word.substring(0, display.input.length))
                    words[i].overlay = display.input;
                else
                    words[i].overlay = '';
            }
        }
    }

    if (Math.floor(gameState) >= 0) {
        increment = (settings.gameMode != 3 ? (Math.round(10 * (settings.maxWords / 2) / (settings.interval / 40) * (settings.gameMode == 2 ? (5 / (settings.speed * (5**2)))**10 : (settings.speed * 5)) / (settings.health / 10) + settings.caps * 500) *((settings.gameMode+1)**2)) : 0);

        switch (Math.floor(gameState)) {

            case 0:

                if (mouseInput != undefined)
                    window.addEventListener("mousemove", mouseInput.move);

                if (pages[4][0].changed || pages[4][1].changed || pages[4][2].changed)
                {
                    for (let i = 0; i < words.length; i++)
                    {
                        if (words[i] != undefined)
                            words[i].color2 = `hsl(${display.hueW}deg, ${display.saturationW}%, ${display.brightnessW}%)`;
                    }
                    preview.color2 = `hsl(${display.hueW}deg, ${display.saturationW}%, ${display.brightnessW}%)`;
                }
                
                // Update settings
                settings.modify(pages[1][0].value, pages[1][1].value, pages[1][2].value, pages[1][4].index, pages[1][5].index, pages[2][0].index, pages[2][1].value, pages[2][2].index,
                    /* Setup -> */ pages[0][0].options[pages[0][0].index], pages[0][1].index, pages[0][2].index, pages[0][3].value, pages[0][4]);

                track.playbackRate = 1 + (settings.speed - 4)/10;
                

                // Set the local storage

                // Setup

                localStorage.setItem("Text", pages[0][0].index);
                localStorage.setItem("GenMode", pages[0][1].index);
                localStorage.setItem("GameMode", pages[0][2].index);
                localStorage.setItem("Words", pages[0][3].value - pages[0][3].valueOffset);
                localStorage.setItem("MaxChar", pages[0][4].value - pages[0][4].valueOffset);

                if (pages[0][3].value > 100)
                {
                    pages[0][1].index = 1;
                    pages[0][1].alpha = 0.5;
                    pages[0][3].fake = "∞";
                }
                else
                {
                    pages[0][1].alpha = 1;
                    pages[0][3].fake = undefined;
                }


                // Gameplay Pt1
                
                localStorage.setItem("MaxWords", pages[1][0].value - pages[1][0].valueOffset);
                localStorage.setItem("Interval", pages[1][1].value - pages[1][1].valueOffset);
                localStorage.setItem("Speed", pages[1][2].value - pages[1][2].valueOffset);
                localStorage.setItem("HP", pages[1][3].value - pages[1][3].valueOffset);
                localStorage.setItem("Caps", pages[1][4].index);
                localStorage.setItem("Auto", pages[1][5].index);
                
                // Gameplay Pt2

                localStorage.setItem("Check", pages[2][0].index);
                localStorage.setItem("BF", pages[2][1].value);
                localStorage.setItem("Ceil", pages[2][2].index);

                
                // Graphics

                display.hue = pages[3][0].value;
                display.saturation = pages[3][1].value;
                display.brightness = pages[3][2].value;

                display.antiAlisasing = pages[3][3].index;
                engine.fps = pages[3][4].value;
                
                localStorage.setItem("Hue", pages[3][0].value);
                localStorage.setItem("Sat", pages[3][1].value);
                localStorage.setItem("Bright", pages[3][2].value);
                localStorage.setItem("AA", pages[3][3].index);
                localStorage.setItem("FPS", pages[3][4].value - pages[3][4].valueOffset);

                // Graphics Pt2

                display.hueW        = pages[4][0].value;
                display.saturationW = pages[4][1].value;
                display.brightnessW = pages[4][2].value;
                
                localStorage.setItem("HueW"   , pages[4][0].value);
                localStorage.setItem("SatW"   , pages[4][1].value);
                localStorage.setItem("BrightW", pages[4][2].value);

                // Audio

                if (pages[5][0].changed)
                {
                    pages[5][0].changed = false;
                    const currentTime = track.currentTime;
                    track.src = _audioPath+`Tracks/${pages[5][0].options[pages[5][0].index].replace("-", "")}.wav`;
                    track.currentTime = currentTime;
                    track.play();
                }
                localStorage.setItem("Track", pages[5][0].index);


                // Game Modes
                gameModeUpdate();

                break;

            case 1:
                
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

                if (count > settings.interval)
                {
                    if (!finished)
                    {
                        for (let i = 0; i < settings.maxWords; i++)
                        {
                            if (words[i] == undefined)
                            {
                                if (generator.word == undefined)
                                {

                                    for (let i = 0; i < words.length; i++)
                                        if (words[i] != "CLEAR" || words[i] != "YOU DIED" || words[i] != "FULL COMBO") delete words[i];
                                    
                                    if (healthTarget > 0)
                                        clearState = lost > 0 ? "CLEAR" : "FULL COMBO";
                                    else
                                        clearState = "YOU DIED";
            
                                    words[i]  = new Word(clearState, display.buffer.canvas.width / 2, -16, display, settings, -0.5, (settings.gameMode > 1 ? viewport[1] - 8 : Math.floor(viewport[1]/2) - 8), true, 24, 'black', `hsl(${display.hueW}deg, ${display.saturationW}%, ${display.brightnessW}%)`, 0.5, 1);

                                    finished = true;
                                    break;
                                }

                                // Chaos Gamemode has, in reality a 250 word cap, in contrary to the ∞ it pretends to be...
                                while (wordsSum >= 250)
                                {
                                    let i = 0;
                                    while (words[i] == undefined)
                                    {
                                        i++;
                                    }
                                    
                                    delete words[i];
                                    wordsSum--;
                                }
                                if (wordsSum < settings.words || settings.words > 100)
                                {
                                                    
                                    instances++;

                                    words[i] = new Word(generator.word, Math.floor(Math.random() * (display.buffer.canvas.width - generator.word.length * 10 - 5) + 5), -16, display, settings, 0, viewport[1]+1, false, 16, 0, `hsl(${display.hueW}deg, ${display.saturationW}%, ${display.brightnessW}%)`, 0.5, 1);
                                    wordsSum++;
                                    generator.Generate();
                                }
                                else
                                {
                                    generator.word = undefined;
                                }

                                break;
                            }
                        }
                        count = 0;
                    }
                }

                for (let i = 0; i < words.length; i++) {

                    if (settings.gameMode != 3 && words[i] != undefined && words[i].y > viewport[1] ) {
            
                        comboTarget = 0;
                        lost += 1;
                        healthTarget -= 1;
                        delete words[i];
            
                    }
            
                }

                count++;

                if (settings.auto == 1)
                    check();
                
                break;

        }

        color = `hsl(${health - 20}, ${Math.min(...[display.saturation, display.brightness])}%, ${(health/healthWidth) * 50 + 25}%)`;
    }
    else
    {
        rW = (Math.tan(Math.PI / rSteps * rStep) < 1000) ? ((rR * Math.sin(Math.PI / rSteps * rStep)) / (Math.tan(Math.PI / rSteps * rStep)) * 2) : 0;
        rStep = (rStep == rSteps) ? 1 : rStep + 1;
        rTStep = (rTStep == rTSteps) ? 1 : rTStep + 1;
        rCount = 0;

        instructionsAnimations();

        if (option != undefined && words[option] != undefined)
        {
            words[option].x += aniCount * 2;
            if (rDelay > 5)
            {
                rSteps = rSteps - aniCount;
                rTSteps = rSteps * 2;
            }
            rDelay++;
            aniCount++;
            if (words[option].x - display.measureWordWidth(display.buffer, words[option].word) > viewport[0])
            {
                switch(words[option].word)
                {
                    case "New Game":
                        setup();
                        delete words[option];

                        break;

                    case "Instructions":

                        words = [];
                        words[0] = new Word('Back', 32, 240, display, settings, 0, 9 * 32, false, 24, 'black', `hsl(${display.hueW}deg, ${display.saturationW}%, ${display.brightnessW}%)`, 0.5, 1, 0.25);
                        words[1] = new Words([
                            '- Type the falling words',
                            '- Type "restart" in any capital-',
                            '    ization to restart',
                            '- Press "esc" to view settings',
                            '- The higher the difficulty,',
                            '    the more each letter',
                            '    earns',
                            '- Try getting the highest score',
                            '- At least try to have fun...'
                        ], 9, -208, 84, display, 0, 16, 'black', `hsl(${display.hueW}deg, ${display.saturationW}%, ${display.brightnessW}%)`, 0.5, 1);
                        instructionsT = true;

                        break;

                    case "Quit":
                        rSteps = 64;
                        rTSteps = rSteps * 2;
                        rStep = 1;
                        rTStep = 1;
                        delete words[option];

                        window.open("Assets/Miscellaneous/dummy.html");
                        window.close();
                        break;

                    case "Back":

                        backT = true;
                        break;

                }
                option = undefined;
                rSteps = 64;
                rTSteps = rSteps * 2;
                rStep = 1;
                rTStep = 1;
                rDelay = 0;
                aniCount = 0;
            }
        }
    }
    if (display.input == "")
        display.input = "...";

};