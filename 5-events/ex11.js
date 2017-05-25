const EventEmitter = require('events');

class Timer extends EventEmitter {

    constructor(timeout) {
        super();
        this.timeout = timeout;

    }

    start() {
        this.emit('start', new Date().getTime());
        setTimeout(()=> {
            this.emit('end', new Date().getTime());
        }, this.timeout * 1000);
    }

}

const timer = new Timer(4);
timer.on('start', time=>console.log(`timer started at ${time}`));
timer.on('end', time=>console.log(`timer ended at ${time}`));

timer.start();