const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("connected");
});

var kittySchema = mongoose.Schema({
    name: String
});

kittySchema.methods.speak = function () {
    var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);

var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"

fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
});

Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
})

var q = [];

Kitten.find({ name: /^fluff/ }, q);

console.log(q);


