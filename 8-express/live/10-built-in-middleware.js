const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.get('/', (req, res) => {
    console.log('hello world');
    res.sendStatus(200);
});

app.use(express.static('somedir'));
app.use(bodyParser.json());

app.post('/somedata', (req, res)=> {
    console.log(req.body);
    res.sendStatus(302);
});


app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('express is up');
    }
});
