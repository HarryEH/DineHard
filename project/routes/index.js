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

module.exports = router;
