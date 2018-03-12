var express = require('express');
var router = express.Router();

var ResultsController = require('../controllers/resultscontroller');
var loginController = require('../controllers/logincontroller');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* GET home page. */
router.get('/', function(req, res, next) {
    var login = checkLogin(req, res, next);
    var forename = req.session.forename;
    res.render('index', { loggedIn: login, forename: forename });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/restaurant', function(req, res, next) {
    var login = checkLogin(req, res, next);
    var reviews = ["The food was delicious.", "I found the staff annoying and rude.", "I LVOE IT!!!1!!"];
    res.render('restaurant', { loggedIn: login, reviews: reviews });
});

router.get('/restaurant-*', function(req, res, next) {
    var login = checkLogin(req, res, next);
    var reviews = ["The food was delicious.", "I found the staff annoying and rude.", "I LVOE IT!!!1!!"];
    res.render('restaurant', { loggedIn: login, reviews: reviews });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/results', function(req, res, next) {
    var login = checkLogin(req, res, next);// pass this
    ResultsController.handleSearch(req,res, login);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/login', function(req, res, next) {
    var login = checkLogin(req, res, next);
    var forename = req.session.forename;
    res.render('login', { loggedIn: login, error: "" });
});

router.post('/login', function(req, res, next) {
    loginController.handleLogin(req, res, next);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/logout', function (req, res, next) {
    delete req.session.user_id;
    console.log(req.session.user_id);
    res.redirect('/');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/register', function(req, res, next) {
    var login = checkLogin(req, res, next);
    res.render('register', { loggedIn: login, error: ""});
});

router.post('/register', function(req, res, next) {
    var userData= req.body;
    res.writeHead(200, { "Content-Type": "application/json"});
    res.end(JSON.stringify(userData));
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/accessibility', function(req, res, next) {
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
    console.log(req.session.user_id);
    if(req.session.user_id === undefined){
        console.log("FALSE");
        return false;
    } else {
        console.log("TRUE");
        return true;
    }
}
