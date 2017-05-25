const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vaccineSchema = new Schema({
    name: String,
    actionDurationInYears: Number
});

const Vaccine = mongoose.model('Vaccine', vaccineSchema);

const appliedVaccineSchema = new Schema({
    vaccine: {
        type: Schema.Types.ObjectId,
        ref: 'Vaccine'
    },
    injectionDate: {
        type: Date,
        default: Date.now
    }
});

const AppliedVaccine = mongoose.model('AppliedVaccine', appliedVaccineSchema);

const animalSchema = new Schema({
    name: String,
    birthDate: Date,
    vaccines: [appliedVaccineSchema]
});

const Animal = mongoose.model('Animal', animalSchema);


const clientSchema = new Schema({

    name: String,
    firstName: String,
    animals: [animalSchema],

});

const Client = mongoose.model('Client', clientSchema);


exports.Animal = Animal;
exports.Client = Client;
exports.Vaccine = Vaccine;
exports.AppliedVaccine = AppliedVaccine;
