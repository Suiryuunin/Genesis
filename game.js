'use strict'

let edge = [0, 0];

let count = 0;
let ctrl = false;
let gameState = -1;
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
let titleData = [];
let titleOffset = 64;


const display = new Display(document.querySelector("canvas"));
const engine = new Engine(30, update, render);
const viewport = [12 * 32, 9 * 32];

const settings = new Settings();
const generator = new Generator(display, settings);

const heart = new Image();
heart.src = "Assets/ImageResources/heart.png";

const heartI = new Image();
heartI.src = "Assets/ImageResources/heartIcon.png";
const heartIR = new Image();
heartIR.src = "Assets/ImageResources/heartIconR.png";

// Rotation
let rSteps = 64;
let rTSteps = rSteps * 2;
const rR = 64;
let rStep = 1;
let rTStep = 1;
let rW = 128;
let rCount = 0;

const background = new Image();
background.src = "Assets/ImageResources/Background.png";

let words = [];
let wordsO = [];
let healthTarget;

const pages = [

    [
        new Options("Text", Math.floor(display.settings.canvas.width / 2), 72, display, ["Genesis", "Lord of The Rings", "Test"], localStorage.getItem("Text"), -1),
        new Options("Mode", Math.floor(display.settings.canvas.width / 2), 104, display, ["Story Mode", "Random"], localStorage.getItem("Mode"), -1),
        new Slider("Words", Math.floor(display.settings.canvas.width / 2), 136, 8, 8, display, localStorage.getItem("Words"), [0, 70], 30),
        new Slider("Max Characters", Math.floor(display.settings.canvas.width / 2), 168, 8, 8, display, localStorage.getItem("MaxChar"), [0, 27], 3),
        new Button(Math.floor(display.settings.canvas.width / 2), 256, display, "<", -0.5, false, -0.1),
        new Button(Math.floor(display.settings.canvas.width / 2) + 88, 256, display, ">", -0.5, true, 0.1),
        new Button(16, (display.settings.canvas.width - 32), display, "<=", -0.5, true, "aou")
    ],
    [
        new Slider("Word Cap", Math.floor(display.settings.canvas.width / 2), 64, 8, 8, display, localStorage.getItem("MaxWords"), [0, 2], 3),
        new Slider("Time Interval", Math.floor(display.settings.canvas.width / 2), 96, 8, 8, display, localStorage.getItem("Interval"), [0, 40], 10),
        new Slider("Speed", Math.floor(display.settings.canvas.width / 2), 128, 8, 8, display, localStorage.getItem("Speed"), [0, 4], 1),
        new Slider("HP", Math.floor(display.settings.canvas.width / 2), 160, 8, 8, display, localStorage.getItem("HP"), [0, 9], 1),
        new Options("Capital Letters", Math.floor(display.settings.canvas.width / 2), 192, display, ["Disabled", "Enabled"], localStorage.getItem("Caps"), -1),
        new Options("Auto Submit", Math.floor(display.settings.canvas.width / 2), 224, display, ["Disabled", "Enabled"], localStorage.getItem("Auto"), -1),
        new Button(Math.floor(display.settings.canvas.width / 2), 256, display, "<", -0.5, true, -0.1),
        new Button(Math.floor(display.settings.canvas.width / 2) + 88, 256, display, ">", -0.5, true, 0.1),
        new Button(16, (display.settings.canvas.width - 32), display, "<=", -0.5, true, "a[gop")

    ],
    [
        new Slider("Hue", Math.floor(display.settings.canvas.width / 2), 64, 8, 8, display, localStorage.getItem("Hue"), [0, 360], 0),
        new Slider("Saturation", Math.floor(display.settings.canvas.width / 2), 96, 8, 8, display, localStorage.getItem("Sat"), [0, 100], 0),
        new Slider("Brightness", Math.floor(display.settings.canvas.width / 2), 128, 8, 8, display, localStorage.getItem("Bright"), [0, 100], 0),
        new Options("Anti-Aliasing", Math.floor(display.settings.canvas.width / 2), 160, display, ["Disabled", "Enabled"], localStorage.getItem("AA"), -1),
        new Button(Math.floor(display.settings.canvas.width / 2), 256, display, "<", -0.5, true, -0.1),
        new Button(Math.floor(display.settings.canvas.width / 2) + 88, 256, display, ">", -0.5, false, 0.1),
        new Button(16, (display.settings.canvas.width - 32), display, "<=", -0.5, true, "io[awf")
    ]

]

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

                if (gameState < 0)
                {
                    for (let i = 0; i < words.length; i++)
                    {
                        if (words[i] != undefined && words[i].word == display.input)
                        {
                            switch(display.input)
                            {
                                case 'New Game':
                                    return 0;
                                case 'Instructions':
                                    return 1;
                                case 'Quit':
                                    return 2;
                                case 'Back':
                                    return 0;

                            }
                        }
                    }
                    
                    display.input = '';
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


let instructionsS = false;
let instructionsT = false;
let backT = false;
let backE = false;
const instructionsAnimations = () =>
{
    if (instructionsT && words[1].x < 16)
    {
        words[1].x = words[1].x + Math.ceil((16 - words[1].x) / 10);
        titleOffset = titleOffset + Math.ceil((80 - titleOffset) / 30);
        titleData = ['Instructions', (Math.floor(display.buffer.canvas.height / 2) - titleOffset)];
    }
    else if (instructionsT) // Safety net
    {
        words[1].x = 16;
        titleOffset = 80;
        titleData = ['Instructions', (Math.floor(display.buffer.canvas.height / 2) - titleOffset)];
        instructionsT = false;
    }

    if (backT && words[1].x > -208)
    {
        words[1].x = words[1].x + Math.floor((-208 - words[1].x) / 10);
    }
    else if (backT) // Safety net
    {
        words[1].x = -208;
        
        words = [];
        words[0] = new Word('New Game',     -208, 144, display, settings, 0, 9 * 32, false, 24, 'black', 'red', 0.5, 1, 0.25);
        words[1] = new Word('Instructions', -208, 176, display, settings, 0, 9 * 32, false, 24, 'black', 'red', 0.5, 1, 0.25);
        words[2] = new Word('Quit',         -208, 208, display, settings, 0, 9 * 32, false, 24, 'black', 'red', 0.5, 1, 0.25);
        titleData[0] = 'Genesis';

        backT = false;
        backE = true;
    }
    if (backE && words[1].x < 32)
    {
        for (let i = 0; i < words.length; i++)
            words[i].x = words[i].x + Math.ceil((32 - words[i].x) / 10);

        titleOffset = titleOffset + Math.floor((64 - titleOffset) / 30);
        titleData[1] = (Math.floor(display.buffer.canvas.height / 2) - titleOffset);
    }
    else if (backE) // Safety net
    {
        words[1].x = -208;
        titleOffset = 64;
        titleData = ['Genesis', (Math.floor(display.buffer.canvas.height / 2) - titleOffset)];
        
        words = [];
        words[0] = new Word('New Game',     32, 144, display, settings, 0, 9 * 32, false, 24, 'black', 'red', 0.5, 1, 0.25);
        words[1] = new Word('Instructions', 32, 176, display, settings, 0, 9 * 32, false, 24, 'black', 'red', 0.5, 1, 0.25);
        words[2] = new Word('Quit',         32, 208, display, settings, 0, 9 * 32, false, 24, 'black', 'red', 0.5, 1, 0.25);
        backE = false;
    }
};

const resize = () => {

    display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight, 9 / 12);
    display.render();

    edge[0] = Math.floor((window.innerWidth - display.display.canvas.width) / 2); 
    edge[1] = Math.floor((window.innerHeight - display.display.canvas.height) / 2);
    document.getElementById('border').style.width = (display.display.canvas.width+20) + 'px';
    document.getElementById('border').style.height = (display.display.canvas.height+20) + 'px';
    document.getElementById('borderS').style.width = Math.floor(display.display.canvas.width*0.8) + 'px';
    document.getElementById('borderS').style.height = Math.floor(display.display.canvas.height*0.8) + 'px';

}


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

