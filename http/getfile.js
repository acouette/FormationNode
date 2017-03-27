const http = require('http');
const queryString = require('querystring');
const url = require('url');
const fs = require('fs');
const port = 3000;


const requestHandler = (request, response)=>{
    const urlStr = request.url;
    console.log('url', urlStr);
    const parsedUrl = url.parse(urlStr);
    console.log('parsedUrl', parsedUrl);
    const parsedQueryString = queryString.parse(parsedUrl.query);

    const fileName = parsedQueryString['filename'];
    if(!fileName){
        response.statusCode = 500;
        response.end('filename is required')
    }else{

        fs.readFile(fileName, 'utf-8', (err, content)=>{
            if(err){
                response.statusCode = 500;
                response.end('error while fetching file : '+err.message);
            }
            response.end(content);
        });
    }
};

const server = http.createServer(requestHandler);

server.listen(port, err =>{
    if(err){
        console.error('something bad happened');
    }
    console.log('server is up and listening');
});

