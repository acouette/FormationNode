const express = require('express');

const app = express();


app.use((req, res, next)=> {
    console.log('application level middleware 1');
    next();
});

app.use('/users', (req, res, next)=> {
    console.log('application level middleware targeting any method with route users');
    next();
});

app.get('/users', function (req, res, next) {
    console.log('route application level middleware only targeting users');
    next('route');
}, function (req, res, next) {
    console.log('route application level middleware 2 only targeting users');
    next();
});


app.get('/', (req, res) => {
    console.log('hello world');
    res.sendStatus(200);
});

app.get('/users', (req, res, next) => {
    console.log('users');
    res.sendStatus(200);
});

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('express is up');
    }
});
