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

let particles = [];

/*
 * LOCAL/
 *     /STORAGE -> least efficient way to do it, but eh, i've been feeling lazy
 */

// HOW TO NOT FIX A BUG
localStorage.setItem( "Reloaded" , (localStorage.getItem( "Reloaded"  ) * 0 == 0 && localStorage.getItem( "Reloaded"  ) != null) ? localStorage.getItem( "Reloaded"  ) :   0 );

// Setup
localStorage.setItem( "Text"     , (localStorage.getItem( "Text"      ) * 0 == 0 && localStorage.getItem( "Text"      ) != null) ? localStorage.getItem( "Text"      ) :   0 );
localStorage.setItem( "GenMode"  , (localStorage.getItem( "GenMode"   ) * 0 == 0 && localStorage.getItem( "GenMode"   ) != null) ? localStorage.getItem( "GenMode"   ) :   0 );
localStorage.setItem( "GameMode" , (localStorage.getItem( "GameMode"  ) * 0 == 0 && localStorage.getItem( "GameMode"  ) != null) ? localStorage.getItem( "GameMode"  ) :   0 );
localStorage.setItem( "Words"    , (localStorage.getItem( "Words"     ) * 0 == 0 && localStorage.getItem( "Words"     ) != null) ? localStorage.getItem( "Words"     ) :   2 );
localStorage.setItem( "MaxChar"  , (localStorage.getItem( "MaxChar"   ) * 0 == 0 && localStorage.getItem( "MaxChar"   ) != null) ? localStorage.getItem( "MaxChar"   ) :  27 );

// Gameplay Pt2
localStorage.setItem( "Highscore", (localStorage.getItem( "Highscore" ) * 0 == 0 && localStorage.getItem( "Highscore" ) != null) ? localStorage.getItem( "Highscore" ) :   0 );
localStorage.setItem( "MaxWords" , (localStorage.getItem( "MaxWords"  ) * 0 == 0 && localStorage.getItem( "MaxWords"  ) != null) ? localStorage.getItem( "MaxWords"  ) :   2 );
localStorage.setItem( "Interval" , (localStorage.getItem( "Interval"  ) * 0 == 0 && localStorage.getItem( "Interval"  ) != null) ? localStorage.getItem( "Interval"  ) :  20 );
localStorage.setItem( "Speed"    , (localStorage.getItem( "Speed"     ) * 0 == 0 && localStorage.getItem( "Speed"     ) != null) ? localStorage.getItem( "Speed"     ) :   0 );
localStorage.setItem( "HP"       , (localStorage.getItem( "HP"        ) * 0 == 0 && localStorage.getItem( "HP"        ) != null) ? localStorage.getItem( "HP"        ) :   2 );
localStorage.setItem( "Caps"     , (localStorage.getItem( "Caps"      ) * 0 == 0 && localStorage.getItem( "Caps"      ) != null) ? localStorage.getItem( "Caps"      ) :   1 );
localStorage.setItem( "Auto"     , (localStorage.getItem( "Auto"      ) * 0 == 0 && localStorage.getItem( "Auto"      ) != null) ? localStorage.getItem( "Auto"      ) :   1 );

// Gameplay Pt3
localStorage.setItem( "Check"    , (localStorage.getItem( "Check"     ) * 0 == 0 && localStorage.getItem( "Check"     ) != null) ? localStorage.getItem( "Check"     ) :   0 );
localStorage.setItem( "BF"       , (localStorage.getItem( "BF"        ) * 0 == 0 && localStorage.getItem( "BF"        ) != null) ? localStorage.getItem( "BF"        ) :   0 );
localStorage.setItem( "Ceil"     , (localStorage.getItem( "Ceil"      ) * 0 == 0 && localStorage.getItem( "Ceil"      ) != null) ? localStorage.getItem( "Ceil"      ) :   0 );

