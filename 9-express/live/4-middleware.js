const express = require('express');
const app = express();

app.use(function (req, res, next) {
  console.log('intercepted a request');
  req.requestTime = Date.now();
  next();
});

app.get('/users', [(req, res, next) => {

  //todo after
  console.log('passed time', req.requestTime);

  console.log('first handler');
  next();
}, (req, res) => {
  console.log('second handler');
  res.sendStatus(200);
}]);

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('up and running');
  }
});