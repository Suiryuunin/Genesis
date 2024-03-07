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
        new Options("Text", Math.floor(display.settings.canvas.width / 2), 72, display, ["Genesis", "Lord of The Rings", "Linear Functions"], localStorage.getItem("Text"), -1),
        new Options("Mode", Math.floor(display.settings.canvas.width / 2), 104, display, ["Story Mode", "Random"], localStorage.getItem("Mode"), -1),
        new Slider("Words", Math.floor(display.settings.canvas.width / 2), 136, 8, 8, display, localStorage.getItem("Words"), [0, 70], 30),
        new Slider("Max Characters", Math.floor(display.settings.canvas.width / 2), 168, 8, 8, display, localStorage.getItem("MaxChar"), [0, 27], 3),

        new Button(Math.floor(display.settings.canvas.width / 2), 256, display, "<", -0.5, false, -0.1),
        new Button(Math.floor(display.settings.canvas.width / 2) + 88, 256, display, ">", -0.5, true, 0.1),
        new Button(16, (display.settings.canvas.width - 32), display, "<<", -0.5, true, "aou")
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
        new Button(16, (display.settings.canvas.width - 32), display, "<<", -0.5, true, "a[gop")

    ],
    [
        new Options("Confirmation Input", Math.floor(display.settings.canvas.width / 2), 104, display, ["Enter", "Space", "Enter/Space"], localStorage.getItem("Check"), -1),

        new Button(Math.floor(display.settings.canvas.width / 2), 256, display, "<", -0.5, true, -0.1),
        new Button(Math.floor(display.settings.canvas.width / 2) + 88, 256, display, ">", -0.5, true, 0.1),
        new Button(16, (display.settings.canvas.width - 32), display, "<<", -0.5, true, "io[awf")
    ],
    [
        new Slider("Hue", Math.floor(display.settings.canvas.width / 2), 64, 8, 8, display, localStorage.getItem("Hue"), [0, 360], 0),
        new Slider("Saturation", Math.floor(display.settings.canvas.width / 2), 96, 8, 8, display, localStorage.getItem("Sat"), [0, 100], 0),
        new Slider("Brightness", Math.floor(display.settings.canvas.width / 2), 128, 8, 8, display, localStorage.getItem("Bright"), [0, 100], 0),
        new Options("Anti-Aliasing", Math.floor(display.settings.canvas.width / 2), 160, display, ["Disabled", "Enabled"], localStorage.getItem("AA"), -1),

        new Button(Math.floor(display.settings.canvas.width / 2), 256, display, "<", -0.5, true, -0.1),
        new Button(Math.floor(display.settings.canvas.width / 2) + 88, 256, display, ">", -0.5, false, 0.1),
        new Button(16, (display.settings.canvas.width - 32), display, "<<", -0.5, true, "io[awf")
    ]

];

// HOW TO NOT FIX A BUG
localStorage.setItem( "Reloaded",  localStorage.getItem("Reloaded")  ??   1 );

// Setup
localStorage.setItem( "Text"     , localStorage.getItem( "Text"      ) ??   0 );
localStorage.setItem( "Mode"     , localStorage.getItem( "Mode"      ) ??   0 );
localStorage.setItem( "Words"    , localStorage.getItem( "Words"     ) ??   0 );
localStorage.setItem( "MaxChar"  , localStorage.getItem( "MaxChar"   ) ??  27 );

// Gameplay Pt2
localStorage.setItem( "Highscore", localStorage.getItem( "Highscore" ) ??   0 );
localStorage.setItem( "MaxWords" , localStorage.getItem( "MaxWords"  ) ??   0 );
localStorage.setItem( "Interval" , localStorage.getItem( "Interval"  ) ??  20 );
localStorage.setItem( "Speed"    , localStorage.getItem( "Speed"     ) ??   1 );
localStorage.setItem( "HP"       , localStorage.getItem( "HP"        ) ??   2 );
localStorage.setItem( "Caps"     , localStorage.getItem( "Caps"      ) ??   1 );
localStorage.setItem( "Auto"     , localStorage.getItem( "Auto"      ) ??   1 );

// Gameplay Pt3
localStorage.setItem( "Check"     , localStorage.getItem( "Check"      ) ??   1 );

// Graphics
localStorage.setItem( "Hue"      , localStorage.getItem( "Hue"       ) ?? 109 );
localStorage.setItem( "Sat"      , localStorage.getItem( "Sat"       ) ??  27 );
localStorage.setItem( "Bright"   , localStorage.getItem( "Bright"    ) ??  40 );
localStorage.setItem( "AA"       , localStorage.getItem( "AA"        ) ??   0 );


