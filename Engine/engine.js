class Engine {

    constructor (fps, update, render) {

        this.time = 0;
        this.timeStamp = 0;
        this.timeStampR = 0;
        this.delta = 0;
        this.deltaR = 0;
        this.update = update;
        this.render = render;
        this.fps = fps;

        this.run = (time) => {

            this.time = time;
            this.delta = this.time - this.timeStamp;
            this.deltaR = this.time - this.timeStampR;

            if (this.deltaR >= Math.floor(1000 / this.fps)) {

                document.querySelector('h4').innerHTML = `Update: ${(1000 / this.delta).toFixed(2)} fps` + ((1000/this.delta > 10) ? '' : ' (ノಠ益ಠ)ノ彡┻━┻');
                document.querySelector('h3').innerHTML = `Render: ${(1000 / this.deltaR).toFixed(2)} fps` + ((1000/this.deltaR > 10) ? '' : ' (ノಠ益ಠ)ノ彡┻━┻');
                
                this.update();
                this.render();

                this.timeStampR = this.timeStamp = time;

            } else if (this.delta >= Math.floor(1000 / 60)) {

                document.querySelector('h4').innerHTML = `Update: ${(1000 / this.delta).toFixed(2)} fps` + ((1000/this.delta > 10) ? '' : ' (ノಠ益ಠ)ノ彡┻━┻');
                    
                this.update();

                this.timeStamp = time;

            }


            this.animationRequest = window.requestAnimationFrame(this.run);

        }

    }

    start() {

        this.animationRequest = window.requestAnimationFrame(this.run);

    }

    stop() {

        window.cancelAnimationFrame(this.animationRequest);

    }

}