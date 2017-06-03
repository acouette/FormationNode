const http = require('http');
const filename = process.argv[2];

http.get(`http://localhost:3000?filename=${filename}`, (res)=> {
    res.on('data', function (chunk) {
        console.log(new String(chunk).toString());
    })
});

