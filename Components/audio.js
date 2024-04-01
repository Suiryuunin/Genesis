// Separate file for tracks, cuz both main.js and game.js are too long

const _audioPath = "../Assets/Audio/";
const track = new Audio(_audioPath+'Tracks/GenesisStereo.wav');
const SFX = new Audio(_audioPath+'SFX/Keyboard.wav');

addEventListener('click', () => track.play());
track.playbackRate = 1;

track.addEventListener('ended', () => {
    track.play();
    track.currentTime = 0;
});

document.onvisibilitychange = () => {
    if (document.visibilityState === "hidden")
        track.pause();
    else
        track.play();
};

let submitOnce = false;
addEventListener('keydown', (e) => {

    if (Math.floor(gameState) != 0 || mobile)
    {
        let sfx = new Audio();
        sfx.volume = SFX.volume;
        sfx.pause();
        sfx.currentTime = 0;

        switch(e.code)
        {
            case "Space": case "Enter":
            {
                if (!submitOnce)
                {
                    submitOnce = true;
                    sfx.src = _audioPath+"sfx/SubmitDown.wav";
                    sfx.play();
                }
                return;
            }
            case "Backspace":
            {
                sfx.src = _audioPath+"sfx/Backspace.wav";
                sfx.play();
                return;
            }
        }
        
        if (display.input.length < 12)
        {
            sfx.src = _audioPath+"sfx/Keyboard.wav";
            sfx.play();
        }
    }
    
});

addEventListener("keyup", (e) => {

    if (e.code = "Enter")
    {
        submitOnce = false;
    }
});

addEventListener("mousedown", () => {
    let sfx = new Audio();
    sfx.volume = SFX.volume;
    sfx.pause();
    sfx.currentTime = 0;
    sfx.src = _audioPath+"sfx/MouseDown.wav";
    sfx.play();
});

addEventListener("mouseup", () => {
    let sfx = new Audio();
    sfx.volume = SFX.volume;
    sfx.pause();
    sfx.currentTime = 0;
    sfx.src = _audioPath+"sfx/MouseUp.wav";
    sfx.play();
});