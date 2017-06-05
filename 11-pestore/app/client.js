const router = require('express').Router();
const Client = require('./model').Client;

router.get('/:id', (req, res, next)=>
    Client.findById(req.params.id)
        .populate('pets.administratedVaccines.vaccine')
        .then(client => res.json(client))
        .catch(next));

router.post('/', (req, res, next)=> {
    const client = new Client();
    Object.assign(client, req.body);
    client.save()
        .then(saved=> res.status(201).json(saved))
        .catch(next);
});

router.delete('/:id', (req, res, next) =>
    Client.findByIdAndRemove(req.params.id)
        .then(()=> res.sendStatus(202))
        .catch(next));

router.put('/:id', (req, res, next)=>
    Client.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        .then(updated=> res.status(202).json(updated))
        .catch(next));


router.get('/:id/pets/:petId/vaccine/:vaccineId', (req, res) => {

    const clientId = req.params.id;
    const petId = req.params.petId;
    const vaccineId = req.params.vaccineId;

    Client.findById(clientId)
        .populate('pets.administratedVaccines.vaccine')
        .then(client=> {
            client.pets.id(petId).administratedVaccines.push({vaccine: vaccineId});
            return Client.findByIdAndUpdate(clientId, {$set: client}, {new: true});
        })
        .then(updatedClient=> res.status(202).json(updatedClient));
});

router.get('/:id/pets/:petId/vaccinate/:vaccineId', (req, res, next) => {

    const clientId = req.params.id;
    const petId = req.params.petId;
    const vaccineId = req.params.vaccineId;

    Client.findById(clientId)
        .populate('pets.administratedVaccines.vaccine')
        .then(client=> {
            client.pets.id(petId).administratedVaccines.push({vaccine: vaccineId});
            return Client.findByIdAndUpdate(clientId, {$set: client}, {new: true});
        })
        .then(updatedClient=> res.status(202).json(updatedClient))
        .catch(next);
});

router.get('/:id/petsToVaccinate', (req, res, next) => {

    const clientId = req.params.id;

    Client.find({_id: clientId, 'pets.administratedVaccines.administrationDate': {$gt: '2017-06-06T20:40:42.255Z'}})
        .populate('pets.administratedVaccines.vaccine')
        .then(client=> res.status(202).json(client))
        .catch(next);
});

module.exports = router;
