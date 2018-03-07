const models = require('./models');

models.connect();

// RUN `node models/Testing.js` from project directory

// Example of saving
var harry = new models.User({
    forename: "Harry",
    surname: "Howarth",
    email: "h@h.com",
    username: "HarryEH",
    password: "45e$ffdjj3120sH",
    score: 0
});

var adam = new models.User({
    forename: "Adam",
    surname: "Orr",
    email: "a@o.com",
    username: "aca14ao",
    password: "45e$ffdjj3120sA",
    score: 0
});

var victoria = new models.User({
    forename: "Victoria",
    surname: "Neal",
    email: "v@n.com",
    username: "vneal1",
    password: "45e$ffdjj3120sV",
    score: 0
});

harry.save(function (err, harry) {
       if (err) return console.error(err);

});

adam.save(function (err, adam) {
    if (err) return console.error(err);

});

victoria.save(function (err, victoria) {
    if (err) return console.error(err);

});

var dinehard = new models.Restaurant({
    name: "Dine Hard",
    doorNumber: "37",
    postcode: "NE2 4RQ",
    photoURL: "null",
    tags: "homely, warm, good ambiance",
    rating: 3.14,
    websiteURL: "http://howarth.io"
});

dinehard.save(function (err, dinehard) {
    if (err) return console.error(err);

});

// Example query
models.User.findOne({ forename: /^Har/ }, function (err, user) {
    if (err) return console.error(err);
    models.Restaurant.findOne({ name: /^Dine/ }, function (err, res) {
        if (err) return console.error(err);

        var review = new models.Review({
            userId: user._id,
            resId: res._id,
            rating: "7",
            time: "15:39:21",
            date: "7/3/18",
            review: "Absolutely great. Would recommend",
            photos: ""
        });

        review.save(function (err, review) {
            if (err) return console.error(err);

        });

    });
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


function valid_postcode(postcode) {
    postcode = postcode.replace(/\s/g, "");
    var regex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))[0-9][A-Za-z]{2})$/i;
    return regex.test(postcode);
}

