const express = require('express');
const app = express();

//strings, string patterns, or regular expressions


app.get('/the-pa?th', (req, res) => {
    console.log('the-p?th');
    res.sendStatus(200);
});

app.get(/.*fly$/, (req, res) => {
  console.log("/.*fly/");
  res.sendStatus(200);
});




app.listen(3000, (err)=>{
  if(err){
    console.error(err);
  }else{
    console.log('up and running');
  }
});