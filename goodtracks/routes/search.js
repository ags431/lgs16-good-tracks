//express
var express = require('express');
var search = express.Router();

//database
var mongoose = require('mongoose');
var sanitize = require('mongo-sanitize');

//schemas
Song = mongoose.model('Song');
Album = mongoose.model('Album');

//TODO: doing search of albums and songs separately because searching two collections is very inefficient, can easily change later
search.post("/search-songs", function(req, res) {
   var query = req.body.searchQuery;
   query = sanitize(query.trim());

   Song.find(
       { $text : { $search : query } },
       { score : { $meta: "textScore" } }
   )
       .sort({ score : { $meta : 'textScore' } })
       .exec(function(err, songs) {
           if(!err) {
               res.render('search', {isSong: true, songs: songs});
           } else {
               res.render('error', {message: "There was a problem searching for that song.", error: err});
           }
       });


});

search.post("/search-albums", function(req, res) {
   var query = req.body.searchQuery;
   query = sanitize(query.trim());

   Album.find({ $text : { $search : query } },
       { score : { $meta: "textScore" } }
   )
       .sort({ score : { $meta : 'textScore' } })
       .exec(function(err, albums) {
           if(!err) {
               res.render('search', {isSong: false, albums: albums});
           } else {
               res.render('error', {message: "There was a problem searching for that album.", error: err});
           }
       });

});

module.exports = search;