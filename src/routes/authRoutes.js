(function() {
    var express = require('express');
    var authRouter = express.Router();
    var mongodb = require('mongodb').MongoClient;

    var router = function() {
        authRouter.route('/sign-up')
            .post(function(req, res) {
                console.log(req.body);
                require('../utils/mongo')(function(err, db) {
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

            });
        authRouter.route('/profile')
            .get(function(req, res) {
                res.json(req.user);
            });
        return authRouter;
    };

    module.exports = router;
})();
