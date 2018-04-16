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
    req.session.prevURL = req.url || '/';

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
    req.session.prevURL = req.url || '/';

    var login = checkLogin(req, res, next);
    RestaurantController.renderRestaurant(req,res,login);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/results', function(req, res, next) {
    req.session.prevURL = req.url || '/';

    var login = checkLogin(req, res, next);// pass this

    ResultsController.handleSearch(req,res, login);
});

router.post('/results', function(req, res, next) {

    console.log("////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////");
    console.log(req.url);
    console.log(req.query.q);
    console.log(req.query.lat);
    console.log(req.query.lng);
    console.log(req.body.newKeywords);
    console.log(req.body.newPostcode);
    console.log("////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////");

    // get previous results!
    // then filter them based on the new query!

    res.send(JSON.stringify({one: "fuck", two: "me", three: "daddy"}));
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
    res.render('change-password', {tokenId: req.query.tokenId, username: req.query.username, loggedIn: login, error: ""});
});

router.post('/change-password', function(req, res, next) {
    var login = checkLogin(req, res, next);
    PasswordController.handleReset(req,res,login);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/logout', function (req, res, next) {
    delete req.session.user_id;
    res.redirect('/');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/register', function(req, res, next) {
    var login = checkLogin(req, res, next);
    var values = {fname: "", sname: "", email: "", user: ""};
    res.render('register', { loggedIn: login, error:"", uerror: "", emerror: "", values: values});
});

router.post('/register', function(req, res, next) {
    registerController.handleRegister(req, res, next);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/create-restaurant', function(req, res, next) {
    var login = checkLogin(req, res, next);
    //check the query
    if (login === false) {
        res.redirect('/login');
    } else {
        res.render('create-restaurant', {loggedIn: login, error: ""});
    }

});

router.post('/create-restaurant', function(req, res, next) {
    var login = checkLogin(req, res, next);
    //check the query
    if (login === false) {
        res.redirect('/login');
    } else {
        if (testCreateRestaurantInput(req)) {
            RestaurantController.addRestaurant(req, res, login);
        } else {
            res.render('create-restaurant', {loggedIn: login, error: "Fill all the required fields"});
        }
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

router.get('/profile-*', function(req, res, next) {
    req.session.prevURL = req.url || '/';
    var login = checkLogin(req, res, next);
    profileController.renderProfile(req, res, next, login);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/accessibility', function(req, res, next) {
    req.session.prevURL = req.url || '/';

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

function checkLogin(req, res, next){
    if(req.session.user_id === undefined){
        return false;
    } else {
        return true;
    }
}

function testCreateRestaurantInput(req){
    const doorNumber = req.body.doorNumber;
    const postcode = req.body.postcode;
    const phoneNo = req.body.phoneNo;
    const name = req.body.doorNumber;
    const description = req.body.description;
    const photoURL = req.body.photo;
    const tags = req.body.tags;
    const websiteURL = req.body.doorNumber;

    return undefCheck(doorNumber) && undefCheck(postcode) && undefCheck(name)
        && undefCheck(photoURL) && undefCheck(tags) && undefCheck(websiteURL)
        && undefCheck(phoneNo) && undefCheck(description);

}

function undefCheck(x){
    return typeof x != "undefined";
}
