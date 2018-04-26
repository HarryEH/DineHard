var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var router = express.Router();

var ResultsController = require('../controllers/resultscontroller');
var loginController = require('../controllers/logincontroller');
var registerController = require('../controllers/registercontroller');
var profileController = require('../controllers/profilecontroller');
var RestaurantController = require('../controllers/restaurantscontroller');
var PasswordController = require('../controllers/passwordcontroller');
var ReviewController = require('../controllers/review');

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

router.post('/restaurant-*', function(req, res, next) {
    console.log("hello world");
    if (checkLogin(req, res, next)) {
        ReviewController.createReview(req, res);
    } else {
        res.render('login', {loggedIn: false, error: ""});
    }

});

router.get('/restaurant/:restID/picture', function(req,res,next) {
    RestaurantController.getPicture(req, res);
});

router.get('/review/:reviewID/picture', function(req,res,next) {
    ReviewController.getPicture(req, res);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/results', function(req, res, next) {
    req.session.prevURL = req.url || '/';
    ResultsController.handleSearch(req,res, checkLogin(req, res, next));
});

router.post('/results', function(req, res, next) {
    ResultsController.ajaxSearch(req,res);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/login', function(req, res, next) {
    const login = checkLogin(req, res, next);

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
    const login = checkLogin(req, res, next);

    if(login === true){
        res.redirect(req.session.prevURL);
    } else {
        res.render('forgot-password', {loggedIn: login, error: ""});
    }

});

router.post('/forgot-password', function(req, res, next) {
    const login = checkLogin(req, res, next);

    if(login === true){
        res.redirect(req.session.prevURL);
    } else {
        PasswordController.sendEmail(req,res,login);
    }

});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/change-password*', function(req, res, next) {
    res.render('change-password', {tokenId: req.query.tokenId, username: req.query.username, loggedIn: checkLogin(req, res, next), error: ""});
});

router.post('/change-password', function(req, res, next) {
    PasswordController.handleReset(req,res,checkLogin(req, res, next));
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/logout', function (req, res, next) {
    delete req.session.user_id;
    res.redirect('/');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/register', function(req, res, next) {
    const login = checkLogin(req, res, next);
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
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if (testCreateRestaurantInput(fields)) {
                    console.error(fields.pNo);
                    if (files.photo != undefined) {
                        var img_path = files.photo.path;
                        RestaurantController.addRestaurant(req, res, login, fields, img_path);
                    }
                    else
                    {
                        console.error("IAMGE NOT LOAD");
                    }
            } else {
                res.render('create-restaurant', {loggedIn: login, error: "Fill all the required fields"});
            }
        });
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

    console.log("DNum " + undefCheck(doorNumber) + " - " + doorNumber);
    console.log("post " + undefCheck(postcode) + " - " + postcode);
    console.log("name " + undefCheck(name)+ " - " + name);
    console.log("tags " + undefCheck(tags)+ " - " + tags);
    console.log("WEb " + undefCheck(websiteURL)+ " - " + websiteURL);
    console.log("phone " + undefCheck(phoneNo)+ " - " + phoneNo);
    console.log("desc " + undefCheck(description));
    console.error(price + " - Price");
    console.error(cuisines + " - Cuisines")


    return undefCheck(doorNumber) && undefCheck(postcode) && undefCheck(name)
        && undefCheck(tags) && undefCheck(websiteURL)
        && undefCheck(phoneNo) && undefCheck(description);

}

function undefCheck(x){
    return typeof x != "undefined";
}
