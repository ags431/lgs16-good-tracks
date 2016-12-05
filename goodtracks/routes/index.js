var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/playlist', function(req, res, next) {
  // TODO: Logic to construct and render playlist page
}

router.get('/wishlist', function(req, res, next) {
  // TODO: Logic to construct and render wishlist page
}

router.get('/listento', function(req, res, next) {
  // TODO: Logic to construct and render listento page
}

router.get('/song', function(req, res, next) {
  songid = req.query.id;
  // TODO: Logic to construct and render song page
}

router.get('/album', function(req, res, next) {
  albumid = req.query.id;
  // TODO: Logic to construct and render album page
}

module.exports = router;
