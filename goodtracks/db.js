var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


var User = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
    /*
       Playlist, wishlist, listening to
     */
});

/*
* Schema for Song, Album required as well
 */
mongoose.connect("//////////");
