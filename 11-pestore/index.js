const express = require('express');
const winston = require('winston');
const bodyParser = require('body-parser');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());


app.use('/clients', require('./app/client'));
app.use('/vaccines', require('./app/vaccine'));

app.use((error, req, res, next) => {
    winston.error(error);
    res.status(500).end(error.message);
});

app.listen(3000, () => {
    winston.info('Petstore started on port %d', PORT);
});

