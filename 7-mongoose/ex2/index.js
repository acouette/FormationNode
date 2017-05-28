const projects = [
    {
        name: 'Super system',
        language: 'Javascript',
        budget: '120000',
    },
    {
        name: 'Great mind',
        language: 'Java',
        budget: '250000',
    },
    {
        name: 'Dynamo 1000',
        language: 'Javascript',
        budget: '750000',
    },
    {
        name: 'Great aventure',
        language: 'Java',
        budget: '1000000',
    }
];

const getEmployees = projectsSortedByName => [
    {
        firstname: 'john',
        lastname: 'doe',
        address: {
            street: '9 sentier des crissets',
            zip: 95170,
            city: 'Deuil-la-barre'
        },
        projects: [projectsSortedByName[0], projectsSortedByName[1]]
    },
    {
        firstname: 'mathilde',
        lastname: 'dupont',
        address: {
            street: '12 rue de la source',
            zip: 14234,
            city: 'St Pons'
        },
        projects: [projectsSortedByName[1], projectsSortedByName[3]]
    },
    {
        firstname: 'francis',
        lastname: 'gerard',
        address: {
            street: '13 avenue charles de gaulle',
            zip: 92543,
            city: 'Paris'
        },
        projects: [projectsSortedByName[3]]
    },
    {
        firstname: 'mehdi',
        lastname: 'boulbekar',
        address: {
            street: '63 impasse des carillons',
            zip: 75012,
            city: 'Paris'
        },
        projects: [projectsSortedByName[1], projectsSortedByName[2]]
    },
];

const waitForIndex = (model)=> {
    return new Promise((resolve, reject)=> {
        model.on('index', function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
};


const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/test');
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {

    try {


        const projectSchema = mongoose.Schema({
            name: {type: String, required: true},
            language: {type: String, required: true, enum: ['Java', 'Javascript']},
            budget: {type: Number, min: 0},
        });

        const Project = mongoose.model('Project', projectSchema);
        waitForIndex(Project);
        await Project.remove({});
        await Project.create(projects);
        const projectsSortedByName = await Project.find().sort({name: 1});

        //ex 2 part1
        // const javascriptAcs = await Project.find({language: 'Javascript'}).sort({'name': 1});
        // console.log('javascriptAcs', javascriptAcs);
        //
        // const budgetBetween = await Project.find({budget: {$gt: 200000, $lt: 800000}});
        // console.log('budgetBetween', budgetBetween);
        // const budgetCountOver400000 = await Project.find({budget: {$gt: 400000}}).count();
        // console.log('budgetCountOver400000', budgetCountOver400000);
        //
        // const max3orderBudget = await Project.find({}).limit(3).sort({budget: 1});
        // console.log('max3orderBudget', max3orderBudget);
        //
        // const mag = await Project.findOneAndUpdate({name: 'Great aventure'}, {name: 'Magnificent aventure'}, {new: true});
        // console.log(mag);
        //
        //
        // await Project.updateMany({language: 'Java'}, {$inc: {budget: 100000}});
        // const javas = await Project.find({language: 'Java'});
        // console.log(javas);


        //part 2

        const addressSchema = mongoose.Schema({
            street: {type: String, required: true},
            zip: {
                type: Number, required: true, validate: {
                    validator: function (v) {
                        return /\d{5}/.test(v);
                    },
                    message: '{VALUE} is not a valid zip!'
                },
            },
            city: {type: String, required: true}
        });

        const employeeSchema = mongoose.Schema({
            firstname: {type: String, required: true},
            lastname: {type: String, required: true},
            address: {type: addressSchema, required: true},
            projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}]
        });

        var Employee = mongoose.model('Employee', employeeSchema);
        await Employee.remove({});

        await Employee.create(getEmployees(projectsSortedByName));


        const employeesInParis = await Employee.find({'address.city': 'Paris'});
        console.log('employeesInParis', employeesInParis);

        const yProjects = await Project.find({'name': /.*y.*/}, {_id: 1});
        console.log('yProjects', yProjects);
        const employeesWithaYProject = await Employee.find({'projects': {$in: yProjects.map(p=>p._id)}}).populate('projects');
        console.log('employeesWithaYProject', employeesWithaYProject);


    } catch (err) {
        console.error(err);
    }


});

