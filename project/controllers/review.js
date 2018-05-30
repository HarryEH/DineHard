const models = require('../models/models');
const dataUriToBuffer = require('data-uri-to-buffer');

module.exports = {
    /**
     *  This function handles creating a review
     * @param req the request
     * @param res the response
     */
    createReview: function(req, res) {
        models.User.findById({ _id: req.session.user_id }, function (err, user) {
            if (err) {return res.send(JSON.stringify({error: "Couldn't find User"}));}

            models.Restaurant.findById({ _id: req.query.rId }, function (err2, restaurant) {
                if (err2) {return res.send(JSON.stringify({error: "Couldn't find Restaurant"}));}

                handleCreateReview(req, res, user, restaurant);
            });

        });

    },

    /**
     * This function handles getting and returning the picture
     * @param req the request
     * @param res the response
     */
    getPicture: function (req, res){
        const revId = req.params.index;

        models.Review.findById(revId, function (err, results) {
            if (err) return res.send(err);
            res.contentType(results.photo.contentType);
            res.send(results.photo.data);
        });
    }
};

/**
 * This function uses the user and restaurant as well as the reqeust to create a new review and save it to the database
 *
 * @param req the request
 * @param res the response
 * @param user object
 * @param restaurant object
 */
function handleCreateReview(req, res, user, restaurant) {

    var uri = req.body.photo;
    if (uri != "") {
        var decoded = dataUriToBuffer(uri);
        var photoData = ({data: decoded, contentType: 'image/png'})
    }

    var review = new models.Review({
        username: user.username,
        resId: req.query.rId,
        rating: req.body.slider,
        date: Date.now(),
        photo: photoData,
        review: req.body.review
    });

    review.save();// this saves the review in the db

    updateRestaurant(req, restaurant);

    // const rRating = Math.round(((restaurant.rating + parseInt(req.body.slider)) /  (restaurant.noRating + 1) ) *100) / 100;
    const rRating = Math.round(((restaurant.rating + parseInt(req.body.slider)) /  (restaurant.noRating + 1) ) *100) / 100;

    res.send(JSON.stringify({rating: rRating, error: "", rId: restaurant._id }));

}

/**
 * This function updates the restaurant in the database based on the new review
 * @param req the request
 * @param restaurant object
 */
function updateRestaurant(req, restaurant){
    restaurant.rating = restaurant.rating + parseInt(req.body.slider);
    restaurant.noRating = restaurant.noRating + 1;
    restaurant.save();// updates the restaurant
}

