const http = require('http');


const requestHandler = (request, response)=> {
    console.log(request.url);
    response.writeHeader(201, {'Content-Type': 'application/json'});
    response.end(JSON.stringify({'somekey': 'someValue'}));
};

const server = http.createServer(requestHandler);

server.listen(3000, err => {
    if (err) {
        console.error('something bad happened');
    } else {
        console.log('server is up and listening');
    }
});

