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

        var Project = mongoose.model('Project', projectSchema);
        await Project.remove({});

        for (const index in projects) {
            const project = new Project(projects[index]);
            await project.save();
        }

        const all = await Project.find({});
        console.log(all);


        const javascriptAcs = await Project.find({language: 'Javascript'}).sort({'name': 1});
        console.log('javascriptAcs', javascriptAcs);

        const budgetBetween = await Project.find({budget: {$gt: 200000, $lt: 800000}});
        console.log('budgetBetween', budgetBetween);

        const max3orderBudget = await Project.find({}).limit(3).sort({budget: 1});
        console.log('max3orderBudget', max3orderBudget);

        const mag = await Project.findOneAndUpdate({name: 'Great aventure'}, {name: 'Magnificent aventure'}, {new: true});
        console.log(mag);


        await Project.updateMany({language: 'Java'}, {$inc: {budget: 100000}});
        const javas = await Project.find({language: 'Java'});
        console.log(javas);


    } catch (err) {
        console.error(err);
    }


});

