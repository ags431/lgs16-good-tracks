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
                res.redirect('/list');
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

module.exports = index;
