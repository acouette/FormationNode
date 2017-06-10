const express = require('express');
const uuid = require('uuid/v1');


const router = express.Router();

const todos = {};


router.use((req, res, next)=> {
    if (req.method === 'GET') {
        next();
    } else {
        const authHeader = req.header('Authorization');
        if (authHeader && authHeader.indexOf('Basic ') == 0
            && Buffer.from(authHeader.substr(6), 'base64').toString('ascii') === 'admin:admin') {
            console.log('auth ok, welcome home admin');
            next();
        } else {
            console.log(req);
            res.sendStatus(401);
        }
    }
});


router.get('/', (req, res)=> {
    res.status(200).json(Object.values(todos));
});

router.get('/:id', (req, res)=> {
    var todo = todos[req.params.id];
    if (!todo) {
        res.sendStatus(404);
    } else {
        res.status(200).json(todo);
    }
});

router.put('/:id', (req, res)=> {
    var todo = todos[req.params.id];
    if (!todo) {
        res.sendStatus(404);
    } else {
        const updatedTodo = Object.assign({}, todo, req.body);
        todos[req.params.id] = updatedTodo;
        res.status(204).json(updatedTodo);
    }
});


router.post('/', (req, res)=> {
    var id = uuid();
    const todo = Object.assign({id}, req.body);
    todos[id] = todo;
    res.status(201).json(todo);
});

router.delete('/:id', (req, res)=> {

    if (!todos[req.params.id]) {
        res.sendStatus(404);
    } else {
        delete todos[req.params.id];
        res.sendStatus(204);
    }
});


module.exports = router;