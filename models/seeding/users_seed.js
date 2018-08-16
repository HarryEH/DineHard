const models = require('../models');
const bcrypt = require('bcrypt');

models.connect();

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
//Example of saving
bcrypt.hash("45e$ffdjj3120sH", 10, function(err, hash) {
    var harry = new models.User({
        forename: "Harry",
        surname: "Howarth",
        email: "h@h.com",
        username: "HarryEH",
        password: hash,
        score: 0
    });

    harry.save(function (err, harry) {
        if (err) return console.error(err);

    });
});

bcrypt.hash("qwertyuiop", 10, function(err, hash) {
    var adam = new models.User({
        forename: "Adam",
        surname: "Orr",
        email: "a@o.com",
        username: "aca14ao",
        password: hash,
        score: 0
    });

    adam.save(function (err, adam) {
        if (err) return console.error(err);

    });

});

bcrypt.hash("45e$ffdjj3120sV", 10, function(err, hash) {
    var victoria = new models.User({
        forename: "Victoria",
        surname: "Neal",
        email: "v@n.com",
        username: "vneal1",
        password: hash,
        score: 0
    });

    victoria.save(function (err, victoria) {
        if (err) return console.error(err);

    });
});

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/