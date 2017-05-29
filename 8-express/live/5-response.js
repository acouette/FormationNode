//hello world

const express = require('express');

const app = express();

app.get('/download-file', (req, res) => {
  res.download(__filename);
});

app.get('/end', (req, res) => {
  res.end();
});

app.get('/json', (req, res) => {
  res.json({
    "message": "hello world"
  });
});

app.get('/redirect', (req, res) => {
  res.redirect('/json');
});

app.get('/send-file', (req, res) => {
  res.sendFile(__filename);
});

app.get('/status', (req, res) => {
  res.sendStatus(404);
});


app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('express is up');
  }
});
