const models = require('../models');

models.connect();

models.Restaurant.findOne({name: /^Harry/}, function (err, res) {
    if (err) return console.error(err);
    models.User.findOne({forename: /^Vic/}, function (err, user) {
        if (err) return console.error(err);

        var review = new models.Review({
            username: user.username,
            resId: res._id,
            rating: "5",
            time: "04:12:15",
            date: "4/6/18",
            review: "Beautiful kebabs and beautiful staff! Mr Bab wot a legend!!",
            photos: ""
        });

        review.save(function (err, review) {
            if (err) return console.error(err);

        });

    });

    models.User.findOne({forename: /^Ada/}, function (err, user) {
        if (err) return console.error(err);

        var review = new models.Review({
            username: user.username,
            resId: res._id,
            rating: "6",
            time: "13:11:31",
            date: "11/2/18",
            review: "Besst chips in toown! Think I would definitely return and share a pizza with Hazza again! Man can cook a kebab like no one else!",
            photos: ""
        });

        review.save(function (err, review) {
            if (err) return console.error(err);

        });

    });
});

models.Restaurant.findOne({name: /^Vict/}, function (err, res) {
    if (err) return console.error(err);
    models.User.findOne({forename: /^Ada/}, function (err, user) {
        if (err) return console.error(err);

        var review = new models.Review({
            username: user.username,
            resId: res._id,
            rating: "6",
            time: "12:16:11",
            date: "11/3/18",
            review: "Victoria's Haven more like Victoria's Heaven, amiright! Delicious food, would return! Perfection...",
            photos: ""
        });

        review.save(function (err, review) {
            if (err) return console.error(err);

        });

    });

    models.User.findOne({forename: /^Har/}, function (err, user) {
        if (err) return console.error(err);

        var review = new models.Review({
            username: user.username,
            resId: res._id,
            rating: "6",
            time: "12:11:31",
            date: "11/2/14",
            review: "Marvellous staff and delightfully delicious food, think about stopping by Vicky's Place on your way past in future!!! :D",
            photos: ""
        });

        review.save(function (err, review) {
            if (err) return console.error(err);

        });

    });
});

models.Restaurant.findOne({name: /^Ada/}, function (err, res) {
    if (err) return console.error(err);
    models.User.findOne({forename: /^Vic/}, function (err, user) {
        if (err) return console.error(err);

        var review = new models.Review({
            username: user.username,
            resId: res._id,
            rating: "5",
            time: "16:45:12",
            date: "12/3/18",
            review: "Interesting mix of Irish and Medieval themes, but definitely manages the atmosphere well. Would totally bring my kids here in future",
            photos: ""
        });

        review.save(function (err, review) {
            if (err) return console.error(err);

        });

    });

    models.User.findOne({forename: /^Har/}, function (err, user) {
        if (err) return console.error(err);

        var review = new models.Review({
            username: user.username,
            resId: res._id,
            rating: "4",
            time: "15:24:31",
            date: "10/3/18",
            review: "Bit dusky for my tastes, could do with a bit of cleaning. DUST ON MY POTATOESSS :(",
            photos: ""
        });

        review.save(function (err, review) {
            if (err) return console.error(err);

        });

    });
});

models.Restaurant.findOne({name: /^Fre/}, function (err, res) {
    if (err) return console.error(err);
    models.User.findOne({forename: /^Vic/}, function (err, user) {
        if (err) return console.error(err);

        var review = new models.Review({
            username: user.username,
            resId: res._id,
            rating: "6",
            time: "16:45:12",
            date: "4/3/18",
            review: "Well seasoned loaves, good variety of fillings, but xtra cheese was a bit pricy",
            photos: ""
        });

        review.save(function (err, review) {
            if (err) return console.error(err);

        });

    });

    models.User.findOne({forename: /^Har/}, function (err, user) {
        if (err) return console.error(err);

        var review = new models.Review({
            username: user.username,
            resId: res._id,
            rating: "7",
            time: "12:35:12",
            date: "1/6/18",
            review: "restaurant is a FIRST class establishment. FIRST time i've been there, won't be my last. FIRST love of italian food",
            photos: ""
        });

        review.save(function (err, review) {
            if (err) return console.error(err);

        });

    });

    models.User.findOne({forename: /^Ada/}, function (err, user) {
        if (err) return console.error(err);

        var review = new models.Review({
            username: user.username,
            resId: res._id,
            rating: "7",
            time: "16:24:31",
            date: "5/3/18",
            review: "Delightful. Perfection in food.",
            photos: ""
        });

        review.save(function (err, review) {
            if (err) return console.error(err);

        });

    });
});