class Engine {

    constructor (timeStep, update, render) {

        this.timeElapsed = 0;
        this.animationRequest = undefined;
        this.oldTime = undefined;
        this.timeStep = timeStep;

        this.updated = false;

        this.update = update;
        this.render = render;

        this.run = function(timeStamp) {

            this.animationRequest = window.requestAnimationFrame(this.handleRun);
            
            this.timeElapsed += timeStamp - this.oldTime;
            
            this.oldTime = timeStamp;

            if (this.timeElapsed >= this.timeStep * 3)
                this.timeElapsed = this.timeStep;

            while (this.timeElapsed >= this.timeStep) {
                
                this.timeElapsed -= this.timeStep;
                
                this.update();
                this.updated = true;
                
            }
            
            if (this.updated) {

                // In case of lag (missing frames)
                this.updated = false;
                this.render();
                
            }

        };

        this.handleRun = (timeStep) => this.run(timeStep);
    
    }
    
    start() {
        
        this.timeElapsed = this.timeStep;
        this.oldTime = window.performance.now();
        this.animationRequest = window.requestAnimationFrame(this.handleRun);

    }

    stop() {
        
        window.cancelAnimationFrame(this.animationRequest);

    }

};
