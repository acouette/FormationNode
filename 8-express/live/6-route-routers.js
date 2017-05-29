const express = require('express');

const app = express();

const birdRouter = require('./61-router');

app.route('/')
  .get((req, res) => {
    console.log('hello world get');
    res.sendStatus(200);
  }).post((req, res) => {
  console.log('hello world post');
  res.sendStatus(200);
}).put((req, res) => {
  console.log('hello world put');
  res.sendStatus(200);
});

app.use('/birds', birdRouter);

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('express is up');
  }
});
