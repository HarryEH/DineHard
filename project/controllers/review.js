const models = require('../models/models');

module.exports = {
    createReview: function(req, res) {

        models.User.findById({ _id: req.session.user_id }, function (err, user) {
            if (err) {return res.send(JSON.stringify({error: "Couldn't find User"}));}

            models.Restaurant.findById({ _id: req.query.rId }, function (err2, restaurant) {
                if (err2) {return res.send(JSON.stringify({error: "Couldn't find Restaurant"}));}

                handleCreateReview(req, res, user, restaurant);
            });

        });

    },

    getPicture: function (req, res){
        const revId = req.params.reviewID;

        models.Review.findById(revId, function (err, results) {
            if (err) return next(err);
            res.contentType(results.photoURL.contentType);
            res.send(results.photoURL.data);
        });
    }
};

function handleCreateReview(req, res, user, restaurant) {

    var review = new models.Review({
        username: user.username,
        resId: req.query.rId,
        rating: req.body.slider,
        date: Date.now(),
        review: req.body.review,
        photos: ""
    });

    review.save();// this saves the review in the db

    updateRestaurant(req, restaurant);

    // const rRating = Math.round(((restaurant.rating + parseInt(req.body.slider)) /  (restaurant.noRating + 1) ) *100) / 100;
    const rRating = Math.round(((restaurant.rating + parseInt(req.body.slider)) /  (restaurant.noRating + 1) ) *100) / 100;

    res.send(JSON.stringify({rating: rRating, error: "", rId: restaurant._id }));

}

function updateRestaurant(req, restaurant){
    restaurant.rating = restaurant.rating + parseInt(req.body.slider);
    restaurant.noRating = restaurant.noRating + 1;
    restaurant.save();// updates the restaurant
}

