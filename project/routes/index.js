var express = require('express');
var dataUriToBuffer = require('data-uri-to-buffer');
var formidable = require('formidable');
var fs = require('fs');
var router = express.Router();

/**
 * All of the controllers that have been required.
 */
var resultsController = require('../controllers/results');
var loginController = require('../controllers/login');
var registerController = require('../controllers/register');
var profileController = require('../controllers/profile');
var restaurantController = require('../controllers/restaurants');
var passwordController = require('../controllers/password');
var reviewController = require('../controllers/review');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
router.get('/', function(req, res, next) {
    req.session.prevURL = req.url || '/';
    var login = checkLogin(req, res, next);
    var forename = req.session.forename;
    res.render('index', { loggedIn: login, forename: forename });
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

    var login = checkLogin(req, res, next);
    restaurantController.renderRestaurant(req,res,login);
});

/**
 *
 */
router.post('/restaurant-*', function(req, res, next) {
    if (checkLogin(req, res, next)) {
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
    resultsController.handleSearch(req,res, checkLogin(req, res, next));
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
    const login = checkLogin(req, res, next);

    if(login === true){
        res.redirect(req.session.prevURL);
    } else {
        res.render('login', {loggedIn: login, error: ""});
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
    const login = checkLogin(req, res, next);

    if(login === true){
        res.redirect(req.session.prevURL);
    } else {
        res.render('forgot-password', {loggedIn: login, error: ""});
    }

});

/**
 *
 */
router.post('/forgot-password', function(req, res, next) {
    const login = checkLogin(req, res, next);

    if(login === true){
        res.redirect(req.session.prevURL);
    } else {
        passwordController.sendEmail(req,res,login);
    }

});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
router.get('/change-password*', function(req, res, next) {
    res.render('change-password', {tokenId: req.query.tokenId, username: req.query.username, loggedIn: checkLogin(req, res, next), error: ""});
});

/**
 *
 */
router.post('/change-password', function(req, res, next) {
    passwordController.handleReset(req,res,checkLogin(req, res, next));
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
    const login = checkLogin(req, res, next);
    var values = {fname: "", sname: "", email: "", user: ""};
    res.render('register', { loggedIn: login, error:"", uerror: "", emerror: "", values: values});
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
    var login = checkLogin(req, res, next);
    //check the query
    if (login === false) {
        res.redirect('/login');
    } else {
        res.render('create-restaurant', {loggedIn: login, error: ""});
    }

});

/**
 *
 */
router.post('/create-restaurant', function(req, res, next) {
    var login = checkLogin(req, res, next);
    //check the query
    if (login === false) {
        res.redirect('/login');
    } else {
        //TODO put this somewhere else...
        var form = new formidable.IncomingForm();
        var filesList = [];
        form.on('file', function(field, file) {
            console.log(file.name);
            filesList.push([field, file]);
        });

        form.parse(req, function (err, fields, files) {
            console.error(filesList);
            console.error(fields.photoCaptureSource);
            if (testCreateRestaurantInput(fields)) {
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

                uri = fields.photoCaptureSource;
                if(uri != ""){
                    decoded = dataUriToBuffer(uri);
                    imgs.push({data: decoded, contentType: 'image/png'})
                }
                restaurantController.addRestaurant(req, res, login, fields, imgs);
            } else {
                res.render('create-restaurant', {loggedIn: login, error: "Fill all the required fields"});
            }
        });
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
router.get('/profile', function(req, res, next) {
    req.session.prevURL = req.url || '/';
    var login = checkLogin(req, res, next);
    if(login === false)
    {
        res.redirect('/login');
    } else {
        profileController.renderMyProfile(req, res, next, login);
    }
});

/**
 *
 */
router.get('/profile-*', function(req, res, next) {
    req.session.prevURL = req.url || '/';
    var login = checkLogin(req, res, next);
    profileController.renderProfile(req, res, next, login);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
router.get('/accessibility', function(req, res, next) {
    req.session.prevURL = req.url || '/';

    var login = checkLogin(req, res, next);
    res.render('accessibility', { loggedIn: login });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
router.get('/tandc', function(req, res, next) {
    var login = checkLogin(req, res, next);
    res.render('terms-conditions', { loggedIn: login });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;

function checkLogin(req, res, next){
    return undefCheck(req.session.user_id);
}

function testCreateRestaurantInput(fields){
    const doorNumber = fields.doorNumber;
    const postcode = fields.postcode;
    const phoneNo = fields.phoneNo;
    const name = fields.name;
    const description = fields.description;
    const tags = fields.tags;
    const websiteURL = fields.websiteURL;
    const price = fields.price;
    const cuisines = fields.cuisines;

    return undefCheck(doorNumber) && undefCheck(postcode) && undefCheck(name)
        && undefCheck(tags) && undefCheck(websiteURL)
        && undefCheck(phoneNo) && undefCheck(description);
}

function undefCheck(x){
    return typeof x != "undefined";
}

