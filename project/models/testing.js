const models = require('./models');

models.connect();

// RUN `node models/testing.js` from project directory


//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
// Example of saving
// var harry = new models.User({
//     forename: "Harry",
//     surname: "Howarth",
//     email: "h@h.com",
//     username: "HarryEH",
//     password: "45e$ffdjj3120sH",
//     score: 0
// });
//
// var adam = new models.User({
//     forename: "Adam",
//     surname: "Orr",
//     email: "a@o.com",
//     username: "aca14ao",
//     password: "45e$ffdjj3120sA",
//     score: 0
// });
//
// var victoria = new models.User({
//     forename: "Victoria",
//     surname: "Neal",
//     email: "v@n.com",
//     username: "vneal1",
//     password: "45e$ffdjj3120sV",
//     score: 0
// });
//
// harry.save(function (err, harry) {
//        if (err) return console.error(err);
//
// });
//
// adam.save(function (err, adam) {
//     if (err) return console.error(err);
//
// });
//
// victoria.save(function (err, victoria) {
//     if (err) return console.error(err);
//
// });
//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/


//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
// var dinehard = new models.Restaurant({
//     name: "Dine Hard",
//     doorNumber: "37",
//     postcode: "NE2 4RQ",
//     phoneNo: "01912401786",
//     lat: 54.9857359,
//     lng: -1.6080269,
//     photoURL: "null",
//     tags: "homely, warm, good ambiance",
//     rating: 3.14,
//     websiteURL: "http://howarth.io"
// });
//
// dinehard.save(function (err, dinehard) {
//     if (err) return console.error(err);
//
// });
//
// var fake = new models.Restaurant({
//     name: "Harry Smells",
//     doorNumber: "37",
//     postcode: "s1 4dg",
//     phoneNo: "07504988541",
//     lat: 53.3806721,
//     lng: -1.4822935,
//     photoURL: "lol",
//     tags: "smelly",
//     rating: 4.37,
//     websiteURL: "http://harryehowarth.com"
// });
//
// fake.save(function (err, fake) {
//     if (err) return console.error(err);
//
// });

// Example query
models.User.findOne({ forename: /^Har/ }, function (err, user) {
    if (err) return console.error(err);
    models.Restaurant.findOne({ name: /^Dine/ }, function (err, res) {
        if (err) return console.error(err);

        var review = new models.Review({
            username: user.username,
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
//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/

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
