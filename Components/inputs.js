const keyDown = (e) => {

    if (gameState == 1) {

        if ((e.key.length == 1 || (e.key == " " && !display.input.includes(" "))) && display.input.length < 12) {
    
            if (display.input == "...")
                display.input = "";
            display.input += e.key;
    
        }
    
        if (display.input != "...") {
    
            switch (e.code) {
        
                case "ControlLeft": case "ControlRight":
                    ctrl = true;
                    break;
        
                case "Backspace":
        
                    display.input = display.input.substring(0, display.input.length - 1);
                    if (ctrl) {
                        if (display.input.includes(" ")) {
                            
                            display.input = display.input.split(" ")[0];
        
                        } else {
        
                            display.input = "";
                            
                        }
                        
                    }
                    break;

                case "Enter":
                    display.input = "";
                    break;
        
            }
    
        }

    }

}

const keyUp = (e) => {

    switch (e.code) {

        case "ControlLeft": case "ControlRight":
            ctrl = false;
            break;

        case "Escape":
            switch(gameState) {

                case 1:
                    gameState = 0;
                    break;

                case 0:
                    gameState = 1;
                    break;

            }
            break;

    }

}

const mouseDown = (e) => {

    if (gameState == 0)
        mouseInput = new MouseInput(e);

}

const mouseUp = () => {

    mouseInput = undefined;

}

class MouseInput {

    constructor(e) {
        
        this.getSlider = function() {

            for (let i = 0; i < types.length; i++) {

                if ((e.clientX - edge[0] > Math.floor((types[i].x / 384 * 0.8 + 0.1) * display.display.canvas.width) && e.clientX - edge[0] < Math.floor(((types[i].x + types[i].width) / 384 * 0.8 + 0.1) * display.display.canvas.width)) && (e.clientY - edge[1] > Math.floor((types[i].y / 288 * 0.8 + 0.1) * display.display.canvas.height) && e.clientY - edge[1] < Math.floor(((types[i].y + types[i].height) / 288 * 0.8 + 0.1) * display.display.canvas.height))) {

                    return(types[i]);

                }

            }

        }
        
        this.type = this.getSlider();

    }
    
    move(e) {
    
        if (mouseInput != undefined && mouseInput.type != undefined) {
            
            if (e.clientX - edge[0] > Math.floor((mouseInput.type.fixedPos[0] / 384 * 0.8 + 0.1) * display.display.canvas.width - mouseInput.type.width / 2) && e.clientX - edge[0] < Math.floor(((mouseInput.type.fixedPos[0] + mouseInput.type.barWidth) / 384 * 0.8 + 0.1) * display.display.canvas.width) )
                mouseInput.type.x = Math.floor( Math.round( ( ( (((e.clientX - edge[0]) / display.display.canvas.width - 0.1) / 0.8 * 384) ) - mouseInput.type.fixedPos[0]) / (mouseInput.type.barWidth / mouseInput.type.minMax[1])) * (mouseInput.type.barWidth / mouseInput.type.minMax[1]) + mouseInput.type.fixedPos[0] - mouseInput.type.width / 2);

            
            mouseInput.type.value = Math.ceil((mouseInput.type.x - mouseInput.type.fixedPos[0]) / (mouseInput.type.barWidth / mouseInput.type.minMax[1])) + mouseInput.type.valueOffset;

        }
    
    }

}
let mouseInput = undefined;

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
window.addEventListener("mousedown", mouseDown);
window.addEventListener("mouseup", mouseUp);
