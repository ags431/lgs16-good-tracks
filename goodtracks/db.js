var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


var User = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    playlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song'}],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song'}],
    listeningTo: [{type: mongoose.Schema.Types.ObjectId, ref: 'Album'}]
    /*
       Playlist, wishlist, listening to
     */
});


/*
* Schema for Song, Album required as well
 */

var Song = new mongoose.Schema({
    title: {type: String, required: true},
    discogsId: {type: Number, required: true},
    artists: [String],
    thumbnail: String,
    Album: {type: mongoose.Schema.Types.ObjectId, ref: 'Album'},
    releaseDate: String,
    genre: String
});

var Album = new mongoose.Schema({
    title: {type: String, required: true},
    discogsId: {type: Number, required: true},
    artists: [String],
    thumbnail: String,
    Songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}],
    releaseDate: String,
    genre: String
});

User.plugin(passportLocalMongoose);

mongoose.model('User', User);
mongoose.model('Song', Song);
mongoose.model('Album', Album);

/* Ensure index for search functionality*/

/*Change to correct db config*/
mongoose.connect("mongodb://localhost/jrg467");
