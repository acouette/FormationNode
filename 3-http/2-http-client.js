const http = require('http');



http.get('http://localhost:3000', (res) => {
    res.on('data', function(chunk){
        console.log(new Buffer(chunk).toString());
    })
});

