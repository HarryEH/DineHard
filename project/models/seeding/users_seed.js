const models = require('../models');

models.connect();

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
//Example of saving
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
//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/