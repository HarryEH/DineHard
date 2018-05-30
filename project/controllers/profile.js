const models = require('../models/models');

module.exports = {

    /**
     * This function renders a user profile from the database
     * @param req the request
     * @param res the response
     * @param login boolean, is the user logged in
     */
    renderProfile: function (req, res, next, login) {

        const username = req.query.username;

        models.User.findOne({username: username}, function (err, user) {
            if (err) {
                res.render('error', {loggedIn: login, error: {status: "404"}});
                console.error(err);
                return;
            }

            if (user === null) {
                res.render('error', {loggedIn: login, error: {status: "404"}});
            } else {
                const uID = user._id;
                const myID = req.session.user_id;
                if (myID == uID) {
                    res.redirect('/profile');
                } else {
                    var title = username + "'s Profile";
                    loadProfile(req, res, next, login, uID, title, false);
                }
            }
        });

    },

    /**
     * This function renders one owns profile, rather than someoneelse's.
     * @param req the request
     * @param res the response
     * @param login boolean, is the user logged in
     */
    renderMyProfile: function (req, res, next, login) {

        const uID = req.session.user_id;

        if (typeof uID == "undefined") {
            res.render('error', {loggedIn: login, error: {status: "404"}});
        }

        loadProfile(req, res, next, login, uID, "My Profile", true);

    },

    /**
     * This function handles deleting a review from the database.
     * @param req the request
     * @param res the response
     */
    deleteReview: function (req, res) {
        models.Review.remove({_id: req.body.id}, function (err) {
            if (err) return handleError(err);
            res.send(JSON.stringify({ }));
        });
    }
};

/**
 * This function loads the details of the profile from the database, and gets the reviews associated to that account
 *
 * @param req the request
 * @param res the response
 * @param login boolean, is the user logged in
 * @param uID the user id
 * @param title
 * @param myProfile boolean, is it your own profile
 */
function loadProfile(req, res, next, login, uID, title, myProfile) {

    models.User.findById(uID, function (err, results) {
        if (err) {
            res.render('error', {loggedIn: login, error: {status: "404"}});
            console.error(err);
            return;
        }

        models.Review.find({username: results.username}, function (err2, reviewResults) {
            if (err2) {
                return console.error(err2);
            }

            var reviewCount = reviewResults.length;

            if (reviewCount == 0) {
                res.render('profile', {
                    user: results,
                    loggedIn: login,
                    reviews: reviewResults,
                    reviewCount: reviewCount,
                    title: title,
                    myProfile: myProfile
                });
                return;
            }

            var reviewIndex = 0;
            reviewResults.forEach(function (review) {
                models.Restaurant.findById(review.resId, function (err3, restaurant) {
                    if (err3) {
                        return console.error(err3);
                    }
                    reviewIndex++;

                    review.resName = restaurant.name;
                    review.resURL = "restaurant-" + review.resName.replace(/\s/g, '-') + "?rId=" + review.resId;

                    if (reviewIndex == reviewCount) {
                        res.render('profile', {
                            user: results,
                            loggedIn: login,
                            reviews: reviewResults,
                            reviewCount: reviewCount,
                            title: title,
                            myProfile: myProfile
                        });
                        return;
                    }
                });
            });
        });
    });


}