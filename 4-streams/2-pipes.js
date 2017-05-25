const fs = require('fs');
const gzip = require('zlib').createGzip();

const rs = fs.createReadStream(__dirname + '/data.txt', 'utf-8');

const ws = fs.createWriteStream('output.txt');

rs.pipe(gzip).pipe(ws);