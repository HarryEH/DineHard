var express = require('express');
var router = express.Router();

var ResultsController = require('./ResultsController');

/* GET home page. */
router.get('/', function(req, res, next) {
    var login = checkLogin();
    res.render('index', { loggedIn: login });
});


router.get('/restaurant', function(req, res, next) {
    var login = checkLogin();
    var reviews = ["The food was delicious.", "I found the staff annoying and rude.", "I LVOE IT!!!1!!"];
    res.render('restaurant', { loggedIn: login, reviews: reviews });
});

router.get('/restaurant-*', function(req, res, next) {
    var login = checkLogin();
    var reviews = ["The food was delicious.", "I found the staff annoying and rude.", "I LVOE IT!!!1!!"];
    res.render('restaurant', { loggedIn: login, reviews: reviews });
});

router.get('/results', function(req, res, next) {
    var login = checkLogin();// pass this
    ResultsController.handleSearch(req,res, login);
});

router.get('/login', function(req, res, next) {
    var login = checkLogin();
    res.render('login', { loggedIn: login });
});

router.post('/login', function(req, res, next) {
    var userData= req.body;
    res.writeHead(200, { "Content-Type": "application/json"});
    res.end(JSON.stringify(userData));
});

router.get('/register', function(req, res, next) {
    var login = checkLogin();
    res.render('register', { loggedIn: login});
});

router.post('/register', function(req, res, next) {
    var userData= req.body;
    res.writeHead(200, { "Content-Type": "application/json"});
    res.end(JSON.stringify(userData));
});

module.exports = router;

function checkLogin(){
    return false;
}