const INIT = () =>
{
    display.buffer.canvas.width = viewport[0];
    display.buffer.canvas.height = viewport[1];
    display.settings.canvas.width = viewport[0];
    display.settings.canvas.height = viewport[1];
    
    // Graphics
    display.hue = pages[2][0].value;
    display.saturation = pages[2][1].value;
    display.brightness = pages[2][2].value;
    pages[2][3].index *= 1;
    display.antiAlisasing = pages[2][3].index;
    
    gameState = -1;

    words = [];
    words[0] = new Word('New Game',     32, 144, display, settings, 0, 9 * 32, false, 24, 'black', 'red', 0.5, 1, 0.25);
    words[1] = new Word('Instructions', 32, 176, display, settings, 0, 9 * 32, false, 24, 'black', 'red', 0.5, 1, 0.25);
    words[2] = new Word('Quit',         32, 208, display, settings, 0, 9 * 32, false, 24, 'black', 'red', 0.5, 1, 0.25);

    resize();
    document.querySelector('body').style.backgroundColor = `hsl(${display.hue}, ${display.saturation}%, ${(display.brightness - 10 < 0) ? 0 : display.brightness - 10}%)`;
    document.querySelector('div').style.filter = `hue-rotate(${display.hue}deg)`;
    document.querySelector('div').style.opacity = `${(display.brightness -25 < 50) ? 50 : display.brightness-25}%`;

    titleData = ["Genesis", (Math.floor(display.buffer.canvas.height / 2) -48)];

    engine.start();
};

INIT();

window.addEventListener("resize", resize);