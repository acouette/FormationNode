const router = require('express').Router();
const Vaccine = require('./model').Vaccine;

router.get('/', (req, res, next) =>
    Vaccine.find(req.query)
        .then(r => res.json(r))
        .catch(next));


router.post('/', (req, res, next) => {
    const vaccine = new Vaccine(req.body);
    vaccine.save()
        .then(savedVaccine => res.status(201).json(savedVaccine))
        .catch(next);
});


router.delete('/:id', (req, res, next) => {
    Vaccine.findByIdAndRemove(req.params.id)
        .then(savedVaccine => savedVaccine ? res.sendStatus(202) : res.sendStatus(404))
        .catch(next);
});

module.exports = router;
