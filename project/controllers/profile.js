const models = require('../models/models');

module.exports = {

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

    renderMyProfile: function (req, res, next, login) {

        const uID = req.session.user_id;

        if (typeof uID == "undefined") {
            res.render('error', {loggedIn: login, error: {status: "404"}});
        }

        loadProfile(req, res, next, login, uID, "My Profile", true);

    }
};

function loadProfile(req, res, next, login, uID, title, myProfile){

    models.User.findById(uID, function (err, results) {
        if (err) {
            res.render('error', {loggedIn: login, error: {status: "404"}});
            console.error(err);
            return;
        }

        //console.log(results);

        models.Review.find({username: results.username}, function(err2, reviewResults) {
            if (err2) { return console.error(err2);}

            //console.log(reviewResults);

            var reviewCount = reviewResults.length;

            if(reviewCount == 0)
            {
                res.render('profile', { user: results, loggedIn: login, reviews: reviewResults, reviewCount: reviewCount, title: title, myProfile: myProfile });
                return;
            }

            var reviewIndex = 0;
            reviewResults.forEach(function(review)
            {
                models.Restaurant.findById(review.resId, function(err3,restaurant){
                    if (err3) { return console.error(err3);}
                    reviewIndex++;

                    review.resName = restaurant.name;
                    review.resURL = "restaurant-" + review.resName.replace(/\s/g, '-') + "?rId="+ review.resId;

                    if(reviewIndex == reviewCount){
                        res.render('profile', { user: results, loggedIn: login, reviews: reviewResults, reviewCount: reviewCount, title: title, myProfile: myProfile });
                        return;
                    }
                });
            });
        });

    });
}