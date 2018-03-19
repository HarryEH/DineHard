var express = require('express');
var router = express.Router();

var ResultsController = require('../controllers/resultscontroller');
var loginController = require('../controllers/logincontroller');
var registerController = require('../controllers/registercontroller');
var profileController = require('../controllers/profilecontroller');
var RestaurantController = require('../controllers/restaurantscontroller');
var PasswordController = require('../controllers/passwordcontroller');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* GET home page. */
router.get('/', function(req, res, next) {
    req.session.prevURL = req.url;

    var login = checkLogin(req, res, next);
    var forename = req.session.forename;
    res.render('index', { loggedIn: login, forename: forename });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/restaurant', function(req, res, next) {
    res.redirect(req.session.prevURL);
});

router.get('/restaurant-*', function(req, res, next) {
    req.session.prevURL = req.url;

    var login = checkLogin(req, res, next);
    RestaurantController.renderRestaurant(req,res,login);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/results', function(req, res, next) {
    req.session.prevURL = req.url;

    var login = checkLogin(req, res, next);// pass this
    ResultsController.handleSearch(req,res, login);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/login', function(req, res, next) {
    var login = checkLogin(req, res, next);

    if(login === true){
        res.redirect(req.session.prevURL);
    } else {
        res.render('login', {loggedIn: login, error: ""});
    }
});

router.post('/login', function(req, res, next) {
    loginController.handleLogin(req, res, next);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/forgot-password', function(req, res, next) {
    var login = checkLogin(req, res, next);

    if(login === true){
        res.redirect(req.session.prevURL);
    } else {
        res.render('forgot-password', {loggedIn: login, error: ""});
    }

});

router.post('/forgot-password', function(req, res, next) {
    var login = checkLogin(req, res, next);

    if(login === true){
        res.redirect(req.session.prevURL);
    } else {
        PasswordController.sendEmail(req,res,login);
    }

});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/change-password*', function(req, res, next) {
    var login = checkLogin(req, res, next);

    const usr = req.query.username;
    const id = req.query.tokenId;

    res.render('change-password', {tokenId: id, username: usr, loggedIn: login, error: ""});

});

router.post('/change-password', function(req, res, next) {
    var login = checkLogin(req, res, next);

    const id  = req.body.tokenId;
    console.log(id);
    const usr = req.body.username;
    console.log(usr);
    const pss = req.body.password;
    console.log(pss);
    PasswordController.handleReset(req,res,login);

});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/logout', function (req, res, next) {
    delete req.session.user_id;
    res.redirect(req.session.prevURL);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/register', function(req, res, next) {
    var login = checkLogin(req, res, next);
    res.render('register', { loggedIn: login, error:"", uerror: "", emerror: ""});
});

router.post('/register', function(req, res, next) {
    registerController.handleRegister(req, res, next);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/create-restaurant', function(req, res, next) {
    var login = checkLogin(req, res, next);
    //check the query

    if(testCreateRestaurantInput(req)){
        RestaurantController.addRestaurant(req,res,login);
    } else {
        res.render('create-restaurant', { loggedIn: login, error: "Fill all the required fields"});
    }

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/profile', function(req, res, next) {
    req.session.prevURL = req.url;
    var login = checkLogin(req, res, next);
    if(login === false)
    {
        res.redirect('/login');
    } else {
        profileController.renderMyProfile(req, res, next, login);
    }
});

router.get('/profile-*', function(req, res, next) {
    req.session.prevURL = req.url;
    var login = checkLogin(req, res, next);
    profileController.renderProfile(req, res, next, login);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/accessibility', function(req, res, next) {
    req.session.prevURL = req.url;

    var login = checkLogin(req, res, next);
    res.render('accessibility', { loggedIn: login });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/tandc', function(req, res, next) {
    var login = checkLogin(req, res, next);
    res.render('terms-conditions', { loggedIn: login });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;

function checkAuth(req, res, next) {
    if (!req.session.user_id) {
        res.send('You are not authorized to view this page');
    } else {
        next();
    }
}

function checkLogin(req, res, next){
    if(req.session.user_id === undefined){
        return false;
    } else {
        return true;
    }
}

function testCreateRestaurantInput(req){
    const doorNumber = req.query.doorNumber;
    const postcode = req.query.postcode;
    const phoneNo = req.query.phoneNo;
    const name = req.query.doorNumber;
    const description = req.query.description;
    const photoURL = req.query.photo;
    const tags = req.query.tags;
    const websiteURL = req.query.doorNumber;

    return undefCheck(doorNumber) && undefCheck(postcode) && undefCheck(name)
        && undefCheck(photoURL) && undefCheck(tags) && undefCheck(websiteURL)
        && undefCheck(phoneNo) && undefCheck(description);

}

function undefCheck(x){
    return typeof x != "undefined";
}
