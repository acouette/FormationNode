const express = require('express');

const app = express();


app.get('/', (req, res)=> {
    throw new Error('something went terribly wrong');

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