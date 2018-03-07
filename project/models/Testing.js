const models = require('./models');

models.connect();

// Example of saving
var harry = new models.User({
    forename: "Harry",
    surname: "Howarth",
    email: "h@h.com",
    username: "HarryEH",
    password: "45e$ffdjj3120sH",
    score: 0
});

harry.save(function (err, harry) {
       if (err) return console.error(err);

});

// Example query
models.User.find({ forename: /^Har/ }, function (err, users) {
    if (err) return console.error(err);
    users.forEach(function(u){
        console.log(u.surname);
    })
});


// Example code
// var kittySchema = mongoose.Schema({
//     name: String
// });
//
// kittySchema.methods.speak = function () {
//     var greeting = this.name
//         ? "Meow name is " + this.name
//         : "I don't have a name";
//     console.log(greeting);
// };
//
// var Kitten = mongoose.model('Kitten', kittySchema);
//
// var fluffy = new Kitten({ name: 'fluffy' });
// fluffy.speak(); // "Meow name is fluffy"
//
// fluffy.save(function (err, fluffy) {
//     if (err) return console.error(err);
//     fluffy.speak();
// });
//
// Kitten.find(function (err, kittens) {
//     if (err) return console.error(err);
//     console.log(kittens);
// });
//
// var q = [];
//
// Kitten.find({ name: /^fluff/ }, q);
//
// console.log(q);
