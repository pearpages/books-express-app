(function() {

    var mongo = require('../utils/mongo');

    var authController = function() {

        function signUp(req, res) {
            console.log(req.body);
            mongo(function(err, db) {
                var collection = db.collection('users');
                var user = {
                    username: req.body.username,
                    password: req.body.password
                };

                collection.insert(user, function(err, results) {
                    req.login(results.ops[0], function() {
                        res.redirect('/auth/profile');
                    });
                });
            });

        }

        function signIn(req, res) {
            res.redirect('/auth/profile');
        }

        function middleware(req, res, next) {
            if (!req.user) {
                res.redirect('/');
            }
            next();
        }

        function profile(req, res) {
            res.json(req.user);
        }

        return {
            signUp: signUp,
            signIn: signIn,
            profile: profile,
            middleware: middleware
        };
    };

    module.exports = authController;
}());
