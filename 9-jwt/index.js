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
    if (authHeader.indexOf('Basic ') == 0) {
        const [user, password] = Buffer.from(authHeader.substr(6), 'base64').toString('ascii').split(':');
        if (users[user] && users[user].password === password) {
            const token = jwt.sign({username: user, roles: users[user].roles}, secret);
            res.json(token);
            return;
        }
    }
    res.sendStatus(401);

});

app.get('/secured', (req, res) => {
    const authHeader = req.header('Authorization');
    if (authHeader.indexOf('Bearer ') == 0) {
        jwt.verify(Buffer.from(authHeader.substr(6), 'base64').toString('ascii'), secret, (err, token)=> {
            if (err) {
                res.sendStatus(401);
            } else {
                console.log('has access to protected route', token);
                res.sendStatus(200);
            }
        });
    } else {
        res.sendStatus(401);
    }

});

app.get('/onlyadmin', (req, res) => {
    const authHeader = req.header('Authorization');
    if (authHeader.indexOf('Bearer ') == 0) {
        jwt.verify(Buffer.from(authHeader.substr(6), 'base64').toString('ascii'), secret, (err, token)=> {
            if (err) {
                res.sendStatus(401);
            } else {
                if (token.roles.includes('admin')) {
                    console.log('has access to admin route', token);
                    res.sendStatus(200);
                } else {
                    console.log('does not have rights', token);
                    res.sendStatus(403);
                }
            }
        });
    } else {
        res.sendStatus(401);
    }

});

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('express is up');
    }
});
