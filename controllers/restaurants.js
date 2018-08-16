const models = require('../models/models');
const geodata = require('../utilities/geodata');
const fs = require('fs');

module.exports = {
    /**
     * This function renders the restaurant taking the values from the database.
     *
     * @param req the request object
     * @param res the response object
     * @param login boolean, is the user logged in
     */
    renderRestaurant: function (req, res, login) {

        const rId = req.query.rId;

        if (typeof rId == "undefined") {
            res.render('error', {loggedIn: login, error: {status: "404"}});
        }

        loadRestaurant(req, res, login, rId);

    },

    /**
     * This function handles creating a new restaurant and adding it to the database.
     * @param req the request
     * @param res the response
     * @param login boolean is the user logged in
     * @param fields the input fields
     * @param imgs the images
     */
    addRestaurant: function (req, res, login, fields, imgs) {
        // verify that the restaurant's address isn't already in the db

        console.log(fields);

        const no = fields.doorNumber;
        const postcode = fields.postcode;

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

    /**
     * This function handles getting the pictures for a restaurant.
     * @param req the request
     * @param res the response
     */
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

/**
 * This function loads the restaurant's information from the database
 * @param req the request
 * @param res the response
 * @param login boolean is the user logged in
 * @param rId the restaurants database id
 */
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

/**
 * This function is the callback for adding a restaurant to the database
 * @param obj this contains all the required parameters
 */
function addResCallback(obj) {

    const req = obj.req;
    const res = obj.res;
    const login = obj.login;
    const lat = obj.lat;
    const lng = obj.lng;
    const fields = obj.fields;
    const imgs = obj.imgs;

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

    restaurant.save(function (err, restaurant) {
        if (err) return console.error(err);
        res.redirect(restaurant.generateURL());
    });

}

/**
 * This is the callback for rendering the restaurant
 * @param obj contains all the required parameters
 */
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

