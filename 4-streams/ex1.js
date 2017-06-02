const Transform = require('stream').Transform;


process.stdin.setEncoding('utf-8');


// All Transform streams are also Duplex Streams
const myTransform = new Transform({
    writableObjectMode: true,

    transform(chunk, encoding, callback) {
        let dataToPush;
        if (chunk.indexOf('banana') != -1) {
            dataToPush = 'sorry I hate bananas';
        } else {
            dataToPush = chunk;
        }

        // Push the data onto the readable queue.
        callback(null, dataToPush);
    }
});

process.stdin.pipe(myTransform).pipe(process.stdout);
