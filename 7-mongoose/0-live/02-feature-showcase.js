const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/test2');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {

    const countrySchema = mongoose.Schema({
        name: {type: String, required: true}
    });

    var kidSchema = mongoose.Schema({
        name: {type: String, required: true},
        age: {type: Number, min: 0},
        personToContact: {
            name: {type: String, minlength: 3, required: true}
        },
        country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Country'
        }

    });


    var Country = mongoose.model('Country', countrySchema);
    var Kid = mongoose.model('Kid', kidSchema);

    const france = new Country({name: 'France'});
    const usa = new Country({name: 'USA'});

    await france.save();
    await usa.save();


    const marie = new Kid({
        name: 'marie',
        age: 2,
        personToContact: {
            name: 'Alice'
        },
        country: france._id,
    });

    const jules = new Kid({
        name: 'jules',
        age: 2,
        personToContact: {
            name: 'Alice'
        },
        country: usa._id,
    });

    const raph = new Kid({
        name: 'raph',
        age: 6,
        personToContact: {
            name: 'Emilie'
        },
        country: usa._id,
    });


    await marie.save();
    await jules.save();
    await raph.save();


    const kidsWithANameWithA = await Kid.find({name: /.*a.*/});
    console.log('kidsWithANameWithA', kidsWithANameWithA);

    const oneKidsWithANameWithA = await Kid.find({name: /.*a.*/}).limit(1);
    console.log('oneKidsWithANameWithA', oneKidsWithANameWithA);

    const findOneKidsWithANameWithA = await Kid.findOne({name: /.*a.*/});
    console.log('findOneKidsWithANameWithA', findOneKidsWithANameWithA);

    const sortedKidsWithANameWithA = await Kid.find({name: /.*a.*/}).sort({name: -1});
    console.log('sortedKidsWithANameWithA', sortedKidsWithANameWithA);


    const kidsWithAliceContact = await Kid.find({
        personToContact: {
            name: 'Alice'
        }
    });


    console.log('kidsWithAliceContact', kidsWithAliceContact);

    const populatedKid = await Kid.find().populate('country');

    console.log('populatedKid', populatedKid);


    const updatedMarie = await Kid.update({name: 'marie'}, {$set: {personToContact: 'Antoine'}});
    console.log(updatedMarie);


    const updatedMarie2 = await Kid.findOneAndUpdate({name: 'marie'}, {$set: {personToContact: 'Emilie'}});
    console.log(updatedMarie2);

    const updatedMarie3 = await Kid.findOneAndUpdate({name: 'marie'}, {$set: {personToContact: 'Walter'}}, {new: true});
    console.log(updatedMarie3);

    const updatedMarie4 = await Kid.findByIdAndUpdate(marie._id, {$set: {personToContact: 'Maman'}}, {new: true});
    console.log(updatedMarie4);


    await Kid.remove({});
    const all = await Kid.find({});
    console.log(all)


});

