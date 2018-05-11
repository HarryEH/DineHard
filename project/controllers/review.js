const models = require('../models/models');
const dataUriToBuffer = require('data-uri-to-buffer');

module.exports = {
    createReview: function(req, res) {

        console.error(req.session.user_id);
        models.User.findById({ _id: req.session.user_id }, function (err, user) {
            if (err) {return res.send(JSON.stringify({error: "Couldn't find User"}));}

            models.Restaurant.findById({ _id: req.query.rId }, function (err2, restaurant) {
                if (err2) {return res.send(JSON.stringify({error: "Couldn't find Restaurant"}));}

                handleCreateReview(req, res, user, restaurant);
            });

        });

    },

    getPicture: function (req, res){
        const revId = req.params.index;

        models.Review.findById(revId, function (err, results) {
            if (err) return err;
            res.contentType(results.photo.contentType);
            res.send(results.photo.data);
        });
    }
};

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

function updateRestaurant(req, restaurant){
    console.log(restaurant.rating);
    console.log(restaurant.noRating);
    restaurant.rating = restaurant.rating + parseInt(req.body.slider);
    restaurant.noRating = restaurant.noRating + 1;
    console.log(restaurant.rating);
    console.log(restaurant.noRating);
    restaurant.save();// updates the restaurant
}

