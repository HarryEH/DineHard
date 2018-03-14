const models = require('../models/models');
const geodata = require('./geodata');

module.exports = {

    renderRestaurant: function(req, res, login){

        models.connect();

        const rId = req.query.rId;

        if (typeof rId == "undefined") {
            res.render('error', {loggedIn: login, error: {status: "404"}});
        }

        loadRestaurant(req, res, login, rId);

    },

    addRestaurant: function(req, res, login) {
        models.connect();
        // verify that the restaurant's address isn't already in the db

        const no = req.query.doorNumber;
        const postcode = req.query.postcode;

        models.Restaurant.find({doorNumber: no, postcode: postcode}, function(err, results){
            if (err) {return console.error(err);}

            if (results.length == 0){
                geodata.postcodeToLocation(postcode, addResCallback, res, req, login, []);
                return;
            }

            // else render some error

        })

    }

};

function loadRestaurant(req, res, login, rId){

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

            var reviewCount = 0;
            reviewResults.forEach(function(review)
            {
               reviewCount += 1;
            });

            var userLat = req.session.user_lat;
            var userLng = req.session.user_lng;

            results.address = geodata.locationToAddress(results.lat,results.lng);
            results.distance = results.getDistance(userLat, userLng);

            res.render('restaurant', { restaurant: results, loggedIn: login, reviews: reviewResults, reviewCount: reviewCount });
            return;
        });

    });
}

function addResCallback(req, res, login, lat, lng, z){
    // add the restaurant to the db
    models.connect();

    var restaurant = new models.Restaurant({
        name: req.query.name,
        doorNumber: req.query.doorNumber,
        postcode: req.query.postcode,
        description: req.query.description,
        phoneNo: req.query.phoneNo,
        lat: lat,
        lng: lng,
        photoURL: "",
        tags: req.query.tags,
        rating: 0,
        websiteURL: req.query.websiteURL
    });

    restaurant.save(function (err, restaurant) {
        if (err) return console.error(err);
        res.redirect(restaurant.generateURL());
    });

}