// Graphics
localStorage.setItem( "Hue"      , (localStorage.getItem( "Hue"       ) * 0 == 0 && localStorage.getItem( "Hue"       ) != null) ? localStorage.getItem( "Hue"       ) :  14 );
localStorage.setItem( "Sat"      , (localStorage.getItem( "Sat"       ) * 0 == 0 && localStorage.getItem( "Sat"       ) != null) ? localStorage.getItem( "Sat"       ) :  69 );
localStorage.setItem( "Bright"   , (localStorage.getItem( "Bright"    ) * 0 == 0 && localStorage.getItem( "Bright"    ) != null) ? localStorage.getItem( "Bright"    ) : 100 );
localStorage.setItem( "AA"       , (localStorage.getItem( "AA"        ) * 0 == 0 && localStorage.getItem( "AA"        ) != null) ? localStorage.getItem( "AA"        ) :   0 );
localStorage.setItem( "FPS"      , (localStorage.getItem( "FPS"       ) * 0 == 0 && localStorage.getItem( "FPS"       ) != null) ? localStorage.getItem( "FPS"       ) :  20 );

// Graphics Pt2
localStorage.setItem( "HueW"      , (localStorage.getItem( "HueW"       ) * 0 == 0 && localStorage.getItem( "HueW"       ) != null) ? localStorage.getItem( "HueW"       ) :   0 );
localStorage.setItem( "SatW"      , (localStorage.getItem( "SatW"       ) * 0 == 0 && localStorage.getItem( "SatW"       ) != null) ? localStorage.getItem( "SatW"       ) :  50 );
localStorage.setItem( "BrightW"   , (localStorage.getItem( "BrightW"    ) * 0 == 0 && localStorage.getItem( "BrightW"    ) != null) ? localStorage.getItem( "BrightW"    ) :   0 );

// Audio
localStorage.setItem( "Track"     , (localStorage.getItem( "Track"      ) * 0 == 0 && localStorage.getItem( "Track"      ) != null) ? localStorage.getItem( "Track"      ) :   0 );
localStorage.setItem( "Volume"    , (localStorage.getItem( "Volume"     ) * 0 == 0 && localStorage.getItem( "Volume"     ) != null) ? localStorage.getItem( "Volume"     ) : 100 );
localStorage.setItem( "SFXV"      , (localStorage.getItem( "SFXV"       ) * 0 == 0 && localStorage.getItem( "SFXV"       ) != null) ? localStorage.getItem( "SFXV"       ) : 100 );

/*
 * SETTINGS/
 *   PAGES/
 */

