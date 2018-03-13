const models = require('../models/models');
const geodata = require('./geodata');

module.exports = {

    renderRestaurant: function(req, res, login){

        models.connect();

        const rId = req.query.rId;

        if (typeof rId == "undefined") {
            res.render('error', {loggedIn: login, error: {status: "404"}});
        }

        loadRestaurant(res, login, rId);

    },

    addRestaurant: function(req, res, login) {
        models.connect();
        // verify that the restaurant's address isn't already in the db

        const no = res.query.doorNumber;
        const postcode = res.query.postcode;

        models.Restaurant.find({doorNumber: no, postcode: postcode}, function(err, results){
            if (err) {return console.error(err);}

            if (results.length != 0){
                // render some error
            }

            geodata.postcodeToLocation(postcode, addResCallback, res, login, []);

        })

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

function addResCallback(res, login, lat, lng, z){
    // add the restaurant to the db
    models.connect();

    var restaurant = new models.Restaurant({
        name: res.query.name,
        doorNumber: res.query.name,
        postcode: res.query.name,
        lat: lat,
        lng: lng,
        photoURL: "",
        tags: res.query.tags,
        rating: 0,
        websiteURL: res.query.websiteURL
    });

    restaurant.save(function (err, restaurant) {
        if (err) return console.error(err);
        res.redirect(restaurant.generateURL());
    });

}

