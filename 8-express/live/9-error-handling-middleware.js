const express = require('express');

const app = express();


app.get('/sync', (req, res)=> {
    throw new Error('something went terribly wrong');
});

app.get('/async', (req, res, next)=> {
    setTimeout(()=> next(new Error('something went terribly wrong in async')))
});

app.use((error, req, res, next)=> {
    console.error(error);
    res.status(500).send(error.stack);
});

app.listen(3000, err=> {
    if (err) {
        console.error(err);
    } else {
        console.log('app is up and running');
    }
});