const assert = require('assert');
const router = require('express').Router();
const Vaccine = require('./model').Vaccine;

router.get('/', (req, res)=> {
    Vaccine.find(req.query, (err, docs)=> {
        assert.equal(null, err);
        res.json(docs);
    })
});


router.post('/',
    (req, res)=> {
        console.log(req.user)
        const vaccine = new Vaccine();
        Object.assign(vaccine, req.body);
        vaccine.save().then((saved)=> {
            res.statusCode = 201;
            res.json(saved);
        }).catch(err=> {
            res.statusCode = 500;
            console.error(err);
            res.end()
        });

    });


module.exports = router;
