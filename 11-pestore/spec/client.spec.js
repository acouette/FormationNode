const fetch = require('node-fetch');

describe('client web services', () => {

    let clientId;
    let felixId;
    let guimauveId;

    it('should create a client', (next) => {

        fetch('http://localhost:3000/clients', {
            method: 'POST',
            body: JSON.stringify({username: 'superman', password: 'clark'}),
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then(res => {
                clientId = res._id;
                next();
            });
    });


    it('should update a client with animals', (next) => {

        fetch(`http://localhost:3000/clients/${clientId}`, {
            method: 'PUT',
            body: JSON.stringify({pets: [{name: 'Felix'}, {name: 'Guimauve'}]}),
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => {
                expect(res.status).toBe(202);
                next();
            })
    });


    it('should fetch the created client successfully', (next) => {

        fetch(`http://localhost:3000/clients/${clientId}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(client => {
                expect(client._id).toBe(clientId);
                expect(client.username).toBe('superman');
                expect(client.password).toBe('clark');
                expect(client.pets.length).toBe(2);

                felixId = client.pets.find(pet => pet.name === 'Felix')._id;
                guimauveId = client.pets.find(pet => pet.name === 'Guimauve')._id;
                next();
            });
    });


    it('should vaccinate successfully', (next) => {

        let vaccineId;

        fetch('http://localhost:3000/vaccines', {
            method: 'POST',
            body: JSON.stringify({name: 'rage', effectivePeriodInYears: 5}),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
            .then(res => {
                vaccineId = res._id;
            })
            .then(() => fetch(`http://localhost:3000/clients/${clientId}/pets/${guimauveId}/vaccinate/${vaccineId}`, {
                method: 'GET',
            }))
            .then(res => res.json())
            .then(client => {
                expect(client.pets[1].administratedVaccines[0].vaccine.name).toBe('rage');

            })
            .then(() => fetch(`http://localhost:3000/clients/${clientId}/petsToVaccinate?atDate=2017-06-06T20:40:42.255Z`, {
                method: 'GET',
            }))
            .then(res => res.json())
            .then(pets => {
                expect(pets.length).toBe(0);
            })
            .then(() => fetch(`http://localhost:3000/clients/${clientId}/petsToVaccinate?atDate=2023-06-06T20:40:42.255Z`, {
                method: 'GET',
            }))
            .then(res => res.json())
            .then(pets => {
                expect(pets.length).toBe(1);
                expect(pets[0].name).toBe('Guimauve');
            })
            .then(()=> fetch(`http://localhost:3000/vaccines/${vaccineId}`, {
            method: 'DELETE',
        })).then(() => next());
        //
    });


    it('should delete the created client successfully', (next) => {

        fetch(`http://localhost:3000/clients/${clientId}`, {
            method: 'DELETE',
        })
            .then(res => {
                expect(res.status).toBe(202);
                next();
            });
    });


})
;