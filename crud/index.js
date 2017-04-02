const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/todo-list');

//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/todos', require('./app/todo'));


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(3000, ()=> {
    console.log('Example app listening on port 3000!')
});