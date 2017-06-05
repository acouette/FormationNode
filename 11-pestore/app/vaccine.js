const router = require('express').Router();
const Vaccine = require('./model').Vaccine;

router.get('/', (req, res, next)=>
    Vaccine.find(req.query)
        .then(r=> res.json(r))
        .catch(next));


router.post('/', (req, res, next)=> {
    const vaccine = new Vaccine();
    Object.assign(vaccine, req.body);
    vaccine.save()
        .then(savedVaccine => res.status(201)
            .json(savedVaccine)).catch(e=> next(e));
});


router.delete('/:id', (req, res, next)=> {
    Vaccine.findByIdAndRemove(req.params.id)
        .then(savedVaccine => res.sendStatus(202)
            .catch(next));
});

module.exports = router;
