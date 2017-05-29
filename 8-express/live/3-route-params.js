const express = require('express');
const app = express();

app.get('/users/:userId/books/:bookId', (req, res) => {
  console.log(req.params);
    res.sendStatus(200);
});

app.get('/flights/:from-:to', (req, res) => {
  console.log(req.params);
  res.sendStatus(200);
});



app.listen(3000, (err)=>{
  if(err){
    console.error(err);
  }else{
    console.log('up and running');
  }
});