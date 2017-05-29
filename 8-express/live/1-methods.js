//hello world

const express = require('express');

const app = express();

// app.get('/', (req, res) => {
//   console.log('hello world');
//   res.sendStatus(200);
// });
//
//
// //add methods post
// app.post('/', (req, res) => {
//   console.log('received a post req');
//   res.sendStatus(200);
// });

//or add an all method
app.all('/', (req, res) => {
  console.log('received a req');
  res.sendStatus(200);
  console.log(process.memoryUsage());
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('express is up');
  }
});
