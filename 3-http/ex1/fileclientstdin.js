const fetch = require('node-fetch');


process.stdin.setEncoding('utf-8');

process.stdin.on('readable', ()=> {
    var filename = process.stdin.read();
    if (filename && filename.length > 0) {
        fetch(`http://localhost:3000?filename=${filename}`)
            .then(res=> res.json())
            .then(console.log)
            .catch(console.error);
    }
});
