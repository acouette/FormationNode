const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/test2');
const db = mongoose.connection;

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


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {

    const countrySchema = mongoose.Schema({
        name: {type: String, required: true, unique: true}
    });

    var Country = mongoose.model('Country', countrySchema);
    await waitForIndex(Country);

    for(let i = 0; i< 1000; i++){
        const aCountry = new Country({name: 'France'+i});
        await aCountry.save();
    }
    const cursor = Country.find({}).cursor();

    cursor.on('close', function() {
        console.log('done');
    });
    cursor.on('data', (data)=>{
        console.log('newdata '+data);
    })
});

