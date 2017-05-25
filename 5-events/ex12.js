const EventEmitter = require('events');

class Timer extends EventEmitter {

    constructor(timeout) {
        super();
        this.timeout = timeout;

    }

    start() {
        this.emit('start', new Date().getTime());
        let currentTick = 0;
        const interval = setInterval(()=> {
            currentTick++;
            if (currentTick !== this.timeout) {
                this.emit('tick', (currentTick * 100) / this.timeout);
            } else {
                clearInterval(interval);
                this.emit('end', new Date().getTime());
            }
        }, 1000);
    }

}

const timer = new Timer(5);
timer.on('start', time=>console.log(`timer started at ${time}`));
timer.on('tick', time=>console.log(`current progress ${time} %`));
timer.on('end', time=>console.log(`timer ended at ${time}`));

timer.start();

