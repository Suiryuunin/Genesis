"use strict";

let edge = [0, 0];

let count = 0;
let ctrl = false;
let gameState = 1;
let combo = 0;
let comboTarget = 0;
let score = 0;
let scoreTarget = 0;
let healthWidth = 116;
let health = healthWidth;
let color = "";
let finished = false;
let clearState = undefined;
let lost = 0;
let typed = 0;
let increment = 0;
let wordsSum = 0;
let lastPage = 0.1;


// Gameplay Pt1

if (localStorage.getItem("Text") == null)
    localStorage.setItem("Text", 0);

if (localStorage.getItem("Mode") == null)
    localStorage.setItem("Mode", 0);

if (localStorage.getItem("Words") == null)
    localStorage.setItem("Words", 0);

if (localStorage.getItem("MaxChar") == null)
    localStorage.setItem("MaxChar", 27);

// Gameplay Pt2

if (localStorage.getItem("Highscore") == null)
    localStorage.setItem("Highscore", 0);

if (localStorage.getItem("MaxWords") == null)
    localStorage.setItem("MaxWords", 0);

if (localStorage.getItem("Interval") == null)
    localStorage.setItem("Interval", 20);

if (localStorage.getItem("Speed") == null)
    localStorage.setItem("Speed", 1);

if (localStorage.getItem("HP") == null)
    localStorage.setItem("HP", 2);

if (localStorage.getItem("Caps") == null)
    localStorage.setItem("Caps", 1);

if (localStorage.getItem("Auto") == null)
    localStorage.setItem("Auto", 1);

// Graphics

if (localStorage.getItem("Hue") == null)
    localStorage.setItem("Hue", 109);

if (localStorage.getItem("Sat") == null)
    localStorage.setItem("Sat", 27);

if (localStorage.getItem("Bright") == null)
    localStorage.setItem("Bright", 40);

if (localStorage.getItem("AA") == null)
    localStorage.setItem("AA", 0);


const check = () => {

    for (let i = 0; i < words.length; i++) {

        if (words[i] != undefined) {
    
            if (words[i].word == display.input) {

                if (finished) {

                    display.input = "";
                    setup();
                    break;

                }
                
                display.input = "";
                comboTarget += 1;
                scoreTarget += increment * comboTarget * 0.1 * words[i].word.length;
                typed += 1;
                delete words[i];
    
                break;
    
            }
            

            if (display.input.toLowerCase() == "restart") {

                display.input = "";
                setup();
                break;

            }

        }

    }

};


const resize = () => {

    display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight, 9 / 12);
    display.render();

    edge[0] = Math.floor((window.innerWidth - display.display.canvas.width) / 2); 
    edge[1] = Math.floor((window.innerHeight - display.display.canvas.height) / 2);

}
const render = () => {

    if (Math.floor(gameState) == 0) {

        display.drawBackground(display.buffer);
        display.drawBackground(display.settings);
        display.createObject(display.settings, background, -16, -16, viewport[0] + 32, viewport[1] + 32, 0.5);

        document.querySelector('body').style.backgroundColor = `hsl(${display.hue}, ${display.saturation}%, ${(display.brightness - 10 < 0) ? 0 : display.brightness - 10}%)`;
        document.querySelector('div').style.filter = `hue-rotate(${display.hue}deg)`;
        document.querySelector('div').style.opacity = `${(display.brightness -25 < 50) ? 50 : display.brightness-25}%`;


        display.createRect(display.settings, 0, 0, display.settings.canvas.width, display.settings.canvas.height, display.color, 10, 0.5);

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

        
    display.drawBackground(display.buffer);
    display.createObject(display.buffer, background, -16, -16, viewport[0] + 32, viewport[1] + 32, 0.5);


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


    display.render();

};

const update = () => {

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
            
                                    words[i]  = new Word(clearState, display.buffer.canvas.width / 2, -16, display, settings, -0.5, display.buffer.canvas.height / 2 - 8);
                                    
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

            if (display.input == "")
                display.input = "...";


            if (settings.auto == 1)
                check();
            
            count++;
            break;

    }

    color = `hsl(${health - 20}, ${Math.min(...[display.saturation, display.brightness])}%, ${(health/healthWidth) * 50 + 25}%)`;

};

const display = new Display(document.querySelector("canvas"));
const engine = new Engine(1000/30, update, render);
const viewport = [12 * 32, 9 * 32];

const settings = new Settings();
const generator = new Generator(display, settings);

const heart = new Image();
heart.src = "Assets/ImageResources/heart.png";
const background = new Image();
background.src = "Assets/ImageResources/Background.png";

let words;
let healthTarget;

