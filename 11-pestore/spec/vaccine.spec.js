const fetch = require('node-fetch');


describe('vaccine web services', () => {

    let vaccineId;

    it('should create valid vaccine successfully', (next) => {

        fetch('http://localhost:3000/vaccines', {
            method: 'POST',
            body: JSON.stringify({name: 'rage', effectivePeriodInYears: 5}),
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then(res => {
                expect(res.name).toBe('rage');
                expect(res.effectivePeriodInYears).toBe(5);
                vaccineId = res._id;
                next();
            });
    });

    it('should prevent from creating a vaccine with the same name', (next) => {

        fetch('http://localhost:3000/vaccines', {
            method: 'POST',
            body: JSON.stringify({name: 'rage', effectivePeriodInYears: 2}),
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => {
                expect(res.status).toBe(500);
                next()
            })

    });

    it('should fetch the created vaccine successfully', (next) => {

        fetch('http://localhost:3000/vaccines/', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(vaccines => {
                expect(vaccines.length).toBe(1);
                expect(vaccines[0]._id).toBe(vaccineId);
                expect(vaccines[0].name).toBe('rage');
                expect(vaccines[0].effectivePeriodInYears).toBe(5);
                next();
            });
    });

    it('should delete the created vaccine successfully', (next) => {

        fetch(`http://localhost:3000/vaccines/${vaccineId}`, {
            method: 'DELETE',
        })
            .then(res => {
                expect(res.status).toBe(202);
                next();
            });
    });
});