const pages = [

    [ // 0. SETUP
        new Options("Text", Math.floor(display.settings.canvas.width / 2), 72, display, ["Genesis", "Lord of The Rings", "Linear Functions"], localStorage.getItem("Text"), -1),
        new Options("Generation Mode", Math.floor(display.settings.canvas.width / 2), 104, display, ["Story Mode", "Random"], localStorage.getItem("GenMode"), -1),
        new Options("Game Mode", Math.floor(display.settings.canvas.width / 2), 136, display, ["Random Speed", "Set Speed", "Bouncy", "Chaos"], localStorage.getItem("GameMode"), -1),
        new Slider("Words", Math.floor(display.settings.canvas.width / 2), 168, 8, 8, display, localStorage.getItem("Words"), [0, 71], 30),
        new Slider("Max Characters", Math.floor(display.settings.canvas.width / 2), 200, 8, 8, display, localStorage.getItem("MaxChar"), [0, 27], 3),

        new Button(Math.floor(display.settings.canvas.width / 2), 256, display, "<", -0.5, false, -0.1),
        new Button(Math.floor(display.settings.canvas.width / 2) + 88, 256, display, ">", -0.5, true, 0.1),
        new Button(16, (display.settings.canvas.width - 32), display, "<<", -0.5, true, "aou")
    ],
    [ // 1. GAMEPLAY
        new Slider("Word Cap", Math.floor(display.settings.canvas.width / 2), 64, 8, 8, display, localStorage.getItem("MaxWords"), [0, 9], 1),
        new Slider("Time Interval", Math.floor(display.settings.canvas.width / 2), 96, 8, 8, display, localStorage.getItem("Interval"), [0, 90], 10),
        new Slider("Speed", Math.floor(display.settings.canvas.width / 2), 128, 8, 8, display, localStorage.getItem("Speed"), [0, 8], 2),
        new Slider("HP", Math.floor(display.settings.canvas.width / 2), 160, 8, 8, display, localStorage.getItem("HP"), [0, 9], 1),
        new Options("Capital Letters", Math.floor(display.settings.canvas.width / 2), 192, display, ["Disabled", "Enabled"], localStorage.getItem("Caps"), -1),
        new Options("Auto Submit", Math.floor(display.settings.canvas.width / 2), 224, display, ["Disabled", "Enabled"], localStorage.getItem("Auto"), -1),

        new Button(Math.floor(display.settings.canvas.width / 2), 256, display, "<", -0.5, true, -0.1),
        new Button(Math.floor(display.settings.canvas.width / 2) + 88, 256, display, ">", -0.5, true, 0.1),
        new Button(16, (display.settings.canvas.width - 32), display, "<<", -0.5, true, "a[gop")

    ],
    [ // 2. GAMEPLAY
        new Options("Confirmation Input", Math.floor(display.settings.canvas.width / 2), 96, display, ["Enter", "Space", "Enter/Space"], localStorage.getItem("Check"), -1),
        new Slider("Bouncing Factor", Math.floor(display.settings.canvas.width / 2), Math.floor(display.settings.canvas.height / 2) + 107, 8, 8, display, localStorage.getItem("BF"), [0, 3], 0),
        new Options("Ceiling", Math.floor(display.settings.canvas.width / 2), Math.floor(display.settings.canvas.height / 2) + 64, display, ["Disabled", "Enabled"], localStorage.getItem("Ceil"), -1),

        new Button(Math.floor(display.settings.canvas.width / 2), 256, display, "<", -0.5, true, -0.1),
        new Button(Math.floor(display.settings.canvas.width / 2) + 88, 256, display, ">", -0.5, true, 0.1),
        new Button(16, (display.settings.canvas.width - 32), display, "<<", -0.5, true, "io[awf")
    ],
    [ // 3. GRAPHICS
        new Slider("Hue", Math.floor(display.settings.canvas.width / 2), 64, 8, 8, display, localStorage.getItem("Hue"), [0, 360], 0),
        new Slider("Saturation", Math.floor(display.settings.canvas.width / 2), 96, 8, 8, display, localStorage.getItem("Sat"), [0, 100], 0),
        new Slider("Brightness", Math.floor(display.settings.canvas.width / 2), 128, 8, 8, display, localStorage.getItem("Bright"), [0, 100], 0),
        new Options("Anti-Aliasing", Math.floor(display.settings.canvas.width / 2), 176, display, ["Disabled", "Enabled"], localStorage.getItem("AA"), -1),
        new Slider("FPS", Math.floor(display.settings.canvas.width / 2), 208, 8, 8, display, localStorage.getItem("FPS"), [0, 50], 10),

        new Button(Math.floor(display.settings.canvas.width / 2), 256, display, "<", -0.5, true, -0.1),
        new Button(Math.floor(display.settings.canvas.width / 2) + 88, 256, display, ">", -0.5, true, 0.1),
        new Button(16, (display.settings.canvas.width - 32), display, "<<", -0.5, true, "io[awf")
    ],
    [ // 4. GRAPHICS
        new Slider("Word Hue", Math.floor(display.settings.canvas.width / 2), 64, 8, 8, display, localStorage.getItem("HueW"), [0, 360], 0),
        new Slider("Word Saturation", Math.floor(display.settings.canvas.width / 2), 96, 8, 8, display, localStorage.getItem("SatW"), [0, 100], 0),
        new Slider("Word Brightness", Math.floor(display.settings.canvas.width / 2), 128, 8, 8, display, localStorage.getItem("BrightW"), [0, 100], 0),

        new Button(Math.floor(display.settings.canvas.width / 2), 256, display, "<", -0.5, true, -0.1),
        new Button(Math.floor(display.settings.canvas.width / 2) + 88, 256, display, ">", -0.5, true, 0.1),
        new Button(16, (display.settings.canvas.width - 32), display, "<<", -0.5, true, "io[awf")
    ],
    [ // 5. AUDIO
        new Options("Track", Math.floor(display.settings.canvas.width / 2), 96, display, ["Genesis-Stereo", "Genesis-Mono"], localStorage.getItem("Track"), -1),
        new Slider("Track Volume", Math.floor(display.settings.canvas.width / 2), 128, 8, 8, display, localStorage.getItem("Volume"), [0, 100], 0),
        new Slider("SFX Volume", Math.floor(display.settings.canvas.width / 2), 160, 8, 8, display, localStorage.getItem("SFXV"), [0, 100], 0),
        
        new Button(Math.floor(display.settings.canvas.width / 2), 256, display, "<", -0.5, true, -0.1),
        new Button(Math.floor(display.settings.canvas.width / 2) + 88, 256, display, ">", -0.5, false, 0.1),
        new Button(16, (display.settings.canvas.width - 32), display, "<<", -0.5, true, "io[awf")
    ]

];

