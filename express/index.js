const express = require('express');
const birds = require('./birds');
const app = express();

app.get('/', (req, res) => {

  console.log(req.query['coucou']);
  console.log(req.headers);

  res.end('hello world !')
  //res.download()
});

app.use('/birds', birds);

app.listen(8888, err => {
  if (err) console.error('could not listen', err);
  else
    console.log('Express app started');
});




