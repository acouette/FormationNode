const http = require('http');
const port = 3000;


const requestHandler = (request, response)=> {
    console.log(request.url);
    response.end('Hello nodejs server');
};

const server = http.createServer(requestHandler);

server.listen(port, err => {
    if (err) {
        console.error('something bad happened');
    }
    console.log('server is up and listening');
});

