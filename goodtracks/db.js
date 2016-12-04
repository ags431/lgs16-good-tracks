var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


var User = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},

})
mongoose.connect("//////////");
