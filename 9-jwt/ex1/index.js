const express = require('express');
const bodyParser = require('body-parser');
const todosRouter = require('./todos-router');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const secret = 'amazing node course';

const users = {
    batman: {
        password: 'leggings',
        roles: ['admin']
    },
    robin: {
        password: 'mask',
        roles: ['helper']
    }
};

app.use(bodyParser.json());

app.use("/secured/*", (req, res, next)=> {
    const authHeader = req.header('Authorization');
    if (authHeader) {
        const [authType, value] =  authHeader.split(' ');
        if (authType === 'Bearer') {
            const token = jwt.verify(value, secret);
            console.log('has access to protected route', token);
            req.token = token;
            next();
            return;
        }
    }
    res.sendStatus(401);
});

app.get('/login', (req, res) => {
    const authHeader = req.header('Authorization');
    if (authHeader) {
        const [authType, value] =  authHeader.split(' ');
        if (authType === 'Basic') {
            const [user, password] = Buffer.from(value, 'base64').toString('ascii').split(':');
            if (users[user] && users[user].password === password) {
                const token = jwt.sign({username: user, roles: users[user].roles}, secret);
                res.json(token);
                return;
            }
        }
    }
    res.sendStatus(401);

});

app.use('/secured/todos', todosRouter);
app.listen(3000, (err)=> {
    if (err) {
        console.error(err);
    } else {
        console.log('todo list up and running');
    }
});
