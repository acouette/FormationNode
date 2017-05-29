const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/test2');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
  var kittySchema = mongoose.Schema({
    name: { type: String, minlength: 3, required: true },
    age: { type: Number, min: 0 }
  });

  kittySchema.methods.speak = function () {
    var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  };

  const Kitten = mongoose.model('Kitten', kittySchema);
  const silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'

  const fluffy = new Kitten({ name: 'fluffy' });
  fluffy.speak(); // "Meow name is fluffy"

  const f = await  fluffy.save();
  f.speak();

  const kitterns = await Kitten.find({ name: /^aws/ });
  console.log(kitterns.length);

});