// Graphics Pt2

pages[4][0].changed = false;
pages[4][1].changed = false;
pages[4][2].changed = false;

// Audio

pages[5][0].changed = false;

const gameModeUpdate = (init = false) => {
    if (settings.gameMode * 1 != settings.oGameMode * 1 || init)
    {
        switch (settings.gameMode * 1)
        {
            case 0:
                pages[0][1].alpha = 1;

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

                pages[1][3].fake = undefined;
                pages[1][3].alpha = 1;

                break;
            
            case 1:
                pages[1][2].setting = "Speed";
                break;

            case 2:
                pages[1][2].setting = "Max Speed";
                pages[1][2].minMax[1] = 3;
                if (pages[1][2].value > 5)
                    pages[1][2].value = 5;

                pages[2][1].alpha = 1;
                pages[2][1].value = 0;
                pages[2][2].alpha = 1;
                break;

            case 3:
                pages[0][1].index = 1;
                pages[0][1].alpha = 0.5;

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
                
                pages[1][3].value = 10;
                pages[1][3].fake = "∞";
                pages[1][3].alpha = 0.5;

                pages[2][1].value = 3;
                pages[2][1].alpha = 0.5;

                pages[2][2].index = 1;
                pages[2][2].alpha = 0.5;
                break;
        }
        pages[0][3].x = Math.floor((pages[0][3].value - pages[0][3].valueOffset) * (pages[0][3].barWidth) / (pages[0][3].minMax[1])) + (pages[0][3].fixedPos[0] - Math.floor(pages[0][3].width / 2));
        pages[1][0].x = Math.floor((pages[1][0].value - pages[1][0].valueOffset) * (pages[1][0].barWidth) / (pages[1][0].minMax[1])) + (pages[1][0].fixedPos[0] - Math.floor(pages[1][0].width / 2));
        pages[1][1].x = Math.floor((pages[1][1].value - pages[1][1].valueOffset) * (pages[1][1].barWidth) / (pages[1][1].minMax[1])) + (pages[1][1].fixedPos[0] - Math.floor(pages[1][1].width / 2));
        pages[1][2].x = Math.floor((pages[1][2].value - pages[1][2].valueOffset) * (pages[1][2].barWidth) / (pages[1][2].minMax[1])) + (pages[1][2].fixedPos[0] - Math.floor(pages[1][2].width / 2));
        pages[2][1].x = Math.floor((pages[2][1].value - pages[2][1].valueOffset) * (pages[2][1].barWidth) / (pages[2][1].minMax[1])) + (pages[2][1].fixedPos[0] - Math.floor(pages[2][1].width / 2));
        
        settings.modify(pages[1][0].value, pages[1][1].value, pages[1][2].value, pages[1][4].index, pages[1][5].index, pages[2][0].index, pages[2][1].value, pages[2][2].index,
            /* Setup -> */ pages[0][0].options[pages[0][0].index], pages[0][1].index, pages[0][2].index, pages[0][3].value, pages[0][4]);

        settings.oGameMode = settings.gameMode;
    }
};

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
                    
                    display.input = "";
                    if (mobile)
                        input.value = "";
                    break;
                }
                
                if (finished) {

                    display.input = "";
                    if (mobile)
                        input.value = "";
                    setup();
                    break;

                }

                display.input = "";
                if (mobile)
                    input.value = "";
                comboTarget += 1;
                scoreTarget += increment * comboTarget * 0.1 * words[i].word.length;
                typed += 1;

                for (let j = 0; j < Math.ceil(Math.random()*6+6); j++)
                {
                    let created = false;
                    for (let particle of particles)
                    {
                        if (particle == undefined)
                        {
                            particle = new Particle(words[i].x, words[i].y, 5);
                            created = true;
                        }
                    }
                    if (!created)
                        particles.push(new Particle(words[i].x, words[i].y, 5));
                }

                delete words[i];
    
                break;
    
            }
            

            if (display.input.toLowerCase() == "restart") {

                display.input = "";
                if (mobile)
                    input.value = "";
                setup();
                break;

            }

            if (display.input.toLowerCase() == "~") {

                switch(Math.floor(gameState)) {

                case 1:
                    gameState = 0 + lastPage;
                    document.getElementById('borderS').style.display = 'block';

                    break;

                case 0:
                    gameState = 1;
                    document.getElementById('borderS').style.display = 'none';

                    break;

                }

                if (
                    (
                    settings.old[0] != settings.text     ||
                    settings.old[1] != settings.genMode  ||
                    settings.old[2] != settings.gameMode ||
                    settings.old[3] != settings.words    ||
                    settings.old[4] != settings.maxChar) &&
                    gameState != -1                        )
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
        words[0] = new Word('New Game',     -208, 144, display, settings, 0, 9 * 32, false, 24, 'black', `hsl(${display.hueW}deg, ${display.saturationW}%, ${display.brightnessW}%)`, 0.5, 1, 0.25);
        words[1] = new Word('Instructions', -208, 176, display, settings, 0, 9 * 32, false, 24, 'black', `hsl(${display.hueW}deg, ${display.saturationW}%, ${display.brightnessW}%)`, 0.5, 1, 0.25);
        words[2] = new Word('Quit',         -208, 208, display, settings, 0, 9 * 32, false, 24, 'black', `hsl(${display.hueW}deg, ${display.saturationW}%, ${display.brightnessW}%)`, 0.5, 1, 0.25);
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
        words[0] = new Word('New Game',     32, 144, display, settings, 0, 9 * 32, false, 24, 'black', `hsl(${display.hueW}deg, ${display.saturationW}%, ${display.brightnessW}%)`, 0.5, 1, 0.25);
        words[1] = new Word('Instructions', 32, 176, display, settings, 0, 9 * 32, false, 24, 'black', `hsl(${display.hueW}deg, ${display.saturationW}%, ${display.brightnessW}%)`, 0.5, 1, 0.25);
        words[2] = new Word('Quit',         32, 208, display, settings, 0, 9 * 32, false, 24, 'black', `hsl(${display.hueW}deg, ${display.saturationW}%, ${display.brightnessW}%)`, 0.5, 1, 0.25);
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
    
    gameModeUpdate();

    // Setup Settings
    settings.modify(pages[1][0].value, pages[1][1].value, pages[1][2].value, pages[1][4].index, pages[1][5].index, pages[2][0].index, pages[2][1].value, pages[2][2].index,
        /* Setup -> */ pages[0][0].options[pages[0][0].index], pages[0][1].index, pages[0][2].index, pages[0][3].value, pages[0][4]);
    
    // Graphics
    display.hue        = pages[3][0].value;
    display.saturation = pages[3][1].value;
    display.brightness = pages[3][2].value;
    pages[3][3].index *= 1;
    display.antiAlisasing = pages[3][3].index;

    // Graphics Pt2
    display.hueW        = pages[4][0].value;
    display.saturationW = pages[4][1].value;
    display.brightnessW = pages[4][2].value;

    settings.health = pages[1][3].value;
    healthTarget = settings.health;

    // Update old settings
    settings.updateOld();

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
    
    if (document.activeElement != input) resize();
    document.querySelector('body').style.backgroundColor = `hsl(${display.hue}, ${display.saturation}%, ${(display.brightness - 10 < 0) ? 0 : display.brightness - 10}%)`;
    document.querySelector('div').style.filter = `hue-rotate(${display.hue}deg)`;
    document.querySelector('div').style.opacity = `${(display.brightness -25 < 50) ? 50 : display.brightness-25}%`;

    engine.start();

}

