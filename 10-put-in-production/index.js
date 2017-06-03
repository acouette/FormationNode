const express = require('express');
const winston = require('winston');

//add file transport
//winston.add(winston.transports.File, {filename: `somefile-${process.pid}.log `});


const app = express();


app.get('/', (req, res)=> {
    winston.debug('handled a request on /');
    winston.info('handled a request on /');
    winston.error('handled a request on /');
    res.end();
});

app.get('/:level', (req, res)=> {
    winston.level = req.params.level;
    winston.info('switched level to %s', req.params.level);
    res.end();
});

app.listen(3000, err=> {
    if (err) {
        winston.error('an error occured', err);
    }
    winston.info('the application is running on port 3000');
});


