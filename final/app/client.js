const assert = require('assert');
const mongoose = require('mongoose');
const router = require('express').Router();
const Client = require('./model').Client;
const AppliedVaccine = require('./model').AppliedVaccine;

router.get('/', (req, res)=> {
    mongoose.model('Client').find(req.query)
        .populate('animals.vaccines.vaccine')
        .exec((err, docs)=> {
        assert.equal(null, err);
        res.json(docs);
    })
});

router.get('/:id', (req, res)=> {
    mongoose.model('Client')
        .findById(req.params.id)
        .exec((err, doc)=> {
            assert.equal(null, err);
            res.json(doc);
        })
});

router.post('/',

    (req, res)=> {
        console.log(req.user)
        const client = new Client();
        Object.assign(client, req.body);
        client.save().then((saved)=> {
            res.statusCode = 201;
            res.json(saved);
        }).catch(err=> {
            res.statusCode = 500;
            console.error(err);
            res.end()
        });

    });

router.delete('/:id', (req, res)=> {
    mongoose.model('Client').findByIdAndRemove(req.params.id, (err)=> {
        assert.equal(null, err);
        res.statusCode = 202;
        res.end();
    })
});

router.put('/:id', (req, res)=> {
    mongoose.model('Client').findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, updated)=> {
        assert.equal(null, err);
        res.statusCode = 202;
        res.json(updated);
    })
});


router.post('/:clientId/animals/:animalName/vaccinate', (req, res) => {
    Client.findById(req.params.clientId, (err, client) => {
        assert.equal(null, err);
        console.log(client.animals);
        const animal = client.animals.filter(a=> a.name === req.params.animalName)[0];
        req.body.vaccines.forEach(vaccine=> {
            animal.vaccines.push(new AppliedVaccine({vaccine: vaccine}));
        });

        Client.findByIdAndUpdate(req.params.clientId, {$set: client}, {new: true}, (err, updatedClient)=> {
            assert.equal(null, err);
            res.json(updatedClient);
        });
    });
});


module.exports = router;
