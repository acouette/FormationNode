const http = require('http');

const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');


http.get('http://localhost:3000', (res) => {
    res.on('data', function(chunk){
        console.log(decoder.write(chunk));
    })
});

