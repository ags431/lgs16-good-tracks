var express = require('express');
var index = express.Router(),
    passport = require('passport'),
    mongoose = require('mongoose');

var User = mongoose.model('User');
var Album = mongoose.model('Album');

var Discogs = require('disconnect').Client;

// Authenticate by consumer key and secret
var db = new Discogs({
    consumerKey: 'oxxFkQqpQDeNLVRHqLEH',
    consumerSecret: 'YKKKGSCbEiCGlpoyOMIYItzcnCzVLqGT'
}).database();




/* GET home page. */
index.get('/', function(req, res, next) {
    if(req.user) {
        res.render('index', {title: 'Welcome to GoodTracks'});
    } else {
        res.redirect('/login');
    }
});

index.get('/add', function(req, res) {
    if(req.user) {
        res.render('add');
    } else {
        res.redirect('/login');
    }

});

index.post('/add', function(req, res) {
        db.getRelease(req.body.discogsID, function(err, data) {
            console.log(data);
            var title = data.title;
            var tracks = [];
            data.tracklist.forEach(function(el){
               tracks.push(el.title);
            });

            var discogsID = data.id;
            var artists = [];
            data.artists.forEach(function(el) {
                artists.push(el.name);
            });
            var thumbnail = data.thumb;
            var genres = data.genres;
            var released = data.released;

            var album = new Album({
                title: title,
                discogsId: discogsID,
                artists: artists,
                thumbnail: thumbnail,
                songs: tracks,
                releaseDate: released,
                genres: genres
            });

            album.save(function(err, savedAlbum) {
                console.log(savedAlbum);
                if(req.body.playlist) {
                    req.user.playlist.push(savedAlbum._id);

                }
                if(req.body.wishlist) {
                    req.user.wishlist.push(savedAlbum._id);
                }
                if(req.body.listeningTo) {
                    req.user.listeningTo.push(savedAlbum._id);
                }

                req.user.save(function(err, savedUser, count) {
                    console.log(savedUser);
                    res.redirect('/');
                });
            });


        });
});

/* Login Logic */
index.get('/login', function(req, res) {
    res.render('login');
});

index.post('/login', function(req,res,next) {
    // NOTE: use the custom version of authenticate so that we can
    // react to the authentication result... and so that we can
    // propagate an error back to the frontend without using flash
    // messages
    passport.authenticate('local', function(err,user) {
        if(user) {
            // NOTE: using this version of authenticate requires us to
            // call login manually
            req.logIn(user, function(err) {
                res.redirect('/');
            });
        } else {
            res.render('login', {message:'Your login or password is incorrect.'});
        }
    })(req, res, next);
    // NOTE: notice that this form of authenticate returns a function that
    // we call immediately! See custom callback section of docs:
    // http://passportjs.org/guide/authenticate/
});

/*REGISTRATION LOGIC*/

index.get('/register', function(req, res) {
    res.render('register');
});

index.post('/register', function(req, res) {
    User.register(new User({username:req.body.username, firstName:req.body.firstName, lastName: req.body.lastName}),
        req.body.password, function(err, user){
            if (err) {
                // NOTE: error? send message back to registration...
                res.render('register',{message:'Your registration information is not valid.'});
            } else {
                // NOTE: once you've registered, you should be logged in automatically
                // ...so call authenticate if there's no error
                passport.authenticate('local')(req, res, function() {
                    res.redirect('/');
                });
            }
        });
});

var sanitize = require('mongo-sanitize')
index.get("/search", function(req, res){

});

index.post("/search", function(req, res) {
    var query = req.body.searchQuery;
    query = sanitize(query.trim());

    Album.find({ $text : { $search : query } },
        { score : { $meta: "textScore" } }
    )
        .sort({ score : { $meta : 'textScore' } })
        .exec(function(err, albums) {
            if(!err) {
                res.render('search', {albums: albums});
            } else {
                res.render('error', {message: "There was a problem searching for that album.", error: err});
            }
        });

});

index.get('/playlist', function(req, res, next) {
  // TODO: Logic to construct and render playlist page
}

index.get('/wishlist', function(req, res, next) {
  // TODO: Logic to construct and render wishlist page
}

index.get('/listento', function(req, res, next) {
  // TODO: Logic to construct and render listento page
}

module.exports = index;
