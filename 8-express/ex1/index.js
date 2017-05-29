const express = require('express');
const bodyParser = require('body-parser');
const todosRouter = require('./todos-router');
const app = express();


app.use(bodyParser.json());
app.use('/todos', todosRouter);


app.listen(3000, (err)=> {
    if (err) {
        console.error(err);
    } else {
        console.log('todo list up and running');
    }
})
