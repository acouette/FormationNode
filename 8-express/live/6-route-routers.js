const express = require('express');
const app = express();
const birdRouter = require('./6-1-router');

app.use('/birds', birdRouter);

app.listen(3000, () => {
    console.log('express is up');
});
