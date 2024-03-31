// Separate file for tracks, cuz both main.js and game.js are too long

const _audioPath = "../Assets/Audio/";
const track = new Audio(_audioPath+'Tracks/GenesisStereo.wav');

addEventListener('click', () => track.play());
track.playbackRate = 1;

track.addEventListener('ended', () => {
    track.play();
    track.currentTime = 0;
});

addEventListener('keydown', (e) => {
    switch(e.code)
    {
        case "Space":
        {
            // console.log('space');
            return;
        }
        case "Enter":
        {
            // console.log('enter');
            return;
        }
        case "ControlLeft": case "ControlRight":
        {
            // console.log('Ctrl');
            return;
        }
        case "MetaLeft": case "MetaRight": case "AltLeft": case "AltRight":
        {
            // console.log('Meta/Alt');
            return;
        }
        case "Backspace":
        {
            // console.log('bak');
            return;
        }
        case "CapsLock":
        {
            // console.log('Caps');
            return;
        }
        case "Tab":
        {
            // console.log('tab');
            return;
        }
        case "Escape":
        {
            // console.log('Esc');
            return;
        }
    }
    
    if (e.key*0 == 0)
    {
        // console.log('num');
        return;
    }
    // console.log(e.code);
});