var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { loggedIn: false });
});

router.get('/restaurant', function(req, res, next) {
    res.render('restaurant', { loggedIn: true });
});

router.get('/restaurant-*', function(req, res, next) {
    res.render('restaurant', { loggedIn: true });
});

router.get('/results', function(req, res, next) {
    var results = ["Restaurant 1", "Restaurant 2", "Restaurant 3"];
    res.render('results', { loggedIn: true, results: results  });
});

module.exports = router;
