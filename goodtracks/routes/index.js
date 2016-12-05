var express = require('express');
var index = express.Router();

/* GET home page. */
index.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

index.get('/add', function(req, res) {
  res.render('add');
});

index.post('/add', function(req, res) {

});

module.exports = index;
