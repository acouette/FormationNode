const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

// eventEmitter.on('mycustomevent', (someData)=>{
//    console.log(someData);
//    console.log(this); //
// });
//
// eventEmitter.emit('mycustomevent', 'the data that is broadcast');
// eventEmitter.emit('mycustomevent', 'the other data that is broadcast');



//once
// eventEmitter.once('uniqueEvent', (someData)=>{
//     console.log(someData);
//     console.log(this); //
// });
//
// eventEmitter.emit('uniqueEvent', 'the data that is broadcast');
// eventEmitter.emit('uniqueEvent', 'the other data that is broadcast');


//error

class MyClassThatEmitEvents extends EventEmitter{

    constructor(){
        super();
    }

    throwAnError(){
        this.emit('error', new Error('wtf ??'));
    }

}

const myInstance = new MyClassThatEmitEvents();
myInstance.on('error', (error)=> console.error('the instance sent an error', error));
myInstance.throwAnError();