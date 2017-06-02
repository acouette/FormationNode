const http = require('http');
const readline = require('readline');
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('ascii');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (filename) => {
    http.get(`http://localhost:3000?filename=${filename}`, (res)=> {
        res.on('data', function (chunk) {
            console.log(decoder.write(chunk));
        })
    });
});

