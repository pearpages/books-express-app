(function() {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    module.exports = function() {
        passport.use(new LocalStrategy({
                usernameField: 'username', //input names from the form
                passwordField: 'password'
            },
            function(username, password, done) {
                require('../../utils/mongo')(function(err, db) {
                    var collection = db.colllection('users');
                    collection.findOne({
                            username: username
                        },
                        function(err, results) {
                            if (results.password === password) {
                                var user = results;
                                done(null, user);
                            } else {
                                //done('Bad password', null);
                                done(null, false, {message: 'Bad password'});
                            }
                        });
                });
                var user = {
                    username: username,
                    password: password
                };
                done(null, user);
            }));
        return passport;
    };
}());
