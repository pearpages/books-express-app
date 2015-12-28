(function() {
    var express = require('express');
    var authRouter = express.Router();
    var authController = require('../controllers/authController')();
    var passport = require('passport');

    var router = function() {
        authRouter.route('/sign-up')
            .post(authController.signUp);
        authRouter.route('/sign-in')
            .post( passport.authenticate('local', {
                failureRedirect: '/'
            }),authController.signIn);
        authRouter.route('/profile')
            .all(authController.middleware)
            .get(authController.profile);
        return authRouter;
    };

    module.exports = router;
})();
