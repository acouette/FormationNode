const http = require('http');

const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');


http.get({
    hostname: 'www.google.fr',
    port: 80,
    path: '',
    agent: false  // create a new agent just for this one request
}, (res) => {
    res.on('data', function(chunk){
        console.log(decoder.write(chunk));
    })
});


const fetch = require('node-fetch');

fetch(`http://www.google.fr` )
    .then(res=> res.text())
    .then(content=> console.log(content))
    .catch(err=> console.log(err));