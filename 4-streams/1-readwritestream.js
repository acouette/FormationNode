const fs = require('fs');

const rs = fs.createReadStream(__dirname + '/data.txt', 'utf-8');

const ws = fs.createWriteStream('output.txt');

rs.on('data', (chunk)=> {
    console.log('received chunk');
    console.log(chunk.length);
    ws.write(chunk);
});