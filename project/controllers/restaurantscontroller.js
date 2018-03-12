const models = require('../models/models');

module.exports = {
    renderRestaurant: function(req, res, login){

        models.connect();

        const rId = req.query.rId;

        if (typeof rId == "undefined") {
            res.render('error', {loggedIn: login, error: {status: "404"}});
        }

        loadRestaurant(res, login, rId);

    }
};

function loadRestaurant(res, login, rId){

    models.Restaurant.findById(rId, function (err, results) {
        if (err) {
            res.render('error', {loggedIn: login, error: {status: "404"}});
            console.error(err);
            return;
        }

        console.log(results);

        models.Review.find({resId: rId}, function(err2, reviewResults) {
            if (err) { return console.error(err2);}

            console.log(reviewResults);
            res.render('restaurant', { restaurant: results, loggedIn: login, reviews: reviewResults });
            return;
        });

    });
}

