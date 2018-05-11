const express = require('express');
const dataUriToBuffer = require('data-uri-to-buffer');
const formidable = require('formidable');
const fs = require('fs');
const router = express.Router();
const validation = require('../utilities/validation');

/**
 * All of the controllers that have been required.
 */
const resultsController = require('../controllers/results');
const loginController = require('../controllers/login');
const registerController = require('../controllers/register');
const profileController = require('../controllers/profile');
const restaurantController = require('../controllers/restaurants');
const passwordController = require('../controllers/password');
const reviewController = require('../controllers/review');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
router.get('/', function(req, res, next) {
    req.session.prevURL = req.url || '/';
    res.render('index', { loggedIn: validation.checkLogin(req, res, next), forename: req.session.forename });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
router.get('/restaurant', function(req, res, next) {
    res.redirect(req.session.prevURL);
});

/**
 *
 */
router.get('/restaurant-*', function(req, res, next) {
    req.session.prevURL = req.url || '/';
    restaurantController.renderRestaurant(req,res,validation.checkLogin(req, res, next));
});

/**
 *
 */
router.post('/restaurant-*', function(req, res, next) {
    console.log("Get fucked nerd! Restaurant post");
    if (validation.checkLogin(req, res, next)) {
        reviewController.createReview(req, res);
    }
});

/**
 *
 */
router.get('/restaurant/:index/picture', function(req,res,next) {
    restaurantController.getPicture(req, res);
});

/**
 *
 */
router.get('/review/:index/picture', function(req,res,next) {
    reviewController.getPicture(req, res);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
router.get('/results', function(req, res, next) {
    req.session.prevURL = req.url || '/';
    resultsController.handleSearch(req,res, validation.checkLogin(req, res, next));
});

/**
 *
 */
router.post('/results', function(req, res, next) {
    resultsController.ajaxSearch(req,res);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
router.get('/login', function(req, res, next) {
    if(validation.checkLogin(req, res, next)){
        res.redirect(req.session.prevURL);
    } else {
        res.render('login', {loggedIn: validation.checkLogin(req, res, next), error: ""});
    }
});

/**
 *
 */
router.post('/login', function(req, res, next) {
    loginController.handleLogin(req, res, next);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
router.get('/forgot-password', function(req, res, next) {

    if(validation.checkLogin(req, res, next)){
        res.redirect(req.session.prevURL);
    } else {
        res.render('forgot-password', {loggedIn: false, error: ""});
    }

});

/**
 *
 */
router.post('/forgot-password', function(req, res, next) {

    if(validation.checkLogin(req, res, next)){
        res.redirect(req.session.prevURL);
    } else {
        passwordController.sendEmail(req,res,false);
    }

});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
router.get('/change-password*', function(req, res, next) {
    res.render('change-password', {tokenId: req.query.tokenId, username: req.query.username,
        loggedIn: validation.checkLogin(req, res, next), error: ""});
});

/**
 *
 */
router.post('/change-password', function(req, res, next) {
    passwordController.handleReset(req,res, validation.checkLogin(req, res, next));
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
router.get('/logout', function (req, res, next) {
    delete req.session.user_id;
    res.redirect('/');
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
router.get('/register', function(req, res, next) {
    var values = {fname: "", sname: "", email: "", user: ""};
    res.render('register', { loggedIn: validation.checkLogin(req, res, next), error:"", uerror: "", emerror: "", values: values});
});

/**
 *
 */
router.post('/register', function(req, res, next) {
    registerController.handleRegister(req, res, next);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
router.get('/create-restaurant', function(req, res, next) {
    if (validation.checkLogin(req, res, next)) {
        res.render('create-restaurant', {loggedIn: true, error: ""});
    } else {
        res.redirect('/login');
    }
});

/**
 *
 */
router.post('/create-restaurant', function(req, res, next) {
    var login = validation.checkLogin(req, res, next);
    //check the query
    if (login) {
        //TODO put this somewhere else... messy messy
        var form = new formidable.IncomingForm();
        var filesList = [];
        form.on('file', function(field, file) {
            console.log(file.name);
            filesList.push([field, file]);
        });

        form.parse(req, function (err, fields, files) {
            console.error(filesList);
            console.error(fields.photoCaptureSource);
            if (validation.testCreateRestaurantInput(fields)) {
                var imgs = [];
                for (var i = 0; i < filesList.length; i++) {
                    if (filesList[i][1] != undefined) {
                        if(filesList[i][1].size != 0) {
                            var img_path = filesList[i][1].path;
                            console.error(img_path);
                            imgs.push({data: fs.readFileSync(img_path), contentType: 'image/png'});
                        }
                    }
                }

                var uri = fields.photoCaptureSource;
                if (uri != "") {
                    var decoded = dataUriToBuffer(uri);
                    imgs.push({data: decoded, contentType: 'image/png'})
                }
                restaurantController.addRestaurant(req, res, login, fields, imgs);
            } else {
                res.render('create-restaurant', {loggedIn: login, error: "Fill all the required fields"});
            }
        });
    } else {
        res.redirect('/login');
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
router.get('/profile', function(req, res, next) {
    req.session.prevURL = req.url || '/';
    if (validation.checkLogin(req, res, next)) {
        profileController.renderMyProfile(req, res, next, true);
    } else {
        res.redirect('/login');
    }
});

/**
 *
 */
router.get('/view-profile', function(req, res, next) {
    req.session.prevURL = req.url || '/';
    profileController.renderProfile(req, res, next, validation.checkLogin(req, res, next));
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
router.get('/accessibility', function(req, res, next) {
    req.session.prevURL = req.url || '/';
    res.render('accessibility', { loggedIn: validation.checkLogin(req, res, next) });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
router.get('/tandc', function(req, res, next) {
    res.render('terms-conditions', { loggedIn: validation.checkLogin(req, res, next) });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * The module export for this file.
 */
module.exports = router;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