const pages = [

    [
        new Options("Text", Math.floor(display.settings.canvas.width / 2), 72, display, ["Genesis", "Lord of The Rings", "Test"], localStorage.getItem("Text"), -1),
        new Options("Mode", Math.floor(display.settings.canvas.width / 2), 104, display, ["Story Mode", "Random"], localStorage.getItem("Mode"), -1),
        new Slider("Words", Math.floor(display.settings.canvas.width / 2), 136, 8, 8, display, localStorage.getItem("Words"), [0, 70], 30),
        new Slider("Max Characters", Math.floor(display.settings.canvas.width / 2), 168, 8, 8, display, localStorage.getItem("MaxChar"), [0, 27], 3),
        new Button(Math.floor(display.settings.canvas.width / 2), 256, display, "<", -0.5, false, -0.1),
        new Button(Math.floor(display.settings.canvas.width / 2) + 88, 256, display, ">", -0.5, true, 0.1)
    ],
    [
        new Slider("Word Cap", Math.floor(display.settings.canvas.width / 2), 64, 8, 8, display, localStorage.getItem("MaxWords"), [0, 2], 3),
        new Slider("Time Interval", Math.floor(display.settings.canvas.width / 2), 96, 8, 8, display, localStorage.getItem("Interval"), [0, 40], 10),
        new Slider("Speed", Math.floor(display.settings.canvas.width / 2), 128, 8, 8, display, localStorage.getItem("Speed"), [0, 4], 1),
        new Slider("HP", Math.floor(display.settings.canvas.width / 2), 160, 8, 8, display, localStorage.getItem("HP"), [0, 9], 1),
        new Options("Capital Letters", Math.floor(display.settings.canvas.width / 2), 192, display, ["Disabled", "Enabled"], localStorage.getItem("Caps"), -1),
        new Options("Auto Submit", Math.floor(display.settings.canvas.width / 2), 224, display, ["Disabled", "Enabled"], localStorage.getItem("Auto"), -1),
        new Button(Math.floor(display.settings.canvas.width / 2), 256, display, "<", -0.5, true, -0.1),
        new Button(Math.floor(display.settings.canvas.width / 2) + 88, 256, display, ">", -0.5, true, 0.1)

    ],
    [
        new Slider("Hue", Math.floor(display.settings.canvas.width / 2), 64, 8, 8, display, localStorage.getItem("Hue"), [0, 360], 0),
        new Slider("Saturation", Math.floor(display.settings.canvas.width / 2), 96, 8, 8, display, localStorage.getItem("Sat"), [0, 100], 0),
        new Slider("Brightness", Math.floor(display.settings.canvas.width / 2), 128, 8, 8, display, localStorage.getItem("Bright"), [0, 100], 0),
        new Options("Anti-Aliasing", Math.floor(display.settings.canvas.width / 2), 160, display, ["Disabled", "Enabled"], localStorage.getItem("AA"), -1),
        new Button(Math.floor(display.settings.canvas.width / 2), 256, display, "<", -0.5, true, -0.1),
        new Button(Math.floor(display.settings.canvas.width / 2) + 88, 256, display, ">", -0.5, false, 0.1)
    ]

]

for (let i = 0; i < pages.length; i++) {

    for (let j = 0; j < pages[i].length; j++) {
    
        if (pages[i][j].type == "slider")
            pages[i][j].x = Math.floor(pages[i][j].value * (pages[i][j].barWidth) / (pages[i][j].minMax[1])) + (pages[i][j].fixedPos[0] - Math.floor(pages[i][j].width / 2));
    
    }

}

const setup = () => {

    words = [];

    engine.stop();

    display.buffer.canvas.width = viewport[0];
    display.buffer.canvas.height = viewport[1];
    display.settings.canvas.width = viewport[0];
    display.settings.canvas.height = viewport[1];
    generator.index = 0;

    for (let i = 0; i < pages.length; i++) {

        for (let j = 0; j < pages[i].length; j++) {
            if (pages[i][j].type == "slider")
                pages[i][j].value = Math.ceil((pages[i][j].x - (pages[i][j].fixedPos[0] - Math.floor(pages[i][j].width / 2))) / (pages[i][j].barWidth / pages[i][j].minMax[1])) + pages[i][j].valueOffset;

        }

    }


    // Gameplay Pt1

    settings.text = pages[0][0].options[pages[0][0].index];
    settings.mode = pages[0][1].index;
    settings.words = pages[0][2].value;
    settings.maxChar = pages[0][3].value;
    settings.old = [pages[0][0].options[pages[0][0].index], pages[0][1].index, pages[0][2].value, pages[0][3].value];


    //Gameplay Pt2
    settings.maxWords = pages[1][0].value;
    settings.interval = pages[1][1].value;
    settings.speed = pages[1][2].value;
    settings.health = pages[1][3].value;
    settings.caps = pages[1][4].index;
    settings.auto = pages[1][5].index;

    // Graphics
    display.hue = pages[2][0].value;
    display.saturation = pages[2][1].value;
    display.brightness = pages[2][2].value;
    pages[2][3].index *= 1;
    display.antiAlisasing = pages[2][3].index;

    healthTarget = settings.health;

    count = 0;
    ctrl = false;
    gameState = 1;
    comboTarget = 0;
    scoreTarget = 0;
    finished = false;
    clearState = undefined;
    lost = 0;
    typed = 0;
    wordsSum = 0;

    generator.Generate();
    
    resize();
    document.querySelector('body').style.backgroundColor = `hsl(${display.hue}, ${display.saturation}%, ${(display.brightness - 10 < 0) ? 0 : display.brightness - 10}%)`;
    document.querySelector('div').style.filter = `hue-rotate(${display.hue}deg)`;
    document.querySelector('div').style.opacity = `${(display.brightness -25 < 50) ? 50 : display.brightness-25}%`;

    engine.start();

}

setup();

window.addEventListener("resize", resize);