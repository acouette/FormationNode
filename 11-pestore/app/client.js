const router = require('express').Router();
const Client = require('./model').Client;
const moment = require('moment');

router.get('/:id', (req, res, next) =>
    Client.findById(req.params.id)
        .populate('pets.administratedVaccines.vaccine')
        .then(client => res.json(client))
        .catch(next));

router.post('/', (req, res, next) => {
    const client = new Client();
    Object.assign(client, req.body);
    client.save()
        .then(saved => res.status(201).json(saved))
        .catch(next);
});

router.delete('/:id', (req, res, next) =>
    Client.findByIdAndRemove(req.params.id)
        .then(() => res.sendStatus(202))
        .catch(next));

router.put('/:id', (req, res, next) =>
    Client.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        .then(updated => res.status(202).json(updated))
        .catch(next));

router.get('/:id/pets/:petId/vaccinate/:vaccineId', (req, res, next) => {

    const clientId = req.params.id;
    const petId = req.params.petId;
    const vaccineId = req.params.vaccineId;

    Client.findById(clientId)
        .populate('pets.administratedVaccines.vaccine')
        .then(client => {
            client.pets.id(petId).administratedVaccines.push({vaccine: vaccineId});
            return Client.update(clientId, {$set: client}, {new: true});
        })
        .then(() => Client.findById(clientId)
            .populate('pets.administratedVaccines.vaccine'))
        .then(updatedClient => res.status(202).json(updatedClient))
        .catch(next);
});

function isToVaccinate(pet, atDate) {
    return !!pet.administratedVaccines.find(a => {
        console.log(moment(a.administrationDate.getTime()).add(a.vaccine.effectivePeriodInYears, 'years'));
        return moment(a.administrationDate.getTime()).add(a.vaccine.effectivePeriodInYears, 'years') < atDate
    });
}

router.get('/:id/petsToVaccinate', (req, res, next) => {

    const clientId = req.params.id;
    const atDate = req.query.atDate ? new Date(req.query.atDate) : new Date();

    Client.findById(clientId)
        .populate('pets.administratedVaccines.vaccine')
        .then(client => client.pets.filter(p => isToVaccinate(p, atDate)))
        .then(pets => res.status(202).json(pets))
        .catch(next);
});

module.exports = router;
