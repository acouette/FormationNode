const express = require('express');
const uuid = require('uuid/v1');


const router = express.Router();

const todos = {};

const hasRightsOnTodo = (token, todo)=> token.username === todo.username || token.roles.includes('admin');


router.get('/', (req, res)=> {
    res.status(200).json(Object.values(todos).filter(t=> hasRightsOnTodo(req.token, t)));
});

router.get('/:id', (req, res)=> {
    const todo = todos[req.params.id];
    if (!todo) {
        res.sendStatus(404);
    } else if (hasRightsOnTodo(req.token, todo)) {
        res.status(200).json(todo);
    } else {
        res.status(403);
    }
});

router.put('/:id', (req, res)=> {
    const todo = todos[req.params.id];
    if (!todo) {
        res.sendStatus(404);
    } else if (hasRightsOnTodo(req.token, todo)) {
        const updatedTodo = Object.assign(todo, req.body);
        todos[req.params.id] = updatedTodo;
        res.status(204).json(updatedTodo);
    } else {
        res.status(403);
    }
});


router.post('/', (req, res)=> {
    const id = uuid();
    const todo = Object.assign({id}, req.body, {username: req.token.username});
    todos[id] = todo;
    res.status(201).json(todo);
});

router.delete('/:id', (req, res)=> {

    const todo = todos[req.params.id];
    if (!todo) {
        res.sendStatus(404);
    } else if (hasRightsOnTodo(req.token, todo)) {
        delete todos[req.params.id];
        res.sendStatus(204);
    } else {
        res.sendStatus(403);
    }
});


module.exports = router;