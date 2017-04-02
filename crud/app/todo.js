const assert = require('assert');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoRouter = require('express').Router();

const TodoSchema = new Schema({
    label: {type: String, max: 30, required: true},
    done: Boolean,
});

var TodoModel = mongoose.model('Todo', TodoSchema);

todoRouter.get('/', (req, res)=> {
    mongoose.model('Todo').find(req.query, (err, docs)=> {
        assert.equal(null, err);
        res.json(docs);
    })
});

todoRouter.get('/:id', (req, res)=> {
    mongoose.model('Todo').findById(req.params.id, (err, doc)=> {
        assert.equal(null, err);
        res.json(doc);
    })
});

todoRouter.post('/', (req, res)=> {
    const todo = new TodoModel();
    Object.assign(todo, req.body);
    todo.save().then((saved)=> {
        res.statusCode = 201;
        res.json(saved);
    }).catch(err=> {
        res.statusCode = 500;
        console.error(err);
        res.end()
    });
});

todoRouter.delete('/:id', (req, res)=>{
    mongoose.model('Todo').findByIdAndRemove(req.params.id, (err)=> {
        assert.equal(null, err);
        res.statusCode = 202;
        res.end();
    })
});

todoRouter.put('/:id', (req, res)=>{
    mongoose.model('Todo').findByIdAndUpdate(req.params.id, {$set: req.body},{ new: true }, (err, updated)=> {
        assert.equal(null, err);
        res.statusCode = 202;
        res.json(updated);
    })
});

module.exports = todoRouter;
