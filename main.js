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

if (localStorage.getItem("Highscore") == null)
    localStorage.setItem("Highscore", 0);

const resize = () => {

    display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight, 9 / 12);
    display.render();

    edge[0] = Math.floor((window.innerWidth - display.display.canvas.width) / 2); 
    edge[1] = Math.floor((window.innerHeight - display.display.canvas.height) / 2);

}

const render = () => {

    switch (gameState) {

        case 0:
            display.drawBackground(display.settings);
            display.createRect(display.settings, 0, 0, display.settings.canvas.width, display.settings.canvas.height, "black", 10);

            display.createWord(display.settings, "Settings", Math.floor(display.settings.canvas.width / 2), 32, -0.5, false, 1, 32);

            for (let i = 0; i < types.length; i++) {

                types[i].updatePos();
                
            }
            
            break;

        case 1:
            display.drawBackground(display.buffer);
    
            if (generator.word != "") {
        
                for (let i = 0; i < words.length; i++) {
        
                    if (words[i] != undefined)
                        words[i].updatePos();
                    
                }
                
            }
        
            // UI
            display.createWord(display.buffer, ["Combo", combo], Math.floor(display.buffer.canvas.width / 2), 1, -0.5, true, 2);
            display.createWord(display.buffer, ["Highscore", localStorage.getItem("Highscore"), "Score", score], Math.floor(display.buffer.canvas.width) - 9, 1, -1, true, 4);
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
            break;

    }

    display.render();

}

const update = () => {

    increment = Math.round(10 * (settings.maxWords / 2) / (settings.interval / 40) * settings.speed / (settings.health / 10) + settings.caps * 500);

    switch (gameState) {

        case 0:
            if (mouseInput != undefined)
                window.addEventListener("mousemove", mouseInput.move);
            
            
            settings.maxWords = types[0].value;
            settings.interval = types[1].value;
            settings.speed    = types[2].value;
            settings.caps     = types[4].value;
            
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

            color = `hsl(${health - 20}, 100%, 63%)`
            
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
                            
                            words[i] = new Word(generator.word, Math.floor(Math.random() * (display.buffer.canvas.width - generator.word.length * 10 - 5) + 5), -16, display, settings);
                            generator.storyMode(`Assets/Texts/${settings.text}.txt`);
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

            if ((settings.caps == 1 && display.input == clearState) || (settings.caps == 0 && clearState != undefined && display.input.toLowerCase() == clearState.toLowerCase()) || display.input.toLowerCase() == "restart") {

                display.input = "";
                setup();

            }

                        
            for (let i = 0; i < words.length; i++) {

                if (words[i] != undefined) {

                    if (settings.caps == 1) {
            
                        if (words[i].word == display.input) {
                            
                            display.input = "";
                            delete words[i];
                            comboTarget += 1;
                            scoreTarget += increment * (comboTarget * 0.1);
                            typed += 1;
                
                            break;
                
                        }
                        
                    } else {
            
                        if (words[i].word.toLowerCase() == display.input.toLowerCase()) {
                            
                            display.input = "";
                            delete words[i];
                            comboTarget += 1;
                            scoreTarget += increment * (comboTarget * 0.1);
                            typed += 1;
                
                            break;
                
                        }
            
                    }

                }

            }
            
            count++;
            break;

    }

    

}

const display = new Display(document.querySelector("canvas"));
const engine = new Engine(1000/30, update, render);
const viewport = [12 * 32, 9 * 32];

const settings = new Settings();
const generator = new Generator(display);

const heart = new Image();
heart.src = "Assets/ImageResources/heart.png";

let words;
let healthTarget;

const types = [

    new SettingsObject("Word Cap", Math.floor(display.settings.canvas.width / 2) + 64, 64, 8, 8, "black", display, 0, [0, 2], 3),
    new SettingsObject("Time Interval", Math.floor(display.settings.canvas.width / 2) + 64, 96, 8, 8, "black", display, 20, [0, 40], 11),
    new SettingsObject("Speed", Math.floor(display.settings.canvas.width / 2) + 64, 128, 8, 8, "black", display, 1, [0, 4], 1),
    new SettingsObject("HP", Math.floor(display.settings.canvas.width / 2) + 64, 160, 8, 8, "black", display, 2, [0, 9], 1),
    new SettingsObject("Capital Letters", Math.floor(display.settings.canvas.width / 2) + 64, 192, 8, 8, "black", display, 1, [0, 1]),

];

for (let i = 0; i < types.length; i++) {

    types[i].x = Math.floor((types[i].barWidth) / (types[i].minMax[1] - types[i].minMax[0]) * types[i].value) + types[i].fixedPos[0] - types[i].width / 2;

}

const setup = () => {

    words = [];

    engine.stop();

    display.buffer.canvas.width = viewport[0];
    display.buffer.canvas.height = viewport[1];
    display.settings.canvas.width = viewport[0];
    display.settings.canvas.height = viewport[1];
    generator.index = 0;
    generator.storyMode(`Assets/Texts/${settings.text}.txt`);

    for (let i = 0; i < types.length; i++) {

        types[i].value = Math.ceil((types[i].x - types[i].fixedPos[0]) / (types[i].barWidth / types[i].minMax[1])) + types[i].valueOffset;

    }

    settings.health   = types[3].value;
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

    resize();

    engine.start();

}

setup();

window.addEventListener("resize", resize);
