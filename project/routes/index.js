var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/restaurant', function(req, res, next) {
    res.render('restaurant', { title: 'Express' });
});

module.exports = router;
