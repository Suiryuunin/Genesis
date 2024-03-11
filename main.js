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

        display.createWord(display.buffer, titleData[0], 32 -8, titleData[1], 0, false, 1, 48, 1, 'orangered');
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

    if (Math.floor(gameState) >= 0) {
        increment = Math.round(10 * (settings.maxWords / 2) / (settings.interval / 40) * (settings.gameMode == 2 ? (5 / (settings.speed * (5**2))) : (settings.speed * 5)) / (settings.health / 10) + settings.caps * 500);

        switch (Math.floor(gameState)) {

            case 0:

                if (mouseInput != undefined)
                    window.addEventListener("mousemove", mouseInput.move);
                
                // Update settings
                settings.modify(pages[1][0].value, pages[1][1].value, pages[1][2].value, pages[1][4].index, pages[1][5].index, pages[2][0].index,
                    /* Setup -> */ pages[0][0].options[pages[0][0].index], pages[0][1].index, pages[0][2].index, pages[0][3].value, pages[0][4]);

                // Set the local storage

                // Setup

                localStorage.setItem("Text", pages[0][0].index);
                localStorage.setItem("GenMode", pages[0][1].index);
                localStorage.setItem("GameMode", pages[0][2].index);
                localStorage.setItem("Words", pages[0][3].value - pages[0][3].valueOffset);
                localStorage.setItem("MaxChar", pages[0][4].value - pages[0][4].valueOffset);


                // Gameplay Pt1
                
                localStorage.setItem("MaxWords", pages[1][0].value - pages[1][0].valueOffset);
                localStorage.setItem("Interval", pages[1][1].value - pages[1][1].valueOffset);
                localStorage.setItem("Speed", pages[1][2].value - pages[1][2].valueOffset);
                localStorage.setItem("HP", pages[1][3].value - pages[1][3].valueOffset);
                localStorage.setItem("Caps", pages[1][4].index);
                localStorage.setItem("Auto", pages[1][5].index);
                
                // Gameplay Pt2

                localStorage.setItem("Check", pages[2][0].index);

                
                // Graphics

                display.hue = pages[3][0].value;
                display.saturation = pages[3][1].value;
                display.brightness = pages[3][2].value;
                display.antiAlisasing = pages[3][3].index;
                
                localStorage.setItem("Hue", pages[3][0].value);
                localStorage.setItem("Sat", pages[3][1].value);
                localStorage.setItem("Bright", pages[3][2].value);
                localStorage.setItem("AA", pages[3][3].index);

                // Game Modes
                if (settings.gameMode * 1 != settings.oGameMode * 1)
                {
                    switch (settings.gameMode * 1)
                    {
                        case 0:
                            pages[0][3].minMax[1] = 70;
                            pages[0][3].value = 100;
                            pages[0][3].alpha = 1;

                            pages[1][0].minMax[1] = 9;
                            pages[1][0].value = 10;
                            pages[1][0].alpha = 1;

                            pages[1][1].value = 10;
                            pages[1][1].valueOffset = 10;
                            pages[1][1].alpha = 1;

                            pages[1][2].setting = "Max Speed";
                            pages[1][2].value = 10;
                            pages[1][2].alpha = 1;

                            break;
                        
                        case 1:
                            pages[1][2].setting = "Speed";
                            break;

                        case 2:
                            pages[1][2].setting = "Max Speed";
                            pages[1][2].minMax[1] = 3;
                            if (pages[1][2].value > 5)
                                pages[1][2].value = 5;
                            break;

                        case 3:
                            pages[0][3].minMax[1] = 970;
                            pages[0][3].value = 1000;
                            pages[0][3].alpha = 0.5;

                            pages[1][0].minMax[1] = 999;
                            pages[1][0].value = 1000;
                            pages[1][0].alpha = 0.5;

                            pages[1][1].value = 0;
                            pages[1][1].valueOffset = 0;
                            pages[1][1].alpha = 0.5;

                            pages[1][2].minMax[1] = 8;
                            pages[1][2].value = 10;
                            pages[1][2].alpha = 0.5;
                            break;
                    }
                    pages[0][3].x = Math.floor((pages[0][3].value - pages[0][3].valueOffset) * (pages[0][3].barWidth) / (pages[0][3].minMax[1])) + (pages[0][3].fixedPos[0] - Math.floor(pages[0][3].width / 2));
                    pages[1][0].x = Math.floor((pages[1][0].value - pages[1][0].valueOffset) * (pages[1][0].barWidth) / (pages[1][0].minMax[1])) + (pages[1][0].fixedPos[0] - Math.floor(pages[1][0].width / 2));
                    pages[1][1].x = Math.floor((pages[1][1].value - pages[1][1].valueOffset) * (pages[1][1].barWidth) / (pages[1][1].minMax[1])) + (pages[1][1].fixedPos[0] - Math.floor(pages[1][1].width / 2));
                    pages[1][2].x = Math.floor((pages[1][2].value - pages[1][2].valueOffset) * (pages[1][2].barWidth) / (pages[1][2].minMax[1])) + (pages[1][2].fixedPos[0] - Math.floor(pages[1][2].width / 2));
                    settings.oGameMode = settings.gameMode;
                }

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
                                    finished = true;

                                    for (let i = 0; i < settings.maxWords; i++)
                                        if (words[i] != undefined) finished = false;
                                    
                                    if (finished)
                                    {
                                        if (healthTarget > 0)
                                            clearState = lost > 0 ? "CLEAR" : "FULL COMBO";
                                        else
                                            clearState = "YOU DIED";
                
                                        words[i]  = new Word(clearState, display.buffer.canvas.width / 2, -16, display, settings, -0.5, viewport[1] - 8, true, 24, 'black', 'red', 0.5, 1);
                                    }

                                    break;
                                }
                                
                                if (wordsSum < settings.words)
                                {
                                                    
                                    instances++;
                                    console.log(instances)

                                    words[i] = new Word(generator.word, Math.floor(Math.random() * (display.buffer.canvas.width - generator.word.length * 10 - 5) + 5), -16, display, settings, 0, viewport[1], false, 16, 0, 'orangered', 0.5, 1);
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
                } else {

                    for (let i = 0; i < words.length; i++) {

                        if (settings.gameMode != 3 && words[i] != undefined && words[i].y > viewport[1] ) {
                
                            comboTarget = 0;
                            lost += 1;
                            healthTarget -= 1;
                            delete words[i];
                
                        }
                
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
                        words[0] = new Word('Back', 32, 240, display, settings, 0, 9 * 32, false, 24, 'black', 'red', 0.5, 1, 0.25);
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
                        ], 9, -208, 84, display, 0, 16, 'black', 'red', 0.5, 1, 0.25);
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
    if (Math.floor(gameState) != 0 && display.input == "")
        display.input = "...";

};

window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};
if (window.mobileAndTabletCheck())
{
    document.querySelector("input").style.zIndex = 2;
}
else
{
    console.log("pc");
}