const check = () => {

    for (let i = 0; i < words.length; i++) {

        if (words[i] != undefined) {
    
            if (words[i].word == display.input) {

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
        titleData[0] = settings.text;

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
        titleData = [settings.text, (Math.floor(display.buffer.canvas.height / 2) - titleOffset)];
        
        words = [];
        words[0] = new Word('New Game',     32, 144, display, settings, 0, 9 * 32, false, 24, 'black', 'red', 0.5, 1, 0.25);
        words[1] = new Word('Instructions', 32, 176, display, settings, 0, 9 * 32, false, 24, 'black', 'red', 0.5, 1, 0.25);
        words[2] = new Word('Quit',         32, 208, display, settings, 0, 9 * 32, false, 24, 'black', 'red', 0.5, 1, 0.25);
        backE = false;
    }
};

const resize = () => {

    display.resize(window.innerWidth, window.innerHeight, 9 / 12);
    display.render();

    edge[0] = Math.floor((window.innerWidth - display.display.canvas.width) / 2); 
    edge[1] = Math.floor((window.innerHeight - display.display.canvas.height) / 2);
    
    document.getElementById('border').style.width = (display.display.canvas.width) + 'px';
    document.getElementById('border').style.height = (display.display.canvas.height) + 'px';
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

    display.render();

    words = [];

    generator.index = 0;

    for (let i = 0; i < pages.length; i++) {

        for (let j = 0; j < pages[i].length; j++) {
            if (pages[i][j].type == "slider")
                pages[i][j].value = Math.ceil((pages[i][j].x - (pages[i][j].fixedPos[0] - Math.floor(pages[i][j].width / 2))) / (pages[i][j].barWidth / pages[i][j].minMax[1])) + pages[i][j].valueOffset;

        }

    }


    // Setup Settings
    settings.modify(pages[1][0].value, pages[1][1].value, pages[1][2].value, pages[1][4].index, pages[1][5].index, pages[2][0].index,
        /* Setup -> */ pages[0][0].options[pages[0][0].index], pages[0][1].index, pages[0][2].value, pages[0][3].value);
    
    // Graphics
    display.hue = pages[3][0].value;
    display.saturation = pages[3][1].value;
    display.brightness = pages[3][2].value;
    pages[3][3].index *= 1;
    display.antiAlisasing = pages[3][3].index;

    settings.health = pages[1][3].value;
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

    // Setup Settings
    settings.modify(pages[1][0].value, pages[1][1].value, pages[1][2].value, pages[1][4].index, pages[1][5].index, pages[2][0].index,
        /* Setup -> */ pages[0][0].options[pages[0][0].index], pages[0][1].index, pages[0][2].value, pages[0][3].value);

    // Graphics
    display.hue = pages[3][0].value;
    display.saturation = pages[3][1].value;
    display.brightness = pages[3][2].value;
    pages[3][3].index *= 1;
    display.antiAlisasing = pages[3][3].index;
    
    gameState = -1;

    words = [];
    words[0] = new Word('New Game',     32, 144, display, settings, 0, 9 * 32, false, 24, 'black', 'red', 0.5, 1, 0.25);
    words[1] = new Word('Instructions', 32, 176, display, settings, 0, 9 * 32, false, 24, 'black', 'red', 0.5, 1, 0.25);
    words[2] = new Word('Quit',         32, 208, display, settings, 0, 9 * 32, false, 24, 'black', 'red', 0.5, 1, 0.25);

    resize();
    document.querySelector('body').style.backgroundColor = `hsl(${display.hue}, ${display.saturation}%, ${(display.brightness - 10 < 0) ? 0 : display.brightness - 10}%)`;
    document.querySelector('div').style.filter = `hue-rotate(${display.hue}deg)`;
    document.querySelector('div').style.opacity = `${(display.brightness -25 < 50) ? 50 : display.brightness-25}%`;

    titleData = [settings.text, (Math.floor(display.buffer.canvas.height / 2) - titleOffset)];

    engine.start();

    if (localStorage.getItem("Reloaded") == 1)
    {
        location.reload();
        console.log("Reloading...")
        localStorage.setItem("Reloaded", -1);
    }
};

// Only once here cuz clears the canvas for one frame :c
display.buffer.canvas.width = viewport[0];
display.buffer.canvas.height = viewport[1];
display.settings.canvas.width = viewport[0];
display.settings.canvas.height = viewport[1];

INIT();

window.addEventListener("resize", resize);