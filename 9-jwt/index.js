const jwt = require('jsonwebtoken');
const express = require('express');

const app = express();

const users = {
    admin: {
        password: 'mypassword',
        roles: ['admin']
    },
    pingouin: {
        password: 'fish',
        roles: ['swimmer']
    }
};

const secret = 'amazing node course';


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

app.get('/secured', (req, res) => {
    const authHeader = req.header('Authorization');
    if (authHeader) {
        const [authType, value] =  authHeader.split(' ');
        if (authType === 'Bearer') {
            const token = jwt.verify(value, secret);
            console.log('has access to protected route', token);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(401);

});

app.get('/onlyadmin', (req, res) => {
        const authHeader = req.header('Authorization');
        if (authHeader) {
            const [authType, value] =  authHeader.split(' ');
            if (authType === 'Bearer') {
                const token = jwt.verify(value, secret);
                if (token.roles.includes('admin')) {
                    console.log('has access to admin route', token);
                    res.sendStatus(200);
                } else {
                    res.sendStatus(403);
                }
                return;
            }
        }
        res.sendStatus(401);
    }
);

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('express is up');
    }
});