let preview = {};
const INIT = () =>
{
    // Setup Settings
    settings.modify(pages[1][0].value, pages[1][1].value, pages[1][2].value, pages[1][4].index, pages[1][5].index, pages[2][0].index, pages[2][1].value, pages[2][2].index,
        /* Setup -> */ pages[0][0].options[pages[0][0].index], pages[0][1].index, pages[0][2].index, pages[0][3].value, pages[0][4]);

    track.playbackRate = 1 + (settings.speed - 4)/10;

    // Graphics
    display.hue        = pages[3][0].value;
    display.saturation = pages[3][1].value;
    display.brightness = pages[3][2].value;
    pages[3][3].index *= 1;
    display.antiAlisasing = pages[3][3].index;

    // Graphics Pt2
    display.hueW        = pages[4][0].value;
    display.saturationW = pages[4][1].value;
    display.brightnessW = pages[4][2].value;
    
    preview = new Word('PREVIEW', Math.floor(display.settings.canvas.width / 2), 160, display, settings, -0.5, viewport[1], true, 16, 0, `hsl(${display.hueW}deg, ${display.saturationW}%, ${display.brightnessW}%)`, 0.5, 1, 1, display.settings);

    // Audio
    track.src = _audioPath+`Tracks/${pages[5][0].options[pages[5][0].index].replace("-", "")}.wav`;
    track.volume = pages[5][1].value/100;
    SFX.volume = pages[5][2].value/100;

    gameState = -1;

    words = [];
    words[0] = new Word('New Game',     32, 144, display, settings, 0, 9 * 32, false, 24, 'black', `hsl(${display.hueW}deg, ${display.saturationW}%, ${display.brightnessW}%)`, 0.5, 1, 0.25);
    words[1] = new Word('Instructions', 32, 176, display, settings, 0, 9 * 32, false, 24, 'black', `hsl(${display.hueW}deg, ${display.saturationW}%, ${display.brightnessW}%)`, 0.5, 1, 0.25);
    words[2] = new Word('Quit',         32, 208, display, settings, 0, 9 * 32, false, 24, 'black', `hsl(${display.hueW}deg, ${display.saturationW}%, ${display.brightnessW}%)`, 0.5, 1, 0.25);

    if (document.activeElement != input) resize();
    document.querySelector('body').style.backgroundColor = `hsl(${display.hue}, ${display.saturation}%, ${(display.brightness - 10 < 0) ? 0 : display.brightness - 10}%)`;
    document.querySelector('div').style.filter = `hue-rotate(${display.hue}deg)`;
    document.querySelector('div').style.opacity = `${(display.brightness -25 < 50) ? 50 : display.brightness-25}%`;

    titleData = [settings.text, (Math.floor(display.buffer.canvas.height / 2) - titleOffset)];

    engine.start();

    if (localStorage.getItem("Reloaded")*1 < 2)
    {
        location.reload();
        console.log("Reloading...")
        localStorage.setItem("Reloaded", (localStorage.getItem("Reloaded")*1+1));
    }
};

// Only once here cuz clears the canvas for one frame :c
display.buffer.canvas.width = viewport[0];
display.buffer.canvas.height = viewport[1];
display.settings.canvas.width = viewport[0];
display.settings.canvas.height = viewport[1];

INIT();

window.addEventListener("resize", () => {if (document.activeElement != input) resize();});
