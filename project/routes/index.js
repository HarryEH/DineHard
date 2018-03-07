var express = require('express');
var router = express.Router();

var ResultsController = require('./ResultsController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { loggedIn: false });
});



router.get('/restaurant', function(req, res, next) {
    var reviews = ["The food was delicious.", "I found the staff annoying and rude.", "I LVOE IT!!!1!!"];
    res.render('restaurant', { loggedIn: true, reviews: reviews });
});

router.get('/restaurant-*', function(req, res, next) {
    var reviews = ["The food was delicious.", "I found the staff annoying and rude.", "I LVOE IT!!!1!!"];
    res.render('restaurant', { loggedIn: true, reviews: reviews });
});

router.get('/results', function(req, res, next) {
    ResultsController.handleSearch(req,res);
});

router.get('/login', function(req, res, next) {
    res.render('login', { loggedIn: false });
});

router.post('/login', function(req, res, next) {
    var userData= req.body;
    res.writeHead(200, { "Content-Type": "application/json"});
    res.end(JSON.stringify(userData));
});

router.get('/register', function(req, res, next) {
    res.render('register', { loggedIn: false});
});

router.post('/register', function(req, res, next) {
    var userData= req.body;
    res.writeHead(200, { "Content-Type": "application/json"});
    res.end(JSON.stringify(userData));
});


module.exports = router;
