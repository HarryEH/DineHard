const models = require('../models/models');
const geodata = require('./geodata');
const fs = require('fs');

module.exports = {
    renderRestaurant: function (req, res, login) {

        const rId = req.query.rId;

        if (typeof rId == "undefined") {
            res.render('error', {loggedIn: login, error: {status: "404"}});
        }

        loadRestaurant(req, res, login, rId);

    },

    addRestaurant: function (req, res, login, fields, imgs) {
        // verify that the restaurant's address isn't already in the db

        console.error("starting add restuarant");

        const no = fields.doorNumber;
        const postcode = fields.postcode;

        console.error(postcode);

        models.Restaurant.find({doorNumber: no, postcode: postcode}, function (err, results) {
            if (err) {
                return console.error(err);
            }

            if (results.length == 0) {
                const obj = {res: res, req: req, login: login, fields: fields, imgs: imgs};
                geodata.postcodeToLocation(postcode, addResCallback, obj);

                return;
            }
            // else render some error
        });

    },

    getPicture: function (req, res){
        const indexID = req.params.index;
        var rId = indexID.substring(0, indexID.lastIndexOf("-"));
        var pId = indexID.substring(indexID.lastIndexOf("-")+1);

        models.Restaurant.findById(rId, function (err, results) {
           if (err) console.error(err);
           res.contentType(results.photoURL[pId].contentType);
           res.send(results.photoURL[pId].data);
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
    const fields = obj.fields;
    const imgs = obj.imgs;

    console.error("Mongo Res Start");

    var restaurant = new models.Restaurant({
        name: fields.name,
        doorNumber: fields.doorNumber,
        postcode: fields.postcode,
        description: fields.description,
        phoneNo: fields.phoneNo,
        price: fields.price,
        lat: lat,
        lng: lng,
        photoURL: imgs,
        cuisines: fields.cuisines,
        tags: fields.tags + ", " + fields.name + ", " + fields.cuisines + ", " + fields.description,
        rating: 0,
        noRating: 0,
        websiteURL: fields.websiteURL
    });

    console.error("Add Res Done");

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

