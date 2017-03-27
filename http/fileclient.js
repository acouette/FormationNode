const fetch = require('node-fetch');

const filename = process.argv[2];

if(!filename){
    console.error('filename is required');
    return;
}

fetch(`http://localhost:3000?filename=${filename}` )
    .then(res=> res.text())
    .then(content=> console.log(content))
    .catch(err=> console.log(err));