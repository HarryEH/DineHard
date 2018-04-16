const models = require('../models/models');
const geodata = require('./geodata');

module.exports = {

    renderRestaurant: function (req, res, login) {

        const rId = req.query.rId;

        if (typeof rId == "undefined") {
            res.render('error', {loggedIn: login, error: {status: "404"}});
        }

        loadRestaurant(req, res, login, rId);

    },

    addRestaurant: function (req, res, login) {
        // verify that the restaurant's address isn't already in the db

        const no = req.body.doorNumber;
        const postcode = req.body.postcode;

        models.Restaurant.find({doorNumber: no, postcode: postcode}, function (err, results) {
            if (err) {
                return console.error(err);
            }

            if (results.length == 0) {
                const obj = {res: res, req: req, login: login};
                geodata.postcodeToLocation(postcode, addResCallback, obj);

                return;
            }
            // else render some error
        });

    }

};

function loadRestaurant(req, res, login, rId) {

    models.Restaurant.findById(rId, function (err, results) {
        if (err) {
            res.render('error', {loggedIn: login, error: {status: "404"}});
            console.error(err);
            return;
        }

        if (results !== null) {

            models.Review.find({resId: rId}, function (err2, reviewResults) {
                if (err) {
                    return console.error(err2);
                }

                var userLat = req.session.user_lat;
                var userLng = req.session.user_lng;

                results.distance = results.getDistance(userLat, userLng);

                var obj = {};
                obj.req = req;
                obj.res = res;
                obj.login = login;
                obj.results = results;
                obj.reviewResults = reviewResults;

                geodata.getFullAddress(renderResCallback, obj);
                return;
            });

        }

    });
}

function getReviews(req, res, login, results, rId) {
    models.Review.find({resId: rId}, function (err2, reviewResults) {
        if (err) {
            return console.error(err2);
        }

        var userLat = req.session.user_lat;
        var userLng = req.session.user_lng;

        results.distance = results.getDistance(userLat, userLng);

        var obj = {};
        obj.req = req;
        obj.res = res;
        obj.login = login;
        obj.results = results;
        obj.reviewResults = reviewResults;


        geodata.getFullAddress(renderResCallback, obj);
        return;
    });
}

function addResCallback(obj) {
    // add the restaurant to the db
    models.connect();

    const req = obj.req;
    const res = obj.res;
    const login = obj.login;
    const lat = obj.lat;
    const lng = obj.lng;

    var restaurant = new models.Restaurant({
        name: req.body.name,
        doorNumber: req.body.doorNumber,
        postcode: req.body.postcode,
        description: req.body.description,
        phoneNo: req.body.phoneNo,
        price: req.body.price,
        lat: lat,
        lng: lng,
        photoURL: "",
        cuisines: req.body.cuisines,
        tags: req.body.tags + ", " + req.body.name + ", " + req.body.cuisines + ", " + req.body.description,
        rating: 0,
        websiteURL: req.body.websiteURL
    });

    restaurant.save(function (err, restaurant) {
        if (err) return console.error(err);
        res.redirect(restaurant.generateURL());
    });

}

function renderResCallback(obj) {

    const req = obj.req;
    const res = obj.res;
    const results = obj.results;
    const reviews = obj.reviewResults;
    const login = obj.login;

    var reviewCount = reviews.length;
    res.render('restaurant', {restaurant: results, loggedIn: login, reviews: reviews, reviewCount: reviewCount});
    return;
}

