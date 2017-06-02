const EventEmitter = require('events');

//créer un event emitter
const eventEmitter = new EventEmitter();

//on attache un handler qui appelé lors de l'emission de cet evènement
eventEmitter.on('mycustomevent', function (someData) {
    console.log(someData);
});

eventEmitter.emit('mycustomevent', 'the data that is broadcast');
eventEmitter.emit('mycustomevent', 'the other data that is broadcast');


//la méthode once permet de n'appeler l'evenement que la première fois
eventEmitter.once('uniqueEvent', (someData)=> {
    console.log(someData);
    console.log(this); //
});

eventEmitter.emit('uniqueEvent', 'the data that is broadcast');
eventEmitter.emit('uniqueEvent', 'the other data that is broadcast');


//error

class MyClassThatEmitEvents extends EventEmitter {

    constructor() {
        super();
    }

    throwAnError() {
        this.emit('error', new Error('a panic error occured in my class'));
    }

}

const myInstance = new MyClassThatEmitEvents();
//if no error handler is attached, stacktrace is printed and exit 1
myInstance.throwAnError();

//myInstance.on('error', (error)=> console.error('the instance sent an error', error.message));