const models = require('../models');

models.connect();


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